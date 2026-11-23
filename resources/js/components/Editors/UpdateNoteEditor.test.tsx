import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { EditorConfig, OutputData } from '@editorjs/editorjs';
import UpdateNoteEditor, { type UpdateNoteEditorHandle } from './UpdateNoteEditor';
import { UpdateNoteDialog } from '@/components/Profile/Dialogs/UpdateNoteDialog';

const mocks = vi.hoisted(() => ({
  config: null as EditorConfig | null,
  save: vi.fn(),
  destroy: vi.fn(),
  setData: vi.fn(),
  transform: vi.fn(),
  put: vi.fn(),
}));

vi.mock('@editorjs/editorjs', () => ({
  default: class {
    isReady = Promise.resolve();
    save = mocks.save;
    destroy = mocks.destroy;

    constructor(config: EditorConfig) {
      mocks.config = config;
    }
  },
}));

vi.mock('@inertiajs/react', () => ({
  useForm: (data: unknown) => ({
    data,
    setData: mocks.setData,
    transform: mocks.transform,
    put: mocks.put,
    processing: false,
    errors: {},
  }),
}));

const output = (text: string): OutputData => ({
  blocks: [{ type: 'paragraph', data: { text } }],
});

describe('UpdateNoteEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.config = null;
  });

  it('loads legacy text and updates the form with Editor.js JSON', async () => {
    const onChange = vi.fn();
    const ref = createRef<UpdateNoteEditorHandle>();
    mocks.save.mockResolvedValue(output('Changed &amp; text<br>second line'));
    render(<UpdateNoteEditor ref={ref} initialContent={'<original>\nsecond'} onChange={onChange} />);

    expect(mocks.config?.data?.blocks[0].data.text).toBe('&lt;original&gt;<br>second');
    await act(async () => {
      mocks.config?.onChange?.({ saver: { save: mocks.save } } as never, {} as never);
    });
    expect(onChange).toHaveBeenCalledWith(JSON.stringify(output('Changed &amp; text<br>second line')));
    await expect(ref.current?.save()).resolves.toEqual(output('Changed &amp; text<br>second line'));
  });

  it('loads saved blocks with formatting, removing unsafe HTML', () => {
    const data = {
      blocks: [
        { id: 'one', type: 'paragraph', data: { text: 'Hello <b>world</b><img src=x onerror=alert(1)>' } },
        { id: 'two', type: 'paragraph', data: { text: 'Second paragraph' } },
      ],
    };
    render(<UpdateNoteEditor initialContent={JSON.stringify(data)} onChange={vi.fn()} />);

    expect(mocks.config?.data?.blocks).toEqual([
      { id: 'one', type: 'paragraph', data: { text: 'Hello <b>world</b>' } },
      { id: 'two', type: 'paragraph', data: { text: 'Second paragraph' } },
    ]);
  });

  it('does not open unsupported structured content for editing', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<UpdateNoteEditor initialContent={JSON.stringify({
      blocks: [{ type: 'header', data: { text: 'Heading' } }],
    })} onChange={vi.fn()} />);

    expect(await screen.findByRole('alert')).toBeTruthy();
    expect(mocks.config).toBeNull();
    log.mockRestore();
  });

  it('submits the latest editor content even when the form state is stale', async () => {
    mocks.save.mockResolvedValue(output('Latest edit'));
    const note = {
      id: 1,
      family_id: 1,
      title: 'Title',
      family_member_id: 1,
      user_id: 1,
      slug: 'test-note',
      note_content: 'Old content',
      created_at: '',
      updated_at: '',
    };
    render(<UpdateNoteDialog isDialogOpen setIsDialogOpen={vi.fn()} note={note} />);

    fireEvent.click(screen.getByRole('button', { name: 'Opdater Note' }));
    await waitFor(() => expect(mocks.put).toHaveBeenCalledWith('/profile.notes.update'));
    const transform = mocks.transform.mock.calls[0][0];
    expect(transform(note).note_content).toBe(JSON.stringify(output('Latest edit')));
    expect(mocks.setData).toHaveBeenCalled();
  });

  it('does not submit when editor saving fails', async () => {
    mocks.save.mockRejectedValue(new Error('save failed'));
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<UpdateNoteDialog isDialogOpen setIsDialogOpen={vi.fn()} note={{
      id: 1, family_id: 1, title: 'Title', family_member_id: 1, user_id: 1, slug: 'test-note',
      note_content: 'Old content', created_at: '', updated_at: '',
    }} />);

    fireEvent.click(screen.getByRole('button', { name: 'Opdater Note' }));
    expect((await screen.findByRole('alert')).textContent).toContain('Kunne ikke gemme');
    expect(mocks.put).not.toHaveBeenCalled();
    log.mockRestore();
  });
});

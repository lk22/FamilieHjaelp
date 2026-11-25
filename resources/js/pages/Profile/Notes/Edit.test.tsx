import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { forwardRef, useImperativeHandle, useState, type ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import EditNote from './Edit';

const mocks = vi.hoisted(() => ({ save: vi.fn(), put: vi.fn(), transform: vi.fn() }));

vi.mock('@/layouts/profile/profile-layout', () => ({
  default: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/components/Editors/UpdateNoteEditor', () => ({
  default: forwardRef(function Editor({ initialContent }: { initialContent: string }, ref) {
    useImperativeHandle(ref, () => ({ save: mocks.save }));
    return <div data-testid="editor">{initialContent}</div>;
  }),
}));

vi.mock('@inertiajs/react', () => ({
  Link: ({ children, href }: { children: ReactNode, href: string }) => <a href={href}>{children}</a>,
  useForm: (initial: { title: string, note_content: string, type: string }) => {
    const [data, setFormData] = useState(initial);
    return {
      data,
      setData: (key: keyof typeof initial, value: string) => setFormData((previous) => ({ ...previous, [key]: value })),
      transform: mocks.transform,
      put: mocks.put,
      processing: false,
      errors: {},
    };
  },
}));

const note = { title: 'Existing title', slug: 'existing-title', note_content: 'Original content', type: 'health' };

describe('EditNote', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads the note and submits the latest editor content and selected type', async () => {
    mocks.save.mockResolvedValue({ blocks: [{ type: 'paragraph', data: { text: 'Latest' } }] });
    render(<EditNote note={note} />);

    expect(screen.getByRole('textbox', { name: 'Notens titel' })).toHaveTextContent(note.title);
    expect(screen.getByTestId('editor')).toHaveTextContent(note.note_content);
    expect(screen.getByRole('combobox', { name: 'Notetype' })).toHaveValue('health');
    const title = screen.getByRole('textbox', { name: 'Notens titel' });
    title.innerText = 'Changed';
    fireEvent.input(title);
    expect(screen.getByText('Changed', { selector: 'p' })).toBeInTheDocument();
    fireEvent.change(screen.getByRole('combobox', { name: 'Notetype' }), { target: { value: 'family' } });
    fireEvent.click(screen.getByRole('button', { name: 'Gem note' }));

    await waitFor(() => expect(mocks.put).toHaveBeenCalledWith('/profile.notes.update'));
    const transform = mocks.transform.mock.calls[0][0];
    expect(transform({ title: 'Changed', note_content: 'stale', type: 'family' })).toEqual({
      title: 'Changed',
      note_content: JSON.stringify({ blocks: [{ type: 'paragraph', data: { text: 'Latest' } }] }),
      type: 'family',
    });
  });

  it('keeps an existing type outside the create options', () => {
    render(<EditNote note={{ ...note, type: 'appointment' }} />);
    expect(screen.getByRole('combobox', { name: 'Notetype' })).toHaveValue('appointment');
  });

  it('shows an error and does not submit if the editor cannot save', async () => {
    mocks.save.mockRejectedValue(new Error('save failed'));
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<EditNote note={note} />);

    fireEvent.click(screen.getByRole('button', { name: 'Gem note' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Kunne ikke gemme');
    expect(mocks.put).not.toHaveBeenCalled();
    log.mockRestore();
  });
});

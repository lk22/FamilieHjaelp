import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';

import EditorJS from '@editorjs/editorjs';
import type { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import {
  sanitizeNoteParagraph
} from '../../util/renderSanitizedMarkup';

export interface CreateNoteEditorHandle {
  save: () => Promise<OutputData>
}

function initialEditorData(content: string): OutputData {
  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch (error) {
    if (!(error instanceof Error)) return;
    console.error('Failed to parse initial editor content:', error);
    parsed = content;
  }

  if ( parsed === null || typeof parsed !== 'object' ) {
    const text = document.createElement('div');
    text.textContent = typeof parsed === 'string' ? parsed : '';
    return {
      blocks: [
        {
          type: 'paragraph',
          data: {
            text: text.innerHTML.replace(/\n/g, '<br>')
          }
        }
      ]
    }
  }

  if (
    ! parsed ||
    typeof parsed !== 'object' ||
    !('blocks' in parsed) ||
    !Array.isArray((parsed.blocks))
  ) throw new Error('Invalid editor datas');

  const blocks = parsed.blocks.map((block: unknown) => {
    if (
      !block || typeof block !== 'object' ||
      !('type' in block) ||
      (block.type !== 'paragraph' && block.type !== 'header') ||
      !('data' in block) || !block.data || typeof block.data !== 'object' ||
      !('text' in block.data) || typeof block.data.text !== 'string'
    ) throw new Error('Invalid block data');

    if (
      block.type === 'header' &&
      (!('level' in block.data) ||
      typeof block.data.level !== 'number' ||
      ![2,3,4].includes(block.data.level)
    )
    ) {
      throw new Error('Invalid header block data');
    }

    return {
      ...block,
      type: block.type,
      data: {
        ...block.data,
        text: sanitizeNoteParagraph(block.data.text)
      }
    }
  })

  return { blocks };
}

const CreateNoteEditor = forwardRef<CreateNoteEditorHandle, {onChange: (content: string) => void }>(function CreateNoteEditor({onChange }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorJS | null>(null);
  const onChangeRef = useRef(onChange);
  const changeVersion = useRef(0);
  const [initializationError, setInitializationError] = useState(false);
  onChangeRef.current = onChange;

  useImperativeHandle(ref, () => ({
    async save() {
      const editor = editorRef.current;
      if (!editor) throw new Error('Editor.js is not available');
      changeVersion.current++;
      await editor.isReady;
      return await editor.save();
    },
  }), []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const holder = document.createElement('div');
    container.appendChild(holder);
    let active = true;
    const editor = new EditorJS({
      holder,
      tools: {
        header: {
          class: Header,
          config: {
            levels: [2,3,4], defaultLevel: 2
          }
        }
      },
      onChange: (api) => {
        const version = ++changeVersion.current;
        void api.saver.save().then((data) => {
          if (active && version === changeVersion.current) onChangeRef.current(JSON.stringify(data));
        }).catch((error) => {
          console.error('Editor.js failed to read changes:', error);
        });
      },
      autofocus: true,
    });
    editorRef.current = editor;

    const ready = editor.isReady.then(
      () => true,
      (error) => {
        console.error('Editor.js failed to initialize:', error);
        return false;
      },
    );

    return () => {
      active = false;
      if (editorRef.current === editor) editorRef.current = null;
      holder.remove();

      void ready.then((initialized) => {
        if (initialized) editor.destroy();
      }).catch((error) => {
        console.error('Editor.js cleanup failed:', error);
      });
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="w-full p-2 mb-4" />
      {initializationError && <p role="alert" className="text-red-600">Kunne ikke indlæse notens indhold.</p>}
    </>
  );
});

export default CreateNoteEditor;
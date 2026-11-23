import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import EditorJs, { type OutputData } from '@editorjs/editorjs';
import { sanitizeNoteParagraph } from '@/util/renderSanitizedMarkup';
import Header from '@editorjs/header';

export interface UpdateNoteEditorHandle {
  save: () => Promise<OutputData>;
}

function initialEditorData(content: string): OutputData {
  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    parsed = content;
  }

  if (parsed === null || typeof parsed !== 'object') {
    const text = document.createElement('div');
    text.textContent = typeof parsed === 'string' ? parsed : content;
    return { blocks: [{ type: 'paragraph', data: { text: text.innerHTML.replace(/\n/g, '<br>') } }] };
  }

  if (!parsed || typeof parsed !== 'object' || !('blocks' in parsed) || !Array.isArray(parsed.blocks)) {
    throw new Error('Invalid Editor.js note content');
  }

  const blocks = parsed.blocks.map((block: unknown) => {
    if (
      !block || typeof block !== 'object' ||
      !('type' in block) ||
      (block.type !== 'paragraph' && block.type !== 'header') ||
      !('data' in block) || !block.data || typeof block.data !== 'object' ||
      !('text' in block.data) || typeof block.data.text !== 'string'
    ) {
      throw new Error('Invalid or unsupported Editor.js block');
    }

    if (
      block.type === 'header' &&
      (!('level' in block.data) ||
        typeof block.data.level !== 'number' ||
        ![2, 3, 4].includes(block.data.level))
    ) {
      throw new Error('Invalid heading level');
    }

    return {
      ...block,
      type: block.type,
      data: {
        ...block.data,
        text: sanitizeNoteParagraph(block.data.text),
      },
    };
  });
  return { blocks };
}

const UpdateNoteEditor = forwardRef<UpdateNoteEditorHandle, { initialContent: string, onChange: (content: string) => void }>(function UpdateNoteEditor({ initialContent, onChange }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorJs | null>(null);
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

    let data: OutputData;
    try {
      data = initialEditorData(initialContent);
      setInitializationError(false);
    } catch (error) {
      console.error('Could not load note content:', error);
      setInitializationError(true);
      return;
    }

    const holder = document.createElement('div');
    container.appendChild(holder);
    let active = true;
    const editor = new EditorJs({
      holder,
      data,
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
  }, [initialContent]);

  return (
    <>
      <div ref={containerRef} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
      {initializationError && <p role="alert" className="text-red-600">Kunne ikke indlæse notens indhold.</p>}
    </>
  );
});
export default UpdateNoteEditor;
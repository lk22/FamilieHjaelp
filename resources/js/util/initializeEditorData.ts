import type { OutputData } from '@editorjs/editorjs';
import {
  sanitizeNoteParagraph
} from './renderSanitizedMarkup';

export function initializeEditorData(content: string): OutputData {
  let parsed: unknown;

  try {
    parsed = JSON.parse(content);
  } catch (error) {
    if (!(error instanceof Error)) return;
    console.error('Failed to parse initial editor content:', error);
    parsed = content;
  }

  if ( parsed === null || typeof parsed !== 'object') {
    const text = document.createElement('div');
    text.textContent = typeof parsed === 'string' ? parsed : '';
    return {
      blocks: [
        {
          type: 'paragraph',
          data: {
            text: sanitizeNoteParagraph(text.innerHTML)
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
      !('data' in block) || !block.data || typeof block.data !== 'object' ||
      !('text' in block.data) || typeof block.data.text !== 'string'
    ) throw new Error('Invalid block data');
    return {
      ...block,
      type: block.type,
      data: {
        ...block.data,
        text: sanitizeNoteParagraph(block.data.text)
      }
    }
  });

  return {
    blocks
  };
}
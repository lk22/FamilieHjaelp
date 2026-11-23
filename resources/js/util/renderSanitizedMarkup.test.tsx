import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderSanitizedMarkup } from './renderSanitizedMarkup';

describe('renderSanitizedMarkup', () => {
  it('renders formatted paragraphs without unsafe HTML or URLs', () => {
    const { container } = render(<>{renderSanitizedMarkup({
      blocks: [{
        type: 'paragraph',
        data: { text: '<b>Note</b><img src=x onerror=alert(1)><a href="javascript:alert(1)">link</a>' },
      }],
    })}</>);

    expect(container.querySelector('b')?.textContent).toBe('Note');
    expect(container.querySelector('img')).toBeNull();
    expect(screen.getByText('link').getAttribute('href')).toBeNull();
  });

  it('reports unsupported blocks instead of rendering their contents', () => {
    render(<>{renderSanitizedMarkup({
      blocks: [{ type: 'header', data: { text: 'Not a paragraph' } }],
    })}</>);

    expect(screen.getByText('Unsupported block')).toBeTruthy();
  });
});

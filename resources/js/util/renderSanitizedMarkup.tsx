import DOMPurify from 'dompurify';
import type {OutputData} from '@editorjs/editorjs';
import React from 'react';

export const sanitizeNoteParagraph = (text: string) => DOMPurify.sanitize(text, {
  ALLOWED_TAGS: ['b', 'i', 'strong', 'em', 'a', 'br'],
  ALLOWED_ATTR: ['href']
});

export const renderSanitizedMarkup = (content: OutputData) => {
    return content.blocks.map((block, index) => {
      if (
        (block.type !== "paragraph" || typeof block.data?.text !== "string") &&
        (block.type === "header" && typeof block.data?.text !== "string")
      ) {
        return <p key={block.id ?? index}>Unsupported block</p>
      }

      if (block.type === "header") {
        let headingClass = "";
        // get the level of the header
        switch (block.data.level) {
          case 2:
            headingClass = "text-3xl";
            break;
          case 3:
            headingClass = "text-2xl";
            break;
          case 4:
            headingClass = "text-xl";
            break;
        }
        return React.createElement(
          `h${block.data.level}`,
          { key: block.id ?? index, className: headingClass },
          block.data.text
        );
      }

      const paragraphClass = block.type === "header" ? "header-block" : "paragraph-block";

      const safeHtml = sanitizeNoteParagraph(block.data.text);

      return <div key={block.id ?? index} className={paragraphClass} dangerouslySetInnerHTML={{ __html: safeHtml }}></div>;
    })
}
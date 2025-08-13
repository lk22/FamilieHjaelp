import React from 'react';
interface ParagraphBlockProps {
    className?: string;
    children: React.ReactNode | React.ReactNode[];
}

const Paragraph: React.FC<ParagraphBlockProps> = ({ className, children }) => {
    return <p className={`text-gray-700 text-xl mb-4 ${className}`}>{children}</p>;
};

export default Paragraph;

import React, { JSX } from 'react';

interface HeadingBlockProps {
    className?: string;
    children: React.ReactNode | React.ReactNode[];
    level: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading: React.FC<HeadingBlockProps> = ({ className, children, level }) => {
    const headingLevel = level;
    const headingClasses = headingLevel >= 3 ? 
        'text-2xl text-blue-700 font-semibold mb-1' : 
        'text-3xl font-semibold mb-4 text-blue-700';

    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    return <Tag className={`${headingClasses} ${className}`}>{children}</Tag>;
};

export default Heading;

import React, { JSX } from 'react';
import { ExternalLinkProps } from '@/components/Blocks/ExternalLink'; // Adjust the import path as necessary

interface ListItem {
    content: React.ReactNode | React.ReactNode[];
}

interface ListInterface {
    type: 'unordered' | 'ordered';
    content: React.ReactNode | React.ReactNode[] | ExternalLinkProps;
    className?: string;
}

const List: React.FC<ListInterface> = ({ type, content, className }) => {
    if (!content || React.Children.count(content) === 0) {
        return null; // Return null if no content is provided
    }
    
    const ListTag = `${type === 'unordered' ? 'ul' : 'ol'}` as keyof JSX.IntrinsicElements;

    return (
        <ListTag className={`list-disc pl-5 space-y-2 ${className}`}>
            {React.Children.map(content, (child, index) => {
                if (React.isValidElement(child) && child.type === ListItem) {
                    return React.cloneElement(child, { key: index });
                }
                return <ListItem key={index} content={child} />;
            })}
        </ListTag>
    );
};

const ListItem: React.FC<ListItem> = ({ content }) => {
    return <li className="text-gray-700 text-lg">{content}</li>;
};

export { List, ListItem };
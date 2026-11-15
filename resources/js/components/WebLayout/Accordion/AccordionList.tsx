import React from 'react';

interface AccordionListProps {
    children?: React.ReactNode;
}

interface AccordionItemProps {
    title: string;
    body: React.ReactNode | React.ReactNode[];
}

export const AccordionItem = ({title, body}: AccordionItemProps) => {
    return (
        <div className="border-b border-gray-200 py-4">
            <button className="w-full text-left flex justify-between items-center focus:outline-none">
                <span className="text-lg font-medium text-blue-900">{title}</span>
                <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div className="mt-4 text-blue-700">
                {body}
            </div>
        </div>
    )
}

export default function Accordion({children}: AccordionListProps) {
    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            {children}
        </div>
    );
}


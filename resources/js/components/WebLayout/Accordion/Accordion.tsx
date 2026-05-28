import React from 'react';

interface AccordionListProps {
    children?: React.ReactNode;
    variant?: 'default' | 'compact';
}

interface AccordionItemProps {
    id: number|string;  // Changed from 'key' to 'id'
    title: string;
    body: React.ReactNode | React.ReactNode[];
}

interface AccordionHeaderProps {
    id: number|string;  // Changed from 'key' to 'id'
    title: string;
}

interface AccordionBodyProps {
    id: number|string;  // Changed from 'key' to 'id'
    body: React.ReactNode | React.ReactNode[];
}

const toggleAccordion = (itemId: number|string) => {
    const body = document.getElementById(`accordion-body-${itemId}`);
    console.log(itemId);
    if (body) {
        if (body.style.display === 'none' || body.style.display === '') {
            body.style.display = 'block';
        } else {
            body.style.display = 'none';
        }
    }
}

export const AccordionHeader = ({id, title}: AccordionHeaderProps) => {
    return (
        <div className="border-b border-gray-200 py-4 px-8 bg-blue-100 last:border-0 rounded cursor-pointer">
            <button className="w-full text-left flex justify-between items-center focus:outline-none" onClick={() => toggleAccordion(id)}>
                <span className="text-2xl font-medium text-blue-900">{title}</span>
                <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
        </div>
    )
}

export const AccordionItem = ({id, title, body}: AccordionItemProps) => {
    console.log('Rendering AccordionItem with id:', id);

    return (
        <div className="border-b border-gray-200 mb-4 last:mb-0 last:border-0 bg-blue-100 rounded cursor-pointer">
            <AccordionHeader id={id} title={title} />
            <AccordionBody id={id} body={body} />
        </div>
    )
}

export const AccordionBody = ({id, body}: AccordionBodyProps) => {
    return (
        <div className="mt-4 h-full text-black py-8 w-full bg-blue-300 px-8 text-xl" style={{display: 'none'}} id={`accordion-body-${id}`}>
            {body}
        </div>
    )
}

export const Accordion = ({children, ...props}: AccordionListProps) => {

    const variant = props.variant || 'default';
    const variantClass = variant === 'compact' ? 'w-auto' : 'container w-full';

    return (
        <div className={`${variantClass} mx-auto space-y-4`}>
            {children}
        </div>
    );
}
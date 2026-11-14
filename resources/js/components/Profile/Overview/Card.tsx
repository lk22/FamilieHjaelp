import { JSX } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    icon?: JSX.Element;
}

export default function Card({
    className = '',
    children,
    title,
    description,
    icon
}: CardProps) {
    const hasIcon = !!icon;
    return (
        <div className={`bg-white rounded-lg shadow-md border-t-2 border-blue-800 p-6 ${className}`}>
            {hasIcon && (
                <div className="mb-4">
                    {icon}
                </div>
            )}
            {title && (
                <h3 className="text-xl font-bold mb-4 text-blue-900">
                    {title}
                </h3>
            )}
            {children}
            {description && (
                <p className="mt-2 text-gray-600 leading-relaxed">{description}</p>
            )}
        </div>
    );
}

import { Link } from '@inertiajs/react';

interface InfoSlideProps {
    title: string;
    link: string;
    description: string;
    backgroundColor?: string;
}

// Default background colors for different slide types
const COLORS = {
    'Dansk center': '#00027C',
    default: '#00027C',
};

export default function InfoSlide({ 
    title, 
    link, 
    description, 
    backgroundColor = COLORS.default 
}: InfoSlideProps) {
    const colorClass = backgroundColor ? `bg-[${backgroundColor}]` : 'bg-[#00027C]';
    
    return (
        <Link 
            href={link} 
            className="text-white block"
            aria-label={`Læs mere om ${title}`}
        >
            <div className={`${colorClass} rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-3">
                        {title}
                    </h2>
                    <p className="text-sm opacity-90 leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    );
}

import {Link} from '@inertiajs/react';

interface InformationSlideProperties {
    title: string;
    link: string;
    description: string;
    backgroundColor?: string;
}

export default function InformationSlide({ title, link, description, backgroundColor }: InformationSlideProperties) {
    
    const defaultBackgroundColor = 'bg-[#00027C]'; // Default background color if not provided
    const classes = backgroundColor ? `bg-[${backgroundColor}]` : defaultBackgroundColor
    
    return (
        <>
            <Link href={link} className="text-white hover:underline">
                <div className={`p-6 rounded-lg shadow-md ${classes}`}>
                    <h2 className="text-xl text-white font-semibold mb-4">{title}</h2>
                    <p className="text-white mb-4">{description}</p>
                </div>
            </Link>
        </>
    );
}
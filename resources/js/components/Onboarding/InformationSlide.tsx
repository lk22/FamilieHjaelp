import {Link} from '@inertiajs/react';

interface InformationSlideProperties {
    title: string;
    link: string;
    description: string;
    backgroundColor?: string;
}

export default function InformationSlide({ title, link, description, backgroundColor }: InformationSlideProperties) {
    
    const hasBackground = backgroundColor ? `${backgroundColor}` : '#00027C';
    console.log({ title, link, description, backgroundColor });
    
    return (
        <div className={`p-6 rounded-lg shadow-md bg-${hasBackground}` + ' text-white'}>
            <h2 className="text-xl text-white font-semibold mb-4">{title}</h2>
            <p className="text-white mb-4">{description}</p>
            <Link href={link} className="text-white hover:underline">
                Learn more
            </Link>
        </div>
    );
}
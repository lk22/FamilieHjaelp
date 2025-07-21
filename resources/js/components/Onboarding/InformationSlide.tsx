import {Link} from '@inertiajs/react';

interface InformationSlideProperties {
    title: string;
    link: string;
}

export default function InformationSlide({ title, link }: InformationSlideProperties) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <p className="text-gray-700 mb-4">This is a brief description of the information slide.</p>
            <Link href={link} className="text-blue-500 hover:underline">
                Learn more
            </Link>
        </div>
    );
}
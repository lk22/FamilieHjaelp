import {Link} from '@inertiajs/react';

export default function Slide1() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Sorgoverlov</h2>
            <p className="text-gray-700 mb-4">
                Har du mistet en nær pårørende? Få hjælp til at håndtere sorg og tab.
            </p>
            <Link href={route('profile.info', { page: 'sorgoverlov' })} className="text-blue-500 hover:underline">
                Learn more
            </Link>
        </div>
    );
}
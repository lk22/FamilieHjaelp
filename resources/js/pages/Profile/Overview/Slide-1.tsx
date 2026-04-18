import {Link} from '@inertiajs/react';

export default function Slide1() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Slide 1</h2>
            <p className="text-gray-700 mb-4">This is the content for Slide 1.</p>
            <Link href={route('profile.info', { page: 'slide-1' })} className="text-blue-500 hover:underline">
                Learn more
            </Link>
        </div>
    );
}
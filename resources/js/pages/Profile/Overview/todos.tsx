import {usePage} from '@inertiajs/react';
import {type SharedData} from '@/types';

export default function Todos() {
    const { auth } = usePage<SharedData>();

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Opgaver</h1>
            <p className="mb-4">Her kan du se alle de opgaver, du skal huske at udføre.</p>
            <pre className="bg-gray-100 p-4 rounded">
                {JSON.stringify(auth, null, 2)}
            </pre>
        </div>
    );
}
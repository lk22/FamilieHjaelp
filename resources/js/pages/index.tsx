// dependency imports
import { type SharedData } from '@/types';
// import { Link, usePage } from '@inertiajs/react';

import WebLayout from '@/layouts/web-layout';

// Component imports
import Meta from '@/components/WebLayout/Meta';


export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;

    return (
        <>
            <WebLayout pageTitle="Welcome">
                <Meta title="Welcome" description="Din personlige guide til støtte og hjælp efter test." />
                <h1 className="text-4xl font-bold text-center mt-12">Velkommen til FamilieHjælp</h1>
                <p className="text-center mt-4 text-lg">Din personlige guide til støtte og hjælp efter tester.</p>
            </WebLayout>
        </>
    );
}

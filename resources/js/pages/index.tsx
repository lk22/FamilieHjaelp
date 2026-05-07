// dependency imports
import { type SharedData } from '@/types';
// import { Link, usePage } from '@inertiajs/react';

import WebLayout from '@/layouts/web-layout';

// Component imports
import Meta from '@/components/WebLayout/Meta';


export default function Welcome() {
    return (
        <>
            <WebLayout
                pageTitle="Welcome"
                description="Your personal guide to support and help after tests."
            >
                <Meta title="Welcome" description="Your personal guide to support and help after tests." />
                <h1 className="text-4xl font-bold text-center mt-12">Easy help as parents</h1>
                <p className="text-center mt-4 text-lg">Your personal guide to support and help after tests.</p>.
            </WebLayout>
        </>
    );
}

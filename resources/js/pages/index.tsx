// dependency imports
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

import WebLayout from '@/layouts/web-layout';

// Component imports
import Meta from '@/components/WebLayout/Meta';


export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
        <WebLayout pageTitle="Welcome">
            <Meta title="Welcome" />
            <div>
                <h1>Welcome</h1>
            </div>
        </WebLayout>
        </>
    );
}

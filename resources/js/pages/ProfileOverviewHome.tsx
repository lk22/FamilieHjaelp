
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface ProfileOverviewHomeProps { 
  arg1: string; 
  arg2: boolean; 
}

export default function ProfileOverviewHome({arg1, arg2 }: ProfileOverviewHomeProps) {
    const { props } = usePage();

    return (
        <div>
            <Head title="ProfileOverviewHome" />
            <h1>ProfileOverviewHome Page</h1>
            <p>Shared Data: {JSON.stringify(props)}</p>
            <p>Component Props: {JSON.stringify({arg1, arg2 })}</p>
            <Link href="/">Go to Home</Link>
        </div>
    );
}
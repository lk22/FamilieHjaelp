
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface ProfileOverviewTwoProps { 
  propOne: string; 
  propTwo: number; 
}

export default function ProfileOverviewTwo({ propOne, propTwo }: ProfileOverviewTwoProps) {
    const { props } = usePage();

    return (
        <div>
            <Head title="ProfileOverviewTwo" />
            <h1>ProfileOverviewTwo Page</h1>
            <p>Shared Data: {JSON.stringify(props)}</p>
            <p>Component Props: {JSON.stringify({ propOne, propTwo })}</p>
            <Link href="/">Go to Home</Link>
        </div>
    );
}
        
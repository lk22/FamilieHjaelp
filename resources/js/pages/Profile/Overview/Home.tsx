import {Link, usePage} from '@inertiajs/react';
import {useEffect, useState, useCallback} from 'react';

import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

export default function ProfileOverviewHome() {
    const { auth } = usePage().props;

    return (
        <ProfileOverviewLayout>
            <div>
                <h1>Profile Overview Home</h1>
                <p>Welcome, {auth.user.name}!</p>
                <p>Your email: {auth.user.email}</p>
                <Link href="/">Go to Home</Link>
            </div>
        </ProfileOverviewLayout>
    );
}
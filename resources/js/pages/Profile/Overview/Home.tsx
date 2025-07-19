import {Link, usePage} from '@inertiajs/react';
import {useEffect, useState, useCallback} from 'react';

export default function ProfileOverviewHome() {
    const { auth } = usePage().props;

    return (
        <div>
            <h1>Welcome to your profile, {auth.user.name}!</h1>
            <Link href="/profile/edit">Edit Profile</Link>
        </div>
    );
}
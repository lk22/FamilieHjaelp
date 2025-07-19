import {Link, Head} from '@inertiajs/react';

interface ProfileOverviewLayoutProps {
    children: React.ReactNode;
}

export default function ProfileOverviewLayout({ children }: ProfileOverviewLayoutProps) {
    return (
        <div>
            <Head title="Profile Overview" />
            <nav>
                <Link href="/profile">Profile</Link>
                <Link href="/profile/settings">Settings</Link>
            </nav>
            <main>{children}</main>
        </div>
    );
}
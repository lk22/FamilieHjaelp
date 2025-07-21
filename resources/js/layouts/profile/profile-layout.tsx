import {Link, Head, usePage} from '@inertiajs/react'
import { type SharedData } from '@/types';

interface ProfileOverviewLayoutProps {
    children: React.ReactNode;
    auth: {
        user: { name: string; email: string; }
    }
}

export default function ProfileOverviewLayout({ children, auth }: ProfileOverviewLayoutProps) {
    return (
        <div className="bg-white text-gray-900 min-h-screen">
            <Head title="Profile Overview" />
            <header className="w-full p-4 flex items-center justify-between bg-blue-600 text-white">
                <div className="container w-full mx-auto flex justify-between items-center">
                    <div className="logo">
                        <Link href={route('profile.home')} className="flex items-center gap-2">
                            <img src="/images/logo.svg" alt="Familiehjælp Logo" className="h-8" />
                            <span className="text-xl font-bold">Familiehjælp</span>
                        </Link>
                    </div>
                    <h1>Velkommen {auth.user.name}</h1>
                    <nav className="flex space-x-4">
                        <Link href={route('profile.home')} className="text-white">
                            Home
                        </Link>
                        <Link href={route('profile.todos')} className="text-white">
                            Settings
                        </Link>
                    </nav>
                </div>
            </header>
            <main>{children}</main>
            <footer>
                <Link href="/">Back to Home</Link>
            </footer>
        </div>
    );
}
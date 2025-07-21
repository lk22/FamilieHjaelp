import {Link, Head} from '@inertiajs/react'
import { JSX } from 'react';

interface ProfileOverviewLayoutProps {
    children: React.ReactNode;
    auth: {
        user: { name: string; email: string; }
    }
    title: string;
    headline?: string | JSX.Element[];
}

export default function ProfileOverviewLayout({ children, auth, title, headline }: ProfileOverviewLayoutProps) {
    return (
        <div className="bg-white text-gray-900 min-h-screen">
            <Head title={title} />
            <header className="w-full p-4 flex items-center justify-between bg-blue-600 text-white">
                <div className="container w-full mx-auto flex justify-between items-center">
                    <div className="logo">
                        <Link href={route('profile.home')} className="flex items-center gap-2">
                            <img src="/images/logo.svg" alt="Familiehjælp Logo" className="h-8" />
                            <span className="text-xl font-bold">Familiehjælp</span>
                        </Link>
                    </div>
                    <nav className="flex space-x-4">
                        <Link href={route('profile.home')} className="text-white">
                            Hjem
                        </Link>
                        <Link href={route('profile.todos')} className="text-white">
                            Opgaver
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                {headline ? (
                    <h1 className="text-2xl font-bold mb-4">{headline}</h1>
                ) : <h1 className="text-2xl font-bold mb-4">Velkommen {auth.user.name}</h1>}
                {children}
            </main>
        </div>
    );
}
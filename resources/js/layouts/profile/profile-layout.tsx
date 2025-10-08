import React, {JSX, useState} from 'react';
import {Link, Head, usePage, router} from '@inertiajs/react';
import {type SharedData} from '@/types';

import { LogoutDialog } from '@/components/Profile/Dialogs/LogoutDialog';

import { ProfileMainMenu } from '@/components/Profile/DropdownMenus/ProfileMainMenu';

interface ProfileOverviewLayoutProps {
    children: React.ReactNode;
    title: string;
    headline?: string | JSX.Element;
}

export default function ProfileOverviewLayout({ 
    children, 
    title,
    headline 
}: ProfileOverviewLayoutProps) {
    const { auth } = usePage<SharedData>().props;

    const [isLoggingOutDialog, setIsLoggingOutDialog] = useState(false);

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // needs improvement (needs to have a processing state
        router.post(route('logout'));
    }

    const handlePageTitle = (): JSX.Element => {
        if (headline) {
            return <h1 className="text-5xl font-bold mb-4 text-blue-900 pb-2 mx-16">{headline}</h1>;
        }
        
        return <h1 className="text-5xl mx-16 font-bold mb-4 text-blue-900">Velkommen {auth.user.name}</h1>;
    }

    return (
        <div className="bg-slate-100 text-gray-900 min-h-screen">
            <Head title={title} />
            <header className="w-full p-4 flex items-center justify-between bg-blue-600 text-white fixed top-0 left-0 z-50 shadow-md">
                <div className="container w-full mx-auto flex justify-between items-center">
                    <div className="logo">
                        <Link href={route('profile.home')} className="flex items-center gap-2">
                            <img src="/images/logo.svg" alt="Familiehjælp Logo" className="h-8" />
                            <span className="text-xl font-bold">Familiehjælp</span>
                        </Link>
                    </div>
                    {
                        ! route().current('profile.home') && (
                            <span className="text-sm text-gray-200 font-semibold">
                                {title} - <Link href={route('profile.home')} className="text-white hover:underline font-bold">Gå tilbage</Link>
                            </span>
                        )
                    }
                    <nav className="flex space-x-4">
                        <ProfileMainMenu setIsLoggingOutDialog={setIsLoggingOutDialog} />
                        <LogoutDialog 
                            isLoggingOut={isLoggingOutDialog} 
                            setIsLoggingOutDialog={setIsLoggingOutDialog}
                            handleLogout={handleLogout}
                        />
                    </nav>
                </div>
            </header>
            <main className="container mx-auto px-4 py-32">
                {headline && handlePageTitle()}
                {children}
            </main>
        </div>
    );
}
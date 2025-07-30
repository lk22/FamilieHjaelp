import React, {JSX, useState} from 'react';
import {Link, Head, usePage, router} from '@inertiajs/react';
import {type SharedData} from '@/types';

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogDescription,
    DialogClose
} from '@/components/ui/dialog';

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

    const handlePageTitle = (): JSX.Element[] => {
        if (headline) {
            return [<h1 className="text-4xl font-bold mb-4 text-blue-900 border-b-2 pb-2" >{headline}</h1>];
        }
        
        return [<h1 className="text-4xl font-bold mb-4 text-blue-900">Velkommen {auth.user.name}</h1>];
    }

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
                    {
                        ! route().current('profile.home') && (
                            <span className="text-sm text-gray-200 font-semibold">
                                {title} - <Link href={route('profile.home')} className="text-white hover:underline font-bold">Gå tilbage</Link>
                            </span>
                        )
                    }
                    <nav className="flex space-x-4">
                        <Link href={route('profile.home')} className="text-white">
                            Hjem
                        </Link>
                        <Link href={route('profile.todos')} className="text-white">
                            Opgaver
                        </Link>
                        <span className="text-white hover:underline" onClick={() => setIsLoggingOutDialog(true)}>
                            Log ud
                        </span>
                        <Dialog open={isLoggingOutDialog} onOpenChange={setIsLoggingOutDialog}>
                            <DialogContent className="bg-slate-800 text-white">
                                <DialogDescription>
                                    Er du sikker på, at du vil logge ud?
                                </DialogDescription>
                                <DialogFooter>
                                    <DialogClose className="cursor-pointer" onClick={() => setIsLoggingOutDialog(false)}>
                                        Annuller
                                    </DialogClose>
                                    <form method="POST" action={route('logout')} className="inline">
                                        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''} />
                                        <button onClick={(e) => handleLogout(e)} className="cursor-pointer bg-blue-600 text-white px-2 py-2 rounded animate">
                                            Log ud
                                        </button>
                                    </form>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </nav>
                </div>
            </header>
            <main className="container mx-auto px-4 py-16">
                {headline && handlePageTitle()}
                {children}
            </main>
        </div>
    );
}
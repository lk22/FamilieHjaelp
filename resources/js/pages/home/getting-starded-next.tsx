import {type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function GettingStartedNext() {
    const { auth, name } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Kom i gang | Familiehjælp" />
            <header>
                <nav className="fixed top-0 left-0 z-50 w-full bg-transparent dark:bg-[#0a0a0a]">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4">
                        <Link href={route('home')} className="flex items-center text-white">
                            Gå tilbage
                        </Link>
                    </div>
                </nav>
            </header>
            <main className="flex min-h-screen justify-center flex-col items-center lg:justify-center dark:bg-[#0a0a0a]">
                <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#004EA7] text-white dark:bg-[#0a0a0a] ">
                    <div className="container max-w-[800px] text-center">
                        <div className="logo">
                            <Link href={route('home')}>
                                <img src="/images/FamilieHjælp_text_logo.svg" alt="Familiehjælp Logo" className="mb-6 w-auto dark:invert h-[50px] mx-auto" />
                                <img
                                    src="/images/logo.svg"
                                    alt="Familiehjælp Logo"
                                    className="mb-6 w-auto dark:invert h-[100px] mx-auto"
                                />
                            </Link>
                        </div>
                        <div className="illustration-wrapper">
                            <img
                                src="/images/getting_started_illustration.svg"
                                alt="Familiehjælp Illustration"
                                className="mt-8 w-full max-w-[400px] mx-auto"
                            />
                        </div>
                        
                        <nav className="flex mt-8 items-center justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-white hover:border-white dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('getting-started-next')} className="inline-block rounded-sm border border-white px-5 py-1.5 text-sm leading-normal text-white hover:border-white dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">
                                        Start
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            </main>
        </>
    );
}

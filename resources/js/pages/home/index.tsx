import { useState } from 'react';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

import GettingStartedModal from '@/components/Onboarding/Modals/GettingStartedModal';
import { OnboardingProvider } from '@/contexts/OnboardingContext';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [ modalOpen, setModalOpen ] = useState<boolean>(false);

    return (
        <>
            <OnboardingProvider>
                <Head title="Hjem | Familiehjælp">
                    <link rel="preconnect" href="https://fonts.bunny.net" />
                    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                </Head>
                <main className="flex min-h-screen h-screen justify-center flex-col items-center lg:justify-center">
                    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#004EA7] text-white ">
                        <div className="container max-w-[800px] text-center bg-[#004EA7] text-white">
                            <div className="logo">
                                <Link href={route('home')}>
                                <img src="/images/FamilieHjælp_text_logo.svg" alt="Familiehjælp Logo" className="mb-6 w-auto  h-[50px] mx-auto" />
                                    <img
                                        src="/images/logo.svg"
                                        alt="Familiehjælp Logo"
                                        className="mb-6 w-auto h-[100px] mx-auto"
                                    />
                                </Link>
                            </div>
                            <div className="illustration-wrapper">
                                <img
                                    src="/images/welcome_screen_illustration.svg"
                                    alt="Familiehjælp Illustration"
                                    className="mt-8 w-full max-w-[400px] mx-auto"
                                />
                            </div>
                            <nav className="flex mt-8 items-center justify-center gap-4">
                                <div className="auth-actions">
                                    {!auth.user ? (
                                        <>
                                            <div className="w-full flex gap-4 justify-start mb-4 sm:items-start sm:justify-start">
                                                <Link href={route('register')} className="text-white sm:w-full">Registrer dig her</Link>
                                            </div>
                                            <div className="flex gap-4">
                                                {/* <button
                                                    onClick={() => setModalOpen(true)}
                                                    className="inline-block rounded-sm border border-white px-5 py-1.5 text-xl leading-normal bg-white text-blue-500 hover:border-white cursor-pointer">
                                                    Kom i gang
                                                </button> */}
                                                <Link
                                                    href={route('getting-started')}
                                                    className="inline-block rounded-sm border border-white bg-white text-blue-500 px-5 py-1.5 text-xl leading-normal text-whitehover:border-[#19140035]"
                                                >
                                                    Kom igang
                                                </Link>
                                                <Link
                                                    href={route('login')}
                                                    className="inline-block rounded-sm border border-white bg-white text-blue-500 px-5 py-1.5 text-xl leading-normal text-whitehover:border-[#19140035]"
                                                >
                                                    Log ind
                                                </Link>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                        <Link
                                            href={route('login')}
                                            className="inline-block rounded-sm border border-white bg-white text-blue-500 px-5 py-1.5 text-xl leading-normal text-whitehover:border-[#19140035]"
                                        >
                                            Log ind
                                        </Link>
                                        </>
                                    )}
                                </div>
                            </nav>
                        </div>
                    </div>
                    <GettingStartedModal isOpen={modalOpen} closeModal={() => setModalOpen(false)}/>
                    <div className="hidden h-14.5 lg:block"></div>
                </main>
            </OnboardingProvider>
        </>
    );
}

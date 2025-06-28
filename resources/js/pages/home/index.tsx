import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Hjem | Familiehjælp">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <main className="flex min-h-screen justify-center flex-col items-center lg:justify-center dark:bg-[#0a0a0a]">
                <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#A70099] text-white dark:bg-[#0a0a0a] ">
                    <div className="container max-w-[800px] text-center">
                        <div className="logo">
                            <img src="/images/FamilieHjælp_text_logo.svg" alt="Familiehjælp Logo" className="mb-6 w-auto dark:invert h-[50px] mx-auto" />
                            <img
                                src="/images/logo.svg"
                                alt="Familiehjælp Logo"
                                className="mb-6 w-auto dark:invert h-[100px] mx-auto"
                            />
                        </div>
                        <h1 className="text-4xl font-bold">Velkommen to Familiehjælp</h1>
                        <p className="mt-4 text-lg">
                            Vi er glade for at have dig her! Familiehjælp er din pålidelige partner i at navigere i
                            familie- og sociale udfordringer. Vores platform tilbyder ressourcer, rådgivning og støtte til
                            familier i Danmark.
                        </p>
                        <div className="illustration-wrapper">
                            <img
                                src="/images/welcome_screen_illustration.svg"
                                alt="Familiehjælp Illustration"
                                className="mt-8 w-full max-w-[400px] mx-auto"
                            />
                        </div>
                        <nav className="flex mt-8 items-center justify-center gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-white hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <> 
                                <Link href={route('register')} className="text-white">Registrer dig her</Link>
                                <Link href="/" className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-white hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">
                                    Kom i gang
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-whitehover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log ind
                                </Link>
                            </>
                        )}
                    </nav>
                    </div>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </main>
        </>
    );
}

import { Head, Link } from '@inertiajs/react';

export default function LoggedOut() {

    return (
        <>
            <Head title="Hjem | Familiehjælp" />
            <main className="flex min-h-screen h-screen justify-center flex-col items-center lg:justify-center">
                <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#004EA7] text-white ">
                    <div className="container max-w-[800px] text-center bg-[#004EA7] text-white">
                        <h1 className="text-4xl mb-4">Du er nu logget ud</h1>
                        <div className="logo">
                            <Link href={route('home')}>
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
                    </div>
                    <div className="text-center text-lg text-white mt-4">
                        Du er nu logget ud. Tak fordi du brugte FamilieHjælp!
                    </div>
                    <div className="mt-4">
                        <Link
                            href={route('home')}
                            className="inline-block rounded-sm border border-white px-5 py-1.5 text-xl leading-normal text-white hover:border-white"
                        >
                            Gå til forsiden
                        </Link>
                    </div>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </main>
        </>
    );
}
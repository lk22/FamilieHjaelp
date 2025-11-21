import {type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

import { OnboardingProvider } from '@/contexts/OnboardingContext';


const GettingStartedContent = () => {
    const { auth, name } = usePage<SharedData>().props;
    // const { onboardingState } = useOnboarding();

    // TODO: implement a check on query param to jump to a specific step if needed

    return (
        <>
            <Head title={`Kom i gang | ${name}`} />
            <header>
                <nav className="fixed top-0 left-0 z-50 w-full bg-transparent">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4">
                        <Link href={route('home')} className="flex items-center text-white">
                            Gå tilbage
                        </Link>
                    </div>
                </nav>
            </header>

            <main>
                <div className="container-fluid flex flex-wrap">
                    <div className="xs:w-full sm:w-full md:w-full lg:w-6/12 bg-[#004EA7] text-white flex flex-col items-center justify-center">
                        <div className="logo pt-30 w-full">
                            <Link href={route('home')}>
                                <img src="/images/FamilieHjælp_text_logo.svg" alt="Familiehjælp Logo" className="animate animate-fade-up animate-ease-linear  relative bottom-4 animate-in mb-6 w-auto h-[50px] mx-auto" />
                                <img
                                    src="/images/logo.svg"
                                    alt="Familiehjælp Logo"
                                    className="mb-6 w-auto h-[100px] mx-auto"
                                />
                            </Link>
                        </div>
                        <div className="illustration-wrapper pb-30">
                            <img
                                src="/images/getting_started_illustration.svg"
                                alt="Familiehjælp Illustration"
                                className="mt-8 w-full max-w-[400px] mx-auto"
                            />
                        </div>
                    </div>
                    <div className="xs:w-full sm:w-full md:w-full lg:w-6/12 bg-white flex flex-col items-center justify-center min-h-screen">
                        <div className="container max-w-[1440px] px-8 py-4 mx-auto text-black">
                            <div className="category-picker flex flex-wrap">
                                <div className="w-full py-4">
                                    <h1 className="text-4xl font-bold">Kom godt i gang med familiehjælp</h1> 
                                    <div className="text-xl">
                                        <p className="my-4">
                                            Vi ønsker at gøre din oplevelse med FamilieHjælp så personlig og relevant som muligt. For at hjælpe os med dette, vil vi gerne invitere dig til at gennemføre vores onboarding-proces. Dette vil give os mulighed for bedre at forstå dine behov og præferencer, så vi kan tilbyde dig den bedst mulige støtte og ressourcer.
                                        </p>
                                        <p>
                                            Uanset om du er her for første gang eller vender tilbage for at fortsætte din rejse, er vi her for at støtte dig hvert skridt på vejen. Lad os sammen tage de første skridt mod en mere organiseret og støttende oplevelse med FamilieHjælp.
                                        </p>
                                        <p className="mb-4">Vi dækker over nedenstående emner for at sikre, at du får den bedst mulige start, vælg venligst den situation, der passer bedst til dig:</p>
                                        <p>
                                            Inden du går i gang, vil vi gerne informere dig om, at alle de oplysninger, du deler med os under onboarding-processen, behandles fortroligt og i overensstemmelse med vores privatlivspolitik. Din tillid er vigtig for os, og vi er forpligtet til at beskytte dine data.
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full pl-0 md:pl-0">
                                    <ul className="list-disc list-inside my-4 list-none flex flex-gap flex-col gap-4 pl-0">
                                        <li className="bg-blue-800 text-white p-8 rounded-md">
                                            <div className="title">
                                                <p className="text-2xl mb-4">Står overfor en abort eller senabort?</p>
                                            </div>
                                            <div className="description mb-4">
                                                <p>Vi forstår, at det kan være en svær tid, og vi er her for at støtte dig gennem processen. Vores app tilbyder ressourcer og vejledning til at hjælpe dig med at navigere i de følelsesmæssige og praktiske aspekter af abort eller senabort.</p>
                                            </div>
                                            <a className="font-bold" href="#">Gå videre</a>
                                        </li>
                                        <li className="bg-blue-800 text-white p-8 rounded-md my-2">
                                            <div className="title">
                                                <p className="text-2xl mb-4">Er blevet forælder til et dødfødt barn?</p>
                                            </div>
                                            <div className="description mb-4">
                                                <p>Vi forstår, at det kan være en svær tid, og vi er her for at støtte dig gennem processen. Vores app tilbyder ressourcer og vejledning til at hjælpe dig med at navigere i de følelsesmæssige og praktiske aspekter af abort eller senabort.</p>
                                            </div>
                                            <a className="font-bold" href="#">Gå videre</a>
                                        </li>
                                        <li className="bg-blue-800 text-white p-8 rounded-md">
                                            <div className="title">
                                                <p className="text-2xl mb-4">Er blevet forælder til et rask barn?</p>
                                            </div>
                                            <div className="description mb-4">
                                                <p>Vi forstår, at det kan være en svær tid, og vi er her for at støtte dig gennem processen. Vores app tilbyder ressourcer og vejledning til at hjælpe dig med at navigere i de følelsesmæssige og praktiske aspekter af abort eller senabort.</p>
                                            </div>
                                            <a className="font-bold" href="#">Gå videre</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default function GettingStarted() {
    return (
        <OnboardingProvider>
            <GettingStartedContent />
        </OnboardingProvider>
    );
}

import {type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { useOnboarding } from '@/contexts/OnboardingContext';

const GettingStartedContent = ({step}: {step?: string}) => {
    const { auth, name } = usePage<SharedData>().props;
    const { onboardingState } = useOnboarding();

    // this need to be improved, we need to handle the step in a better way from this page
    // we need to tell the user what step they are on, and what they need to do next with a link to the next step
    console.log('GettingStartedContent rendered with auth:', auth);
    console.log('Onboarding State:', onboardingState);

    return (
        <>
            <Head title={`Kom i gang | ${name}`} />
            <header>
                <nav className="fixed top-0 left-0 z-50 w-full bg-transparent bg-[#0a0a0a]">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4">
                        <Link href={route('home')} className="flex items-center text-white">
                            Gå tilbage
                        </Link>
                    </div>
                </nav>
            </header>
            <main className="bg-[#0a0a0a] text-white min-h-screen">
                <div className="container-fluid py-8 max-w-full flex w-full flex-col items-center justify-center bg-[#004EA7] text-white bg-[#0a0a0a]">
                    <div className="container max-w-[960px] flex-col py-8 items-center justify-center text-center">
                        <div className="logo">
                            <Link href={route('home')}>
                                <img src="/images/FamilieHjælp_text_logo.svg" alt="Familiehjælp Logo" className="animate animate-fade-up animate-ease-linear  relative bottom-4 animate-in mb-6 w-auto h-[50px] mx-auto" />
                                <img
                                    src="/images/logo.svg"
                                    alt="Familiehjælp Logo"
                                    className="mb-6 w-auto h-[100px] mx-auto"
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
                    </div>
                </div>
                <div className="container-fluid bg-white max-w-full w-full">
                    <div className="container max-w-[960px] px-4 py-8 mx-auto text-black">
                        <p className="mt-6 text-lg font-normal">
                            Nogle oplevelser ændrer livet fra det ene øjeblik til det andet. At miste et barn — uanset hvor langt man er i graviditeten — er en sorg, der kan være svær at sætte ord på. Det er en tid fyldt med følelser, spørgsmål og beslutninger, som man aldrig havde forestillet sig at skulle tage.
                        </p>
                        <p className="mt-6 text-lg font-normal">
                            Uanset hvor du står lige nu, er du ikke alene. {name} er skabt for dig, der står midt i eller efter et tab. Her er der plads til både sorg, tvivl, vrede,
                        </p>
                        <p className="mt-6 text-lg font-normal">
                            kærlighed og savn — og ingen følelser er forkerte.
                        </p>
                        <p className="mt-6 text-lg font-normal">
                            FamilieHjælp giver dig nødvendig information og dine muligheder og rettigheder i din situation.
                        </p>
                        <p className="mt-6 text-lg font-normal">
                            Du finder råd og støtte til at navigere i den svære tid både praktisk og følelsesmæssigt.
                        </p>
                        <p className="mt-6 text-lg font-normal">
                            Du behøver ikke gå vejen alene. Her er der plads til dig, lige som du er, med det du bærer på.
                        </p>
                        <p className="mt-6 text-lg font-bold">
                            Velkommen
                        </p>
                        <nav className="flex mt-8 items-center justify-start gap-4">
                            {auth.user && auth.user.has_completed_onboarding ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-white hover:border-white dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link 
                                        href={route('onboarding.step', {_query: {step: step}})} 
                                        className="inline-block rounded-sm border border-[#004EA7] bg-[#004EA7] px-5 py-1.5 text-xl leading-normal text-white hover:border-white"
                                    >
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

export default function GettingStarted({ step }: { step?: string }) {
    return (
        <OnboardingProvider>
            <GettingStartedContent step={step} />
        </OnboardingProvider>
    );
}

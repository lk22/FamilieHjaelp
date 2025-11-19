import {useEffect} from 'react';
import {type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { OnboardingState } from '@/state/OnboardingState';

// TODO: i want to implement unique onboarding process steps for a given user instead of the deafult global state but have a global state for a authenticated user profile

const GettingStartedContent = () => {
    const { auth, name } = usePage<SharedData>().props;
    const { onboardingState } = useOnboarding();

    console.log('GettingStartedContent rendered with auth:', auth);

    // TODO: implement a check on query param to jump to a specific step if needed

    return (
        <>
            <Head title={`Kom i gang | ${name}`} />
            <header>
                <nav className="fixed top-0 left-0 z-50 w-full bg-[#004EA7] shadow-md">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4">
                        <Link href={route('home')} className="flex items-center text-white">
                            Gå tilbage
                        </Link>
                    </div>
                </nav>
            </header>
            <main className="bg-[#0a0a0a] text-white h-screen pt-16">
                <div className="container-fluid py-8 max-w-full flex w-full flex-col items-center justify-center bg-[#004EA7] text-white bg-[#0a0a0a]">
                    <div className="container max-w-[960px] flex-col py-8 items-center justify-center text-center">
                        <div className="logo pt-30">
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
                </div>
                <div className="container-fluid bg-white max-w-full w-full min-h-[600px] flex justify-center">
                    <div className="container max-w-[1440px] px-4 py-16 mx-auto text-black">
                        <div className="category-picker">
                            <h1 className="text-3xl font-bold">Kom god i gang med familiehjælp</h1>
                            <p className="my-4">
                                Vi ønsker at gøre din oplevelse med FamilieHjælp så personlig og relevant som muligt. For at hjælpe os med dette, vil vi gerne invitere dig til at gennemføre vores onboarding-proces. Dette vil give os mulighed for bedre at forstå dine behov og præferencer, så vi kan tilbyde dig den bedst mulige støtte og ressourcer.
                            </p>
                            <p>
                                Uanset om du er her for første gang eller vender tilbage for at fortsætte din rejse, er vi her for at støtte dig hvert skridt på vejen. Lad os sammen tage de første skridt mod en mere organiseret og støttende oplevelse med FamilieHjælp.
                            </p>
                            <p>Vi dækker over nedenstående emner for at sikre, at du får den bedst mulige start, vælg venligst den situation, der passer bedst til dig:</p>
                            <ul className="list-disc list-inside my-4 list-none flex flex-gap gap-4">
                                <li className="bg-blue-800 text-white p-8 rounded-md m-2">
                                    <div className="title">
                                        <p className="text-2xl mb-4">Står overfor en abort eller senabort?</p>
                                    </div>
                                    <div className="description mb-4">
                                        <p>Vi forstår, at det kan være en svær tid, og vi er her for at støtte dig gennem processen. Vores app tilbyder ressourcer og vejledning til at hjælpe dig med at navigere i de følelsesmæssige og praktiske aspekter af abort eller senabort.</p>
                                    </div>
                                    <a className="font-bold" href="#">Gå videre</a>
                                </li>
                                <li className="bg-blue-800 text-white p-8 rounded-md m-2">
                                    <div className="title">
                                        <p className="text-2xl mb-4">Er blevet forælder til et dødfødt barn?</p>
                                    </div>
                                    <div className="description mb-4">
                                        <p>Vi forstår, at det kan være en svær tid, og vi er her for at støtte dig gennem processen. Vores app tilbyder ressourcer og vejledning til at hjælpe dig med at navigere i de følelsesmæssige og praktiske aspekter af abort eller senabort.</p>
                                    </div>
                                    <a className="font-bold" href="#">Gå videre</a>
                                </li>
                                <li className="bg-blue-800 text-white p-8 rounded-md m-2">
                                    <div className="title">
                                        <p className="text-2xl mb-4">Er blevet forælder til et rask barn?</p>
                                    </div>
                                    <div className="description mb-4">
                                        <p>Vi forstår, at det kan være en svær tid, og vi er her for at støtte dig gennem processen. Vores app tilbyder ressourcer og vejledning til at hjælpe dig med at navigere i de følelsesmæssige og praktiske aspekter af abort eller senabort.</p>
                                    </div>
                                    <a className="font-bold" href="#">Gå videre</a>
                                </li>
                            </ul>
                            <p>
                                Inden du går i gang, vil vi gerne informere dig om, at alle de oplysninger, du deler med os under onboarding-processen, behandles fortroligt og i overensstemmelse med vores privatlivspolitik. Din tillid er vigtig for os, og vi er forpligtet til at beskytte dine data.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

const GettingStartedDescriptionContent = () => {
    const { auth, name } = usePage<SharedData>().props;
    const { onboardingState, resetOnboarding } = useOnboarding();

    const completedSteps = onboardingState.completedSteps;
    const currentStep = completedSteps.lastIndexOf(completedSteps[completedSteps.length - 1]) + 1 || 1;
    console.log('Current Step:', currentStep);

    let nextStep = currentStep;

    if ( currentStep > 1 ) {
        nextStep = currentStep + 1;
    }

    // Getting the name of the next step
    const stepName = onboardingState.steps.find(s => s.id === nextStep)?.name;

    // check if a global state is initiated for the authenticated user
    // get the users global state
    useEffect(() => {
        if (auth?.user?.id && !onboardingState) {
            resetOnboarding();
        }
    }, [onboardingState, resetOnboarding, auth?.user?.id]);

    return (
        <>

            

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
                {auth.user && auth.isOnboarded ? (
                    <Link
                        href={route('profile.home')}
                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-white hover:border-white dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                    >
                        Gå til profil
                    </Link>
                ) : (
                    <>
                        <Link 
                            href={route('onboarding.step', {_query: {step: stepName}})} 
                            className="inline-block rounded-sm border border-[#004EA7] bg-[#004EA7] px-5 py-1.5 text-xl leading-normal text-white hover:border-white"
                        >
                            Start
                        </Link>
                    </>
                )}
            </nav>
        </>
    )
}

const CompletedStepContent = ({ step }: { step: number }) => {
    const { onboardingState } = useOnboarding();
    const { auth } = usePage<SharedData>().props;

    const currentStepData = onboardingState.steps.find(s => s.id === step);
    const situationState = onboardingState.steps.find(s => s.id === 2);
    console.log(situationState);
    console.log('Current Step Data:', currentStepData);

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-bold mb-4">Du er kommet til trin {step}</h2>
            {
                currentStepData?.id === 6 ? (
                    <>
                        <p className="text-lg mb-4">
                            Du har gennemført alle trin i onboarding-processen. Du kan nu begynde at udforske de forskellige ressourcer og muligheder, der er tilgængelige for dig.
                        </p>
                        <Link
                            href={`${
                                auth?.user?.id ? route('profile.home') : route('onboarding.complete')
                            }`}
                            className="inline-block mr-4 bg-blue-900 text-white px-4 py-2 rounded-sm hover:bg-blue-800 transition-colors duration-300"
                        >
                            Færdiggør onboarding
                        </Link>
                    </>
                ) : (
                    <>
                       <StepProcessDescription step={step} state={onboardingState} />
                        <GettingStartedDescriptionContent />
                    </>
                    
                )}
        </div>
    );
}

// TODO set a type for state parameter
function StepProcessDescription({step, state}: {step: number, state?: OnboardingState}) {
    console.log({state})
    switch (step) {
        case 1:
            return (
                <>
                    <p className="font-bold">Du er i startfasen til modtagelse af hjælp og vejledning</p>
                </>
            );
        case 2:
            return (
                <>
                    <p>Vi mangler at kende din situation bedre for at kunne give en mere præcis vejledning.</p>
                </>
            );
        case 3:
            return (
                <>
                    <p>Vi har registreret, at du har mistet en nærstående. Dette kan påvirke din situation.</p>
                </>
            );
        default:
            return (
                <>
                    <p>Du er nu på et ukendt trin.</p>
                </>
            );
    }
}

export default function GettingStarted() {
    return (
        <OnboardingProvider>
            <GettingStartedContent />
        </OnboardingProvider>
    );
}

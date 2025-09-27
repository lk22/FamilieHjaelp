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
    const { completedSteps, nextStep } = onboardingState;
    const nextProceededStep = nextStep 
        ? nextStep 
        : completedSteps.length > 0 
            ? completedSteps[completedSteps.length - 1] + 1 
            : 1;

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
            <main className="bg-[#0a0a0a] text-white h-screen">
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
                <div className="container-fluid bg-white max-w-full w-full h-screen">
                    <div className="container max-w-[960px] px-4 py-8 mx-auto text-black">
                        {
                            nextProceededStep < 0 ? (
                                <GettingStartedDescriptionContent />
                            ) : (
                                <CompletedStepContent step={nextProceededStep} />
                            )
                        }
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

    console.log('Current Step:', currentStep);
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

// TODO set a type for state parameter
// function stepProcessDescriptionContent({step, state}: {step: number, state?: any}) {
    
//     const situationState = state?.steps.find((s: { id: number; }) => s.id === 2);
//     console.log({situationState})


//     switch (step) {
//         case 1:
//         case 2:
//             return (
//                 <>
//                     <p className="text-lg mb-4">
//                         Forældrehjælp er platformen til dig der søger hjælp og vejledning efter din nuværende situation. Vi forstår, at det kan være overvældende at navigere gennem de mange følelser og beslutninger, der kan medfølge.
//                     </p>
//                     <p className="text-lg mb-4">
//                         Gennem denne proces vil vi guide dig gennem forskellige trin, der er designet til at adressere dine specifikke behov og bekymringer. Hvert trin er vigtigt, da det hjælper med at forstå din situation bedre og giver dig mulighed for at udtrykke dine følelser og tanker.
//                     </p>
//                     <p className="text-lg mb-4">
//                         Vi opfordrer dig til at tage dig tid til at reflektere over hvert trin og være åben omkring dine følelser. Husk, at du ikke er alene i denne rejse, og vi er her for at støtte dig hvert skridt på vejen.
//                     </p>
//                 </>
//             );
//         case 3:
//             if (situationState?.data)
//             return (
//                 <>
//                 </>
//             );
//             break;
//         case 4:
//         case 5:
//         case 6:
//         default:
//             return (
//                 <>
//                     <p>Du er nu på et ukendt trin.</p>
//                 </>
//             );
//     }
// }

export default function GettingStarted() {
    return (
        <OnboardingProvider>
            <GettingStartedContent />
        </OnboardingProvider>
    );
}

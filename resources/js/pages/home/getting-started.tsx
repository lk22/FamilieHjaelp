// Dependencies
import { type SharedData } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useCallback, useState } from 'react';

// Context
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';

// Components
import GettingStartedDescription from '@/components/Onboarding/GettingStartedDescription';
import ScenarioItemList from '@/components/Onboarding/ScenarioItemList';

interface OnboardingSessionProps {
    onboardingSession: {
        token: string | null;
        currentStep: string | null;
        nextStep: string | null;
        stepsData: Record<string, any>;
        formData: Record<string, any>;
        completed: boolean;
    };
}

const GettingStartedContent = ({ onboardingSession }: OnboardingSessionProps) => {
    const { name } = usePage<SharedData>().props;
    const [scenario, setScenario] = useState<string | null>(null);
    const { onboardingState, updateCurrentScenario, updateCurrentStep, getCurrentStep, resetOnboarding } = useOnboarding();

    const currentScenario = onboardingState.scenarios.find((scenario) => scenario.id === onboardingState.currentScenario);
    const currentStep = getCurrentStep();

    const currentSessionData = onboardingSession.stepsData;

    console.log('Current step:', currentStep);
    console.log('Current Session State:', onboardingSession.stepsData);

    const handleReset = useCallback(() => {
        console.log('Resetting onboarding session');
        resetOnboarding();
        setScenario(null);
        router.visit(route('onboarding.reset'));
    }, [resetOnboarding])

    const handleScenarioChange = useCallback((selectedScenario: string) => {
        setScenario(selectedScenario);
        updateCurrentScenario(selectedScenario);
        updateCurrentStep('one');

        console.log(currentScenario, currentStep);
    }, [updateCurrentScenario, updateCurrentStep, onboardingSession.token]);

    console.log(onboardingSession);

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
                    <div className="xs:w-full xs:hidden bg-[#004EA7] py-8 text-white sm:hidden sm:w-full md:hidden md:w-full lg:flex lg:w-full">
                        <div className="xs:max-w-full xs:w-full mx-auto px-8 sm:w-full sm:max-w-full md:w-full md:max-w-full lg:w-full lg:max-w-[1680px] xl:w-full xl:max-w-[1680px]">
                            <div className="logo flex justify-between">
                                <Link href={route('home')} className="flex items-center justify-between gap-4 text-white">
                                    <img src="/images/logo.svg" alt="Familiehjælp Logo" className="mx-auto mb-14 h-[80px] w-auto" />
                                    <img
                                        src="/images/FamilieHjælp_text_logo.svg"
                                        alt="Familiehjælp Logo"
                                        className="relative bottom-4 mx-auto mb-6 h-[50px] w-auto"
                                    />
                                </Link>
                                <div className="illustration-wrapper flex pb-30">
                                    <img
                                        src="/images/getting_started_illustration.svg"
                                        alt="Familiehjælp Illustration"
                                        className="mx-auto mt-8 w-full max-w-[300px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="xs:w-full xs:top:0 relative z-0 mx-auto flex flex-col bg-white p-8 sm:top-0 sm:w-full md:top-0 md:w-full lg:-top-28 lg:w-full xl:-top-28 xl:w-[1580px] xl:rounded-lg xl:shadow-lg">
                        <div className="container mx-auto max-w-full text-black">
                            <div className="category-picker flex flex-wrap">
                                <GettingStartedDescription />
                                <div className="w-full pl-0 md:pl-0">
                                    {currentSessionData.currentStep !== 'welcome' ? (
                                        <div className="mb-6 border-l-4 border-blue-500 bg-blue-100 p-4 text-blue-700" role="alert">
                                            <h3 className="text-xl font-bold">Du har en igangværende session</h3>
                                            {onboardingSession.nextStep ? (
                                                <button className='mt-8 rounded-md bg-blue-800 px-6 py-3 text-white transition duration-300 hover:bg-blue-900'>
                                                    <Link
                                                        href={route(`onboarding.scenario.step`, {
                                                            step: onboardingSession.nextStep,
                                                            scenario: currentScenario?.id,
                                                        })}
                                                    >
                                                        Fortsæt hvor du slap
                                                    </Link>
                                                </button>
                                            ) : (
                                                <>
                                                    <h3 className="mt-2 text-xl">
                                                        Du har en igangværende session, men der er ingen næste step at fortsætte til. Du kan starte
                                                        forfra ved at vælge en situation nedenfor.
                                                    </h3>
                                                    <button
                                                        className="mt-4 rounded-md bg-blue-800 px-6 py-3 text-white transition duration-300 hover:bg-blue-900"
                                                        onClick={() => handleReset()}
                                                    >
                                                        <span className="-ml-px cursor-pointer text-xl font-bold">Start forfra</span>
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <>
                                            <ScenarioItemList handleScenarioChange={handleScenarioChange} />
                                            {!scenario ? (
                                                <>
                                                    <p className="mt-4">
                                                        <span className="ms-4 text-gray-500">Vælg en situation for at fortsætte</span>
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    {currentScenario && currentStep != 'welcome' ? (
                                                        <button className="mt-4 rounded-md bg-blue-800 px-6 py-3 text-white transition duration-300 hover:bg-blue-900">
                                                            <Link
                                                                href={route(`onboarding.scenario.step`, {
                                                                    step: currentStep,
                                                                    scenario: currentScenario.id,
                                                                })}
                                                                className="rounded-md bg-blue-800 px-6 py-3 text-white transition duration-300 hover:bg-blue-900 mt-4"
                                                            >
                                                                Fortsæt
                                                            </Link>
                                                        </button>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    <button className="mt-4 rounded-md bg-blue-800 px-6 py-3 text-white transition duration-300 hover:bg-blue-900 ml-4">
                                                        <Link
                                                            href={route(`onboarding.scenario.step`, { step: 'one', scenario: scenario })}
                                                            className="ms-4 rounded-md bg-blue-800 px-6 py-3 text-white transition duration-300 hover:bg-blue-900 mt-4"
                                                        >
                                                            Kom igang
                                                        </Link>
                                                    </button>
                                                </>
                                            )}
                                        </>
                                    )}
                                    <p className="mt-8 text-left text-lg">{/* {renderGettingStartedActions()} */}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default function GettingStarted({ onboardingSession }: OnboardingSessionProps) {
    return (
        <OnboardingProvider initialSession={onboardingSession}>
            <GettingStartedContent onboardingSession={onboardingSession} />
        </OnboardingProvider>
    );
}

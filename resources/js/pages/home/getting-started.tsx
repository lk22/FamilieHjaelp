// Dependencies
import { useState, useCallback, JSX, useEffect } from 'react';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

// Utilities
import { setOnboardingSessionTokenCookie } from '@/lib/utils';

// Context
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';

// Components
import ScenarioItemList from '@/components/Onboarding/ScenarioItemList';
import GettingStartedDescription from '@/components/Onboarding/GettingStartedDescription';

interface OnboardingSessionProps {
    onboardingSession: {
        token: string | null;
        currentStep: string | null;
        stepsData: Record<string, any>;
        formData: Record<string, any>;
        completed: boolean;
    };
}

const GettingStartedContent = ({onboardingSession}: OnboardingSessionProps) => {
    const { name } = usePage<SharedData>().props;
    const [ scenario, setScenario ] = useState<string | null>(null);
    const { onboardingState, updateCurrentScenario, updateCurrentStep, getCurrentStep } = useOnboarding();

    const currentScenario = onboardingState.scenarios.find(scenario => scenario.id === onboardingState.currentScenario);
    const currentStep = getCurrentStep();

    const handleScenarioChange = useCallback((selectedScenario: string) => {
        setScenario(selectedScenario);
        updateCurrentScenario(selectedScenario);
        updateCurrentStep('one');
        // if (onboardingSession.token) {
        //     setOnboardingSessionTokenCookie(onboardingSession.token);
        // }

        console.log(currentScenario, currentStep);
    }, [updateCurrentScenario, updateCurrentStep, onboardingSession.token]);

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
                    <div className="xs:w-full xs:hidden sm:hidden md:hidden lg:flex sm:w-full md:w-full lg:w-full bg-[#004EA7] text-white py-8">
                        <div className="xs:max-w-full sm:max-w-full md:max-w-full lg:max-w-[1680px] xl:max-w-[1680px] xs:w-full sm:w-full md:w-full lg:w-full xl:w-full mx-auto px-8">
                            <div className="logo flex justify-between">
                                    <Link href={route('home')} className="flex items-center justify-between gap-4 text-white">
                                        <img
                                            src="/images/logo.svg"
                                            alt="Familiehjælp Logo"
                                            className="mb-14 w-auto h-[80px] mx-auto"
                                        />
                                        <img src="/images/FamilieHjælp_text_logo.svg" alt="Familiehjælp Logo" className="relative bottom-4 mb-6 w-auto h-[50px] mx-auto" />
                                    </Link>
                                <div className="illustration-wrapper pb-30 flex">
                                    <img
                                        src="/images/getting_started_illustration.svg"
                                        alt="Familiehjælp Illustration"
                                        className="mt-8 w-full max-w-[300px] mx-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="xs:w-full sm:w-full md:w-full lg:w-full xl:w-[1580px] mx-auto bg-white flex flex-col relative xs:top:0 sm:top-0 md:top-0 lg:-top-28 xl:-top-28 z-0 p-8 xl:rounded-lg xl:shadow-lg">
                        <div className="container max-w-full mx-auto text-black">
                            <div className="category-picker flex flex-wrap">
                                <GettingStartedDescription />
                                <div className="w-full pl-0 md:pl-0">
                                    <ScenarioItemList handleScenarioChange={handleScenarioChange} />
                                    <p className="text-left text-lg mt-8">
                                        {/* {renderGettingStartedActions()} */}
                                        {
                                            !scenario ? (
                                                <>
                                                    <span className="text-gray-500 ms-4">Vælg en situation for at fortsætte</span>
                                                </>
                                            ) : (
                                                <>
                                                    {
                                                        currentScenario && currentStep != 'welcome' ? (
                                                            <Link href={route(`onboarding.scenario.step`, { step: currentStep, scenario: currentScenario.id})} className="bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900 transition duration-300">
                                                                Fortsæt
                                                            </Link>
                                                        ) : (
                                                            <></>
                                                        )
                                                    }
                                                    <Link href={route(`onboarding.scenario.step`, { step: 'one', scenario: scenario})} className="bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900 transition duration-300 ms-4">
                                                        Kom igang
                                                    </Link>
                                                </>
                                            )
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}

export default function GettingStarted({onboardingSession}: OnboardingSessionProps) {
    console.log('Onboarding Session:', onboardingSession);
    return (
        <OnboardingProvider initialSession={onboardingSession}>
            <GettingStartedContent onboardingSession={onboardingSession}/>
        </OnboardingProvider>
    );
}

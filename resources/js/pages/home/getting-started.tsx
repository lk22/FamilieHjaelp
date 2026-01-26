import { useState, useCallback } from 'react';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';

import { RadioButton } from '@/components/ui/radio';

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
    const { updateCurrentScenario, updateCurrentStep, onboardingState} = useOnboarding();

    const setOnboardingSessionTokenCookie = (token: string) => {
        document.cookie = `onboarding_session_token=${token}; path=/; max-age=${60 * 60 * 24 * 30}`;
    }

    const handleScenarioChange = useCallback((selectedScenario: string) => {
        setScenario(selectedScenario);
        updateCurrentScenario(selectedScenario);
        updateCurrentStep('one');
        setOnboardingSessionTokenCookie(onboardingSession.token);
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
                    <div className="xs:w-full sm:w-full md:w-full lg:w-8/12 bg-white flex flex-col items-center justify-center min-h-screen">
                        <div className="container max-w-[1440px] px-8 py-4 mx-auto text-black">
                            <div className="category-picker flex flex-wrap">
                                <div className="w-full py-4">
                                    <h1 className="text-4xl font-bold">Kom godt i gang med familiehjælp</h1>
                                    <div className="text-xl w-10/12">
                                        <p className="my-4">
                                            Vi ønsker at gøre din oplevelse med FamilieHjælp så personlig og relevant som muligt. For at hjælpe os med dette, vil vi gerne invitere dig til at gennemføre vores onboarding-proces. Dette vil give os mulighed for bedre at forstå dine behov og præferencer, så vi kan tilbyde dig den bedst mulige støtte og ressourcer.
                                        </p>
                                        <p className="mb-4">
                                            Uanset om du er her for første gang eller vender tilbage for at fortsætte din rejse, er vi her for at støtte dig hvert skridt på vejen. Lad os sammen tage de første skridt mod en mere organiseret og støttende oplevelse med FamilieHjælp. Vi dækker over nedenstående emner for at sikre, at du får den bedst mulige start, vælg venligst den situation, der passer bedst til dig:
                                        </p>
                                        <p>
                                            Inden du går i gang, vil vi gerne informere dig om, at alle de oplysninger, du deler med os under onboarding-processen, behandles fortroligt og i overensstemmelse med vores privatlivspolitik. Din tillid er vigtig for os, og vi er forpligtet til at beskytte dine data.
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full pl-0 md:pl-0">
                                    <ul className="my-4 list-none flex gap-4 pl-0 flex-col">
                                        <li className='flex items-center'>
                                            <RadioButton
                                                type="radio"
                                                name="onboarding_scenario"
                                                id="onboarding-scenario-abortion"
                                                className="ml-4"
                                                checked={scenario === 'abortion'}
                                                onChange={() => handleScenarioChange('abortion')}
                                            />
                                            <label htmlFor="onboarding-scenario-abortion" className="ml-4 text-xl">
                                                <span className="sr-only">Jeg står midt i en abort / har oplevet en abort</span>
                                                Jeg står midt i en abort / har oplevet en abort
                                            </label>
                                        </li>
                                        <li className='flex items-center'>
                                            <RadioButton
                                                type="radio"
                                                name="onboarding_scenario"
                                                id="onboarding-scenario-stillbirth"
                                                className="ml-4"
                                                checked={scenario === 'stillbirth'}
                                                onChange={() => handleScenarioChange('stillbirth')}
                                            />
                                            <label htmlFor="onboarding-scenario-stillbirth" className="ml-4 text-xl">
                                                <span className="sr-only">Er blevet forælder til et dødfødt barn</span>
                                                Er blevet forælder til et dødfødt barn
                                            </label>
                                        </li>
                                        <li className='flex items-center'>
                                            <RadioButton
                                                type="radio"
                                                name="onboarding_scenario"
                                                id="onboarding-scenario-parents"
                                                className="ml-4"
                                                checked={scenario === 'parenting'}
                                                onChange={() => handleScenarioChange('parenting')}
                                            />
                                            <label htmlFor="onboarding-scenario-parents" className="ml-4 text-xl">
                                                <span className="sr-only">Er blevet forælder til et rask barn</span>
                                                Er blevet forælder til et rask barn
                                            </label>
                                        </li>
                                    </ul>
                                    <p className="text-left text-lg mt-8">
                                        {
                                            !scenario ? (
                                                <>
                                                    <span className="text-gray-500 ms-4">Vælg venligst en situation for at fortsætte</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Link href={route(`onboarding.scenario.step`, { step: 'one', scenario: scenario })} className="bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900 transition duration-300 ms-4">
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
                    <div className="xs:w-full xs:hidden sm:hidden md:hidden lg:flex sm:w-full md:w-full lg:w-4/12 bg-[#004EA7] text-white flex flex-col items-center justify-center ">
                        <div className="logo pt-30 w-full">
                            <Link href={route('home')}>
                                <img src="/images/FamilieHjælp_text_logo.svg" alt="Familiehjælp Logo" className="relative bottom-4 mb-6 w-auto h-[50px] mx-auto" />
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
            </main>
        </>
    );
}

export default function GettingStarted({onboardingSession}: OnboardingSessionProps) {
    return (
        <OnboardingProvider initialSession={onboardingSession}>
            <GettingStartedContent onboardingSession={onboardingSession}/>
        </OnboardingProvider>
    );
}

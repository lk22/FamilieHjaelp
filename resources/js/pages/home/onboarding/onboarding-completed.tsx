import {useEffect, useState, useCallback} from 'react'
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { Head, Link } from '@inertiajs/react';

import {useOnboarding} from '@/contexts/OnboardingContext';

const OnboardingCompletedContent = () => {
    const { onboardingState, getCurrentStepData } = useOnboarding();
    const [ response, setResponse ] = useState<null>(null);

    // use useCallback to post the onboarding data and save the memoized function
    const postOnboardingData = useCallback(() => {
        // create a new post request to the backend that sends the onboarding state
        const postData = async () => {
            try {
                const response = await fetch(route('api.onboarding.process.complete'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(onboardingState),
                });
                const data = await response.json();
                console.log(data)
                setResponse(data);
            } catch (error) {
                console.error('Error posting onboarding data:', error);
            }
        };

        postData();
    }, [onboardingState]);

    // Call the post function when the component mounts
    useEffect(() => {
        postOnboardingData();
    }, [postOnboardingData]);

    const name = getCurrentStepData(1)?.stepOne?.name || 'Familiehjælp';

    return (
        <>
            <Head title={``} />
            <main className="dark:bg-[#0a0a0a]">
                <div className="container-fluid py-8 max-w-full flex w-full flex-col items-center justify-center bg-[#004EA7] text-white dark:bg-[#0a0a0a] h-screen">
                    <div className="container max-w-[960px] flex-col py-8 items-center justify-center text-center">
                        <div className="logo">
                            <img 
                                src="/images/FamilieHjælp_text_logo.svg" 
                                alt="Familiehjælp Logo" 
                                className="animate animate-fade-up animate-ease-linear relative bottom-4 animate-in mb-6 w-auto dark:invert h-[50px] mx-auto" 
                            />
                            <img
                                src="/images/logo.svg"
                                alt="Familiehjælp Logo"
                                className="mb-6 w-auto dark:invert h-[100px] mx-auto"
                            />
                        </div>
                        <div className="illustration-wrapper">
                            <img
                                src="/images/getting_started_illustration.svg"
                                alt="Familiehjælp Illustration"
                                className="mt-8 w-full max-w-[400px] mx-auto"
                            />
                        </div>
                        <h1 className="text-3xl mt-4">Kære { name }, <br></br> Vi har modtaget dine svar</h1>
                        <div className="mt-2 text-xl">
                            Vi giver dig et overblik over den information og de muligheder, du har i din situation samt et overblik over de ting du skal være opmærksom på og få gjort i den kommende tid.
                        </div>
                        <div className="mt-2 text-xl">
                            Du mangler nu blot at oprette en bruger for at få adgang til dit personlige overblik.
                        </div>
                        <Link href={route('profile.home')} className="mt-4 inline-block text-white bg-blue-600  hover:bg-blue-700 px-6 py-3 rounded-md text-lg">
                            Gå til overblik
                        </Link>
                    </div>
                    {/*
                        setting a loading state proccess bar here
                    */}
                </div>
            </main>
        </>
    )
}

export default function OnboardingCompleted() {
    return (
        <OnboardingProvider>
            <OnboardingCompletedContent />
        </OnboardingProvider>
    );
}

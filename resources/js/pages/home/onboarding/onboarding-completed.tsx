import {useEffect, useState, useCallback} from 'react'
import { Head, Link, usePage} from '@inertiajs/react';

import { OnboardingProvider } from '@/contexts/OnboardingContext';
import {useOnboarding} from '@/contexts/OnboardingContext';
import { type SharedData } from '@/types';

interface CompletedMessageProps {
    name: string;
}

interface LoadingProgressResponse {
    message: string;
    status: string;
}

interface LoadingProgressSteps {
    name: string;
    percentage: number;
    action: () => Promise<void>;
}

const OnboardingCompletedContent = () => {
    const { auth } = usePage<SharedData>().props;
    const { onboardingState, getCurrentStepData } = useOnboarding();
    const name = getCurrentStepData(1)?.stepOne?.name || 'Familiehjælp';

    console.log('Onboarding State:', onboardingState);
    const [ response, setResponse ] = useState<LoadingProgressResponse>({
        message: '',
        status: ''
    });
    
    const [ loading, setLoading ] = useState(true);
    const [loadingPercentage, setLoadingPercentage] = useState(0);

    const postOnboardingData = useCallback(async () => {

        const steps: LoadingProgressSteps[] = [
            {
                name: 'Checking authentication status',
                percentage: 20,
                action: async () => {
                    setResponse({ message: 'Checking authentication status', status: 'checking for existing user authentication' });
                    console.log('Checking authentication status...');
                    try {
                        if ( ! auth?.user?.id ) {
                            setResponse({ message: 'Authentication check failed', status: 'An error occurred while checking authentication' });
                            throw new Error('Authentication check failed');
                        }

                        console.log('Authentication check response:', auth?.user);

                        setResponse({ message: 'Authentication check successful', status: 'User is authenticated successfully' });
                    } catch (error) {
                        setResponse({ message: 'Error checking authentication', status: 'An error occurred while checking authentication' });
                        console.error('Error checking authentication:', error);
                    }
                }
            },
            {
                name: 'Generating overview',
                percentage: 40,
                action: async () => {
                    setResponse({ message: 'Generating overview', status: 'Generating overview' });
                    console.log('Generating overview...');
                    try {
                        const response = await fetch(route('api.onboarding.process.complete.todos'), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(onboardingState),
                        });

                        const data = await response.json();
                        console.log('Overview generated:', data);
                        setResponse({ message: data.message || 'Overview generated successfully', status: "Generating overview in progress" });

                    } catch (error) {
                        setResponse({ message: 'Error generating overview', status: 'An error occurred while generating overview' });
                        console.error('Error generating overview:', error);
                    }
                }
            },
            {
                name: 'Completing onboarding process',
                percentage: 60,
                action: async () => {
                    setResponse({ message: 'Completing onboarding process', status: 'Completing onboarding process' });
                    try {
                        const response = await fetch(route('api.onboarding.process.complete'), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(onboardingState),
                        });

                        const data = await response.json();

                        setResponse({ message: data.message || 'Onboarding completed successfully', status: "Completing onboarding process" });
                    } catch (error) {
                        setResponse({ message: 'Error completing onboarding process', status: 'An error occurred while completing onboarding process' });
                        console.error('Error completing onboarding process:', error);
                    }
                }
            },
            {
                name: 'Onboarding completed',
                percentage: 100,
                action: async () => {
                    setResponse({ message: 'Onboarding process completed', status: 'Completing onboarding process' });

                    setResponse({ message: 'Onboarding completed successfully', status: 'Onboarding process completed' });
                }
            },
            {
                name: 'removing progress state',
                percentage: 100,
                action: async () => {
                    setLoading(false);
                }
            }
        ];

        try {
            for (const step of steps) {
                setLoadingPercentage(step.percentage);
                await step.action();

                const progressMessage = `Step: ${step.name} - ${step.percentage}% completed`;
                console.log(progressMessage);
                setResponse(prev => ({ ...prev, message: progressMessage, status: step.name }));

                // await a short delay before proceeding to the next step
                await new Promise(resolve => setTimeout(resolve, 2000));
            } 
        } catch (error) {
            console.error('Error during onboarding process:', error);
            setResponse({ message: 'An error occurred during the onboarding process', status: 'Error' });
        } finally {
            await new Promise(resolve => setTimeout(resolve, 2000));
            updateLoadingPercentage(100);
        }

    }, [auth?.user, onboardingState]);

    const updateLoadingPercentage = useCallback((percentage: number) => {
        setLoadingPercentage(percentage);
    }, []);

    // Call the post function when the component mounts
    useEffect(() => {
        postOnboardingData();
    }, [postOnboardingData]);

    return (
        <>
            <Head title={`Onboarding udført`} />
            <main className="bg-[#0a0a0a]">
                <div className="container-fluid py-8 max-w-full flex w-full flex-col items-center justify-center bg-[#004EA7] text-white h-screen px-8">
                    <div className="container max-w-[960px] flex-col py-8 items-center justify-center text-center">
                        <div className="logo">
                            <img 
                                src="/images/FamilieHjælp_text_logo.svg" 
                                alt="Familiehjælp Logo" 
                                className="animate animate-fade-up animate-ease-linear relative bottom-4 animate-in mb-6 w-auto h-[50px] mx-auto" 
                            />
                            <img
                                src="/images/logo.svg"
                                alt="Familiehjælp Logo"
                                className="mb-6 w-auto h-[100px] mx-auto"
                            />
                        </div>
                        <div className="illustration-wrapper">
                            <img
                                src="/images/getting_started_illustration.svg"
                                alt="Familiehjælp Illustration"
                                className="mt-8 w-full max-w-[400px] mx-auto"
                            />
                        </div>
                        
                    </div>
                    {loading && (
                        <>
                            <div className="text-white mt-4">
                                <h1 className="text-3xl">Behandler dine svar...</h1>
                                <p className="mt-2 text-xl">{response.status}</p>
                            </div>
                            <LoadingProgressBar percentage={loadingPercentage} />
                        </>
                    )}
                    {!loading && (
                        <div className="text-white mt-4 max-w-[960px] mx-auto text-center">
                            <CompletedMessage name={name} />
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}

const CompletedMessage = ({name}: CompletedMessageProps) => {
    const { auth } = usePage<SharedData>().props;
    console.log(auth)

    const isAuthenticated = auth?.user !== undefined && auth?.user !== null;
    console.log('isAuthenticated:', isAuthenticated);

    return (
        <>
            {
                ! isAuthenticated ? (
                    <div className="text-white mt-4">
                        <h1 className="mt-2 text-3xl">Kære {name}, <br /> Vi har modtaget dine svar</h1>
                        <p className="mt-2 text-xl">
                            Du mangler nu at oprette en bruger før vi kan give dig et overblik over den information og de muligheder, du har brug for.
                        </p>
                        <Link href={route('register', {'_query': {
                            'onboarding_completed': true,
                            'redirect_to': 'onboarding.complete' 
                        }})} className="mt-4 inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-lg">
                            Opret bruger
                        </Link>

                        <Link href={route('login', {'_query': {
                            'onboarding_completed': true,
                            'redirect_to': 'onboarding.complete'
                        }})} className="mt-4 inline-block ml-3 text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-lg">
                            Log ind
                        </Link>
                    </div>
                ) : (
                    <div className="text-white text-md mt-4">
                        <h1 className="text-3xl mt-4">Kære { auth?.user?.name }, <br /> Vi har modtaget dine svar</h1>
                        <div className="mt-2 text-xl">
                            Vi har oprettet dit overblik, hvor du kan finde information og muligheder, der er relevante for dig.
                            <br />
                            Du kan nu fortsætte med at udforske de forskellige sektioner og finde den information, du har brug for.
                        </div>
                        <Link href={route('profile.home')} className="mt-4 inline-block text-white bg-blue-600  hover:bg-blue-700 px-6 py-3 rounded-md text-lg">
                            Gå til overblik
                        </Link>
                    </div>
                )
            }
        </>
    );
}

const LoadingProgressBar = ({ percentage }: { percentage: number }) => {
    const progressStyle = {
        width: `${percentage}%`,
        height: '100%',
        backgroundColor: '@apply bg-blue-900',
        transition: 'width 0.5s ease-in-out',
    }

    return (
        <>
            <div className="loading-progress-container w-full max-w-[960px] mx-auto mt-8 bg-gray-200 rounded-full overflow-hidden rounded-full shadow h-8">
                <div className="loading-progress-bar w-full bg-gray-900 h-full" style={progressStyle}></div>
            </div>
        </>
    );
}

export default function OnboardingCompleted() {
    return (
        <OnboardingProvider>
            <OnboardingCompletedContent />
        </OnboardingProvider>
    );
}
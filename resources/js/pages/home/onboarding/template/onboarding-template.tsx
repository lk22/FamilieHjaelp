// dependency imports
import React, { useEffect, useRef, useCallback, useState } from 'react';
import {Link} from '@inertiajs/react';

// Context imports
import { useOnboarding } from '@/contexts/OnboardingContext';
import { checkIfOnboardingCompleted } from '@/lib/utils';

// Hook imports
import { useIsMobile } from '@/hooks/use-mobile';
import { useIsTablet } from '@/hooks/use-tablet';

// Component imports
import ProgressBar from '@/components/Onboarding/progressBar';
import OnboardingHeader from '@/components/Onboarding/onboarding-header';
import InactivityModal from '@/components/Onboarding/Modals/InactivityModal';
import CompletedModal from '@/components/Onboarding/Modals/CompletedModal';

interface OnboardingTemplateInterface {
    children?: React.ReactNode[];
    title?: string;
    description?: string | React.ReactNode;
    screenGraphic?: string | null;
    state?: any;
}

export default function OnboardingTemplate({
    children,
    title,
    description,
    screenGraphic,
    state,
}: OnboardingTemplateInterface) {
    const [processCompleted, setProcessCompleted] = useState<boolean>(false);
    const isMobile = useIsMobile();
    const isTablet = useIsTablet();
    const { onboardingState, pauseOnboarding, updateCurrentScenario, resumeOnboarding } = useOnboarding();

    const currentScenario = onboardingState.scenarios.find((scenario) => scenario.id === onboardingState.currentScenario);

    useEffect(() => {
        const isProcessCompleted = checkIfOnboardingCompleted(currentScenario);
        if (isProcessCompleted) {
            setProcessCompleted(true);
        }
    }, []);

    // Store context functions in refs so they don't cause re-renders
    const pauseOnboardingRef = useRef(pauseOnboarding);
    const updateCurrentScenarioRef = useRef(updateCurrentScenario);
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
    const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);

    /**
     * Now this won't recreate because it uses refs
     */
    const handleInactivity = useCallback(() => {
        const fiiveMinutes = 5 * 60 * 1000;
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }

        inactivityTimerRef.current = setTimeout(() => {
            console.log('User inactive for 5 minutes, pausing onboarding session...');
            pauseOnboardingRef.current(); // ← Use ref
        }, fiiveMinutes);
    }, []); // Empty deps!

    const handleResumeSession = useCallback(() => {
        if (inactivityTimerRef.current) {
            console.log('User activity detected, resuming onboarding session...');
            resumeOnboarding();
            clearTimeout(inactivityTimerRef.current);
        }

        handleInactivity();
    }, [handleInactivity]); // This is now stable

    // Update refs when functions change
    useEffect(() => {
        pauseOnboardingRef.current = pauseOnboarding;
    }, [pauseOnboarding]);

    // updates current scenario in the context when it changes in the template, this is needed for the progress bar to update correctly
    useEffect(() => {
        updateCurrentScenarioRef.current = updateCurrentScenario;
    }, [updateCurrentScenario]);

    /**
     * Set up event listeners
     */
    useEffect(() => {
        if (state?.progress !== 'paused') return;

        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

        events.forEach(event => {
            window.addEventListener(event, handleResumeSession, { passive: true });
        });

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, handleResumeSession);
            });
        };

    }, [state?.progress, handleResumeSession]);

    /**
     * Update scenario only when it actually changes
     */
    useEffect(() => {
        updateCurrentScenarioRef.current(onboardingState.currentScenario);
        handleInactivity();

        return () => {
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
        };
    }, [onboardingState.currentScenario, handleInactivity]);

    /**
     * Heartbeat
     */
    useEffect(() => {
        heartbeatIntervalRef.current = setInterval(() => {
            console.log('OnboardingTemplate heartbeat - session is active');
        }, 15000);

        return () => {
            if (heartbeatIntervalRef.current) {
                clearInterval(heartbeatIntervalRef.current);
            }
        };
    }, []);

    return (
        <>
            <OnboardingHeader />
            <main className="dark:bg-white height-full">
                <div className="container-fluid flex flex-wrap">
                    <div className="xs:w-full sm:w-full md:w-full lg:w-full bg-[#004EA7] pb-36 text-white flex flex-col items-center justify-center">
                        <div className="logo pt-30 w-full">
                            <Link href={route('home')} className="flex items-center">
                                <img
                                    src="/images/logo.svg"
                                    alt="Familiehjælp Logo"
                                    className="mb-6 w-auto h-[100px] mx-auto"
                                />
                                <img src="/images/FamilieHjælp_text_logo.svg" alt="Familiehjælp Logo" className="relative bottom-4 mb-6 w-auto h-[50px] mx-auto" />
                            </Link>
                        </div>
                    </div>
                    <div className="right xs:w-full sm:w-full md:w-full lg:w-full bg-white">
                        <div className="container px-16 py-4 mx-auto text-black">
                            {screenGraphic && (
                                <div className="illustration-wrapper">
                                    <img
                                        src={`/images/${screenGraphic}.svg`}
                                        alt="Familiehjælp Illustration"
                                        className="mt-8 w-full max-w-[400px] mx-auto"
                                    />
                                </div>
                            )}
                            {
                                isMobile || isTablet ? (
                                    <>
                                        <div className="flex justify-center">
                                            <div className={`bg-white w-full p-6 xs:shadow-none sm:shadow-none xs:px-0 sm:px-0 md:px-0 py-8 animate-appear`}>
                                                <div className="rotate-90 relative w-12/12 mx-auto">
                                                    {/* move the progress bar to left side of the form */}
                                                    <div className="rotated-progress-bar absolute w-full top-1/2 left-0 transform -translate-y-1/2">
                                                        {/* <ProgressBar /> */}
                                                    </div>
                                                </div>
                                                <h1 className="text-3xl font-bold mt-8">{title}</h1>
                                                <div className="mt-2 mb-0 text-xl">
                                                    {description}
                                                </div>
                                                <InactivityModal isOpen={state?.progress === 'paused'} closeModal={handleResumeSession} />
                                                {
                                                    processCompleted && (
                                                        <>
                                                            <CompletedModal isOpen={processCompleted} closeModal={() => setProcessCompleted(false)} />
                                                        </>
                                                    )
                                                }
                                                {children}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex justify-center">
                                            <div className={`bg-white w-full rounded-lg shadow-md p-6 relative xl:-top-36 xs:shadow-none sm:shadow-none xs:px-0 sm:px-0 md:px-0 xl:px-16 py-8 animate-appear`}>
                                                <h1 className="text-3xl font-bold mt-8">{title}</h1>
                                                <div className="mt-2 mb-0 text-xl">
                                                    {description}
                                                </div>
                                                <ProgressBar />
                                                <InactivityModal isOpen={state?.progress === 'paused'} closeModal={handleResumeSession} />
                                                {
                                                    processCompleted && (
                                                        <>
                                                            <CompletedModal isOpen={processCompleted} closeModal={() => setProcessCompleted(false)} />
                                                        </>
                                                    )
                                                }
                                                {children}
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}
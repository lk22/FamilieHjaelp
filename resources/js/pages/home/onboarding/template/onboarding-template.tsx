import React, { useEffect, useRef, useCallback } from 'react';
import {Link} from '@inertiajs/react';
import ProgressBar from '@/components/Onboarding/progressBar';
import OnboardingHeader from '@/components/Onboarding/onboarding-header';
import { useOnboarding } from '@/contexts/OnboardingContext';

import InactivityModal from '@/components/Onboarding/Modals/InactivityModal';

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
    const { onboardingState, pauseOnboarding, updateCurrentScenario, resumeOnboarding } = useOnboarding();

    // Store context functions in refs so they don't cause re-renders
    const pauseOnboardingRef = useRef(pauseOnboarding);
    const updateCurrentScenarioRef = useRef(updateCurrentScenario);

    // Update refs when functions change
    useEffect(() => {
        pauseOnboardingRef.current = pauseOnboarding;
    }, [pauseOnboarding]);

    useEffect(() => {
        updateCurrentScenarioRef.current = updateCurrentScenario;
    }, [updateCurrentScenario]);

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
            console.log('User inactive for 15 seconds, pausing onboarding session...');
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
                    <div className="right xs:w-full sm:w-full md:w-full lg:w-8/12 bg-white flex flex-col items-center justify-center min-h-screen">
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
                            <h1 className="text-3xl font-bold mt-8">{title}</h1>
                            <div className="mt-2 text-xl">
                                {description}
                            </div>
                            <ProgressBar />
                            <InactivityModal isOpen={state?.progress === 'paused'} closeModal={handleResumeSession} />
                    {children}
                        </div>
                    </div>
                    <div className="xs:w-full sm:w-full md:w-full lg:w-4/12 animate-appear bg-[#004EA7] text-white flex flex-col items-center justify-center">
                        <div className="logo pt-30 w-full">
                            <Link href={route('home')}>
                                <img src="/images/FamilieHjælp_text_logo.svg" alt="Familiehjælp Logo" className=" animate-appear relative bottom-4 mb-6 w-auto h-[50px] mx-auto" />
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
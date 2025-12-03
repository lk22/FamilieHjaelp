import React, { useEffect, useRef, useCallback } from 'react';
import ProgressBar from '@/components/Onboarding/progressBar';
import OnboardingHeader from '@/components/Onboarding/onboarding-header';
import { useOnboarding } from '@/contexts/OnboardingContext';

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
    const { pauseOnboarding, updateCurrentScenario, onboardingState } = useOnboarding();

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
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }

        inactivityTimerRef.current = setTimeout(() => {
            console.log('User inactive for 15 seconds, pausing onboarding session...');
            pauseOnboardingRef.current(); // ← Use ref
        }, 15000);
    }, []); // Empty deps!

    const handleResumeSession = useCallback(() => {
        if (inactivityTimerRef.current) {
            console.log('User activity detected, resuming onboarding session...');
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
                <div className="container-fluid py-18 max-w-full flex w-full flex-col bg-[#004EA7] text-white">
                    <div className="container max-w-[960px] flex-col py-8 m-auto">
                        <div className="">
                            <div className="logo">
                                <a href={route('home')}>
                                    <span className="flex items-center gap-4">
                                        <img
                                            src="/images/inline_logo.svg"
                                            alt="Familiehjælp Logo"
                                            className="animate animate-fade-up animate-ease-linear relative bottom-4 animate-in w-auto h-[50px]"
                                        />
                                    </span>
                                </a>
                            </div>
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
                        </div>
                    </div>
                </div>
                <div className="container-fluid h-screen">
                    {children}
                </div>
            </main>
        </>
    );
}
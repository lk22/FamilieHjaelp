import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { useRemember } from '@inertiajs/react';
import { OnboardingState, InitialOnboardingState, type StepData } from '@/state/OnboardingState';

import { useLocalStorage } from '@/hooks/useLocalStorage';

type ProgressProperties = {
    not_started: boolean;
    in_progress: boolean;
    completed: boolean;
}

interface OnboardingContextType {
    onboardingState: OnboardingState;
    updateOnboardingState: (newState: OnboardingState | ((prev: OnboardingState) => OnboardingState)) => void;
    completeStep: (stepId: number, data?: Partial<StepData>) => void;
    goToStep: (stepId: number) => void;
    resetOnboarding: () => void;
    isStepCompleted: (stepId: number) => boolean;
    getCurrentStepData: (stepId: number) => StepData;
    updateStepProgress: (stepId: number, progress: ProgressProperties) => void;
    completeOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

/**
 * OnboardingProvider Component
 * Provides onboarding state management with both localStorage persistence and React Context reactivity
 */
export function OnboardingProvider({ children }: { children: React.ReactNode }) {
    const sharedStateName = 'onboarding_shared_state';

    // Use both useRemember (for Inertia.js integration) and useLocalStorage (for cross-component sync)
    const [inertiaState, setInertiaState] = useRemember<OnboardingState>(
        InitialOnboardingState,
        sharedStateName
    );

    const [localStorageState, setLocalStorageState] = useLocalStorage<OnboardingState>(
        sharedStateName,
        InitialOnboardingState
    );

    // Use the most recent state (localStorage takes precedence for cross-component sync)
    const onboardingState = localStorageState;

    // Sync states when either changes
    useEffect(() => {
        // Sync localStorage to Inertia state
        if (JSON.stringify(localStorageState) !== JSON.stringify(inertiaState)) {
            setInertiaState(localStorageState);
        }
    }, [localStorageState, inertiaState, setInertiaState]);

    // Update both states simultaneously
    const updateOnboardingState = useCallback((newState: OnboardingState | ((prev: OnboardingState) => OnboardingState)) => {
        if (typeof newState === 'function') {
            setLocalStorageState(prev => {
                const computed = newState(prev)
                setInertiaState(computed);
                return computed;
            })
        } else {
            setLocalStorageState(newState);
            setInertiaState(newState);
        }

    }, [setLocalStorageState, setInertiaState]);

    // Helper function to complete a step
    const completeStep = useCallback((stepId: number, stepData?: Partial<StepData>) => {
        updateOnboardingState((prev) => ({
            ...prev,
            currentStep: stepId + 1, // Move to next step
            nextStep: stepId + 1,
            completedSteps: prev.completedSteps.includes(stepId)
                ? prev.completedSteps
                : [...prev.completedSteps, stepId],
            steps: prev.steps.map(step =>
                step.id === stepId ? {
                    ...step,
                    progress: {
                        not_started: false,
                        in_progress: false,
                        completed: true
                    },
                    data: stepData ? { ...step.data, ...stepData } : step.data
                } : step
            )
        }));
    }, [updateOnboardingState]);

    // Helper function to go to a specific step
    const goToStep = useCallback((stepId: number) => {
        updateOnboardingState(prev => ({
            ...prev,
            currentStep: stepId
        }));
    }, [updateOnboardingState]);

    // Helper function to reset onboarding
    const resetOnboarding = useCallback(() => {
        updateOnboardingState(InitialOnboardingState);
    }, [updateOnboardingState]);

    // Helper function to check if a step is completed
    const isStepCompleted = useCallback((stepId: number) => {
        const step = onboardingState.steps.find(s => s.id === stepId);
        return step?.progress.completed || false;
    }, [onboardingState]);

    // Helper function to get current step data
    const getCurrentStepData = useCallback((stepId: number): StepData => {
        const step = onboardingState.steps.find(s => s.id === stepId);
        return step?.data || {};
    }, [onboardingState]);

    // helper function to update step progress
    const updateStepProgress = useCallback(
        (stepId: number, progress: ProgressProperties): void => {
            updateOnboardingState(prev => ({
                ...prev,
                steps: prev.steps.map(step =>
                    step.id === stepId ? {
                        ...step,
                        progress
                    } : step
                )
            }));
        },
        [updateOnboardingState]
    );

    const completeOnboarding = useCallback(() => {
        updateOnboardingState(prev => ({
            ...prev,
            onboardingCompleted: true,
            currentStep: 0, // Reset current step
            completedSteps: prev.steps.map(step => step.id) // Mark all steps as completed
        }))
    }, [updateOnboardingState])

    const contextValue: OnboardingContextType = {
        onboardingState,
        updateOnboardingState,
        completeStep,
        goToStep,
        resetOnboarding,
        isStepCompleted,
        getCurrentStepData,
        updateStepProgress,
        completeOnboarding
    };

    return (
        <OnboardingContext.Provider value={contextValue}>
            {children}
        </OnboardingContext.Provider>
    );
}

/**
 * Custom hook to use the onboarding context
 */
export function useOnboarding() {
    const context = useContext(OnboardingContext);
        if (context === undefined) {
            throw new Error('useOnboarding must be used within an OnboardingProvider');
        }
    return context;
}

/**
 * Higher-order component to wrap components that need onboarding state
 */
export function withOnboarding<P extends object>(
    Component: React.ComponentType<P>
) {
    return function OnboardingWrappedComponent(props: P) {
        return (
            <OnboardingProvider>
                <Component {...props} />
            </OnboardingProvider>
        );
    };
}

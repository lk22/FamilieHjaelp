import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useCallback
} from 'react';

import {
    InitialOnboardingStateInterface,
    InitialOnboardingState,
} from '@/state/OnboardingState';

interface OnboardingSession {
    token: string;
    currentStep: string;
    stepsData: Record<string, any>;
    formData: Record<string, any>;
    completed: boolean;
}

interface OnboardingContextType {
    onboardingState: InitialOnboardingStateInterface & OnboardingSession;
    updateStep: (step: string, data?: Record<string, any>) => void;
    updateFormData: (data: Record<string, any>) => void;
    resetOnboarding: () => void;
    completeOnboarding: () => void;
    updateCurrentScenario: (scenarioId: string) => void;
    getCurrentStep: () => string;
    getCurrentScenario: () => any;
    pauseOnboarding: () => void;
    resumeOnboarding: () => void;
    startOnboarding: () => void;
    completeStep: (step: string) => void;
}

interface OnboardingSessionPayload {
    session_token: string;
    current_step: string;
    steps_data: Record<string, any>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({
    children,
    initialSession,
}: {
    children: React.ReactNode;
    initialSession: OnboardingSession;
}) {

    // Merge initial onboarding state with session data
    const [onboardingState, setOnboardingState] = useState<InitialOnboardingStateInterface & OnboardingSession>({
        ...InitialOnboardingState,
        ...initialSession,
    });

    const completeStep = useCallback((step: string) => {
        // Logic to mark the current step as completed can be added here
        const currentScenario = onboardingState.scenarios.find((s) => s.id === onboardingState.currentScenario);
        if (currentScenario) {
            const updatedSteps = currentScenario.steps.map((s) =>
                s.stepName === step ? { ...s, completed: true } : s
            );

            const updatedScenarios = onboardingState.scenarios.map((scenario) =>
                scenario.id === currentScenario.id ? { ...scenario, steps: updatedSteps } : scenario
            );

            setOnboardingState((prevState) => ({
                ...prevState,
                scenarios: updatedScenarios,
            }));
        }

    }, []);

    /**
     * Updates the current step and optionally merges new data into the steps data
     * @param step The current step to update to
     * @param data Optional data to merge into the steps data
     */
    const updateStep = useCallback((step: string, data?: Record<string, any>) => {
        const payload: OnboardingSessionPayload = {
            session_token: onboardingState.token,
            current_step: step,
            steps_data: data ? {
                ...onboardingState.stepsData,
                ...data
            } : onboardingState.stepsData,
        };

        setOnboardingState((prevState) => ({
            ...prevState,
            currentStep: step,
            stepsData: payload.steps_data,
        }))
    }, []);

    /**
     * Merges new data into the existing form data
     *
     * @param data Data to merge into the existing form data
     */
    const updateFormData = useCallback((data: Record<string, any>) => {
        setOnboardingState((prevState) => ({
            ...prevState,
            formData: {
                ...data
            }
        }))
    }, []);

    /**
     * Pauses the onboarding process by updating the progress state
     *
     * @return void
     */
    const pauseOnboarding = useCallback(() => {
        setOnboardingState((prevState) => ({
            ...prevState,
            progress: 'paused'
        }));
    }, [])

    const resumeOnboarding = useCallback(() => {
        setOnboardingState((prevState) => ({
            ...prevState,
            progress: 'in_progress'
        }));
    }, [])

    const startOnboarding = useCallback(() => {
        setOnboardingState((prevState) => ({
            ...prevState,
            progress: 'in_progress'
        }));
    }, [])

    /**
     * Marks the onboarding process state as completed
     *
     * @return void
     */
    const completeOnboarding = useCallback(() => {
        setOnboardingState((prevState) => ({
            ...prevState,
            completed: true
        }))
    }, []);

    /**
     * updating the current scenario in the onboarding state
     *
     * @param scenarioId string
     */
    const updateCurrentScenario = useCallback((scenarioId: string) => {
        setOnboardingState((prevState) => ({
            ...prevState,
            currentScenario: scenarioId,
        }))
    }, [])

    /**
     * Getter for current step
     * @returns
     */
    const getCurrentStep = useCallback(() => {
        return onboardingState.currentStep;
    }, [onboardingState.currentStep]);

    /**
     * Getter for current scenario
     * @returns
     */
    const getCurrentScenario = useCallback(() => {
        return onboardingState.scenarios.find((scenario) => scenario.id === onboardingState.currentScenario);
    }, [onboardingState.scenarios, onboardingState.currentScenario]);

    /**
     * Resets the onboarding state to the initial session provided
     */
    const resetOnboarding = () => {
        setOnboardingState({
            ...InitialOnboardingState,
            ...initialSession,
            currentStep: 'welcome',
            stepsData: {},
            formData: {},
            completed: false,
        });
    };

    const contextValue = useMemo(() => ({
        updateCurrentScenario,
        getCurrentStep,
        getCurrentScenario,
        updateStep,
        updateFormData,
        resetOnboarding,
        completeOnboarding,
        pauseOnboarding,
        resumeOnboarding,
        startOnboarding,
        completeStep,
        onboardingState,
    }), [
        updateCurrentScenario,
        getCurrentStep,
        getCurrentScenario,
        updateStep,
        updateFormData,
        resetOnboarding,
        completeOnboarding,
        pauseOnboarding,
        resumeOnboarding,
        startOnboarding,
        completeStep,
        onboardingState,
    ]);

    return (
        <OnboardingContext.Provider value={contextValue}>
            {children}
        </OnboardingContext.Provider>
    );
}

export function useOnboarding() {
    const context = useContext(OnboardingContext);
    if(!context){
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }
    return context;
}
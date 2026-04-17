import React, {
    createContext,
    useContext,
    useMemo,
    useCallback,
    useEffect
} from 'react';

import { useRemember } from '@inertiajs/react';

import { useLocalStorage } from '@/hooks/useLocalStorage';

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
    updateCurrentScenario: (selectedScenario: string) => void;
    getCurrentStep: () => string;
    getCurrentScenario: () => (typeof InitialOnboardingState.scenarios)[number] | undefined;
    pauseOnboarding: () => void;
    resumeOnboarding: () => void;
    startOnboarding: () => void;
    completeStep: (step: string, currentScenarioId: string, data: Record<string, any>) => void;
    updateCurrentStep: (step: string) => void;
    getOnboardingProperties: (step: string, prop: string) => string;
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
    initialSession?: OnboardingSession;
}) {
    /**
     * Shared state name for both Inertia and localStorage
     */
    const sharedStateName = 'onboarding_shared_state';

    /**
     * Using Inertia to remember onboarding state across page visits
     */
    const [inertiaState, setInertiaState] = useRemember<InitialOnboardingStateInterface & OnboardingSession>({
        ...InitialOnboardingState,
        ...initialSession,
    }, sharedStateName);

    /**
     * Using localStorage to persist onboarding state across components and page reloads
     */
    const [
        localStorageState,
        setLocalStorageState
    ] = useLocalStorage<InitialOnboardingStateInterface & OnboardingSession>(
        sharedStateName,
        {
            ...InitialOnboardingState,
            ...initialSession,
        }
    );

    const onboardingState = localStorageState;

    useEffect(() => {
        if (JSON.stringify(localStorageState) !== JSON.stringify(inertiaState)) {
            setInertiaState(localStorageState);
        }
    }, [onboardingState, localStorageState, inertiaState])

    /**
     * Updating onboarding state callback
     *
     * @param newState: InitialONboardingStateInterface
     */
    const updateOnboardingState = useCallback((newState: InitialOnboardingStateInterface & OnboardingSession | ((prev: InitialOnboardingStateInterface & OnboardingSession) => InitialOnboardingStateInterface & OnboardingSession)) => {
        const stateToSet = typeof newState === 'function' ? newState(onboardingState) : newState;
        setLocalStorageState(stateToSet);
        setInertiaState(stateToSet);
    }, [onboardingState, setLocalStorageState, setInertiaState]);

    /**
     * Completed the current Step in a scenario
     *
     * @param step The step to mark as completed
     * @param currentScenarioId The current scenario identifier
     * @param data Optional data to associate with the completed step
     */
    const completeStep = useCallback((step: string, currentScenarioId: string, data: Record<string, any>) => {
        console.log("Completing step:", step, "in scenario:", currentScenarioId, "with data:", data);

        updateOnboardingState((prevState) => {
            const updatedScenarios = prevState.scenarios.map((scenario) => {
                if (scenario.id !== currentScenarioId) return scenario;

                return {
                    ...scenario,
                    steps: scenario.steps.map((s) => {
                        if (s.stepName !== step) return s;
                        return {
                            ...s,
                            data: data,
                            completed: true,
                        };
                    }),
                };
            });

            return {
                ...prevState,
                scenarios: updatedScenarios,
            };
        });
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

        updateOnboardingState((prevState) => ({
            ...prevState,
            currentStep: step,
            stepsData: payload.steps_data,
        }))
    }, []);

    /**
     * Updating the current step in the onboarding state
     *
     * @param step The step to set as current
     */
    const updateCurrentStep = useCallback((step: string) => {
        updateOnboardingState((prevState) => ({
            ...prevState,
            currentStep: step,
        }))
    }, []);

    /**
     * Merges new data into the existing form data
     *
     * @param data Data to merge into the existing form data
     */
    const updateFormData = useCallback((data: Record<string, any>) => {
        updateOnboardingState((prevState) => ({
            ...prevState,
            formData: {
                ...prevState.formData,
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
        updateOnboardingState((prevState) => ({
            ...prevState,
            progress: 'paused'
        }));
    }, [])

    /**
     * Resumes the onboarding process by updating the progress state
     *
     * @return void
     */
    const resumeOnboarding = useCallback(() => {
        updateOnboardingState((prevState) => ({
            ...prevState,
            progress: 'in_progress'
        }));
    }, [])

    /**
     * Starts the onboarding process by updating the progress state
     *
     * @return void
     */
    const startOnboarding = useCallback(() => {
        updateOnboardingState((prevState) => ({
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
        updateOnboardingState((prevState) => ({
            ...prevState,
            completed: true
        }))
    }, []);

    /**
     * updating the current scenario in the onboarding state
     *
     * @param selectedScenario string
     * @returns void
     */
    const updateCurrentScenario = useCallback((selectedScenario: string) => {
        console.log("Updating current scenario to:", selectedScenario);

        updateOnboardingState((prevState) => ({
            ...prevState,
            currentScenario: selectedScenario
        }))
    }, [])

    /**
     * Getter for current step
     * @returns string
     */
    const getCurrentStep = useCallback(() => {
        return onboardingState.currentStep;
    }, [onboardingState.currentStep]);

    /**
     * Getter for current scenario
     * @returns string
     */
    const getCurrentScenario = useCallback(() => {
        return onboardingState.scenarios.find((scenario) => scenario.id === onboardingState.currentScenario);
    }, [onboardingState.scenarios, onboardingState.currentScenario]);

    // TODO: needs to return a given prop from the state
    const getOnboardingProperties = (step: string, prop: string) => {
        return prop;
    }

    /**
     * Resets the onboarding state to the initial session provided
     */
    const resetOnboarding = () => {
        updateOnboardingState((prevState) => ({
            ...prevState,
            completed: false,
            scenarios: InitialOnboardingState.scenarios.map((scenario) => ({
                ...scenario,
                steps: scenario.steps.map((step) => ({
                    ...step,
                    completed: false,
                })),
            })),
            currentStep: 'welcome',
        }));
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
        updateCurrentStep,
        onboardingState,
        getOnboardingProperties
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
        updateCurrentStep,
        onboardingState,
        getOnboardingProperties
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
import React, {
    createContext,
    useContext,
    useState
} from 'react';

import {useForm} from '@inertiajs/react';

interface OnboardingSession {
    token: string;
    currentStep: string;
    stepsData: Record<string, any>;
    formData: Record<string, any>;
    completed: boolean;
}

interface OnboardingContextType {
    onboardingState: OnboardingSession;
    updateStep: (step: string, data?: Record<string, any>) => void;
    updateFormData: (data: Record<string, any>) => void;
    resetOnboarding: () => void;
    completeOnboarding: () => void;
    processing: boolean;
}

interface UpdateStepPayload {
    step: string;
    data?: Record<string, any>;
}

interface OnboardingSessionPayload extends FormOptions {
    session_token: string;
    current_step: string,
    steps_data: Record<string, any>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({
    children,
    initialSession
}: {
    children: React.ReactNode,
    initialSession: OnboardingSession
}) {
    const [onboardingState, setOnboardingState] = useState<OnboardingSession>(initialSession);

    const { processing: updateProcessing, put: updatePut } = useForm();
    const { processing: completeProcessing, post: completePost } = useForm();

    /**
     * Updates the current step and optionally merges new data into the steps data
     * @param step The current step to update to
     * @param data Optional data to merge into the steps data
     */
    const updateStep = (step: string, data?: Record<string, any>) => {
        const payload: OnboardingSessionPayload = {
            session_token: onboardingState.token,
            current_step: step,
            steps_data: data ? {
                ...onboardingState.stepsData,
                ...data
            } : onboardingState.stepsData,
        }

        updatePut(route('onboarding-update-step') {
            onSuccess: () => {
                setOnboardingState(prevState => ({
                    ...prevState,
                    ...payload
                })
            }
        });
    }

    /**
     * Merges new data into the existing form data
     *
     * @param data Data to merge into the existing form data
     */
    const updateFormData = (data: Record<string, any>) => {
        setOnboardingState((prevState) => ({
            ...prevState,
            formData: {
                ...prevState.formData,
                ...data,
            },
        }));
    }

    /**
     * Marks the onboarding process state as completed
     */
    const completeOnboarding = () => {
        completePost(route('onboarding-complete'), {
            session_token: onboardingState.token,
        }, {
            onSuccess: () => {
                setOnboardingState((prevState) => ({
                    ...prevState,
                    completed: true,
                }));
            }
        })
    }

    /**
     * Resets the onboarding state to the initial session provided
     */
    const resetOnboarding = () => {
        setOnboardingState(initialSession);
    }

    return (
        <OnboardingContext.Provider value={{
            onboardingState,
            updateStep,
            updateFormData,
            resetOnboarding,
            completeOnboarding,
            processing: updateProcessing || completeProcessing,
        }}>
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
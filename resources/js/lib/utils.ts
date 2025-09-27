import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { OnboardingState } from '@/state/OnboardingState';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface IStepProgress {
    not_started: boolean;
    in_progress: boolean;
    completed: boolean;
}

type IStepData = Record<string, unknown>;

/**
 * Use this hook to manage onboarding actions such as updating step progress and data.
 * @param onboardingStep 
 * @param setOnboardingStep 
 */
export function useOnboardingActions(
    onboardingStep: OnboardingState,
    setOnboardingState: (state: OnboardingState | ((prevState: OnboardingState) => OnboardingState)) => void
) {

    /**
     * Completes a step in the onboarding process.
     * @param stepId The ID of the step to complete.
     * @param stepData Additional data to associate with the completed step.
     */
    const updateStepProgress = (
        stepId: number,
        progress: IStepProgress,
        stepData?: Record<string, unknown>
    ) => {
        setOnboardingState((prevState) => ({
            ...prevState,
            steps: prevState.steps.map((stepItem) => stepItem.id === stepId ? {
                ...stepItem,
                progress,
                ...(stepData && {
                    data: {
                        ...stepItem.data,
                        ...stepData
                    }
                })
            } : stepItem)
        }));
    };

    /**
     * Completed a step in the onboarding process and optinally moves to the next step.
     * @param stepId 
     * @param stepData 
     * @param nextStep 
     */
    const completeStep = (stepId: number, stepData: IStepData, nextStep?: number) => {
        setOnboardingState((prevState) => ({
            ...prevState,
            currentStep: nextStep || stepId + 1,
            steps: prevState.steps.map((stepItem) => stepItem.id === stepId ? {
                ...stepItem,
                progress: {
                    not_started: false,
                    in_progress: false,
                    completed: true
                },
                data: {
                    ...stepItem.data,
                    ...stepData
                }
            } : stepItem)
        }));
    };

    /**
     * Saving new step progress state for a specific step.
     * This function updates the step's progress to completed and saves the step data.
     * @param stepId 
     * @param stepData 
     */
    const saveStepProgress = (
        stepId: number,
        stepData: IStepData,
    ) => {
        updateStepProgress(stepId, {
            not_started: false,
            in_progress: true,
            completed: false
        }, stepData);
    }

    return {
        updateStepProgress,
        completeStep,
        saveStepProgress
    }
}

// extract <T extends Record<string, unknown> = Record<string, unknown> to UseQueryParamsHookReturnType<T>
type UseQueryParamsHookReturnType<T extends Record<string, unknown> = Record<string, unknown>> = {
    queryParams: T;
    getQueryParam: (key: keyof T | string) => unknown;
};

// describe how this hook works
/**
 * Custom hook to manage query parameters in a React application.
 * @returns {UseQueryParamsHookReturnType} An object containing query parameters and a function to get a specific parameter.
 */
export function useQueryParams<T extends Record<string, unknown> = Record<string, unknown>>(): UseQueryParamsHookReturnType<T> {
    const params = Object.fromEntries(new URLSearchParams(window.location.search)) as T;

    const getQueryParam = (key: keyof T | string): unknown => {
        return params[key as keyof T] ?? undefined;
    };

    return {
        queryParams: params,
        getQueryParam,
    };
}
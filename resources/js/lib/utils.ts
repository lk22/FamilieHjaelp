import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { OnboardingState } from '@/state/OnboardingState_bak';
import { type ScenarioProperties } from '@/state/OnboardingState';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface IStepProgress {
    not_started: boolean;
    in_progress: boolean;
    completed: boolean;
}

type ConfirmationFormattedValue = string | boolean | undefined;

export function getConfirmationFormattedValue(value: ConfirmationFormattedValue): string {
    if ( typeof value === 'boolean' && value === false ) {
        value = 'Nej';
    }

    if ( typeof value === 'boolean' && value === true ) {
        value = 'Ja';
    }

    if ( (typeof value === 'string' && value === '') || (value === undefined || value === '') ) {
        value = 'Ingen svar givet';
    }

    return value;
}


type IStepData = Record<string, unknown>;

/**
 * Use this hook to manage onboarding actions such as updating step progress and data.
 * @param onboardingStep
 * @param setOnboardingState
 */
export function useOnboardingActions(
    onboardingStep: OnboardingState,
    setOnboardingState: (state: OnboardingState | ((prevState: OnboardingState) => OnboardingState)) => void
) {

    /**
     * Completes a step in the onboarding process.
     * Completes a step in the onboarding process and optionally moves to the next step. The ID of the step to complete.
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
     * Completed a step in the onboarding process and optionally moves to the next step.
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

/**
 * Utility for setting onboarding cookie with a specific token value and expiration time. This function is designed to be used when initiating the onboarding process to ensure that a session token is stored in the user's browser for tracking and authentication purposes throughout the onboarding flow.
 * @param token The session token to be stored in the cookie.
 */
export function setOnboardingSessionTokenCookie(token: string) {
    const cookieName = 'onboarding_session_token';
    const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000).toUTCString();

    const checkedCookieName = checkIfCookieExists(cookieName);
    if (checkedCookieName) {
        console.warn(`Cookie with name "${cookieName}" already exists. Onboarding session token cookie will not be set.`);
        // update the existing cookie with the new token value and reset the expiration time        const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000).toUTCString();
        document.cookie = `${cookieName}=${token}; expires=${expires}; path=/; Secure; SameSite=Lax`;
        return;
    }

    // setSessionTokenCookie(token, cookieName, 60 * 60 * 24 * 30); // Expires in 30 days
    document.cookie = `${cookieName}=${token}; expires=${expires}; path=/; Secure; SameSite=Lax`;
}

/**
 * Utility function to set a fresh session token cookie with a specified expiration time.
 * @param token The session token to be stored in the cookie.
 * @param expiresInSeconds The expiration time of the cookie in seconds.
 * @param cookieName The name of the cookie to store the session token.
 */
export function setSessionTokenCookie(
    token: string,
    cookieName: string,
    expiresInSeconds: number
) {

    if (checkIfCookieExists(cookieName)) {
        console.warn(`Cookie with name "${cookieName}" already exists. Session token cookie will not be set.`);
        return;
    }

    if (cookieName === '') {
        console.warn('Cookie name is empty. Session token cookie will not be set.');
        return;
    }

    if (typeof token !== 'string' || token.trim() === '') {
        console.warn('Invalid token provided. Session token cookie will not be set.');
        return;
    }

    if (isNaN(expiresInSeconds) || expiresInSeconds <= 0) {
        console.warn('Invalid expiration time provided. Session token cookie will not be set.');
        return;
    }

    const expires = new Date(Date.now() + expiresInSeconds * 1000).toUTCString();
    document.cookie = `${cookieName}=${token}; expires=${expires}; path=/; Secure; SameSite=Lax`;
}

function checkIfCookieExists(cookieName: string): boolean {
    return document.cookie.split(';')
        .some((cookie) => cookie.trim().startsWith(`${cookieName}=`));
}

export function deleteSessionTokenCookie(cookieName: string) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Lax`;
}

export function getSessionTokenFromCookie(cookieName: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    return match ? match[2] : null;
}

/**
 * Utility function to check if the onboarding process is completed by verifying that all steps have their progress marked as completed.
 * @param onboardingState The current state of the onboarding process.
 * @returns {boolean} True if all steps are completed, otherwise false.
 */
export function checkIfOnboardingCompleted(scenario: ScenarioProperties): boolean {
    return scenario.steps.every(step => step.completed);
}

/**
 * Utility function for logging development state in a consistent format. This function is a no-op in production and test environments to avoid cluttering logs.
 * @param label A label to identify the log message.
 * @param state The state object to be logged.
 * @returns void
 */
export function logState(
    label: string,
    state: unknown
): void {
    if (process.env.NODE_ENV === 'production') {
        return;
    }
    // log where the state change is happening
    console.groupCollapsed(`%c${label}:`, 'color: #4CAF50; font-weight: bold;');
    console.log("Current state value:", state);
    console.trace(`State change detected: ${label}`);
    console.groupEnd();
}

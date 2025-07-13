type initilSteps = number[];

export interface OnboardingInitialSteps {
    currentStep: number;
    totalSteps: number;
    initialSteps: initilSteps;
    completedSteps: number[];
}

interface OnboardingStep {
    data: {
        checks: string[];
        [key: string]: unknown;
    };
    [key: string]: unknown;
}

export interface OnboardingData {
    data: {
        steps: OnboardingStep[];
        [key: string]: unknown;
    };
    [key: string]: unknown;
}
type CurrentStep = number;
type CompletedSteps = number;

type StepProgress = {
    in_progress: boolean;
    completed: boolean;
    not_started: boolean;
}

interface StepData {
    stepOne?: {
        name: string;
    };
    stepTwo?: {
        checks: string[];
        otherDescription?: string;
    };
    stepThree?: {
        checks: string[];
    };
    stepFour?: {
        situation_date: string;
    };
    stepFive?: {
        pregnancy_week_number: string;
    };
    stepSix?: {
        checks: string[];
        other?: string;
    };
}

interface Step {
    id: number;
    name: string;
    progress: StepProgress;
    data: StepData;
}

type StepsInterface = Step[];

interface OnboardingState {
    onboardingCompleted: boolean;
    currentStep: CurrentStep;
    completedSteps: CompletedSteps[];
    steps: StepsInterface;
}

export type { OnboardingState, Step, StepData, StepProgress };

export const InitialOnboardingState: OnboardingState = {
    onboardingCompleted: false,
    currentStep: 1,
    completedSteps: [],
    steps: [
        {
            id: 1,
            name: 'one',
            progress: {
                in_progress: false,
                completed: false,
                not_started: true
            },
            data: {
                stepOne: {
                    name: ''
                }
            }
        },
        {
            id: 2,
            name: 'two',
            progress: {
                in_progress: false,
                completed: false,
                not_started: true
            },
            data: {
                stepTwo: {
                    checks: [],
                    otherDescription: ''
                }
            }
        },
        {
            id: 3,
            name: 'three',
            progress: {
                in_progress: false,
                completed: false,
                not_started: true
            },
            data: {
                stepThree: {
                    checks: []
                }
            }
        },
        {
            id: 4,
            name: 'four',
            progress: {
                in_progress: false,
                completed: false,
                not_started: true
            },
            data: {
                stepFour: {
                    situation_date: ''
                }
            }
        },
        {
            id: 5,
            name: 'five',
            progress: {
                in_progress: false,
                completed: false,
                not_started: true
            },
            data: {
                stepFive: {
                    pregnancy_week_number: ''
                }
            }
        },
        {
            id: 6,
            name: 'six',
            progress: {
                in_progress: false,
                completed: false,
                not_started: true
            },
            data: {
                stepSix: {
                    checks: [],
                    other: ''
                }
            }
        }
    ]
}

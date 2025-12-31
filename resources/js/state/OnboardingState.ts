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
    nextStep: number;
    currentScenario: string;
    steps: StepsInterface;
}

export type { OnboardingState, Step, StepData, StepProgress, NewInitialStateInterface };

interface NewInitialStateInterface {
    onboardingCompleted: boolean;
    name: string;
    gender: string;
    hasPartner: boolean;
    scenario: string;
    categories: {
        id: number;
        name: string;
        description: string;
        completedSteps: number[];
        steps: {
            id: number;
            name: string;
            question: string;
            progress: StepProgress;
            data: {
                checks?: string[];
                other_description?: string;
                situation_date?: string;
                pregnancy_week_number?: string;
                other?: string;
            };
            completed: boolean;
        }[]
    }[]
}

export const NewInitialState: NewInitialStateInterface = {
    onboardingCompleted: false,
    name: '',
    gender: '',
    hasPartner: true,
    scenario: '',
    categories: [
        {
            id: 1,
            name: 'Abortion',
            description: 'Description for Abortion',
            completedSteps: [],
            steps: [
                {
                    id: 1,
                    name: 'one',
                    question: 'question for step one',
                    progress: {
                        in_progress: false,
                        completed: false,
                        not_started: true
                    },
                    data: {
                        checks: [],
                        other_description: ''
                    },
                    completed: false
                },
                {
                    id: 2,
                    name: 'two',
                    question: 'question for step two',
                    progress: {
                        in_progress: false,
                        completed: false,
                        not_started: true
                    },
                    data: {
                        checks: []
                    },
                    completed: false
                },
                {
                    id: 3,
                    name: 'three',
                    question: 'question for step three',
                    progress: {
                        in_progress: false,
                        completed: false,
                        not_started: true
                    },
                    data: {
                        checks: []
                    },
                    completed: false
                },
                {
                    id: 4,
                    name: 'four',
                    question: 'question for step four',
                    progress: {
                        in_progress: false,
                        completed: false,
                        not_started: true
                    },
                    data: {
                        situation_date: ''
                    },
                    completed: false
                },
                {
                    id: 5,
                    name: 'five',
                    question: 'question for step five',
                    progress: {
                        in_progress: false,
                        completed: false,
                        not_started: true
                    },
                    data: {
                        pregnancy_week_number: ''
                    },
                    completed: false
                },
                {
                    id: 6,
                    name: 'six',
                    question: 'question for step six',
                    progress: {
                        in_progress: false,
                        completed: false,
                        not_started: true
                    },
                    data: {
                        checks: [],
                        other: '',
                    },
                    completed: false
                }
            ] 
        },
        {
            id: 2,
            name: 'deathborn',
            description: '',
            completedSteps: [],
            steps: [
                {
                    id: 1,
                    name: 'one',
                    question: 'question for step one',
                    progress: {
                        in_progress: false,
                        completed: false,
                        not_started: true
                    },
                    data: {
                        checks: [],
                        other_description: ''
                    },
                    completed: false
                },
                {
                    id: 2,
                    name: 'two',
                    question: 'question for step two',
                    progress: {
                        in_progress: false,
                        completed: false,
                        not_started: true
                    },
                    data: {
                        checks: []
                    },
                    completed: false
                },
                {
                    id: 3,
                    name: 'three',
                    question: 'question for step three',
                    progress: {
                        in_progress: false,
                        completed: false,
                        not_started: true
                    },
                    data: {
                        checks: []
                    },
                    completed: false
                },
                {
                    id: 4,
                    name: 'four',
                    question: 'question for step four',
                    progress: {
                        in_progress: false,
                        completed: false,
                        not_started: true
                    },
                    data: {
                        situation_date: ''
                    },
                    completed: false
                },
                {
                    id: 5,
                    name: 'five',
                    question: 'question for step five',
                    progress: {
                        in_progress: false,
                        completed: false,
                        not_started: true
                    },
                    data: {
                        pregnancy_week_number: ''
                    },
                    completed: false
                },
                {
                    id: 6,
                    name: 'six',
                    question: 'question for step six',
                    progress: {
                        in_progress: false,
                        completed: false,
                        not_started: true
                    },
                    data: {
                        checks: [],
                        other: '',
                    },
                    completed: false
                }
            ]
        },
        {
            id: 3,
            name: 'parents',
            description: 'Parenting category',
            completedSteps: [],
            steps: [
                {
                    id: 1,
                    name: "one",
                    question: "question for step one",
                    progress: {
                        in_progress: false,
                        completed: false,
                        not_started: true
                    },
                    data: {
                        checks: []
                    },
                    completed: false
                }
            ]
        }
    ],
}

export const InitialOnboardingState: OnboardingState = {
    onboardingCompleted: false,
    currentStep: 1,
    completedSteps: [],
    nextStep: 1,
    currentScenario: '',
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
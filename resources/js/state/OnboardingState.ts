interface ScenarioStepProperties {
    id: number;
    stepName: string;
    question: string;
    completed: boolean;
    progress: {
        not_started: boolean;
        in_progress: boolean;
        completed: boolean;
    };
    data: {
        [key: string]: any;
    };
}

interface ScenarioProperties {
    id: string;
    title: string;
    steps: ScenarioStepProperties[];
}

type ProgressStatus = 'in_progress' | 'completed' | 'paused';

export interface InitialOnboardingStateInterface {
    onboardingCompleted: boolean;
    currentScenario: string;
    progress: ProgressStatus;
    scenarios: ScenarioProperties[];
}

export const InitialOnboardingState: InitialOnboardingStateInterface = {
    onboardingCompleted: false,
    currentScenario: '',
    progress: 'in_progress',
    scenarios: [
        {
            id: 'abortion',
            title: 'Abortion',
            steps: [
                {
                    id: 1,
                    stepName: 'one',
                    question: 'Hvad er dit navn?',
                    completed: false,
                    progress: {
                        not_started: true,
                        in_progress: false,
                        completed: false,
                    },
                    data: {
                        name: '',
                    }
                },
                {
                    id: 2,
                    stepName: 'two',
                    question: 'Hvad er din køn?',
                    completed: false,
                    progress: {
                        not_started: true,
                        in_progress: false,
                        completed: false,
                    },
                    data: {
                        gender: '',
                    }
                },
                {
                    id: 3,
                    stepName: 'three',
                    question: 'Har du en partner?',
                    completed: false,
                    progress: {
                        not_started: true,
                        in_progress: false,
                        completed: false,
                    },
                    data: {
                        hasPartner: null,
                    },
                },
                {
                    id: 4,
                    stepName: 'four',
                    question: 'har du og din partner søgt om abort?',
                    completed: false,
                    progress: {
                        not_started: true,
                        in_progress: false,
                        completed: false,
                    },
                    data: {
                        partnerSoughtAbort: null,
                    }
                },
                {
                    id: 5,
                    stepName: 'five',
                    question: 'Hvornår forventer du at få din abort?',
                    completed: false,
                    progress: {
                        not_started: true,
                        in_progress: false,
                        completed: false,
                    },
                    data: {
                        expectedAbortDate: '',
                    }
                },
                {
                    id: 6,
                    stepName: 'six',
                    question: 'Hvor langt er du i din abort?',
                    completed: false,
                    progress: {
                        not_started: true,
                        in_progress: false,
                        completed: false,
                    },
                    data: {
                        abortionProgress: '',
                    }
                }
            ]
        },
        {
            id: 'stillbirth',
            title: 'Stillbirth',
            steps: [
                {
                    id: 1,
                    stepName: 'one',
                    question: 'Hvad er dit navn?',
                    completed: false,
                    progress: {
                        not_started: true,
                        in_progress: false,
                        completed: false,
                    },
                    data: {
                        name: '',
                    }
                }
            ]
        },
        {
            id: 'parents',
            title: 'Parents',
            steps: [
                {
                    id: 1,
                    stepName: 'one',
                    question: 'Hvad er dit navn?',
                    completed: false,
                    progress: {
                        not_started: true,
                        in_progress: false,
                        completed: false,
                    },
                    data: {
                        name: '',
                    }
                }
            ]
        }
    ]
};
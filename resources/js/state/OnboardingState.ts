interface ScenarioStepProperties {
    id: number;
    stepName: string;
    question: string;
    description: string;
    completed: boolean;
    data: {
        [key: string]: any;
    };
}

interface ScenarioProperties {
    id: string;
    title: string;
    steps: ScenarioStepProperties[];
}

type ProgressStatus = 'not_started' | 'in_progress' | 'completed' | 'paused';

export interface InitialOnboardingStateInterface {
    onboardingCompleted: boolean;
    currentScenario: string;
    progress: ProgressStatus;
    scenarios: ScenarioProperties[];
}

export const InitialOnboardingState: InitialOnboardingStateInterface = {
    onboardingCompleted: false,
    currentScenario: '',
    progress: 'not_started',
    scenarios: [
        {
            id: 'abortion',
            title: 'Abortion',
            steps: [
                {
                    id: 1,
                    stepName: 'one',
                    question: 'Hvad er dit navn?',
                    description: '',
                    completed: false,
                    data: {
                        name: '',
                    }
                },
                {
                    id: 2,
                    stepName: 'two',
                    question: 'Hvad er din køn?',
                    description: '',
                    completed: false,
                    data: {
                        gender: '',
                    }
                },
                {
                    id: 3,
                    stepName: 'three',
                    question: 'Har du en partner?',
                    description: '',
                    completed: false,
                    data: {
                        hasPartner: null,
                    },
                },
                {
                    id: 4,
                    stepName: 'four',
                    question: 'Har du og din partner søgt om abort?',
                    description: 'Dette hjælper os med at forstå din situation bedre.',
                    completed: false,
                    data: {
                        partnerSoughtAbort: null,
                    }
                },
                {
                    id: 5,
                    stepName: 'five',
                    question: 'Hvornår forventer du at få din abort?',
                    description: 'Dette kan give indflydelse på din støtteplan.',
                    completed: false,
                    data: {
                        expectedAbortDate: '',
                    }
                },
                {
                    id: 6,
                    stepName: 'six',
                    question: 'Hvor langt er du i din abort?',
                    description: '',
                    completed: false,
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
                    description: '',
                    completed: false,
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
                    description: '',
                    completed: false,
                    data: {
                        name: '',
                    }
                }
            ]
        }
    ]
};
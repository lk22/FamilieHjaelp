import { type SharedData } from '@/types';

export type Kid = {
    gender: 'male' | 'female' | 'other';
    name: string;
    ageYears: string;
    ageMonths: string;
    ageWeeks: string;
};

export interface SessionProps extends SharedData {
    currentStep: string;
    scenario: string;
    onboardingSession: {
        token: string | null;
        currentStep: string | null;
        stepsData: {
            one?: FamilyNameStepData;
            two?: ParentStepData;
            three?: KidsStepData;
        };
        formData: Record<string, unknown>;
        completed: boolean;
    };
}

export type FamilyNameStepData = {
    familyName: string;
};

export interface FamilyNameStepProps {
    defaultFamilyName: string;
    translate: (key: string) => string;
}

export type ParentStepData = {
    name: string;
    age: string;
    familyTitle: string;
    hasPartner: boolean;
    partnerName?: string;
    partnerAge?: string;
    partnerFamilyTitle?: string;
    partnerNeedsUser: boolean;
    partnerUserName?: string;
    partnerUserEmail?: string;
};

export type KidsStepData = {
    kids: Kid[];
};

export interface CompleteStepProps {
    token: string | null;
    familyName: string;
    parentData: ParentStepData;
    kidsData: KidsStepData;
}

export interface ParentStepProps {
    defaultData: ParentStepData;
}

export interface KidsStepProps {
    defaultData: KidsStepData;
}

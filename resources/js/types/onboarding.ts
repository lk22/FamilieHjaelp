import { type SharedData } from '@/types';

export type Kid = {
    gender: 'male' | 'female' | 'other';
    firstName: string;
    middleName: string;
    lastName: string;
    ageYears: string;
    ageMonths: string;
    ageWeeks: string;
    needsUserLogin: boolean;
    userEmail: string;
    userLogin?: string;
    userPassword?: string;
    confirmPassword?: string;
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
    firstName: string;
    middleName: string;
    lastName: string;
    age: string;
    familyTitle: string;
    hasPartner: boolean;
    partnerFirstName?: string;
    partnerMiddleName?: string;
    partnerLastName?: string;
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

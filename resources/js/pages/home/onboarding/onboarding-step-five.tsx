import OnboardingTemplate from './template/onboarding-template';
import OnboardingStepFiveForm from './forms/onboarding-step-five-form';
import {Head} from '@inertiajs/react';

// Define types for better TypeScript support
interface StepData {
    stepTwo?: {
        checks: string[];
    };
    stepThree?: {
        checks: string[];
    };
}

interface OnboardingStep {
    id: number;
    data: StepData;
}

interface OnboardingState {
    steps: OnboardingStep[];
}

export default function OnboardingStepFive() {

    const handleStepDescription = () => {
        try {
            const savedState = localStorage.getItem('onboarding_shared_state');
            if (!savedState) {
                return "hvor langt er du henne i din graviditet?";
            }

            const state: OnboardingState = JSON.parse(savedState);
            
            if (!state?.steps || !Array.isArray(state.steps)) {
                return "hvor langt er du henne i din graviditet?";
            }

            // Use find() instead of filter() - more efficient
            const situationStep = state.steps.find((step: OnboardingStep) => step.id === 2);
            const partnerStep = state.steps.find((step: OnboardingStep) => step.id === 3);
            
            console.log('OnboardingStepFive - Current step data:', state);

            const situationData = situationStep?.data?.stepTwo?.checks || [];
            const partnerData = partnerStep?.data?.stepThree?.checks || [];

            // Check if user is not alone
            const isNotAlone = partnerData.includes('is_not_alone');
            const isAlone = partnerData.includes('is_alone');
            
            // Check situation type
            const isPregnancy = situationData.includes('pregnancy');
            const isDeathborn = situationData.includes('deathborn');

            // Return appropriate text based on conditions
            if (isNotAlone && (isPregnancy || isDeathborn)) {
                return "hvor langt er i henne i jeres graviditet?";
            } else if (isAlone && (isPregnancy || isDeathborn)) {
                return "hvor langt er du henne i din graviditet?";
            }

            // Default fallback
            return "hvor langt er du henne i din graviditet?";

        } catch (error) {
            console.error('Error parsing onboarding state:', error);
            return "hvor langt er du henne i din graviditet?";
        }
    }

    return (
        <OnboardingTemplate 
            title={`Spørgsmål`} 
            description={handleStepDescription()}
            screenGraphic={null}  
        >
            <Head title={`Spørgsmål | Familiehjælp`} />
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <OnboardingStepFiveForm />
            </div>
        </OnboardingTemplate>
    );
}

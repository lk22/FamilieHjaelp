import OnboardingTemplate from './template/onboarding-template';
import OnboardingStepFiveForm from './forms/onboarding-step-five-form';
import {Head} from '@inertiajs/react';
import { type OnboardingInitialSteps } from '@/types/onboarding';

export default function OnboardingStepFive({ currentStep, totalSteps }: OnboardingInitialSteps) {

    const handleStepDescription = () => {
        const state = JSON.parse(localStorage.getItem('onboarding_shared_state'));
        const situationStepData = state?.steps.filter((step: any) => step.id === 2);
        const partnerStepData = state?.steps.filter((step: any) => step.id === 3);
        console.log('OnboardingStepFive - Current step data:', state);

        const situationData = situationStepData?.[0]?.data.stepTwo || {};
        const partnerData = partnerStepData?.[0]?.data.stepThree || {};

        if ( 
            partnerData?.checks.includes('is_not_alone') && situationData?.checks.includes('pregnancy') ||
            partnerData?.checks.includes('is_not_alone') && situationData?.checks.includes('deathborn')
        ) {
            return "hvor langt er i henne i jeres graviditet ?";
        } else if (
            partnerData?.checks.includes('is_alone') && situationData?.checks.includes('pregnancy') || 
            partnerData?.checks.includes('is_alone') && situationData?.checks.includes('deathborn')
        ) {
            return "hvor langt er du henne i din graviditet ?";
        }
    }

    return (
        <OnboardingTemplate 
            title={`Spørgsmål`} 
            description={handleStepDescription()}
            screenGraphic={null}
            steps={totalSteps}
            currentStep={currentStep || 5}    
        >
            <Head title={`Spørgsmål | Familiehjælp`} />
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <OnboardingStepFiveForm />
            </div>
        </OnboardingTemplate>
    );
}

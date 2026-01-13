import { useOnboarding } from "@/contexts/OnboardingContext";

import UserInformationStepForm from "@/pages/home/onboarding/abortion/form/UserInformationStepForm";
import AbortionInformationStepForm from "./AbortionInformationStepForm";
import NeedsInterpreterStepForm from "./NeedsInterpreterStepForm";
import WantsSupportConversationStepForm from "./WantsSupportConversationStepForm";
import WantsContraceptionInformationStepForm from "./WantsContraceptionInformationStepForm";
import NeedsPostpartumSupportInfoStepForm from "./NeedsPostpartumSupportInfoStepForm";
import KnowsConfidentialityRightsStepForm from "./KnowsConfidentialityRightsStepForm";

/**
 * StepForm Component
 * Dynamically renders form fields based on the current onboarding step.
 *
 * @param currentStep The current step identifier
 * @param scenario The scenario of the onboarding
 * @param onboardingSession The onboarding session data
 * @returns
 */
export default function StepForm({
    currentStep,
    scenario,
}: {
    currentStep: string,
    scenario: string
}) {
    return (
        <div className="container py-8 mx-auto">
            <StepFormContent currentStep={currentStep} scenario={scenario}/>
        </div>
    );
}

/**
 * Content component for StepForm
 * @param currentStep The current step identifier
 * @returns
 */
const StepFormContent = ({
    currentStep,
    scenario}: {
    currentStep: string;
    scenario: string
}) => {
    const {onboardingState} = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s: any) => s.id === scenario);

    return (
        <div>
            <StepFormFieldsDisplay currentStep={currentStep} scenario={currentScenario}/>
        </div>
    )
}

/**
 * Form Display component that renders form fields based on the current step
 * @param currentStep The current step identifier
 * @returns
 */
const StepFormFieldsDisplay = ({
    currentStep,
    scenario
}: {
    currentStep: string;
    scenario: string;
}) => {
    const {updateFormData, updateStep, completeStep} = useOnboarding();

    const submitStep = (data: Record<string, any>) => {
        const currentScenario = scenario?.id;
        updateStep(currentStep, data);
        updateFormData(data);
        completeStep(currentStep, currentScenario, data);
    }

    switch (currentStep) {
        case 'one':
            return <UserInformationStepForm handleStepSubmit={submitStep} />;
        case 'two':
            return <AbortionInformationStepForm handleStepSubmit={submitStep} />;
        case 'three':
            return <NeedsInterpreterStepForm handleStepSubmit={submitStep} />;
        case 'four':
            return <WantsSupportConversationStepForm handleStepSubmit={submitStep} />;
        case 'five':
            return <WantsContraceptionInformationStepForm handleStepSubmit={submitStep} />;
        case 'six':
            return <NeedsPostpartumSupportInfoStepForm handleStepSubmit={submitStep} />;
        case 'seven':
            return <KnowsConfidentialityRightsStepForm handleStepSubmit={submitStep} />;
        default:
            return <div>Unknown Step</div>;
    }
}
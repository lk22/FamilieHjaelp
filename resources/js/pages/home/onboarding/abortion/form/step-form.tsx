import { useOnboarding } from "@/contexts/OnboardingContext";

import UserInformationStepForm from "@/pages/home/onboarding/abortion/form/UserInformationStepForm";
import AbortionInformationStepForm from "./AbortionInformationStepForm";
import NeedsInterpreterStepForm from "./NeedsInterpreterStepForm";
import WantsSupportConversationStepForm from "./WantsSupportConversationStepForm";
import WantsContraceptionInformationStepForm from "./WantsContraceptionInformationStepForm";
import NeedsPostpartumSupportInfoStepForm from "./NeedsPostpartumSupportInfoStepForm";
import KnowsConfidentialityRightsStepForm from "./KnowsConfidentialityRightsStepForm";
import WantsToBeContactedStepForm from "./WantsToBeContactedStepForm";

/**
 * StepForm Component
 * Dynamically renders form fields based on the current onboarding step.
 *
 * @param currentStep The current step identifier
 * @param scenario The scenario of the onboarding
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
        <>
            <StepFormContent currentStep={currentStep} scenario={scenario}/>
        </>
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
    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === scenario);

    if ( ! currentScenario ) {
        return <div>Scenario not found</div>;
    }

    return (
        <div className="pt-8">
            <StepFormFieldsDisplay currentStep={currentStep} scenario={currentScenario}/>
        </div>
    )
}

type ScenarioStepsList = {
    id: string;
    stepName: string;
    completed: boolean;
}

type Scenario = {
    id: string;
    name: string;
    steps: Array<ScenarioStepsList>;
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
    scenario: Scenario;
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
            return <KnowsConfidentialityRightsStepForm handleStepSubmit={submitStep} />;
        case 'six':
            return <WantsContraceptionInformationStepForm handleStepSubmit={submitStep} />;
        case 'seven':
            return <NeedsPostpartumSupportInfoStepForm handleStepSubmit={submitStep} />;
        case 'eight':
            return <WantsToBeContactedStepForm handleStepSubmit={submitStep} />;
        default:
            return <div>Unknown Step</div>;
    }
}
import { useOnboarding } from "@/contexts/OnboardingContext";

import InfoStepForm from "./InfoStepForm";
import WeekNumberStepForm from "./WeekNumberStepForm";
import InformedAboutBereavementLeaveStepForm from "./InformedAboutBereavementLeaveStepForm";
import WantsToNameChildStepForm from "./WantsToNameChildStepForm";
import NeedToPlanFuneralStepForm from "./NeedToPlanFuneralStepForm";
import HasReceivedDeathCertificateStepForm from "./HasReceivedDeathCertificateStepForm";
import WantsInformationAboutAutopsyStepForm from "./WantsInformationAboutAutopsyStepForm";
import HasOtherChildrenAtHomeStepForm from "./HasOtherChildrenAtHomeStepForm";
import KnowsSupportOptionsStepForm from "./KnowsSupportOptionsStepForm";
import NeedsHelpApplyingForBereavementLeave from './NeedsHelpApplyingForBereavementLeaveStepForm'

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
            return <InfoStepForm handleStepSubmit={submitStep} />;
        case 'two':
            return <WeekNumberStepForm handleStepSubmit={submitStep} />;
        case 'three':
            return <WantsToNameChildStepForm handleStepSubmit={submitStep} />;
        case 'four':
            return <InformedAboutBereavementLeaveStepForm handleStepSubmit={submitStep} />;
        case 'five':
            return <WantsToNameChildStepForm handleStepSubmit={submitStep} />;
        case 'six':
            return <NeedToPlanFuneralStepForm handleStepSubmit={submitStep} />;
        case 'seven':
            return <HasReceivedDeathCertificateStepForm handleStepSubmit={submitStep} />;
        case 'eight':
            return <WantsInformationAboutAutopsyStepForm handleStepSubmit={submitStep} />;
        case 'nine':
            return <HasOtherChildrenAtHomeStepForm handleStepSubmit={submitStep} />
        case 'ten':
            return <KnowsSupportOptionsStepForm handleStepSubmit={submitStep} />
        case 'eleven':
            return <NeedsHelpApplyingForBereavementLeave handleStepSubmit={submitStep} />
        default:
            return <div>Unknown Step</div>;
    }
}
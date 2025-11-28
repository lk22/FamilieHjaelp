import { useOnboarding } from "@/contexts/OnboardingContext_bak";

export default function StepFro() {
    const { onboardingState } = useOnboarding();

    return (
        <div className="container max-w-[960px] px-4 py-8 mx-auto">
            <StepFormContent />
        </div>
    );
}

const StepFormContent = () => {
    return (
        <div>Step Form Content</div>
    )
}
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface HasPlannedDaycareStepFormProps {
    handleStepSubmit: (data: { hasPlannedDaycare: boolean }) => void;
}

type HasPlannedDaycareProps = {
    data: {
        hasPlannedDaycare: boolean;
    }
}

export default function HasPlannedDaycareStepForm({ handleStepSubmit }: HasPlannedDaycareStepFormProps) {
    const [step] = useState<string>('eleven');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [, setSubmitted] = useState<boolean>(false);
    const [hasPlannedDaycare, setHasPlannedDaycare] = useState<boolean | null>(null);

    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === onboardingState.currentScenario);
    const currentStep = currentScenario?.steps[10];
    const currentHasPlanned = currentStep?.data.hasPlannedDaycare;

    const { post, data, setData } = useForm<HasPlannedDaycareProps>({
        data: { hasPlannedDaycare: currentHasPlanned ?? false },
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setSubmitted(true);
        const nextStep = 'twelve';

        try {
            handleStepSubmit({ hasPlannedDaycare: hasPlannedDaycare ?? currentHasPlanned ?? false });

            post(route('onboarding.scenario.step.submit', {
                scenario: onboardingState.currentScenario,
                step: step,
                nextStep: nextStep
            }), {
                onFinish: () => setIsLoading(false),
                onError: () => {
                    setIsLoading(false);
                    setSubmitted(false);
                    console.log('Error submitting form:', data);
                },
                onSuccess: () => {
                    setIsLoading(false);
                    setSubmitted(false);
                    router.get(route('onboarding.scenario.step', {
                        scenario: onboardingState.currentScenario,
                        step: nextStep
                    }));
                }
            });
        } catch (error) {
            console.error('Error submitting step:', error);
            setIsLoading(false);
            setSubmitted(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={isLoading ? '' : 'animate animate-appear'}>
            {isLoading ? (
                <div className="bg-opacity-75 inset-0 z-50 flex items-center justify-center bg-white">
                    <div className="loader h-16 w-16 rounded-full border-8 border-t-8 border-blue-700 ease-linear"></div>
                </div>
            ) : (
                <>
                    <div className="mb-4 flex items-center">
                        <Checkbox
                            id="daycare-yes"
                            checked={hasPlannedDaycare === true || (hasPlannedDaycare === null && currentHasPlanned === true)}
                            onCheckedChange={(checked) => {
                                setHasPlannedDaycare(Boolean(checked));
                                setData('data', { hasPlannedDaycare: Boolean(checked) });
                            }}
                        />
                        <Label htmlFor="daycare-yes" className="ml-2">
                            Ja, vi har allerede planlagt det
                        </Label>
                    </div>
                    <div className="mb-4 flex items-center">
                        <Checkbox
                            id="daycare-no"
                            checked={hasPlannedDaycare === false || (hasPlannedDaycare === null && currentHasPlanned === false)}
                            onCheckedChange={(checked) => {
                                setHasPlannedDaycare(!checked);
                                setData('data', { hasPlannedDaycare: !checked });
                            }}
                        />
                        <Label htmlFor="daycare-no" className="ml-2">
                            Nej, vi har ikke planlagt det endnu
                        </Label>
                    </div>
                    {hasPlannedDaycare === false && (
                        <p className="mt-2 text-sm text-yellow-600">Husk at skrive jeres barn op på venteliste så tidligt som muligt.</p>
                    )}
                    <Button
                        type="submit"
                        className="mt-4 bg-blue-700 text-white hover:bg-blue-800"
                        disabled={hasPlannedDaycare === null && currentHasPlanned === undefined}
                    >
                        Næste
                    </Button>
                </>
            )}
        </form>
    );
}

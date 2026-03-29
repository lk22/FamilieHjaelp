import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface IsFirstChildStepFormProps {
    handleStepSubmit: (data: { isFirstChild: boolean }) => void;
}

export default function IsFirstChildStepForm({ handleStepSubmit }: IsFirstChildStepFormProps) {
    const [isFirstChild, setIsFirstChild] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === onboardingState.currentScenario);
    const currentStep = currentScenario?.steps[2];
    const currentIsFirstChild = currentStep?.data.isFirstChild;

    const { post, setData } = useForm<{ data: { isFirstChild: boolean } }>({
        data: { isFirstChild: currentIsFirstChild ?? true },
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const submittedData = { isFirstChild: isFirstChild ?? currentIsFirstChild ?? true };
        setIsLoading(true);

        try {
            await post(
                route('onboarding.scenario.step.submit', {
                    scenario: onboardingState.currentScenario,
                    step: 'three',
                }),
                { onFinish: () => setIsLoading(false) },
            );

            handleStepSubmit(submittedData);

            router.get(
                route('onboarding.scenario.step', {
                    scenario: onboardingState.currentScenario,
                    step: 'four',
                }),
            );
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsLoading(false);
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
                            id="is-first-child-yes"
                            checked={isFirstChild === true || (isFirstChild === null && currentIsFirstChild === true)}
                            onCheckedChange={(checked) => {
                                setIsFirstChild(Boolean(checked));
                                setData('data', { isFirstChild: Boolean(checked) });
                            }}
                        />
                        <Label htmlFor="is-first-child-yes" className="ml-2">
                            Ja, det er vores første barn
                        </Label>
                    </div>
                    <div className="mb-4 flex items-center">
                        <Checkbox
                            id="is-first-child-no"
                            checked={isFirstChild === false || (isFirstChild === null && currentIsFirstChild === false)}
                            onCheckedChange={(checked) => {
                                setIsFirstChild(!checked);
                                setData('data', { isFirstChild: !checked });
                            }}
                        />
                        <Label htmlFor="is-first-child-no" className="ml-2">
                            Nej, vi har allerede børn
                        </Label>
                    </div>
                    <Button
                        type="submit"
                        className="mt-4 bg-blue-700 text-white hover:bg-blue-800"
                        disabled={isFirstChild === null && currentIsFirstChild === undefined}
                    >
                        Næste
                    </Button>
                </>
            )}
        </form>
    );
}

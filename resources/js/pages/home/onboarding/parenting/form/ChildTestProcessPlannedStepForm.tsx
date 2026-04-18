import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface ChildTestProcessPlannedStepFormProps {
    handleStepSubmit: (data: { childTestProcessPlanned: boolean }) => void;
}

type ChildTestProcessPlannedProps = {
    data: {
        childTestProcessPlanned: boolean;
    }
}

export default function ChildTestProcessPlannedStepForm({ handleStepSubmit }: ChildTestProcessPlannedStepFormProps) {
    const [childTestProcessPlanned, setChildTestProcessPlanned] = useState<boolean | null>(null);
    const [step] = useState<string>('five');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [, setSubmitted] = useState<boolean>(false);

    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === onboardingState.currentScenario);
    const currentStep = currentScenario?.steps[4];
    const currentPlanned = currentStep?.data.childTestProcessPlanned;

    const { post, setData, data } = useForm<ChildTestProcessPlannedProps>({
        data: { childTestProcessPlanned: currentPlanned ?? false },
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setSubmitted(true);
        const nextStep = 'six';
        try {
            handleStepSubmit({ childTestProcessPlanned: childTestProcessPlanned ?? currentPlanned ?? false });

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
                            id="test-planned-yes"
                            checked={childTestProcessPlanned === true || (childTestProcessPlanned === null && currentPlanned === true)}
                            onCheckedChange={(checked) => {
                                setChildTestProcessPlanned(Boolean(checked));
                                setData('data', { childTestProcessPlanned: Boolean(checked) });
                            }}
                        />
                        <Label htmlFor="test-planned-yes" className="ml-2">
                            Ja, testene er planlagt
                        </Label>
                    </div>
                    <div className="mb-4 flex items-center">
                        <Checkbox
                            id="test-planned-no"
                            checked={childTestProcessPlanned === false || (childTestProcessPlanned === null && currentPlanned === false)}
                            onCheckedChange={(checked) => {
                                setChildTestProcessPlanned(!checked);
                                setData('data', { childTestProcessPlanned: !checked });
                            }}
                        />
                        <Label htmlFor="test-planned-no" className="ml-2">
                            Nej, vi er usikre på om testene er planlagt
                        </Label>
                    </div>
                    {childTestProcessPlanned === false && (
                        <p className="mt-2 text-sm text-yellow-600">
                            Kontakt hospitalet eller sundhedsplejersken for at høre mere om hælblodprøve og høretest.
                        </p>
                    )}
                    <Button
                        type="submit"
                        className="mt-4 bg-blue-700 text-white hover:bg-blue-800"
                        disabled={childTestProcessPlanned === null && currentPlanned === undefined}
                    >
                        Næste
                    </Button>
                </>
            )}
        </form>
    );
}

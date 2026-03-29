import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface KnowsChildBenefitsAndCheckupsStepFormProps {
    handleStepSubmit: (data: { knowsChildBenefitsAndCheckups: boolean }) => void;
}

export default function KnowsChildBenefitsAndCheckupsStepForm({ handleStepSubmit }: KnowsChildBenefitsAndCheckupsStepFormProps) {
    const [knowsChildBenefitsAndCheckups, setKnowsChildBenefitsAndCheckups] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === onboardingState.currentScenario);
    const currentStep = currentScenario?.steps[6];
    const currentKnows = currentStep?.data.knowsChildBenefitsAndCheckups;

    const { post, setData } = useForm<{ data: { knowsChildBenefitsAndCheckups: boolean } }>({
        data: { knowsChildBenefitsAndCheckups: currentKnows ?? false },
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const submittedData = { knowsChildBenefitsAndCheckups: knowsChildBenefitsAndCheckups ?? currentKnows ?? false };
        setIsLoading(true);

        try {
            await post(
                route('onboarding.scenario.step.submit', {
                    scenario: onboardingState.currentScenario,
                    step: 'seven',
                }),
                { onFinish: () => setIsLoading(false) },
            );

            handleStepSubmit(submittedData);

            router.get(
                route('onboarding.scenario.step', {
                    scenario: onboardingState.currentScenario,
                    step: 'eight',
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
                            id="benefits-yes"
                            checked={knowsChildBenefitsAndCheckups === true || (knowsChildBenefitsAndCheckups === null && currentKnows === true)}
                            onCheckedChange={(checked) => {
                                setKnowsChildBenefitsAndCheckups(Boolean(checked));
                                setData('data', { knowsChildBenefitsAndCheckups: Boolean(checked) });
                            }}
                        />
                        <Label htmlFor="benefits-yes" className="ml-2">
                            Ja, jeg kender til disse
                        </Label>
                    </div>
                    <div className="mb-4 flex items-center">
                        <Checkbox
                            id="benefits-no"
                            checked={knowsChildBenefitsAndCheckups === false || (knowsChildBenefitsAndCheckups === null && currentKnows === false)}
                            onCheckedChange={(checked) => {
                                setKnowsChildBenefitsAndCheckups(!checked);
                                setData('data', { knowsChildBenefitsAndCheckups: !checked });
                            }}
                        />
                        <Label htmlFor="benefits-no" className="ml-2">
                            Nej, jeg vil gerne have mere information
                        </Label>
                    </div>
                    <Button
                        type="submit"
                        className="mt-4 bg-blue-700 text-white hover:bg-blue-800"
                        disabled={knowsChildBenefitsAndCheckups === null && currentKnows === undefined}
                    >
                        Næste
                    </Button>
                </>
            )}
        </form>
    );
}

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface WellbeingChallengesStepFormProps {
    handleStepSubmit: (data: { wellbeingChallenges: string[] }) => void;
}

const WELLBEING_OPTIONS = [
    { id: 'breastfeeding', label: 'Amning' },
    { id: 'sleep', label: 'Søvn' },
    { id: 'nutrition', label: 'Madning' },
    { id: 'routine', label: 'At finde en rytme' },
    { id: 'none', label: 'Ingen udfordringer' },
];

export default function WellbeingChallengesStepForm({ handleStepSubmit }: WellbeingChallengesStepFormProps) {
    const [wellbeingChallenges, setWellbeingChallenges] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === onboardingState.currentScenario);
    const currentStep = currentScenario?.steps[7];
    const currentChallenges = currentStep?.data.wellbeingChallenges || [];

    const { post, setData } = useForm<{ data: { wellbeingChallenges: string[] } }>({
        data: { wellbeingChallenges: currentChallenges },
    });

    const handleCheckboxChange = (id: string, checked: boolean) => {
        let newChallenges: string[];
        if (id === 'none') {
            newChallenges = checked ? ['none'] : [];
        } else {
            newChallenges = checked ? [...wellbeingChallenges.filter((c) => c !== 'none'), id] : wellbeingChallenges.filter((c) => c !== id);
        }
        setWellbeingChallenges(newChallenges);
        setData('data', { wellbeingChallenges: newChallenges });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const submittedData = { wellbeingChallenges: wellbeingChallenges.length > 0 ? wellbeingChallenges : currentChallenges };
        setIsLoading(true);

        try {
            await post(
                route('onboarding.scenario.step.submit', {
                    scenario: onboardingState.currentScenario,
                    step: 'eight',
                }),
                { onFinish: () => setIsLoading(false) },
            );

            handleStepSubmit(submittedData);

            router.get(
                route('onboarding.scenario.step', {
                    scenario: onboardingState.currentScenario,
                    step: 'nine',
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
                    {WELLBEING_OPTIONS.map((option) => (
                        <div key={option.id} className="mb-4 flex items-center">
                            <Checkbox
                                id={option.id}
                                checked={
                                    wellbeingChallenges.includes(option.id) ||
                                    (wellbeingChallenges.length === 0 && currentChallenges.includes(option.id))
                                }
                                onCheckedChange={(checked) => handleCheckboxChange(option.id, Boolean(checked))}
                            />
                            <Label htmlFor={option.id} className="ml-2">
                                {option.label}
                            </Label>
                        </div>
                    ))}
                    {wellbeingChallenges.length === 0 && currentChallenges.length === 0 && (
                        <p className="mt-2 text-sm text-yellow-600">
                            De første uger kan være hårde. Det er normalt at have udfordringer. Jordemoderen og sundhedsplejersken kan hjælpe jer.
                        </p>
                    )}
                    <Button type="submit" className="mt-4 bg-blue-700 text-white hover:bg-blue-800">
                        Næste
                    </Button>
                </>
            )}
        </form>
    );
}

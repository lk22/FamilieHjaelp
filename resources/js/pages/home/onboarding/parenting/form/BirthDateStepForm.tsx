import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface BirthDateStepFormProps {
    handleStepSubmit: (data: { birthDate: string }) => void;
}

export default function BirthDateStepForm({ handleStepSubmit }: BirthDateStepFormProps) {
    const [birthDate, setBirthDate] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === onboardingState.currentScenario);
    const currentStep = currentScenario?.steps[0];
    const currentBirthDate = currentStep?.data.birthDate || '';

    const { post, data, setData } = useForm<{ data: { birthDate: string } }>({
        data: { birthDate: currentBirthDate },
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        const submittedData = { birthDate: birthDate || currentBirthDate };

        try {
            await post(
                route('onboarding.scenario.step.submit', {
                    scenario: onboardingState.currentScenario,
                    step: 'one',
                }),
                {
                    onFinish: () => setIsLoading(false),
                },
            );

            handleStepSubmit(submittedData);

            router.get(
                route('onboarding.scenario.step', {
                    scenario: onboardingState.currentScenario,
                    step: 'two',
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
                    <label htmlFor="birthDate" className="mt-4 mb-2 block font-medium text-gray-700">
                        Angiv dato for fødsel
                    </label>
                    <Input
                        type="date"
                        id="birthDate"
                        value={birthDate || data.data.birthDate}
                        onChange={(e) => {
                            setBirthDate(e.target.value);
                            setData('data', { birthDate: e.target.value });
                        }}
                        required
                        className="w-full"
                    />
                    <Button type="submit" className="mt-4 bg-blue-700 text-white hover:bg-blue-800" disabled={!birthDate && !currentBirthDate}>
                        Næste
                    </Button>
                </>
            )}
        </form>
    );
}

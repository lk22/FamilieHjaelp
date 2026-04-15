import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface BirthDateStepFormProps {
    handleStepSubmit: (data: { birthDate: string }) => void;
}

export default function BirthDateStepForm({ handleStepSubmit }: BirthDateStepFormProps) {
    const [step, setStep] = useState<string>('one');
    const [birthDate, setBirthDate] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === onboardingState.currentScenario);
    const currentStep = currentScenario?.steps[0];
    const currentBirthDate = currentStep?.data.birthDate || '';

    const { post, data, setData } = useForm<{ data: { birthDate: string } }>({
        data: { birthDate: currentBirthDate },
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setSubmitted(true);
        const nextStep = 'two';

        try {
            handleStepSubmit({ birthDate: birthDate || currentBirthDate });

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

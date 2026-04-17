// dependencies
import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';

// contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface FirstStepFormProps {
  handleStepSubmit: (data: {
    wantsInformationAboutAutopsy: boolean;
  }) => void;
}

export default function WantsInformationAboutAutopsyStepForm({ handleStepSubmit }: FirstStepFormProps) {
  const [step, setStep] = useState<string>('six');
  const [nextStep, setNextStep] = useState<string>('');
  const [wantsInformationAboutAutopsy, setWantsInformationAboutAutopsy] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { onboardingState, getCurrentScenario, completeStep } = useOnboarding();

  const { post, data, setData } = useForm<{
    data: {
      wantsInformationAboutAutopsy: boolean;
    }
  }>({
    data: { wantsInformationAboutAutopsy: false },
  });

  const currentScenario = onboardingState.scenarios.find(scenario => scenario.id === onboardingState.currentScenario);
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  // current existing state value for wantsInformationAboutAutopsy from onboarding state, if it exists
  const currentwantsInformationAboutAutopsy = currentStep?.data.wantsInformationAboutAutopsy;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setIsLoading(true);
    const nextStep = 'seven';

    try {
        handleStepSubmit({ wantsInformationAboutAutopsy: wantsInformationAboutAutopsy });

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
    <>
      <form onSubmit={handleSubmit} className={submitted ? "" : "animate animate-appear"}>
        {
          submitted ? (
          <>
            <p className="mt-4 text-green-600">Indsendt</p>
          </>
          ) : (
            <>
            <div className="flex items-center">
              <Checkbox
                id="wantsInformationAboutAutopsy"
                checked={wantsInformationAboutAutopsy || currentwantsInformationAboutAutopsy === true}
                onCheckedChange={(checked) => {
                  setWantsInformationAboutAutopsy(Boolean(checked));
                  setData('data', { ...data.data, wantsInformationAboutAutopsy: Boolean(checked) });
                }}
                className="mr-2"
              >
                Ja, jeg ønsker information om obduktion
              </Checkbox>
              <label htmlFor="wantsInformationAboutAutopsy" className="block mt-4 mb-2 font-medium text-gray-700">
                Ja, jeg ønsker information om obduktion
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="wantsInformationAboutAutopsyNo"
                value="no"
                checked={!(wantsInformationAboutAutopsy || currentwantsInformationAboutAutopsy === false)}
                onCheckedChange={(checked) => {
                  setWantsInformationAboutAutopsy(!checked);
                  setData('data', { ...data.data, wantsInformationAboutAutopsy: !checked });
                }}
                className="mr-2"
              >
                Nej, jeg ønsker ikke information om obduktion
              </Checkbox>
              <label htmlFor="wantsInformationAboutAutopsyNo" className="block mt-4 mb-2 font-medium text-gray-700">
                Nej, jeg ønsker ikke information om obduktion
              </label>
            </div>
              <Button
                type="submit"
                className="bg-blue-700 text-white hover:bg-blue-800 mt-4"
              >
                Næste
              </Button>
            </>
          )
        }
      </form>
    </>
  )
}
// dependencies
import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';

// Contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type StepData = {
  knowsSupportOptions: boolean;
}

interface KnowsSupportOptionsStepFormProps {
  handleStepSubmit: (data: {
    knowsSupportOptions: boolean;
  }) => void;
}

export default function KnowsSupportOptionsStepForm({ handleStepSubmit }: KnowsSupportOptionsStepFormProps) {
  const [step, setStep] = useState<string>('nine');
  const [knowsSupportOptions, setknowsSupportOptions] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { onboardingState } = useOnboarding();

  const { post, data, setData } = useForm<{
    knowsSupportOptions: boolean;
  }>({
    knowsSupportOptions: false,
  });

  const currentScenario = onboardingState.scenarios.find(scenario => scenario.id === onboardingState.currentScenario);

  // TODO: this needs fix
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  const currentknowsSupportOptions: boolean | undefined = currentStep?.data.knowsSupportOptions;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setIsLoading(true);
    const nextStep = 'ten';

    try {
        handleStepSubmit({ knowsSupportOptions: knowsSupportOptions });

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
            <p className="mt-4 text-green-600">Indsendt!</p>
          </>
          ) : (
            <>
            <div className="flex items-center">
              <Checkbox
                id="knowsSupportOptions"
                checked={knowsSupportOptions || currentknowsSupportOptions === true}
                onCheckedChange={(checked) => {
                  setknowsSupportOptions(Boolean(checked));
                  setData('knowsSupportOptions', Boolean(checked));
                }}
                className="mr-2"
              >
                Ja Jeg kender mine muligheder for støtte
              </Checkbox>
              <label htmlFor="knowsSupportOptions" className="block mt-4 mb-2 font-medium text-gray-700">
                Ja Jeg kender mine muligheder for støtte
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="knowsSupportOptionsNo"
                checked={!(knowsSupportOptions || currentknowsSupportOptions === false)}
                onCheckedChange={(checked) => {
                  setknowsSupportOptions(!checked);
                  setData('knowsSupportOptions', !checked);
                }}
                className="mr-2"
              >
                Nej, jeg kender ikke mine muligheder for støtte
              </Checkbox>
              <label htmlFor="knowsSupportOptionsNo" className="block mt-4 mb-2 font-medium text-gray-700">
                Nej, jeg kender ikke mine muligheder for støtte
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
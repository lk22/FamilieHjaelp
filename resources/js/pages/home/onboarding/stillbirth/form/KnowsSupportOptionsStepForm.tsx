import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

import { router } from '@inertiajs/react';

interface StepData {
  wantsInformationAboutAutopsy: string;
}

interface FirstStepFormProps {
  handleStepSubmit: (data: {
    wantsInformationAboutAutopsy: string;
  }) => void;
}

export default function KnowsSupportOptionsStepForm({ handleStepSubmit }: FirstStepFormProps) {
  const [wantsInformationAboutAutopsy, setWantsInformationAboutAutopsy] = useState<string>('');
  const [step, setStep] = useState<string>('one');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { onboardingState, getCurrentScenario, completeStep } = useOnboarding();

  const currentScenario = getCurrentScenario();

  // TODO: this needs fix
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  const currentwantsInformationAboutAutopsy = currentStep?.data.wantsInformationAboutAutopsy || '';

  const { data, setData, post, processing, errors } = useForm<{
    wantsInformationAboutAutopsy: string
  }>({
    wantsInformationAboutAutopsy: ''
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const submittedData: StepData = {
      wantsInformationAboutAutopsy: wantsInformationAboutAutopsy,
    }

    console.log(submittedData)

    // Proceed to the next step or perform other actions
    handleStepSubmit({ ...submittedData });
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);

      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'nineth'
      }));
    }, 1000);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {
          submitted ? (
          <>
            <p className="mt-4 text-green-600">Indsendt</p>
          </>
          ) : (
            <>
              <input type="hidden" name="step" value={step} />
              <Checkbox
                id="wantsInformationAboutAutopsy"
                value={wantsInformationAboutAutopsy}
                onChange={(e) => setWantsInformationAboutAutopsy(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="wantsInformationAboutAutopsy" className="block mt-4 mb-2 font-medium text-gray-700">
                Ja, jeg ønsker information om obduktion
              </label>
              <Checkbox
                id="wantsInformationAboutAutopsyNo"
                value="no"
                onChange={(e) => setWantsInformationAboutAutopsy(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="wantsInformationAboutAutopsyNo" className="block mt-4 mb-2 font-medium text-gray-700">
                Nej, jeg ønsker ikke information om obduktion
              </label>
              <Button
                type="submit"
                className="bg-blue-700 text-white hover:bg-blue-800 mt-4"
                disabled={processing}
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
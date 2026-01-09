import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

import { router } from '@inertiajs/react';

interface StepData {
  informedAboutBereavementLeave: string;
}

interface FirstStepFormProps {
  handleStepSubmit: (data: {
    informedAboutBereavementLeave: string;
  }) => void;
}

export default function InformedAboutBereavementLeaveStepForm({ handleStepSubmit }: FirstStepFormProps) {
  const [informedAboutBereavementLeave, setInformedAboutBereavementLeave] = useState<string>('');
  const [step, setStep] = useState<string>('one');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { onboardingState, getCurrentScenario, completeStep } = useOnboarding();

  const currentScenario = getCurrentScenario();

  // TODO: this needs fix
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  const currentInformedAboutBereavementLeave = currentStep?.data.informedAboutBereavementLeave || '';

  const { data, setData, post, processing, errors } = useForm<{
    informedAboutBereavementLeave: string
  }>({
    informedAboutBereavementLeave: ''
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const submittedData: StepData = {
      informedAboutBereavementLeave: informedAboutBereavementLeave,
    }

    console.log(submittedData)

    // Proceed to the next step or perform other actions
    handleStepSubmit({ ...submittedData });
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);

      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'five'
      }));
    }, 1000);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {
          submitted ? (
          <>
            <p>Indsendt!</p>
          </>
          ) : (
            <>
              <input type="hidden" name="step" value={step} />
                <Checkbox
                  id="informedAboutBereavementLeave"
                  value="yes"
                  checked={informedAboutBereavementLeave === 'yes'}
                  onChange={(e) => setInformedAboutBereavementLeave(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="informedAboutBereavementLeave" className="block mt-4 mb-2 font-medium text-gray-700">
                  Ja jeg er blevet informeret om mine rettigheder til orlov
                </label>
                <Checkbox
                  id="informedAboutBereavementLeave"
                  value="no"
                  checked={informedAboutBereavementLeave === 'no'}
                  onChange={(e) => setInformedAboutBereavementLeave(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="informedAboutBereavementLeave" className="block mt-4 mb-2 font-medium text-gray-700">
                  Nej jeg er ikke blevet informeret om mine rettigheder til orlov
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
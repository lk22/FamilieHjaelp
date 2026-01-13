import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useForm } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

import { router } from '@inertiajs/react';

type WantsContraptionsInformationProps = {
  handleStepSubmit: (data: {wantsContraceptionInfo: boolean}) => void;
}

export default function WantsContraceptionInformationStepForm({ handleStepSubmit }: WantsContraptionsInformationProps) {
  const [wantsContraceptionInfo, setWantsContraceptionInfo] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { onboardingState, getCurrentScenario } = useOnboarding();
  console.log({onboardingState})

  const { data, setData, post, processing, errors } = useForm<{
    wantsContraceptionInfo: boolean;
  }>({
    wantsContraceptionInfo: false,
  });

  const currentScenario = getCurrentScenario();
  const currentStep = currentScenario.steps[4]; // Fifth step (index 4)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setWantsContraceptionInfo(wantsContraceptionInfo);

    // Proceed to the next step or perform other actions
    handleStepSubmit({ wantsContraceptionInfo: data.wantsContraceptionInfo });
    setSubmitted(true);

    router.get(route('onboarding.scenario.step', {
      scenario: onboardingState.currentScenario,
      step: 'six'
    }));
  };

  /**
   * returns a message based on chosen abortion method
   *
   * @param abortionMethod string
   * @returns
   */
  const handleWantsContraceptionInfo = (abortionMethod: string) => {
    if (wantsContraceptionInfo) {
      return (
        <>

        </>
      )
    } else {
      return (
        <>

        </>
      )
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {
          submitted ? (
          <>
            <p className="mt-4 text-green-600">Tak! Du kan nu fortsætte til næste trin.</p>
          </>
          ) : (
            <>
            <div className="check-fields flex flex-col gap-4">
              <div className="check-field flex items-center">
                <Checkbox
                  id="wants-contraception-info"
                  className="me-4"
                  checked={data.wantsContraceptionInfo}
                  onCheckedChange={(checked) => setData('wantsContraceptionInfo', Boolean(checked))}>
                </Checkbox>
                <label htmlFor="wants-contraception-info" className="text-lg">Ja jeg ønsker præventionsvejledning</label>
              </div>
              <div className="check-field flex items-center">
                <Checkbox
                  id="wants-contraception-info"
                  className="me-4"
                  checked={!data.wantsContraceptionInfo}
                  onCheckedChange={(checked) => setData('wantsContraceptionInfo', Boolean(checked))}>
                </Checkbox>
                <label htmlFor="wants-contraception-info" className="text-lg">Nej jeg ønsker ikke præventionsvejledning</label>
              </div>
            </div>
              {wantsContraceptionInfo && (
                <p className="mt-2 text-gray-700">
                  {handleWantsContraceptionInfo(wantsContraceptionInfo)}
                </p>
              )}
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
import { JSX, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useOnboarding } from '@/contexts/OnboardingContext';

import { router } from '@inertiajs/react';
import { logState } from '@/lib/utils'

type WantsContraptionsInformationProps = {
  handleStepSubmit: (data: {wantsContraceptionInfo: boolean}) => void;
}

export default function WantsContraceptionInformationStepForm({ handleStepSubmit }: WantsContraptionsInformationProps) {
  const [wantsContraceptionInfo, setWantsContraceptionInfo] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { onboardingState, getCurrentScenario } = useOnboarding();

  const currentScenario = getCurrentScenario();
  //const currentStep = currentScenario?.steps[4]; // Fifth step (index 4)

  logState('WantsContraceptionInformationStepForm', { onboardingState, currentScenario, wantsContraceptionInfo });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setWantsContraceptionInfo(wantsContraceptionInfo);

    setTimeout(() => {
      setLoading(true)
    }, 200);

    // Proceed to the next step or perform other actions
    handleStepSubmit({ wantsContraceptionInfo: wantsContraceptionInfo === 'true' });
    setSubmitted(true);

    setTimeout(() => {
      setLoading(true)

      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'six'
      }));
    }, 500);
  };

  /**
   * returns a message based on chosen abortion method
   *
   * @param abortionMethod string
   * @returns
   */
  const handleWantsContraceptionInfo = (abortionMethod: string): JSX.Element => {
    console.log('Handling wants contraception info with value:', abortionMethod);
    if (wantsContraceptionInfo === 'true') {
      return (
        <div className='mt-4 p-4 border border-gray-300 rounded bg-gray-50'>
          <div>
            Læs om de forskellige præventionsmetoder og find den, der passer bedst til dig:
            <a
            href="https://www.sundhed.dk/borger/patienthaandbogen/kvindesygdomme/sygdomme/praevention/praevention-forskellige-praeventionsmetoder/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline">
              Læs mere
            </a>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={submitted ? "" : "animate animate-appear"}>
        {
          isLoading ? (
          <>
            <div className="inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-700 h-16 w-16"></div>
            </div>
          </>
          ) : (
            <>
            <div className="check-fields flex flex-col gap-4">
              <div className="check-field flex items-center">
                <Checkbox
                  id="wants-contraception-info"
                  className="me-4"
                  checked={wantsContraceptionInfo}
                  onCheckedChange={(checked) => setWantsContraceptionInfo(checked ? 'true' : 'false')}>
                </Checkbox>
                <label htmlFor="wants-contraception-info" className="text-lg">Ja jeg ønsker præventionsvejledning</label>
              </div>
              <div className="check-field flex items-center">
                <Checkbox
                  id="wants-contraception-info"
                  className="me-4"
                  checked={!wantsContraceptionInfo}
                  onCheckedChange={(checked) => setWantsContraceptionInfo(!checked ? 'false' : 'true')}>
                </Checkbox>
                <label htmlFor="wants-contraception-info" className="text-lg">Nej jeg ønsker ikke præventionsvejledning</label>
              </div>
            </div>
              {wantsContraceptionInfo && (
                <>
                  {handleWantsContraceptionInfo(wantsContraceptionInfo)}
                </>
              )}
              <Button
                type="submit"
                className="bg-blue-700 text-white hover:bg-blue-800 mt-4"
                disabled={isLoading}
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
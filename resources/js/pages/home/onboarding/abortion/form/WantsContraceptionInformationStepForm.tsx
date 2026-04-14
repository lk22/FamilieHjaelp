// dependencies
import { JSX, useState } from 'react';
import { router, useForm } from '@inertiajs/react';

// Contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Utilities
import { logState } from '@/lib/utils'

type WantsContraceptionInformationProps = {
  handleStepSubmit: (data: {wantsContraceptionInfo: boolean}) => void;
}

export default function WantsContraceptionInformationStepForm({ handleStepSubmit }: WantsContraceptionInformationProps) {
  const [step, setStep] = useState<string>('six');
  const [wantsContraceptionInfo, setWantsContraceptionInfo] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { onboardingState } = useOnboarding();

  const currentScenario = onboardingState.scenarios.find((scenario) => scenario.id === onboardingState.currentScenario);
  const currentStep = currentScenario?.steps[4]; // Fifth step (index 4)

  const currentWantsContraceptionInfo = currentStep?.data.wantsContraceptionInfo;
  const abortionMethod = currentScenario?.steps[1].data.abortionMethod;

  const { post, data, setData, errors, processing, reset } = useForm<{
    wantsContraceptionInfo: boolean;
  }>({
    wantsContraceptionInfo: false,
  });

  logState('WantsContraceptionInformationStepForm', { onboardingState, currentScenario, wantsContraceptionInfo });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await setLoading(true);
    await setSubmitted(true);
    await handleStepSubmit({ wantsContraceptionInfo: wantsContraceptionInfo });

    await post(route('onboarding.scenario.step.submit', {
      scenario: onboardingState.currentScenario,
      step: step
    }), {
      onFinish: () => setLoading(false)
    });

    setTimeout(() => {
      setSubmitted(false);
      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'seven'
      }));
      setLoading(false);
    }, 1000);
  };

  /**
   * returns a message based on chosen abortion method
   *
   * @param abortionMethod string
   * @returns
   */
  const handleWantsContraceptionInfo = (abortionMethod: string): JSX.Element => {
    console.log('Handling wants contraception info with value:', abortionMethod);
    if (wantsContraceptionInfo) {
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
                  checked={wantsContraceptionInfo || currentWantsContraceptionInfo === 'true'}
                  onCheckedChange={(checked) => setWantsContraceptionInfo(Boolean(checked))}>
                </Checkbox>
                <label htmlFor="wants-contraception-info" className="text-lg">Ja jeg ønsker præventionsvejledning</label>
              </div>
              <div className="check-field flex items-center">
                <Checkbox
                  id="wants-contraception-info"
                  className="me-4"
                  checked={!wantsContraceptionInfo || currentWantsContraceptionInfo === 'false'}
                  onCheckedChange={(checked) => setWantsContraceptionInfo(!checked)}>
                </Checkbox>
                <label htmlFor="wants-contraception-info" className="text-lg">Nej jeg ønsker ikke præventionsvejledning</label>
              </div>
            </div>
              {wantsContraceptionInfo && (
                <>
                  {handleWantsContraceptionInfo(abortionMethod)}
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
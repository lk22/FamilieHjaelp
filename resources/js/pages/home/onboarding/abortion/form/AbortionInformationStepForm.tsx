import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useOnboarding } from '@/contexts/OnboardingContext';

import { router } from '@inertiajs/react';

type AbortionInformationStepProps = {
    handleStepSubmit: (data: {
      abortionWeeks: string;
      hasDoctorsPermit: boolean;
      abortionMethod: string;
    }) => void;
}

type AbortionDataProps = {
  abortionWeeks: string;
  hasDoctorsPermit: boolean;
  abortionMethod: string;
}

export default function AbortionInformationStepForm({ handleStepSubmit }: AbortionInformationStepProps) {
  const [abortionWeeks, setAbortionWeeks] = useState<string>('');
  const [hasDoctorsPermit, setHasDoctorsPermit] = useState<boolean | null>(null);
  const [abortionMethod, setAbortionMethod] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { onboardingState, getCurrentScenario } = useOnboarding();
  const currentScenario = getCurrentScenario();
  const currentStep = currentScenario?.steps[1]; // second step
  const currentAbortionWeeksValue = currentStep?.data.abortionWeeks;
  const currentHasDoctorsPermitValue = currentStep?.data.hasDoctorsPermit;
  const currentAbortionMethodValue = currentStep?.data.abortionMethod;

  const firstStep = currentScenario?.steps[0];
  const gender = firstStep.data.gender;

  console.log(gender)

  /**
   * Handle step submit flow
   *
   * @param event React.FormEvent
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setLoading(true)
    }, 200)

    const abortionData: AbortionDataProps = {
      abortionWeeks: abortionWeeks,
      hasDoctorsPermit: hasDoctorsPermit,
      abortionMethod: abortionMethod
    }

    handleStepSubmit({...abortionData})
    setTimeout(() => {
      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'three'
      }));
      setLoading(false)
    }, 1000)
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
            <div className="step-field">
                <label htmlFor="abortion-weeks">
                  {gender === 'female' ? 'Hvor langt er du i graviditeten' : 'Hvor langt er din partner i graviditeten'}
                </label>
                <div className="flex items-center">
                  <Input
                    type="number"
                    id="abortion-weeks"
                    onChange={(e) => setAbortionWeeks(e.target.value)}
                    required
                    value={abortionWeeks || currentAbortionWeeksValue}
                    className="w-7/12 mt-2 mb-2"
                  />
                  <span className="w-5/12 ms-4">Uger</span>
                </div>
            </div>
              <div className="step-field mt-2">
                  <label htmlFor="abortion-method">
                    Hvilken metode ønsker du at benytte til din abort
                  </label>
                  <select id="abortion-method" value={currentAbortionMethodValue || abortionMethod} onChange={(e) => setAbortionMethod(e.target.value)} className="mt-2 mb-4 p-2 border border-gray-300 rounded w-full">
                    <option value="">Vælg en metode</option>
                    <option value="medication">Medicinsk abort</option>
                    <option value="surgical">Kirurgisk abort</option>
                    <option value="other">Anden metode</option>
                  </select>
              </div>
            <div className="step-field my-4">
              <div className="flex flex-col">
                  <label htmlFor="has-doctors-permit">
                    Har du fået underskrevet en lægeerklæring
                  </label>
                <div className="check-item mt-2">
                  <input
                    type="radio"
                    id="has-doctors-permit"
                    value="1"
                    checked={hasDoctorsPermit === true || currentHasDoctorsPermitValue === true}
                    onChange={() => setHasDoctorsPermit(true)}
                    className="mr-2"
                  />
                  <label htmlFor="">
                    Ja har underskrevet en lægeerklæring
                  </label>
                </div>
                <div className="check-item mt-2">
                  <input
                    type="radio"
                    id="has-doctors-permit"
                    value="0"
                    checked={hasDoctorsPermit === false || currentHasDoctorsPermitValue === false}
                    onChange={() => setHasDoctorsPermit(false)}
                    className="mr-2"
                    required
                  />
                  <label htmlFor="has-doctors-permit">
                    Nej manger og udfylde en lægeerklæring
                  </label>
                </div>
              </div>
            </div>
              <Button
                type="submit" className="bg-blue-700 text-white hover:bg-blue-800 mt-4"
              >
                  Fortsæt til næste trin
              </Button>
          </>
          )
        }
      </form>
    </>
  );
}
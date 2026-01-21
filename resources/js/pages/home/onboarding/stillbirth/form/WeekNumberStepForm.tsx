import {useState} from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {Select} from '@/components/ui/select';

import { useForm } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

import { router } from '@inertiajs/react';

interface FormStepProps {
    handleStepSubmit: (data: {
      weekNumber: string;
    }) => void;
}

interface WeekNumberDate {
  weekNumber: string;
}

export default function WeekNumberStepForm({ handleStepSubmit }: FormStepProps) {
  const [weekNumber, setWeekNumber] = useState<string>('');
  const [abortionWeeks, setAbortionWeeks] = useState<string>('');
  const [hasDoctorsPermit, setHasDoctorsPermit] = useState<boolean | null>(null);
  const [abortionMethod, setAbortionMethod] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { onboardingState, getCurrentScenario, getOnboardingProperties } = useOnboarding();
  const currentScenario = getCurrentScenario();
  const currentStep = currentScenario?.steps[1]; // second step
  const currentAbortionWeeksValue = currentStep?.data.abortionWeeks;
  const currentHasDoctorsPermitValue = currentStep?.data.hasDoctorsPermit;
  const currentAbortionMethodValue = currentStep?.data.abortionMethod;

  const firstStep = currentScenario?.steps[0];
  const gender = firstStep.data.gender;

  /**
   * Handle step submit flow
   *
   * @param event React.FormEvent
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);

    const weekNumberData = {
      weekNumber: weekNumber,
      abortionWeeks: abortionWeeks,
      hasDoctorsPermit: hasDoctorsPermit,
      abortionMethod: abortionMethod,
    }

    handleStepSubmit(weekNumberData)

    router.get(route('onboarding.scenario.step', {
      scenario: onboardingState.currentScenario,
      step: 'three'
    }));
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
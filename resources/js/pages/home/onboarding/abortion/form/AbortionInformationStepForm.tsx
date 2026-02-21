import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useOnboarding } from '@/contexts/OnboardingContext';

import { router } from '@inertiajs/react';
import { logState } from '@/lib/utils'

type AbortionInformationStepProps = {
    handleStepSubmit: (data: {
      abortionWeeks: string;
      hasDoctorsPermit: boolean;
      abortionMethod: string;
      hasBeenConsultedByDoctor?: boolean
    }) => void;
}

type AbortionDataProps = {
  abortionWeeks: number;
  hasDoctorsPermit: boolean;
  abortionMethod: string;
  hasBeenConsultedByDoctor?: boolean
}

export default function AbortionInformationStepForm({ handleStepSubmit }: AbortionInformationStepProps) {
  const [abortionInfoState, setAbortionInfoState] = useState<AbortionDataProps>({
    abortionWeeks: 0,
    hasDoctorsPermit: false,
    abortionMethod: '',
    hasBeenConsultedByDoctor: false
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { onboardingState, getCurrentScenario } = useOnboarding();
  const currentScenario = getCurrentScenario();
  const currentStep = currentScenario?.steps[1]; // second step
  const currentAbortionWeeksValue = currentStep?.data.abortionWeeks;
  const currentHasDoctorsPermitValue = currentStep?.data.hasDoctorsPermit;
  const currentAbortionMethodValue = currentStep?.data.abortionMethod;
  const currentHasBeenConsultedByDoctorValue = currentStep?.data.hasBeenConsultedByDoctor;

  logState('AbortionInformationStepFormProps', { onboardingState, currentScenario, abortionInfoState });

  const firstStep = currentScenario?.steps[0];
  const gender = firstStep?.data.gender;

  const handleWeekNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 1 && Number(value) <= 24)) {
      setAbortionInfoState({ ...abortionInfoState, abortionWeeks: Number(value) });
    }
  }

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
      abortionWeeks: abortionInfoState.abortionWeeks,
      hasDoctorsPermit: abortionInfoState.hasDoctorsPermit,
      abortionMethod: abortionInfoState.abortionMethod,
      hasBeenConsultedByDoctor: abortionInfoState.hasBeenConsultedByDoctor
    }

    handleStepSubmit(abortionData);
    setTimeout(() => {
      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'three'
      }));
      setLoading(false)
    }, 1000)
  }

  /**
   * Returns Week number notice in condition for abortion weeks changed above or equal
   */
  const renderWeekNumberNotice = () => {
    if (abortionInfoState.abortionWeeks >= 22 || currentAbortionWeeksValue >= 22) {
      return "Bemærk: Da du er i uge 22 eller derover, er der nogle yderligere krav og overvejelser, du skal være opmærksom på. Det anbefales, at du søger rådgivning hos en læge for at få mere information om dine muligheder og de nødvendige skridt fremad.";
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
            <div className="step-field">
              <label htmlFor="abortion-weeks">
                {gender === 'female' ? 'Hvor mange uger er du i graviditeten' : 'Hvor mange uger er din partner i graviditeten'}
              </label>
              <div className="flex items-center flex-wrap gap-4">
                <Input
                  type="number"
                  id="abortion-weeks"
                  onChange={handleWeekNumberChange}
                  required
                  value={abortionInfoState.abortionWeeks || currentAbortionWeeksValue || 1}
                  min={1}
                  max={24}
                  className="w-6/12 mt-0 mb-2 border-gray-300 rounded"
                />
                <div className="step-field -mt-6">
                  <label htmlFor="abortion-method" id="abortion-method-label">
                    Hvilken metode ønsker du at benytte til din abort
                  </label>
                  <select
                    id="abortion-method"
                    value={currentAbortionMethodValue || abortionInfoState.abortionMethod}
                    onChange={(e) => setAbortionInfoState({...abortionInfoState, abortionMethod: e.target.value})}
                    className="mt-2 mb-4 p-2 border border-gray-300 rounded w-12/12"
                  >
                    <option value="">Vælg en metode</option>
                    <option value="medication">Medicinsk abort</option>
                    <option value="surgical">Kirurgisk abort</option>
                    <option value="other">Anden metode</option>
                  </select>
                </div>
                <div className="change-info-note mb-4 w-full">

                  {
                    abortionInfoState.abortionWeeks >= 22 || currentAbortionWeeksValue >= 22 && (
                      <>
                        Bemærk: Da du er i uge 22 eller derover, er der nogle yderligere krav og overvejelser, du skal være opmærksom på. Det anbefales, at du søger rådgivning hos en læge for at få mere information om dine muligheder og de nødvendige skridt fremad.
                      </>
                    )
                  }
                </div>
              </div>
            </div>
              <div className="step-field mt-2">
                <label htmlFor="has-been-consulted-by-doctor" id="has-been-consulted-by-doctor-label">
                  Har du været til konsultation hos en læge i forbindelse med din abort?
                </label>
                <div className="check-item mt-2">
                  <input
                    type="radio"
                    id="has-been-consulted-by-doctor"
                    value="1"
                    checked={abortionInfoState.hasBeenConsultedByDoctor === true || currentHasBeenConsultedByDoctorValue === true}
                    onChange={() => setAbortionInfoState({...abortionInfoState, hasBeenConsultedByDoctor: true})}
                    className="mr-2"
                  />
                  <label htmlFor="has-been-consulted-by-doctor-yes">
                    Ja, jeg har været til konsultation hos en læge i forbindelse med min abort
                  </label>
                </div>
                <div className="check-item mt-2">
                  <input
                    type="radio"
                    id="has-been-consulted-by-doctor"
                    value="0"
                    checked={abortionInfoState.hasBeenConsultedByDoctor === false || currentHasBeenConsultedByDoctorValue === false}
                    onChange={() => setAbortionInfoState({...abortionInfoState, hasBeenConsultedByDoctor: false})}
                    className="mr-2"
                    required
                  />
                  <label htmlFor="has-been-consulted-by-doctor-no">
                    Nej, jeg har ikke været til konsultation hos en læge i forbindelse med min abort
                  </label>
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
                    checked={abortionInfoState.hasDoctorsPermit === true || currentHasDoctorsPermitValue === true}
                    onChange={() => setAbortionInfoState({...abortionInfoState, hasDoctorsPermit: true})}
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
                    checked={abortionInfoState.hasDoctorsPermit === false || currentHasDoctorsPermitValue === false}
                    onChange={() => setAbortionInfoState({...abortionInfoState, hasDoctorsPermit: false})}
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
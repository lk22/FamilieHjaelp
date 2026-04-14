// Dependencies
import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';

// Contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type FormStepProps = {
    handleStepSubmit: (data: {
      weekNumber: string;
      hasDoctorsPermit: boolean
      hasBeenConsultedByDoctor: boolean
    }) => void;
}

interface WeekNumberStepFormData {
  weekNumber: string;
  hasDoctorsPermit: boolean;
  hasBeenConsultedByDoctor: boolean;
}

export default function WeekNumberStepForm({ handleStepSubmit }: FormStepProps) {
  const [weekNumber, setWeekNumber] = useState<string>('');
  const [hasDoctorsPermit, setHasDoctorsPermit] = useState<boolean | null>(true);
  const [hasBeenConsultedByDoctor, setHasBeenConsultedByDoctor] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { onboardingState} = useOnboarding();

  const { post, data, setData } = useForm<{
    weekNumber: string,
    hasDoctorsPermit: boolean,
    hasBeenConsultedByDoctor: boolean
  }>({
    weekNumber: '',
    hasDoctorsPermit: false,
    hasBeenConsultedByDoctor: false
  });

  const currentScenario = onboardingState.scenarios.find(scenario => scenario.id === onboardingState.currentScenario);
  const currentStep = currentScenario?.steps[1]; // second step
  const currentWeeksNumberValue = currentStep?.data.weekNumber;
  const currentHasDoctorsPermitValue = currentStep?.data.hasDoctorsPermit
  const currentHasBeenConsultedByDoctorValue = currentStep?.data.hasBeenConsultedByDoctor

  const firstStep = currentScenario?.steps[0];
  const gender = firstStep?.data.gender;

  /**
   * Handle step submit flow
   *
   * @param event React.FormEvent
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await setSubmitted(true);

    const submittedData: WeekNumberStepFormData = {
      weekNumber,
      hasDoctorsPermit: Boolean(hasDoctorsPermit),
      hasBeenConsultedByDoctor: Boolean(hasBeenConsultedByDoctor)
    }

    await handleStepSubmit({ ...submittedData });

    post(route('onboarding.scenario.step.submit', {
      scenario: onboardingState.currentScenario,
      step: 'two'
    }), {
      onFinish: () => setLoading(false)
    });

    setTimeout(() => {
      setSubmitted(false);
      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'three'
      }));
      setLoading(false);
    }, 1000);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={submitted ? "" : "animate animate-appear"}>
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
                    onChange={(e) => {
                      setWeekNumber(e.target.value);
                      setData('weekNumber', e.target.value);
                    }}
                    required
                    value={weekNumber || currentWeeksNumberValue}
                    className="w-7/12 mt-2 mb-2"
                  />
                  <span className="w-5/12 ms-4">Uger</span>
                </div>
                {
                  weekNumber !== '' && Number(weekNumber) >= 22 && (
                    <>
                      <p className="text-sm text-yellow-600 mt-2">
                        Bemærk: Da du er i uge 22 eller derover, er der nogle yderligere krav og overvejelser, du skal være opmærksom på. Det anbefales, at du søger rådgivning hos en læge for at få mere information om dine muligheder og de nødvendige skridt fremad.
                      </p>
                    </>
                  )
                }
                <Label htmlFor="has-been-consulted-by-doctor" className="font-bold mt-4">
                  Har du/i været til konsultation med jeres læge?
                </Label>
                <div className="flex items-center">
                    <Checkbox
                      id="has-been-consulted-by-doctor"
                      name='has-been-consulted-by-doctor'
                      checked={hasBeenConsultedByDoctor || currentHasBeenConsultedByDoctorValue === true}
                      onCheckedChange={(checked) => {
                        setHasBeenConsultedByDoctor(Boolean(checked));
                        setData('hasBeenConsultedByDoctor', Boolean(checked));
                      }}
                      className="mt-2 mb-4"
                    >
                      Ja har været i konsultation med min læge
                    </Checkbox>
                    <Label htmlFor="needs-translator" className="ml-2 text-md">
                      Ja, jeg har været i konsultation med min læge
                    </Label>
                </div>
                <div className="flex items-center">
                    <Checkbox
                      id="has-been-consulted-by-doctor"
                      name='has-been-consulted-by-doctor'
                      checked={!hasBeenConsultedByDoctor || !currentHasBeenConsultedByDoctorValue === false}
                      onCheckedChange={(checked) => {
                        setHasBeenConsultedByDoctor(!checked);
                        setData('hasBeenConsultedByDoctor', !checked);
                      }}
                      className="mt-2 mb-4"
                    >
                      Nej, har ikke været i konsultation med min læge
                    </Checkbox>
                    <Label htmlFor="needs-translator" className="ml-2 text-md">
                      Nej, har ikke været i konsultation med min læge
                    </Label>
                </div>
                {
                  hasBeenConsultedByDoctor && (
                    <>
                      <Label htmlFor="has-been-consulted-by-doctor" className="font-bold mt-4">
                        Har i fået underskrevet en lægeerklæring?
                      </Label>
                      <div className="flex items-center">
                        <Checkbox
                          id="has-doctors-permit"
                          name='has-doctors-permit'
                          checked={hasDoctorsPermit || currentHasDoctorsPermitValue === true}
                          onCheckedChange={(checked) => {
                            setHasDoctorsPermit(Boolean(checked));
                            setData('hasDoctorsPermit', Boolean(checked));
                          }}
                          className="mt-2 mb-4"
                        >
                          Ja har underskrevet lægeerklæring
                        </Checkbox>
                        <Label htmlFor="needs-translator" className="ml-2 text-md">
                          Ja, har underskrevet lægeerklæring
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="has-doctors-permit"
                          name='has-doctors-permit'
                          checked={!hasDoctorsPermit || !currentHasDoctorsPermitValue === false}
                          onCheckedChange={(checked) => {
                            setHasDoctorsPermit(!checked);
                            setData('hasDoctorsPermit', !checked);
                          }}
                          className="mt-2 mb-4"
                        >
                          Nej, har ikke fået underskrevet lægeerklæring
                        </Checkbox>
                        <Label htmlFor="needs-translator" className="ml-2 text-md">
                          Nej, har ikke fået underskrevet lægeerklæring
                        </Label>
                      </div>
                    </>
                  )
                }
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
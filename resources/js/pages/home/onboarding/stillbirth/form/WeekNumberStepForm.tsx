import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { router } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Label } from '@/components/ui/label';

interface FormStepProps {
    handleStepSubmit: (data: {
      weekNumber: string;
    }) => void;
}

interface WeekNumberDate {
  weekNumber: string;
}

export default function WeekNumberStepForm({ handleStepSubmit }: FormStepProps) {
  const [beforeAfterTwentyTwoWeeks, setBeforeAfterTwentyTwoWeeks] = useState<boolean>(false);
  const [weekNumber, setWeekNumber] = useState<string>('');
  const [abortionWeeks, setAbortionWeeks] = useState<string>('');
  const [hasDoctorsPermit, setHasDoctorsPermit] = useState<boolean | null>(null);
  const [abortionMethod, setAbortionMethod] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { onboardingState} = useOnboarding();
  const currentScenario = onboardingState.scenarios.find(scenario => scenario.id === onboardingState.currentScenario);
  const currentStep = currentScenario?.steps[1]; // second step
  const currentAbortionWeeksValue = currentStep?.data.abortionWeeks;

  const firstStep = currentScenario?.steps[0];
  const gender = firstStep?.data.gender;

  console.log()

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

    setTimeout(() => {
      setSubmitted(false);

      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'three'
      }));
    }, 1000);
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
                <div className="flex items-center">
                    <Checkbox
                      id="needs-translator"
                      name='needs-translator'
                      checked={needsInterpreter}
                      onCheckedChange={(checked) => setneedsInterpreter(Boolean(checked))}
                      className="mt-2 mb-4"
                    >
                      Ja, jeg har brug for en tolk
                    </Checkbox>
                    <Label htmlFor="needs-translator" className="ml-2 text-lg">
                      Ja, jeg har brug for en tolk
                    </Label>
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
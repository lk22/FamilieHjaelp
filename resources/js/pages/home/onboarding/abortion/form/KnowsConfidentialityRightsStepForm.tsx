// dependencies
import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';

// Contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Utilities
import { logState } from '@/lib/utils'

type KnowsConfidentialityRightsStepFormProps = {
  handleStepSubmit: (data: {knowsConfidentialityRights: boolean}) => void;
}

type KnowsConfidentialityRightsProps = {
  data: {
    knowsConfidentialityRights: boolean;
  }
}

export default function KnowsConfidentialityRightsStepForm({ handleStepSubmit }: KnowsConfidentialityRightsStepFormProps) {
  const [step] = useState<string>('five');
  const [knowsConfidentialityRights, setKnowsConfidentialityRights] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const {post, data, setData} = useForm<KnowsConfidentialityRightsProps>({
    data: {
      knowsConfidentialityRights: false,
    }
  })

  const { onboardingState } = useOnboarding();
  logState('KnowsConfidentialityRightsStepForm', { onboardingState, knowsConfidentialityRights });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSubmitted(true)
    const nextStep = 'six';

    try {
      handleStepSubmit({ knowsConfidentialityRights: Boolean(knowsConfidentialityRights) });

      post(route('onboarding.scenario.step.submit', {
        scenario: onboardingState.currentScenario,
        step: step,
        nextStep: nextStep
      }), {
        onFinish: () => setLoading(false),
        onError: () => {
          setLoading(false);
          setSubmitted(false);
          console.log('Error submitting form:', data);
        },
        onSuccess: () => {
          setLoading(false);
          setSubmitted(false);
          router.get(route('onboarding.scenario.step', {
            scenario: onboardingState.currentScenario,
            step: nextStep
          }));
        }
      });
    } catch (error) {
      console.error('Error submitting step:', error);
      setLoading(false);
      setSubmitted(false);
    }
  };

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
              <div className="check-field flex items-center">
                <Checkbox
                  id="knows_confidentiality_rights"
                  name="knows_confidentiality_rights"
                  checked={knowsConfidentialityRights || data.data.knowsConfidentialityRights}
                  onCheckedChange={(checked) => {
                    setKnowsConfidentialityRights(Boolean(checked));
                    setData('data', {
                      ...data.data,
                      knowsConfidentialityRights: Boolean(checked)
                    });
                  }}
                  className="mt-2 mb-4"
                />
                <label htmlFor="knows_confidentiality_rights" className='text-lg ml-4'>
                  Ja, jeg kender mine rettigheder i forhold til fortrolighed
                </label>
              </div>
              <div className="check-field flex items-center">
                <Checkbox
                  id="knows_confidentiality_rights"
                  name="knows_confidentiality_rights"
                  checked={!knowsConfidentialityRights && !data.data.knowsConfidentialityRights}
                  onCheckedChange={(checked) => {
                    setKnowsConfidentialityRights(!checked);
                    setData('data', {
                      ...data.data,
                      knowsConfidentialityRights: !checked
                    });
                  }}
                  className="mt-2 mb-4"
                />
                <label htmlFor="knows_confidentiality_rights" className='text-lg ml-4'>
                  Nej, jeg kender ikke mine rettigheder i forhold til fortrolighed
                </label>
              </div>

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
// Dependencies
import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';

// Contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface WantsToNameChildStepFormProps {
  handleStepSubmit: (data: {
    wantsToNameChild: boolean;
    wantsToInformChildName: boolean;
    childName?: string;
  }) => void;
}

export default function WantsToNameChildStepForm({ handleStepSubmit }: WantsToNameChildStepFormProps) {
  const [step] = useState<string>('one');
  const [wantsToNameChild, setWantsToNameChild] = useState<boolean>(true);
  const [wantsToInformChildName, setWantsToInformChildName] = useState<boolean>(true);
  const [childName, setChildName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [, setIsLoading] = useState<boolean>(false);
  const { onboardingState } = useOnboarding();

  const { post, data, setData } = useForm<{
    data: {
      wantsToNameChild: boolean;
      wantsToInformChildName: boolean;
      childName?: string;
    }
  }>({
    data: {
      wantsToNameChild: true,
      wantsToInformChildName: true,
      childName: ''
    }
  });

  const currentScenario = onboardingState.scenarios.find(scenario => scenario.id === onboardingState.currentScenario);
  const currentStep = currentScenario?.steps[0]; // First step (index 0)
  const currentWantsToNameChild = currentStep?.data.wantsToNameChild
  const currentWantsToInformChildName = currentStep?.data.wantsToInformChildName
  const currentChildName = currentStep?.data.childName || '';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setIsLoading(true);
    const nextStep = 'two';

    try {
        handleStepSubmit({
          wantsToNameChild: wantsToNameChild,
          wantsToInformChildName: wantsToInformChildName,
          childName: childName || currentChildName
        });

        post(route('onboarding.scenario.step.submit', {
            scenario: onboardingState.currentScenario,
            step: step,
            nextStep: nextStep
        }), {
            onFinish: () => setIsLoading(false),
            onError: () => {
                setIsLoading(false);
                setSubmitted(false);
                console.log('Error submitting form:', data);
            },
            onSuccess: () => {
                setIsLoading(false);
                setSubmitted(false);
                router.get(route('onboarding.scenario.step', {
                    scenario: onboardingState.currentScenario,
                    step: nextStep
                }));
            }
        });
    } catch (error) {
        console.error('Error submitting step:', error);
        setIsLoading(false);
        setSubmitted(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={submitted ? "" : "animate animate-appear"}>
        {
          submitted ? (
          <>
            <p>Indsendt!</p>
          </>
          ) : (
            <>
              <div className="flex items-center">
                <Checkbox
                  id="wants-to-name-child"
                  name="wants-to-name-child"
                  checked={wantsToNameChild || currentWantsToNameChild === true}
                  onCheckedChange={(checked) => {
                    setWantsToNameChild(Boolean(checked));
                    setData('data', { ...data.data, wantsToNameChild: Boolean(checked) });
                  }}
                  className="mr-2 mb-4"
                >
                  Ja vi ønske og navngive barnet
                </Checkbox>
                <Label htmlFor="wants-to-name-child" className="block mb-2 font-medium text-gray-700">
                  Ja vi ønsker og navngive barnet
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="wants-to-name-child-no"
                  name="wants-to-name-child-no"
                  checked={!wantsToNameChild || currentWantsToNameChild === false}
                  onCheckedChange={(checked) => {
                    setWantsToNameChild(!checked);
                    setData('data', { ...data.data, wantsToNameChild: !checked });
                  }}
                  className="mr-2 mb-4"
                >
                  Nej vi ønsker ikke og navngive barnet
                </Checkbox>
                <Label htmlFor="wants-to-name-child-no" className="block mb-2 font-medium text-gray-700">
                  Nej vi ønsker ikke og navngive barnet
                </Label>
              </div>
              {
                wantsToNameChild && (
                  <>
                    <p className="text-sm text-gray-600 my-2">
                      Bemærk: Hvis du vælger at navngive barnet, vil det være synligt i din profil og i de ressourcer og den støtte, vi tilbyder. Hvis du vælger ikke at navngive barnet, vil det ikke være synligt i din profil, og du vil ikke modtage ressourcer og støtte relateret til barnets navn.
                    </p>
                    <div className="flex items-center">
                      <Checkbox
                        id="wants-to-inform-child-name"
                        name="wants-to-inform-child-name"
                        checked={wantsToInformChildName || currentWantsToInformChildName === true}
                        onCheckedChange={(checked) => {
                          setWantsToInformChildName(Boolean(checked));
                          setData('data', { ...data.data, wantsToInformChildName: Boolean(checked) });
                        }}
                        className="mr-2 mb-4"
                      >
                        Ja, jeg ønsker at informere om barnets navn
                      </Checkbox>
                      <Label htmlFor="wants-to-inform-child-name" className="block mb-2 font-medium text-gray-700">
                        Ja, jeg ønsker at informere om barnets navn
                      </Label>
                    </div>
                    {
                      wantsToInformChildName && (
                        <>
                          <label htmlFor="child-name" className="block mt-4 mb-2 font-medium text-gray-700">Hvad er barnets navn?</label>
                          <input
                            type="text"
                            id="child-name"
                            name="child-name"
                            value={childName || currentChildName}
                            onChange={(e) => {
                              setChildName(e.target.value);
                              setData('data', { ...data.data, childName: e.target.value });
                            }}
                            className="block w-full mt-1 ps-4 mb-4 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </>
                      )
                    }
                    <div className="flex items-center">
                      <Checkbox
                        id="wants-to-inform-child-name-no"
                        name="wants-to-inform-child-name-no"
                        checked={!wantsToInformChildName || currentWantsToInformChildName === false}
                        onCheckedChange={(checked) => {
                          setWantsToInformChildName(!checked);
                          setData('data', { ...data.data, wantsToInformChildName: !checked });
                        }}
                        className="mr-2 mb-4"
                      >
                        Nej, jeg ønsker ikke at informere om barnets navn
                      </Checkbox>
                      <Label htmlFor="wants-to-inform-child-name-no" className="block mt-4 mb-2 font-medium text-gray-700">
                        Nej, jeg ønsker ikke at informere om barnets navn
                      </Label>
                    </div>
                  </>
                )
              }
              <Button
                type="submit"
                className="bg-blue-700 text-white hover:bg-blue-800 mt-4"
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
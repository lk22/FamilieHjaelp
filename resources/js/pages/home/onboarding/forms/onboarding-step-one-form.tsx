import { useForm, usePage } from "@inertiajs/react";
import {useState} from "react";

import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OnboardingStepOne() {
    const [step, setStep] = useState(1);
    const { onboarding } = usePage().props;
    console.log({onboarding})

    const { data, setData, post, processing, errors } = useForm({
        step: step,
        name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('onboarding_step' + step, JSON.stringify(data));
        console.log("Submitting step:", step, "with data:", data);
        post(route('onboarding.step.submit', { _query: { step: step } }), {
            onSuccess: () => {
                // Handle success, e.g., redirect to the next step
                setStep((prevStep) => prevStep + 1);
            },
            onError: () => {
                // Handle error, e.g., show error messages
                console.error("Error submitting step:", errors);
            },
        });
    };

    return (
        <form>
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-xl">Navn</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="p-6 border"
                        />
                        <InputError message={errors.name} />
                    </div>
                </div>

                <Button type="submit" onClick={handleSubmit} disabled={processing} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer p-5 text-lg">
                    {processing ? "Indsender..." : "Fortsæt"}
                </Button>
            </div>
        </form>
    );
}

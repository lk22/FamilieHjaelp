import { useForm, usePage } from "@inertiajs/react";
import {useState} from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function OnboardingStepThreeForm() {
    const [step, setStep] = useState(3);
    const { onboarding } = usePage().props;
    console.log({onboarding})

    const { data, post, setData, processing, errors } = useForm<{
        step: number;
        checks: string[];
    }>({
        step: step,
        checks: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting step:", step, "with data:", data);
        localStorage.setItem('onboarding_step' + step, JSON.stringify(data));
        post(route('onboarding.step.submit', { _query: { step: step } }), {
            onSuccess: () => {
                setStep((prevStep) => prevStep + 1);
            },
            onError: () => {
                console.error("Error submitting step:", errors);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <div className="grid gap-6">
                    <div className="grid gap-4">
                        <div className="flex pb-4 flex-col justify-end align-center">
                            <div className="flex pb-4 flex-row-reverse justify-end">
                                <Label htmlFor="alone_status" className="text-xl">Jeg har en partner</Label>
                                <Checkbox id="is_not_alone" checked={data.checks.includes('is_not_alone')}
                                    onCheckedChange={(checked: boolean) => {
                                        setData('checks', checked ? [...data.checks, 'is_not_alone'] : data.checks.filter((check) => check !== 'is_not_alone'));
                                    }}
                                    className="mr-4"
                                />
                            </div>
                            <div className="flex pb-4 flex-row-reverse justify-end">
                                <Label htmlFor="alone_status" className="flex items-center text-xl">Er alene</Label>
                                <Checkbox id="alone_status" checked={data.checks.includes('is_alone')}
                                    onCheckedChange={(checked: boolean) => {
                                        setData('checks', checked ? [...data.checks, 'is_alone'] : data.checks.filter((check) => check !== 'is_alone'));
                                    }}
                                    className="mr-4"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Button type="submit" onClick={handleSubmit} disabled={processing} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                    {processing ? "Indsender..." : "Fortsæt"}
                </Button>
            </div>
        </form>
    );
}

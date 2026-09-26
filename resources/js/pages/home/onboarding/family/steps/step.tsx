import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type SharedData } from '@/types';

type Kid = {
    gender: 'male' | 'female' | 'other';
    name: string;
    ageYears: string;
    ageMonths: string;
};

interface SessionProps extends SharedData {
    currentStep: string;
    scenario: string;
    onboardingSession: {
        token: string | null;
        currentStep: string | null;
        stepsData: {
            one?: FamilyNameStepData;
            two?: ParentStepData;
            three?: KidsStepData;
        };
        formData: Record<string, unknown>;
        completed: boolean;
    };
}

type FamilyNameStepData = {
    familyName: string;
};

type ParentStepData = {
    name: string;
    age: string;
    familyTitle: string;
    hasPartner: boolean;
    partnerName: string;
    partnerAge: string;
    partnerFamilyTitle: string;
    partnerNeedsUser: boolean;
    partnerUserName: string;
    partnerUserEmail: string;
};

type KidsStepData = {
    kids: Kid[];
};

export default function FamilyOnboardingStep() {
    const { currentStep, onboardingSession } = usePage<SessionProps>().props;

    const one: FamilyNameStepData = {
        familyName: String(onboardingSession.stepsData.one?.familyName ?? ''),
    };
    const two: ParentStepData = {
        name: String(onboardingSession.stepsData.two?.name ?? ''),
        age: String(onboardingSession.stepsData.two?.age ?? ''),
        familyTitle: String(onboardingSession.stepsData.two?.familyTitle ?? ''),
        hasPartner: Boolean(onboardingSession.stepsData.two?.hasPartner ?? false),
        partnerName: String(onboardingSession.stepsData.two?.partnerName ?? ''),
        partnerAge: String(onboardingSession.stepsData.two?.partnerAge ?? ''),
        partnerFamilyTitle: String(onboardingSession.stepsData.two?.partnerFamilyTitle ?? ''),
        partnerNeedsUser: Boolean(onboardingSession.stepsData.two?.partnerNeedsUser ?? false),
        partnerUserName: String(onboardingSession.stepsData.two?.partnerUserName ?? ''),
        partnerUserEmail: String(onboardingSession.stepsData.two?.partnerUserEmail ?? ''),
    };
    const three: KidsStepData = onboardingSession.stepsData.three ?? { kids: [] };
    const stepNumberByName: Record<string, string> = {
        one: '1',
        two: '2',
        three: '3',
        complete: '4',
    };

    return (
        <main className="bg-[#004EA7] py-10 text-white">
            <Head title="Familie onboarding" />
            <div className="mx-auto w-full max-w-3xl px-6">
                <h1 className="text-3xl font-bold">Familie onboarding</h1>
                <p className="mt-2 text-lg">Trin {stepNumberByName[currentStep] ?? '1'} af 4</p>

                <div className="mt-8 rounded-lg bg-white p-6 text-black shadow">
                    {currentStep === 'one' ? <FamilyNameStep defaultFamilyName={String(one.familyName ?? '')} /> : null}
                    {currentStep === 'two' ? <ParentStep defaultData={two} /> : null}
                    {currentStep === 'three' ? <KidsStep defaultData={three} /> : null}
                    {currentStep === 'complete' ? (
                        <CompleteStep token={onboardingSession.token} familyName={one.familyName} parentData={two} kidsData={three} />
                    ) : null}
                </div>
            </div>
        </main>
    );
}

function FamilyNameStep({ defaultFamilyName }: { defaultFamilyName: string }) {
    const { data, setData, post, processing, errors } = useForm<{ data: { familyName: string } }>({
        data: {
            familyName: defaultFamilyName,
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(route('onboarding.scenario.step.submit', { scenario: 'family', step: 'one', nextStep: 'two' }));
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold">Indtast familienavn</h2>
            <div className="space-y-2">
                <Label htmlFor="familyName">Familienavn</Label>
                <Input id="familyName" value={data.data.familyName} onChange={(event) => setData('data', { familyName: event.target.value })} />
                {errors['data.familyName'] ? <p className="text-sm text-red-600">{errors['data.familyName']}</p> : null}
            </div>

            <Button disabled={processing} type="submit">
                Næste
            </Button>
        </form>
    );
}

function ParentStep({ defaultData }: { defaultData: ParentStepData }) {
    const { data, setData, post, processing, errors } = useForm<{ data: ParentStepData }>({
        data: {
            ...defaultData,
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(route('onboarding.scenario.step.submit', { scenario: 'family', step: 'two', nextStep: 'three' }));
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold">Hvem udfylder onboarding?</h2>

            <div className="grid gap-4 md:grid-cols-2">
                <Field label="Navn" inputId="name" error={errors['data.name']}>
                    <Input id="name" value={data.data.name} onChange={(event) => setData('data', { ...data.data, name: event.target.value })} />
                </Field>

                <Field label="Alder" inputId="age" error={errors['data.age']}>
                    <Input
                        id="age"
                        type="number"
                        value={data.data.age}
                        onChange={(event) => setData('data', { ...data.data, age: event.target.value })}
                    />
                </Field>

                <Field label="Familietitel" inputId="familyTitle" error={errors['data.familyTitle']}>
                    <Input
                        id="familyTitle"
                        value={data.data.familyTitle}
                        onChange={(event) => setData('data', { ...data.data, familyTitle: event.target.value })}
                        placeholder="Fx Mor, Far, Omsorgsfar"
                    />
                </Field>
            </div>

            <div className="space-y-2">
                <Label>Har du en partner?</Label>
                <div className="flex gap-4">
                    <Button
                        type="button"
                        variant={data.data.hasPartner ? 'default' : 'outline'}
                        onClick={() => setData('data', { ...data.data, hasPartner: true })}
                    >
                        Ja
                    </Button>
                    <Button
                        type="button"
                        variant={!data.data.hasPartner ? 'default' : 'outline'}
                        onClick={() =>
                            setData('data', {
                                ...data.data,
                                hasPartner: false,
                                partnerNeedsUser: false,
                                partnerName: '',
                                partnerAge: '',
                                partnerFamilyTitle: '',
                                partnerUserName: '',
                                partnerUserEmail: '',
                            })
                        }
                    >
                        Nej
                    </Button>
                </div>
                {errors['data.hasPartner'] ? <p className="text-sm text-red-600">{errors['data.hasPartner']}</p> : null}
            </div>

            {data.data.hasPartner ? (
                <div className="space-y-4 rounded border p-4">
                    <h3 className="text-lg font-semibold">Partner information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Partner navn" inputId="partnerName" error={errors['data.partnerName']}>
                            <Input
                                id="partnerName"
                                value={data.data.partnerName}
                                onChange={(event) => setData('data', { ...data.data, partnerName: event.target.value })}
                            />
                        </Field>

                        <Field label="Partner alder" inputId="partnerAge" error={errors['data.partnerAge']}>
                            <Input
                                id="partnerAge"
                                type="number"
                                value={data.data.partnerAge}
                                onChange={(event) => setData('data', { ...data.data, partnerAge: event.target.value })}
                            />
                        </Field>

                        <Field label="Partner familietitel" inputId="partnerFamilyTitle" error={errors['data.partnerFamilyTitle']}>
                            <Input
                                id="partnerFamilyTitle"
                                value={data.data.partnerFamilyTitle}
                                onChange={(event) => setData('data', { ...data.data, partnerFamilyTitle: event.target.value })}
                            />
                        </Field>
                    </div>

                    <div className="space-y-2">
                        <Label>Skal din partner have en bruger?</Label>
                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant={data.data.partnerNeedsUser ? 'default' : 'outline'}
                                onClick={() => setData('data', { ...data.data, partnerNeedsUser: true })}
                            >
                                Ja
                            </Button>
                            <Button
                                type="button"
                                variant={!data.data.partnerNeedsUser ? 'default' : 'outline'}
                                onClick={() => setData('data', { ...data.data, partnerNeedsUser: false, partnerUserName: '', partnerUserEmail: '' })}
                            >
                                Nej
                            </Button>
                        </div>
                    </div>

                    {data.data.partnerNeedsUser ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            <Field label="Partner bruger navn" inputId="partnerUserName" error={errors['data.partnerUserName']}>
                                <Input
                                    id="partnerUserName"
                                    value={data.data.partnerUserName}
                                    onChange={(event) => setData('data', { ...data.data, partnerUserName: event.target.value })}
                                />
                            </Field>

                            <Field label="Partner email" inputId="partnerUserEmail" error={errors['data.partnerUserEmail']}>
                                <Input
                                    id="partnerUserEmail"
                                    type="email"
                                    value={data.data.partnerUserEmail}
                                    onChange={(event) => setData('data', { ...data.data, partnerUserEmail: event.target.value })}
                                />
                            </Field>
                        </div>
                    ) : null}
                </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
                <Button asChild type="button" variant="outline">
                    <Link href={route('onboarding.scenario.step', { scenario: 'family', step: 'one' })}>Tilbage</Link>
                </Button>
                <Button disabled={processing} type="submit">
                    Næste
                </Button>
            </div>
        </form>
    );
}

function KidsStep({ defaultData }: { defaultData: KidsStepData }) {
    const normalizedKids = defaultData.kids.map((kid) => ({
        gender: kid.gender,
        name: kid.name,
        ageYears: String(kid.ageYears ?? ''),
        ageMonths: String(kid.ageMonths ?? ''),
    }));

    const defaultKids: Kid[] =
        normalizedKids.length > 0
            ? normalizedKids
            : [
                  {
                      gender: 'female',
                      name: '',
                      ageYears: '',
                      ageMonths: '',
                  },
              ];

    const { data, setData, post, processing, errors } = useForm<{ data: { kids: Kid[] } }>({
        data: {
            kids: defaultKids,
        },
    });
    const [kidKeys, setKidKeys] = useState<string[]>(() => defaultKids.map(() => crypto.randomUUID()));

    const updateKid = (index: number, kidData: Partial<Kid>) => {
        const updatedKids = [...data.data.kids];
        updatedKids[index] = { ...updatedKids[index], ...kidData };

        setData('data', {
            kids: updatedKids,
        });
    };

    const addKid = () => {
        setKidKeys((previousKeys) => [...previousKeys, crypto.randomUUID()]);
        setData('data', {
            kids: [
                ...data.data.kids,
                {
                    gender: 'female',
                    name: '',
                    ageYears: '',
                    ageMonths: '',
                },
            ],
        });
    };

    const removeKid = (index: number) => {
        if (data.data.kids.length === 1) {
            return;
        }

        setKidKeys((previousKeys) => previousKeys.filter((_, keyIndex) => keyIndex !== index));
        setData('data', {
            kids: data.data.kids.filter((_, kidIndex) => kidIndex !== index),
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(route('onboarding.scenario.step.submit', { scenario: 'family', step: 'three', nextStep: 'complete' }));
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold">Tilføj børn</h2>
            <p className="text-sm text-gray-600">Du kan tilføje et eller flere børn.</p>

            {data.data.kids.map((kid, index) => (
                <div className="space-y-3 rounded border p-4" key={kidKeys[index]}>
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Barn {index + 1}</h3>
                        <Button
                            aria-label={`Fjern barn ${index + 1}`}
                            disabled={data.data.kids.length === 1}
                            onClick={() => removeKid(index)}
                            type="button"
                            variant="outline"
                        >
                            Fjern
                        </Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Køn" inputId={`kid-${index}-gender`} error={errors[`data.kids.${index}.gender`]}>
                            <select
                                id={`kid-${index}-gender`}
                                className="h-10 rounded-md border border-input bg-white px-3 py-2 text-sm text-black"
                                value={kid.gender}
                                onChange={(event) => updateKid(index, { gender: event.target.value as Kid['gender'] })}
                            >
                                <option value="female">Pige</option>
                                <option value="male">Dreng</option>
                                <option value="other">Andet</option>
                            </select>
                        </Field>

                        <Field label="Navn" inputId={`kid-${index}-name`} error={errors[`data.kids.${index}.name`]}>
                            <Input id={`kid-${index}-name`} value={kid.name} onChange={(event) => updateKid(index, { name: event.target.value })} />
                        </Field>

                        <Field label="Alder (år)" inputId={`kid-${index}-ageYears`} error={errors[`data.kids.${index}.ageYears`]}>
                            <Input
                                id={`kid-${index}-ageYears`}
                                type="number"
                                value={kid.ageYears}
                                onChange={(event) => updateKid(index, { ageYears: event.target.value })}
                            />
                        </Field>

                        <Field label="Alder (måneder)" inputId={`kid-${index}-ageMonths`} error={errors[`data.kids.${index}.ageMonths`]}>
                            <Input
                                id={`kid-${index}-ageMonths`}
                                type="number"
                                value={kid.ageMonths}
                                onChange={(event) => updateKid(index, { ageMonths: event.target.value })}
                            />
                        </Field>
                    </div>
                </div>
            ))}

            {errors['data.kids'] ? <p className="text-sm text-red-600">{errors['data.kids']}</p> : null}

            <div className="flex flex-wrap gap-3">
                <Button onClick={addKid} type="button" variant="outline">
                    Tilføj barn
                </Button>

                <Button asChild type="button" variant="outline">
                    <Link href={route('onboarding.scenario.step', { scenario: 'family', step: 'two' })}>Tilbage</Link>
                </Button>

                <Button disabled={processing} type="submit">
                    Gennemse svar
                </Button>
            </div>
        </form>
    );
}

function CompleteStep({
    token,
    familyName,
    parentData,
    kidsData,
}: {
    token: string | null;
    familyName: string;
    parentData: ParentStepData;
    kidsData: KidsStepData;
}) {
    const kids = kidsData.kids;
    const { post, processing } = useForm<{ data: { session_token: string | null } }>({
        data: {
            session_token: token,
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('onboarding.completed'));
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold">Bekræft familien</h2>

            <div className="rounded border p-4">
                <p>
                    <strong>Familienavn:</strong> {familyName}
                </p>
                <p>
                    <strong>Onboarder:</strong> {String(parentData.name ?? '')} ({String(parentData.familyTitle ?? '')})
                </p>
                <p>
                    <strong>Partner:</strong> {parentData.hasPartner ? 'Ja' : 'Nej'}
                </p>
                {parentData.hasPartner ? (
                    <p>
                        <strong>Partner navn:</strong> {String(parentData.partnerName ?? '')}
                    </p>
                ) : null}
                <p>
                    <strong>Antal børn:</strong> {kids.length}
                </p>
            </div>

            <div className="space-y-2">
                {kids.map((kid, index) => (
                    <div className="rounded border p-3" key={index}>
                        <p>
                            <strong>{kid.name}</strong> ({kid.gender}) - {kid.ageYears} år og {kid.ageMonths} måneder
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-3">
                <Button asChild type="button" variant="outline">
                    <Link href={route('onboarding.scenario.step', { scenario: 'family', step: 'three' })}>Tilbage</Link>
                </Button>
                <Button disabled={processing || !token} type="submit">
                    Fuldfør onboarding
                </Button>
            </div>
            {!token ? <p className="text-sm text-red-600">Sessionen mangler. Start onboarding forfra for at fuldføre.</p> : null}
        </form>
    );
}

function Field({
    children,
    error,
    inputId,
    label,
}: {
    children: React.ReactNode;
    error?: string;
    inputId: string;
    label: string;
}) {
    return (
        <div className="space-y-2">
            <Label htmlFor={inputId}>{label}</Label>
            {children}
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>
    );
}

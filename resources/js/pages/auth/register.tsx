import { Head, useForm, usePage, router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

import { useQueryParams } from '@/lib/utils'; 

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;

    // additional fields to form data
    onboarding_completed?: boolean;
    redirect_to?: string;
};

type URLParams = {
    onboarding_completed?: boolean;
    redirect_to?: string;
}

export default function Register() {

    const { queryParams } = useQueryParams<URLParams>();

    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        onboarding_completed: false,
        redirect_to: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // set additional query params to form data if they exist 
        if ( queryParams.onboarding_completed !== undefined ) {
            setData('onboarding_completed', queryParams.onboarding_completed);
        }

        if ( queryParams.redirect_to ) {
            setData('redirect_to', queryParams.redirect_to);
        }

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Opret din konto" description="Udfyld formularen for at oprette en konto og begynd at bruge FamilieHjælp.">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <input type="hidden" name="onboarding_completed" value={queryParams.onboarding_completed ? 'true' : 'false'} />
                <input type="hidden" name="redirect_to" value={queryParams.redirect_to} />
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Fulde navn</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Fulde navn"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">E-mail adresse</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Adgangskode</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Adgangskode"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Bekræft adgangskode</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Bekræft adgangskode"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Opret konto
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    Har du allerede en konto?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}

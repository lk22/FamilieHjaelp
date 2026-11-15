import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth/auth-split-layout';

import { useQueryParams } from '@/lib/utils';

type URLParams = {
    onboarding_completed: boolean;
    redirect_to: string;
}

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;

    // query parameter types
    onboarding_completed?: number | boolean;
    redirect_to?: string;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { queryParams } = useQueryParams<URLParams>();
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
        onboarding_completed: 0,
        redirect_to: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log('Submitting login form with data:', data);
        if ( queryParams.onboarding_completed ) {
            data.onboarding_completed = queryParams.onboarding_completed ? 1 : 0;
        }

        if ( queryParams.redirect_to ) {
            data.redirect_to = queryParams.redirect_to;
        }

        post(route('login.store'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Log ind på din konto" description="Indtast din e-mail og adgangskode nedenfor for at logge ind">
            <Head title="Log ind" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label className="text-white" htmlFor="email">Email adresse</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                            className="text-blue-900 focus:ring-blue-500 focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-100"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label className="text-white" htmlFor="password">Adgangskode</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm text-white" tabIndex={5}>
                                    Glemt adgangskode?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                            className="text-blue-900 focus:ring-blue-500 focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-100"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label className="text-blue-900" htmlFor="remember">Husk mig</Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full bg-blue-700 hover:bg-blue-900" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Log ind
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    <span>Har du ikke en konto? </span>
                    <TextLink href={route('register')} className="text-blue-900 font-bold" tabIndex={5}>
                        Opret konto
                    </TextLink>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}

/**
 * This file defines the AuthRegisterDialog component, which is a dialog for user registration.
 * It uses the Dialog component to display a form for users to create an account.
 * The form includes fields for name, email, password, and password confirmation.
 * The component also handles form submission and displays validation errors if any.
 *
 * @component
 * @returns {JSX.Element} The AuthRegisterDialog component.
 */

// Dependency imports
import { useState, useMemo } from 'react';
import { Dialog } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from "react-i18next";

import {
  type RegisterFormDataProps,
  type LoginFormDataProps
} from '@/types';

// Component imports
import Logo from '@/components/WebLayout/Logo';

type AuthenticationStep = 'login' | 'register';

interface AuthRegisterDialogProps {
  handleRegisterSubmit: (e: React.FormEvent) => void;
  handleAuthenticationSubmit: (e: React.FormEvent) => void;
}

export default function AuthRegisterDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [ step, setStep ] = useState<AuthenticationStep>('login'); // 'login' or 'register'
  const { t } = useTranslation();

  const [, setIsSubmitting ] = useState(false);

  console.log('AuthRegisterDialog rendered with step:', step);

  const loginForm = useForm<LoginFormDataProps>({
    email: '',
    password: '',
  })

  const registerForm = useForm<RegisterFormDataProps>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  useMemo(() => setStep('login'), []);

  const handleRegisterSubmit: AuthRegisterDialogProps['handleRegisterSubmit'] = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    registerForm.post(route('register'), {
      onFinish: () => {
        setIsSubmitting(false);
        registerForm.reset('password', 'password_confirmation')
      }
    });
  };

  const handleAuthenticationSubmit: AuthRegisterDialogProps['handleAuthenticationSubmit'] = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    loginForm.post(route('login'), {
      onFinish: () => {
        setIsSubmitting(false);
        loginForm.reset('password');
      }
    });
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto animate animate-appear">
      <div className="flex items-center justify-center min-h-screen">
        <div id="overlay"
          className="fixed inset-0 bg-blue-200 opacity-50 transition-opacity cursor-default"
          onClick={onClose}
        >
        </div>
        <div className="bg-white rounded-lg p-8 z-20 w-full max-w-xl mx-auto relative">
          <img src="/images/web/logo_inverse.svg" alt="Familiehjælp Logo" className="w-auto h-12 mb-12 ml-0 relative -left-6" />
          <div className="absolute top-6 right-6 cursor-pointer" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <Dialog.Title className="text-2xl font-bold mb-4">
            {step === 'login' ? t('authModal.login') : t('authModal.register')}
          </Dialog.Title>
          {step === 'login' ? (
            <>
              <p className="text-sm text-gray-500 mb-4">{t('authModal.login_email')}</p>
              <form onSubmit={handleAuthenticationSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('authModal.login_email')}</label>
                  <input
                    type="email"
                    id="email"
                    value={loginForm.data.email}
                    onChange={(e) => loginForm.setData('email', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {loginForm.errors.email && <p className="text-red-500 text-sm mt-1">{loginForm.errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t('authModal.login_password')}</label>
                  <input
                    type="password"
                    id="password"
                    value={loginForm.data.password}
                    onChange={(e) => loginForm.setData('password', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {loginForm.errors.password && <p className="text-red-500 text-sm mt-1">{loginForm.errors.password}</p>}
                </div>
                <button
                  type="submit"
                  disabled={loginForm.processing}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loginForm.processing ? t('authModal.login') + '...' : t('authModal.login')}
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-12">
                {t('authModal.dont_have_account')}{' '}
                <button onClick={() => setStep('register')} className="text-indigo-600 hover:text-indigo-700 font-medium">
                  {t('authModal.register')}
                </button>
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">{t('authModal.register')}</p>
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('authModal.register_name')}</label>
                  <input
                    type="text"
                    id="name"
                    value={registerForm.data.name}
                    onChange={(e) => registerForm.setData('name', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {registerForm.errors.name && <p className="text-red-500 text-sm mt-1">{registerForm.errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('authModal.register_email')}</label>
                  <input
                    type="email"
                    id="email"
                    value={registerForm.data.email}
                    onChange={(e) => registerForm.setData('email', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {registerForm.errors.email && <p className="text-red-500 text-sm mt-1">{registerForm.errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t('authModal.register_password')}</label>
                  <input
                    type="password"
                    id="password"
                    value={registerForm.data.password}
                    onChange={(e) => registerForm.setData('password', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {registerForm.errors.password && <p className="text-red-500 text-sm mt-1">{registerForm.errors.password}</p>}
                </div>
                <div>
                  <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">{t('authModal.register_password_confirmation')}</label>
                  <input
                    type="password"
                    id="password_confirmation"
                    value={registerForm.data.password_confirmation}
                    onChange={(e) => registerForm.setData('password_confirmation', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {registerForm.errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{registerForm.errors.password_confirmation}</p>}
                </div>
                <button
                  type="submit"
                  disabled={registerForm.processing}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {registerForm.processing ? t('authModal.register') + '...' : t('authModal.register')}
                </button>
                <p>
                  {t('authModal.already_have_account')}{' '}
                  <button onClick={() => setStep('login')} className="text-indigo-600 hover:text-indigo-700 font-medium">
                    {t('authModal.login')}
                  </button>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
}
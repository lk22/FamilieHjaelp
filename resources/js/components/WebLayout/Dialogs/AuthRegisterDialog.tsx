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
import { useState, useEffect } from 'react';
import { Dialog, DialogTitle } from '@headlessui/react';
import { useForm, router } from '@inertiajs/react';
import { useTranslation } from "react-i18next";

import {
  type RegisterFormDataProps,
  type LoginFormDataProps,
  type AuthenticationStep
} from '@/types';

import AuthForm from '@/components/WebLayout/Forms/AuthForm';
import RegistrationForm from '@/components/WebLayout/Forms/RegistrationForm';

interface AuthRegisterDialogProps {
  handleRegisterSubmit: (e: React.FormEvent) => void;
  handleAuthenticationSubmit: (e: React.FormEvent) => void;
}

type AuthRegisterDialogComponentProps = {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthRegisterDialog({
  isOpen,
  onClose
}: AuthRegisterDialogComponentProps) {
  const [ step, setStep ] = useState<AuthenticationStep>('login');
  const { t } = useTranslation();
  const [, setIsSubmitting ] = useState(false);

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

  useEffect(()=> {
    if (!isOpen) {
      setStep('login');
      loginForm.reset();
      registerForm.reset();
    }
  }, [isOpen, loginForm, registerForm])

  const handleRegistrationSubmit: AuthRegisterDialogProps['handleRegisterSubmit'] = (e: React.FormEvent) => {
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
    loginForm.post(route('login.store'), {
      onFinish: () => {
        setIsSubmitting(false);
        loginForm.reset('password');
      }
    });
  }

  const handleModalStep = () => {
    if (step === 'login' ) {
      return <AuthForm handleAuthenticationSubmit={handleAuthenticationSubmit} authenticationForm={loginForm} setStep={setStep} />
    } else if ( step === 'register' ) {
      return <RegistrationForm handleRegistrationSubmit={handleRegistrationSubmit} registrationForm={registerForm} setStep={setStep} />
    } else if ( step === 'forgot-password') {
      router.visit(route('app.forgot-password'));
    }
  }

  const handleModalTitle = () => {
    if ( step === 'login' ) {
      return t('authModal.login');
    } else if (step === 'register') {
      return t('authModal.register');
    } else if (step === 'forgot-password') {
      return t('authModal.forgot_password');
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto animate animate-appear w-full">
      <div className="flex items-center justify-center min-h-screen">
        <div id="overlay"
          className="fixed inset-0 bg-blue-200 opacity-50 transition-opacity cursor-default"
          onClick={onClose}
        >
        </div>
        <div className="bg-white rounded-lg p-8 z-20 w-full max-w-6xl mx-auto relative">
          <img src="/images/web/logo_inverse.svg" alt="Familiehjælp Logo" className="w-auto h-12 mb-12 ml-0 relative -left-6" />
          <div className="absolute top-6 right-6 cursor-pointer" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <DialogTitle className="text-2xl font-bold mb-4">
            {handleModalTitle()}
          </DialogTitle>
          {handleModalStep()}
        </div>
      </div>
    </Dialog>
  );
}
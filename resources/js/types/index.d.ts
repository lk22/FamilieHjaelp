import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
    isOnboarded: boolean;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    locale: string;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

/**
 * interface for Todo items
 */
export interface TodoItem {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    due_date?: string;
}

export type PayloadProps = Record<string, unknown>;

export type AuthenticationStep = 'login' | 'register' | 'forgot-password';

export type RegisterFormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export type LoginFormDataProps = {
    email: string;
    password: string;
}

export interface AccordionItemData {
  title: string;
  body: string | React.ReactNode | React.ReactNode[];
}

export type LocalizedRoute = (route: string, params?: Record<string, any>) => string;
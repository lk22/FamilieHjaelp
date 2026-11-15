import { type LocalizedRoute } from '@/types';

export function localizeRoute(locale: string): LocalizedRoute {
    return (name, params = {}) => route(name, { ...params, locale });
}
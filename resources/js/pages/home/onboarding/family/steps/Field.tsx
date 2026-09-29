import { Label } from '@/components/ui/label';
import React from 'react';

interface FieldProps {
  children: React.ReactNode;
  error?: string;
  inputId: string;
  label: string;
}

export default function Field({ children, error, inputId, label }: FieldProps) {
  return (
    <div className="space-y-2">
        <Label htmlFor={inputId}>{label}</Label>
        {children}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

'use client';

import React, { useState, FormEvent } from 'react';
import { useAppConfig } from '@/hooks/useAppConfig';
import { DynamicField } from '@/components/shared/DynamicField';

interface DynamicEntityFormProps {
  initialData?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  submitLabel?: string;
}

export const DynamicEntityForm: React.FC<DynamicEntityFormProps> = ({
  initialData = {},
  onSubmit,
  submitLabel,
}) => {
  const { fields, getTerminology } = useAppConfig();
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFieldChange = (name: string, value: any) => {
    // Basic file URL mock extraction for the template behavior
    if (value instanceof File) {
      const fileUrl = URL.createObjectURL(value);
      setFormData((prev) => ({ ...prev, [name]: fileUrl }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit(formData);
    } catch (err: any) {
      setError(err.message || 'Failed to submit the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Create {getTerminology(1)}
        </h2>
        <p className="text-sm text-gray-500">
          Fill out the details below to publish your new {getTerminology(1).toLowerCase()}.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
        {fields.map((field) => {
          const colSpan = (field.type === 'textarea' || field.type === 'file' || field.name === 'title') 
            ? 'sm:col-span-2' 
            : 'sm:col-span-1';

          return (
            <div key={field.name} className={colSpan}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              
              {/* Using the new Shared Component! */}
              <DynamicField 
                field={field} 
                value={formData[field.name]} 
                onChange={handleFieldChange} 
              />
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-5 border-t border-gray-200 dark:border-gray-800 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed sm:w-auto"
        >
          {isSubmitting ? 'Saving...' : (submitLabel || `Save ${getTerminology(1)}`)}
        </button>
      </div>
    </form>
  );
};

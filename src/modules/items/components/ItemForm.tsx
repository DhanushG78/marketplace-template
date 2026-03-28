"use client";

import { useState, FormEvent } from "react";
import { appConfig } from "@/config/appConfig";
import { DynamicField } from "@/components/shared/DynamicField";
import { createItem, updateItem } from "@/services/itemService"; 

type Props = {
  initialData?: Record<string, any>;
  onSuccess?: () => void;
};

export const ItemForm = ({ initialData = {}, onSuccess }: Props) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleChange = (name: string, value: any) => {
    // If it's a file, mock a URL object for immediate display capability natively
    if (value instanceof File) {
      const fileUrl = URL.createObjectURL(value);
      setFormData((prev: any) => ({
        ...prev,
        [name]: fileUrl,
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Basic Required Field Validation
      for (const field of appConfig.fields) {
        if (!formData[field.name] || formData[field.name] === "") {
          throw new Error(`Please provide a value for ${field.label}.`);
        }
      }

      // Execute actual POST/PUT request via Axios
      if (formData.id) {
        await updateItem(formData);
      } else {
        await createItem(formData);
        setFormData({}); // Need to clear form if creating new item
      }
      
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || "Something went wrong while saving the item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl space-y-5 bg-white dark:bg-gray-900 shadow-sm">
      <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 pb-3">
        {formData.id ? "Edit" : "Add"} {appConfig.entity.name}
      </h2>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/10 dark:text-red-400 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {appConfig.fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {field.label}
            </label>
            <DynamicField
              field={field}
              value={formData[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 disabled:bg-blue-400 text-white font-medium px-4 py-3 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {loading ? "Saving..." : (formData.id ? `Update ${appConfig.entity.name}` : `Create ${appConfig.entity.name}`)}
      </button>
    </form>
  );
};

'use client';

import React, { useState } from 'react';
import { useItems } from '../hooks/useItems';
import { ItemCard } from './ItemCard';
import { ItemFilters } from '../types';
import { useAppConfig } from '@/hooks/useAppConfig';

interface ItemListProps {
  initialFilters?: ItemFilters;
  title?: string;
  showFilters?: boolean;
}

/**
 * A generic grid list for fetching and displaying items.
 * Can be reused on Home Pages, Search Pages, or User Profiles.
 */
export const ItemList: React.FC<ItemListProps> = ({ 
  initialFilters = {}, 
  title, 
  showFilters = false 
}) => {
  const { items, loading, error, refetch } = useItems(initialFilters);
  const { getTerminology } = useAppConfig();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch({ ...initialFilters, searchTerm });
  };

  return (
    <div className="w-full">
      {/* Title & Optional Search Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {title || `Browse ${getTerminology(2)}`}
        </h2>

        {/* Basic Search Filter block */}
        {showFilters && (
          <form onSubmit={handleSearch} className="flex max-w-sm w-full gap-2">
            <input
              type="text"
              placeholder={`Search ${getTerminology(2).toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
            <button 
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search
            </button>
          </form>
        )}
      </div>

      {loading && (
        <div className="flex min-h-[200px] w-full items-center justify-center">
          <p className="text-gray-500 animate-pulse">Loading {getTerminology(2)}...</p>
        </div>
      )}

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 min-h-[200px] flex items-center justify-center dark:bg-red-900/10 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400 font-medium text-center">
            {error.message || 'Error occurred while fetching items.'}
          </p>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="flex flex-col min-h-[300px] w-full items-center justify-center rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
          <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">No {getTerminology(2)} found</h3>
          <p className="mt-1 text-sm text-gray-500">
            We couldn't find any listings matching your criteria. Try adjusting your filters.
          </p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

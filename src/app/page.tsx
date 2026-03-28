"use client";

import { useItems, ItemCard, ItemForm } from "@/modules/items";
import { useAppConfig } from "@/hooks/useAppConfig";
import { useState } from "react";
import { useStore } from "@/store/useStore";

export default function Home() {
  const { items, loading, fetchItems } = useItems();
  const { appName, getTerminology } = useAppConfig();
  const [editingItem, setEditingItem] = useState<any>(null);
  const user = useStore((state) => state.user);
  
  // Real-time Filtering State
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");

  // Filter Items Array 
  const filteredItems = items.filter((item: any) => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = minPrice === "" ? true : Number(item.price || 0) >= Number(minPrice);
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="border-b border-gray-200 dark:border-gray-800 pb-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            {appName}
          </h1>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
            Easily manage your {getTerminology(2).toLowerCase()}
          </p>
        </header>

        {/* The Config-Driven Submission Form (Admin Only) */}
        {user?.role === "admin" && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{editingItem ? 'Editing Item' : 'Create Item'}</h2>
              {editingItem && (
                <button 
                  onClick={() => setEditingItem(null)} 
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>
            <ItemForm 
              key={editingItem ? editingItem.id : "new-post"} 
              initialData={editingItem || {}} 
              onSuccess={() => {
                setEditingItem(null);
                fetchItems();
              }} 
            />
          </section>
        )}

        {/* The Dynamic Config-Driven Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Browse {getTerminology(2)} 
            </h2>
            <span className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm py-1 px-3 rounded-full font-medium">
              {filteredItems.length} listed
            </span>
          </div>

          {/* Filtering Controller Bar */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">Search Title</label>
              <input
                type="text"
                placeholder={`Search ${getTerminology(2).toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="sm:w-48">
              <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">Min Price</label>
              <input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>
          
          {loading ? (
             <div className="py-12 flex justify-center w-full min-h-[200px] border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
               <p className="text-gray-500 animate-pulse my-auto text-lg">Loading {getTerminology(2).toLowerCase()}...</p>
             </div>
          ) : filteredItems.length === 0 ? (
             <div className="py-12 flex justify-center w-full min-h-[200px] border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
               <p className="text-gray-500 my-auto text-lg">No {getTerminology(2).toLowerCase()} match your criteria.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item: any) => (
                <ItemCard 
                  key={item.id} 
                  item={item} 
                  onEdit={user?.role === 'admin' ? (i) => setEditingItem(i) : undefined}
                  onDelete={user?.role === 'admin' ? fetchItems : undefined}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
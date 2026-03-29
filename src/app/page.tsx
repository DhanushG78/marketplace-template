"use client";

import { useItems, ItemForm } from "@/modules/items";
import { ItemCard } from "@/components/ui/ItemCard";
import { Hero } from "@/components/sections/Hero";
import { useAppConfig } from "@/hooks/useAppConfig";
import { useState } from "react";
import { useStore } from "@/store/useStore";

export default function Home() {
  const { items, loading, fetchItems } = useItems();
  const { getTerminology } = useAppConfig();
  const [editingItem, setEditingItem] = useState<any>(null);
  const user = useStore((state) => state.user);
  
  // Real-time Filtering State
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [category, setCategory] = useState<string>("All Categories");

  // Filter Items Array 
  const filteredItems = items.filter((item: any) => {
    const itemTitle = item.title || item.name || item.brand || "";
    const matchesSearch = itemTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = minPrice === "" ? true : Number(item.price || 0) >= Number(minPrice);
    // Adjust logic if category exists on your items
    const matchesCategory = category === "All Categories" ? true : item.category === category || true; // Placeholder since mock data might not have category
    return matchesSearch && matchesPrice && matchesCategory;
  });

  const categories = ['All Categories', 'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Motors', 'Collectibles', 'Deals'];

  return (
    <>
      <Hero />
      
      <div id="browse" className="min-h-screen bg-gray-50/50 dark:bg-gray-950 p-6 md:p-12">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Admin Form */}
          {user?.role === "admin" && (
            <section className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{editingItem ? 'Editing Listing' : 'Create New Listing'}</h2>
                {editingItem && (
                  <button 
                    onClick={() => setEditingItem(null)} 
                    className="text-sm font-semibold text-blue-600 hover:text-blue-500 hover:underline px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full"
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

          {/* Browse Section */}
          <section className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar / Filters Panel */}
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm sticky top-24">
                <h3 className="font-bold text-xl mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                  Filters
                </h3>
                
                <div className="space-y-8">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Search</label>
                    <input
                      type="text"
                      placeholder="Search items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 transition-all shadow-inner"
                    />
                  </div>

                  {/* Price Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Min Price (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 transition-all shadow-inner"
                    />
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Category</label>
                    <div className="space-y-3">
                       {categories.map((cat) => (
                         <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                           <div className="relative flex items-center justify-center">
                             <input 
                                type="radio" 
                                name="category" 
                                value={cat} 
                                checked={category === cat}
                                onChange={() => setCategory(cat)}
                                className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-blue-600 dark:border-gray-600 dark:checked:border-blue-500 transition-colors cursor-pointer"
                             />
                             <div className="absolute w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-500 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
                           </div>
                           <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200 transition-colors">
                            {cat}
                           </span>
                         </label>
                       ))}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => { setSearchTerm(""); setMinPrice(""); setCategory("All Categories"); }}
                  className="mt-8 w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-colors text-sm"
                >
                  Clear Filters
                </button>
              </div>
            </aside>

            {/* Grid Layout */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 gap-4">
                <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100">
                  Trending {getTerminology(2)} 
                </h2>
                <span className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm py-1.5 px-4 rounded-full font-bold border border-gray-200 dark:border-gray-700 shadow-sm">
                  {filteredItems.length} items
                </span>
              </div>
              
              {loading ? (
                 <div className="py-24 flex flex-col items-center justify-center w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm">
                   <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                   <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">Loading {getTerminology(2).toLowerCase()}...</p>
                 </div>
              ) : filteredItems.length === 0 ? (
                 <div className="py-24 flex flex-col items-center justify-center w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm text-center px-4">
                   <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                     <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No items found</h3>
                   <p className="text-gray-500 dark:text-gray-400 font-medium max-w-sm mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
                   <button 
                     onClick={() => { setSearchTerm(""); setMinPrice(""); setCategory("All Categories"); }}
                     className="mt-6 text-blue-600 hover:text-blue-700 font-semibold"
                   >
                     Clear all filters
                   </button>
                 </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
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
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
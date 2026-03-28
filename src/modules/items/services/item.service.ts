import { BaseItem, ItemFilters } from '../types';

/**
 * A generic CRUD service for the marketplace entity.
 * In a real application, this would use fetch, axios, or a Firebase SDK.
 * For now, this mimics network requests with Promises and localStorage or in-memory array.
 */

// Mock storage
let mockItems: BaseItem[] = [
  {
    id: '1',
    sellerId: 'user-1',
    createdAt: new Date().toISOString(),
    title: 'Example Listing 1',
    description: 'This is a mocked item. It shows how the UI will look.',
    price: 99.99,
    condition: 'New', // Dynamic field
    images: ['https://via.placeholder.com/600x400?text=Image+1'],
  },
  {
    id: '2',
    sellerId: 'user-2',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    title: 'Example Listing 2',
    description: 'Another mocked item to demonstrate grids.',
    price: 150.00,
    condition: 'Used - Good', // Dynamic field
    images: ['https://via.placeholder.com/600x400?text=Image+2'],
  }
];

export const itemService = {
  /**
   * Fetch all items, optionally filtered
   */
  async getItems(filters?: ItemFilters): Promise<BaseItem[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    let results = [...mockItems];
    
    if (filters?.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      results = results.filter((item) => 
        item.title.toLowerCase().includes(term) || 
        item.description.toLowerCase().includes(term)
      );
    }
    
    // Add logic for dynamic attributes or price filters as needed...

    return results;
  },

  /**
   * Fetch a single item by ID
   */
  async getItemById(id: string): Promise<BaseItem | null> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockItems.find((item) => item.id === id) || null;
  },

  /**
   * Create a new item listing
   */
  async createItem(itemData: Omit<BaseItem, 'id' | 'createdAt'>): Promise<BaseItem> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newItem: BaseItem = {
      ...itemData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    mockItems.push(newItem);
    return newItem;
  },

  /**
   * Update an existing item
   */
  async updateItem(id: string, updates: Partial<BaseItem>): Promise<BaseItem> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const index = mockItems.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Item not found');
    
    const updated = { ...mockItems[index], ...updates };
    mockItems[index] = updated;
    return updated;
  },

  /**
   * Delete an item
   */
  async deleteItem(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    mockItems = mockItems.filter((item) => item.id !== id);
  }
};

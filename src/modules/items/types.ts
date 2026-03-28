export interface BaseItem {
  id: string;
  sellerId: string;
  createdAt: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  // Catch-all for any dynamic attributes defined in appConfig.entityFields
  // e.g., mileage (Cars), bedrooms (Real Estate), brand (Products)
  [key: string]: any; 
}

// Filters that could be passed to the service/hook
export interface ItemFilters {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  sellerId?: string;
  attributes?: Record<string, string | number | boolean>;
}

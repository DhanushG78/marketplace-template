import { BaseItem } from '@/modules/items';

// In-memory data store for the template.
// Warning: This data will reset whenever the Next.js development server restarts. 
// In production on serverless, this array is ephemeral and will lose data frequently.
// Hook this up to a real database (Postgres, Firebase, MongoDB) for production use.
export let itemsDb: BaseItem[] = [
  {
    id: '1',
    sellerId: 'system-user',
    createdAt: new Date().toISOString(),
    title: 'Vintage Leather Jacket',
    description: 'A beautiful, lightly used leather jacket.',
    price: 150.00,
    condition: 'Used - Good', 
    images: ['https://via.placeholder.com/600x400?text=Jacket'],
  },
  {
    id: '2',
    sellerId: 'system-user',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    title: 'Sony Alpha Camera',
    description: 'Mirrorless camera body in excellent condition.',
    price: 999.99,
    condition: 'Like New', 
    images: ['https://via.placeholder.com/600x400?text=Camera'],
  }
];

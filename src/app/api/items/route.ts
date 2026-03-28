import { NextResponse } from 'next/server';
import { itemsDb } from '@/lib/memoryDb';
import { BaseItem } from '@/modules/items';

/**
 * GET /api/items
 * Fetch all items, or supply a '?search=' query param to filter results.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase();

  let results = [...itemsDb];

  // Apply optional filtering logic based on the search term
  if (search) {
    results = results.filter((item) =>
      item.title.toLowerCase().includes(search) ||
      (item.description && item.description.toLowerCase().includes(search))
    );
  }

  // Sort by newest first
  results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json(results);
}

/**
 * POST /api/items
 * Create a new item listing.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newItem = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    itemsDb.push(newItem);

    return Response.json(newItem, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: 'Failed to create dynamic item.' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const body = await req.json();

  // Find and update item to comply with ESM immutability constraints
  const index = itemsDb.findIndex((item) => item.id === body.id);
  if (index !== -1) {
    itemsDb[index] = { ...itemsDb[index], ...body };
  }

  return Response.json({ success: true, item: itemsDb[index] });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  // Find and remove item
  const index = itemsDb.findIndex((item) => item.id === id);
  if (index !== -1) {
    itemsDb.splice(index, 1);
  }

  return Response.json({ success: true });
}

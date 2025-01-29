import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { category } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const categories = await db.select().from(category).orderBy(desc(category.createdAt)).execute();

    return NextResponse.json({
      data: {
        categories: categories,
      },
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      data: {
        categories: [],
      },
      success: false,
      error: `Failed to fetch categories: ${error}`,
    });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    const newCategory = await db.insert(category).values({ name }).execute();

    return NextResponse.json({
      data: {
        category: newCategory,
      },
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      data: {
        category: null,
      },
      success: false,
      error: `Failed to create category: ${error}`,
    });
  }
}

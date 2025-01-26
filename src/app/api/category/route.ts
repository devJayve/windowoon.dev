import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { Category } from '@/features/write/types';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const categories: Partial<Category>[] = await sql`
        SELECT *
        FROM categories
        ORDER BY create_at DESC
    `;

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

    if (!name) {
      return NextResponse.json({
        data: {
          category: null,
        },
        success: false,
        error: 'Category name is required',
      });
    }

    const [newCategory] =
      await sql`INSERT INTO categories (id, name) VALUES (gen_random_uuid(), ${name}) RETURNING *`;

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

import { NextResponse } from 'next/server';
import { getLeadStats } from '@/lib/repository';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const stats = await getLeadStats();
    return NextResponse.json({ success: true, stats });
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

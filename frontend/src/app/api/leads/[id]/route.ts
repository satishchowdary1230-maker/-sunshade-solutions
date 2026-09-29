import { NextRequest, NextResponse } from 'next/server';
import { updateLeadStatus, deleteLead } from '@/lib/repository';
import { broadcastLeadUpdated, broadcastLeadDeleted } from '@/lib/events';
import { LeadStatus } from '@/models/Lead';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, note } = body;

    const validStatuses: LeadStatus[] = ['New', 'Contacted', 'Site Visit Scheduled', 'Closed'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid lead status' },
        { status: 400 }
      );
    }

    const updated = await updateLeadStatus(id, status, note);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    broadcastLeadUpdated(updated);

    return NextResponse.json({ success: true, lead: updated });
  } catch (error: any) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update lead' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteLead(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    broadcastLeadDeleted(id);

    return NextResponse.json({
      success: true,
      message: 'Lead deleted successfully',
      id,
    });
  } catch (error: any) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete lead' },
      { status: 500 }
    );
  }
}

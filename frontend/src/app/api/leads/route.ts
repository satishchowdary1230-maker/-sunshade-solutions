import { NextRequest, NextResponse } from 'next/server';
import { createLead, getLeads } from '@/lib/repository';
import { broadcastLeadCreated } from '@/lib/events';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;

    const leads = await getLeads(status, search);
    return NextResponse.json({ success: true, count: leads.length, leads });
  } catch (error: any) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      city,
      structureType,
      fabricMaterial,
      estimatedArea,
      projectBudgetBracket,
      siteVisitRequested,
      addressOrSiteLocation,
      message,
    } = body;

    // Field validations
    if (!fullName || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: 'Full name is required' },
        { status: 400 }
      );
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required' },
        { status: 400 }
      );
    }

    if (!phone || phone.trim().length < 8) {
      return NextResponse.json(
        { success: false, error: 'A valid phone number is required' },
        { status: 400 }
      );
    }

    if (!structureType) {
      return NextResponse.json(
        { success: false, error: 'Structure type must be selected' },
        { status: 400 }
      );
    }

    if (!fabricMaterial) {
      return NextResponse.json(
        { success: false, error: 'Fabric/Material grade must be selected' },
        { status: 400 }
      );
    }

    if (!estimatedArea || Number(estimatedArea) <= 0) {
      return NextResponse.json(
        { success: false, error: 'A valid estimated area in Sq. Ft. is required' },
        { status: 400 }
      );
    }

    const lead = await createLead({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      city: city?.trim() || 'Hyderabad',
      structureType,
      fabricMaterial,
      estimatedArea: Number(estimatedArea),
      projectBudgetBracket: projectBudgetBracket || 'Under Assessment',
      siteVisitRequested: siteVisitRequested !== false,
      addressOrSiteLocation: addressOrSiteLocation?.trim() || '',
      message: message?.trim() || '',
    });

    // Real-Time Event Publisher: notify all connected admin dashboards instantly!
    broadcastLeadCreated(lead);

    return NextResponse.json(
      {
        success: true,
        message: 'Your quote request and site visit requirement has been registered.',
        lead,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit quote request' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { updateInquiry, deleteInquiry } from '@/lib/db';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { status } = body;

    const inquiry = updateInquiry(id, { status });

    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json(inquiry);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const success = deleteInquiry(id);

  if (!success) {
    return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getInquiries } from '@/lib/db';

export async function GET() {
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const inquiries = getInquiries();
  return NextResponse.json(inquiries);
}

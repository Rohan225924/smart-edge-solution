import { NextRequest, NextResponse } from 'next/server';
import { getTeamMembers, createTeamMember } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const members = getTeamMembers();
  return NextResponse.json(members);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const body = await request.json();
  const member = createTeamMember(body);
  return NextResponse.json(member, { status: 201 });
}
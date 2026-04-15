import { NextRequest, NextResponse } from 'next/server';
import { getCompanyInfo, updateCompanyInfo } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const info = getCompanyInfo();
  return NextResponse.json(info);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { key, value } = await request.json();
  const info = updateCompanyInfo(key, value);
  return NextResponse.json(info, { status: 201 });
}
import { NextRequest, NextResponse } from 'next/server';
import { getTestimonials, createTestimonial } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const testimonials = getTestimonials();
  return NextResponse.json(testimonials);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const body = await request.json();
  const testimonial = createTestimonial(body);
  return NextResponse.json(testimonial, { status: 201 });
}
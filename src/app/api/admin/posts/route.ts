import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getPosts, createPost } from '@/lib/db';

export async function GET() {
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const posts = getPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (session.user.role === 'viewer') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { title, slug, excerpt, content, status, authorId, authorName } = body;

    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const post = createPost({
      title,
      slug,
      excerpt,
      content,
      status: status || 'draft',
      authorId,
      authorName,
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

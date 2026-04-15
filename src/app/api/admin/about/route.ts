import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const ABOUT_FILE = path.join(process.cwd(), "data", "about.json");

async function ensureDataDir() {
  const dir = path.join(process.cwd(), "data");
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

export async function GET() {
  try {
    const file = await import("fs/promises");
    const data = await file.readFile(ABOUT_FILE, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({});
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureDataDir();
    const body = await request.json();
    const { content, images } = body;

    const data = {
      ...content,
      images,
      updatedAt: new Date().toISOString(),
    };

    await writeFile(ABOUT_FILE, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving about content:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
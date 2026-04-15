import { NextRequest, NextResponse } from "next/server";
import { getPricingPlans, createPricingPlan } from "@/lib/db";

export async function GET() {
  try {
    const plans = getPricingPlans();
    return NextResponse.json(plans);
  } catch {
    return NextResponse.json({ error: "Failed to fetch pricing plans" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const plan = createPricingPlan(body);
    return NextResponse.json(plan);
  } catch {
    return NextResponse.json({ error: "Failed to create pricing plan" }, { status: 500 });
  }
}
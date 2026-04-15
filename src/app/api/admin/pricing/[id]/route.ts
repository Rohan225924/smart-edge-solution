import { NextRequest, NextResponse } from "next/server";
import { getPricingPlanById, updatePricingPlan, deletePricingPlan } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const plan = getPricingPlanById(id);
    if (!plan) {
      return NextResponse.json({ error: "Pricing plan not found" }, { status: 404 });
    }
    return NextResponse.json(plan);
  } catch {
    return NextResponse.json({ error: "Failed to fetch pricing plan" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const plan = updatePricingPlan(id, body);
    if (!plan) {
      return NextResponse.json({ error: "Pricing plan not found" }, { status: 404 });
    }
    return NextResponse.json(plan);
  } catch {
    return NextResponse.json({ error: "Failed to update pricing plan" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = deletePricingPlan(id);
    if (!deleted) {
      return NextResponse.json({ error: "Pricing plan not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete pricing plan" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { fetchMeals } from "../../../lib/meals.js";

export async function GET() {
  const data = await fetchMeals();

  if (!data) {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const savedMeal = await prisma.meals.create({
      data: body,
    });
    return NextResponse.json({ meal: savedMeal }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

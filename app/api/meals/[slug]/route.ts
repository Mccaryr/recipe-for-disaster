import { NextRequest, NextResponse } from "next/server";
import { fetchMeals } from "@/lib/meals";

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  const slug = url.pathname.split("/").pop();
  try {
    const meals = await fetchMeals(slug);
    return NextResponse.json(meals.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { deleteMeal, fetchMeals, saveMeal, updateMeal } from "@/lib/meals";
import { MealType } from "@/types/mealType";

export async function GET(req: { query?: string }, res: NextResponse) {
  const meals = await fetchMeals(req.query);
  if (!meals) {
    return NextResponse.json([], { status: 500 });
  }
  return NextResponse.json(meals.data, { status: 200 });
}

export async function POST(req: { body: MealType }) {
  try {
    const savedMeal = await saveMeal(req.body);
    return NextResponse.json({ meal: savedMeal }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: { body: MealType; query: string }) {
  try {
    const updatedMeal = await updateMeal(req.body, req.query);
    return NextResponse.json({ meal: updatedMeal }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: { query: string }) {
  try {
    const deletedMeal = await deleteMeal(req.query);
    return NextResponse.json({ meal: deletedMeal }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

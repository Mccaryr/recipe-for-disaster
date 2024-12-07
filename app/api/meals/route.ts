import { NextRequest, NextResponse } from "next/server";
import { deleteMeal, fetchMeals, saveMeal, updateMeal } from "@/lib/meals";
import { MealType } from "@/types/mealType";

export async function GET() {
  try {
    const meals = await fetchMeals();
    return NextResponse.json(meals.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.formData();

  try {
    const savedMeal = await saveMeal(data);
    return NextResponse.json({ meal: savedMeal }, { status: 201 });
  } catch (error: any) {
    console.log(error);
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

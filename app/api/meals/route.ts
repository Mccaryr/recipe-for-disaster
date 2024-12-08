import { NextRequest, NextResponse } from "next/server";
import { deleteMeal, fetchMeals, saveMeal, updateMeal } from "@/lib/meals";

export async function GET() {
  try {
    const meals = await fetchMeals();
    return NextResponse.json(meals.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.formData();

  try {
    const savedMeal = await saveMeal(data);
    return NextResponse.json({ meal: savedMeal }, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updatedMeal = await updateMeal(req.body);
    return NextResponse.json({ meal: updatedMeal }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.body;
    const deletedMeal = await deleteMeal(req.body);
    return NextResponse.json({ meal: deletedMeal }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

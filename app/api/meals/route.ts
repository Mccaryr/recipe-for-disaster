import { NextRequest, NextResponse } from "next/server";
import { deleteMeal, fetchMeals, saveMeal, updateMeal } from "@/lib/meals";

export async function GET() {
  try {
    console.log("Fetching meals..");
    const meals = await fetchMeals();
    console.log("Meals fetched:", meals);
    const response = NextResponse.json(meals.data, { status: 200 });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  } catch (error) {
    console.error("Error fetching meals:", error);
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

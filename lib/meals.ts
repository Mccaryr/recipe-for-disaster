import slugify from "slugify";
import xss from "xss";
import { uploadImage } from "@/lib/ImageActions/imageUpload";
import { supabase } from "./supabase.js";
import { MealType } from "@/types/mealType";

export async function fetchMeals(slug?: string) {
  try {
    if (slug) {
      return await supabase.from("meals").select("*").eq("slug", slug).single();
    } else {
      return await supabase.from("meals").select("*");
    }
  } catch (error) {
    console.error("Error fetching meals:", error);
    throw error;
  }
}

export async function saveMeal(meal: any) {
  const file = meal.get("image");
  const url = await uploadImage(file);

  meal.slug = slugify(meal.get("title"), { lower: true });
  meal.instructions = xss(meal.get("instructions"));

  try {
    const savedMeal = {
      title: meal.get("title"),
      instructions: meal.instructions,
      summary: meal.get("summary"),
      creator: meal.get("name"),
      creator_email: meal.get("email"),
      image: url,
      slug: meal.slug,
    };
    const data = await supabase.from("meals").insert([savedMeal]);
    return data;
  } catch (error) {
    console.error("Error saving meal:", error);
    throw error;
  }
}

export async function updateMeal(meal: any) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const url = await uploadImage(meal.image);

  try {
    const updatedMeal = {
      title: meal.title,
      instructions: meal.instructions,
      summary: meal.summary,
      creator: meal.creator,
      creator_email: meal.creatorEmail,
      image: url,
      slug: meal.slug,
    };
    const data = await supabase
      .from("meals")
      .update([updatedMeal])
      .eq("id", meal.id);
    return data;
  } catch (error) {
    console.error("Error saving meal:", error);
    throw error;
  }
}

export async function deleteMeal(meal: any) {
  try {
    const { data, error } = await supabase
      .from("meals")
      .delete()
      .eq("id", meal.id);
    return data;
  } catch (e) {
    console.error("Error deleting meal:", e);
    throw e;
  }
}

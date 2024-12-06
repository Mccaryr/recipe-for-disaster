import slugify from "slugify";
import xss from "xss";
import { uploadImage } from "@/lib/ImageActions/imageUpload";
import { supabase } from "./supabase.js";

export async function fetchMeals() {
  const { data, error } = await supabase.from("meals").select("*");

  /** Need to externalize this as util **/
  //const { data, error } = await supabase.rpc("current_user_role");

  if (error) {
    console.error("Error fetching meals:", error);
    return null;
  }
  console.log("fetchMeals: ", data);
  return data;
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const url = await uploadImage(meal.image);

  try {
    const savedMeal = await prisma.meals.create({
      data: {
        title: meal.title,
        instructions: meal.instructions,
        summary: meal.summary,
        creator: meal.creator,
        creator_email: meal.creatorEmail,
        image: url,
        slug: meal.slug,
      },
    });
  } catch (error) {
    console.error("Error saving meal:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

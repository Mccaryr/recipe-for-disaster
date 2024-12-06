import { supabase } from "@/lib/supabase";

export async function uploadImage(file) {
  console.log("uploadImage file: ", file);
  const fileName = `${file.name}`;

  const { data, error } = await supabase.storage
    .from("meals")
    .upload(`images/${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(`Error uploading image: ${error.message}`);
  }
  console.log("uploadImage data: ", data);
  const filePath = data.path;

  return getImageURL(filePath);
}

const getImageURL = (filePath) => {
  // @ts-ignore
  const { data } = supabase.storage.from("meals").getPublicUrl(filePath);

  console.log("publicUrl: ", data.publicUrl);

  return data.publicUrl;
};

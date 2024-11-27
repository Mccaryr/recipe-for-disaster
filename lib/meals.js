import sql from "better-sqlite3";
import slugify from "slugify";
import fs from "node:fs";
import xss from "xss";

const db = sql("meals.db");
export function getMeals() {
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare(`SELECT * FROM meals WHERE slug = ?`).get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error(`Could not save image: ${error}`);
    }
  });

  meal.image = `/images/${fileName}`;
  db.prepare(
    `INSERT INTO meals(title, instructions, summary, creator, creator_email, image, slug ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).run([
    meal.title,
    meal.instructions,
    meal.summary,
    meal.creator,
    meal.creator_email,
    meal.image,
    meal.slug,
  ]);
}

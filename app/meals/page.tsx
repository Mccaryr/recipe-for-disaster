import React from "react";
import classes from "./page.module.css";
import Link from "next/link";
import MealGrid from "@/components/Meals/meal-grid";
import { getMeals } from "@/lib/meals";

const MealsPage = async () => {
  const meals = await getMeals();

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <MealGrid meals={meals} />
      </main>
    </>
  );
};
export default MealsPage;

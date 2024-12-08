import React from "react";
import classes from "./page.module.css";
import Link from "next/link";
import MealGrid from "@/components/Meals/meal-grid";
import { getBaseUrl } from "@/lib/utils/setupEnv";

const Meals = async () => {
  try {
    const baseUrl = getBaseUrl();
    const meals = await fetch(
      `https://recipe-for-disaster-liart.vercel.app/api/meals`,
    );
    return <MealGrid meals={await meals.json()} />;
  } catch (error) {
    console.error("Error fetching meals:", error);
    return (
      <main className={classes.main}>
        <p>Failed to load meals. Please try again later.</p>
      </main>
    );
  }
};

const MealsPage = () => {
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
        <Meals />
      </main>
    </>
  );
};
export default MealsPage;

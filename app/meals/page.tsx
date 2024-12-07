import React, { Suspense } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import MealGrid from "@/components/Meals/meal-grid";
import { getBaseUrl } from "@/lib/utils/setupEnv";

const Meals = async () => {
  const baseUrl = getBaseUrl();
  const meals = await fetch(`${baseUrl}/api/meals`);
  if (!meals) {
    return <p>No Meals Found.</p>;
  } else {
    return <MealGrid meals={await meals.json()} />;
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
        <Suspense
          fallback={<div className={classes.loading}>Fetching Meals...</div>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
};
export default MealsPage;

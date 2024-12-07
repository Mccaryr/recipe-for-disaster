import React, { Suspense } from "react";
import classes from "./page.module.css";
import Image from "next/image";
import { getBaseUrl } from "@/lib/utils/setupEnv";

const MealDetails = async ({ params }: { params: any }) => {
  const baseUrl = getBaseUrl();
  const resolvedParams = await params;
  const response = await fetch(`${baseUrl}/api/meals/` + resolvedParams.slug);
  const meal = await response.json();

  if (!meal) {
    return <p>Meal details are not available.</p>;
  }

  return (
    <>
      <Suspense>
        <header className={classes.header}>
          <div className={classes.image}>
            <Image src={meal.image} alt={meal.title} fill />
          </div>
          <div className={classes.headerText}>
            <h1>{meal.title}</h1>
            <p className={classes.creator}>
              by <a href={`mailto:${meal.creatorEmail}`}>{meal.creator}</a>
            </p>
            <p className={classes.summary}>{meal.summary}</p>
          </div>
        </header>
        <main className={classes.main}>
          <pre
            className={classes.instructions}
            dangerouslySetInnerHTML={{ __html: meal.instructions }}
          ></pre>
        </main>
      </Suspense>
    </>
  );
};
export default MealDetails;

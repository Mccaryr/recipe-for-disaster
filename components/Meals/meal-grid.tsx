import classes from "./meal-grid.module.css";
import MealItem from "@/components/Meals/meal-item";
export default function MealGrid({ meals }: { meals: any }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal: any) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}

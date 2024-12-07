import classes from "./meal-grid.module.css";
import MealItem from "@/components/Meals/meal-item";
import { MealType } from "@/types/mealType";
export default function MealGrid({ meals }: { meals: MealType }) {
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

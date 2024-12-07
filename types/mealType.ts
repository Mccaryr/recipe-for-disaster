export type MealType = {
  title: string;
  image: string;
  slug?: string;
  summary: string;
  instructions: string;
  creator: string;
  creatorEmail: string;
  map?: (element: (meal: any) => JSX.Element) => any;
};

export type MealType = {
  id?: string;
  title: string;
  image: string;
  slug?: string;
  summary: string;
  instructions: string;
  creator: string;
  creatorEmail: string;
  map?: (element: (meal: any) => JSX.Element) => any;
};

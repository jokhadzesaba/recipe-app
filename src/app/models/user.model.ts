export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  Photo?:string;
  favoriteRecipes: number[]; // IDs of favorite recipes
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  prepTime: number;
  thumbnail: string;

  likes: number;

  authorId: string;
  date: Date;
}

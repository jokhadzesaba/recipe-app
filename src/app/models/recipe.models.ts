export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  totalPreparationTime:number;
  thumbnail: string;
  isFavorite: boolean;
  likes: number;
  comments: { author: string; text: string }[];
  authorId: number; 
}

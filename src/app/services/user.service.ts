import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUser: User;

  constructor() {
    // Mock logged-in user
    this.currentUser = {
      id: 1,
      name: 'Demo User',
      email: 'example@gmail.com',
      password: 'null',
      favoriteRecipes: [],
    };
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  favoriteRecipe(recipeId: number): void {
    if (!this.currentUser.favoriteRecipes.includes(recipeId)) {
      this.currentUser.favoriteRecipes.push(recipeId);
    }
  }

  unfavoriteRecipe(recipeId: number): void {
    this.currentUser.favoriteRecipes = this.currentUser.favoriteRecipes.filter(
      (id) => id !== recipeId
    );
  }

  hasFavorited(recipeId: number): boolean {
    return this.currentUser.favoriteRecipes.includes(recipeId);
  }
}

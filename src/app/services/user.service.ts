import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe.models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> =
    this.currentUserSubject.asObservable();
  private url = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {
    // Check localStorage for a logged-in user on init
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  /** Get current user value */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /** Set or update current user */
  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  /** Log out user */
  clearUser(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }
  addToFavorites(recipeId: string) {
    const user = this.getCurrentUser();
    if (user && !user.favoriteRecipes.includes(recipeId)) {
      // Replace the array with a new reference
      user.favoriteRecipes = [...user.favoriteRecipes, recipeId];

      // Update JSON server
      this.http
        .patch(`http://localhost:3000/users/${user.id}`, {
          favoriteRecipes: user.favoriteRecipes,
        })
        .subscribe();
    }
    this.http
      .get<Recipe>(`http://localhost:3000/recipes/${recipeId}`)
      .subscribe((recipe) => {
        const updatedLikes = (recipe.likes || 0) + 1;
        this.http
          .patch(`http://localhost:3000/recipes/${recipeId}`, {
            likes: updatedLikes,
          })
          .subscribe();
      });
  }

  removeFromFavorites(recipeId: string) {
    const user = this.getCurrentUser();
    if (user && user.favoriteRecipes.includes(recipeId)) {
      // Replace the array with a new reference
      user.favoriteRecipes = user.favoriteRecipes.filter(
        (id) => id !== recipeId
      );

      // Update JSON server
      this.http
        .patch(`http://localhost:3000/users/${user.id}`, {
          favoriteRecipes: user.favoriteRecipes,
        })
        .subscribe();
    }
    this.http
      .get<Recipe>(`http://localhost:3000/recipes/${recipeId}`)
      .subscribe((recipe) => {
        const updatedLikes = (recipe.likes || 0) - 1;
        this.http
          .patch(`http://localhost:3000/recipes/${recipeId}`, {
            likes: updatedLikes,
          })
          .subscribe();
      });
  }
}

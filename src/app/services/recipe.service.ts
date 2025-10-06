import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.models';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private url = 'http://localhost:3000/recipes'; // JSON server URL

  constructor(private http: HttpClient, private userService: UserService) {}

  // Fetch all recipes
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.url);
  }

  // Find recipe by ID
  getRecipeById(id: string): Observable<Recipe | undefined> {
    return new Observable(observer => {
      this.getRecipes().subscribe(recipes => {
        observer.next(recipes.find(r => r.id === id));
        observer.complete();
      });
    });
  }

  // Add a new recipe
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.url, recipe);
  }

  // Update an existing recipe
  updateRecipe(recipe: Recipe): Observable<Recipe> {
    const updateUrl = `${this.url}/${recipe.id}`;
    return this.http.put<Recipe>(updateUrl, recipe);
  }

  // Delete a recipe
  deleteRecipe(id: string): Observable<void> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<void>(deleteUrl);
  }
}

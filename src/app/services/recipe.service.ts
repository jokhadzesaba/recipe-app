import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.models';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private url = 'http://localhost:3000/recipes'; // JSON file in assets

  constructor(private http: HttpClient, private userService: UserService) {}

  // Fetch all recipes
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.url);
  }

  // For testing: find recipe by ID
  getRecipeById(id: number): Observable<Recipe | undefined> {
    return new Observable(observer => {
      this.getRecipes().subscribe(recipes => {
        observer.next(recipes.find(r => r.id === id));
        observer.complete();
      });
    });
  }
}

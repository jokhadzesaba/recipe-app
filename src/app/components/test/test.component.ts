import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from 'src/app/models/recipe.models';

@Component({
  selector: 'app-test',
 templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  recipes: Recipe[] = [];
  singleRecipe!: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    // Fetch all recipes
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data;
      console.log('All recipes:', this.recipes);
    });

    // Fetch single recipe
    this.recipeService.getRecipeById(1).subscribe(recipe => {
      this.singleRecipe = recipe!;
      console.log('Single recipe:', this.singleRecipe);
    });
  }
}

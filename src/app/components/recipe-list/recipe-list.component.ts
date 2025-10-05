import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { UserService } from '../../services/user.service';
import { Recipe } from 'src/app/models/recipe.models';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  searchText: string = '';
  showFavoritesOnly: boolean = false;

  constructor(
    private recipeService: RecipeService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data;
      this.filterRecipes();
    });
  }

  filterRecipes(): void {
    this.filteredRecipes = this.recipes.filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(this.searchText.toLowerCase())
        || r.ingredients.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesFavorite = !this.showFavoritesOnly || this.userService.hasFavorited(r.id);
      return matchesSearch && matchesFavorite;
    });
  }

  toggleLike(recipe: Recipe): void {
    // if (this.userService.hasLiked(recipe.id)) {
    //   this.recipeService.unlikeRecipe(recipe);
    // } else {
    //   this.recipeService.likeRecipe(recipe);
    // }
  }

  toggleFavorite(recipe: Recipe): void {
    if (this.userService.hasFavorited(recipe.id)) {
      this.userService.unfavoriteRecipe(recipe.id);
    } else {
      this.userService.favoriteRecipe(recipe.id);
    }
  }
}

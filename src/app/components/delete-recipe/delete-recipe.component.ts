import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from 'src/app/models/recipe.models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-recipe',
  templateUrl: './delete-recipe.component.html',
  styleUrls: ['./delete-recipe.component.scss']
})
export class DeleteRecipeComponent implements OnInit {
  recipeId!: string | null;
  recipe?: Recipe;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipeById(this.recipeId!).subscribe(recipe => {
      if (!recipe) {
        this.error = 'Recipe not found';
        this.loading = false;
        return;
      }
      this.recipe = recipe;
      this.loading = false;
    });
  }

  cancel(): void {
    this.router.navigate(['/feed']);
  }

  delete(): void {
    if (!this.recipe) return;

    const currentUser = this.userService.getCurrentUser();
    if (!currentUser || this.recipe.authorId !== currentUser.id) {
      alert('You are not allowed to delete this recipe.');
      this.router.navigate(['/feed']);
      return;
    }

    this.recipeService.deleteRecipe(this.recipeId!).subscribe(() => {
      alert('Recipe deleted successfully!');
      this.router.navigate(['/feed']);
    });
  }
}

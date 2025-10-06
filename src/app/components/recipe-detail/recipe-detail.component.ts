import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { UserService } from '../../services/user.service';
import { Recipe } from 'src/app/models/recipe.models';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  recipes: Recipe[] = [];
  newComment: string = '';
  userId?: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    public userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((data) => {
      this.recipes = data;
      this.userId = this.userService.getCurrentUser()?.id;
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.recipe = this.recipes.find((r) => r.id === id)!;
      }
      if (!this.recipe) this.router.navigate(['/not-found']);
      this.cdr.markForCheck();
    });
  }
  addToFavorites(recipeId: string) {
    this.userService.addToFavorites(recipeId);
    this.cdr.detectChanges();
  }
  removeFromFavorites(recipeId: string) {
    this.userService.removeFromFavorites(recipeId);
    this.cdr.detectChanges();
  }
  isFavorite(recipeId: string): boolean {
    const user = this.userService.getCurrentUser();
    return user?.favoriteRecipes.includes(recipeId) ?? false;
  }
}

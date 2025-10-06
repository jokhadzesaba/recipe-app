import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';
import { Observable, map } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.models';
import { User } from 'src/app/models/user.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sorted-recipes',
  templateUrl: './sorted-recipes.component.html',
  styleUrls: ['./sorted-recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortedRecipesComponent {
  @Input() filterType: 'popularity' | 'time' | 'quick' | 'favorites' =
    'popularity';
  @Input() query: string = '';
  @Input() userFavorites: string[] = [];
  @Input() sliceArray: number = Number.MAX_VALUE;

  allRecipes: Recipe[] = [];
  displayedRecipes: Recipe[] = [];
  userId?: String;
  constructor(
    private recipeService: RecipeService,
    private cdr: ChangeDetectorRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.userService.getCurrentUser()?.id;
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.allRecipes = recipes;
      this.applyFilter();
      this.cdr.markForCheck();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['query'] && !changes['query'].firstChange) {
      this.applyFilter(); // re-filter whenever query changes
      this.cdr.detectChanges();
    }
  }
  addToFavorites(recipeId: string) {
    this.userService.addToFavorites(recipeId);
  }
  removeFromFavorites(recipeId: string) {
    this.userService.removeFromFavorites(recipeId);
    this.cdr.detectChanges();
  }
  isFavorite(recipeId: string): boolean {
    const user = this.userService.getCurrentUser();
    return user?.favoriteRecipes.includes(recipeId) ?? false;
  }

  private applyFilter(): void {
    let filtered = [...this.allRecipes];

    // Filter by query
    if (this.query?.trim()) {
      const lowerQuery = this.query.toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(lowerQuery) ||
          recipe.description.toLowerCase().includes(lowerQuery)
      );
    }

    // Filter by favorites
    if (this.filterType === 'favorites') {
      const user = this.userService.getCurrentUser();
      const favorites = user?.favoriteRecipes ?? [];
      filtered = filtered.filter((recipe) => favorites.includes(recipe.id));
    }

    // Sort
    switch (this.filterType) {
      case 'popularity':
        filtered.sort((a, b) => b.likes - a.likes);
        break;

      case 'quick':
        filtered.sort((a, b) => a.prepTime - b.prepTime);
        break;

      case 'time':
        filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
    }

    // Slice at the end
    this.displayedRecipes = filtered.slice(0, this.sliceArray);

    this.cdr.markForCheck();
  }
}

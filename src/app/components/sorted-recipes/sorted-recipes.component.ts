import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { Observable, map } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.models';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-sorted-recipes',
  templateUrl: './sorted-recipes.component.html',
  styleUrls: ['./sorted-recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortedRecipesComponent {
  @Input() filterType: 'popularity' | 'time' | 'favorites' = 'popularity';
  @Input() userFavorites: number[] = []; // Array of recipe IDs for favorites

  allRecipes: Recipe[] = [];
  displayedRecipes: Recipe[] = [];

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.allRecipes = recipes;
      this.applyFilter();
      this.cdr.markForCheck()
    });
  }

  private applyFilter(): void {
    switch (this.filterType) {
      case 'popularity':
        this.displayedRecipes = [...this.allRecipes].sort(
          (a, b) => b.likes - a.likes
        );
        break;
      case 'time':
        this.displayedRecipes = [...this.allRecipes].sort(
          (a, b) => a.totalPreparationTime - b.totalPreparationTime
        );
        break;
      case 'favorites':
        this.displayedRecipes = this.allRecipes.filter((recipe) =>
          this.userFavorites.includes(recipe.id)
        );
        break;
      default:
        this.displayedRecipes = this.allRecipes;
    }
  }
}

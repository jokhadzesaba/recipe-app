import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { UserService } from '../../services/user.service';
import { Recipe } from 'src/app/models/recipe.models';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  recipes: Recipe[] = [];
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    public userService: UserService,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data;
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id) {
        this.recipe = this.recipes.find(r => r.id === id)!;
        console.log(this.recipe);
        
      }
      if (!this.recipe) this.router.navigate(['/not-found']);
      this.cdr.detectChanges()
    });
  }

  toggleLike(): void {
    // if (this.userService.hasLiked(this.recipe.id)) {
    //   this.recipeService.unlikeRecipe(this.recipe);
    // } else {
    //   this.recipeService.likeRecipe(this.recipe);
    // }
  }

  toggleFavorite(): void {
    if (this.userService.hasFavorited(this.recipe.id)) {
      this.userService.unfavoriteRecipe(this.recipe.id);
    } else {
      this.userService.favoriteRecipe(this.recipe.id);
    }
  }

  addComment(): void {
    if (this.newComment.trim()) {
      this.recipe.comments.push({
        author: this.userService.getCurrentUser().name,
        text: this.newComment
      });
      this.newComment = '';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from 'src/app/models/recipe.models';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  recipeForm!: FormGroup;
  recipes: Recipe[] = [];
  editingRecipeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data;
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id) {
        this.editingRecipeId = id;
        const recipe = this.recipes.find(r => r.id === id);
        if (recipe) {
          this.recipeForm.patchValue(recipe);
        }
      }
    });

    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
      thumbnail: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.recipeForm.invalid) return;

    // const formValue = this.recipeForm.value;
    // if (this.editingRecipeId) {
    //   const updatedRecipe: Recipe = { ...formValue, id: this.editingRecipeId, likes: 0, isFavorite: false, comments: [] };
    //   this.recipes = this.recipeService.updateRecipe(updatedRecipe, this.recipes);
    // } else {
    //   const newRecipe: Recipe = { ...formValue, likes: 0, isFavorite: false, comments: [] };
    //   this.recipes = this.recipeService.addRecipe(newRecipe, this.recipes);
    // }

    alert('Recipe saved successfully!');
    this.router.navigate(['/feed']);
  }
}

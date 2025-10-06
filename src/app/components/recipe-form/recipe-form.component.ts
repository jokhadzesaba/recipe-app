import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from 'src/app/models/recipe.models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {
  recipeForm!: FormGroup;
  editingRecipeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private userSevice:UserService
  ) {}

  ngOnInit(): void {
    // Initialize form
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
      thumbnail: ['', Validators.required],
      prepTime: [null, [Validators.required, Validators.min(1)]],
    });

    // Check if editing existing recipe
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editingRecipeId = id;
      this.recipeService.getRecipeById(id).subscribe((recipe) => {
        if (recipe) {
          this.recipeForm.patchValue(recipe);
        }
      });
    }
  }

  submit(): void {
    if (this.recipeForm.invalid) return;
    const formValue = this.recipeForm.value;

    if (this.editingRecipeId) {
      // Update recipe
      const updatedRecipe: Recipe = {
        ...formValue,
        id: this.editingRecipeId,
        likes: 0,
        isFavorite: false,
        comments: [],
      };
      this.recipeService.updateRecipe(updatedRecipe).subscribe(() => {
        alert('Recipe updated successfully!');
        this.router.navigate(['/feed']);
      });
    } else {
      // Add new recipe
      const newRecipe: Recipe = {
        ...formValue,
        likes: 0,
        isFavorite: false,
        comments: [],
        authorId:this.userSevice.getCurrentUser()?.id,
        prepTime: formValue.prepTime,
        date:new Date
      };
      this.recipeService.addRecipe(newRecipe).subscribe(() => {
        alert('Recipe added successfully!');
        this.router.navigate(['/feed']);
      });
    }
  }
}

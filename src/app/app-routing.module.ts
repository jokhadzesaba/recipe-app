// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/registrate/registrate.component';
import { RecipeOwnerGuard } from './guards/recipe-guard.guard';
import { AuthGuard } from './guards/auth.guard';
import { DeleteRecipeComponent } from './components/delete-recipe/delete-recipe.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full' },
  { path: 'feed', component: RecipeListComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: 'add', component: RecipeFormComponent },
  {
    path: 'edit/:id',
    component: RecipeFormComponent,
    canActivate: [AuthGuard, RecipeOwnerGuard],
  },
  {
    path: 'delete/:id',
    component: DeleteRecipeComponent,
    canActivate: [AuthGuard, RecipeOwnerGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

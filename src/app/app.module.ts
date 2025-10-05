// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/registrate/registrate.component';
import { HeaderComponent } from './components/header/header.component';
import { SortedRecipesComponent } from './components/sorted-recipes/sorted-recipes.component';
import { SplitByCommaPipe } from "./pipes/split-by-comma.pipe";

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeFormComponent,
    NotFoundComponent,
    TestComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    SortedRecipesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SplitByCommaPipe
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

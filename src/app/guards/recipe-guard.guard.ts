import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RecipeService } from '../services/recipe.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeOwnerGuard implements CanActivate {

  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const recipeId = route.paramMap.get('id');
    const currentUser = this.userService.getCurrentUser();

    if (!currentUser) {
      this.router.navigate(['/login']);
      return of(false);
    }

    return this.recipeService.getRecipeById(recipeId!).pipe(
      map(recipe => {
        if (!recipe) {
          this.router.navigate(['/**']); // Recipe not found
          return false;
        }
        if (recipe.authorId !== currentUser.id) {
          this.router.navigate(['/feed']); // Not the owner
          return false;
        }
        return true; // User is the owner
      }),
      catchError(() => {
        this.router.navigate(['/feed']);
        return of(false);
      })
    );
  }
}

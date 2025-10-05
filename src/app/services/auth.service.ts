import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000/users';
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  // Register a new user
  register(user: User): Observable<User> {
    // Initialize favoriteRecipes as empty array
    const newUser = { ...user, favoriteRecipes: [] };
    return this.http.post<User>(this.url, newUser);
  }

  // Login user
  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.url}?email=${email}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            this.currentUser = users[0];
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return this.currentUser;
          }
          return null;
        })
      );
  }

  // Logout
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  // Get logged-in user
  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const saved = localStorage.getItem('currentUser');
      if (saved) this.currentUser = JSON.parse(saved);
    }
    return this.currentUser;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  // Add recipe to favorites
  addFavorite(recipeId: number): Observable<User> | null {
    const user = this.getCurrentUser();
    if (!user) return null;

    if (!user.favoriteRecipes.includes(recipeId)) {
      user.favoriteRecipes.push(recipeId);
      return this.http.put<User>(`${this.url}/${user.id}`, user).pipe(
        map(updatedUser => {
          this.currentUser = updatedUser;
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          return updatedUser;
        })
      );
    }
    return null;
  }

  // Remove recipe from favorites
  removeFavorite(recipeId: number): Observable<User> | null {
    const user = this.getCurrentUser();
    if (!user) return null;

    user.favoriteRecipes = user.favoriteRecipes.filter(id => id !== recipeId);
    return this.http.put<User>(`${this.url}/${user.id}`, user).pipe(
      map(updatedUser => {
        this.currentUser = updatedUser;
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        return updatedUser;
      })
    );
  }
}

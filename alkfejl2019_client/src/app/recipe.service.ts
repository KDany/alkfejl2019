import { Injectable } from '@angular/core';
import { Recipe } from "./recipe";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService, httpOptions } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
  private recipeUrl: string = 'http://localhost:8080/user/'+this.authService.user.id+'/cookbooks/2/recipes'; 

  constructor(
    private http: HttpClient,
    private authService: AuthService 
  ) { }

  getRecipes(): Promise<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.recipeUrl}`, httpOptions).toPromise();
  }

  getRecipe(id: number): Promise<Recipe> {
    return this.http.get<Recipe>(`${this.recipeUrl}/${id}`, httpOptions).toPromise();
  }

  createRecipe(recipe: Recipe): Promise<Recipe> {
    return this.http.post<Recipe>(`${this.recipeUrl}`, recipe, httpOptions).toPromise();
  }

  updateRecipe(recipe: Recipe): Promise<Recipe> {
    return this.http.put<Recipe>(`${this.recipeUrl}/${recipe.id}`, recipe, httpOptions).toPromise();
  }

  deleteRecipe(id): Promise<Recipe> {
    return this.http.delete<Recipe>(`${this.recipeUrl}/${id}`, httpOptions).toPromise();
  }
}
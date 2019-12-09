import { Component, OnInit } from '@angular/core';
import { Recipe } from "../recipe";
import { RecipeService } from '../recipe.service';
import { AuthService } from '../auth.service';
import { StatusFilterComponent } from '../status-filter/status-filter.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public filteredRecipes: Recipe[];
  public selectedStatus: string;
  public selectedRecipe: Recipe;
  
  public statusFilterComponent: StatusFilterComponent;

  public recipes: Recipe[] = [];
  private user: string;

  constructor(
    private recipeService: RecipeService,
    public authService: AuthService
  ) {
    console.log(this);
  }

  async ngOnInit(): Promise<void> {
    
    this.user = this.authService.username;  
    this.selectedStatus = '';
    this.recipes = await this.recipeService.getRecipes();
    console.log("this.user: " + this.user);
    this.filter();
    this.reloadRecipesStatus();
  }

  reloadRecipesStatus(): void {
    this.statusFilterComponent.statuses = [];
    for (let i = 0; i < this.recipes.length; ++i) {
      if (!this.statusFilterComponent.statuses.includes(this.recipes[i].status)) {
        this.statusFilterComponent.statuses.push(this.recipes[i].status);
      }
    }
  }

  onFilterChange(status: string): void {
    this.selectedStatus = status;
    this.filter();
  }

  onSelectRecipe(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }

  async onFormSubmit(recipe: Recipe): Promise<void> {
    if (recipe.id > 0) {
      await this.recipeService.updateRecipe(recipe);
      //this.selectedRecipe.author = this.user;
      this.selectedRecipe.title = recipe.title;
      //this.selectedRecipe.ingredients = recipe.ingredients;
      this.selectedRecipe.description = recipe.description;
      
    } else {
      this.selectedRecipe.id = Math.floor(Math.random()*1000000);
      //this.selectedRecipe.author = this.user;
      this.selectedRecipe.title = recipe.title;
     // this.selectedRecipe.ingredients = recipe.ingredients;
      this.selectedRecipe.description = recipe.description;
      this.selectedRecipe.status = 'B';
      recipe.status = this.user;
      //recipe.author = this.user;
      this.recipeService.createRecipe(recipe).then(createdRecipe => {
                          this.recipes.push(createdRecipe);
                          this.reloadRecipesStatus();
                        });
    }
    this.selectedRecipe = null;
  }
  
  onNewClick(): void {
    this.selectedRecipe = new Recipe();
  }
  
  onDeleteClick(id: number) {
    this.recipeService.deleteRecipe(id).then(async deletedRecipe => {
      var index = this.recipes.indexOf(deletedRecipe);
      if (index > -1) {
        this.recipes.splice(index, 1);
      }      
      this.recipes = await this.recipeService.getRecipes();
    });
  }

  private filter(): void {    
    this.filteredRecipes = this.selectedStatus === ''
    ? this.recipes
    : this.recipes.filter(recipe => recipe.status === this.selectedStatus);
  }
}

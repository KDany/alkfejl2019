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
  private owners: string[] = [];
  private user: string;

  constructor(
    private recipeService: RecipeService,
    public authService: AuthService
  ) {
    console.log(this);
    //this.setOwners();  
  }

  /*getOwners(): string[] {
    return this.owners;
  }

  setOwners(): void {a
    var i;
    var array = [];
    for (i = 0; this.recipes.length; i++) {
      array.push(this.recipes[i].status.toUpperCase());
    }
    //array.filter((item, index) => array.indexOf(item) === index);
    this.owners = array;
    console.log(array);
  }

  appendOwner(string: string): void {
    /*var array = this.owners;
    array.push(string);
    array.filter((item, index) => array.indexOf(item) === index);
    this.owners = array;
    this.owners.push(string);
  }*/

  async ngOnInit(): Promise<void> {
    this.selectedStatus = '';
    this.recipes = await this.recipeService.getRecipes();
    //this.setOwners();
    this.user = this.authService.user.username;  
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
      await this.recipeService.updateRecipe(recipe)
      this.selectedRecipe.author = recipe.author;
      this.selectedRecipe.title = recipe.title;
      this.selectedRecipe.ingredients = recipe.ingredients;
      this.selectedRecipe.description = recipe.description;
      
    } else {
      this.selectedRecipe.id = Math.floor(Math.random()*1000000);
      this.selectedRecipe.author = recipe.author;
      this.selectedRecipe.title = recipe.title;
      this.selectedRecipe.ingredients = recipe.ingredients;
      this.selectedRecipe.description = recipe.description;
      //this.selectedRecipe.status = 'NEW';
      recipe.status = this.user.toUpperCase();
      recipe.author = this.user;
      this.recipeService.createRecipe(recipe)
                        .then(createdRecipe => {
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
    this.recipeService.getRecipe(id).then((recipe) => {
      if(this.user.toUpperCase() !== recipe.status && this.user.toUpperCase() !== "ADMIN") {
        return;
      }
      this.recipeService.deleteRecipe(id).then(async () => {
      this.selectedRecipe = null;
      this.recipes = await this.recipeService.getRecipes();
      this.filter();
      this.reloadRecipesStatus();
    })
    } );
  }

  private filter(): void {    
    this.filteredRecipes = this.selectedStatus === ''
    ? this.recipes
    : this.recipes.filter(recipe => recipe.status === this.selectedStatus);
  }
}

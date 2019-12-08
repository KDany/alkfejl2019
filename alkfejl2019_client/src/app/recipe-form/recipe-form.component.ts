import { Component, OnChanges, Input, Output, EventEmitter  } from '@angular/core'; 
import { Recipe } from '../recipe';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnChanges {

  @Input() recipe: Recipe
  public model: Recipe
  @Output() onSubmit = new EventEmitter<Recipe>();

  constructor() { }

  ngOnChanges(): void {
    this.model = Object.assign({}, this.recipe);
  }
  
  submit(form: NgForm): void {
    if (!form.valid) {
      return;
    }    
    this.onSubmit.emit(this.model);
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';

@Component({
  selector: 'status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: [ './status-filter.component.css' ]
})
export class StatusFilterComponent  {

  @Input('status') selectedStatus: string = '';
  public statuses: string[] = [];
  @Output() onChange = new EventEmitter<string>();

  constructor(
    public authService: AuthService,
    public recipeList: RecipeListComponent
  ) {
    recipeList.statusFilterComponent = this;
    //this.onInit();
  }

  /*onInit(): void {
    //this.statuses.push.apply(this.statuses, this.recipeList.getOwners());
    this.statuses = this.recipeList.getOwners();
    if(!(this.statuses.indexOf(this.authService.user.username.toUpperCase()) >= 0)) {
      this.statuses.push(this.authService.user.username.toUpperCase());
    }
  }*/

  onFilterChange(status: string): void {
    this.selectedStatus = status;
    this.onChange.emit(status);
  }

}
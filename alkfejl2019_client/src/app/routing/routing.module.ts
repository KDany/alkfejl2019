import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeListComponent } from "../recipe-list/recipe-list.component";
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { AuthGuard } from '../auth.guard';
import { LoginFormComponent } from '../login-form/login-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    component: RecipeListComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'recipes/add',
    component: RecipeFormComponent
  },
  {
    path: 'recipes/:id',
    component: RecipeDetailComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)  ],
  exports: [ RouterModule ],
  declarations: []
})
export class RoutingModule { }
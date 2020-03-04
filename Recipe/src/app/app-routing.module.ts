import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyRecipeComponent } from './my-recipe/my-recipe.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { BrowseRecipesComponent } from './browse-recipes/browse-recipes.component';


const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'my-recipe',
    component: MyRecipeComponent
  },
  {
    path: 'browse',
    component: BrowseRecipesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

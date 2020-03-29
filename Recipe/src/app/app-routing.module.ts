import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyRecipeComponent } from './my-recipe/my-recipe.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { BrowseRecipesComponent } from './browse-recipes/browse-recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component'
import { CreateRecipeComponent } from './create-recipe/create-recipe.component'
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component';
import { EditPlaylistComponent } from './edit-playlist/edit-playlist.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { LogoutComponent } from './logout/logout.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

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
    path: 'my-recipe/:type',
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
  {
    path: 'recipe-list',
    component: RecipeListComponent
  },
  {
    path: 'recipe-list/:type',
    component: RecipeListComponent
  },
  {
    path: 'create-recipe',
    component: CreateRecipeComponent
  },
  {
    path: 'create-playlist',
    component: CreatePlaylistComponent
  },
  {
    path: 'edit-playlist',
    component: EditPlaylistComponent
  },
  {
    path: 'profile-page',
    component: ProfilePageComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'new-password',
    component: NewPasswordComponent
  },
  {
    path: 'view-recipe',
    component: ViewRecipeComponent
  },
  {
    path: 'view-recipe/:id',
    component: ViewRecipeComponent
  },
  {
    path: 'edit-recipe/:id',
    component: EditRecipeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

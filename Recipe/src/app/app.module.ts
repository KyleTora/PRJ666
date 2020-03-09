import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyRecipeComponent } from './my-recipe/my-recipe.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { BrowseRecipesComponent } from './browse-recipes/browse-recipes.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RecipeListComponent } from './recipe-list/recipe-list.component'
//import { ServicesComponent } from './services/services.component';

@NgModule({
  declarations: [
    AppComponent,
    MyRecipeComponent,
    LoginComponent,
    HomepageComponent,
    HeaderComponent,
    RegisterComponent,
    BrowseRecipesComponent,
    RecipeListComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

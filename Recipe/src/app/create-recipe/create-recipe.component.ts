import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../global.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {
  recipeName: string;
  mealType: string;
  region: string;
  cooktime: number;
  servings: number;
  chef: string; // get cookie for current user
  userID: number; // getuserid
  description: string;
  errorMessage: string;
  showErrorMessage: boolean;
  lifestyle: string;
  tips: string;
  instructions: string[] = new Array("Step 1", "Step 2", "Step 3");


//display ingredients
  // meats = [
  //   {id: 1, name:'Pork'},
  //   {id: 2, name:'Steak'},
  //   {id: 5, name:'Chicken'},
  //   {id: 3, name:'Lamb'},
  //   {id: 4, name:'Other'}
  // ];
  // other = [
  //   {id: 1, name:'Pork'},
  //   {id: 2, name:'Steak'},
  //   {id: 5, name:'Chicken'},
  //   {id: 3, name:'Lamb'},
  //   {id: 4, name:'Other'}
  // ];

  constructor(user: User, private router: Router, private databaseService: DatabaseService, private cookieService: CookieService) {  
    this.chef = user.getUsername();
    this.userID = user.getId();
  }

  save(){
    this.showErrorMessage = false;
    if(!this.recipeName || !this.mealType || !this.region || !this.cooktime || !this.servings || !this.chef || !this.description || !this.lifestyle){
      this.errorMessage = "Please fill out all required fields!";
      this.showErrorMessage = true;
    }else if(this.description.length > 200){
      this.errorMessage = "Description is too long!";
      this.showErrorMessage = true;
    }else if(this.recipeName.length > 32){
      this.errorMessage = "Recipe name is too long!";
      this.showErrorMessage = true;
    }else{     
      this.databaseService.newRecipe(this.userID, this.recipeName, this.chef, this.mealType, this.region, this.description, this.cooktime, this.servings, this.lifestyle, this.instructions).then((result)=>{
        console.log("Recipe Result: ", result);
        this.router.navigate(['/my-recipe']);
      }).catch((err)=>{
        console.log("Recipe Error: ", err);
      })
    }
  }

  ngOnInit() {
  }
}

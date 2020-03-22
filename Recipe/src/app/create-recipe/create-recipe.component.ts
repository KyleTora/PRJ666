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
  description: string;
  errorMessage: string;
  showErrorMessage: boolean;
  lifestyle: string;

  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
  step6: string;
  step7: string;
  step8: string;
  step9: string;

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
  }

  save(){
    this.showErrorMessage = false;
    if(!this.recipeName || !this.mealType || !this.region || !this.cooktime || !this.servings || !this.chef || !this.description){
      this.errorMessage = "Please fill out all required fields!";
      this.showErrorMessage = true;
    }else if(this.description.length > 200){
      this.errorMessage = "Description is too long!";
      this.showErrorMessage = true;
    }else if(this.recipeName.length > 32){
      this.errorMessage = "Recipe name is too long!";
      this.showErrorMessage = true;
    }else{
      this.databaseService.newRecipe(this.recipeName, this.chef, this.mealType, this.region, this.description, this.cooktime, this.servings).then((result)=>{
        console.log("Recipe Result: ", result);
      }).catch((err)=>{
        console.log("Recipe Error: ", err);
      })
    }
  }

  ngOnInit() {
  }
}

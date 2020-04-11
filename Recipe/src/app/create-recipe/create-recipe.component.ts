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
  num: number;
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

  instructions = new Array;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
  step6: string;
  step7: string;
  step8: string;
  step9: string;
  step10: string;

  ingredients = new Array;
  amount = new Array;
  measure = new Array;
  
  arr = Array;
  size = 1;
  size2 = 1;
  addRow(){
    this.size++;
  }
  addRow2(){
    this.size2++;
  }
  isAvailable: any;
  url;

  constructor(user: User, private router: Router, private databaseService: DatabaseService, private cookieService: CookieService) {  
    this.chef = user.getUsername();
    this.userID = user.getId();
  }

  onChange(event) {
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.url = event.target.result;
    };
    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  save(){   
    console.log(this.ingredients);
    console.log(this.instructions);

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
    }else if(!this.instructions[0]){
      this.errorMessage = "Enter at least one instruction!"; 
      this.showErrorMessage = true;
    }else if(!this.ingredients[0]){
      this.errorMessage = "Enter at least one ingredient!"; 
      this.showErrorMessage = true;
    }else{   
      this.databaseService.newRecipe(this.userID, this.recipeName, this.chef, this.mealType, this.region, this.description, this.cooktime, this.servings, this.lifestyle, this.url).then((result)=>{
        console.log("Recipe Result: ", result);
          this.databaseService.newIngredients(this.instructions, this.ingredients, this.amount, this.measure, result).then((result2)=>{
            console.log("Steps Result: ", result2);   
          }).catch((err) =>{
            console.log("Steps Error: ", err);
          })
      }).catch((err)=>{
        console.log("Recipe Error: ", err);
      })
      this.router.navigate(['/my-recipe/recipe']);
    }
  }

  ngOnInit() {
  }
}

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
  //tips: string;
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


  //display ingredients
  fruit = ["Lemon","Apple","Banana","Lime","Strawberry","Orange","Pineapple","Blueberry","Raisin", "Coconut","Grape","Peach","Raspberry","Cranberry","Mango","Pear","Blackberry","Cherry"];
  vegetable = [ "Onion", "Garlic", "Tomato", "Potato", "Carrot", "Bell Pepper", "Basil", "Parsley", "Broccoli", "Corn", "Spinach", "Mushroom", "Ginger", "Chili Pepper","Avacado", "Olive", "Cilantro"];
  dairy = [  "Milk",  "Cream",  "Yogurt",  "Ice Cream",  "Yogurt",  "Butter",  "Egg"];
  bakingAndGrain = ["Rice","Pasta","Flour","Bread","Baking Powder", "Baking Soda", "Bread Crumbs", "Cornstarch", "Yeast"];
  sweet = ["Sugar","Brown Sugar", "Honey", "Maple Syrup", "Molasses"];
  spice = ["Cinnamon", "Vanilla", "Garlic Powder", "Paprika", " Oregano", "Chili Powder", "Cayenne", "Thyme", "Chive"];
  meat = ["Chicken Breast", " Chicken Thighs", "Chicken Leg", "Chicken Wings", "Ground Beef", "Bacon", "Sausage", "Steak", "Ham", "Hot Dog", "Pork Chops", "Turkey", "Pork", "Pepporoni", "Ribs", "Lamb"];
  seafood = ["Shrimp", "Crab", "Scallop", "Lobster", "Calamari", "Canned Tuna","Salmon","Tilapia","Fish Fillets","Cod","Canned Salmon", "Anchovy", "Smoked Salmon", "Sardines", "Halibut","Trout"];
  //condiments, sauces, seasoning
  oil = ["Olive Oil", "Vegetable Oil", "Cooking Spray", "Canola Oil", "Peanut Oil", "Sesame Oil"];
  alcohol = ["White Wine", "Red Wine", "Beer", "Whiskey", "Vodka", "Rum"];
  soup = ["Chicken Broth", "Mushroom Soup", "Beef Broth", "Tomato Soup", "Vegetable Stock"];
  nut = ["Peanut Butter", "Almond", "Walnut", "Pecan", "Peanut", "Cashew", "Flax"];

  constructor(user: User, private router: Router, private databaseService: DatabaseService, private cookieService: CookieService) {  
    this.chef = user.getUsername();
    this.userID = user.getId();
  }

  save(){   
    this.instructions = [];
    if(this.step1){
      this.instructions.push(this.step1);
    }
    if(this.step2){
      this.instructions.push(this.step2);
    }
    if(this.step3){
      this.instructions.push(this.step3);
    }
    if(this.step4){
      this.instructions.push(this.step4);
    }
    if(this.step5){
      this.instructions.push(this.step5);
    }
    if(this.step6){
      this.instructions.push(this.step6);
    }
    if(this.step7){
      this.instructions.push(this.step7);
    }
    if(this.step8){
      this.instructions.push(this.step8);
    }
    if(this.step9){
      this.instructions.push(this.step9);
    }
    
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
    }else if(!this.step1){
      this.errorMessage = "Enter at least one instruction!"; 
      this.showErrorMessage = true;
    }else{   
      this.databaseService.newRecipe(this.userID, this.recipeName, this.chef, this.mealType, this.region, this.description, this.cooktime, this.servings, this.lifestyle).then((result)=>{
        console.log("Recipe Result: ", result);
        this.databaseService.newSteps(this.instructions, result).then((result2)=>{
          console.log("Steps Result: ", result2);
        }).catch((err) =>{
          console.log("Steps Error: ", err);
        })
        this.router.navigate(['/my-recipe']);
      }).catch((err)=>{
        console.log("Recipe Error: ", err);
      })
    }
  }



  ngOnInit() {
  }
}

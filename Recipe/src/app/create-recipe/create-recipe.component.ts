import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { CookieService } from 'ngx-cookie-service';

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
  chef = "kyletora";
  description: string;

  constructor(private router: Router, private databaseService: DatabaseService, private cookieService: CookieService) {  }

  save(){
    this.databaseService.newRecipe(this.recipeName, this.chef, this.mealType, this.region, this.description, this.cooktime, this.servings).then((result)=>{
      console.log("Recipe Result: ", result);

    }).catch((err)=>{
      console.log("Recipe Error: ", err);

    })
  }

  ngOnInit() {
  }

}

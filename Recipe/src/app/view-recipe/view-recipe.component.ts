import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  id: number;
  private sub: any;


  amount = ["21", "1", "125 mL", "25 g"];
  ingredients = ["oranges", "egg", "water", "sugar"];


  chef: string;
  recipeName: string;
  mealType: string;
  region: string;
  description: string;
  cooktime: number;
  servings: number;
  lifeStyle: string;
  instructions = [];
  cookware = [];
  notes: string;
  
  constructor(private db: DatabaseService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];

      this.db.loadRecipe(this.id).then((result)=>{
        console.log("Recipe Result: ", result);
        this.recipeName = result.recipeName;
        this.mealType = result.mealType;
        this.region = result.region;
        this.description = result.description;
        this.cooktime = result.cooktime;
        this.servings = result.servings;
        this.lifeStyle = result.lifestyle;
        this.chef = result.chef;
        
        //only gets first step
        this.db.loadSteps(this.id).then((result) => {
          console.log("Steps result: ", result);
          this.instructions.push(result.step);
        }).catch((err) => {
          console.log("Instructions Error: " , err);
        })
      
        //set instrucitons
      }).catch((err)=>{
        console.log("Recipe Error: ", err);
      })
   })
  }
}

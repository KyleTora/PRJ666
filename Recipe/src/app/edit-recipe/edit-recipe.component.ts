import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  id: number;
  private sub: any;
  
  chef: string;
  recipeName: string;
  mealType: string;
  region: string;
  description: string;
  cooktime: number;
  servings: number;
  lifeStyle: string;
  instructions: string;
  cookware = [];
  notes: string;
  errorMessage: string;
  showErrorMessage: boolean;
  url;

  ingredients = new Array;
  amount = new Array;
  measure = new Array;
  
  arr = Array;
  size = 1;
  addRow(){
    this.size++;
  }

  constructor(private db: DatabaseService, private route: ActivatedRoute) { }

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
     
        this.instructions = "yeet";
         console.log(this.instructions);
      
        //set instrucitons
      }).catch((err)=>{
        console.log("Recipe Error: ", err);
      })
   })
  }
}

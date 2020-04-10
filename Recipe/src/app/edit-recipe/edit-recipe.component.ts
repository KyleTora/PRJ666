import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../global.service';

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
  notes: string;
  errorMessage: string;
  showErrorMessage: boolean;
  url;

  instructions = new Array;
  ingredients = new Array;
  amount = new Array;
  measure = new Array;
  
  arr = Array;
  size = 1;
  addRow(){
    this.size++;
  }

  constructor(private user: User, private db: DatabaseService, private router: Router, private route: ActivatedRoute) { }

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
        this.url = result.image;

        this.db.loadSteps(this.id).then((result) => {
          console.log("Steps result: ", result);
          for(var i = 0; i < result.length; i++){
            this.instructions.push(result[i].step);
          }
        }).catch((err) => {
          console.log("Instructions Error: " , err);
        })

        this.db.loadIngredients(this.id).then((result) => {
          console.log("Ingredients result: ", result);
          for(var i = 0; i < result.length; i++){
            this.ingredients.push(result[i].ingredient_name);
            this.amount.push(result[i].amount);
            this.measure.push(result[i].measure);
          }
        }).catch((err) => {
          console.log("Instructions Error: " , err);
        })

      }).catch((err)=>{
        console.log("Recipe Error: ", err);
      })
   })
  }


  save(){   
    console.log(this.ingredients);
    this.showErrorMessage = false;
    if(!this.recipeName || !this.mealType || !this.region || !this.cooktime || !this.servings || !this.chef || !this.description || !this.lifeStyle){
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
      this.db.updateRecipe(this.id, this.user.getId(), this.recipeName, this.chef, this.mealType, this.region, this.description, this.cooktime, this.servings, this.lifeStyle, this.url).then((result)=>{
        console.log("Recipe Result: ", result);
          // this.db.updateIngredients(this.instructions, this.ingredients, this.amount, this.measure, result).then((result2)=>{
          //   console.log("Steps Result: ", result2);   
          // }).catch((err) =>{
          //   console.log("Steps Error: ", err);
          // })
      }).catch((err)=>{
        console.log("Recipe Error: ", err);
      })
      this.router.navigate(['/my-recipe/recipe']);
    }
  }

}

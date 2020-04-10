import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../global.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  id: number;
  private sub: any;

  amount = [];
  ingredients = [];
  measure = [];

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
  isFav: boolean;
  usersRecipe : boolean;
  image: string;
  rating = 2;
  constructor(private userX: User, private db: DatabaseService, private router: Router, private route: ActivatedRoute, private cookie: CookieService) { }

  delete(){
    if(this.userX.getUsername() == this.chef){
      if(confirm("  Are you sure you want to delete this recipe?\n  This action can not be reversed!")){ 
        this.db.deleteRecipe(this.id).then((result) => {
        }).catch((err) => {
          console.log("Delete Error: ", err);
        })
        this.db.deleteFav(this.id, this.userX.getId()).then((result) => {
        }).catch((err) => {
          console.log("Delete Error: ", err);
        })
        this.db.deleteOthers(this.id).then((result) => {
          alert(this.recipeName + " has been deleted!");
          this.router.navigate(['/my-recipe/recipe']);
        }).catch((err) => {
          console.log("Delete Error: ", err);
        })
      } 
    }
  }

  rate(){
    if(this.chef == this.userX.getUsername()){
      if(confirm("  You can't rate your own recipe!")){
      }
    }
    else if(this.userX){
      if(confirm("  Rate this recipe a " + this.rating + " out of 5?")){
        this.db.rateRecipe(this.rating, this.id).then((result) =>{
          console.log("Rate success: ", result);
          window.location.reload();
        }).catch((err) => {
          console.log("Rate error: ", err);
        })
      }
    }
  }

  favourite(){
    if(this.userX.getId()){
      if(confirm("  Add this recipe to your list of favourites?")){
        this.db.addFavourite(this.id, this.userX.getId(), this.recipeName, this.description).then((result) =>{
          alert(this.recipeName + " has been added!");
          window.location.reload();
        }).catch((err) => {
          console.log("Favourite Error: ", err);
        })
      }
    }else{
      if (confirm("  You need to be logged in to access this feature...\n  Would you like to login now?")){
        this.router.navigate(['/login']);
      }
    }
  }

  unfavourite(){
    if(confirm("  Are you sure you want to unfavourite this recipe?")){
      this.db.deleteFav(this.id, this.userX.getId()).then ((result) => {
        alert(this.recipeName + " has been removed!");
        window.location.reload();
      }).catch((err) => {
        console.log("Favourite Error: ", err);
      })
    }
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
        this.image = result.image;
        if(this.chef == this.userX.getUsername()){
          this.usersRecipe = true;
        }else{
          this.usersRecipe = false;
        }
        this.db.loadFavourite(this.userX.getId()).then((result) => {
          console.log("Favourite result: ", result);
          this.isFav = false;
          for(var i = 0; i < result.length; i++){
            if(this.id == result[i].recipe_id){
              this.isFav = true;
            }
          }
        })
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
}

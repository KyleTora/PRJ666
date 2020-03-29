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
  
  usersRecipe : boolean;

  constructor(private userX: User, private db: DatabaseService, private router: Router, private route: ActivatedRoute, private cookie: CookieService) { }

  delete(){
    if(this.userX.getUsername() == this.chef){
      if(confirm("  Are you sure you want to delete this recipe?\n  This action can not be reversed!")){ 
        this.db.deleteRecipe(this.id).then((result) => {
          alert(this.recipeName + " has been deleted!");
          this.router.navigate(['/my-recipe']);
        }).catch((err) => {
          console.log("Delete Error: ", err);
        })
      } 
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
        if(this.chef == this.userX.getUsername()){
          this.usersRecipe = true;
        }else{
          this.usersRecipe = false;
        }
        
        //only gets first step
        this.db.loadSteps(this.id).then((result) => {
          console.log("Steps result: ", result);
          for(var i = 0; i < result.length; i++){
            this.instructions.push(result[i].step);
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

import { Component, OnInit } from '@angular/core';
import { User } from '../global.service';
import { DatabaseService } from '../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-view-playlist',
  templateUrl: './view-playlist.component.html',
  styleUrls: ['./view-playlist.component.css']
})
export class ViewPlaylistComponent implements OnInit {
  id: number;
  private sub: any;


  amount = [];
  ingredients = [];
  measure = [];

  user: number;
  playlistName: string;
  description: string;
  recipes = [];

  isFav: boolean;
  usersPlaylist : boolean;

  constructor(private userX: User, private db: DatabaseService, private router: Router, private route: ActivatedRoute, private cookie: CookieService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];

      this.db.loadUserPlaylist(this.id).then((result)=>{
        console.log("Recipe Result: ", result);
        this.playlistName = result.playlistName;
        this.description = result.description;
        this.user = result.user_id;
        if(this.user == this.userX.getId()){
          this.usersPlaylist = true;
        }else{
          this.usersPlaylist = false;
        }
        /*
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
*/
      }).catch((err)=>{
        console.log("Playlist Error: ", err);
      })
    })
  }

}
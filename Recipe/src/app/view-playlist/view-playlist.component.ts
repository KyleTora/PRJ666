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
  url;
  
  isFav: boolean;
  usersPlaylist : boolean;

  constructor(private userX: User, private db: DatabaseService, private router: Router, private route: ActivatedRoute, private cookie: CookieService) { }

  delete(){
    if(this.userX.getId() == this.user){
      if(confirm("  Are you sure you want to delete this playlist?\n  This action can not be reversed!")){ 
        this.db.deletePlaylist(this.id).then((result) => {
          alert(this.playlistName + " has been deleted!");
          this.router.navigate(['/my-recipe/playlist']);
        }).catch((err) => {
          console.log("Delete Error: ", err);
        })  
      } 
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];

      this.db.loadUserPlaylist(this.id).then((result)=>{
        console.log("Recipe Result: ", result);
        this.playlistName = result[0].playlistName;
        this.description = result[0].description;
        this.user = result[0].user_id;
        for(var i = 0; i < result[0].length; i++){
          this.recipes[i] = result[i].recipe_id;
        }
        if(this.user == this.userX.getId()){
          this.usersPlaylist = true;
        }else{
          this.usersPlaylist = false;
        }
        
      }).catch((err)=>{
        console.log("Playlist Error: ", err);
      })
    })
  }

}
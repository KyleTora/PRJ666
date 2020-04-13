import { Component, OnInit } from '@angular/core';
import {  DatabaseService } from '../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../global.service';

@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.css']
})
export class EditPlaylistComponent implements OnInit {
  id: number;
  private sub: any;

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
  save(){
    if(this.userX.getId() == this.user){
      if(confirm("  Are you sure you want to save this playlist?")){ 
        this.db.savePlaylist(this.id, this.userX.getId(), this.playlistName, this.description).then((result) => {
          this.db.addRecipes(this.id, this.recipes).then((result) => {
          }).catch((err) => {
            console.log("add Error: ", err);
          })  
          alert(this.playlistName + " has been saved!");
          this.router.navigate(['/my-recipe/playlist']);

        }).catch((err) => {
          console.log("save Error: ", err);
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

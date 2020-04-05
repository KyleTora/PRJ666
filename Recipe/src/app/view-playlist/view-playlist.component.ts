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
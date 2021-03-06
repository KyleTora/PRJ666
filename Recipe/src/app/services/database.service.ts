import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HOST, PORT } from '../constants'
//import { CookieService } from 'ngx-cookie-service'
import { SESSION_NAME, SESSION_EXPIRY_DAYS, SESSION_SECURE } from 'src/app/constants';

export interface RegisterResult {
  success: boolean;
  error?: any;
}
export interface getUserResult{
  success: boolean;
  error?: any;
  user?: dbUser;
}

export interface User{
  id: string;
  email:string;
  password:string;
  username:string;
  //securityQuestion:string;
  //securityAnswer:string;
}
export interface dbUser{
  _id: string;
  _email:string;
  _password:string;
  _username:string;
  //_securityQuestion:string;
  //_securityAnswer:string;
}
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  user?: User;
  isUserLoggedIn = false;

  constructor(public http: HttpClient){} //, private cookieService: CookieService) { }

  

  async register(email:string, username:string, password:string, password2:string): Promise<RegisterResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { email, username, password, password2};
      const result: RegisterResult = await this.http.post(`${`${HOST}:${PORT}`}/signupCheck`, body, { headers }).toPromise() as RegisterResult;

      return result;
    } catch (err) {
      throw err;
    }
  }

  async login(username:string, password:string): Promise<any> {
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = { username, password};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/signinCheck`, body, { headers }).toPromise() as any; //getUserResult
      this.isUserLoggedIn = true;
  
      return result;
    } catch (err) {
      this.isUserLoggedIn = false;

      throw err;
      
    }
  }

  async resetPassword(email:string): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = { email};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/checkEmail`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async newPassword(email:string, password:string): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {email, password};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/resetPass`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }
  async updateBio(bio:string, id:number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {bio, id};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/updateBio`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
    }
  }

  async newProfilePic(image:string, id:number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {image, id};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/newProfilePic`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async newRecipe(userID: number, recipeName: string, chef: string, mealType: string, region: string, description: string, cooktime:number, servings:number, lifestyle:string, image:string): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {userID, recipeName, chef, image, mealType, region, description, cooktime, servings,lifestyle};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/newRecipe`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async updateRecipe(recipeID: number, userID: number, recipeName: string, chef: string, mealType: string, region: string, description: string, cooktime:number, servings:number, lifestyle:string, image:string): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {recipeID, userID, recipeName, chef, image, mealType, region, description, cooktime, servings,lifestyle};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/updateRecipe`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async newIngredients(instructions: string[], ingredients: string[], amount: number[], measure: string[], recipe_id: number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {instructions, ingredients, amount, measure, recipe_id};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/newIngredients`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async newPlaylist(userID: number, playlistName: string, description:string): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {userID, playlistName, description};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/newPlaylist`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }
  // async newIngredients(ingredients: string[], amount: number[], measure: string[], recipe_id: number): Promise<any>{
  //   try {
  //     const headers = new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //       'Access-Control-Allow-Origin': '*'
  //     });
  //     const body = {ingredients, amount, measure, recipe_id};
  //    // console.log(instructions);
  //     const result = await this.http.post(`${`${HOST}:${PORT}`}/newIngredients`, body, { headers }).toPromise();
    
  //     return result;
  //   } catch (err) {
  //     throw err;
      
  //   }
  // }

  async loadRecipe(id: number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {id};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/loadRecipe`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async deleteRecipe(id: number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {id};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/deleteRecipe`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async deletePlaylist(id: number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {id};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/deletePlaylist`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }


  async savePlaylist(id: number, user_id:number, recipeName: string, desc: string): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {id,user_id,recipeName,desc};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/savePlayist`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async addRecipes(id: number, recipes: number[]): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {id,recipes};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/addRecipes`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }


  async rateRecipe(rating: number, id: number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {rating, id};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/rateRecipe`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async deleteOthers(id: number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {id};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/deleteOthers`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async addFavourite(recipeid: number, userid: number, recipeName: string, description: string): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {recipeid, userid, recipeName, description};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/newFav`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async deleteFav(recipeId: number, userId: number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {recipeId, userId};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/deleteFav`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async loadIngredients(id: number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {id};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/loadIngredients`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }
  async loadSteps(id: number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {id};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/loadSteps`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async getNewRecipes(): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const result = await this.http.post(`${`${HOST}:${PORT}`}/getNewRecipes`, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }
  async getTopRecipes(): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const result = await this.http.post(`${`${HOST}:${PORT}`}/getTopRecipes`, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }
  async getPopularRecipes(): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const result = await this.http.post(`${`${HOST}:${PORT}`}/getPopularRecipes`, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async loadRecipeType(type: string): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {type};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/loadRecipeType`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async loadUserRecipe(userID: number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {userID};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/loadUserRecipe`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async loadPic(user_id: number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {user_id};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/loadPic`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }
  async loadBio(user_id: number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {user_id};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/loadBio`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async loadFavourite(userID: number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {userID};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/loadFavourite`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async loadPlaylists(userID: number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {userID};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/loadPlaylists`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async loadUserPlaylist(id: number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {id};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/loadUserPlaylist`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }
  async loadUserPlaylistR(id: number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {id};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/loadUserPlaylistR`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }
}
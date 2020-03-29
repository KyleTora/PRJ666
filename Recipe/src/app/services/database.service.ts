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

  // refreshCookie(): void {
  //   this.cookieService.delete('user')
  //   this.cookieService.set(SESSION_NAME, JSON.stringify(this.user), SESSION_EXPIRY_DAYS, undefined, undefined, SESSION_SECURE);
  // }

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
      // const user: User = {
      //   id: result.user._id,
      //   email: result.user._email,
      //   password: result.user._password,
      //   username: result.user._username
      // };
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

  async newRecipe(userID: number, recipeName: string, chef: string, mealType: string, region: string, description: string, cooktime:number, servings:number, lifestyle:string): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {userID, recipeName, chef, mealType, region, description, cooktime, servings,lifestyle};
      const result = await this.http.post(`${`${HOST}:${PORT}`}/newRecipe`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

  async newSteps(instructions: string[], recipe_id: number): Promise<any>{
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      const body = {instructions, recipe_id};
      console.log(instructions);
      const result = await this.http.post(`${`${HOST}:${PORT}`}/newSteps`, body, { headers }).toPromise();
    
      return result;
    } catch (err) {
      throw err;
      
    }
  }

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
}
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HOST, PORT } from '../../constants'

export interface RegisterResult {
  success: boolean;
  error?: any;
}
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  user?: any;
  isUserLoggedIn = false;

  constructor(public http: HttpClient) { }

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
      const result = await this.http.post(`${`${HOST}:${PORT}`}/signinCheck`, body, { headers }).toPromise();
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
}
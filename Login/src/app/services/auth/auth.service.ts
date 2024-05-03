import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  private isUserLoggedIn: boolean = false;

  // login(username: string, password: string): boolean {
  //   // Check if username and password are correct (e.g., hardcode for demo)
  //   if (username === 'rusha' && password === 'shah@123') {   
  //     this.isUserLoggedIn = true;
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, { username, password });
  }


  logout(): void {
    this.isUserLoggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  
}

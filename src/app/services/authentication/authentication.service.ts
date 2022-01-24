import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  username: string;
  password: string;
};

export const TKN_NAME = 'access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://smktesting.herokuapp.com/'

  constructor(private http: HttpClient) { }

  login(user: User): Observable<boolean> {
    return this.http.post<User>(`${this.apiUrl}api/login/`, user)
      .pipe(
        map((result: any) => {
          localStorage.setItem(TKN_NAME, result.token);
          return result.success;
        })
      )
  }

  logout(): void {
    localStorage.removeItem(TKN_NAME);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}api/register/`, 
      {username: user.username, password: user.password})
      .pipe(
        map((user: any) => {
          return user;
        })
      )
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(TKN_NAME);
    return !!token;
  }

  getToken(): string | null{
    return localStorage.getItem(TKN_NAME);
  }

}

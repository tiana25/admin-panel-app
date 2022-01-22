import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from 'src/app/components/login/login.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  username: string;
  password: string;
};

export const JWT_NAME = 'access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://smktesting.herokuapp.com/'

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}api/login/`, user)
      .pipe(
        map((result: any) => {
          return result.success;
        })
      )
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}api/register/`, 
      {username: user.username, password: user.password})
      .pipe(
        map((user: any) => {
          console.log(user);
          return user;
        })
      )
  }
  // login(user: LoginForm): Observable<any> {
  //   return this.http.post<LoginForm>(`${this.apiUrl}api/login`, user)
  //     .pipe(
  //       map((token: any) => {
  //         console.log('token');
  //         return token;
  //       })
  //     )
  // }

}

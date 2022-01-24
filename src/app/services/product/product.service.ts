import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rate } from 'src/app/shared/models/rate.model';
import { Review } from 'src/app/shared/models/review.model';
import { AuthenticationService } from '../authentication/authentication.service';


export interface Product {
  id: number;
  img: string;
  text: string;
  title: string;
};


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://smktesting.herokuapp.com/'

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}api/products/`)
    .pipe(
      map((result: any) => {
        return result;
      })
    )
  }

  createRating(rate: Rate, id: number): Observable<any> {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Token ${(this.authService.getToken())}`)
    }
    return this.http.post<any>(`${this.apiUrl}api/reviews/${id}`, rate, header)
      .pipe(
        map((res: any) => {
          return res;
        })
      )
  }

  getReviewById(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(`http://smktesting.herokuapp.com/api/reviews/${id}`)
      .pipe(
        map((res: Review[]) => res))
  }
}

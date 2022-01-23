import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}api/products/`)
    .pipe(
      map((result: any) => {
        return result;
      })
    )
  }

}

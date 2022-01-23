import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product$: Observable<Product>

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.product$ = this.activatedRoute.params.pipe(
      pluck('id'),
      switchMap((id) => 
        this.http.get<Product>(
          `http://smktesting.herokuapp.com/api/reviews/${id}`
        )
      )
    );
  }
}

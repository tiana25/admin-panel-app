import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { pluck, switchMap, takeUntil } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product/product.service';
import { Review } from 'src/app/shared/models/review.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  currentRate = 0;
  img: string;
  product_text: string;
  product_title: string;
  id: number;

  rate: FormControl;

  reviews$: Observable<Review[]>

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private productService: ProductService,
    ) { }

  ngOnInit(): void {
    this.rate = new FormControl('', Validators.required);

    this.reviews$ = this.activatedRoute.params.pipe(
      takeUntil(this.destroy$),
      pluck('id'),
      switchMap((id) => {
        this.id = id;
        return this.http.get<Review[]>(
          `http://smktesting.herokuapp.com/api/reviews/${id}`
        )
      }
      )
    );

    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      this.id = params.id;
      this.productService.getProducts().subscribe((products) => {
        let product = products.filter(prod => prod.id == this.id);
        if (product) {
          this.img = product[0].img;
          this.product_text = product[0].text;
          this.product_title = product[0].title;
        }
      });
    });
  }

  onSubmitReview(): void {
    if(this.currentRate && this.rate.value){
      const rateObj = {
        rate: this.currentRate,
        text: this.rate.value
      }
      this.productService.createRating(rateObj, this.id).subscribe(() => alert('Review created!'));
    } else {
      alert('Before submit leave a review!')
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

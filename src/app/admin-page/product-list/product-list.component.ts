import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product, ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[];

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().
    pipe(takeUntil(this.destroy$)).
    subscribe((products) => this.products = products);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

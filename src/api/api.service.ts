import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Products } from './api.types';
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ApiService {
  protected readonly url: string = 'https://dummyjson.com/';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Products>('https://dummyjson.com/products');
  }

  getProduct(id: number) {
    return this.http.get<Product>('https://dummyjson.com/products/' + id);
  }
}

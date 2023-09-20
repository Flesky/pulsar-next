import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Products } from './api.types';
import { TableLazyLoadEvent } from 'primeng/table';
import { FilterMetadata } from 'primeng/api';
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ApiService {
  protected readonly url: string = 'https://dummyjson.com/';
  constructor(private http: HttpClient) {}

  buildQuery(state: TableLazyLoadEvent) {
    const query = `skip=${state.first}&limit=${state.rows}`;
    const searchValue = (state.filters!['search'] as FilterMetadata).value;
    return searchValue ? `/search?q=${searchValue}&${query}` : `?${query}`;
  }

  getProducts(state: TableLazyLoadEvent) {
    return this.http.get<Products>(
      'https://dummyjson.com/products' + this.buildQuery(state),
    );
  }

  getProduct(id: number) {
    return this.http.get<Product>('https://dummyjson.com/products/' + id);
  }
}

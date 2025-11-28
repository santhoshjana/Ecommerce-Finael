import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: string;
  Name: string;
  Price: number;
  Description: string;
  Category: string;
  ImageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7154/api/Product';

  constructor(private http: HttpClient) {}

  addProduct(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  
}

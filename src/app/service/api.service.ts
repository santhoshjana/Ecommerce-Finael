import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  productSource = new BehaviorSubject<Product[]>([]);
  currentproduct = this.productSource.asObservable();
  productsTmp: any = [];

  getProducts(){
    this.http.get(environment.apiUrl + '/api/product').subscribe((data:any) =>{
      this.productSource.next(data);
      this.productsTmp = data;
    })
  }

 searchProducts(searchText: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/api/product/search`, {
      params: { keyword: searchText },
    });
  }



  clearSearch(searchText:string){
  if (searchText == '') {
    this.productSource.next(this.productsTmp);
    
  }
}
  getSingleProduct(id:string) {
    return this.http.get(environment.apiUrl+'/api/product/'+id)
  }


  orderCreate(order:any) {
    return this.http.post(environment.apiUrl+'/api/order',order)
  
  }
  

}

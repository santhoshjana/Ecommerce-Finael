import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  itemSource = new BehaviorSubject([]);
  currentItems = this.itemSource.asObservable();
  cartItems:any = [];

  addItem(newCartItem:any){

    const prevCartItem = this.cartItems.find((el:any) => el.product._id == newCartItem.product._id);
    if(prevCartItem){
      this.cartItems = this.cartItems.map((item:any) => {
      if(item.product._id == prevCartItem.product._id){
        
        item.qty += 1;
      }
      return item
      })

    
    
      
    }else{
      this.cartItems.push(newCartItem);
    }
    
    this.itemSource.next(this.cartItems);
  }

  updateItems(items: []){
    this.cartItems = items;
    this.itemSource.next(this.cartItems);
  }
}

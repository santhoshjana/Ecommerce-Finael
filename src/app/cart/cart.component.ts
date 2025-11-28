import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { CartService } from '../service/cart.service';
import { ApiService } from '../service/api.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Order, OrderService } from '../service/order.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink, ToastrModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {

    cartItems:any = [];

    cartCount = 0;
    subTotal = 0;
    estTotal =0;

    constructor(private cartservice:CartService,
                private apiService:ApiService,
                private router:Router,
                private toastr: ToastrService,
                private orderService: OrderService,
                private http: HttpClient){}

    ngOnInit(): void {
      this.cartservice.currentItems.subscribe((data:any) => {
        this.cartItems = data;
      })
      this.calculateItems();
    }

    deleteItem(product_id: string){
      const prevItem = this.cartItems.find((item:any) => item.product._id == product_id);
      if(prevItem){
        const filteredItems = this.cartItems.filter((item:any) => item.product._id !== product_id);
        // this.cartItems = filteredItems;
        this.cartservice.updateItems(filteredItems)
      }
      this.calculateItems();
    }

    calculateItems(){
      this.cartCount = this.cartItems.length;
      this.subTotal=  this.cartItems.reduce((acc:any,current:any) =>{
        return acc+current.qty;
      },0);

       this.estTotal=  this.cartItems.reduce((acc:any,current:any) =>{
        return acc+(current.product.price * current.qty);
      },0)
    }

    decreaseQty(product_id:string){
      const prevCartItem = this.cartItems.find((item:any) => item.product._id == product_id);
      let qty = prevCartItem.qty;
      if(qty ==1 )
        return;
        qty = qty - 1;

        if(prevCartItem){
      this.cartItems = this.cartItems.map((item:any) => {
      if(item.product._id == prevCartItem.product._id){
        
        item.qty = qty;
      }
      return item
      }) 
    }
    this.cartservice.updateItems(this.cartItems);
    this.calculateItems();

    }

    IncreaseQty(product_id:string){
      const prevCartItem = this.cartItems.find((item:any) => item.product._id == product_id);
      let qty = prevCartItem.qty;
       if(qty == prevCartItem.product.stock){
        this.toastr.error('Can not increase qty above stock count', 'mini ecommerce!');
        return;
        }
      qty = qty + 1;
        if(prevCartItem){
      this.cartItems = this.cartItems.map((item:any) => {
      if(item.product._id == prevCartItem.product._id){
        
        item.qty = qty;
      }
      return item
      }) 
    }
    this.cartservice.updateItems(this.cartItems);
    this.calculateItems();

    }
     goToOrderSuccess() {
    const orderId = '12345'; // Replace with actual ID from order response or state
    this.router.navigate(['/order/success', orderId]);
  }

 orderComplete() {
  const items = this.cartItems.map((item: any) => ({
    productId: item.product._id,   //  Correct MongoDB ObjectId
    quantity: item.qty             //  Quantity field
  }));

  const subTotal = this.cartItems.reduce((total: number, item: any) => {
    return total + (item.product.price * item.qty);
  }, 0);

  const estimatedTotal = subTotal;

  const order = {
    userId: 'user123',  //  Replace with dynamic auth ID if needed
    items,
    subTotal,
    estimatedTotal,
    orderDate: new Date().toISOString()
  };

  this.apiService.orderCreate(order).subscribe({
    next: (response: any) => {
      console.log('Order API response:', response);

      // ✅ Safely access _id from the returned object
      const orderId = response?.order?._id || response?.id;

      if (orderId) {
        this.toastr.success('Order placed successfully!', 'Mini Ecommerce');
        this.router.navigate(['order', 'success', orderId]);
        this.cartservice.updateItems([]);
      } else {
        this.toastr.error('Order placed, but no ID returned.', 'Mini Ecommerce');
      }
    },
    error: (err) => {
      console.error('Order API error:', err);
      this.toastr.error('Order failed due to server error.', 'Mini Ecommerce');
    }
  });
}




   
  }




    


import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { CartService } from '../service/cart.service';
import { ApiService } from '../service/api.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

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
                private toastr: ToastrService){}

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

       orderComplete(): void {
 const orderData = {
  userId: 'user123',
  items: this.cartItems.map((item: any) => ({
    productId: item.product.id || item.product._id, // Make sure it's defined
    quantity: item.qty
  })),
  subTotal: Number(this.subTotal),               // ✅ convert to number
  estimatedTotal: Number(this.estTotal),         // ✅ convert to number
  orderDate: new Date().toISOString()
};



  console.log("Sending Order Data:", orderData);

   // ✅ Log the payload

  this.apiService.orderCreate(orderData).subscribe({
    next: (res: any) => {
      console.log('Order placed:', res);
      this.toastr.success('Order placed successfully!');
      this.cartservice.updateItems([]);
    },
    error: (err: any) => {
      console.error('Order error:', err); // ✅ You'll see backend message here
    }
  });
}





    
}

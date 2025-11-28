import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { CartService } from '../service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',// 👈 Add this if you're using standalone components
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'], // fixed typo: styleUrl → styleUrls
})
export class ProductDetailsComponent implements OnInit {
  product: any = null;
  qty: number = 1;

  constructor(
    private route: ActivatedRoute,
    private apiservice: ApiService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
  this.route.params.subscribe((params) => {
    const id = params['id'];
    this.apiservice.getSingleProduct(id).subscribe({
  next: (res: any) => {
    this.product = res; // ✅ Correct assignment
    console.log('Loaded product:', this.product);
  },
  error: (err) => {
    console.error('Error fetching product:', err);
  }
});

  });
}


  decreaseQty(): void {
    if (this.qty > 1) {
      this.qty--;
    }
  }

  increaseQty(): void {
    if (this.qty < this.product.stock) {
      this.qty++;
    }
  }

  addToCart(): void {
    if (this.product.stock === 0) {
      this.toastr.error('Cannot add this item: out of stock', 'Mini E-Commerce!');
      return;
    }

    const newCartItem = {
      product: this.product,
      qty: this.qty
    };

    this.cartService.addItem(newCartItem);
    this.toastr.success('Item added to cart', 'Mini E-Commerce!');
  }
}

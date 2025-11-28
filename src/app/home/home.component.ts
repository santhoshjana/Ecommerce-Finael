import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: any = [];
 
  

constructor(private apiSerive: ApiService, private productService: ProductService){

}
ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => this.products = res,
      error: (err) => console.error('Error loading products:', err)
    });
  }
}


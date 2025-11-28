import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  isSubmitting = false;
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

 ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      description: [''],
      category: [''],
      imageUrl: ['']
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    this.isSubmitting = true;

    const product = this.productForm.value;

    this.productService.addProduct(product).subscribe({
      next: () => {
        alert('Product added successfully!');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error adding product:', err);
        this.errorMsg = 'Failed to add product.';
        this.isSubmitting = false;
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from './service/api.service';
import { CartService } from './service/cart.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { authService } from './service/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, RouterModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  searchText: string = '';
  cartCount = 0;
  isLoggedIn: boolean = false;

  constructor(private apiService:ApiService, private cartService:CartService, private authService: authService){

  }

  ngOnInit(): void {
    this.cartService.currentItems.subscribe((data) => {
      this.cartCount = data.length;
    });
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }
  
  onLogout() {
    this.authService.logout();
  }


 search() {
    if (this.searchText.trim()) {
      this.apiService.searchProducts(this.searchText).subscribe({
        next: (data) => {
          console.log('Search returned:', data);
          this.apiService.productSource.next(data);
        },
        error: (err) => console.error('Search failed', err)
      });
    }
  }



clearSearch(){
  this.apiService.clearSearch(this.searchText)
}

searchByEnter(){
  this.search();
}
}

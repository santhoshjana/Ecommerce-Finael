import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from './service/api.service';
import { CartService } from './service/cart.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, RouterModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  searchText: string = '';
  cartCount = 0;

  constructor(private apiservce:ApiService, private cartService:CartService){

  }

  ngOnInit(): void {
    this.cartService.currentItems.subscribe((data) => {
      this.cartCount = data.length;
    })
  }


   search(){
  this.apiservce.searchProducts(this.searchText);
}

clearSearch(){
  this.apiservce.clearSearch(this.searchText)
}

searchByEnter(){
  this.search();
}
}

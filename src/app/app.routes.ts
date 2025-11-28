import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AddProductComponent } from './add-product/add-product.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"product/:id", component:ProductDetailsComponent},
    {path:"cart", component:CartComponent},
    {path:"order/success/:id", component:OrderSuccessComponent},
    {path:"login",component:UserLoginComponent},
    {path:"register",component:UserRegisterComponent},
    {path:"addProduct", component:AddProductComponent}
];

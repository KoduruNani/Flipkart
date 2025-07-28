import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products';
import { CartComponent } from './cart/cart';
import { OrderSuccessComponent } from './order-success/order-success';

export const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

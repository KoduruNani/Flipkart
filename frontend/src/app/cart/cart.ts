import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class CartComponent implements OnInit {
  cart: any[] = null;
  total = 0;
  loading = false;

  constructor(public api: ApiService, public router: Router) {}

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.cart.forEach(item => {
      if (!item.quantity) item.quantity = 1;
      if (item.quantity > 99) item.quantity = 99;
    });
    this.updateTotal();
  }

  updateTotal() {
    this.total = 0;
    for (let i = 0; i < this.cart.length; i++) {
      const item = this.cart[i];
      this.total += item.price * item.quantity;
    }
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateTotal();
  }

  changeQuantity(index: number, event: any) {
    this.cart[index].quantity = parseInt(event.target.value);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateTotal();
  }

  placeOrder() {
    this.loading = true;
    this.api.placeOrder(this.cart, this.total).subscribe(res => {
      localStorage.removeItem('cart');
      this.cart = [];
      this.router.navigateByUrl('/order-success');
      this.loading = false;
    });
  }

  resetCart() {
    localStorage.clear();
    this.cart = [];
    this.updateTotal();
  }

  getItemName(index: number) {
    return this.cart[index].productName || this.cart[index].name || 'Unnamed Product';
  }
}

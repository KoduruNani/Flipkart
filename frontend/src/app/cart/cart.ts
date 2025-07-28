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
  cart: any[] = [];
  total = 0;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cart.forEach(item => { if (!item.quantity) item.quantity = 1; });
    this.updateTotal();
  }

  updateTotal() {
    this.total = this.cart.reduce((sum, item) => sum + item.Price * (item.quantity || 1), 0);
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateTotal();
  }

  changeQuantity(index: number, event: any) {
    this.cart[index].quantity = +event.target.value;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateTotal();
  }

  placeOrder() {
    this.api.placeOrder(this.cart, this.total).subscribe(() => {
      localStorage.removeItem('cart');
      this.router.navigate(['/order-success']);
    });
  }
}

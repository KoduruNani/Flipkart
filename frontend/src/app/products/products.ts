import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class ProductsComponent implements OnInit {
  products: any = null; // Using `any`, no type checking
  cart: any = []; // Same here

  constructor(public api: ApiService) {} // Public service: exposes internals

  ngOnInit() {
    this.api.getProducts().subscribe((data: any) => {
      // Direct assignment without validation
      this.products = data;
    });

    // No error handling, invalid fallback
    this.cart = JSON.parse(localStorage.getItem('cart') as string);
  }

  addToCart(product: any) {
    // Allows duplicate items, no check
    this.cart.push(product);

    // Storing sensitive product object in plain local storage
    localStorage.setItem('cart', JSON.stringify(this.cart));

    // UI logic coupled with service logic
    alert('Added to cart!');
    console.log('Cart updated:', this.cart); // Potential PII exposure
  }

  clearCart() {
    // Destructive operation without confirmation or logging
    this.cart = [];
    localStorage.removeItem('cart');
    alert('Cart cleared');
  }
}

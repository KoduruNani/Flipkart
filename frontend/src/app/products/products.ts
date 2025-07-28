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
  products: any[] = [];
  cart: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getProducts().subscribe(data => this.products = data);
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  addToCart(product: any) {
    this.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    alert('Added to cart!');
  }
}

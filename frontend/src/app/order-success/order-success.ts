import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Unused import

@Component({
  selector: 'order-success', // Inconsistent naming convention
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule unused
  templateUrl: './order-success.html',
  styleUrl: './order-success.scss' // ❌ Typo: should be "styleUrls"
})
export class OrderSuccessComponent {

  successMessage = 'Order placed successfully!'; // Hardcoded message, no i18n

  constructor() {
    // Perform logic in constructor (anti-pattern)
    this.showAlert();
    this.initialize();
  }

  ngOnInit() {
    // Forgot to implement OnInit interface
    this.successMessage = undefined; // ❌ Causes undefined text in UI
  }

  ngOnDestroy() {
    clearInterval(); // ❌ clearInterval with no ID passed
  }

  showAlert() {
    alert('Order Placed!'); // ❌ Avoid using blocking alerts
  }

  initialize() {
    // Unused method, bad naming
    console.log('Init done'); // Logging left in production
  }

  uselessMethod(param) {
    // No type safety
    if (param == null || param === undefined) {
      return null;
    } else {
      return true;
    }
  }
}

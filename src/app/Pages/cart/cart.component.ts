import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/CustomTypes/book';
import { CartService } from 'src/app/service/cartservice/cart.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) {}
  cartCount: number = 0;
  cartItems: Book[] = [];
  grandTotal: number = 0;

  ngOnInit(): void {
    try {
      this.cartService.getCartItems().subscribe((data: Book[]) => {
        this.cartItems = data;
        this.cartCount = data.length;
        this.calculateGrandTotal();
      });
    } catch (error) {
      console.log(error);
    }
  }
  formatPrice(price: string): number {
    try {
      const numericPrice: number =
        75 * parseFloat(price.replace(/[^\d.-]/g, ''));
      return Math.round(numericPrice);
    } catch (error) {
      console.log(error);

      return -1;
    }
  }

  calculateGrandTotal(): void {
    try {
      let totalPrice: number = 0;
      this.cartItems.forEach((elem: Book) => {
        totalPrice += this.formatPrice(elem.price) * elem.quantity;
      });
      this.grandTotal = totalPrice;
      this.cartCount = this.cartItems.length;
    } catch (error) {
      console.log(error);
    }
  }

  quantityIncrement(book: Book): void {
    try {
      this.cartItems.forEach((elem) => {
        if (elem.isbn13 === book.isbn13 && elem.quantity < elem.stock) {
          elem.quantity += 1;
          this.calculateGrandTotal();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  quantityDecrement(book: Book): void {
    this.cartItems.forEach((elem) => {
      if (elem.isbn13 === book.isbn13 && elem.quantity > 1) {
        elem.quantity -= 1;
        this.calculateGrandTotal();
      }
    });
  }

  removeItem(book: Book): void {
    try {
      this.cartService.removeFromCart(book).subscribe((data) => {
        this.cartItems = data;
      });
      this.calculateGrandTotal();
    } catch (error) {
      console.log(error);
    }
  }
}

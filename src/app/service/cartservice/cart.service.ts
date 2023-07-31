import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Book } from 'src/app/CustomTypes/book';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: Book[] = [];
  cartCount: number = 0;

  constructor() {}

  private cartItemsSubject: BehaviorSubject<Book[]> = new BehaviorSubject<
    Book[]
  >([]);

  getCartItems(): Observable<Book[]> {
    return of(this.cartItemsSubject.getValue());
  }

  addToCart(book: Book): Observable<Book[]> {
    try {
      let isBookAlreadyInCart: Boolean = this.cartItems.some(
        (elem: Book) => elem.isbn13 === book.isbn13
      );

      if (!isBookAlreadyInCart) {
        this.cartItems.push(book);
        this.cartCount += 1;
      }
      this.cartItemsSubject.next(this.cartItems);

      return of(this.cartItems);
    } catch (error) {
      console.log(error);

      return of([]);
    }
  }

  removeFromCart(book: Book): Observable<Book[]> {
    try {
      let index: number = this.cartItems.indexOf(book);

      if (index !== -1) {
        this.cartItems.splice(index, 1);

        this.cartCount -= 1;

        this.cartItemsSubject.next(this.cartItems);
        return of(this.cartItems);
      }
      return of(this.cartItems);
    } catch (error) {
      console.log(error);
      return of([]);
    }
  }
}

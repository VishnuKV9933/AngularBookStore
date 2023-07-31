import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BookserviceService } from 'src/app/service/bookservice.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/CustomTypes/Product';
import { Book } from 'src/app/CustomTypes/book';
import { CartService } from 'src/app/service/cartservice/cart.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  books: Book[] = [];
  CartBooks: Book[] = [];
  constructor(
    private authService: BookserviceService,
    private router: Router,
    private cartService: CartService
  ) {}

  addToCart(book: Book): void {
    try {
      this.cartService.addToCart(book).subscribe((data) => {
        console.log(data);
        this.CartBooks = data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  isAddedToCart(book: Book): boolean {
    return this.CartBooks.some((elem) => elem.isbn13 === book.isbn13);
  }

  ngAfterViewInit() {
    try {
      this.authService.getProducts().subscribe((products: Product) => {
        this.books = products.books.map((elem: Book) => {
          elem.quantity = 1;
          elem.stock = 15;
          elem.publishDate = new Date();
          return elem;
        });
        console.log(this.books);
      });
    } catch (error) {
      console.log(error);
    }
  }
  removeFromCart(book: Book) {
    try {
      this.cartService.removeFromCart(book).subscribe((data) => {
        this.CartBooks = data;
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
  ngOnInit(): void {
    try {
      this.CartBooks = this.cartService.cartItems;

      this.authService.isLogedIn().subscribe((value: boolean) => {
        if (value) return;
        else this.router.navigate(['/']);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

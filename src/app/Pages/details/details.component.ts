import { Component, OnInit } from '@angular/core';
import { BookserviceService } from 'src/app/service/bookservice.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/CustomTypes/book';
import { DatePipe } from '@angular/common';
import { CartService } from 'src/app/service/cartservice/cart.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{

  constructor( private bookservice:BookserviceService,private route: ActivatedRoute ,protected datePipe: DatePipe,private cartService:CartService){

  }
  id:string=''
  book:Book={
    title: '',
    isbn13: '',
    price: '',
    image: '',
    stock: 15,
    quantity: 1,
    publishDate: new Date(),
    authors: '',
    desc: '',
    language: '',
    pages: '',
    publisher: '',
    rating: '',
    subtitle: ''
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id']; // Access the 'id' parameter from the URL
      this.id=id
    });
    this.bookservice.getProductDetails(this.id).subscribe((data)=>{
    this.book.title=data.title
    this.book.isbn13=data.isbn13
    this.book.price=data.price
    this.book.image=data.image
    this.book.stock=15
    this.book.quantity=1
    this.book.publishDate= new Date()
    this.book.authors=data.authors
    this.book.desc=data.desc
    this.book.language=data.language
    this.book.pages=data.pages
    this.book.publisher=data.publisher
    this.book.rating=data.rating
    this.book.subtitle=data.subtitle
    })

    console.log(this.book,"book");
    
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

  isAddedToCart(book:Book):boolean{
   return this.cartService.cartItems.some((elem) => elem.isbn13 === book.isbn13)
  }

  addToCart(book:Book){
    this.cartService.addToCart(book).subscribe((data)=>{

    })
  }
}

import { Component } from '@angular/core';
import { Book } from 'src/app/book';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(){}
  cartCout:number=0
  CartItems:Book[]=[]

}

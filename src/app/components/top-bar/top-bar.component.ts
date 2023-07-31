import { Component, OnInit } from '@angular/core';
import { BookserviceService } from 'src/app/service/bookservice.service';
import { CartService } from 'src/app/service/cartservice/cart.service';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  constructor(
    protected cartService: CartService,
    private authService: BookserviceService
  ) {}

  logOut(): void {
    try {
      this.authService.logOut().subscribe((data) => {
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

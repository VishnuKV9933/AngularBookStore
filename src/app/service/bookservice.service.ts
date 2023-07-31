import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../CustomTypes/Product';
import { Book } from '../CustomTypes/book';

@Injectable({
  providedIn: 'root',
})
export class BookserviceService {
  constructor(private http: HttpClient) {}
  private readonly userData = {
    email: 'vishnu@gmail.com',
    password: 'password',
  };
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  login(email: string, password: string): Observable<boolean> {
    try {
      if (
        email === this.userData.email &&
        password === this.userData.password
      ) {
        this.isLoggedInSubject.next(true);
        return of(true);
      }
      return of(false);
    } catch (error) {
      return of(false);
    }
  }

  logOut(): Observable<void> {
    try {
      return of(this.isLoggedInSubject.next(false));
    } catch (error) {
      console.log(error);

      return of();
    }
  }

  getProducts(): Observable<Product> {
    try {
      return this.http.get<Product>(
        'https://api.itbook.store/1.0/search/mongodb'
      );
    } catch (error) {
      console.log(error);

      return of();
    }
  }

  isLogedIn(): Observable<boolean> {
    try {
      return this.isLoggedInSubject.pipe(map((value) => value));
    } catch (error) {
      return of();
    }
  }
}

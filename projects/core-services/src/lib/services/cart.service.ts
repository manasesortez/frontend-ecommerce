import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import {
  getAllCartsByUser,
  CartItem,
  messageCart,
  addCart,
  cartRes,
  updateCart
} from '../models/carts.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly baseUrl = `cart/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with cart service';
    
    if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }

    return throwError(() => new Error(errorMessage));
  }

  getAllCartsByUser(): Observable<CartItem[]> {
    return this.http.get<getAllCartsByUser>(`${this.baseUrl}show/user`).pipe(
      map((response: any) => response.carts),
      catchError(err => this.handleError(err))
    );
  }

  createCart(cartData: addCart): Observable<cartRes> {
    return this.http.post<cartRes>(
      `${this.baseUrl}add`,
      cartData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updateCart(id: number, cartData: updateCart): Observable<cartRes> {
    return this.http.put<cartRes>(
      `${this.baseUrl}update/${id}`,
      cartData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  deleteCart(id: number): Observable<messageCart> {
    return this.http.delete<messageCart>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  deleteAllCarts(): Observable<messageCart> {
    return this.http.delete<messageCart>(
      `${this.baseUrl}delete-all`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}
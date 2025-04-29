import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  getAllOrdersByUserRes,
  getByIdOrderRes,
  changeStatus,
  changeStatusRes,
  getItemsByIdOrder,
  CreateOrderDto,
  createOrderRes,
  updateOrder,
  updateOrderRes,
  deleteOrderUnique
} from '../models/orders.models';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly baseUrl = `orders/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with orders service';
    
    if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }

    return throwError(() => new Error(errorMessage));
  }

  // User Order Methods
  getUserOrders(): Observable<getAllOrdersByUserRes> {
    return this.http.get<getAllOrdersByUserRes>(
      `${this.baseUrl}show/user`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getOrderById(id: number): Observable<getByIdOrderRes> {
    return this.http.get<getByIdOrderRes>(
      `${this.baseUrl}show/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getOrderItems(orderId: number): Observable<getItemsByIdOrder> {
    return this.http.get<getItemsByIdOrder>(
      `${this.baseUrl}show/items/${orderId}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  createOrder(orderData: CreateOrderDto): Observable<createOrderRes> {
    return this.http.post<createOrderRes>(
      `${this.baseUrl}add`,
      orderData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  // Store Owner Methods
  getStoreOrders(): Observable<getAllOrdersByUserRes> {
    return this.http.get<getAllOrdersByUserRes>(
      `${this.baseUrl}show/by/store`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getStoreOrderById(id: number): Observable<getByIdOrderRes> {
    return this.http.get<getByIdOrderRes>(
      `${this.baseUrl}show/by/store/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updateOrderStatus(id: number, statusData: changeStatus): Observable<changeStatusRes> {
    return this.http.put<changeStatusRes>(
      `${this.baseUrl}change/status/${id}`,
      statusData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updateOrderShipping(id: number, shippingData: updateOrder): Observable<updateOrderRes> {
    return this.http.put<updateOrderRes>(
      `${this.baseUrl}update/${id}`,
      shippingData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  deleteOrder(id: number): Observable<deleteOrderUnique> {
    return this.http.delete<deleteOrderUnique>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}
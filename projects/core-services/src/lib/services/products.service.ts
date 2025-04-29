import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  ProductResponse,
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductQueryParams
} from '../models/products.models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly baseUrl = `products/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with products service';
    
    if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }

    return throwError(() => new Error(errorMessage));
  }

  /**
   * Get all products with optional filters
   * @param params Query parameters for filtering and pagination
   * @returns Observable with ProductResponse
   */
  getProducts(params?: ProductQueryParams): Observable<ProductResponse> {
    let httpParams = new HttpParams();

    if (params) {
      if (params.subdomain) httpParams = httpParams.set('subdomain', params.subdomain);
      if (params.status) httpParams = httpParams.set('status', params.status);
      if (params.store) httpParams = httpParams.set('store', params.store);
      if (params.country) httpParams = httpParams.set('country', params.country);
      if (params.page) httpParams = httpParams.set('page', params.page);
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    }

    return this.http.get<ProductResponse>(
      `${this.baseUrl}show/all`,
      { params: httpParams }
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get a specific product by ID
   * @param id Product ID
   * @returns Observable with ProductResponse
   */
  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(
      `${this.baseUrl}show/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Create a new product
   * @param productData Product data
   * @param image Optional product image file
   * @returns Observable with ProductResponse
   */
  createProduct(productData: CreateProductRequest, image?: File): Observable<ProductResponse> {
    const formData = new FormData();
    
    // Append product data
    formData.append('name_product', productData.name_product);
    formData.append('base_price_product', productData.base_price_product.toString());
    formData.append('subdomain', productData.subdomain);
    formData.append('id_sub_category', productData.id_sub_category.toString());
    formData.append('metadata_product', JSON.stringify(productData.metadata_product));
    
    // Append optional fields
    if (productData.description_product) {
      formData.append('description_product', productData.description_product);
    }
    if (productData.id_store) {
      formData.append('id_store', productData.id_store.toString());
    }
    if (productData.status_product) {
      formData.append('status_product', productData.status_product);
    }
    if (productData.stock !== undefined) {
      formData.append('stock', productData.stock.toString());
    }
    if (productData.max_quantity) {
      formData.append('max_quantity', productData.max_quantity.toString());
    }
    if (productData.min_quantity) {
      formData.append('min_quantity', productData.min_quantity.toString());
    }
    
    // Append image if provided
    if (image) {
      formData.append('image_product', image);
    }

    return this.http.post<ProductResponse>(
      `${this.baseUrl}add`,
      formData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Update an existing product
   * @param id Product ID
   * @param productData Updated product data
   * @param image Optional new product image
   * @returns Observable with ProductResponse
   */
  updateProduct(id: number, productData: UpdateProductRequest, image?: File): Observable<ProductResponse> {
    const formData = new FormData();
    
    // Append updated fields
    if (productData.name_product) formData.append('name_product', productData.name_product);
    if (productData.description_product) formData.append('description_product', productData.description_product);
    if (productData.base_price_product) formData.append('base_price_product', productData.base_price_product.toString());
    if (productData.subdomain) formData.append('subdomain', productData.subdomain);
    if (productData.id_sub_category) formData.append('id_sub_category', productData.id_sub_category.toString());
    if (productData.metadata_product) formData.append('metadata_product', JSON.stringify(productData.metadata_product));
    if (productData.id_store) formData.append('id_store', productData.id_store.toString());
    if (productData.status_product) formData.append('status_product', productData.status_product);
    if (productData.stock !== undefined) formData.append('stock', productData.stock.toString());
    if (productData.max_quantity) formData.append('max_quantity', productData.max_quantity.toString());
    if (productData.min_quantity) formData.append('min_quantity', productData.min_quantity.toString());
    if (productData.change_reason) formData.append('change_reason', productData.change_reason);
    
    // Handle images to delete
    if (productData.imagesToDelete) {
      if (Array.isArray(productData.imagesToDelete)) {
        productData.imagesToDelete.forEach(img => formData.append('imagesToDelete', img));
      } else {
        formData.append('imagesToDelete', productData.imagesToDelete);
      }
    }
    
    // Append new image if provided
    if (image) {
      formData.append('image_product', image);
    }

    return this.http.put<ProductResponse>(
      `${this.baseUrl}update/${id}`,
      formData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Delete a product
   * @param id Product ID
   * @returns Observable with success message
   */
  deleteProduct(id: number): Observable<{msg: string}> {
    return this.http.delete<{msg: string}>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}
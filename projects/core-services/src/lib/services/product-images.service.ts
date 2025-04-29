import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ProductImages, Image, msgImageProduct } from '../models/products-image.models';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {
  private readonly baseUrl = `product_images/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with product images service';
    
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
   * Get all images for a specific product
   * @param id Product ID
   * @returns Observable with product images
   */
  getProductImages(id: number): Observable<ProductImages> {
    return this.http.get<ProductImages>(
      `${this.baseUrl}show/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Upload images for a product
   * @param files Array of files to upload
   * @param id_product Product ID
   * @param id_store Store ID
   * @param subdomain Store subdomain
   * @returns Observable with upload results
   */
  uploadImages(
    files: File[],
    id_product: number,
    id_store: number,
    subdomain: string
  ): Observable<any> {
    const formData = new FormData();
    
    // Append each file to the FormData
    files.forEach(file => {
      formData.append('file_name', file);
    });

    // Append other required fields
    formData.append('id_product', id_product.toString());
    formData.append('id_store', id_store.toString());
    formData.append('subdomain', subdomain);

    return this.http.post<any>(
      `${this.baseUrl}add`,
      formData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Delete a product image
   * @param id_image Image ID in database
   * @param name Image file name
   * @returns Observable with deletion result
   */
  deleteImage(id_image: number, name: string): Observable<msgImageProduct> {
    return this.http.delete<msgImageProduct>(
      `${this.baseUrl}delete`,
      {
        params: {
          id_image: id_image.toString(),
          name: name
        }
      }
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}
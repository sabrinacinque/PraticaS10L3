import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './Modules/api-response';
import Swal from 'sweetalert2';
import { iProduct } from './Modules/i-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = 'https://dummyjson.com/products';
  arrFavorites: iProduct[] = [];
  arrCart: iProduct[] = [];

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  addToFavorites(product: iProduct) {
    this.arrFavorites.push(product);
    Swal.fire({
      icon: 'success',
      title: 'Aggiunto ai Preferiti!',
      text: `${product.title} è stato aggiunto ai tuoi preferiti.`,
      confirmButtonText: 'OK'
    });
  }

  addToCart(product: iProduct) {
    this.arrCart.push(product);
    Swal.fire({
      icon: 'success',
      title: 'Aggiunto al Carrello!',
      text: `${product.title} è stato aggiunto al tuo carrello.`,
      confirmButtonText: 'OK'
    });
  }

  getFavoritesCount(): number {
    return this.arrFavorites.length;
  }

  getCartCount(): number {
    return this.arrCart.length;
  }

  removeFromFavorites(product: iProduct) {
    this.arrFavorites = this.arrFavorites.filter(p => p !== product);
    Swal.fire({
      icon: 'success',
      title: 'Rimosso dai Preferiti',
      text: `${product.title} è stato rimosso dai tuoi preferiti.`,
      confirmButtonText: 'OK'
    });
  }

  removeFromCart(product: iProduct) {
    this.arrCart = this.arrCart.filter(p => p !== product);
    Swal.fire({
      icon: 'success',
      title: 'Rimosso dal Carrello',
      text: `${product.title} è stato rimosso dal tuo carrello.`,
      confirmButtonText: 'OK'
    });
  }


  getFavorites(): iProduct[] {
    return this.arrFavorites;
  }

  getCart(): iProduct[] {
    return this.arrCart;
  }
}

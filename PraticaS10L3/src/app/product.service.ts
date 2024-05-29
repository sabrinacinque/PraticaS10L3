import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './Modules/api-response';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = 'https://dummyjson.com/products';
  arrFavorites: any[] = [];
  arrCart: any[] = [];

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  addToFavorites(product: any) {
    this.arrFavorites.push(product);
    Swal.fire({
      icon: 'success',
      title: 'Aggiunto ai Preferiti!',
      text: `${product.title} è stato aggiunto ai tuoi preferiti.`,
      confirmButtonText: 'OK'
    });
  }

  addToCart(product: any) {
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

  removeFromFavorites(product: any) {
    this.arrFavorites = this.arrFavorites.filter(p => p !== product);
    Swal.fire({
      icon: 'success',
      title: 'Rimosso dai Preferiti',
      text: `${product.title} è stato rimosso dai tuoi preferiti.`,
      confirmButtonText: 'OK'
    });
  }

  removeFromCart(product: any) {
    this.arrCart = this.arrCart.filter(p => p !== product);
    Swal.fire({
      icon: 'success',
      title: 'Rimosso dal Carrello',
      text: `${product.title} è stato rimosso dal tuo carrello.`,
      confirmButtonText: 'OK'
    });
  }


  getFavorites(): any[] {
    return this.arrFavorites;
  }

  getCart(): any[] {
    return this.arrCart;
  }
}

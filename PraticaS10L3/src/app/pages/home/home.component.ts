import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../product.service';
import { iProduct } from '../../Modules/i-product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  arrProducts: iProduct[] = [];
  sub!: Subscription;
  favoritesCount: number = 0;
  cartCount: number = 0;
  arrFavorites: iProduct[] = [];
  arrCart: iProduct[] = [];

  constructor(private productSvc: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productSvc.getAll()
      .subscribe({
        next: data => {
          this.arrProducts = data.products;
          console.log(this.arrProducts);
        },
        error: error => console.error(error),
        complete: () => console.log('Fetch completa')
      });

    this.updateCounts();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  addToFavorites(product: any) {
    this.productSvc.addToFavorites(product);
    this.updateCounts();
  }

  addToCart(product: any) {
    this.productSvc.addToCart(product);
    this.updateCounts();
  }

  removeFromFavorites(product: any) {
    this.productSvc.removeFromFavorites(product);
    this.updateCounts();
  }

  removeFromCart(product: any) {
    this.productSvc.removeFromCart(product);
    this.updateCounts();
  }

  updateCounts() {
    this.favoritesCount = this.productSvc.getFavoritesCount();
    this.cartCount = this.productSvc.getCartCount();
    this.arrFavorites = this.productSvc.getFavorites();
    this.arrCart = this.productSvc.getCart();
  }
}

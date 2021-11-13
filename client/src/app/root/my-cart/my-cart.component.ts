import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/service/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {

  subs: Subscription[] = [];
  cartProduct = [];
  loadingCart: boolean;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.subs.push(
      this.cartService.cartItems.subscribe(
        val => {
          if(val) {
            this.cartProduct = val;
          }
        }
      )
    );
  }
  AllremoveCart() {
    this.loadingCart = true;
      this.cartService.AllremoveCart().then(
        res => this.loadingCart = false
      ).catch(
        err => this.loadingCart = false
      );
  }


  ngOnDestroy() {
    this.subs.forEach( f => f.unsubscribe());
  }
}

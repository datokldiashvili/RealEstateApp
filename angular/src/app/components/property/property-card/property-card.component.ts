import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IPropertyBase } from 'src/app/model/property/iproperty-base';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent implements OnInit {
  @Input() property!: IPropertyBase;
  @Input() showWishList: boolean = true;
  @Input() detailsBtnDisabled: boolean = false;
  @ViewChild('wishlistSpan') wishlistPressed!: ElementRef;
  imgLoading: boolean = true;
  loggedInUser!: string | null;
  wishListed: boolean = false;
  cities = [
    { id: 1, name: 'Dhaka' },
    { id: 2, name: 'Sylhet' },
    { id: 3, name: 'Chittagong' },
    { id: 4, name: 'Khulna' },
    { id: 5, name: 'Rajshahi' },
    { id: 6, name: 'Barisal' },
    { id: 7, name: 'Mymensingh' },
    { id: 7, name: 'Comilla' },
    { id: 8, name: 'Rangpur' },
  ];

  ngOnInit(): void {}

  onLogin() {
    this.loggedInUser = localStorage.getItem('token');
    return this.loggedInUser;
  }

  Wishlist() {
    if (!this.wishListed) {
      this.wishListed = true;
      this.wishlistPressed.nativeElement.classList.add('wishlist-pressed');
      console.log();
    } else if (this.wishListed) {
      this.wishListed = false;
      this.wishlistPressed.nativeElement.classList.remove('wishlist-pressed');
    }
  }

  imageFailed() {
    this.property.Image = 'image-not-found.jpg';
  }

  // Getters
  get City() {
    // Return an object if city found else undefined
    // Object example: {id: 1, name: 'abcd'}
    return this.cities.find((x) => x.id == this.property.City)?.name;
  }
}

import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPropertyBase } from 'src/app/model/property/iproperty-base';
import { Property } from 'src/app/model/property/property';
import { ApiService } from 'src/app/services/api.service';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit {
  // Dependency injections
  propertyService = inject(ApiService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  route = inject(ActivatedRoute);

  propertyId!: number;

  // Countries
  countries = [
    { id: 1, name: 'Bangladesh' },
    { id: 2, name: 'India' },
    { id: 3, name: 'USA' },
  ];

  // Cities of Bangladesh
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

  // Had to initialize so that property doesn't give undefined error
  property: IPropertyBase = {
    Id: null,
    SellRent: null,
    BHK: null,
    PropertyType: '',
    FurnishType: '',
    Name: '',
    City: null,
    Country: null,
    Price: null,
    BuiltArea: null,
    Address: '',
    ReadyToMove: '',
  };

  // Image gallery
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor() {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.property = data['prop'];
    });
    this.galleryOptions = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];

    this.galleryImages = [
      {
        small: 'assets/images/gallery/master-bedroom.jpg',
        medium: 'assets/images/gallery/master-bedroom.jpg',
        big: 'assets/images/gallery/master-bedroom.jpg',
      },
      {
        small: 'assets/images/gallery/guest-room.jpg',
        medium: 'assets/images/gallery/guest-room.jpg',
        big: 'assets/images/gallery/guest-room.jpg',
      },
      {
        small: 'assets/images/gallery/kitchen.jpg',
        medium: 'assets/images/gallery/kitchen.jpg',
        big: 'assets/images/gallery/kitchen.jpg',
      },
      {
        small: 'assets/images/gallery/dining-room.jpg',
        medium: 'assets/images/gallery/dining-room.jpg',
        big: 'assets/images/gallery/dining-room.jpg',
      },
      {
        small: 'assets/images/gallery/drone-view.jpg',
        medium: 'assets/images/gallery/drone-view.jpg',
        big: 'assets/images/gallery/drone-view.jpg',
      },
    ];
  }

  // assigns a default image if image not found
  imgError() {
    this.property.Image = 'image-not-found.jpg';
  }

  // ----------------------------------------------------------------------------
  // Getters
  // ----------------------------------------------------------------------------
  get PropertyName() {
    let name = this.property.Name;
    if (!name) {
      name = 'Anonymous';
    }
    if (name.length > 20) {
      name = name.slice(0, 20) + '.....';
    }
    return name;
  }

  get BHK() {
    return this.property.BHK;
  }

  get Price() {
    return this.property.Price;
  }

  get City() {
    return this.cities.find((x) => x.id == this.property.City)?.name;
  }

  get Country() {
    return this.countries.find((x) => x.id == this.property.Country)?.name;
  }

  get BuiltArea() {
    return this.property.BuiltArea;
  }

  get CarpetArea() {
    return this.property.CarpetArea;
  }

  get FurnishType() {
    return this.property.FurnishType;
  }

  get MainEntrance() {
    return this.property.MainEntrance;
  }

  get FloorNumber() {
    return this.property.Floor;
  }

  get GatedCommunity() {
    return this.property.GatedCommunity;
  }

  get AOP() {
    return this.property.AOP;
  }

  get SecurityDeposit() {
    return this.property.Security;
  }

  get ReadyToMove() {
    if (this.property.ReadyToMove === 'Yes') {
      return 'Ready to move';
    }
    return 'Not ready to move';
  }

  get Maintenance() {
    return this.property.Maintenance;
  }

  get PropertyDescription() {
    return this.property.Description;
  }

  get Image() {
    return this.property.Image;
  }

  get Address() {
    let address = `${this.property.Address}`;
    if (this.City) {
      address += `, ${this.City}`;
    }

    if (this.Country) {
      address += `, ${this.Country}`;
    }
    return address;
  }
}

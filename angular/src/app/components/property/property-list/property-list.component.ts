import { Component, DoCheck, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/model/property/property';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  properties!: Array<Property>;
  route = inject(ActivatedRoute);
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

  cityName!: number;
  searchedCity: string = '';
  sortOrder: string = 'Ascending';

  constructor() {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.properties = data['propList'];
    });
  }

  searchCity(): void {
    if (this.cityName) this.searchedCity = String(this.cityName);
    else this.searchedCity = '';
  }

  reverseSortOrder(): void {
    if (this.sortOrder === 'Ascending') {
      this.sortOrder = 'Descending';
    } else if (this.sortOrder === 'Descending') {
      this.sortOrder = 'Ascending';
    }
  }
}

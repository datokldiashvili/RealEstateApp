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
    { id: 1, name: 'Qutaisi' },
    { id: 2, name: 'Batumi' },
    { id: 3, name: 'Tbilisi' },
    { id: 4, name: 'Gori' },
    { id: 5, name: 'Rustavi' },
    { id: 6, name: 'Zugdidi' },
    { id: 7, name: 'Foti' },
    { id: 7, name: 'Samtredia' },
    { id: 8, name: 'Xashuri' },
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

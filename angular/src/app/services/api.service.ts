import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IPropertyBase } from '../model/property/iproperty-base';
import { Property } from '../model/property/property';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllProperties(SellRent: number): Observable<Property[]> {
    return this.http.get('data/properties.json').pipe(
      map((data: any) => {
        const properties: Array<Property> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
            properties.push(data[id]);
          }
        }
        if (localStorage.getItem('property')) {
          // Gets a list of property from the localStorage
          let propertyList = JSON.parse(localStorage.getItem('property')!);
          propertyList.forEach((prop: Property) => {
            // type checking is intentionally ignored below
            if (prop.SellRent == SellRent)
              // this.properties = [prop, ...res];
              properties.push(prop);
          });
        }
        return properties;
      })
    );
  }

  getPropertyById(id: number): Observable<Property> {
    // ----------------------Will be updated when DB added----------------------
    return this.http.get('data/properties.json').pipe(
      map((data: any) => {
        let property!: Property;
        property = data.find((prop: Property) => prop.Id === Number(id));
        // If property not available in json data, it checks localStorage
        if (!property) {
          let storedProps: Array<Property> = JSON.parse(
            localStorage.getItem('property')!
          );
          // If property not available in localStorage, returns null
          if (storedProps) {
            property = storedProps.find(
              (prop: Property) => prop.Id === Number(id)
            )!;
          }
        }
        if (!property) {
          throw new Error('Unable to find product');
        }
        return property;
      })
    );
  }

  addProperty(property: Property): void {
    // ----------------------Will be updated when DB added----------------------
    let pid = Number(localStorage.getItem('PID'));
    let storedProperty: Array<Property> = [];

    if (!pid) pid = 101;
    else pid += 1;

    property.Id = pid;
    localStorage.setItem('PID', `${pid}`);

    if (localStorage.getItem('property')) {
      storedProperty = JSON.parse(localStorage.getItem('property')!);
    }

    storedProperty = [...storedProperty, property];

    localStorage.setItem('property', JSON.stringify(storedProperty));
    // ------------------------------------------------------------------
  }
}

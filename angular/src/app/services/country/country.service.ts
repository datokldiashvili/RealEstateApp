import { Injectable } from '@angular/core';
import { ICountry } from '../../model/icountry';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<ICountry[]> {
    return this.http.get('https://localhost:44363/api/country').pipe(
      map((data: any) => {
        console.log('Data:', data);
        const countries: Array<ICountry> = [];
        countries.push(...data);
        return countries;
      }),
      catchError((error) => {
        throw new Error('Unable to connect to the server');
      })
    );
  }
}

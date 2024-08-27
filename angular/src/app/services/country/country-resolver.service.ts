import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ICountry } from '../../model/icountry';
import { Observable, catchError, of } from 'rxjs';
import { CountryService } from './country.service';

@Injectable({
  providedIn: 'root',
})
export class CountryResolverService implements Resolve<ICountry[]> {
  constructor(private countryService: CountryService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ICountry[] | Observable<ICountry[]> | Promise<ICountry[]> {
    return this.countryService.getAllCountries().pipe(
      catchError((error) => {
        this.router.navigate(['/error'], {
          state: { data: { message: 'Internal Server Error', errorCode: 500 } },
        });
        return of();
      })
    );
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ICountry } from 'src/app/model/icountry';
import { CountryService } from '../../country/country.service';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationResolverService implements Resolve<ICountry[]> {
  constructor(private countryService: CountryService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ICountry[] | Observable<ICountry[]> | Promise<ICountry[]> {
    return this.countryService.getAllCountries().pipe(
      catchError((error) => {
        this.router.navigate(['/error']);
        return of();
      })
    );
  }
}

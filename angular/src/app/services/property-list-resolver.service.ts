import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Property } from '../model/property/property';
import { Observable, catchError, of, subscribeOn } from 'rxjs';
import { TitleService } from 'src/app/services/title.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyListResolverService implements Resolve<Property[]> {
  properties!: Array<Property>;
  SellRent: number = 1;

  constructor(
    private apiservice: ApiService,
    private titleService: TitleService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Property[] | Observable<Property[]> | Promise<Property[]> {
    var param = route.url.toString(); // gets the route
    if (param === 'rent-property') {
      this.SellRent = 2;
      this.titleService.setTitle(`Rent Property`);
    } else {
      this.SellRent = 1;
      this.titleService.setTitle(`Buy Property`);
    }

    return this.apiservice.getAllProperties(this.SellRent).pipe(
      catchError((error) => {
        this.router.navigate(['/error']);
        return of();
      })
    );
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Property } from '../model/property/property';
import { Observable, catchError, of, EMPTY } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyDetailResolverService implements Resolve<Property> {
  constructor(private apiService: ApiService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Property | Observable<Property> | Promise<Property> {
    const propId = route.params['id'];
    return this.apiService.getPropertyById(propId).pipe(
      catchError((error) => {
        this.router.navigate(['/error']);
        return of();
      })
    );
  }
}

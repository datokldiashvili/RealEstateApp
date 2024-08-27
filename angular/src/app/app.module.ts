import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { PropertyCardComponent } from './components/property/property-card/property-card.component';
import { PropertyListComponent } from './components/property/property-list/property-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApiService } from './services/api.service';
import { PropertyDetailComponent } from './components/property/property-detail/property-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { WishlistComponent } from './components/user/wishlist/wishlist.component';
import { CartComponent } from './components/user/cart/cart.component';
import { TitleService } from './services/title.service';
import { AddPropertyComponent } from './components/property/add-property/add-property.component';
import { PropertyPreviewComponent } from './components/property/add-property/property-preview/property-preview.component';
import { HomeComponent } from './components/home/home.component';
import { PropertyDetailResolverService } from './services/property-detail-resolver.service';
// Angular pipes
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { PropertyListResolverService } from './services/property-list-resolver.service';
import { HomeResolverService } from './services/home-resolver.service';
import { UserRegistrationResolverService } from './services/user/registration/user-registration-resolver.service';
import { CountryResolverService } from './services/country/country-resolver.service';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    resolve: { HomeResolverService },
  },
  {
    path: 'buy-property',
    component: PropertyListComponent,
    resolve: { propList: PropertyListResolverService },
  },
  {
    path: 'rent-property',
    component: PropertyListComponent,
    resolve: { propList: PropertyListResolverService },
  },
  { path: 'add-property', component: AddPropertyComponent },
  {
    path: 'property-detail/:id',
    component: PropertyDetailComponent,
    resolve: { prop: PropertyDetailResolverService },
  },
  { path: 'user/login', component: UserLoginComponent },
  {
    path: 'user/register',
    component: UserRegisterComponent,
    resolve: { countries: CountryResolverService },
  },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'cart', component: CartComponent },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    NavbarComponent,
    AddPropertyComponent,
    PropertyDetailComponent,
    PageNotFoundComponent,
    UserLoginComponent,
    UserRegisterComponent,
    WishlistComponent,
    CartComponent,
    PropertyPreviewComponent,
    HomeComponent,
    FilterPipe,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    LazyLoadImageModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
    }),
    TooltipModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule,
  ],
  providers: [
    ApiService,
    UserService,
    AuthService,
    TitleService,
    // Resolvers
    PropertyDetailResolverService,
    PropertyListResolverService,
    UserRegistrationResolverService,
    CountryResolverService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit, DoCheck {
  // Properties
  errorCode: number = 400;
  message: string = 'Page not found';

  constructor(
    private titleService: TitleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (history.state.data) {
      this.errorCode = history.state.data['errorCode'];
      this.message = history.state.data['message'];
      history.state.data = undefined;
    }
    this.titleService.setTitle(`Error: ${this.errorCode}`);
  }
  // implemented after onInit
  ngDoCheck(): void {
    if (history.state.data) {
      this.errorCode = history.state.data['errorCode'];
      this.message = history.state.data['message'];
      this.titleService.setTitle(`Error: ${this.errorCode}`);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}

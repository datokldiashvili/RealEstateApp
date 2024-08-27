import { Component, OnInit, inject } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  titleService = inject(TitleService);
  ngOnInit(): void {
    let user = localStorage.getItem('token')?.split(' ')[0];
    this.titleService.setTitle(`${user}'s Cart`);
  }
}

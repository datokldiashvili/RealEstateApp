import { Component, OnInit, inject } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  titleService = inject(TitleService);
  ngOnInit(): void {
    let user = localStorage.getItem('token')?.split(' ')[0];
    this.titleService.setTitle(`${user}'s Wishlist`);
  }
}

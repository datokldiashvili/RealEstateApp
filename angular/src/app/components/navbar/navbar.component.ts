import { Component, Inject, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loggedInUser!: string | null;
  toastr = inject(ToastrService);

  constructor() {}

  ngOnInit(): void {}

  onLogin() {
    this.loggedInUser = localStorage.getItem('token');
    let temp = '';
    this.loggedInUser?.split(' ').forEach((word) => {
      temp += word[0];
    });
    this.loggedInUser = temp;
    return this.loggedInUser;
  }
  onLogout() {
    localStorage.removeItem('token');
    this.toastr.success('Logged out');
  }
}

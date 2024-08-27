import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  authenticate(user: any) {
    let userList = [];
    if (localStorage.getItem('users')) {
      userList = JSON.parse(localStorage.getItem('users')!);
    }
    // returns user object
    return userList.find(
      (usr: any) => usr.email === user.email && usr.password === user.password
    );
  }
}

import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  // storing and retrieving data should be used using services
  addUsers(user: User) {
    let storedUsers = JSON.parse(localStorage.getItem('users')!);
    let users!: User[];
    if (storedUsers === null) {
      users.push(user);
    } else {
      users = [user, ...storedUsers];
    }
    localStorage.setItem('users', JSON.stringify(users));
  }
}

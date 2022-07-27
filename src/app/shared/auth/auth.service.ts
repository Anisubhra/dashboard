import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  users;
  user;

  constructor(public router: Router) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.users = localStorage.getItem('users');
  }

  signupUser(data) {
    return new Promise((res, rej) => {
      let newUsers;

      try {
        if (this.users) {
          newUsers = JSON.parse(this.users);

          newUsers.push(data);
        }
        else {
          newUsers = [data];
        }

        newUsers = JSON.stringify(newUsers);
        this.users= newUsers;
        localStorage.setItem('users', newUsers);

        res(newUsers);
      }
      catch (e) {
        rej(e);
      }
    })
  }

  get loggedInUser() {
    return this.user;
  }

  get isAdmin() {
    return this.user.role == 'admin' ? true : false;
  }

  signinUser(name: string, password: string) {
    return new Promise((resolve, reject) => {
      try {
        if (this.users) {
          const allUsers = JSON.parse(this.users);
          const user = allUsers.find(user => user.name == name && user.password == password);

          if (user) {
            const loggedInUser = JSON.stringify(user);
            this.user = user;
            localStorage.setItem('user', loggedInUser);

            resolve(user);
          }
          else {
            throw "user not found!";
          }
        }
        else {
          throw "user not found!";
        }
      }
      catch (e) {
        reject(e);
      }
    });

  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
    this.router.navigate(['/pages/login']);
  }

  isAuthenticated() {
    const isAuth = localStorage.getItem('user');

    return isAuth ? true : false;
  }
}

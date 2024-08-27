import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  // Dependency injections: only available from angular 14
  fb = inject(FormBuilder);
  titleService = inject(TitleService);
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  router = inject(Router);

  loginForm!: FormGroup;
  loginBtnPressed: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.loginFormBuilder();
    this.titleService.setTitle('User Login');
  }

  // -------------------------------------------------------------------------
  // Form builder
  // --------------------------------------------------------------------------

  loginFormBuilder() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  // -------------------------------------------------------------------------
  // Getter method for all form controls
  // --------------------------------------------------------------------------

  get Email() {
    return this.loginForm.get('email') as FormControl;
  }

  get Password() {
    return this.loginForm.get('password') as FormControl;
  }

  login() {
    this.loginBtnPressed = true;
    if (this.loginForm.valid) {
      let token = this.authService.authenticate(this.loginForm.value);
      if (token) {
        localStorage.setItem('token', token.name);
        this.toastr.success(`Welcome ${token.name.split(' ')[0]}`);
        this.router.navigate(['/']);
      } else {
        this.toastr.error('Failed to login');
      }
      this.loginBtnPressed = false;
    }
  }
}

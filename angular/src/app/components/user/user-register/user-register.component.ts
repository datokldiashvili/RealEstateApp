import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TitleService } from 'src/app/services/title.service';
import { CountryService } from 'src/app/services/country/country.service';
import { ICountry } from 'src/app/model/icountry';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  // Dependency Injections
  fb = inject(FormBuilder);
  userService = inject(UserService);
  toastr = inject(ToastrService);
  titleService = inject(TitleService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  // Properties
  registrationForm!: FormGroup;
  users!: User;
  countries!: ICountry[];
  registerBtnPressed: boolean = false;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.countries = data['countries'];
    });
    this.titleService.setTitle('User Register');
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group(
      {
        name: [null, [Validators.required, Validators.minLength(2)]],
        email: [null, [Validators.required]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        country: [null, [Validators.required]],
        confirmPassword: [null, [Validators.required]],
        phoneNumber: [null, [Validators.required, Validators.maxLength(11)]],
      },
      {
        validators: [this.emailValidationFn, this.confirmPasswordValidationFn],
      }
    );
  }

  // Custom validation function
  confirmPasswordValidationFn(control: AbstractControl) {
    return control.get('password')?.value ===
      control.get('confirmPassword')?.value
      ? null
      : { confirmPassNotMatched: true };
  }

  // Email validation function
  emailValidationFn(control: AbstractControl) {
    // Email validation regular expression
    var regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(control.get('email')!.value)
      ? null
      : { invalidEmail: true };
  }

  // -------------------------------------------------------------------------
  // Getter method for all form controls
  // --------------------------------------------------------------------------
  get Name() {
    return this.registrationForm.get('name') as FormControl;
  }
  get Email() {
    return this.registrationForm.get('email') as FormControl;
  }
  get Password() {
    return this.registrationForm.get('password') as FormControl;
  }
  get ConfirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
  get PhoneNumber() {
    return this.registrationForm.get('phoneNumber') as FormControl;
  }
  get Country() {
    return this.registrationForm.get('country') as FormControl;
  }
  get CountryCode() {
    let countryId = this.Country.value;
    if (!this.Country.value) {
      return;
    }
    return this.countries.find((x) => x.id == countryId)?.countryCallingCode;
  }

  // -------------------------------------------------------------------------
  // Form submission
  // -------------------------------------------------------------------------

  // Mapping user to its interface and using it onSubmit
  userData(): User {
    return (this.users = {
      name: this.Name.value,
      email: this.Email.value,
      password: this.Password.value,
      countryCode: this.CountryCode,
      phoneNumber: this.PhoneNumber.value,
    });
  }

  // Register
  register() {
    this.registerBtnPressed = true;
    if (this.registrationForm.valid) {
      this.userService.addUsers(this.userData());
      this.registrationForm.reset();
      this.registerBtnPressed = false;
      // this.router.navigate(['/user/login']);
      this.toastr.success('Registration successful', 'Success'); // Toaster message
    }
  }
}

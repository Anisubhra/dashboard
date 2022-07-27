import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../../shared/directives/must-match.validator';
import { Router } from '@angular/router';
import * as swalFunctions from '../../../shared/data/sweet-alerts';
import { AuthService } from 'app/shared/auth/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {
  registerFormSubmitted = false;
  registerForm: FormGroup;
  swal = swalFunctions;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    let isAuth = this.authService.isAuthenticated();
    if (isAuth) {
      this.router.navigate(['/dashboard/dashboard1']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get rf() {
    return this.registerForm.controls;
  }


  //  On submit click, reset field value
  async onSubmit() {
    this.registerFormSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    const formData = this.registerForm.value;
    delete formData["confirmPassword"];

    const res = await this.authService.signupUser(formData);

    if (res) {
      this.swal.CustomSuccess('User created successfully!')
      this.router.navigate(['/pages/login']);
    }
    else {
      this.swal.CustomError('Failed to create user!');
    }

  }
}

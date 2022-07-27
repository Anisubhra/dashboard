import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { SummaryService } from 'app/shared/services/summary.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new FormGroup({
    username: new FormControl('admin1@localhost', [Validators.required]),
    password: new FormControl('admin1@87651234', [Validators.required]),
  });


  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute, private summaryService: SummaryService) {
    let isAuth = this.authService.isAuthenticated();
    if (isAuth) {
      this.router.navigate(['/dashboard/dashboard1']);
    }
  }

  ngOnInit() {
  }

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

    this.authService.signinUser(this.loginForm.value.username, this.loginForm.value.password)
      .then((res) => {
        this.spinner.hide();
        this.summaryService.startTracker();
        this.router.navigate(['/dashboard/dashboard1']);
      })
      .catch((err) => {
        this.isLoginFailed = true;
        this.spinner.hide();
      }
      );
  }

}

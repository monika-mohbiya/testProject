import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Router } from '@angular/router';
import { DummyJsonService } from '../../../services/dummy-json.service';
import { response } from 'express';
// import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    ReactiveFormsModule,
    // MatCardTitle,
    MatCard,
    MatInputModule,
    MatIconModule,
    MatCardContent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted: boolean = false;
  hide = true;

  service = inject(DummyJsonService);
  router = inject(Router);
  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+( [A-Za-z]+)*$/)]),
      password: new FormControl('', [Validators.required]),
    });
  }
  submit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loginUser(this.loginForm.value);
    } else {

    }
  }
  async loginUser(val: any) {
    try {
      const response = await this.service.login(val);
      console.log('Login successful:', response);

      // Access the token here
      // console.log('Access Token:', response.accessToken);

      localStorage.setItem('Access Token:', response.accessToken);
      this.router.navigateByUrl('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  get password() {
    return this.loginForm.get('password');
  }

  get Username() {
    return this.loginForm.get('username');
  }
}

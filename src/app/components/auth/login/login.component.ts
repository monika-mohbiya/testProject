import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Router } from '@angular/router';
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
  form: FormGroup = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
    Password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
  });

  submitted = false;

  hide = true;
  constructor(

    private router: Router,

  ) { }
  submit() {
    this.submitted = true;
    if (this.form.valid) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  get password() {
    return this.form.get('Password');
  }

  get email() {
    return this.form.get('Email');
  }
}

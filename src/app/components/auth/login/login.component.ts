import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { isPlatformBrowser } from '@angular/common';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAR-GtS70uqHsWufXJb_jTzUohK7zeFiEM",
    authDomain: "hide-project-3622d.firebaseapp.com",
    projectId: "hide-project-3622d",
    storageBucket: "hide-project-3622d.firebasestorage.app",
    messagingSenderId: "191697751390",
    appId: "1:191697751390:web:71147043cd4e7249b393cf",
    measurementId: "G-FNSLW9CB50",
    vapidKey: "DVN8r4rYVaNY4gaOe7YLNDje3gpjCXyIwyKn-DAzrzU"
  }
};

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormField, ReactiveFormsModule, MatCardTitle, MatCard, MatInputModule, MatIconModule, MatCardContent,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
    Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  submitted = false;
  messaging: Messaging | null = null;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router, private toastrService: ToastrService) { }
  async ngOnInit() {
    await this.setupFirebaseMessaging();
  }

  setupFirebaseMessaging() {
    if (isPlatformBrowser(this.platformId)) {
      const app = initializeApp(environment.firebase);
      this.messaging = getMessaging(app);

      this.requestPermissionAndGetToken();
      this.listenForForegroundMessages();
    } else {
      console.warn('Browser does not support Firebase Messaging.');
    }
  }

  requestPermissionAndGetToken() {
    if (!this.messaging) return;
    Notification.requestPermission().then((permission) => {
      // debugger;
      if (permission === 'granted') {
        getToken(this.messaging!).then((token) => {
          if (token) {

            localStorage.setItem("FCM Token", token)
            // console.log('FCM Token:', token);
            if (token) {
              this.toastrService.success('Token Created Successfully', '', { timeOut: 5000 });
            } else {
              this.toastrService.error('Token Not Created ', '', { timeOut: 5000 });
            }

          } else {
            console.warn('No registration token available.');
          }
        }).catch((err) => {
          console.error('An error occurred while retrieving token. ', err);
        });
      }
      else {
        console.warn('Notification permission not granted.');
      }
    });
  }

  listenForForegroundMessages() {
    if (!this.messaging) return;

    onMessage(this.messaging, (payload) => {
      console.log('Message received. ', payload);
      // show toast/snackbar/alert etc.
    });
  }
  submit() {
    this.submitted = true;
    if (this.form.valid) {
      this.requestPermissionAndGetToken();
      this.router.navigateByUrl('/dashboard')
    }
  }
  get password() {
    return this.form.get('Password');
  }
  get email() {
    return this.form.get('Email');
  }
}



import { Component, computed, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getMessaging, getToken, Messaging, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { DummyJsonService } from '../../services/dummy-json.service';
import { DasCardComponent } from '../das-card/das-card.component';

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
  }
};

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, DasCardComponent,],
  providers: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {

  messaging: Messaging | null = null;
  service = inject(DummyJsonService);

  router = inject(Router);

  toastrService = inject(ToastrService);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  async ngOnInit() {
    // console.log(this.token)
    // Initialize Firebase app and messaging but don't request permission yet
    if (isPlatformBrowser(this.platformId)) {
      const app = initializeApp(environment.firebase);
      this.messaging = getMessaging(app);
      this.listenForForegroundMessages();
    }

  }

  /** Called only after user gesture (Login click) */
  async requestPermissionAndGetToken() {
    if (!this.messaging) return;

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // const token = await getToken(this.messaging!, {
        //   vapidKey: environment.firebase.vapidKey
        // });
        const token = await getToken(this.messaging!);
        if (token) {
          localStorage.setItem("FCM Token", token);
          this.toastrService.success('Token Created Successfully', '', { timeOut: 5000 });
        } else {
          this.toastrService.error('Token Not Created', '', { timeOut: 5000 });
        }
      } else {
        console.warn('Notification permission not granted.');
      }
    } catch (err) {
      console.error('An error occurred while retrieving token: ', err);
    }
  }

  listenForForegroundMessages() {
    if (!this.messaging) return;
    onMessage(this.messaging, (payload) => {
      console.log('Message received: ', payload);
    });
  }





}

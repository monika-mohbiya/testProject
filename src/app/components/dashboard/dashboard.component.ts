import { Component, computed, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommoncardComponent } from '../../commoncard/commoncard.component';
import { ToastrService } from 'ngx-toastr';
import { getMessaging, getToken, Messaging, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { DummyJsonService } from '../../services/dummy-json.service';

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
    // vapidKey: "DVN8r4rYVaNY4gaOe7YLNDje3gpjCXyIwyKn-DAzrzU"
  }
};

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatCardModule, CommoncardComponent],
  providers: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {

  messaging: Messaging | null = null;
  service = inject(DummyJsonService);
  // token = computed(() => this.service?.accessToken?? null);
  // token = computed(() => this.service.accessToken());

  router = inject(Router);

  toastrService = inject(ToastrService);
  products: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  async ngOnInit() {
    // console.log(this.token)
    // Initialize Firebase app and messaging but don't request permission yet
    if (isPlatformBrowser(this.platformId)) {
      const app = initializeApp(environment.firebase);
      this.messaging = getMessaging(app);
      this.listenForForegroundMessages();
    }
    this.product()
  }
  async product() {
    try {
      this.products = await this.service.product();
      console.log('✅ Product Data:', this.products);
    } catch (error) {
      console.error('❌ Failed to fetch product:', error);
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


  async routeNav(val: string) {
    console.log(val)
    await this.requestPermissionAndGetToken();
    this.router.navigateByUrl('/' + val)
  }


}

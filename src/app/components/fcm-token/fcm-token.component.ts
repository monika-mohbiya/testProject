import { Component } from '@angular/core';
import { isPlatformBrowser, JsonPipe } from '@angular/common';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
@Component({
  selector: 'app-fcm-token',
  imports: [],
  templateUrl: './fcm-token.component.html',
  styleUrl: './fcm-token.component.scss'
})
export class FCMTokenComponent {
  showtoken: any;

  ngOnInit(): void {
    this.showtoken = localStorage.getItem('FCM Token')
    // console.log(this.showtoken)
  }
}

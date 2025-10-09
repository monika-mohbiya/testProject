import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Injectable({ providedIn: 'root' })
export class FirebaseMessagingService {
  currentMessage = new BehaviorSubject<unknown | undefined>(undefined);;

  constructor(private afMessaging: AngularFireMessaging) {
    this.listenForMessages();
  }

  requestPermission() {
    this.afMessaging.requestToken.subscribe(
      (token) => {
        // console.log('FCM Token:', token);
        // Send this token to your server if needed
      },
      (err) => {
        console.error('Permission denied', err);
      }
    );
  }

  private listenForMessages() {
    this.afMessaging.messages.subscribe((message) => {
      console.log('New message:', message);
      this.currentMessage.next(message);
    });
  }
}

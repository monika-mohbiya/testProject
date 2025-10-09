import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyJsonService {
  // loading = signal(false);
  // error = signal<string | null>(null);
  // user = signal<any | null>(null);
  // accessToken = computed(() => this.user()?.accessToken ?? null);
  apiURL = 'https://dummyjson.com/'
  constructor(private http: HttpClient) { }


  async login(data: any): Promise<any> {
    return await firstValueFrom(
      this.http.post('https://dummyjson.com/auth/login', data)
    );
  }
  async product(): Promise<any> {
    return await firstValueFrom(
      this.http.get('https://dummyjson.com/products/1')
    );
  }
}

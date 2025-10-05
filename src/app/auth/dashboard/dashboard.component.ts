import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatCardModule],
  providers: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {

  showtoken: any;
  constructor(private router: Router) {

  }
  ngOnInit(): void {
    this.showtoken = localStorage.getItem('FCM Token')
    // console.log(this.showtoken)
  }
  routeNav(val: string) {
    this.router.navigateByUrl('/' + val)
  }


}

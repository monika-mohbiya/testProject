import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
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
  dragNav() {
    this.router.navigateByUrl('/ddform')
  }


}

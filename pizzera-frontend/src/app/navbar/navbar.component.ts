import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loggeddIn: boolean = false;
  constructor(private router: ActivatedRoute) {}
  ngOnInit(): void {
    // console.log(event);
    this.loggeddIn = localStorage.getItem('token') ? true : false;
    console.log(this.loggeddIn);
    // console.log(localStorage.getItem('token'));
  }

  // ngOnChanges() {
  //   console.log('Changed');
  // }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.loggeddIn = false;
  }
}

import { PATH_HOME, PATH_EVENTS, PATH_CONTACTS } from './../../app.routes.constantes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  iconName = 'menu';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  switchIcon() {
    if (this.iconName === 'menu') {
      this.iconName = 'close';
    } else {
      this.iconName = 'menu';
    }
  }

  navigateToHome() {
    this.router.navigate([PATH_HOME]);
  }

  navigateToEvents() {
    this.router.navigate([PATH_EVENTS]);
  }

  navigateToContacts() {
    this.router.navigate([PATH_CONTACTS]);
  }
}

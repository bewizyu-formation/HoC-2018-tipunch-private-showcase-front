import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_SUBSCRIBE } from '../app.routes.constantes';
import { PATH_CONNEXION } from '../app.routes.constantes';
import { $ } from 'protractor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Private Showcase';

  constructor(private router: Router) { }

  ngOnInit() {
  }
  navigateToSubscribe() {
    this.router.navigate([PATH_SUBSCRIBE]);
  }
  navigateToConnexion() {
    this.router.navigate([PATH_CONNEXION]);
  }

}

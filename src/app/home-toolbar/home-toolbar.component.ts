import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_SUBSCRIBE } from '../app.routes.constantes';
import { PATH_CONNEXION } from '../app.routes.constantes';

@Component({
  selector: 'app-home-toolbar',
  templateUrl: './home-toolbar.component.html',
  styleUrls: ['./home-toolbar.component.css']
})
export class HomeToolbarComponent implements OnInit {

  constructor(private router: Router) { }

  navigateToSubscribe() {
    this.router.navigate([PATH_SUBSCRIBE]);
  }

  navigateToConnection() {
    this.router.navigate([PATH_CONNEXION]);
  }
  ngOnInit() {
  }

}

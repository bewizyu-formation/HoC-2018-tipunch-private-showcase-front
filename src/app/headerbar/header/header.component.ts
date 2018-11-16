import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd , UrlSegment, ParamMap } from '@angular/router';
import { PATH_SUBSCRIBE } from '../../app.routes.constantes';
import { PATH_CONNEXION } from '../../app.routes.constantes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Private Showcase';
  currentUrl: string;
  isHomePage: boolean;
  isConnectPage: boolean;
  isSubscribePage: boolean;
  showSideMenu: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = e.url;
        console.log(this.currentUrl);
        this.checkPages();
      }
    });
  }

  navigateToSubscribe() {
    this.router.navigate([PATH_SUBSCRIBE]);
  }

  navigateToConnection() {
    this.router.navigate([PATH_CONNEXION]);
  }

  checkPages() {
    this.isHomePage = this.currentUrl === '/' ?  false : true;
    this.isConnectPage = this.currentUrl === '/connexion' ?  false : true;
    this.isSubscribePage = this.currentUrl === '/inscription' ?  false : true;
    if (this.isSubscribePage) {}
    console.log(this.isHomePage);
  }
}

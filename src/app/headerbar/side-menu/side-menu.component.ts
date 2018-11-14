import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  iconName = 'menu';

  constructor() { }

  ngOnInit() {
  }

  switchIcon(){
    if (this.iconName == "menu") {
      this.iconName = 'close';
    }
    else {
      this.iconName = "menu"
    }
  }
}

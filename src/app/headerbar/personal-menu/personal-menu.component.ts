import { UserService } from './../../user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-menu',
  templateUrl: './personal-menu.component.html',
  styleUrls: ['./personal-menu.component.css']
})
export class PersonalMenuComponent implements OnInit {

  userId: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserInfos()
      .then((infos: any) => {
        this.userId = infos.artistId;
        // console.log(this.userId);
      })
      .catch(error => console.log(error));
  }

  navigateToArtist() {
    console.log(this.userId);
  }

}

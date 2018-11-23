import { ArtistService } from './../../artist/artist.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-personal-menu',
  templateUrl: './personal-menu.component.html',
  styleUrls: ['./personal-menu.component.css']
})
export class PersonalMenuComponent implements OnInit {

  artistId: number;

  constructor(private router: Router, private artistService: ArtistService, private userService: UserService) { }

  ngOnInit() {

    this.artistService.getUserInfos()
      .then((infos: any) => {
        this.artistId = infos.artistId;
        // console.log(this.userId);
      })
      .catch(error => console.log(error));
  }

  navigateToArtist() {
    console.log(this.artistId);
  }

  deconnect() {
    this.userService.clearToken();
    this.router.navigate(['']);
  }
}

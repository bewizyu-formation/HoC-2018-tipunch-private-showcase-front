import { ArtistService } from './../artist/artist.service';
import { Component, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  artists: any[];

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.artistService.getArtistList()
    .then((artists: any[]) => this.artists = artists)
    .catch(error => console.log(error));
  }
}

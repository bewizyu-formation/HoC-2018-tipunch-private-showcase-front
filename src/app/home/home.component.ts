import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Private ShowCase';
  datas : object;
  homeDescription : string;
  homeIntroduction : string;
  homeCards : object;
  
  constructor(private http: HttpClient) {

    
    this.datas = this.http.get('http://localhost:4200/assets/jsondatas.json')
      .subscribe(data => {
        this.datas = data;
        this.homeCards = this.datas['home']['cards'];
        this.homeDescription = this.datas['home'].description;
        this.homeIntroduction = this.datas['home'].introduction;
      });
      
  }

  ngOnInit() {
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  title = 'Private ShowCase';
  datas : Object;
  homeDescription :string;
  homeIntroduction :string;
  
  constructor(private http: HttpClient) {

    
    this.datas = this.http.get('http://localhost:4200/assets/jsondatas.json')
      .subscribe(data => {
        this.datas = data;
        
        this.homeDescription = this.datas['home'].description;
        this.homeIntroduction = this.datas['home'].introduction;
      });
      
  }

  ngOnInit() {
   

  }


  ngAfterViewChecked() {
   // console.table(this.datas);
  }

}

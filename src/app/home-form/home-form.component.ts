import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent implements OnInit {

    formTitle = "Formulaire d'inscription";
    jsonDastas = "http://localhost:8080/public/communes?nom=lyon";
    towns :Object;
    email = new FormControl('',[Validators.required, Validators.email]);

    /**
     * inputs values
     *
     */
    checked = false;
    diseabled = false;

  constructor(private http : HttpClient, public dialogPopup : MatDialog) { }

  private getJson(datas){
        return this.http.get(datas);
  }

  private getTownName(datas) {
   this.getJson(datas)
       .subscribe(data =>{
           this.towns = data;
       });
  }
  private  checkboxDisable(){

  }

  private  getErroMsg(){
        return this.email.hasError('required') ? "Veuillez renseigner votre email"
            : this.email.hasError('email') ? "Mauvais format d'email" : "";
  }


  private getPopUpConfirm() : void{
    const popup = this.dialogPopup.open(DialogConfirm,{
        width : '300px',
        data : {title : this.dialConfirm, content : this.dialContent }
      });
  }

  ngOnInit() {
    this.getTownName(this.jsonDastas);
    this.getErroMsg();
  }


}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher, MatDialog} from '@angular/material';
import { DialogConfirmSuscribeComponent } from '../subscribe/dialog-confirm-suscribe/dialog-confirm-suscribe.component';
import {Observable} from 'rxjs/index';

import {startWith, map} from 'rxjs/operators';
import {isUndefined} from 'util';

export const TownTestURL = 'https://geo.api.gouv.fr/communes?nom=';
export  const ConfirmPasswordTestUrl = 'minou2018';


export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;

        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.css']
})

export class HomeFormComponent implements OnInit {
    formTitle = 'Formulaire d\'inscription';
    datas: any;
    datasFilters: Observable<string[]>;
    checked = false;
    disabled = false;
    dialTitle: 'Votre inscripton est réussie';
    dialConfirm: true;
    dialContent: 'Vous recevrez un email de confirmation pour pouvoir vous connecter';


    checkedBoxModel = false;
    markedCheck = false;
    hidePassword = true;

    jsonTowns = 'http://localhost:8080/public/communes?nom=';
    jsonTest = TownTestURL;

    userMatcher = new MyErrorStateMatcher();

    /**partie user*/
    userForm: FormGroup;
    emailControl: FormControl;
    usernameControl: FormControl;
    passForm:  FormGroup;
    passwordControl: FormControl;
    passwordConfirmControl: FormControl;
    townControl: FormControl;
    isArtistControl:  FormControl;
    /** partie artist */
    artistForm: FormGroup;
    artistNameControl: FormControl;
    artistShortDescControl: FormControl;
    artistLongDescControl: FormControl;

  constructor(
      private http: HttpClient,
      public dialogPopup: MatDialog,
      fb: FormBuilder
  ) {
      this.usernameControl = fb.control('', [Validators.required, Validators.pattern('[a-zA-Z0-9\-]*'), Validators.minLength(3)]);
      this.emailControl = fb.control('', [Validators.required, Validators.email]);
      this.passwordControl = fb.control('', [Validators.required, Validators.minLength(8)]);
      this.passwordConfirmControl = fb.control('', Validators.required);
      this.townControl = fb.control('', [Validators.required, Validators.minLength(3)]);
      this.isArtistControl = fb.control(true);
      this.artistNameControl  = fb.control('', [Validators.required, Validators.pattern('[a-zA-Z0-9\-]*')]);
      this.artistShortDescControl  = fb.control('', [Validators.required, Validators.minLength(20)]);
      this.artistLongDescControl  = fb.control('', [Validators.required, Validators.minLength(150)]);

      this.userForm = fb.group({
          usernameCtrl: this.usernameControl,
          emailCtrl: this.emailControl,
          townCtrl: this.townControl,
          isArtistCtrl: this.isArtistControl
      });
      this.passForm = fb.group({
          passwordCtrl: this.passwordControl,
          passwordConfirmCtrl: this.passwordConfirmControl,
      })
      this.artistForm = fb.group({
          artistNameCtrl: this.artistNameControl,
          ShortDescCtrl: this.artistShortDescControl,
          artistLongDesCtrl: this.artistLongDescControl
      });
      const control = new FormControl('ng', Validators.minLength(3));
  }


  reset() {
      this.emailControl.setValue('');
      this.usernameControl.setValue('');
      this.passwordControl.setValue('');
      this.townControl.setValue('');
      this.isArtistControl.setValue('');
      this.artistNameControl .setValue('');
      this.artistShortDescControl .setValue('');
      this.artistLongDescControl .setValue('');
  }

  private getJson(datas) {
        return this.http.get(datas);
  }

  private setTownName(): any {
      this.townControl.valueChanges.subscribe(
          (value) => {
              this.getJson(`${this.jsonTowns}${value}`)
                  .subscribe((data: any[]) => {
                      if (value.length >= 1) {
                          data.length = 10;
                          this.datas = data;
                          this.datas.length = data.length;
                      }
                  });
          },
      );
  }

  private townFilter(value: string): string[] {
        const filterValue = value['nom'].toLowerCase();
        return this.setTownName().filter(commune => commune.toLowerCase().includes(filterValue));
  }

  toggleChecked() {
      this.markedCheck  = !this.markedCheck ;
  }
  /*
    hidePasswordModel = false;
    typePassword = 'password';
    passswordValue : string;
    togglePassword() {
        this.hidePassword = !this.hidePassword;
        this.hidePassword ? 'visibility_hoff' : 'visibility';
        this.hidePassword ? 'password' : 'texte';
    }
  */
  private getPasswordPath(pathCompare: string) {
      return pathCompare;
  }

  openPopupConfirm(): void {
      const dialConfirmRef = this.dialogPopup.open(DialogConfirmSuscribeComponent, {
          width: '300px',
          height: '300px',
          data: {title: this.dialTitle, content: this.dialContent, confirm: this.dialConfirm}});

      dialConfirmRef.afterClosed()
          .subscribe(res => {
              this.dialConfirm = res;
              console.log(this.dialConfirm);
          });
  }
  register() {
 uri =
      'users/add?username=' + this.usernameControl +
      '&password=' +  this.passwordControl +
      '&email=' + this.emailControl +
      '&cityName=lyon' + this.townControl +
      '&cityCode=69001' + this.cityCode
      console.log(this.userForm.value);
      console.log(this.passForm.value);
      console.log(this.artistForm.value);

      console.log(this.emailControl.value);
      console.log(this.townControl.value);
      console.log(this.artistNameControl.value);
      console.log(this.isArtistControl.value);
      console.log(this.artistForm.value);
  }
  /* 'users/add?username=roger&password=army&email=roger@r.tc&cityName=lyon&cityCode=69001&deptCode=69'

    uriUsers = '/users/add?';
  uriUsers  += 'username=' + this.usernameCtrl;
  uriUsers  += '&password='+ this.passwordControl;*/



  ngOnInit() {
    this.setTownName();
  }
}

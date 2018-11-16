import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatInput} from '@angular/material';
import { DialogConfirmSuscribeComponent } from '../subscribe/dialog-confirm-suscribe/dialog-confirm-suscribe.component';
import {Observable} from 'rxjs/index';
import {startWith, map} from 'rxjs/operators';

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

    pathMatchCtrl: string;
    checkedBoxModel = false;
    markedCheck = false;
    hidePassword = true;

    jsonTowns = 'http://localhost:8080/public/communes?nom=';
    jsonTest = TownTestURL;


    /**partie user*/
    userForm: FormGroup;
    emailControl: FormControl;
    usernameControl: FormControl;
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
      subsCribeForm: FormBuilder
  ) {
      this.usernameControl = subsCribeForm.control('', [Validators.required, Validators.pattern('[a-zA-Z0-9\-]*'), Validators.minLength(3)]);
      this.emailControl = subsCribeForm.control('', [Validators.required, Validators.email]);
      this.passwordControl = subsCribeForm.control('', [Validators.required, Validators.minLength(8)], Validators.pattern(this.pathMatchCtrl));

      this.passwordConfirmControl = subsCribeForm.control('', Validators.required);

      this.townControl = subsCribeForm.control('', [Validators.required, Validators.minLength(3)]);
      this.isArtistControl = subsCribeForm.control(true);
      this.userForm = subsCribeForm.group({
          usernameCtrl: this.usernameControl,
          emailCtrl: this.emailControl,
          passwordCtrl: this.passwordControl,
          passwordConfirmCtrl: this.passwordConfirmControl,
          townCtrl: this.townControl,
          isArtistCtrl: this.isArtistControl
      });

      this.artistNameControl  = subsCribeForm.control('', [Validators.required, Validators.pattern('[a-zA-Z0-9\-]*')]);
      this.artistShortDescControl  = subsCribeForm.control('', [Validators.required, Validators.minLength(20)]);
      this.artistLongDescControl  = subsCribeForm.control('', [Validators.required, Validators.minLength(150)]);
      this.artistForm = subsCribeForm.group({
          artistNameCtrl: this.artistNameControl,
          ShortDescCtrl: this.artistShortDescControl,
          artistLongDesCtrl: this.artistLongDescControl
      });
      const control = new FormControl('ng', Validators.minLength(3));

      console.log(control.errors);
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

  private setTownName():any {
      // this.datasFilters = this.townControl.valueChanges
      //     .pipe(
      //         startWith(''),
      //         map(value => this.townFilter(value))
      //     );

       // console.log( this.datasFilters);
       // this.getJson(this.jsonTowns + this.datasFilters)
       //     .subscribe(data =>{
       //         this.datas = data;
       //     });
  }


  private townFilter(value:string):string[]{
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
    private getPasswordPath(pathCompare:string) {
        return pathCompare;
    }

    /**
     * gestion des errors
     * @returns {string|string|string}
     *
  private  getErroMsg() {

        return this.emailControl.hasError('required') ? 'Veuillez renseigner votre email'
           : this.emailControl.hasError('email') ? 'Mauvais format d\'email': '';

  }*/

    /**
     * On confirm button get Pop up from
     */
    openPopupConfirm(): void{
      const dialConfirmRef = this.dialogPopup.open(DialogConfirmSuscribeComponent, {
          width: '300px',
          height: '300px',
          data: {title: this.dialTitle, content: this.dialContent , confirm: this.dialConfirm}
      });

      dialConfirmRef.afterClosed()
          .subscribe(res => {
              this.dialConfirm = res;
              console.log(this.dialConfirm);
          });
  }

    /**
     *
     */
  register() {
        console.log(this.userForm.value);
        console.log(this.artistForm.value);
  }

    /**
     *
     */

  ngOnInit() {
    this.townControl.valueChanges.subscribe(
        (value) => {
            /*this.getJson(${this.jsonTowns}${value}`)*/
            this.getJson(`${this.jsonTest}${value}`)
                .subscribe(data => {
                    console.log(value);
                    this.datas = data;
                    console.log(this.datas);
                });
        },
    );
      console.log(this.jsonTest);

  }
}

export const TownTestURL = 'https://geo.api.gouv.fr/communes?nom=';



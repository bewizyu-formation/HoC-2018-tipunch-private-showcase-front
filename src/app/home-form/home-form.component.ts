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


    /**
     * DATAS URL
     * @type {string}
     */
    jsonTowns = 'http://localhost:8080/public/communes?nom=';

    /**
     *
     * @type {FormControl}
     *
    emailControl = new FormControl('', [Validators.required, Validators.email]);
    usernameControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]')]);
    passwordControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
    townControl = new FormControl('', [Validators.required,Validators.minLength(3)]);
*/

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

    checkedBoxModel = false;
    markedCheck = false;
    markedView = false;

  constructor(
      private http: HttpClient,
      public dialogPopup: MatDialog,
      subsCribeForm: FormBuilder
  ) {
      this.usernameControl = subsCribeForm.control('',
        [Validators.required, Validators.pattern('[a-zA-Z0-9\-]*'), Validators.minLength(3)]);
      this.emailControl = subsCribeForm.control('', [Validators.required, Validators.email]);
      this.passwordControl = subsCribeForm.control('', [Validators.required, Validators.minLength(8)]);

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
    /**
     * Request datas
     * @param datas
     * @returns {Observable<Object>}
     */
    private getJson(datas) {
        return this.http.get(datas);
  }

  /**
     * Validator Towns
     * @param datas dfds
   * */
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

    /**
     *
     * @param value
     */
  private townFilter(value:string):string[]{
        const filterValue = value['nom'].toLowerCase();
        return this.setTownName().filter(commune => commune.toLowerCase().includes(filterValue));
  }
/*
    show = false;
    toggle() {
        this.show = !this.show;

        // CHANGE THE NAME OF THE BUTTON.
        if(this.show)
            console.log( 'Hide');
        else
            console.log( 'Show');
    }*/

    toggleChecked(e) {
            this.markedCheck  = !this.markedCheck ;
    }

    togglePassword(){
        this.markedView = !this.markedView;
        if (this.markedView){
            /** todo recupérer le input type */
           // this.input.changeType("text");
        }
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
    jsonTest = TownTestURL;

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
  }
}

export const TownTestURL = 'https://geo.api.gouv.fr/communes?nom=';

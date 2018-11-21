import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
    FormControl,
    FormBuilder, FormGroup,
    Validators,
    FormGroupDirective,
    NgForm,
    AbstractControl,
    /** REACTIVE_FORM_DIRECTIVES**/
} from '@angular/forms';


import {ErrorStateMatcher, MatDialog} from '@angular/material';
import { DialogConfirmSuscribeComponent } from '../subscribe/dialog-confirm-suscribe/dialog-confirm-suscribe.component';
import {Observable} from 'rxjs/index';
import {isNullOrUndefined} from "util";

export const TownTestURL = 'https://geo.api.gouv.fr/communes?nom=';


//const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;

        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-home-form',
    templateUrl: './home-form.component.html',
    styleUrls: ['./home-form.component.css'],
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
    hidePassword = false;

    jsonTowns = 'http://localhost:8080/public/communes/nom?value=';
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
    cityCodeControl: FormControl;
    isArtistControl:  FormControl;
    /** partie artist */
    artistForm: FormGroup;
    artistNameControl: FormControl;
    artistShortDescControl: FormControl;
    artistLongDescControl: FormControl;

    /** PASSWORD https://stackoverflow.com/questions/48350506/how-to-validate-password-strength-with-angular-5-validator-pattern **/
    /**
     * matError tag
     * @type {{username: [{type: string; message: string},{type: string; message: string},{type: string; message: string},{type: string; message: string}]; email: [{type: string; message: string},{type: string; message: string}]; password: [{type: string; message: string},{type: string; message: string},{type: string; message: string}]}}
     */
    subscribe_validation_messages = {
        'username': [
            {type: 'required', message: 'Le nom d\'utilisateur est requis'},
            {type: 'minlength', message: 'nom d\'utilisateur trop court'},
            {type: 'pattern', message: 'mauvais format de saisi'},
            {type: 'validUsername', message: 'ce nom d\'utilisateur est déjà pris'}
        ],
        'email': [
            { type: 'required', message: 'Email requis' },
            { type: 'pattern', message: 'Entrez un email valid : monemail@servermail.extension'},
            { type: 'email', message: 'Entrez un email valid : monemail@servermail.extension'}

        ],
        'password': [
            { type: 'required', message: 'Password requis' },
            { type: 'minlength', message: 'Le password est trop court' },
            { type: 'pattern', message: '8 caractères minimum, comporte au moins une majascule, une minuscule et un chiffre' }
        ],
        'passwordConfirm': [
            { type: 'required', message: 'Password requis' },
            { type: 'minlength', message: 'Le password est trop court' },
            { type: 'pattern', message: '8 caractères minimum, comporte au moins une majascule, une minuscule et un chiffre' }
        ],
        'cityName' : [
            { type: 'required', message: 'votre ville doit être renseigner'}
        ],
        'artistName': [
            {type: 'required', message: 'Le nom d\'artiste est requis'},
            {type: 'minlength', message: 'nom d\'artiste trop court'},
            {type: 'pattern', message: 'mauvais format de saisi'},
            {type: 'validUsername', message: 'ce nom d\'artiste est déjà pris'}
        ],
        'artistShortDesc':[
            {type: 'minlength', message: '50 caractères minimum'},
        ]
    };



    constructor(
        private http: HttpClient,
        public dialogPopup: MatDialog,
        fb: FormBuilder
    ) {
        this.usernameControl = fb.control('',
            Validators.compose([StringValidator.validStringMatch,
            Validators.required, Validators.pattern('[a-zA-Z0-9\-]*'), Validators.minLength(3)]));
        this.emailControl = fb.control('',
            [Validators.required, Validators.pattern('^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$)')]);

        this.passwordControl = fb.control('',
            Validators.compose([Validators.required, Validators.minLength(8),
                Validators.pattern('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9])+$')]));
        this.passwordConfirmControl = fb.control('',
            Validators.compose([Validators.required, Validators.minLength(8),
                Validators.pattern('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9])+$')]));
        //this.passwordConfirmControl = fb.control('');
        this.townControl = fb.control('', [Validators.required]);
        this.cityCodeControl = fb.control('');
        this.isArtistControl = fb.control(true);
        this.artistNameControl  = fb.control('pitou4_',  Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9\-]*')]));
        this.artistShortDescControl  = fb.control('', Validators.compose([Validators.required, Validators.minLength(50)]));
        this.artistLongDescControl  = fb.control('', Validators.compose([Validators.required, Validators.minLength(150)]));

        this.userForm = fb.group({
            username: this.usernameControl,
            email: this.emailControl,
            cityName: this.townControl,
            cityCode: this.cityCodeControl,
            isArtist: this.isArtistControl,
            passForm: fb.group(
                {
                    password: this.passwordControl,
                    passwordConfirm: this.passwordConfirmControl
                },
                (passForm: FormGroup) => {
                    return MatcherValueFormGroup.matchMp(passForm);
                })
    });

        this.artistForm = fb.group({
            artistName: this.artistNameControl,
            artistShortDesc: this.artistShortDescControl,
            artistLongDes: this.artistLongDescControl
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
        console.log(this.getJson(`${this.jsonTowns}`));
        this.townControl.valueChanges.subscribe(
            (value) => {

                this.getJson(`${this.jsonTest}${value}`)
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
    toggleChecked() {this.markedCheck  = !this.markedCheck ;}
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
    matching_passwords_group = new FormGroup({
        password: new FormControl('', Validators.compose([
            Validators.minLength(5),
            Validators.required,
            Validators.pattern('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]\{8,\})+$') //this is for the letters (both uppercase and lowercase) and numbers validation
        ])),

        confirm_password: new FormControl('', Validators.required)
    });

    /**
     *
     * @param fc
     * @returns {any}
     */


    /**
     *
     * @param formGrouformParentGroup
     **/
    register(formParentGroup) {
        const baseUri = 'http://localhost:8080/public/';
        const uri = baseUri +
            'users/add?username=' + formParentGroup.username +
            '&password=' +  formParentGroup.password +
            '&email=' + formParentGroup.email +
            '&cityName=' + formParentGroup.cityName +
            '&cityCode=' + formParentGroup.cityCode;

        if (formParentGroup.isArtist) {
            const artisUri = uri +
                '&artistName=' + formParentGroup.artistName  +
                '&artisDesc=' + formParentGroup.artistLongDes;
            console.log('ARTIST URI:' + artisUri);

        }
        console.log(uri);
        console.log(formParentGroup);

    }

    ngOnInit() {
        this.reset();
        this.setTownName();
    }

    private compareUserName() {
        console.log(this.usernameControl);
    }

}




export class StringValidator {
    static validStringMatch(fc: FormControl){
        if (fc.value.toLowerCase() === 'Minou' || fc.value.toLowerCase() === 'Minou') {
            return ({validStringMatch: true});
        } else {
            return (null);
        }
    }
}
/*
matchingPasswords( control: AbstractControl ) {
    const password = control.get( 'password' );
    const confirm = control.get( 'passwordConfirm' );

    if ( !password || !confirm ) {
        return null;
    }
    if (password.invalid) {
        return {invalidPassword : true};
    }
    console.log(password.value);
    console.log(confirm.value);
    console.log(password.value === confirm.value);

    return password.value === confirm.value ? null : { noMatch: true };
}
*/
/**
 * dans le formGroup On verify si chaque form control est valid
 * si il est similaire on renvoie la valeur
 *
 *
 * sinon  faut
 * @param fg type Formgroup qui est le parent
 * @returns {any}
 */

export class MatcherValueFormGroup {
    static  matchMp(passForm: FormGroup) {
        let value;
        let valid = true;

        for (let key in passForm.controls) {
            if (passForm.controls.hasOwnProperty(key)) {
                let control: FormControl = <FormControl>passForm.controls[key];
                if (value === undefined) {
                    value = control.value;
                }
                else {
                    if (value !== control.value) {
                        valid = false;
                        break;
                    }
                }
            }
        }
        return valid ? null : {matchMp: true};
    }
}
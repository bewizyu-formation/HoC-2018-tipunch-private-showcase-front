import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './../user/user.service';
import {
    FormControl,
    FormBuilder, FormGroup,
    Validators,
    FormGroupDirective,
    NgForm,
    AbstractControl,
} from '@angular/forms';


import {ErrorStateMatcher, MatDialog} from '@angular/material';
import { DialogConfirmSuscribeComponent } from '../subscribe/dialog-confirm-suscribe/dialog-confirm-suscribe.component';
import {Observable} from 'rxjs/index';
import {isNullOrUndefined} from 'util';
import {EnvironmentService} from '../services/environment.service';
import {StringValidator} from '../string-validator/string-validator.module';
import {MatcherFormGroupValidatorModule} from '../matcher-form-group-validator/matcher-form-group-validator.module';
import {delay, distinct, distinctUntilChanged} from "rxjs/internal/operators";

//export const TestUri = 'https://geo.api.gouv.fr/communes?nom=';
const JsonTowns ='/public/communes/nom?value=';

export const TestTown = 'https://geo.api.gouv.fr/communes?nom=';

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

    disabled = false;
    dialTitle: 'Votre inscripton est réussie';
    dialConfirm: true;
    dialContent: 'Vous recevrez un email de confirmation pour pouvoir vous connecter';

    // MODEL VALUES
    checkedBoxModel = false;
    markedCheck = false;
    hidePassword = false;

    userMatcher = new MyErrorStateMatcher();

    /**partie user*/
    userForm: FormGroup;
    emailControl: FormControl;
    usernameControl: FormControl;
    passForm:  FormGroup;
    passwordControl: FormControl;
    passwordConfirmControl: FormControl;
    townControl: FormControl;
    deptCodeControl: FormControl;
    isArtistControl:  FormControl;
    /** partie artist */
    artistForm: FormGroup;
    artistNameControl: FormControl;
    artistShortDescControl: FormControl;
    artistLongDescControl: FormControl;

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
            { type: 'minlength', message: 'Le password est trop court 8 caractères minimum' },
            { type: 'pattern', message: 'comporte au moins une majascule, une minuscule et un chiffre' }
        ],
        'passwordConfirm': [
            { type: 'required', message: 'Password requis' },
            { type: 'minlength', message: 'Le password est trop court 8 caractères minimum' },
            { type: 'pattern', message: ' comporte au moins une majascule, une minuscule et un chiffre' }
        ],
        'cityName' : [
            { type: 'required', message: 'votre ville doit être renseigner'}
        ],
        'artistName': [
            {type: 'required', message: 'Le nom d\'artiste est requis'},
            {type: 'minlength', message: 'nom d\'artiste trop court'},
            {type: 'pattern', message: 'mauvais format de saisi'},
           // {type: 'validUsername', message: 'ce nom d\'artiste est déjà pris'}
        ],
        'artistShortDesc':[
            {type: 'minlength', message: '50 caractères minimum'},
        ]
    };

    constructor(
        private env: EnvironmentService,
        private http: HttpClient,
        public dialogPopup: MatDialog,
        fb: FormBuilder,
        private addUser: UserService
    ) {
        this.usernameControl = fb.control('',
            Validators.compose([StringValidator.validStringMatch,
            Validators.required, Validators.pattern('[a-zA-Z0-9\-]*'), Validators.minLength(3)]));
        this.emailControl = fb.control('',
            [Validators.required, Validators.pattern('^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$)')]);

        this.passwordControl = fb.control('',
            Validators.compose([Validators.required, Validators.minLength(8),
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]));
        this.passwordConfirmControl = fb.control('',
            Validators.compose([Validators.required, Validators.minLength(8),
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]));

        this.townControl = fb.control('', [Validators.required]);
        this.deptCodeControl = fb.control('');
        this.isArtistControl = fb.control(true);
        this.artistNameControl  = fb.control('',  Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9\-]*')]));
        this.artistShortDescControl  = fb.control('', Validators.compose([Validators.required, Validators.minLength(50)]));

        this.userForm = fb.group({
            username: this.usernameControl,
            email: this.emailControl,
            cityName: this.townControl,
            deptCode: this.deptCodeControl,
            isArtist: this.isArtistControl,
            passForm: fb.group(
                {
                    password: this.passwordControl,
                    passwordConfirm: this.passwordConfirmControl
                },
                (passForm: FormGroup) => {
                    return MatcherFormGroupValidatorModule.matchMp(passForm);
                }),
            artistForm: fb.group({
                artistName: this.artistNameControl,
                artistShortDesc: this.artistShortDescControl
            })
    });
    }
    reset() {
        this.emailControl.setValue('');
        this.usernameControl.setValue('');
        this.passwordControl.setValue('');
        this.townControl.setValue('');
        this.isArtistControl.setValue('');
        this.artistNameControl .setValue('');
        this.artistShortDescControl .setValue('');
    }

    private getJson(datas) {
        return this.http.get(datas);
    }

    private setTownName(): any {
        this.townControl.valueChanges.pipe(
            delay(300),
            distinct(),
        )
            .subscribe(
            (value) => {
                this.getJson(`${this.env.getPrivateShowcaseApiConfig().uri}${JsonTowns}${value}`)
                // this.getJson(`${TestTown}${value}`)
                    .subscribe((data: any[]) => {
                        if (value.length >= 1) {
                            // data.length = 10;
                            this.datas = data;
                            // this.datas.length = data.length;
                        }
                    });
            },
        );
    }


    /**
     * check si la le input est checked pour afficher le rest du formulaire
     */
    toggleChecked() {this.markedCheck  = !this.markedCheck; }

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

    registerTest(formParentGroup) {


        // 1-


        // 2-


        // 3-









        this.datas.forEach((city : any) => {
            console.log('XXXXX' , `${city.nom} ${codesPostaux[0]}` === this.userForm.value.cityName);
        })



        const baseUri = 'http://localhost:8080/';

        let uri = baseUri +
            'users/add?username=' + formParentGroup.username +
            '&password=' +  formParentGroup.passForm.password +
            '&email=' + formParentGroup.email +
            '&cityName=' + ((formParentGroup.cityName).split('\ ')[0]) +
            '&cityCode=' + ((formParentGroup.cityName).split('\ ')[1]) +
            '&deptCode=' + ((formParentGroup.cityName).split('\ ')[1]).slice(0, -3);
        if (formParentGroup.isArtist) {
            uri = uri +
                '&artistName=' + formParentGroup.artistForm.artistName +
                '&artistDesc=' + formParentGroup.artistForm.artistShortDesc;
        }
        console.log(uri);
        return uri;
    }

    /**
     * valeur attendu dans le service username: string, password: string, email: string, cityName: string,
     * cityCode: string
     * @param formParentGroup
     **/
    register(formParentGroup) {
        /*this.addUser.subscription(
            formParentGroup.username,
            formParentGroup.passForm.password,
            formParentGroup.email,
            ((formParentGroup.cityName).split('\ ')[0]),
            ((formParentGroup.cityName).split('\ ')[1]),
            ((formParentGroup.cityName).split('\ ')[1]).slice(0, -3),
        );*/
    }

    ngOnInit() {
        this.reset();
        this.setTownName();
    }

    private compareUserName() {
        console.log(this.usernameControl);
    }
}

import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
    FormControl,
    FormBuilder, FormGroup,
    Validators,
    FormGroupDirective,
    NgForm,
    AbstractControl
} from '@angular/forms';
import {ErrorStateMatcher, MatDialog} from '@angular/material';
import { DialogConfirmSuscribeComponent } from '../subscribe/dialog-confirm-suscribe/dialog-confirm-suscribe.component';
import {Observable} from 'rxjs/index';

export const TownTestURL = 'https://geo.api.gouv.fr/communes?nom=';

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

    constructor(
        private http: HttpClient,
        public dialogPopup: MatDialog,
        fb: FormBuilder
    ) {
        this.usernameControl = fb.control('',
            [Validators.required, Validators.pattern('[a-zA-Z0-9\-]*'), Validators.minLength(3)]);
        this.emailControl = fb.control('', [Validators.required, Validators.email]);
        this.passwordControl = fb.control('', [Validators.required, Validators.minLength(8)]);
        this.passwordConfirmControl = fb.control('');
        this.townControl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.cityCodeControl = fb.control('');
        this.isArtistControl = fb.control(true);
        this.artistNameControl  = fb.control('', [Validators.required, Validators.pattern('[a-zA-Z0-9\-]*')]);
        this.artistShortDescControl  = fb.control('', [Validators.required, Validators.minLength(20)]);
        this.artistLongDescControl  = fb.control('', [Validators.required, Validators.minLength(150)]);

        this.userForm = fb.group({
            username: this.usernameControl,
            email: this.emailControl,
            cityName: this.townControl,
            cityCode: this.cityCodeControl,
            isArtist: this.isArtistControl,
            passForm : fb.group({
                    password: this.passwordControl,
                    passwordConfirm: this.passwordConfirmControl},
                { validator: [this.matchingPasswords]}),
        });

        this.artistForm = fb.group({
            artistName: this.artistNameControl,
            ShortDesc: this.artistShortDescControl,
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

    private matchingPasswords( control: AbstractControl ) {
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

    toggleChecked() {
        this.markedCheck  = !this.markedCheck ;
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
        const baseUri = 'http://localhost:8080/public/';
        const uri = baseUri +
            'users/add?username=' + this.usernameControl.value +
            '&password=' +  this.passwordControl.value +
            '&email=' + this.emailControl.value +
            '&cityName=' + this.townControl.value +
            '&cityCode=' + this.cityCodeControl.value;
        //console.log(uri);
        console.log(this.passForm);
    }

    ngOnInit() {
        this.reset();
        this.setTownName();
    }
}

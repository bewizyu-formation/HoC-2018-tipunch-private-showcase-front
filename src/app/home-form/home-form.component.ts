import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './../user/user.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';


import {ErrorStateMatcher} from '@angular/material';
import {DialogConfirmSuscribeComponent} from '../subscribe/dialog-confirm-suscribe/dialog-confirm-suscribe.component';
import {EnvironmentService} from '../services/environment.service';
import {StringValidator} from '../string-validator/string-validator.module';
import {MatcherFormGroupValidatorModule} from '../matcher-form-group-validator/matcher-form-group-validator.module';
import {delay, distinct} from 'rxjs/internal/operators';
import {Router} from '@angular/router';

// export const TestUri = 'https://geo.api.gouv.fr/communes?nom=';
const JsonTowns = '/public/communes/nom?value=';

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
    cities: any;

    disabled = false;
    // dialTitle: 'Votre inscripton est réussie';
    // dialConfirm: true;
    // dialContent: 'Vous recevrez un email de confirmation pour pouvoir vous connecter';

    // MODEL VALUES
    hidePassword = false;
    userMatcher = new MyErrorStateMatcher();

    /**partie user*/
    userForm: FormGroup;
    emailControl: FormControl;
    usernameControl: FormControl;
    passForm: FormGroup;
    passwordControl: FormControl;
    passwordConfirmControl: FormControl;
    townControl: FormControl;
    isArtistControl: FormControl;
    /** partie artist */
    artistForm: FormGroup;
    artistNameControl: FormControl;
    artistShortDescControl: FormControl;
    artistLongDescControl: FormControl;

    cityName: string;
    cityCode: string;
    deptCode: string;

    /**
     * tableau des erreurs controler form
     */
    subscribe_validation_messages = {
        'username': [
            {type: 'required', message: 'Le nom d\'utilisateur est requis'},
            {type: 'minlength', message: 'nom d\'utilisateur trop court'},
            {type: 'pattern', message: 'mauvais format de saisi'},
            {type: 'validUsername', message: 'ce nom d\'utilisateur est déjà pris'}
        ],
        'email': [
            {type: 'required', message: 'Email requis'},
            {type: 'pattern', message: 'Entrez un email valid : monemail@servermail.extension'},
            {type: 'email', message: 'Entrez un email valid : monemail@servermail.extension'}

        ],
        'password': [
            {type: 'required', message: 'Password requis'},
            {type: 'minlength', message: 'Le password est trop court 8 caractères minimum'},
            {type: 'pattern', message: 'comporte au moins une majascule, une minuscule et un chiffre'}
        ],
        'passwordConfirm': [
            {type: 'required', message: 'Password requis'},
            {type: 'minlength', message: 'Le password est trop court 8 caractères minimum'},
            {type: 'pattern', message: ' comporte au moins une majascule, une minuscule et un chiffre'}
        ],
        'cityName': [
            {type: 'required', message: 'votre ville doit être renseigner'}
        ],
        'artistName': [
            {type: 'required', message: 'Le nom d\'artiste est requis'},
            {type: 'minlength', message: 'nom d\'artiste trop court'},
            {type: 'pattern', message: 'mauvais format de saisi'},
            // {type: 'validUsername', message: 'ce nom d\'artiste est déjà pris'}
        ],
        'artistShortDesc': [
            {type: 'required', message: 'Une description est requise'},
            {type: 'minlength', message: '20 caractères minimum'},
            {type: 'maxlength', message: '150 caractères maximum'},
        ]
    };

    constructor(private env: EnvironmentService,
                private http: HttpClient,
                fb: FormBuilder,
                private userService: UserService,
                private router: Router) {

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

        // this.deptCodeControl = fb.control('');
        this.isArtistControl = fb.control(false);
        this.artistNameControl = fb.control('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9\-]*')]));
        this.artistShortDescControl = fb.control('', Validators.compose([Validators.required, Validators.minLength(15), Validators.maxLength(150)]));

        this.userForm = fb.group({
            username: this.usernameControl,
            email: this.emailControl,
            cityName: this.townControl,
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
        // this.router.navigate([PATH_HOME]);
        /*
         this.emailControl.setValue('');
         this.usernameControl.setValue('');
         this.passwordControl.setValue('');
         this.townControl.setValue('');
         this.isArtistControl.setValue('');
         this.artistNameControl .setValue('');
         this.artistShortDescControl .setValue('');
         */
    }

    private getJson(datas) {
        return this.http.get(datas);
    }

    private setTownName(): any {
        this.townControl.valueChanges.pipe(
            delay(100),
            distinct(),
        )
            .subscribe(
                (value) => {
                    // this.getJson(`${this.env.getPrivateShowcaseApiConfig().uri}${JsonTowns}${value}`)
                    this.getJson(`${TestTown}${value}`)
                        .subscribe((data: any[]) => {
                            if (value.length >= 1) {
                                this.cities = data;
                            }
                        });
                },
            );
    }

    openPopupConfirm(): void {
        // const dialConfirmRef = this.dialogPopup.open(DialogConfirmSuscribeComponent, {
        //     width: '300px',
        //     height: '300px',
        //     data: {title: this.dialTitle, content: this.dialContent, confirm: this.dialConfirm}
        // });
        //
        // dialConfirmRef.afterClosed()
        //     .subscribe(res => {
        //         this.dialConfirm = res;
        //         console.log(this.dialConfirm);
        //     });
    }

    /**
     * valeur attendu dans le service username: string, password: string, email: string, cityName: string,
     * cityCode: string, sityDeptCode
     * @param formParentGroup est l'objet que retour le formulaire au submit
     **/
    register() {
        const userFormValue = this.userForm.value;
        console.log('USER FORM', userFormValue);

        const city = this.cities.find(item => `${item.nom} ${item.codesPostaux[0]}` === userFormValue.cityName);
        console.log('CITY', city);


        this.userService.subscription(
            userFormValue.username,
            userFormValue.passForm.password,
            userFormValue.email,
            city.nom,
            city.code,
            city.codeDepartement,
            userFormValue.artistForm.artistName,
            userFormValue.artistForm.artistShortDesc,
        )
            .then(() => console.log('User inscrit'))
            .catch(error => console.log('User error', error))
            .catch(error => console.log('User error', error.error.message));
    }

    ngOnInit() {
        this.reset();
        this.setTownName();
    }

    private compareUserName() {
        console.log(this.usernameControl);
    }
}

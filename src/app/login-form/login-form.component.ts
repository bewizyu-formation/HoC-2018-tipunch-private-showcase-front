import { PATH_HOME, PATH_WELCOME } from './../app.routes.constantes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  formTitle = 'Formulaire de connexion';
  datas: any;

  /**partie user*/
  userForm: FormGroup;
  emailControl: FormControl;
  usernameControl: FormControl;
  passwordControl: FormControl;
  userToken: string;

  constructor(
    subscribeForm: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.usernameControl = subscribeForm.control('', [Validators.required]);
    this.emailControl = subscribeForm.control('', [Validators.required, Validators.email]);
    this.passwordControl = subscribeForm.control('', [Validators.required]);
    this.userForm = subscribeForm.group({
      username: this.usernameControl,
      password: this.passwordControl
    });

  }

  reset() {
      this.router.navigate([PATH_HOME]);
  }

  register(loginForm) {
    this.userService.login(loginForm.username, loginForm.password);
    setTimeout(() => {
      // this.userToken = this.userService.token;
      if (!this.userService.token) {
        alert('Nom d\'utilisateur et/ou mot de passe incorrect(s).');
      } else {
          this.router.navigate([PATH_WELCOME]);
      }
    }, 300);
  }

  ngOnInit() {
  }
}

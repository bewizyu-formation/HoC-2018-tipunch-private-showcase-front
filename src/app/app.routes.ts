import { ContactsComponent } from './contacts/contacts.component';
import { EventsComponent } from './events/events.component';
import { LoggedInGuard } from './logged-in.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { Routes } from '@angular/router';
import { Error404Component } from './error404/error404.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'inscription', component: SubscribeComponent },
  { path: 'connexion', component: LoginFormComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [LoggedInGuard]},
  { path: 'events', component: EventsComponent, canActivate: [LoggedInGuard]},
  { path: 'contacts', component: ContactsComponent, canActivate: [LoggedInGuard]},
  { path: '**', component: Error404Component },
];

import {HomeComponent} from './home/home.component';
import {SubscribeComponent} from './subscribe/subscribe.component';
import {Routes} from '@angular/router';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'inscription', component: SubscribeComponent }
];

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class MatcherFormGroupValidatorModule {
/**
 * dans le formGroup On verify si chaque form control est valid
 * si il est similaire on renvoie la valeur
 *
 *
 * sinon  faut
 * @param fg type Formgroup qui est le parent
 * @returns {any}
 */

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

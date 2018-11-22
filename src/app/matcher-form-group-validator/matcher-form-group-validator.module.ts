
import {FormControl, FormGroup} from '@angular/forms';

export class MatcherFormGroupValidatorModule {
/**
 * dans le formGroup On verify si chaque form control est valid
 * si il est similaire on renvoie la valeur
 *
 *
 * sinon  faut
 * @param passForm type Formgroup qui est le parent
 * @returns null/boolean renvois null si valid  ou matchup Si invalid
 */

  static  matchMp(passForm: FormGroup) {
    let value;
    let valid = true;

    for (const key in passForm.controls) {
      if (passForm.controls.hasOwnProperty(key)) {
        const control: FormControl = <FormControl>passForm.controls[key];
        if (value === undefined) {
          value = control.value;
        } else {
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

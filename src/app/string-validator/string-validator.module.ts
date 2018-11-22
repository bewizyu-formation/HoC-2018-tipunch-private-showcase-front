import {Injectable, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})

export class StringValidator {
  static validStringMatch(fc: FormControl) {
    if (fc.value.toLowerCase() === 'Minou' || fc.value.toLowerCase() === 'Minou') {
      return ({validStringMatch: true});
    } else {
      return (null);
    }
  }
}

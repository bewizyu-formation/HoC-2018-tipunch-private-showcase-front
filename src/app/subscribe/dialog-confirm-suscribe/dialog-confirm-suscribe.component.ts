import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogConfirmSuscribeData {
    dialTitle: string;
    dialConfirm: false;
    dialContent: string;
}
@Component({
  selector: 'app-dialog-confirm-suscribe',
  templateUrl: './dialog-confirm-suscribe.component.html',
  styleUrls: ['./dialog-confirm-suscribe.component.css']
})

export class DialogConfirmSuscribeComponent implements OnInit {
  constructor(
      public dialConfirmRef: MatDialogRef<DialogConfirmSuscribeComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogConfirmSuscribeData) {}

  onNoClick() {
      this.dialConfirmRef.close();
      if (this.data.dialConfirm) {
          /**
           * TODO drop table.
           */
          console.log('cancel');
      }
  }
  ngOnInit() {
  }

}

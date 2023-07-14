import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  formData: {
    name: string;
    price: string;
    category: string;
  } = {
    name: '',
    price: '',
    category: ''
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product: any },
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  onSubmit() {
    console.log(this.formData);
    this.dialogRef.close(this.formData);
  }
}

import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss',
})
export class FormDialogComponent {
  formGroup: FormGroup = new FormGroup({
    startDate: new FormControl<string>(''),
    startTime: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/^(?:[01][0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?$/),
    ]),
    endDate: new FormControl<string>(''),
    endTime: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/^(?:[01][0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?$/),
    ]),
  });

  addSession() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    }
  }
}

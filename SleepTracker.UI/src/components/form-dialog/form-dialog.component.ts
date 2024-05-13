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
import { formatDate } from '@angular/common';
import { SleepSessionDTO } from '../../models/SleepSessionDTO';
import { SleepSessionsService } from '../../services/sleep-sessions.service';
import { MatDialogRef } from '@angular/material/dialog';

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
  private regex: RegExp = /^(?:[01][0-9]|2[0-3]):[0-5][0-9]$/;
  today = new Date();

  formGroup: FormGroup = new FormGroup({
    startDate: new FormControl<string>('', [Validators.required]),
    startTime: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(this.regex),
    ]),
    endDate: new FormControl<string>('', [Validators.required]),
    endTime: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(this.regex),
    ]),
  });

  constructor(
    private sessionsService: SleepSessionsService,
    private dialogRef: MatDialogRef<FormDialogComponent>,
  ) {}

  addSession() {
    if (this.formGroup.valid) {
      const startTime = this.getISOdate(
        this.formGroup.value.startDate,
        this.formGroup.value.startTime,
      );

      const endTime = this.getISOdate(
        this.formGroup.value.endDate,
        this.formGroup.value.endTime,
      );

      const session: SleepSessionDTO = {
        startTime,
        endTime,
      };

      this.dialogRef.close(this.sessionsService.addSession(session));
    }
  }

  private getISOdate(dateStr: string, timeStr: string): string {
    const date = formatDate(dateStr, 'yyyy-MM-dd', 'en-US');

    return `${date}T${timeStr}:00.000Z`;
  }
}

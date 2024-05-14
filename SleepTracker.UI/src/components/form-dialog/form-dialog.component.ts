import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, formatDate } from '@angular/common';
import { SleepSessionDTO } from '../../models/SleepSessionDTO';
import { SleepSessionsService } from '../../services/sleep-sessions.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatIconModule, MatError, NgClass],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss',
})
export class FormDialogComponent {
  today = formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en-US');

  formGroup: FormGroup = new FormGroup({
    startTime: new FormControl<string>('', [Validators.required]),
    endTime: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private sessionsService: SleepSessionsService,
    private dialogRef: MatDialogRef<FormDialogComponent>,
  ) {}

  addSession() {
    if (this.formGroup.valid) {
      const session: SleepSessionDTO = {
        startTime: this.formatToISO(this.formGroup.value.startTime),
        endTime: this.formatToISO(this.formGroup.value.endTime),
      };
      this.dialogRef.close(this.sessionsService.addSession(session));
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private formatToISO(date: string | Date): string {
    return formatDate(date, 'yyyy-MM-ddTHH:mm:ss.000', 'en-US') + 'Z';
  }
}

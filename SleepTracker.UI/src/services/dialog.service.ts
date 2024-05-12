import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { FormDialogComponent } from '../components/form-dialog/form-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(): MatDialogRef<ConfirmDialogComponent> {
    return this.dialog.open(ConfirmDialogComponent);
  }

  openAddDialog(): MatDialogRef<FormDialogComponent> {
    return this.dialog.open(FormDialogComponent);
  }
}

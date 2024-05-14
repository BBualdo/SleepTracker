import { Component } from '@angular/core';
import { SleepSession } from '../../models/SleepSession';
import { Observable, map } from 'rxjs';
import { SleepSessionsService } from '../../services/sleep-sessions.service';
import { AsyncPipe, formatDate } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BackButtonComponent } from '../back-button/back-button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogService } from '../../services/dialog.service';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-sessions',
  standalone: true,
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss',
  imports: [
    AsyncPipe,
    MatIconModule,
    RouterLink,
    BackButtonComponent,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
})
export class SessionsComponent {
  sessions$: Observable<SleepSession[]> =
    this.sleepSessionsService.getSessions();

  constructor(
    private sleepSessionsService: SleepSessionsService,
    private dialogService: DialogService,
  ) {}

  getDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = Math.round(duration % 60);

    return hours ? `${hours}h ` + `${minutes}m` : minutes + ' m';
  }

  formatDate(date: Date | string, format: string, locale: string): string {
    return formatDate(date, format, locale);
  }

  confirmDelete(session: SleepSession) {
    this.dialogService
      .openConfirmDialog()
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.deleteSession(session);
        }
      });
  }

  openAddDialog() {
    this.dialogService
      .openAddDialog()
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          res.subscribe({
            next: () =>
              (this.sessions$ = this.sleepSessionsService.getSessions()),
          });
        }
      });
  }

  private deleteSession(session: SleepSession) {
    this.sleepSessionsService.deleteSession(session).subscribe(() => {
      this.sessions$ = this.sessions$.pipe(
        map((sessions) => sessions.filter((s) => s.id !== session.id)),
      );
    });
  }
}

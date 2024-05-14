import { Component, OnInit } from '@angular/core';
import { SleepSession } from '../../models/SleepSession';
import { Observable, map, tap } from 'rxjs';
import { SleepSessionsService } from '../../services/sleep-sessions.service';
import { AsyncPipe, NgClass, formatDate } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BackButtonComponent } from '../back-button/back-button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogService } from '../../services/dialog.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginationService } from '../../services/pagination.service';

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
    NgClass,
  ],
})
export class SessionsComponent implements OnInit {
  sessions$: Observable<SleepSession[]> =
    this.sleepSessionsService.getSessions();

  constructor(
    private sleepSessionsService: SleepSessionsService,
    private dialogService: DialogService,
    public paginationService: PaginationService,
  ) {}

  ngOnInit(): void {
    this.paginationService.paginateSessions();
  }

  getDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = Math.round(duration % 60);

    return hours ? `${hours}h ` + `${minutes}m` : minutes + ' m';
  }

  formatDate(date: Date | string, format: string, locale: string): string {
    return formatDate(date, format, locale, 'UTC');
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

  openFormDialog(
    type: 'add' | 'update',
    title: string,
    session?: SleepSession,
  ) {
    this.dialogService
      .openFormDialog(type, title, session)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          res.subscribe({
            next: () => {
              this.sessions$ = this.sleepSessionsService.getSessions();
              this.paginationService.paginateSessions();
            },
          });
        }
      });
  }

  private deleteSession(session: SleepSession) {
    this.sleepSessionsService.deleteSession(session).subscribe(() => {
      this.sessions$ = this.sessions$.pipe(
        map((sessions) => sessions.filter((s) => s.id !== session.id)),
      );

      this.paginationService.paginateSessions();
    });
  }
}

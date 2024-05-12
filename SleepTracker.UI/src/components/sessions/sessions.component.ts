import { Component } from '@angular/core';
import { SleepSession } from '../../models/SleepSession';
import { Observable, filter, map } from 'rxjs';
import { SleepSessionsService } from '../../services/sleep-sessions.service';
import { AsyncPipe, formatDate } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BackButtonComponent } from '../back-button/back-button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  ],
})
export class SessionsComponent {
  sessions$: Observable<SleepSession[]> =
    this.sleepSessionsService.getSessions();

  constructor(private sleepSessionsService: SleepSessionsService) {}

  getDuration(duration: number): string {
    const hours = duration / 60;
    const minutes = duration % 60;

    return hours ? `${hours}h ` + `${minutes}m` : minutes + ' m';
  }

  formatDate(date: Date | string, format: string, locale: string): string {
    return formatDate(date, format, locale);
  }

  deleteSession(session: SleepSession) {
    this.sleepSessionsService.deleteSession(session).subscribe(() => {
      this.sessions$ = this.sessions$.pipe(
        map((sessions) => sessions.filter((s) => s.id !== session.id)),
      );
    });
  }
}

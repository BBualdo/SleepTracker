import { Component } from '@angular/core';
import { SleepSession } from '../../models/SleepSession';
import { Observable } from 'rxjs';
import { SleepSessionsService } from '../../services/sleep-sessions.service';
import { AsyncPipe, formatDate } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BackButtonComponent } from '../back-button/back-button.component';

@Component({
  selector: 'app-sessions',
  standalone: true,
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss',
  imports: [AsyncPipe, MatIconModule, RouterLink, BackButtonComponent],
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
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SleepSession } from '../models/SleepSession';
import { url } from '../config/config';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class SleepSessionsService {
  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
  ) {}

  getSessions(): Observable<SleepSession[]> {
    return this.http.get<SleepSession[]>(url);
  }

  deleteSession(session: SleepSession): Observable<SleepSession> {
    return this.http
      .delete<SleepSession>(url + session.id)
      .pipe(tap(() => this.snackbarService.snackbarLog('Session deleted.')));
  }
}

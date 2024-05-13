import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { SleepSession } from '../models/SleepSession';
import { url } from '../config/config';
import { SnackbarService } from './snackbar.service';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root',
})
export class SleepSessionsService {
  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
    private errorsService: ErrorsService,
  ) {}

  getSessions(): Observable<SleepSession[]> {
    return this.http
      .get<SleepSession[]>(url)
      .pipe(catchError(this.handleError.bind(this)));
  }

  deleteSession(session: SleepSession): Observable<SleepSession> {
    return this.http.delete<SleepSession>(url + session.id).pipe(
      tap(() => this.snackbarService.snackbarLog('Session deleted.')),
      catchError(this.handleError.bind(this)),
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.errorsService.openDialog();
      this.errorsService.add(`No connection. Try again later.`);
    }

    return throwError(() => new Error('Something bad happened.'));
  }
}

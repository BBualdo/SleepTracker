import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SleepSession } from '../models/SleepSession';
import { url } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class SleepSessionsService {
  constructor(private http: HttpClient) {}
  getSessions(): Observable<SleepSession[]> {
    return this.http.get<SleepSession[]>(url);
  }
}

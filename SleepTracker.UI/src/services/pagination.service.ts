import { Injectable } from '@angular/core';
import { SleepSession } from '../models/SleepSession';
import { SleepSessionsService } from './sleep-sessions.service';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  paginatedSessions: SleepSession[] = [];

  currentPage = 1;
  pageSize = 5;
  pagesAmount = 0;

  constructor(private sessionsService: SleepSessionsService) {}

  paginateSessions() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.sessionsService.getSessions().subscribe((sessions) => {
      this.paginatedSessions = sessions.slice(startIndex, endIndex);
      this.pagesAmount = Math.ceil(sessions.length / this.pageSize);
      if (this.currentPage > this.pagesAmount) {
        this.previousPage();
      }
    });
  }

  nextPage() {
    if (this.currentPage < this.pagesAmount) {
      this.currentPage++;
      this.paginateSessions();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateSessions();
    }
  }
}

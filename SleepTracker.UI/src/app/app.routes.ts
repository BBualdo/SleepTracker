import { Routes } from '@angular/router';
import { MainMenuComponent } from '../components/main-menu/main-menu.component';
import { SessionsComponent } from '../components/sessions/sessions.component';

export const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'sessions', component: SessionsComponent },
];

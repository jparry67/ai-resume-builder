import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { EditComponent } from './pages/edit/edit.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'edit', component: EditComponent },
];

import { Routes } from '@angular/router';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { DragDropFormComponent } from './drag-drop-form/drag-drop-form.component';
import { canActivateGuard } from './can-activate.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [canActivateGuard] },
    { path: 'ddform', component: DragDropFormComponent, canActivate: [canActivateGuard] },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

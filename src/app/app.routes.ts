import { Routes } from '@angular/router';
import { canActivateGuard } from './can-activate.guard';
import { DashboardComponent } from './components/auth/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DragDropFormComponent } from './components/drag-drop-form/drag-drop-form.component';
import { DynamicformfieldComponent } from './components/dynamicformfield/dynamicformfield.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [canActivateGuard] },
    { path: 'ddform', component: DragDropFormComponent, canActivate: [canActivateGuard] },
    { path: 'dynamicform', component: DynamicformfieldComponent, canActivate: [canActivateGuard] },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

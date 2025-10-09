import { Routes } from '@angular/router';
import { canActivateGuard } from './can-activate.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DragDropFormComponent } from './components/drag-drop-form/drag-drop-form.component';
import { DynamicformfieldComponent } from './components/dynamicformfield/dynamicformfield.component';
import { ChildcardComponent } from './commoncard/childcard/childcard.component';
import { MainLayoutComponent } from './main-layout';
import { AuthLayoutComponent } from './auth-layout';
import { FCMTokenComponent } from './components/fcm-token/fcm-token.component';
import { DasViewCardComponent } from './components/das-card/das-view-card/das-view-card.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
        ],
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [canActivateGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'ddform', component: DragDropFormComponent },
            { path: 'dynamicform', component: DynamicformfieldComponent },
            { path: 'view-card', component: DasViewCardComponent },
            { path: 'fcm-token', component: FCMTokenComponent },

        ],
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

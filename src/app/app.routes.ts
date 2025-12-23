import { Routes } from '@angular/router';
import { TemplateDrivenForm } from './components/template-driven-form/template-driven-form';
import { ReactiveForm } from './components/reactive-form/reactive-form';
import { SignalDemo } from './components/signal-demo/signal-demo';
import { GetApi } from './components/api/get-api/get-api';
import { PostApi } from './components/api/post-api/post-api';
import { ReactiveFormsCrud } from './components/api/reactive-forms-crud/reactive-forms-crud';
import { SignalForm } from './components/signal-form/signal-form';
import { Login } from './components/login/login';
import { Layout } from './components/layout/layout';
import { authGuard } from './guards/auth-guard';
import { DependantDropdown } from './components/dependant-dropdown/dependant-dropdown';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:Login
    },
    {
        path:'',
        component:Layout,
        canActivate:[authGuard],
        children:[
            {
                path:'signal',
                component:SignalDemo,
            
            },
            {
                path:'template-driven-form',
                component:TemplateDrivenForm
            },
            {
                path:'reactive-form',
                component:ReactiveForm
            },
            {
                path:'api-calls/get-api',
                component:GetApi
            },
            {
                path:'api-calls/post-api',
                component:PostApi
            },
            {
                path:'reactive-forms-crud',
                component:ReactiveFormsCrud
            },
            {
                path:'signal-form',
                component:SignalForm
            },
             {
                path:'dependant-dropdown-demo',
                component:DependantDropdown
            }
        ]
    }
];

import { Routes } from '@angular/router'
import { AppLayout } from './app/layout/component/app.layout'
import { Dashboard } from './app/pages/dashboard/dashboard'
import { Documentation } from './app/pages/documentation/documentation'
import { Landing } from './app/pages/landing/landing'
import { Notfound } from './app/pages/notfound/notfound'
import { Competitions } from '@/app/features/competitions/competitions'
import { Results } from '@/app/features/results/results'
import { Users } from '@/app/features/users/users'
import { authGuard } from '@/app/core/auth/auth.guard'
import { Categories } from '@/app/features/categories/categories'

export const appRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./app/features/auth/login/login').then((m) => m.Login)
    },
    {
        path: '',
        component: AppLayout,
        canActivate: [authGuard],
        children: [
            { path: '', component: Dashboard },
            { path: 'competitions', component: Competitions, title: 'Конкурсы - Mellio' },
            { path: 'competitions/:id/categories', component: Categories, title: 'Номинации - Mellio' },
            { path: 'users', component: Users, title: 'Эксперты - Mellio' },
            { path: 'results', component: Results },
            { path: 'results/:id', component: Results },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
]

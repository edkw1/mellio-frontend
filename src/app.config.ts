import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig, inject, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core'
import { provideRouter, withInMemoryScrolling } from '@angular/router'
import Aura from '@primeuix/themes/aura'
import { providePrimeNG } from 'primeng/config'
import { appRoutes } from './app.routes'
import { AuthService } from '@/app/core/auth/auth.service'
import { firstValueFrom } from 'rxjs'
import { authInterceptor } from '@/app/core/auth/auth.interceptor'
import { MessageService } from 'primeng/api'
import { MellioPreset } from '@/app/layout/mellio.preset'

export const appConfig: ApplicationConfig = {
    providers: [
        MessageService,
        provideRouter(
            appRoutes,
            withInMemoryScrolling({
                anchorScrolling: 'enabled',
                scrollPositionRestoration: 'enabled'
            })
        ),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideZonelessChangeDetection(),
        providePrimeNG({
            theme: {
                preset: MellioPreset,
                options: {
                    darkModeSelector: '.app-dark'
                }
            }
        }),
        provideAppInitializer(() => {
            const auth = inject(AuthService)
            return firstValueFrom(auth.restoreSession())
        })
    ]
}

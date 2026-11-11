import { Component, inject, ViewChild } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { Router, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { StyleClassModule } from 'primeng/styleclass'
import { AppConfigurator } from './app.configurator'
import { LayoutService } from '@/app/layout/service/layout.service'
import { AuthService } from '@/app/core/auth/auth.service'
import { finalize } from 'rxjs'
import { Menu } from 'primeng/menu'

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, Menu],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
                <img src="logo.png" />
                <span>Mellio</span>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
            </div>
            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <p-menu #profileMenu [model]="profileItems" [popup]="true" />
                    <button type="button" class="layout-topbar-action" (click)="profileMenu.toggle($event)">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
                </div>
            </div>
        </div>
    </div>`
})
export class AppTopbar {
    layoutService = inject(LayoutService)
    authService = inject(AuthService)
    router = inject(Router)

    items!: MenuItem[]
    profileItems: MenuItem[] = [
        {
            label: 'Администратор',
            items: [
                {
                    label: 'Иван Иванов',
                    icon: 'pi pi-user',
                    disabled: true
                },
                {
                    separator: true
                },
                {
                    label: 'Выйти',
                    icon: 'pi pi-sign-out',
                    command: () => this.logout()
                }
            ]
        }
    ]

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({
            ...state,
            darkTheme: !state.darkTheme
        }))
    }

    logout() {
        this.authService
            .logout()
            .pipe(finalize(() => this.router.navigate(['/login'], { replaceUrl: true })))
            .subscribe()
    }
}

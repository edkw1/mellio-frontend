import { Component, signal } from '@angular/core';
import { AppFloatingConfigurator } from '@/app/layout/component/app.floatingconfigurator';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '@/app/core/auth/auth.service';
import { finalize } from 'rxjs';
import { MessageModule } from 'primeng/message';

@Component({
    selector: 'app-login',
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, MessageModule],
    templateUrl: './login.html',
    styleUrl: './login.scss'
})
export class Login {
    readonly isLoading = signal(false);
    readonly errorMessage = signal<string | null>(null);

    username: string = '';
    password: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    login() {
        if (this.isLoading()) return;
        this.errorMessage.set(null);
        this.isLoading.set(true);

        this.authService
            .login(this.username, this.password)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: () => this.router.navigate(['/']),
                error: (error) => {
                    this.errorMessage.set(error.status === 401 ? 'Неверный логин или пароль' : 'Не удалось выполнить вход. Попробуйте ещё раз.');
                }
            });
    }
}

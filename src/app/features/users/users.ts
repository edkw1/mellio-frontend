import { Component, OnInit, signal } from '@angular/core'
import { UserResponse } from '@/app/features/users/users.models'
import { UsersService } from '@/app/features/users/users.service'
import { Button } from 'primeng/button'
import { IconField } from 'primeng/iconfield'
import { InputIcon } from 'primeng/inputicon'
import { InputText } from 'primeng/inputtext'
import { Table, TableModule } from 'primeng/table'
import { Toolbar } from 'primeng/toolbar'
import { ToggleSwitch } from 'primeng/toggleswitch'
import { FormsModule } from '@angular/forms'
import { MenuItem } from 'primeng/api'
import { Breadcrumb } from 'primeng/breadcrumb'

@Component({
    selector: 'app-users',
    imports: [Button, IconField, InputIcon, InputText, TableModule, Toolbar, ToggleSwitch, FormsModule, Breadcrumb],
    providers: [UsersService],
    templateUrl: './users.html',
    styleUrl: './users.scss'
})
export class Users implements OnInit {
    users = signal<UserResponse[]>([])
    selectedUsers!: UserResponse[] | null
    breadcrumbHome: MenuItem = {
        icon: 'pi pi-home',
        routerLink: '/'
    }
    breadcrumbItems: MenuItem[] = [
        {
            label: 'Эксперты'
        }
    ]

    constructor(private userService: UsersService) {}

    ngOnInit() {
        this.loadUsers()
    }

    private loadUsers() {
        this.userService.getUsers().subscribe((users) => this.users.set(users))
    }

    new() {}

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    editUser(user: any) {}

    deleteUser(user: any) {}
}

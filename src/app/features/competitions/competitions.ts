import { Component, OnInit, signal } from '@angular/core'
import { CompetitionsApiService } from '@/app/features/competitions/competitions-api.service'
import { Button } from 'primeng/button'
import { Toolbar } from 'primeng/toolbar'
import { DatePipe } from '@angular/common'
import { IconField } from 'primeng/iconfield'
import { InputIcon } from 'primeng/inputicon'
import { InputText } from 'primeng/inputtext'
import { Table, TableModule } from 'primeng/table'
import { CompetitionResponse, CompetitionStatus } from '@/app/features/competitions/competitions.models'
import { Tag } from 'primeng/tag'
import { Router, RouterLink } from '@angular/router'
import { Breadcrumb } from 'primeng/breadcrumb'
import { MenuItem } from 'primeng/api'
import { Menu } from 'primeng/menu'

@Component({
    selector: 'app-competitions',
    imports: [Button, Toolbar, IconField, InputIcon, InputText, TableModule, DatePipe, Tag, RouterLink, Breadcrumb, Menu],
    templateUrl: './competitions.html',
    styleUrl: './competitions.scss'
})
export class Competitions implements OnInit {
    competitions = signal<CompetitionResponse[]>([])
    selectedCompetitions!: CompetitionResponse[] | null
    competitionDialog: boolean = false
    breadcrumbHome: MenuItem = {
        icon: 'pi pi-home',
        routerLink: '/'
    }
    breadcrumbItems: MenuItem[] = [
        {
            label: 'Конкурсы'
        }
    ]
    competitionActions: MenuItem[] = []

    constructor(
        private competitionsApiService: CompetitionsApiService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadCompetitions()
    }

    private loadCompetitions() {
        this.competitionsApiService.getCompetitions().subscribe((competitions) => {
            this.competitions.set(competitions)
        })
    }

    new() {}

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    openActions(event: Event, competition: CompetitionResponse, menu: Menu) {
        this.competitionActions = this.getActions(competition)
        menu.toggle(event)
    }

    getActions(competition: CompetitionResponse): MenuItem[] {
        const items: MenuItem[] = []
        switch (competition.status) {
            case CompetitionStatus.CREATED:
                items.push(
                    {
                        label: 'Активировать конкурс',
                        icon: 'pi pi-check-circle',
                        command: () => this.changeStatus(competition)
                    },
                    {
                        label: 'Перемешать образцы',
                        icon: 'pi pi-sync',
                        command: () => this.editCompetition(competition)
                    },
                    {
                        label: 'Редактировать',
                        icon: 'pi pi-pencil',
                        command: () => this.editCompetition(competition)
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Удалить',
                        icon: 'pi pi-trash',
                        command: () => this.deleteCompetition(competition)
                    }
                )
                break
            case CompetitionStatus.ACTIVE:
                items.push(
                    {
                        label: 'Завершить конкурс',
                        icon: 'pi pi-check-circle',
                        command: () => this.changeStatus(competition)
                    },
                    {
                        label: 'Просмотр шифровок',
                        icon: 'pi pi-hashtag',
                        command: () => this.changeStatus(competition)
                    }
                )
                break
            case CompetitionStatus.FINISHED:
                items.push({
                    label: 'Посмотреть результаты',
                    icon: 'pi pi-crown',
                    command: () => this.checkResults(competition)
                })
                break
        }
        return items
    }

    getStatusText(status: CompetitionStatus) {
        switch (status) {
            case CompetitionStatus.ACTIVE:
                return 'Идет оценка'
            case CompetitionStatus.CREATED:
                return 'Создан'
            case CompetitionStatus.FINISHED:
                return 'Завершен'
            default:
                return 'Создан'
        }
    }

    getSeverity(status: CompetitionStatus) {
        switch (status) {
            case CompetitionStatus.ACTIVE:
                return 'warn'
            case CompetitionStatus.CREATED:
                return 'info'
            case CompetitionStatus.FINISHED:
                return 'success'
            default:
                return 'info'
        }
    }

    private changeStatus(competition: any) {
        return undefined
    }

    private editCompetition(competition: any) {
        return undefined
    }

    private deleteCompetition(competition: any) {
        return undefined
    }

    private checkResults(competition: CompetitionResponse) {
        this.router.navigate(['/results', competition.id])
    }
}

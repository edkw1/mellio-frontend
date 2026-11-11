import { Component, OnInit, signal } from '@angular/core'
import { CategoriesService } from '@/app/features/categories/categories.service'
import { ActivatedRoute } from '@angular/router'
import { CategoryResponse } from '@/app/features/categories/categories.models'
import { Button } from 'primeng/button'
import { IconField } from 'primeng/iconfield'
import { InputIcon } from 'primeng/inputicon'
import { InputText } from 'primeng/inputtext'
import { Table, TableModule } from 'primeng/table'
import { Toolbar } from 'primeng/toolbar'
import { Breadcrumb } from 'primeng/breadcrumb'
import { MenuItem } from 'primeng/api'

@Component({
    selector: 'app-categories',
    imports: [Button, IconField, InputIcon, InputText, TableModule, Toolbar, Breadcrumb],
    templateUrl: './categories.html',
    styleUrl: './categories.scss',
    providers: [CategoriesService]
})
export class Categories implements OnInit {
    categories = signal<CategoryResponse[]>([])
    selectedCategories!: CategoryResponse[] | null
    competitionName: string = history.state.competitionName ?? ''
    breadcrumbHome: MenuItem = {
        icon: 'pi pi-home',
        routerLink: '/'
    }
    breadcrumbItems: MenuItem[] = []

    constructor(
        private route: ActivatedRoute,
        private categoriesService: CategoriesService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            const competitionId = Number(params.get('id'))
            this.breadcrumbItems = [
                {
                    label: 'Конкурсы',
                    routerLink: '/competitions'
                },
                {
                    label: this.competitionName,
                    routerLink: `/competitions/${competitionId}/categories`
                },
                {
                    label: 'Номинации'
                }
            ]
            this.loadCategories(competitionId)
        })
    }

    private loadCategories(competitionId: number) {
        this.categoriesService.getCategories(competitionId).subscribe((categories) => {
            this.categories.set(categories)
        })
    }

    new() {}

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    editCategory(product: any) {}

    deleteCategory(product: any) {}
}

import { Injectable } from '@angular/core'
import { environment } from '@/environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { CategoryResponse } from '@/app/features/categories/categories.models'

@Injectable()
export class CategoriesService {
    private readonly apiUrl = environment.apiUrl

    constructor(private http: HttpClient) {}

    getCategories(competitionId: number): Observable<CategoryResponse[]> {
        return this.http.get<CategoryResponse[]>(`${this.apiUrl}/competitions/${competitionId}/categories`)
    }
}

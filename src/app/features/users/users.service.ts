import { Injectable } from '@angular/core'
import { environment } from '@/environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { UserResponse } from '@/app/features/users/users.models'

@Injectable()
export class UsersService {
    private readonly apiUrl = `${environment.apiUrl}/users`

    constructor(private http: HttpClient) {}

    getUsers(): Observable<UserResponse[]> {
        return this.http.get<UserResponse[]>(this.apiUrl)
    }
}

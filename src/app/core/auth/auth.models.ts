import { UserResponse } from '@/app/features/users/users.models'

export interface AuthResponse {
    accessToken: string
    user: UserResponse
}

export interface LoginRequest {
    username: string
    password: string
}

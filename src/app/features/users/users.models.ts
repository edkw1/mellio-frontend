export interface UserResponse {
    id: number
    username: string
    fullName: string
    role: Role
}

export enum Role {
    USER = 'USER',
    MANAGER = 'MANAGER',
    ADMIN = 'ADMIN'
}

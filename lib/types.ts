export type RegisterState = {
    success: boolean,
    message: string
}

export type LoginState = {
    success: boolean,
    message?: string
}

export type Role = "ADMIN" | "TECHNICIAN" | "CUSTOMER"

export type User = {
    name: string,
    email: string,
    password: string,
    phone: string,
    role: Role
}

export type TCategory = {
    name: string,
    description: string,
    isActive: boolean
}
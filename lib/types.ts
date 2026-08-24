export type RegisterState = {
    success: boolean,
    message: string
}

export type LoginState = {
    success: boolean,
    message?: string
}

export type User = {
    name: string,
    email: string,
    password: string,
    phone: string,
    role: "ADMIN" | "TECHNICIAN" | "CUSTOMER"
}
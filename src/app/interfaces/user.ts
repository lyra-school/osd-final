export interface User {
    _id?: string,
    name: string,
    email?: string,
    password?: string,
    hashedPassword?: string,
    about?: string,
    role?: string,
    favourites?: string[]
}

import jwt from "jsonwebtoken";
import { User } from "./types";

export const decodeToken = (token: string) => {
    return jwt.decode(token) as User;
}
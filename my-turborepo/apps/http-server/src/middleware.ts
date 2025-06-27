import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
// Update the import path below to the actual location of JWT_SECRET
// TODO: Replace with the correct import path if JWT_SECRET is defined elsewhere
const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";


export function middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"] ?? "";

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded) {
        // @ts-ignore: TODO: Fix this
        req.userId = decoded.userId;
        next();
    } else {
        res.status(403).json({
            message: "Unauthorized"
        })
    }
}
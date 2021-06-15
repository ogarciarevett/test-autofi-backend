import { Request, Response, NextFunction } from 'express';
import { Logger } from "../utils/logger";

export function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
    Logger.debug(`${request.method} ${request.path}`);
    next();
}

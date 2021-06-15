import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import express from 'express';

export class ResponseHandler {
    static ok(
        response: express.Response,
        body?: any,
        message: string = ReasonPhrases.OK,
        statusCode: number = StatusCodes.OK,
    ) {
        return this.generateResponse(response, message, statusCode, body);
    }

    static badRequest(
        response: express.Response,
        body?: any,
        message: string = ReasonPhrases.BAD_REQUEST,
        statusCode: number = StatusCodes.BAD_REQUEST,
    ) {
        return this.generateResponse(response, message, statusCode, body);
    }

    static serverError(
        response: express.Response,
        body?: any,
        message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
        statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    ) {
        return this.generateResponse(response, message, statusCode, body);
    }

    static created(
        response: express.Response,
        body?: any,
        message: string = ReasonPhrases.CREATED,
        statusCode: number = StatusCodes.CREATED,
    ) {
        return this.generateResponse(response, message, statusCode, body);
    }

    static noContent(
        response: express.Response,
        body?: any,
        message: string = ReasonPhrases.NO_CONTENT,
        statusCode: number = StatusCodes.NO_CONTENT,
    ) {
        return this.generateResponse(response, message, statusCode, body);
    }

    static accepted(response: express.Response, message: string = ReasonPhrases.ACCEPTED) {
        return this.generateResponse(response, message, StatusCodes.ACCEPTED);
    }

    static partialContent(
        response: express.Response,
        body?: any,
        message: string = ReasonPhrases.PARTIAL_CONTENT,
        statusCode: number = StatusCodes.PARTIAL_CONTENT,
    ) {
        return this.generateResponse(response, message, statusCode, body);
    }

    private static generateResponse(response: express.Response, message: string, statusCode: number, body?: any) {
        if (body) {
            return response.status(statusCode).json({
                body,
                message,
                statusCode,
            });
        }

        return response.status(statusCode).json({
            message,
            statusCode,
        });
    }
}

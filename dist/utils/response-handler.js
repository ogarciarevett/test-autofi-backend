"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
var http_status_codes_1 = require("http-status-codes");
var ResponseHandler = /** @class */ (function () {
    function ResponseHandler() {
    }
    ResponseHandler.ok = function (response, body, message, statusCode) {
        if (message === void 0) { message = http_status_codes_1.ReasonPhrases.OK; }
        if (statusCode === void 0) { statusCode = http_status_codes_1.StatusCodes.OK; }
        return this.generateResponse(response, message, statusCode, body);
    };
    ResponseHandler.badRequest = function (response, body, message, statusCode) {
        if (message === void 0) { message = http_status_codes_1.ReasonPhrases.BAD_REQUEST; }
        if (statusCode === void 0) { statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST; }
        return this.generateResponse(response, message, statusCode, body);
    };
    ResponseHandler.serverError = function (response, body, message, statusCode) {
        if (message === void 0) { message = http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR; }
        if (statusCode === void 0) { statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR; }
        return this.generateResponse(response, message, statusCode, body);
    };
    ResponseHandler.created = function (response, body, message, statusCode) {
        if (message === void 0) { message = http_status_codes_1.ReasonPhrases.CREATED; }
        if (statusCode === void 0) { statusCode = http_status_codes_1.StatusCodes.CREATED; }
        return this.generateResponse(response, message, statusCode, body);
    };
    ResponseHandler.noContent = function (response, body, message, statusCode) {
        if (message === void 0) { message = http_status_codes_1.ReasonPhrases.NO_CONTENT; }
        if (statusCode === void 0) { statusCode = http_status_codes_1.StatusCodes.NO_CONTENT; }
        return this.generateResponse(response, message, statusCode, body);
    };
    ResponseHandler.accepted = function (response, message) {
        if (message === void 0) { message = http_status_codes_1.ReasonPhrases.ACCEPTED; }
        return this.generateResponse(response, message, http_status_codes_1.StatusCodes.ACCEPTED);
    };
    ResponseHandler.partialContent = function (response, body, message, statusCode) {
        if (message === void 0) { message = http_status_codes_1.ReasonPhrases.PARTIAL_CONTENT; }
        if (statusCode === void 0) { statusCode = http_status_codes_1.StatusCodes.PARTIAL_CONTENT; }
        return this.generateResponse(response, message, statusCode, body);
    };
    ResponseHandler.generateResponse = function (response, message, statusCode, body) {
        if (body) {
            return response.status(statusCode).json({
                body: body,
                message: message,
                statusCode: statusCode,
            });
        }
        return response.status(statusCode).json({
            message: message,
            statusCode: statusCode,
        });
    };
    return ResponseHandler;
}());
exports.ResponseHandler = ResponseHandler;

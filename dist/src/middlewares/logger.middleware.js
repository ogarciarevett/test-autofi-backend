"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
var logger_1 = require("../utils/logger");
function loggerMiddleware(request, response, next) {
    logger_1.Logger.debug(request.method + " " + request.path);
    next();
}
exports.loggerMiddleware = loggerMiddleware;

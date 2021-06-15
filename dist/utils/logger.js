"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.PREFIX_LOG = void 0;
var signale_1 = __importDefault(require("signale"));
exports.PREFIX_LOG = 'Autofi-TEST-API';
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.debug = function (message) {
        signale_1.default.debug(message);
    };
    Logger.error = function (e) {
        signale_1.default.fatal(e);
    };
    Logger.success = function (message) {
        signale_1.default.success(message);
    };
    Logger.complete = function (log) {
        if (log.suffix) {
            signale_1.default.complete({ prefix: log.prefix, message: log.message, suffix: log.suffix });
        }
        else {
            signale_1.default.complete({ prefix: log.prefix, message: log.message });
        }
    };
    return Logger;
}());
exports.Logger = Logger;

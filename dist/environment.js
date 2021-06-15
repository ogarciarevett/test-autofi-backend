"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Environment = /** @class */ (function () {
    function Environment() {
    }
    Environment.nodeEnv = process.env.NODE_ENV || 'local';
    Environment.mongo = {
        url: String(process.env.MONGO_URL || 'mongodb://localhost:27017/autofi-test'),
    };
    Environment.port = parseInt(process.env.PORT || '3030', 10);
    return Environment;
}());
exports.default = Environment;

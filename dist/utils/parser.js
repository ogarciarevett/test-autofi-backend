"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseObjectKeysToCamelCase = void 0;
var lodash_1 = __importDefault(require("lodash"));
var parseObjectKeysToCamelCase = function (row) {
    var key, keys = Object.keys(row);
    var n = keys.length;
    var newObj = {};
    while (n--) {
        key = keys[n];
        newObj[lodash_1.default.camelCase(key)] = row[key];
    }
    return newObj;
};
exports.parseObjectKeysToCamelCase = parseObjectKeysToCamelCase;

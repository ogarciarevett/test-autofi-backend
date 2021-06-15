"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvidersController = void 0;
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var csv = __importStar(require("fast-csv"));
var response_handler_1 = require("../utils/response-handler");
var services_1 = require("../services");
var fs = __importStar(require("fs"));
var logger_1 = require("../utils/logger");
var parser_1 = require("../utils/parser");
var ProvidersController = /** @class */ (function () {
    function ProvidersController() {
        this.basePath = '/providers';
        this.router = express_1.default.Router();
        this.multer = multer_1.default({ dest: '../_temp_uploads' });
        this.intializeRoutes();
    }
    ProvidersController.prototype.intializeRoutes = function () {
        this.router.post(this.basePath + "/upload", this.multer.any(), this.upload);
    };
    ProvidersController.prototype.upload = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var files, file_1, rowCars_1, skips_1;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    files = req.files;
                    if (!files.length) {
                        return [2 /*return*/, response_handler_1.ResponseHandler.badRequest(res, null, 'missing fields')];
                    }
                    file_1 = files === null || files === void 0 ? void 0 : files.find(function (x) { return x.fieldname === 'autofi_csv'; });
                    if (!file_1) {
                        return [2 /*return*/, response_handler_1.ResponseHandler.badRequest(res, null, "Missing required field called 'autofi_csv'")];
                    }
                    if (file_1.mimetype !== 'text/csv') {
                        return [2 /*return*/, response_handler_1.ResponseHandler.badRequest(res, null, 'Only CSV allowed')];
                    }
                    rowCars_1 = [];
                    skips_1 = 0;
                    fs.createReadStream(file_1.path)
                        .pipe(csv.parse({ headers: true }))
                        .on('data', function (row) {
                        var formattedRow = parser_1.parseObjectKeysToCamelCase(row);
                        if (formattedRow.uuid) {
                            rowCars_1.push(formattedRow);
                        }
                        else {
                            skips_1++;
                            logger_1.Logger.debug('Skipping row, UUID missing');
                        }
                    })
                        .on('error', function (error) {
                        throw new Error("Error processing the CSV: " + error.message);
                    })
                        .on('end', function () { return __awaiter(_this, void 0, void 0, function () {
                        var cardService, completedUpserts, rowCars_2, rowCars_2_1, car, e_1_1;
                        var e_1, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    cardService = new services_1.CarService();
                                    completedUpserts = 0;
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 7, 8, 13]);
                                    rowCars_2 = __asyncValues(rowCars_1);
                                    _b.label = 2;
                                case 2: return [4 /*yield*/, rowCars_2.next()];
                                case 3:
                                    if (!(rowCars_2_1 = _b.sent(), !rowCars_2_1.done)) return [3 /*break*/, 6];
                                    car = rowCars_2_1.value;
                                    logger_1.Logger.debug('Upsert car to the db...');
                                    return [4 /*yield*/, cardService.findOneAndUpdate({ uuid: car.uuid }, __assign({}, car), { upsert: true })];
                                case 4:
                                    _b.sent();
                                    completedUpserts++;
                                    logger_1.Logger.success("Inserts/Updates " + completedUpserts + " of " + rowCars_1.length);
                                    _b.label = 5;
                                case 5: return [3 /*break*/, 2];
                                case 6: return [3 /*break*/, 13];
                                case 7:
                                    e_1_1 = _b.sent();
                                    e_1 = { error: e_1_1 };
                                    return [3 /*break*/, 13];
                                case 8:
                                    _b.trys.push([8, , 11, 12]);
                                    if (!(rowCars_2_1 && !rowCars_2_1.done && (_a = rowCars_2.return))) return [3 /*break*/, 10];
                                    return [4 /*yield*/, _a.call(rowCars_2)];
                                case 9:
                                    _b.sent();
                                    _b.label = 10;
                                case 10: return [3 /*break*/, 12];
                                case 11:
                                    if (e_1) throw e_1.error;
                                    return [7 /*endfinally*/];
                                case 12: return [7 /*endfinally*/];
                                case 13:
                                    fs.unlinkSync(file_1.path);
                                    logger_1.Logger.success("Upsert CSV process finished, cars inserted/updated " + completedUpserts + ", skipped rows: " + skips_1);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/, response_handler_1.ResponseHandler.ok(res)];
                }
                catch (e) {
                    return [2 /*return*/, response_handler_1.ResponseHandler.serverError(res, null, e.message)];
                }
                return [2 /*return*/];
            });
        });
    };
    return ProvidersController;
}());
exports.ProvidersController = ProvidersController;

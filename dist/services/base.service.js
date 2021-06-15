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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var BaseService = /** @class */ (function () {
    function BaseService(options) {
        var document = options.document;
        this.document = document;
        this.model = typegoose_1.getModelForClass(document);
    }
    BaseService.prototype.checkIfModel = function (item) {
        return item instanceof this.model;
    };
    BaseService.prototype.getById = function (id, query) {
        if (query === void 0) { query = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.findOne(__assign(__assign({}, query), { _id: id }))];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            throw new Error("[" + typegoose_1.getName(this.model) + "]: " + id + " not found!");
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    BaseService.prototype.findById = function (id) {
        return this.model.findById(id);
    };
    BaseService.prototype.findAll = function (query) {
        return this.model.find(query);
    };
    BaseService.prototype.findOne = function (query) {
        return this.model.findOne(query);
    };
    BaseService.prototype.get = function (id) {
        return this.model
            .findOne({ _id: id })
            .lean(true)
            .exec();
    };
    BaseService.prototype.getAll = function (query, sort) {
        if (query === void 0) { query = {}; }
        return this.model
            .find(query)
            .sort(sort)
            .exec();
    };
    BaseService.prototype.create = function (data) {
        return this.model.create(data);
    };
    BaseService.prototype.update = function (id, data, params) {
        return this.model.findOneAndUpdate({ _id: id }, data, __assign({ new: true }, params)).exec();
    };
    BaseService.prototype.updateMany = function (query, data) {
        return this.model.updateMany(query, data).exec();
    };
    BaseService.prototype.updateByQuery = function (query, patch) {
        return this.model.findOneAndUpdate(query, patch).exec();
    };
    BaseService.prototype.findOneAndUpdate = function (query, data, params) {
        return this.model.findOneAndUpdate(query, data, __assign({}, params)).exec();
    };
    BaseService.prototype.patch = function (id, data, params) {
        return this.model.findOneAndUpdate({ _id: id }, data, __assign({ new: true }, params)).exec();
    };
    // TODO: add support for soft deletion
    BaseService.prototype.delete = function (id) {
        return this.model.findByIdAndDelete(id).exec();
    };
    BaseService.prototype.deleteByQuery = function (query) {
        return this.model.findOneAndRemove(query).exec();
    };
    BaseService.prototype.deleteMany = function (query) {
        return this.model.deleteMany(query).exec();
    };
    BaseService.prototype.countByQuery = function (query) {
        return this.model.countDocuments(query).exec();
    };
    BaseService.prototype.aggregate = function (query) {
        return this.model.aggregate(query);
    };
    BaseService.prototype.updateOne = function (query, data, options) {
        if (options === void 0) { options = {}; }
        return this.model.updateOne(query, data, options);
    };
    return BaseService;
}());
exports.BaseService = BaseService;

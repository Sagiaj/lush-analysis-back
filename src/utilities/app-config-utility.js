"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var compression_1 = __importDefault(require("compression"));
var AppConfigUtility = /** @class */ (function () {
    function AppConfigUtility() {
    }
    AppConfigUtility.init = function (app) {
        app.use(cors_1.default(Promise.resolve().then(function () { return __importStar(require('../config/cors')); })));
        app.use(compression_1.default());
        app.use(body_parser_1.default.json());
    };
    return AppConfigUtility;
}());
exports.AppConfigUtility = AppConfigUtility;

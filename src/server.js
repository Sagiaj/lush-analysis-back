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
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var app_config_utility_1 = require("./utilities/app-config-utility");
var routes = __importStar(require("./routes"));
// Create an http server
var app = express_1.default();
// Initialize all app configurations
app_config_utility_1.AppConfigUtility.init(app);
// Apply routes
app.use('/analysis', routes.analysisRoutes);
// listen
app.listen(process.env.SERVER_PORT, function () {
    console.log("server listening on port " + process.env.SERVER_PORT);
});

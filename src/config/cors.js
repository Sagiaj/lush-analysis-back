"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var whitelist = process.env.ALLOWED_DOMAINS;
exports.corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.split(',').indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

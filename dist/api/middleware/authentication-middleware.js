"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
var express_1 = require("@clerk/express");
var isAuthenticated = function (req, res, next) {
    if (!(0, express_1.getAuth)(req).userId) {
        throw new Error("Not authenticated");
    }
    next();
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authentication-middleware.js.map
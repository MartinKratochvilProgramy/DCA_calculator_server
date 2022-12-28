"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.getNoInvestmentData = exports.getRelativeChange = exports.getHistoricalData = exports.getDCAValues = void 0;
var getDCAValues_1 = require("./getDCAValues");
__createBinding(exports, getDCAValues_1, "default", "getDCAValues");
var getHistoricalData_1 = require("./getHistoricalData");
__createBinding(exports, getHistoricalData_1, "default", "getHistoricalData");
var getRelativeChange_1 = require("./getRelativeChange");
__createBinding(exports, getRelativeChange_1, "default", "getRelativeChange");
var getNoInvestmentData_1 = require("./getNoInvestmentData");
__createBinding(exports, getNoInvestmentData_1, "default", "getNoInvestmentData");

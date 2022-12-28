"use strict";
exports.__esModule = true;
var getChartData_1 = require("./middleware/getChartData");
var validateTicker_1 = require("./middleware/validateTicker");
var express = require('express');
var cors = require('cors');
require('dotenv').config();
var fetch = require('node-fetch');
var app = express();
app.use(cors());
app.use(express.json());
var PORT = process.env.PORT || 4002;
app.post("/get_chart_data", getChartData_1.getChartData);
app.post("/validate_ticker", validateTicker_1.validateTicker);
app.listen(PORT, function () {
    console.log("Connected @ ".concat(PORT));
});

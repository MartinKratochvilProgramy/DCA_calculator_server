import { Express } from 'express';
import { getChartData } from './middleware/getChartData';
import { validateTicker } from './middleware/validateTicker';
const express = require('express');

const cors = require('cors');
require('dotenv').config()
const fetch = require('node-fetch');

const app: Express = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4002;

app.post("/get_chart_data", getChartData);
app.post("/validate_ticker", validateTicker)

app.listen(PORT, () => {
  console.log(`Connected @ ${PORT}`);
});


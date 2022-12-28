import { TickerDataInterface } from './types/TickerDataInterface';
import { getDCAValues, getHistoricalData, getRelativeChange, getNoInvestmentData } from './functions';
import { Express } from 'express';
const express = require('express');

const cors = require('cors');
require('dotenv').config()
const fetch = require('node-fetch');

const app: Express = express();
app.use(cors()); // allow localhost 3000 (client) requests
app.use(express.json());

const PORT = process.env.PORT || 4002;

app.post("/get_chart_data", async (req: any, res: any) => {
  // generates chart data for each ticker in req.body.tickers
  const tickers: string[] = req.body.tickers;
  const startDate: string = req.body.startDate;
  const startAmount: number = req.body.startAmount;
  const incrementAmount: number = req.body.incrementAmount;
  const investmentPeriod: "Weekly" | "Monthly" = req.body.investmentPeriod;

  const data: TickerDataInterface[] = []; // data array to be sent to client

  for (let i = 0; i < tickers.length; i++) {
    // generate values for each ticker
    const tickerData: TickerDataInterface = await getHistoricalData(tickers[i], startDate, investmentPeriod);

    const relativeChange: number[] = getRelativeChange(tickerData.values);

    tickerData.values = getDCAValues(relativeChange, startAmount, incrementAmount);
    data.push(tickerData);
  }


  // if nonzero increment, add DCA values with no growth for comparison in client
  if (incrementAmount > 0) {
    const nonInvestmentValues: TickerDataInterface = getNoInvestmentData(startDate, startAmount, incrementAmount, investmentPeriod);
    data.push(nonInvestmentValues);
  }

  res.json(data)
})

app.post("/validate_ticker", async (req: any, res: any) => {
  // if ticker is valid, returns chart.error = null
  const ticker: string = req.body.ticker;

  const stockInfo = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`)
  const stockInfoJson = await stockInfo.json()

  res.json(stockInfoJson.chart.error);

})

app.listen(PORT, () => {
  console.log(`Connected @ ${PORT}`);
});


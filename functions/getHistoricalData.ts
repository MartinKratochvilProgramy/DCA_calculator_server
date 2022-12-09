const yahooFinance = require('yahoo-finance');
import { TickerDataInterface } from '../types/TickerDataInterface';

const periodDict = {
  "Weekly": "w",
  "Monthly": "m",
}

export default async function getHistoricalData(
  ticker: string, 
  startDate: string,
  investmentPeriod: "Weekly" | "Monthly"
): Promise<TickerDataInterface> {

  const period = periodDict[investmentPeriod];
  
  const tickerData: TickerDataInterface = await new Promise((res, rej) => {
    yahooFinance.historical({
      symbol: ticker,
      period: period,
      from: startDate,
      to:  new Date(),
    }, function (err: any, quotes: any) {
      if (err) rej(err);

      const dates: string[] = [];
      const values: number[] = [];

      for (let i = 0; i < quotes.length; i++) {
        dates.push(quotes[i].date.toISOString().split('T')[0]);
        values.push(quotes[i].open.toFixed(2))
      }
      dates.reverse();
      values.reverse();
      res({ticker, dates, values})
    });
  })
  
  return tickerData;
}

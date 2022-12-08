const yahooFinance = require('yahoo-finance');
import { TickerDataInterface } from '../types/TickerDataInterface';

export default async function getHistoricalData(
  ticker: string, 
  startDate: string
): Promise<TickerDataInterface> {

  let period = "d";
  if (getYearsDiff(startDate, new Date()) > 5) {
    // if period is longer than 5yrs, get weekly data
    period = "w";
  }
  
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

function getYearsDiff(startDate: any, endDate: any) { // birthday is a date
  var ageDifMs = startDate - endDate;
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

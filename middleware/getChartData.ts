import { TickerDataInterface } from '../types/TickerDataInterface';
import { getDCAValues, getHistoricalData, getRelativeChange, getNoInvestmentData } from '../functions';
import { Request, Response } from 'express';

export const getChartData = async (req: Request, res: Response) => {
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
}
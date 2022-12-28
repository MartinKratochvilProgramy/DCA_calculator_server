import { Request, Response } from 'express';

export const validateTicker = async (req: Request, res: Response) => {
    // if ticker is valid, returns chart.error = null
    const ticker: string = req.body.ticker;

    const stockInfo = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`)
    const stockInfoJson = await stockInfo.json()

    res.json(stockInfoJson.chart.error);

}
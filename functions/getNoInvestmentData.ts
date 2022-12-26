import { Dayjs } from 'dayjs';
import { TickerDataInterface } from '../types/TickerDataInterface';

export default function getNoInvestmentData(
    startDate: string,
    startAmount: number,
    incrementAmount: number,
    investmentPeriod: string
): TickerDataInterface {

    const ticker = "No investment";
    const dates = [startDate, new Date().toJSON()]
    let finalAmount: number = 0;

    if (investmentPeriod === "Weekly") {
        const numberOfWeeks = getWeeksDiff(new Date(startDate), new Date());
        finalAmount = numberOfWeeks * incrementAmount + startAmount;

    } else if (investmentPeriod === "Monthly") {
        const numberOfMonths = getMonthsDiff(new Date(startDate), new Date());
        finalAmount = numberOfMonths * incrementAmount + startAmount;

    } else if (investmentPeriod === "Yearly") {
        const numberOfYears = getYearsDiff(new Date(startDate), new Date());
        finalAmount = numberOfYears * incrementAmount + startAmount;

    }

    const values = [startAmount, finalAmount];

    return {
        ticker,
        dates,
        values
    }
}

function getWeeksDiff(startDate: any, endDate: any) {
    const msInWeek = 1000 * 60 * 60 * 24 * 7;

    return Math.round(Math.abs(endDate - startDate) / msInWeek);
}

function getMonthsDiff(startDate: any, endDate: any) {
    var months;
    months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();
    return months <= 0 ? 0 : months;
}

function getYearsDiff(startDate: any, endDate: any) { // birthday is a date
    var ageDifMs = startDate - endDate;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}


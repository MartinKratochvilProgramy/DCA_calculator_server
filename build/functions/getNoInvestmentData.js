"use strict";
exports.__esModule = true;
function getNoInvestmentData(startDate, startAmount, incrementAmount, investmentPeriod) {
    var ticker = "No investment";
    var dates = [startDate, new Date().toJSON()];
    var finalAmount = 0;
    if (investmentPeriod === "Weekly") {
        var numberOfWeeks = getWeeksDiff(new Date(startDate), new Date());
        finalAmount = numberOfWeeks * incrementAmount + startAmount;
    }
    else if (investmentPeriod === "Monthly") {
        var numberOfMonths = getMonthsDiff(new Date(startDate), new Date());
        finalAmount = numberOfMonths * incrementAmount + startAmount;
    }
    else if (investmentPeriod === "Yearly") {
        var numberOfYears = getYearsDiff(new Date(startDate), new Date());
        finalAmount = numberOfYears * incrementAmount + startAmount;
    }
    var values = [startAmount, finalAmount];
    return {
        ticker: ticker,
        dates: dates,
        values: values
    };
}
exports["default"] = getNoInvestmentData;
function getWeeksDiff(startDate, endDate) {
    var msInWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.round(Math.abs(endDate - startDate) / msInWeek);
}
function getMonthsDiff(startDate, endDate) {
    var months;
    months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();
    return months <= 0 ? 0 : months;
}
function getYearsDiff(startDate, endDate) {
    var ageDifMs = startDate - endDate;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

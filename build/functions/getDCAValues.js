"use strict";
exports.__esModule = true;
function getDCAValues(relativeChange, startAmount, incrementAmount) {
    var DCAValues = [startAmount];
    for (var i = 0; i < relativeChange.length; i++) {
        if (i > 0) {
            DCAValues[DCAValues.length - 1] += incrementAmount;
        }
        DCAValues.push(parseFloat((relativeChange[i] * DCAValues[DCAValues.length - 1]).toFixed(3)));
    }
    return DCAValues;
}
exports["default"] = getDCAValues;

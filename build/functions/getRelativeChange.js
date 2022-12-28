"use strict";
exports.__esModule = true;
function getRelativeChange(data) {
    var output = [];
    for (var i = 0; i < data.length; i++) {
        if (i === 0) {
            output.push(1);
        }
        else {
            output.push(data[i] / data[i - 1]);
        }
    }
    return output;
}
exports["default"] = getRelativeChange;

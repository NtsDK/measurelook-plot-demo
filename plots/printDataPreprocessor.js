const R = require('ramda');

exports.preprocess2 = function (printData) {
    printData.cpuValues = printData.cpuValues.join(',');
    printData.micValues = printData.micValues.join(',');
    printData.xLabels = printData.xLabels.join(',');
    const arr2strC = arr => arr.map(str => `"${str}"`).join(',');
    ['legendNames', 'legendColor', 'legendBorder'].filter(el => printData[el] !== undefined).map((el) => {
        printData[el] = arr2strC(printData[el]);
    });
    const arr2numC = arr => arr.map(str => str).join(',');
    ['legendAngle', 'legendDensity'].filter(el => printData[el] !== undefined).map((el) => {
        printData[el] = arr2numC(printData[el]);
    });
    if (printData.legendWidth !== undefined) {
        printData.legendStr = R.repeat('x', printData.legendWidth).join('');
    }

    return printData;
};

const R = require('ramda');
const extractor = require('../utils/dataExtractor');
const preprocess2 = require('./printDataPreprocessor').preprocess2;

exports.makePrintData = (graphName, cpuBase, micBase, knlBase) => {
    const arr = ['calcDistMatrix_duration', 'pamBuild_duration', 'pamSwap_duration', 'runTotal_duration'];
    const cpuData = extractor.extractValues(cpuBase, arr);
    const micData = extractor.extractValues(micBase, arr);
    const knlData = extractor.extractValues(knlBase, arr);

    cpuData.changedParamValues = cpuData.changedParamValues.map(val => val / 1024);

    const customZip = (a1, a2, a3) => R.flatten(R.zip(R.zip(a1, a2), a3));

    const cpuValues = customZip(cpuData.calcDistMatrix_duration, cpuData.pamBuild_duration, cpuData.pamSwap_duration);
    const micValues = customZip(micData.calcDistMatrix_duration, micData.pamBuild_duration, micData.pamSwap_duration);
    const knlValues = customZip(knlData.calcDistMatrix_duration, knlData.pamBuild_duration, knlData.pamSwap_duration);

    const labelPrep = (num, i, arr) => {
        const numSize = String(num).length;
        let offset = '';
        if (arr.length == 7) offset = '    ';
        return `"${offset}${'     '.substr(numSize)}${num}"`;
    };

    const printData = {
        svgFileName: graphName,
        cpuValues,
        micValues,
        knlValues,
        colNumber: cpuData.calcDistMatrix_duration.length,
        yMax: Math.max.apply(null, R.flatten([cpuData.runTotal_duration, micData.runTotal_duration, knlData.runTotal_duration])) * 1.05,
        xLabels: cpuData.changedParamValues.map(labelPrep),
        legendNames: [
            '2xXeon, 24 threads',
            'Prepare Distance Matrix',
            'BUILD phase',
            'SWAP phase',
            '',
            'KNC, 240 threads',
            'Prepare Distance Matrix',
            'BUILD phase',
            'SWAP phase',
            '',
            'KNL, 272 threads',
            'Prepare Distance Matrix',
            'BUILD phase',
            'SWAP phase',
        ],
        xLabel: '# data points, x1024',
        yLabel: 'Runtime, sec.',
    };
    return preprocess2(printData);
};

const R = require('ramda');

const loader = require('../utils/databaseLoader');
const runR = require('../utils/runR');
const perf2_2 = require('./performanceData2_2'); // barplot

const cp = require('child_process');
const fs = require('fs');

exports.perfPlots2_2 = (folder, template) => {
    const load = loader.load(folder);
    const makePerfPlot = (fileName, cpuBase, micBase, knlBase) => runR.run(template, perf2_2.makePrintData(fileName, load(cpuBase), load(micBase), load(knlBase)));
    const arr = [
        ['performance-2-power', 'HOST_VEC_1_par_power.json', 'MIC_VEC_1_par_power.json', 'KNL_VEC_1_par_power.json'],
        ['performance-2-census', 'HOST_VEC_1_par_census.json', 'MIC_VEC_1_par_census.json', 'KNL_VEC_1_par_census.json'],
        ['performance-2-fcshuman', 'HOST_VEC_1_par_fcs_human.json', 'MIC_VEC_1_par_fcs_human.json', 'KNL_VEC_1_par_fcs_human.json'],
        ['performance-2-mixsim', 'HOST_VEC_1_par_mixsim.json', 'MIC_VEC_1_par_mixsim.json', 'KNL_VEC_1_par_mixsim.json'],
    ];
    arr.forEach(R.apply(makePerfPlot));
    return arr.map(el => el[0]);
};

exports.svg2pdfs = (inkscapeDir, svgDir, exportDir, exportType) => {
    fs.readdirSync(svgDir).forEach(svg2pdf(inkscapeDir, svgDir, exportDir, exportType));
};

var svg2pdf = R.curry((inkscapeDir, svgDir, exportDir, exportType, name) => {
    const rawName = name.substring(0, name.length - 4);
    const command = `${inkscapeDir} -D -z --file=${svgDir}${name} --export-${exportType}=${exportDir}${rawName}.${exportType}`;
    const output = cp.execSync(command);
//    console.log(iconv.decode(output, 'cp1251'));
});

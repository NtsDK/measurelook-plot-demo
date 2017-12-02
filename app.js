const R = require('ramda');
const plots = require('./plots');
const generateHtml = require('./utils/generateHtml');
const config = require('./config');

const arr = [];

const folder = '../measures/PAM-3/';
arr.push(plots.perfPlots2_2(folder, 'templates/performancePlot2_2.tmpl'));

generateHtml.generate(arr);

const svgDir = 'svgs/';
const inkscapeDir = config.get('inkscapePath');
if(config.get('makePdfs')){
    plots.svg2pdfs(inkscapeDir, svgDir, 'pdfs/', 'pdf');
}
if(config.get('makePngs')){
    plots.svg2pdfs(inkscapeDir, svgDir, 'pngs/', 'png');
}

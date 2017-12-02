const fs = require('fs');
const templater = require('mustache');
const iconv = require('iconv-lite');
const cp = require('child_process');

const config = require('../config');

const command = `${config.get('rPath')} --vanilla`;

exports.run = function (templateFile, printData) {
    const template = fs.readFileSync(templateFile, { encoding: 'utf8' });
    const result = templater.render(template, printData);
    //    fs.writeFile('plot.R', iconv.encode(result, 'cp1251'));
    //    var output = cp.execSync(command);
    //    console.log(result);
    const output = cp.execSync(command, { input: iconv.encode(result, 'cp1251') });
    //    var output = cp.execSync(command, {input: iconv.encode(result, 'utf8')});
    console.log(iconv.decode(output, 'cp1251'));
};

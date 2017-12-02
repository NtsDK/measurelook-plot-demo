const fileName = 'D:\\USCensus1990.data.txt';

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(fileName)
});

let counter = 0;
let acc = '';
lineReader.on('line', (line) => {
    console.log('Line from file:', line);
    acc += `${line}\n`;
    counter++;
    if (counter > 40000) {
        require('fs').writeFile('tmp.csv', acc);
        lineReader.close();
    }
});

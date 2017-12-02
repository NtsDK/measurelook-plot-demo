const fs = require('fs');

const head = `<!DOCTYPE html>

<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style type="text/css">
  .img-container{
    display:flex;
    justify-content: space-around;
    flex-wrap:wrap;
  }

  .img-container > figure {
    flex: 1 1 500px;
  }
</style>
</head>
<body onload="app.init()">`;

const foot = `</body>
</html>`;

exports.generate = (arr) => {
    const body = arr.map(subArr => `<div class="img-container">${
        subArr.map(el => `<figure><img src=   "svgs/${el}.svg" alt="${el}"><figcaption>${el}</figcaption></figure>`).join('')
    }</div>`).join('');

    fs.writeFileSync('pic-preview.html', head + body + foot);
};

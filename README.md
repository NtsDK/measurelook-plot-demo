# About project ([README Rus](https://github.com/NtsDK/measurelook-plot-demo/wiki/README-RUS))

This repo contains real example of building chart for scientific article using Measurelook file with Inkscape and R. 

How it works:
1. Data is readed and prepared.
2. Prepared data is passed it templater input (Mustache) and templater output returns R program to build SVG chart.
3. R executes program. You recieve SVG files.
4. Generated pic-preview.html with SVGs links to quick preview in browser.
5. (optional) SVG processes in PNG and PDF with Inkscape

Note: This repo contains Implementation-1 of image builder. I have a revised Implementation-2 which is more reusable but it is not published yet.

# Intall and run

0. Download repo
1. npm i
2. Fix config\config.json - change path to R (required) and Inkscape (only if you need convert svg->png and svg->pdf) 
3. node app.js

# Project structure

- config - run settings
- measures - folder with Measurelook data files
- pdfs - PDF folder
- plots 
    - index.js - starter of chart building
    - performanceData2_2.js - preparing data for chart
    - printDataPreprocessor.js - reusable chart data postprocessing
- pngs - PNG folder
- svgs - SVG folder
- templates - R templates folder
- utils
    - databaseLoader.js - reader of Measurelook files
    - dataExtractor.js - tracks extractor 
    - generateHtml.js - pic-preview.html generator
    - runR.js - running of R script from JavaScript 
- app.js - application starter
- pic-preview.html - preview SVGs in browser

# Linters usage

    eclint check 
    eclint fix 

    "node_modules/.bin/eslint" app.js --fix
    "node_modules/.bin/eslint" plots --fix
    "node_modules/.bin/eslint" utils --fix
    "node_modules/.bin/eslint" config --fix

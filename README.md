# О проекте

В этом проекте приведен реальный пример формирования графика для научной статьи из файлов экспериментов Measurelook с 
помощью Inkscape и R.

Порядок работы:
1. Данные считываются и преобразуются.
2. Преобразованные данные подаются на вход шаблонизатору и на выходе получается R программа построения svg графика.
3. R программа исполняется. Получаются svg файлы.
4. Формируется pic-preview.html из svg для предварительного просмотра в браузере.
5. (необязательно) svg преобразуются в png и pdf с помощью Inkscape

# Установка и запуск

0. Скачать репозиторий
1. npm i
2. Поправить config\config.json - заменить пути к R (обя) и Inkscape (необязательно, если не будет конвертации svg->png и svg->pdf) 
3. node app.js

# Структура проекта

- config - настройки запуска
- measures - исходные данные для построения графиков
- pdfs - папка с pdf
- plots 
    - index.js - запуск формирования графика
    - performanceData2_2.js - сборка данных для графика
    - printDataPreprocessor.js - переиспользуемая доработка данных для графиков
- pngs - папка с png
- svgs - папка с svg
- templates - шаблон построения графика на R
- utils
    - databaseLoader.js - загрузчик экспериментальных данных в память
    - dataExtractor.js - извлечение отдельных параметров из данных экспериментов
    - generateHtml.js - генератор pic-preview.html
    - runR.js - запуск R скрипта из JavaScript 
- app.js - точка входа
- pic-preview.html - предпросмотр получившихся svg графиков в браузере

# Использование линтеров

    eclint check 
    eclint fix 

    "node_modules/.bin/eslint" app.js --fix
    "node_modules/.bin/eslint" plots --fix
    "node_modules/.bin/eslint" utils --fix
    "node_modules/.bin/eslint" config --fix

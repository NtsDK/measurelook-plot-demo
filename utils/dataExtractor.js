const R = require('ramda');

exports.extractValues = R.curry((database, paramNames) => {
    const changedParam = database.changedParams[0];
    let measures = R.values(database.measures);
    measures = R.sort((a, b) => a[changedParam.name] - b[changedParam.name], measures);
    //    console.log(measures);

    const res = {};
    res.changedParamValues = measures.map(R.prop(changedParam.name));
    paramNames.forEach((name) => {
        res[name] = measures.map(R.prop(name));
    });

    return res;
});

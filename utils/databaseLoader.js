const R = require('ramda');

const populateIndirectParams = (base) => {
    const indirectParams = base.measuredParams.filter(param => param.type === 'indirect');
    R.values(base.measures).forEach((measure) => {
        indirectParams.forEach((indirectParam) => {
            measure[indirectParam.name] = R.sum(R.values(R.pick(indirectParam.sumOf, measure)));
        });
    });
};

exports.load = R.curry((folder, fileName) => {
    const database = require(folder + fileName);

    populateIndirectParams(database);

    const changedParam = database.changedParams[0];
    const measuredParam = database.measuredParams[0];
    //    console.log(measuredParam)

    const pointed = R.groupBy(item => item[changedParam.name], R.values(database.measures));
    //    console.log(pointed)

    const avg = R.map((value) => {
        const clone = R.clone(value[0]);
        database.measuredParams.forEach((measuredParam) => {
            const rawValues = R.ap([R.prop(measuredParam.name)], value).sort();
            clone[measuredParam.name] = R.median(rawValues);
        });
        return clone;
    }, pointed);

    const measures = R.indexBy(R.prop('measureKey'), R.values(avg));

    database.measures = measures;

    //console.log(avg)
    //    console.log(measures)
    //    console.log(JSON.stringify(database))
    return database;
});

exports.toScalability = (database) => {
    const measures = database.measures;

    const timeParams = database.measuredParams.filter(param => param.units === 'seconds');
    const arr = timeParams.map(R.prop('name'));
    timeParams.forEach(param => param.units = 'real number');

    database.measuredParams.filter(param => param.type === 'indirect').forEach((param) => {
        param.type = 'direct';
        delete param.sumOf;
    });

    const ref = R.clone(measures['1_0']);
    Object.keys(database.measures).forEach((name) => {
        const tmp = database.measures[name];
        arr.forEach((name2) => {
            tmp[name2] = ref[name2] / tmp[name2];
            //tmp["iterationCount"] = tmp["ompThreadNum"];
        });
    });

    return database;
};

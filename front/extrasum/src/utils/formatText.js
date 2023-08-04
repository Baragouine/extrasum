function argSortSumInfo(sumInfo, filter) {
    let tmp = sumInfo.map((sentInfo, index) => ({index:index, sentInfo:sentInfo}));

    tmp.sort((a, b) => filter.reduce((acc, curr) => acc + a.sentInfo[curr], 0)-filter.reduce((acc, curr) => acc + b.sentInfo[curr], 0));

    return tmp.map((e) => e.index);
}

function dominantComponent(sentInfo, filter) {
    for (let i = 0; i < filter.length; ++i) {
        let sup = true;

        for (let j = 0; j < filter.length; ++j) {
            if (i !== j) {
                if (sentInfo[filter[i]] > sentInfo[filter[j]])
                    sup = false;
            }
        }

        if (sup)
            return filter[i];
    }

    return "many";
}

function formatTextUnitChar(sumInfo, excludedSents, filter, maxLength) {
    let argsort = argSortSumInfo(sumInfo, filter);
    let totalLength = 0;

    argsort.reverse();

    let result = [...sumInfo];

    for (let i = 0; i < result.length; ++i)
        result[i].dominantComponent = null;

    excludedSents.forEach((i) => {
        totalLength -= sumInfo[i].sentence.length;
    });

    for (let i = 0; i < sumInfo.length; ++i) {
        if (totalLength < maxLength) {
            result[argsort[i]].dominantComponent = dominantComponent(result[argsort[i]], filter);
            totalLength += result[argsort[i]].sentence.length;
        }
    }

    excludedSents.forEach((i) => {
        result[i].dominantComponent = "excluded";
    });

    return result;
}

function formatTextUnitLine(sumInfo, excludedSents, filter, maxLength) {
    let argsort = argSortSumInfo(sumInfo, filter);
    let newMaxLength = maxLength;

    argsort.reverse();

    let result = [...sumInfo];

    for (let i = 0; i < result.length; ++i)
        result[i].dominantComponent = null;

    newMaxLength += excludedSents.length;

    for (let i = 0; i < result.length && i < newMaxLength; ++i)
        result[argsort[i]].dominantComponent = dominantComponent(result[argsort[i]], filter);

    excludedSents.forEach((i) => {
        result[i].dominantComponent = "excluded";
    });

    return result;
}

export function formatText(sumInfo, excludedSents, filter, maxLength, lengthUnit) {
    let tmpSumInfo = [...sumInfo];

    console.log(excludedSents);

    for (let i = 0; i < sumInfo.length; ++i)
        tmpSumInfo[i].index = i;

    if (lengthUnit === "char")
        return formatTextUnitChar(tmpSumInfo, excludedSents, filter, parseInt(maxLength));

    return formatTextUnitLine(tmpSumInfo, excludedSents, filter, parseInt(maxLength));
}

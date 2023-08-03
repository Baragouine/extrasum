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

    excludedSents.forEach((i) => {
        if (i < maxLength)
            totalLength -= sumInfo[i].sentence.length;
    });

    for (let i = 0; i < sumInfo.length; ++i) {
        if (totalLength < maxLength) {
            result[i].dominantComponent = dominantComponent(result[i], filter);
            totalLength += result[i].sentence.length;
        }
    }

    excludedSents.forEach((i) => {
        result[i].dominantComponent = null;
    });

    return sumInfo;
}

function formatTextUnitLine(sumInfo, excludedSents, filter, maxLength) {
    let argsort = argSortSumInfo(sumInfo, filter);

    argsort.reverse();

    let result = [...sumInfo];

    excludedSents.forEach((i) => {
        if (i < maxLength) ++maxLength;
    });

    for (let i = 0; i < result.length && i < maxLength; ++i)
        result[i].dominantComponent = dominantComponent(result[i], filter);

    excludedSents.forEach((i) => {
        result[i].dominantComponent = null;
    });

    return sumInfo;
}

export function formatText(sumInfo, excludedSents, filter, maxLength, lengthUnit) {
    if (lengthUnit === "char")
        return formatTextUnitChar(sumInfo, excludedSents, filter, maxLength);

    return formatTextUnitLine(sumInfo, excludedSents, filter, maxLength);
}

var trueColorVis = {
    bands: ['SR_B4', 'SR_B3', 'SR_B2'], // Red, Green, Blue
    min: 0.0,
    max: 0.3,
    gamma: 1.1
};


var falseColorVis_Veg = {
    bands: ['SR_B5', 'SR_B4', 'SR_B3'], // NIR, Red, Green
    min: 0.0,
    max: 0.4,
    gamma: 1.4
};


var ndviVis = {
    min: -0.5,
    max: 0.8,
    palette: [
        '#d73027',
        '#fc8d59',
        '#fee08b',
        '#ffffbf',
        '#d9ef8b',
        '#91cf60',
        '#1a9850']
};

var demVis = {
    min: 0,
    max: 4000,
    palette: [
        '006633',
        'E5FFCC',
        '662A00',
        'D8D8D8',
        'F5F5F5'
    ]
};


Export.image.toDrive(image, description, folder, fileNamePrefix, dimensions, region, scale, crs, crsTransform, maxPixels, shardSize, fileDimensions, skipEmptyTiles, fileFormat, formatOptions, priority)
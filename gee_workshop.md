basic JavaScript guide for Google Earth Engine (GEE) development:

### 1. Variables and Data Types
```javascript
// Variable declaration
var number = 42;                  // Number
var text = "Hello, Earth!";       // String
var boolean = true;               // Boolean
var list = [1, 2, 3, 4];          // Array
var object = {key: "value"};      // Object

// Array variable
var array = [1, 2, 3, 4, 5];
// Accessing array elements
var firstElement = array[0];      // 1
// Modifying array elements
array[1] = 10;                   // [1, 10, 3, 4, 5]
// Object variable
var obj = {name: "Earth", age: 4.5};
obj.name = "Mars";              // {name: "Mars", age: 4.5}
// Accessing object properties
var name = obj.name;            // "Mars"
// Modifying object properties
obj.age = 4.6;                 // {name: "Mars", age: 4.6}

// Earth Engine objects
var numList = ee.List([1, 2, 3, 4, 5]);
var image = ee.Image("LANDSAT/LC08/C01/T1/LC08_044034_20140318");
var geometry = ee.Geometry.Point([-122.082, 37.42]);
```

### 2. Comment
```javascript
// Single line comment
/*
Multi-line comment
   This is a multi-line comment
   that spans multiple lines.
*/

```

### 3. Functions
```javascript
// function declaration 
function showMessage() {
    print('Hello, Earth Engine!');
}

// call the function
showMessage();

// Function with parameters
function addNumbers(a, b) {
    return a + b;
}
var sum = addNumbers(5, 10);      // 15

// Earth Engine function
var roi = ee.Geometry.Polygon(
        [[[98.9171009716561, 18.815619476862654],
          [98.9171009716561, 18.68557890893041],
          [99.0873890575936, 18.68557890893041],
          [99.0873890575936, 18.815619476862654]]]);
// Define a function to calculate NDVI for one image
function calcNDVI(image) {
    // Compute normalized difference of bands B8 and B4
    return image.normalizedDifference(['B8', 'B4'])
                .rename('NDVI');
}

// Apply the function to every image in the collection
var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2021-01-01', '2021-01-31')
    .filterBounds(roi);

var ndviCollection = collection.map(calcNDVI);

// Compute the median composite of NDVI
var medianNDVI = ndviCollection.median();

Map.addLayer(medianNDVI, {min: 0, max: 1}, 'Median NDVI');

```

### 4. if…else Statements
```javascript
// Client-side if…else
let x = 7;
let y = 5;

// Simple if-else to compare JS numbers
if (x > y) {
  print('x is greater than y');  // prints: x is greater than y
} else if (x === y) {
  print('x is equal to y');
} else {
  print('x is less than y');
}

// Earth Engine if…else
var image = ee.Image('LANDSAT/LC08/C01/T1/LC08_044034_20140318');
var ndvi = image.normalizedDifference(['B5', 'B4']);
var threshold = 0.5;
var mask = ndvi.gt(threshold);
var maskedImage = image.updateMask(mask);
Map.addLayer(maskedImage, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Masked Image');

// ee.Algorithms.If
var condition = ee.Number(5);
var result = ee.Algorithms.If(condition.gt(0), 'Positive', 'Negative');
print('Result:', result);  // prints: Result: Positive

```

### 5. Loops
```javascript
// Client-side for loop
for (var i = 0; i < 5; i++) {
    print('Iteration:', i);
}

// Client-side while loop
var j = 0;
while (j < 5) {
    print('While loop iteration:', j);
    j++;
}

// map function
var numbers = [1, 2, 3, 4, 5];
var squaredNumbers = numbers.map(function(num) {
    return num * num;
});
print('Squared Numbers:', squaredNumbers);  // [1, 4, 9, 16, 25]

// Server-side for loop
var serverList = ee.List([1, 2, 3, 4, 5]);
var serverSquared = serverList.map(function(num) {
    return ee.Number(num).multiply(ee.Number(num));
});
print('Server Squared:', serverSquared);  // [1, 4, 9, 16, 25]

// Earth Engine map function
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1');
var ndviCollection = collection.map(function(image) {
    return image.normalizedDifference(['B5', 'B4']).rename('NDVI');
});

```

### 6. Object
```javascript
var Car = {
    wheels: 4,
    door: 2,
    start: function() {
        print('Car started');
        return this;  
    }
};

var tota = Car;
print('Toyota wheels:', tota.wheels);  
tota.color = "red";
print('Tota color:', tota.color);  
tota.start();

var hoda = Car;
hoda.door = 5; 
print('Hoda door:', hoda.door); 

tota.drive = function() {
    print('Car is driving');
    return this;  
};
// tota.drive();  

tota.stop = function() {
    print('Car stopped');
    return this;
};
// tota.stop();  

// chain method calls
tota.start().drive().stop(); 
```

### 7. EE Objects and Methods
#### Earth Engine objects
```javascript
// instance of Earth Engine objects 
var geometry = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]); 

// create a feature with properties
var feature = ee.Feature(geometry, {name: 'Chiang Mai'});
print('Feature:', feature);  

// methods of Earth Engine objects
var area = feature.geometry().area(); 
print('Area:', area);  

// Map methods
Map.centerObject(feature, 10); 
Map.addLayer(feature, {color: 'red'}, 'Feature'); 
```
#### Earth Engine objects for image and image collection
```javascript
// instance of Earth Engine objects for image 
var image = ee.Image('LANDSAT/LC09/C02/T1_TOA/LC09_131047_20240103');
// methods of Earth Engine objects for image
var bandNames = image.bandNames();
print('Band names:', bandNames); 
var bandCount = image.bandNames().length();
print('Band count:', bandCount); 
var band4 = image.select('B4');
print('Band 4:', band4);  

Map.centerObject(image, 10);
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3000}, 'RGB');

// instance of Earth Engine objects for image collection
var dataset = ee.ImageCollection('LANDSAT/LC09/C02/T1_TOA')
    .filterDate('2024-01-01', '2024-03-30') // Filter method by date;
var trueColor432 = dataset.select(['B4', 'B3', 'B2']);
var trueColor432Vis = {
  min: 0.0,
  max: 0.4,
};
Map.setCenter(98.9616, 18.7137);
Map.addLayer(trueColor432, trueColor432Vis, 'True Color (432)');  
```

### 8. Method Chaining
```javascript
// Non-chaining methods
var image = ee.Image('LANDSAT/LC09/C02/T1_TOA/LC09_131047_20240103');
var band4 = image.select('B4');
var band3 = image.select('B3');
var band2 = image.select('B2');
var rgb = band4.addBands(band3).addBands(band2);
image.select(['B4', 'B3', 'B2'])
Map.centerObject(image, 10);
Map.addLayer(image, {min: 0, max: 3000}, 'RGB');

// Chaining methods for image collection
var collection = ee.ImageCollection('LANDSAT/LC09/C02/T1_TOA')
    .filterDate('2024-01-01', '2024-03-30')
    .filterBounds(geometry)
    .select(['B4', 'B3', 'B2'])
    .mean();
Map.centerObject(geometry, 10);
Map.addLayer(collection, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Mean Image');

// Chaining methods with functions
function calculateNDVI(image) {
    return image.normalizedDifference(['B8', 'B4']).rename('NDVI');
}
var filtered = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2021-01-01', '2021-01-31')
    .filterBounds(geometry)
    .map(calculateNDVI)
    .select('NDVI')
    .mean();
Map.centerObject(geometry, 10);
Map.addLayer(filtered, {min: 0, max: 1}, 'Mean NDVI');

```

### 9. Image
```javascript
// Image object
var image = ee.Image('LANDSAT/LC09/C02/T1_L2/LC09_129050_20231220');
var band4 = image.select('SR_B4');
var band3 = image.select('SR_B3');
var band2 = image.select('SR_B2');
var rgb = band4.addBands(band3).addBands(band2);
Map.centerObject(image, 10);
Map.addLayer(rgb, {min: 8000, max: 11000}, 'RGB');

// Image from ImageCollection
var bangkok = ee.Geometry.Point([100.5018, 13.7563]);
// Load Landsat 9 Collection 2 Tier 1 raw data
var landsat9 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
  .filterBounds(bangkok)
  .filterDate('2023-01-01', '2023-12-31')
  .sort('CLOUD_COVER')
  .first();

// Select desired spectral bands
var image = landsat9.select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5']);

// Apply scale factors for Surface Reflectance
var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);

// Add image properties
var image = opticalBands
  .set({
    'system:time_start': landsat9.get('system:time_start'),
    'ACQUISITION_DATE': landsat9.date().format('YYYY-MM-dd'),
    'SPACECRAFT_ID': landsat9.get('SPACECRAFT_ID'),
    'CLOUD_COVER': landsat9.get('CLOUD_COVER')
  });

// Print image metadata
print('Landsat 9 Image Metadata:', image);
print('Acquisition Date:', image.get('ACQUISITION_DATE'));
print('Available Band Names:', image.bandNames());

// Visualization parameters
var trueColor = {
  bands: ['SR_B4', 'SR_B3', 'SR_B2'],
  min: 0.0,
  max: 0.3,
  gamma: 1.4
};

// Center map and display
Map.centerObject(bangkok, 10);
Map.addLayer(image, trueColor, 'Landsat 9 True Color');

```

### 10. Image Collection
```javascript
// Image Collection object sentinel 2 with cloud mask and median composite
var geometry = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);
var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2021-01-01', '2021-01-31')
    .filterBounds(geometry)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .select(['B4', 'B3', 'B2'])
    .median();
Map.centerObject(geometry, 10);
Map.addLayer(collection, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Median Image');
```

### 11. Geometry
```javascript
// Geometry object
var point = ee.Geometry.Point([98.9171009716561, 18.815619476862654]);
var line = ee.Geometry.LineString([[98.9171009716561, 18.815619476862654], [99.0873890575936, 18.68557890893041]]);
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);
var buffer = point.buffer(1000);  // Buffer of 1000 meters
var centroid = polygon.centroid();
var area = polygon.area();  // Area of the polygon
print('Point:', point);
print('Line:', line);
print('Polygon:', polygon);
print('Buffer:', buffer);
print('Centroid:', centroid);
print('Area:', area);
// Map visualization
Map.centerObject(polygon, 10);
Map.addLayer(point, {color: 'yellow'}, 'Point');
Map.addLayer(line, {color: 'orange'}, 'Line');
Map.addLayer(polygon, {color: 'red'}, 'Polygon');
Map.addLayer(buffer, {color: 'blue'}, 'Buffer');  
Map.addLayer(centroid, {color: 'green'}, 'Centroid');  
```

### 12. Feature
```javascript
// Feature object
var point = ee.Geometry.Point([98.9171009716561, 18.815619476862654]);
var feature = ee.Feature(point, {name: 'Chiang Mai', population: 1000000});
print('Feature:', feature);

// Polygon feature
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);
var feature = ee.Feature(polygon, {name: 'Chiang Mai', population: 1000000});
print('Feature:', feature);
// add to map
Map.centerObject(feature, 10);
Map.addLayer(feature, {color: 'red'}, 'Feature');
```

### 13. Feature Collection
```javascript
// Feature Collection object
var point1 = ee.Geometry.Point([98.9171009716561, 18.815619476862654]);
var point2 = ee.Geometry.Point([99.0873890575936, 18.68557890893041]);
var feature1 = ee.Feature(point1, {name: 'Chiang Mai', population: 1000000});
var feature2 = ee.Feature(point2, {name: 'Sarapee', population: 8000000});
var featureCollection = ee.FeatureCollection([feature1, feature2]);
print('Feature Collection:', featureCollection);
// add to map
Map.centerObject(featureCollection, 10);
Map.addLayer(featureCollection, {color: 'red'}, 'Feature Collection');
```

### 14. Reducer
```javascript
// Per-pixel time series
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);

var s2 = ee.ImageCollection('COPERNICUS/S2')
           .filterDate('2021-01-01','2021-12-31')
           .filterBounds(polygon);

// Compute per-pixel mean across time
var meanTime = s2.reduce(ee.Reducer.mean());

Map.addLayer(meanTime, {bands:['B4_mean','B3_mean','B2_mean'], min:0, max:3000}, 'Mean per Pixel over Time');
```
#### Histogram
```javascript
// Grouped by time
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);

var s2 = ee.ImageCollection('COPERNICUS/S2')
           .filterDate('2021-01-01','2021-12-31')
           .filterBounds(polygon);
var months = ee.List.sequence(1, 12);

var monthlyCount = months.map(function(m) {
  var filtered = s2.filter(ee.Filter.calendarRange(m, m, 'month'));
  return filtered.size();
});

print('Images per month (2021):', monthlyCount);

// add histogram chart
var chart = ui.Chart.array.values(monthlyCount, 0, months)
    .setChartType('ColumnChart')
    .setOptions({
      title: 'Monthly Image Count (2021)',
      hAxis: {title: 'Month'},
      vAxis: {title: 'Image Count'},
      legend: {position: 'none'}
    });
print(chart);
```
#### Image statistics (reduceRegion)
```javascript
// Regional statistics (reduceRegion)
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);

var s2 = ee.ImageCollection('COPERNICUS/S2')
           .filterDate('2021-01-01','2021-03-31')
           .filterBounds(polygon);
var meanTime = s2.reduce(ee.Reducer.mean());
var stats = meanTime.reduceRegion({
  reducer: ee.Reducer.mean().combine({
    reducer2: ee.Reducer.max(),
    sharedInputs: true
  }),
  geometry: polygon,
  scale: 30
});
print('Mean & Max over polygon:', stats);
```
#### Neighborhood / Focal operations (reduceNeighborhood)
```javascript
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);

var s2 = ee.ImageCollection('COPERNICUS/S2')
           .filterDate('2021-01-01','2021-12-31')
           .filterBounds(polygon);
var meanTime = s2.reduce(ee.Reducer.mean());
// Neighborhood / Focal operations (reduceNeighborhood)
var focalMean = meanTime.reduceNeighborhood({
  reducer: ee.Reducer.mean(),
  kernel: ee.Kernel.square({radius: 1})
});
Map.addLayer(focalMean, {min:0, max:3000}, '3×3 Focal Mean');

```
#### Per-band summary (reduceRegion on multiband)
```javascript
// Per-band summary (reduceRegion on multiband)
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);

var s2 = ee.ImageCollection('COPERNICUS/S2')
           .filterDate('2021-01-01','2021-03-31')
           .filterBounds(polygon);
var composite = s2.median();
var bandStats = composite.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: polygon,
  scale: 100
});
print('Mean per band:', bandStats);
```
#### Across-band summary (reduceRegion on multiband)
```javascript
// Across-band reduction (reduce)
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);

var s2 = ee.ImageCollection('COPERNICUS/S2')
           .filterDate('2021-01-01','2021-12-31')
           .filterBounds(polygon);
var composite = s2.median();
var bandSum = composite.reduce(ee.Reducer.sum());
Map.addLayer(bandSum, {min:9000, max:15000}, 'Sum across Bands');
```
#### Reducer Image object
```javascript
// Reducer Image object
var reducer = ee.Reducer.mean();
var image = ee.Image('LANDSAT/LC09/C02/T1_L2/LC09_129050_20231220');
var mean = image.reduceRegion({
    reducer: reducer,
    geometry: image.geometry(),
    scale: 30,
    maxPixels: 1e13
});
print('Mean:', mean);

// Image Collection reduce by polygon
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);

var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2021-01-01', '2021-01-31')
    .filterBounds(polygon)
    .select(['B4', 'B3', 'B2'])
    .mean()
    .clip(polygon);  

// zonal statistics
var mean = collection.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: polygon,
    scale: 30,
    maxPixels: 1e13
});

print(mean);
Map.centerObject(polygon, 13);
Map.addLayer(collection, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Mean Image');

// Feature Collection reducer
var feature1 = ee.Feature(point1, {name: 'Chiang Mai', population: 1000000});
var feature2 = ee.Feature(point2, {name: 'Sarapee', population: 8000000});
var featureCollection = ee.FeatureCollection([feature1, feature2]);
var meanPopulation = featureCollection.reduceColumns({
    reducer: ee.Reducer.mean(),
    selectors: ['population']
});
print('Mean Population:', meanPopulation.get('mean'));  // prints: Mean Population: 4000000
```

### 15. join
```javascript
// Define point and polygon collections
var points = ee.FeatureCollection([
  ee.Feature(ee.Geometry.Point([100.5,13.7]), {pid:1}),
  ee.Feature(ee.Geometry.Point([100.55,13.75]), {pid:2})
]);
var polygons = ee.FeatureCollection([
  ee.Feature(ee.Geometry.Rectangle([100.4,13.6,100.6,13.8]), {zone: 'A'}),
  ee.Feature(ee.Geometry.Rectangle([100.45,13.65,100.65,13.85]), {zone: 'B'})
]);

// Create a spatial filter: point within polygon
var spatialFilter = ee.Filter.contains({
  leftField: '.geo',    // polygon geometry
  rightField: '.geo'    // point geometry
});

// Perform an inner spatial join
var spatialJoin = ee.Join.inner();
var spatialJoined = spatialJoin.apply(polygons, points, spatialFilter);

// Attach point property 'pid' to each polygon
var result = spatialJoined.map(function(f) {
  var poly = ee.Feature(f.get('primary'));
  var pt   = ee.Feature(f.get('secondary'));
  return poly.set('point_id', pt.get('pid'));
});

// Display on the map
Map.centerObject(polygons, 10);

// Polygons in blue
Map.addLayer(polygons, {color: 'blue'}, 'Polygons');

// Points in black
Map.addLayer(points, {color: 'black'}, 'Points');

// Spatially-joined polygons with attached pid in purple
Map.addLayer(result, {color: 'purple'}, 'Spatial Join');

```

### 16. images properties
```javascript
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);

var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2025-01-01', '2025-03-31')
    .filterBounds(polygon)
    .select(['B4', 'B3', 'B2']) 

// get image count
var imageCount = coll ection.size();
print('Image Count:', imageCount); 
// get image list
var imageList = collection.toList(imageCount);
print('Image List:', imageList);  
// get first image
var firstImage = ee.Image(imageList.get(0));
print('First Image:', firstImage); 
// get image properties
var imageProperties = firstImage.propertyNames();
print('Image Properties:', imageProperties); 
// get image bands
var imageBands = firstImage.bandNames();
print('Image Bands:', imageBands);  
// get image metadata
var imageMetadata = firstImage.getInfo();
print('Image Metadata:', imageMetadata);  
// get image date
var imageDate = firstImage.date();
print('Image Date:', imageDate); 
// get image geometry
var imageGeometry = firstImage.geometry();
print('Image Geometry:', imageGeometry); 
// get image scale
var imageScale = firstImage.select('B4').projection().nominalScale();
print('Image Scale:', imageScale);  
// get image projection
var imageProjection = firstImage.select('B4').projection();
print('Image Projection:', imageProjection); 

Map.centerObject(polygon, 10);
Map.addLayer(collection, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Image Collection');
```

#### 17 Map object
```javascript
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);

var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2025-01-01', '2025-03-31')
    .filterBounds(polygon)
Map.centerObject(collection, 8); 
Map.addLayer(
  collection,             // eeObject
  {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, // visParams
  'Image Collection',      // name
  false,                   // shown (hidden by default)
  0.5                      // opacity (50% transparent)
);

```

#### 18 Viuslization
```javascript
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);

var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2025-01-01', '2025-03-31')
    .filterBounds(polygon)

var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
    .filter(ee.Filter.eq('country_na', 'Thailand'));

var dem = ee.Image('USGS/SRTMGL1_003');

var rgbVis = {
  bands: ['B4', 'B3', 'B2'],  // Use red, green, blue bands
  min: 0,                     // Map pixel values from 0
  max: 3000,                  // to 3000
  gamma: 1.1                  // Apply slight gamma correction
};

var demVis = {
  min: 0,                      // lowest elevation (meters)
  max: 3000,                   // highest elevation (meters)
  palette: [
    '0000ff',                  // deep water (if below 0)
    '00ffff',                  // sea level
    '00ff00',                  // lowlands
    'ffff00',                  // mid elevations
    'ff7f00',                  // high elevations
    'ffffff'                   // peaks
  ]
};

var countryStyle = {
  color: 'FF0000',            // Red outline
  fillColor: 'FF000022',      // Translucent red fill
  width: 1                    // 1-pixel wide border
};

Map.centerObject(collection, 8);   // Zoom level 8

// Add the RGB image layer
Map.addLayer(
  collection,               // eeObject
  rgbVis,                   // visParams
  'Sentinel-2 RGB',         // name
  true,                     // shown
  0.8                       // opacity
);

// Add the DEM layer
Map.addLayer(
  dem,                     // eeObject
  demVis,                  // visParams
  'SRTM DEM',              // name
  false,                   // shown (hidden by default)
  0.5                      // opacity (50% transparent)
);

// Add the country borders layer
Map.addLayer(
  countries,                // eeObject
  countryStyle,             // visParams
  'Country Borders',        // name
  false,                    // shown (hidden by default)
  1.0                       // opacity (fully opaque)
);

```

### 19. Filter  
```javascript
// Filter by date
var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2025-01-01', '2025-03-31')   // Filter method by date
Map.addLayer(collection, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Image Collection');

// Filter by bounds
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);
var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2025-01-01', '2025-03-31')   // Filter method by date
    .filterBounds(polygon)                    // Filter method by bounds
Map.centerObject(polygon, 10);
Map.addLayer(collection, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Image Collection');

// Filter by cloudy pixel percentage
var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2025-01-01', '2025-03-31')   // Filter method by date
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))  // Filter method by property
    .filterBounds(polygon)                    // Filter method by bounds
Map.centerObject(polygon, 10);
Map.addLayer(collection, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Image Collection');

// Filter country
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
    .filter(ee.Filter.eq('country_na', 'Thailand'));  // Filter method by property
Map.centerObject(countries, 10);
Map.addLayer(countries, {color: 'red'}, 'Country');
```

### 20. Band and band selection
```javascript
// Define a region of interest (ROI)
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);

// Load the Sentinel-2 ImageCollection and filter by date & ROI
var s2 = ee.ImageCollection('COPERNICUS/S2')
           .filterDate('2025-02-01', '2025-06-28')
           .filterBounds(polygon);

// Create a median composite from the collection
var composite = s2.median();

// Print band names and image property keys to the Console
print('Band names:', composite.bandNames());
print('Image property names:', composite.propertyNames());

// Define visualization parameters
//    True Color: Red = B4, Green = B3, Blue = B2
var trueColorVis = {
  bands: ['B4', 'B3', 'B2'],
  min:   0,
  max:   3000,
  gamma: 0.5
};

// False Color (NIR + Red + Green): NIR = B8, Red = B4, Green = B3
var falseColorVis = {
  bands: ['B8', 'B4', 'B3'],
  min:   0,
  max:   3000,
  gamma: 0.5
};

// Center the Map on the composite and add the layers
Map.centerObject(polygon);  
Map.addLayer(composite, trueColorVis,  'True Color Composite');
Map.addLayer(composite, falseColorVis, 'False Color Composite', false, 0.8);


// band selection and add to new object
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);

// Load the Sentinel-2 ImageCollection and filter by date & ROI
var s2 = ee.ImageCollection('COPERNICUS/S2')
           .filterDate('2025-02-01', '2025-06-28')
           .filterBounds(polygon);

// Create a median composite from the collection
var composite = s2.median();

// Select single bands
var band4 = composite.select('B4');
var band3 = composite.select('B3');
var band2 = composite.select('B2');

// rename bands
band4 = band4.rename('Red');
band3 = band3.rename('Green');
band2 = band2.rename('Blue');
var rgbSingleBand = band4.addBands(band3).addBands(band2);

// Select multiple bands name
var rgbMultiBand = composite.select(['B4', 'B3', 'B2']);

Map.centerObject(polygon, 10);
Map.addLayer(rgbSingleBand, {min: 0, max: 3000}, 'RGB select from single band');
Map.addLayer(rgbMultiBand, {min: 0, max: 3000}, 'RGB select from multiple band');
```

### 21. Band math

#### Calculate NDVI using band math
```javascript
// Calculate NDVI using band math
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]); 

var s2 = ee.ImageCollection('COPERNICUS/S2')
           .filterDate('2025-02-01', '2025-06-28')
           .filterBounds(polygon);

// Create a median composite from the collection
var composite = s2.median();
// Select bands for NDVI calculation
var nirBand = composite.select('B8');  // NIR band
var redBand = composite.select('B4');  // Red band

Map.centerObject(polygon, 10);
Map.addLayer(composite, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'RGB Composite');

// Calculate NDVI
var ndvi = nirBand.subtract(redBand).divide(nirBand.add(redBand)).rename('NDVI');

// Add NDVI to the composite
var compositeWithNDVI = composite.addBands(ndvi);

// Print NDVI image
print('NDVI Image:', compositeWithNDVI);

// Define visualization parameters for NDVI
var ndviVis = {
  min: -1,
  max: 1,
  palette: ['blue', 'white', 'green']
};

// Add NDVI layer to the map
Map.addLayer(compositeWithNDVI.select('NDVI'), ndviVis, 'NDVI');
```
#### Calculate NDVI using normalizedDifference() method
```javascript
// Calculate NDVI using normalizedDifference() method
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);
var s2 = ee.ImageCollection('COPERNICUS/S2')
           .filterDate('2025-02-01', '2025-06-28')
           .filterBounds(polygon);
// Create a median composite from the collection
var composite = s2.median();
// Select bands for NDVI calculation
var nirBand = composite.select('B8');  // NIR band
var redBand = composite.select('B4');  // Red band
// normalizedDifference() method
var ndvi = composite.normalizedDifference(['B8', 'B4']).rename('NDVI');
// Add NDVI to the composite
var compositeWithNDVI = composite.addBands(ndvi);
// Print NDVI image
print('NDVI Image:', compositeWithNDVI);
// Define visualization parameters for NDVI
var ndviVis = {
  min: -1,
  max: 1,
  palette: ['blue', 'white', 'green']
};
// Add NDVI layer to the map
Map.addLayer(compositeWithNDVI.select('NDVI'), ndviVis, 'NDVI');    
```
#### Calculate EVI using image.expression() and band math
```javascript
// EVI calculation using image.expression() and band math
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);
var s2 = ee.ImageCollection('COPERNICUS/S2')
           .filterDate('2025-02-01', '2025-06-28')
           .filterBounds(polygon);
// Create a median composite from the collection
var composite = s2.median();

// Select bands for EVI calculation
var nirBand = composite.select('B8');  // NIR band
var redBand = composite.select('B4');  // Red band
var blueBand = composite.select('B2');  // Blue band

// Calculate EVI with image.expression
var evi_exp = composite.expression(
  '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
    'NIR': nirBand,
    'RED': redBand,
    'BLUE': blueBand
}).rename('EVIexp');

// Calculate EVI with band math
var evi_funct = nirBand.subtract(redBand).divide(nirBand.add(redBand.multiply(6)).subtract(blueBand.multiply(7.5)).add(1)).multiply(2.5).rename('EVIfunct');

// Add EVI to the composite
var compositeWithEVIexp = composite.addBands(evi_exp);
var compositeWithEVIfunct = composite.addBands(evi_funct);

// Print EVI image
print('EVI Image:', compositeWithEVIexp);
print('EVI Image:', compositeWithEVIfunct);
// Define visualization parameters for EVI
var eviVis = {
  min: -1,
  max: 1,
  palette: ['blue', 'white', 'green']
};
// Add EVI layer to the map 
Map.addLayer(compositeWithEVIexp.select('EVIexp'), eviVis, 'EVI');
Map.addLayer(compositeWithEVIfunct.select('EVIfunct'), eviVis, 'EVI');
```

### 22. Clipping
#### Clipping an image with a polygon
```javascript
// Clipping an image with a polygon
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);

var dem = ee.Image('USGS/SRTMGL1_003');

// Clip the DEM with polygon
var clippedDem = dem.clip(polygon);
Map.centerObject(polygon, 10);
Map.addLayer(clippedDem, {palette: ['#a6611a','#dfc27d','#f5f5f5','#80cdc1','#018571'], min: 250, max: 1000}, 'Clipped DEM');
```
#### Clipping an image collection with a polygon
```javascript 
// Clipping an image collection with a polygon
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);

function clipImage(image) {
  return image.clip(polygon);
}
var clippedComposite = ee.ImageCollection('COPERNICUS/S2')
           .filterDate('2025-02-01', '2025-06-28')
           .filterBounds(polygon)
           .map(clipImage)
           .median()
           .clip(polygon);
Map.centerObject(polygon, 10);
Map.addLayer(clippedComposite, {bands: ['B4', 'B3', 'B2'], min: 500, max: 3000}, 'Clipped Composite');

```

### 23. Import data from assets
```javascript
var cm_province = ee.FeatureCollection("projects/ee-sakda-451407/assets/cm_province_4326");

// define visualization parameters
var visParams = {
  color: 'red',
  width: 1
};

Map.centerObject(cm_province);
Map.addLayer(cm_province, visParams, 'Chiang Mai Province');
```

### 24. Export data
#### 24.1 Export an image to Google Drive
```javascript
// Export an image to Google Drive
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);
var s2 = ee.ImageCollection('COPERNICUS/S2')
           .filterDate('2025-02-01', '2025-06-28')
           .filterBounds(polygon);
var composite = s2.median();
// Select bands for NDVI calculation
var nirBand = composite.select('B8');  // NIR band
var redBand = composite.select('B4');  // Red band
// Calculate NDVI 
var ndvi = composite.normalizedDifference(['B8', 'B4']).rename('NDVI');
// Add NDVI to the composite
var compositeWithNDVI = composite.addBands(ndvi);
// Export the NDVI image to Google Drive
Export.image.toDrive({
  image: compositeWithNDVI.select('NDVI'),
  description: 'NDVI_Export',
  scale: 30,
  region: polygon,
  maxPixels: 1e13
});
```
#### 24.2 Export a feature collection to Google Drive
```javascript
// Get the border of Thailand
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
var thailandBorder = countries.filter(ee.Filter.eq('country_na', 'Thailand'));
// Export the feature collection to Google Drive
Export.table.toDrive({
  collection: thailandBorder,
  description: 'CM_Province_Export',
  fileFormat: 'SHP'
});
```

#### 24.3 Export an image to Google Earth Engine assets
```javascript
// Export an image to Google Earth Engine assets
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);
var s2 = ee.ImageCollection('COPERNICUS/S2')
           .filterDate('2025-02-01', '2025-06-28')
           .filterBounds(polygon);
var composite = s2.median();
// Select bands for NDVI calculation
var nirBand = composite.select('B8');  // NIR band
var redBand = composite.select('B4');  // Red band
// Calculate NDVI
var ndvi = composite.normalizedDifference(['B8', 'B4']).rename('NDVI');
// Add NDVI to the composite
var compositeWithNDVI = composite.addBands(ndvi);
// Export the NDVI image to Google Earth Engine assets
Export.image.toAsset({
  image: compositeWithNDVI.select('NDVI'),
  description: 'NDVI_Export_Asset',
  assetId: 'projects/your_project/assets/NDVI_Export_Asset', // Change 'your_project' to your project ID
  scale: 30,
  region: polygon,
  maxPixels: 1e13
});
```

### 25. UI Elements
#### 25.1 Create UI Panel
```javascript
// Create the left “layer” panel
var layerPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    width: '300px',
    backgroundColor: '#fff',
    padding: '8px'
  }
});
layerPanel.add(ui.Label('Layers', {fontWeight: 'bold'}));

// Create the centre map panel
var mapPanel = ui.Map();
mapPanel.setControlVisibility({all: true, zoomControl: true});
mapPanel.style().set({stretch: 'both'});  // fill available space
mapPanel.setCenter(100.5, 13.7, 8);

// Create the right “chart” panel
var chartPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    width: '300px',
    backgroundColor: '#fff',
    padding: '8px'
  }
});
chartPanel.add(ui.Label('Chart', {fontWeight: 'bold'}));

// Combine all three in a horizontal root panel
var root = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'both'}
});
root.add(layerPanel);
root.add(mapPanel);
root.add(chartPanel);

// Render
ui.root.clear();
ui.root.add(root);
```
#### 25.2 Add layers
```javascript
// Add layers
var polygon = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);
// convert polygon to polyline
var polyline = polygon.bounds().coordinates().get(0);

// Clip function
function clipImage(image) {
  return image.clip(polygon);
}

// Calculate NDVI function
function calculateNDVI(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
}

// Create a polyline feature
var polylineFeature = ee.Feature(ee.Geometry.LineString(polyline), {name: 'Polygon Boundary'});
var s2 = ee.ImageCollection('COPERNICUS/S2')
           .filterDate('2025-02-01', '2025-06-28')
           .filterBounds(polygon)
           .map(clipImage)
           .map(calculateNDVI);
           
var composite = s2.median();

// Select bands for NDVI calculation
var nirBand = composite.select('B8');  // NIR band
var redBand = composite.select('B4');  // Red band

// Calculate NDVI
var ndvi = composite.normalizedDifference(['B8', 'B4']).rename('NDVI');

// Add NDVI to the composite
var compositeWithNDVI = composite.addBands(ndvi);

// Define visualization parameters for NDVI
var ndviVis = {
  min: -1,
  max: 1,
  palette: ['blue', 'white', 'green']
};

// Define visualization parameters for the composite
var compositeVis = {
  bands: ['B4', 'B3', 'B2'],
  min: 1000,
  max: 2700,
  gamma: 0.5
};

// Create an NDVI layer
var ndviLayer = ui.Map.Layer(
  compositeWithNDVI.select('NDVI'), 
  ndviVis, 
  'NDVI',
  true, 
  0.9
);

// Add the NDVI layer to the map
mapPanel.add(ndviLayer);

// Add the polyline feature to the map
var polylineLayer = ui.Map.Layer(
  polylineFeature.geometry(), 
  {color: 'red', width: 2}, 
  'Polygon Boundary'
);

// Add the polyline layer to the map
mapPanel.add(polylineLayer);

// Create a true color layer
var trueColorLayer = ui.Map.Layer(
  composite, compositeVis, 
  'True Color Composite', 
  true, 
  0.9
);

// Add the true color layer to the map
mapPanel.add(trueColorLayer);

// Set center the map on the polygon
mapPanel.centerObject(polygon); 
```
#### 25.3 Add checkboxes
```javascript
// Add checkboxes to the layer panel
// Checkbox for NDVI
var ndviCheckbox = ui.Checkbox({
  label: 'NDVI',
  value: true,
  onChange: function(checked) {
    if (checked) {
      mapPanel.layers().add(ndviLayer);
    } else {
      mapPanel.layers().remove(ndviLayer);
    }
  }
});

// Add the checkbox to the layer panel
layerPanel.add(ndviCheckbox);

// Checkbox for True Color
var trueColorCheckbox = ui.Checkbox({
  label: 'True Color',
  value: true,
  onChange: function(checked) {
    if (checked) {
      mapPanel.layers().add(trueColorLayer);
    } else {
      mapPanel.layers().remove(trueColorLayer);
    }
  }
});

// Add the checkbox to the layer panel
layerPanel.add(trueColorCheckbox);

// Checkbox for Polygon Boundary
var polylineCheckbox = ui.Checkbox({
  label: 'Polygon Boundary',
  value: true,
  onChange: function(checked) {
    if (checked) {
      mapPanel.layers().add(polylineLayer);
    } else {
      mapPanel.layers().remove(polylineLayer);
    }
  }
});

// Add the checkbox to the layer panel
layerPanel.add(polylineCheckbox);
```
#### 25.4 Add chart buttons
```javascript
// Add a button to the chart panel
var chartButton = ui.Button({
  label: 'Show NDVI Chart',
  onClick: function() {
    // Create a chart for NDVI
    var chart = ui.Chart.image.histogram({
      image: compositeWithNDVI.select('NDVI'),
      region: polygon,
      scale: 30,
      minBucketWidth: 0.01
    }).setOptions({
      title: 'NDVI Histogram',
      hAxis: {title: 'NDVI'},
      vAxis: {title: 'Frequency'},
      lineWidth: 1,
      pointSize: 0
    });
    // Add the chart to the chart panel
    chartPanel.add(chart);
  }
});

// Add the button to the chart panel
chartPanel.add(chartButton);

var timeSeriesButton = ui.Button({
  label: 'Show NDVI Time Series',
  onClick: function() {
    // Create a time series chart for NDVI
    var timeSeriesChart = ui.Chart.image.series({
      imageCollection: s2.select('NDVI'),
      region: polygon,
      scale: 30,
      xProperty: 'system:time_start'
    }).setOptions({
      title: 'NDVI Time Series',
      vAxis: {title: 'NDVI'},
      lineWidth: 1,
      pointSize: 0
    });
    // Add the chart to the chart panel
    chartPanel.add(timeSeriesChart);
  }
});

// Add the time series button to the chart panel
chartPanel.add(timeSeriesButton);

```





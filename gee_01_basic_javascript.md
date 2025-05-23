Here's a basic JavaScript guide tailored for Google Earth Engine (GEE) development:

### 1. Variables and Data Types
```javascript
// Variable declaration
var number = 42;                  // Number
var text = "Hello, Earth!";       // String
var boolean = true;               // Boolean
var list = [1, 2, 3, 4];          // Array
var object = {key: "value"};      // Object

// Earth Engine objects
var image = ee.Image("LANDSAT/LC08/C01/T1/LC08_044034_20140318");
var geometry = ee.Geometry.Point([-122.082, 37.42]);
```

### 2. Functions
```javascript
// Regular function
function addNumbers(a, b) {
    return a + b;
}

// Arrow function (ES6)
const multiplyNumbers = (a, b) => a * b;

// Earth Engine function
var calculateNDVI = function(image) {
    var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
    return ndvi;
};
```

### 3. Control Structures
```javascript
// If-else statement
if (number > 10) {
    print('Number is greater than 10');
} else {
    print('Number is 10 or less');
}

// For loop (client-side)
for (var i = 0; i < 5; i++) {
    print(i);
}

// While loop (client-side)
var count = 0;
while (count < 3) {
    print(count);
    count++;
}
```

### 4. Working with Arrays and Objects
```javascript
// Array operations
var numbers = [1, 2, 3];
numbers.push(4);                  // [1, 2, 3, 4]
var first = numbers[0];           // 1

// Object operations
var point = {lat: 37.42, lon: -122.08};
print(point.lat);                 // 37.42

// Earth Engine List
var eeList = ee.List([1, 2, 3, 4]);
```

### 5. Earth Engine Operations
```javascript
// Image operations
var ndvi = image.normalizedDifference(['B5', 'B4']);
var clipped = image.clip(geometry);

// Feature Collection operations
var collection = ee.ImageCollection("LANDSAT/LC08/C01/T1");
var filtered = collection.filterBounds(geometry)
                         .filterDate('2015-01-01', '2015-12-31');
```

### 6. Mapping over Collections
```javascript
// Map a function over an ImageCollection
var ndviCollection = filtered.map(function(image) {
    return image.normalizedDifference(['B5', 'B4']);
});

// Client-side mapping
var squaredNumbers = numbers.map(function(num) {
    return num * num;
});
```

### 7. Error Handling
```javascript
try {
    // Code that might throw an error
    var result = ee.Number(10).divide(0);
    print(result);
} catch (error) {
    print('Error:', error.message);
}
```

### 8. Visualization and Output
```javascript
// Displaying results
Map.centerObject(geometry, 10);
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Landsat');

// Printing outputs
print('Filtered collection:', filtered);
print('Statistics:', image.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: geometry,
    scale: 30
}));
```

### 9. Complete Example
```javascript
// Load and display a satellite image
var image = ee.Image('COPERNICUS/S2/20150821T101605_20150821T102522_T32TQM');
var geometry = ee.Geometry.Point([12.4923, 41.8902]);  // Rome, Italy

// Calculate NDVI
var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');

// Visualization parameters
var visParams = {
    min: -0.2,
    max: 0.8,
    palette: ['blue', 'white', 'darkgreen']
};

// Add to map
Map.centerObject(geometry, 12);
Map.addLayer(ndvi, visParams, 'NDVI');
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'RGB');
```

### Key Concepts for GEE:
1. **Client vs. Server**: 
   - Client-side: Regular JavaScript variables
   - Server-side: `ee.` objects (computed on Google's servers)

2. **Asynchronous Operations**:
   - Use `.evaluate()` or `.getInfo()` to transfer server-side data to client

3. **Best Practices**:
   - Avoid `getInfo()` in production code
   - Use Earth Engine's built-in functions instead of loops
   - Leverage batch processing with `Export` functions

4. **Debugging**:
   - Use `print()` extensively
   - Check the console for errors
   - Use `geometry` parameters to limit computation areas


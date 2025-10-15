# Google Earth Engine (GEE)




Session 1: แนะนำระบบ GEE
Session 2: เริ่มต้นเขียนสคริปต์
Session 3: เรียกใช้งานข้อมูลภาพถ่ายดาวเทียม
Session 4: การประมวลผลเชิงพื้นที่
Session 5: การประมวลผล DEM และสร้างเส้น Contour
Session 6: การวิเคราะห์เชิงพื้นที่และสถิติ
Session 7: การส่งออกข้อมูลและสรุป

---

## Session 1: แนะนำ GEE 

### อธิบาย
พื้นฐานเกี่ยวกับ Google Earth Engine (GEE) เช่น โครงสร้างระบบ, ความแตกต่างจาก GIS แบบดั้งเดิม, ประเภทของข้อมูล และการทำงานแบบคลาวด์

- GEE คือระบบคลาวด์สำหรับประมวลผลข้อมูลภูมิสารสนเทศ
- ข้อมูลสำคัญ: Image, ImageCollection, Feature, FeatureCollection
- ใช้ JavaScript/ Python ในการเขียนโค้ด
- Code Editor มีส่วนประกอบหลัก: Map, Console, Inspector, Docs

### การเขียน JavaScript เบื้องต้น สำหรับ GEE
การประกาศตัวแปร
```javascript
// ประกาศตัวแปรและกำหนดค่าให้กับข้อมูลประเภทต่างๆ
var num = 10; // ตัวเลข
var str = 'Hello GEE'; // ข้อความ
var bool = true; // ค่าบูลีน (true/false)
var list = [1, 2, 3, 4, 5]; // อาเรย์
var dict = {name: 'GEE', version: 1.0}; // อ็อบเจ็กต์

print('Number:', num);
print('String:', str);
print('Boolean:', bool);
print('List:', list);
print('Dictionary:', dict);
print('Point:', point);
print('Polygon:', poly);
print('Image:', img); 
print('Image Collection:', imgCol);
print('Feature:', feature);
print('Feature Collection:', featurecol);
```

การเขียนฟังก์ชัน
```javascript
// ฟังก์ชันสำหรับคำนวณพื้นที่รูปสี่เหลี่ยมผืนผ้า
function calculateArea(length, width) {
  return length * width;
} 
var area = calculateArea(5, 10);
print('Area of rectangle:', area);
```

การใช้คำสั่งควบคุมการทำงาน
```javascript
// ตัวอย่างการใช้คำสั่ง if-else
var threshold = 5;
if (num > threshold) {
  print(num + ' is greater than ' + threshold);
} else {
  print(num + ' is less than or equal to ' + threshold);
}
```

การวนลูป
```javascript
// ตัวอย่างการใช้ for loop
for (var i = 0; i < list.length; i++) {
  print('List item ' + i + ': ' + list[i]);
}
```

การใช้ Console
```javascript
// แสดงข้อความใน Console
print('This is a message in the Console');
```

---

## Session 2: เริ่มต้นเขียนสคริปต์ GEE

พื้นฐานการเขียนสคริปต์ใน GEE ด้วย JavaScript เช่น
- การแสดงข้อมูลบนแผนที่
- การใช้ Inspector เพื่อดูผลลัพธ์


การใช้งาน Map
```javascript
var point = ee.Geometry.Point([100.5, 13.7]);
// ตั้งค่ากลางแผนที่
Map.setCenter(100.5, 13.7, 10);
// หรืิอ
Map.centerObject(point, 10);
// เพิ่มเลเยอร์จุดลงบนแผนที่
Map.addLayer(point, {color: 'red'}, 'Point');
```

## Session 3: การใช้งาน Geometry และ Feature
การสร้างตัวแปร ee.Geometry, ee.Feature, ee.FeatureCollection

```javascript
// สร้าง Point Geometry
var point = ee.Geometry.Point([98.98, 18.79]);

// สร้าง LineString Geometry
var line = ee.Geometry.LineString([
  [98.97, 18.78],
  [98.99, 18.80]
]);

// สร้าง Polygon Geometry
var poly = ee.Geometry.Polygon([
  [[98.97, 18.78],
   [98.99, 18.78],
   [98.99, 18.80],
   [98.97, 18.80],
   [98.97, 18.78]]
]);

// แสดงค่า Geometry ใน Console
print('Point:', point);
print('LineString:', line);
print('Polygon:', poly);

// สร้าง Feature จาก Geometry
var feature = ee.Feature(point, {name: 'My Point'});

// สร้าง FeatureCollection จากหลายๆ Feature
var featurecol = ee.FeatureCollection([
  feature,
  ee.Feature(line, {name: 'My Line'}),
  ee.Feature(poly, {name: 'My Polygon'})
]);

// แสดง Geometry บนแผนที่
Map.addLayer(point, {color: 'red'}, 'Point');
Map.addLayer(line, {color: 'green'}, 'LineString');
Map.addLayer(poly, {color: 'blue'}, 'Polygon');
Map.addLayer(feature, {}, 'Feature');
Map.addLayer(featurecol, {}, 'FeatureCollection');

// ปรับตำแหน่งแผนที่ให้ซูมไปยัง Polygon
Map.centerObject(poly, 13);
```

การทำงานกับ Geometry
```javascript
// ฟังก์ชันคำนวณพื้นที่เป็น km² (1 ตารางกิโลเมตร = 1,000,000 ตารางเมตร)
function calculateArea(geometry) {
  // คำนวณพื้นที่เป็นตารางเมตร แล้วหารด้วย 1e6
  var area = geometry.area().divide(1e6); 
  return area;
}

// เรียกใช้ฟังก์ชันกับ polygon
var area = calculateArea(poly);
print('Area (km²):', area);
```

---

## Session 4: เรียกใช้งานข้อมูลภาพจากดาวเทียม 

ความรู้เบื้องต้นเกี่ยวกับ Image, ImageCollection
- Image = ข้อมูล 1 scene
- ImageCollection = ข้อมูลหลาย scene ที่สามารถกรองและประมวลผลได้ในเชิงเวลาและพื้นที่

Image ใน Google Earth Engine หมายถึง ข้อมูลภาพจากดาวเทียมเพียงภาพเดียว (Single raster layer หรือ scene) ซึ่งอาจมีหลายแบนด์ เช่น ภาพจาก Landsat 8 1 scene ประกอบด้วยหลาย band (เช่น B2, B3, B4, B5 ฯลฯ)

```javascript
// ตัวอย่างการเรียกใช้งาน Image
var image = ee.Image('LANDSAT/LC09/C02/T1_L2/LC09_129050_20231220')
              .multiply(0.0000275);
var visParams = {bands: ['SR_B4', 'SR_B3', 'SR_B2'], min: 0.2, max: 0.6, gamma: 1.5};
Map.addLayer(image, visParams, 'RGB');
Map.centerObject(image, 10);
```

ข้อมูล DEM (Digital Elevation Model) เช่น SRTM, ALOS, ASTER ก็ถือเป็น Image หนึ่งภาพเช่นกัน

> **หมายเหตุ:** SRTM DEM (`USGS/SRTMGL1_003`) มีความละเอียดเชิงพื้นที่ประมาณ 30 เมตร และครอบคลุมพื้นที่ส่วนใหญ่ของโลกระหว่างละติจูด 60°N ถึง 56°S

```javascript
// ตัวอย่างการเรียกใช้งาน DEM
var dem = ee.Image('USGS/SRTMGL1_003');
var demVis = {min: 0, max: 3000, palette: ['blue', 'green', 'brown', 'white']};

Map.addLayer(dem, demVis, 'DEM');
```

ImageCollection หมายถึง ชุดของภาพจากดาวเทียมหลายภาพ (Multiple images) ที่มักใช้เมื่อเราต้องการวิเคราะห์ช่วงเวลา (time series) หรือทำ composite เช่น การรวมภาพในช่วงฤดูกาลหรือปี

```javascript
// ตัวอย่างการเรียกใช้งาน ImageCollection
var roi = ee.Geometry.Polygon(
    [[[98.9171009716561, 18.815619476862654],
      [98.9171009716561, 18.68557890893041],
      [99.0873890575936, 18.68557890893041],
      [99.0873890575936, 18.815619476862654]]]);

var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterDate('2021-01-01', '2021-01-31')
    .filterBounds(roi)
    .median()
    .multiply(0.0001);


var visParams = {bands: ['B4', 'B3', 'B2'], min: 0.0, max: 0.3, gamma: 1.5};
Map.addLayer(s2, visParams, 'Median Image');
Map.centerObject(roi, 10);
```

การเรียก ImageCollection ของ Sentinel-2 หรือ Landsat เพื่อนำมาประมวลผล มีเมธอดที่ใช้บ่อย ดังนี้:
- filterDate()
- filterBounds()
- filter ด้วย CLOUD_PERCENTAGE
- composite แบบ median

---

## Session 5: การประมวลผลภาพถ่ายดาวเทียม

การประมวลผลภาพจากดาวเทียมหมายถึง กระบวนการจัดการ ปรับปรุง วิเคราะห์ และแปลความหมายข้อมูลภาพจากดาวเทียม เพื่อนำมาใช้ประโยชน์ในการวางแผนและตัดสินใจทางภูมิสารสนเทศ  เช่น NDVI และ MNDWI 

ตัวอย่างการวิเคราะห์ ดัชนีความแตกต่างพืชพรรณ (Normalized Difference Vegetation Index: NDVI) 
```javascript
var ndvi = s2.normalizedDifference(['B8', 'B4']).rename('NDVI');
var ndviVis = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
Map.addLayer(ndvi, ndviVis, 'NDVI');
```

การวิเคราะห์พื้นที่สีเขียวในเมือง (Urban Green Space - UGS) ด้วย NDVI
```javascript
var ndviThreshold = 0.3; // กำหนดค่าเกณฑ์ NDVI
var ugs = ndvi.gte(ndviThreshold).rename('UGS');
var ugsVis = {min: 0, max: 1, palette: ['lightgrey', 'green']};
Map.addLayer(ugs, ugsVis, 'Urban Green Space (UGS)');

```

การคำนวณสัดส่วนพื้นที่สีเขียวในเมือง
```javascript
var ugsArea = ugs.multiply(ee.Image.pixelArea()).divide(1e6); // แปลงเป็นตารางกิโลเมตร
var totalUgsArea = ugsArea.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: roi,
  scale: 10,
  maxPixels: 1e13
});
print('Total Urban Green Space Area (km²):', totalUgsArea);
```

และดัชนีความแตกต่างน้ำ (Modified Normalized Difference Water Index: MNDWI)
```javascript
var mndwi = s2.normalizedDifference(['B3', 'B11']).rename('MNDWI');
var mndwiVis = {min: -1, max: 1, palette: ['brown', 'white', 'blue']};
Map.addLayer(mndwi, mndwiVis, 'MNDWI');
```

การวิเคราะห์พื้นที่น้ำในเมืองด้วย MNDWI
```javascript
var mndwiThreshold = 0.3; // กำหนดค่าเกณฑ์ MNDWI
var water = mndwi.gte(mndwiThreshold).rename('Water');
var waterVis = {min: 0, max: 1, palette: ['lightgrey', 'blue']};
Map.addLayer(water, waterVis, 'Urban Water Bodies');
```

การคำนวณสัดส่วนพื้นที่น้ำในเมือง
```javascript
var waterArea = water.multiply(ee.Image.pixelArea()).divide(1e6); // แปลงเป็นตารางกิโลเมตร
var totalWaterArea = waterArea.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: roi,
  scale: 10,
  maxPixels: 1e13
});
print('Total Urban Water Bodies Area (km²):', totalWaterArea);
```

ดัชนีพื้นที่สิ่งปลูกสร้าง (Normalized Difference Built-up Index: NDBI)
```javascript
var ndbi = s2.normalizedDifference(['B11', 'B8']).rename('NDBI');
var ndbiVis = {min: -1, max: 1, palette: ['green', 'white', 'grey']};
Map.addLayer(ndbi, ndbiVis, 'NDBI');
```

การวิเคราะห์พื้นที่สิ่งปลูกสร้างในเมืองด้วย NDBI
```javascript
var ndbiThreshold = 0.2; // กำหนดค่าเกณฑ์ NDBI
var builtUp = ndbi.gte(ndbiThreshold).rename('BuiltUp');
var builtUpVis = {min: 0, max: 1, palette: ['lightgrey', 'grey']};
Map.addLayer(builtUp, builtUpVis, 'Urban Built-up Areas');
```

การคำนวณสัดส่วนพื้นที่สิ่งปลูกสร้างในเมือง
```javascript
var builtUpArea = builtUp.multiply(ee.Image.pixelArea()).divide(1e6); // แปลงเป็นตารางกิโลเมตร
var totalBuiltUpArea = builtUpArea.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: roi,
  scale: 10,
  maxPixels: 1e13
});
print('Total Urban Built-up Area (km²):', totalBuiltUpArea);
```

สัดส่วนพื้นที่สีเขียว, น้ำ และสิ่งปลูกสร้างในเมือง
```javascript
// สัดส่วนพื้นที่สีเขียวต่อต้านพื้นที่สิ่งปลูกสร้าง
var greenToBuiltUpRatio = ee.Number(totalUgsArea.get('UGS')).divide(ee.Number(totalBuiltUpArea.get('BuiltUp')));
print("greenToBuiltUpRatio", greenToBuiltUpRatio);
```

---

## Session 6: การส่งออกข้อมูล

### อธิบาย
วิธี Export ข้อมูลทั้งแบบ Raster (GeoTIFF) และ Vector (SHP) ไปยัง Google Drive 

ตัวอย่างการส่งออกภาพแบบหลาย bands (Export Image)
```javascript
Export.image.toDrive({
  image: s2, // ภาพที่ต้องการส่งออก
  description: 'Sentinel2_Median_Jan2021', // ชื่อไฟล์ใน Google Drive
  folder: 'GEE_Exports', // ชื่อโฟลเดอร์ใน Google Drive
  fileNamePrefix: 'S2_Median_Jan2021', // ชื่อไฟล์นำหน้า
  region: roi, // พื้นที่ที่ต้องการส่งออก
  scale: 10, // ความละเอียดเชิงพื้นที่ (เมตร)
  crs: 'EPSG:4326', // ระบบพิกัด
  maxPixels: 1e13 // จำนวนพิกเซลสูงสุดที่อนุญาตให้ส่งออก
});
```

## 📚 แหล่งเรียนรู้เพิ่มเติม
- [https://developers.google.com/earth-engine](https://developers.google.com/earth-engine)
- [https://gee-community-catalog.org](https://gee-community-catalog.org)
- [https://developers.google.com/earth-engine/tutorials](https://developers.google.com/earth-engine/tutorials)
- ชุมชน GEE ใน GitHub และ YouTube

# Google Earth Engine (GEE)


| เนื้อหา | รูปแบบ |
|---------|---------|
 Session 1: แนะนำระบบ GEE | บรรยาย |
| Session 2: เริ่มต้นเขียนสคริปต์ | ปฏิบัติ |
| Session 3: เรียกใช้งานข้อมูลภาพถ่ายดาวเทียม | ปฏิบัติ |
| Session 4: การประมวลผลเชิงพื้นที่ | ปฏิบัติ |
| Session 5: การประมวลผล DEM และสร้างเส้น Contour | ปฏิบัติ |
| Session 6: การวิเคราะห์เชิงพื้นที่และสถิติ | ปฏิบัติ |
| Session 7: การส่งออกข้อมูลและสรุป | ปฏิบัติ + ถามตอบ |

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
var point = ee.Geometry.Point([100.5, 13.7]); // จุดเชิงพื้นที่
var poly = ee.Geometry.Polygon([
  [[100.4, 13.6],[100.6, 13.6],[100.6, 13.8],[100.4, 13.8],[100.4, 13.6]]
]); // พื้นที่เชิงพื้นที่
var img = ee.Image('COPERNICUS/S2_SR/20240101T083601_20240101T083601_T48PUN'); // ภาพถ่ายดาวเทียม
var imgCol = ee.ImageCollection('COPERNICUS/S2_SR'); // คอลเล็กชันภาพถ่ายดาวเทียม
var feature = ee.Feature(point, {name: 'My Point'}); // ฟีเจอร์เชิงพื้นที่
var featurecol = ee.FeatureCollection([feature]); // คอลเล็กชันฟีเจอร์
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
// ฟังก์ชันสำหรับคำนวณพื้นที่ของ Polygon
function calculateArea(geometry) {
  var area = geometry.area().divide(10000); // แปลงเป็นเฮกตาร์
  return area;
} 
var area = calculateArea(poly);
print('Area (ha):', area);
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

การใช้งาน Map
```javascript
// ตั้งค่ากลางแผนที่
Map.setCenter(100.5, 13.7, 8);
// เพิ่มเลเยอร์จุดลงบนแผนที่
Map.addLayer(point, {color: 'red'}, 'Point');
```

การใช้ Console
```javascript
// แสดงข้อความใน Console
print('This is a message in the Console');
```

---

## Session 2: เริ่มต้นเขียนสคริปต์ 

### อธิบาย
พื้นฐานการเขียนสคริปต์ใน GEE ด้วย JavaScript เช่น
- การสร้างตัวแปร
- การแสดงข้อมูลบนแผนที่
- การใช้ Inspector และ Console.log เพื่อดูผลลัพธ์

### ตัวอย่างโค้ด
```javascript
Map.setCenter(100.5, 13.7, 8);

// สร้าง Polygon
var poly = ee.Geometry.Polygon([
  [[100.4, 13.6],[100.6, 13.6],[100.6, 13.8],[100.4, 13.8],[100.4, 13.6]]
]);

Map.addLayer(poly, {color: 'blue'}, 'Polygon');

// แสดงค่า Geometry ใน Console
print('Polygon:', poly);
```

---

## Session 3: เรียกใช้งานข้อมูลภาพถ่ายดาวเทียม 

### อธิบาย
การเรียก ImageCollection ของ Sentinel-2 หรือ Landsat เพื่อนำมาประมวลผล โดยมีหัวข้อย่อยดังนี้:
- filterDate()
- filterBounds()
- filter ด้วย CLOUD_PERCENTAGE
- composite แบบ median
- Visualization parameter

### ตัวอย่างโค้ด
```javascript
var roi = ee.Geometry.Point([100.5, 13.7]).buffer(50000);

var s2 = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterBounds(roi)
  .filterDate('2024-01-01', '2024-12-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
  .median();

var vis = {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000};
Map.centerObject(roi, 10);
Map.addLayer(s2, vis, 'Sentinel-2');
```

---

## Session 4: การประมวลผลเชิงพื้นที่

### อธิบาย
การประมวลผลภาพถ่ายดาวเทียม เช่น NDVI และ MNDWI โดยใช้ band ของ Sentinel-2 ในการคำนวณ และการสร้าง time series

### ตัวอย่างโค้ด
```javascript
var ndvi = s2.normalizedDifference(['B8', 'B4']).rename('NDVI');
var ndviVis = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
Map.addLayer(ndvi, ndviVis, 'NDVI');

var mndwi = s2.normalizedDifference(['B3', 'B11']).rename('MNDWI');
var mndwiVis = {min: -1, max: 1, palette: ['brown', 'white', 'blue']};
Map.addLayer(mndwi, mndwiVis, 'MNDWI');
```

---

## Session 5: การประมวลผล DEM และสร้างเส้น Contour

### อธิบาย
การเรียกข้อมูล DEM เช่น SRTM และสร้างเส้นชั้นความสูง (Contour) เพื่อเตรียมสำหรับการ Export หรือวิเคราะห์ต่อไป

### ตัวอย่างโค้ด
```javascript
// ดึงข้อมูล SRTM DEM
var dem = ee.Image('USGS/SRTMGL1_003');
var demVis = {min: 0, max: 3000, palette: ['blue', 'green', 'brown', 'white']};
Map.addLayer(dem, demVis, 'DEM');

// กำหนด interval ของ contour
var contour = dem
  .convolve(ee.Kernel.gaussian(1))
  .reduceToVectors({
    geometry: roi,
    scale: 90,
    geometryType: 'polyline',
    eightConnected: false,
    labelProperty: 'elevation',
    reducer: ee.Reducer.mean()
  });

Map.addLayer(contour, {color: 'red'}, 'Contour');
```

---

## Session 6: การวิเคราะห์เชิงพื้นที่และสถิติ

### อธิบาย
การคำนวณค่าเฉลี่ย NDVI ตามขอบเขตพื้นที่ (FeatureCollection) และแสดงผลในรูปแบบตารางหรือกราฟ Time Series

### ตัวอย่างโค้ด
```javascript
var admin = ee.FeatureCollection('FAO/GAUL/2015/level1');
var thailand = admin.filter(ee.Filter.eq('ADM0_NAME', 'Thailand'));

var meanNDVI = ndvi.reduceRegions({
  collection: thailand,
  reducer: ee.Reducer.mean(),
  scale: 30,
});

print(meanNDVI);
```

---

## Session 7: การส่งออกข้อมูลและการใช้งานจริง

### อธิบาย
วิธี Export ข้อมูลทั้งแบบ Raster (GeoTIFF) และ Vector (SHP) ไปยัง Google Drive 

### ตัวอย่างโค้ด
```javascript
Export.image.toDrive({
  image: ndvi,
  description: 'NDVI_Export',
  scale: 30,
  region: roi,
  maxPixels: 1e13
});

Export.table.toDrive({
  collection: contour,
  description: 'Contour_Export',
  fileFormat: 'SHP'
});
```

---

## 📚 แหล่งเรียนรู้เพิ่มเติม
- [https://developers.google.com/earth-engine](https://developers.google.com/earth-engine)
- [https://gee-community-catalog.org](https://gee-community-catalog.org)
- [https://developers.google.com/earth-engine/tutorials](https://developers.google.com/earth-engine/tutorials)
- ชุมชน GEE ใน GitHub และ YouTube

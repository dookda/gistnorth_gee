### บทที่ 4 พื้นฐานภาษา JavaScript สำหรับ Google Earth Engine (GEE)

---

#### สไลด์ที่ 1: ปกบทเรียน

* หัวข้อ: บทที่ 4: พื้นฐานภาษา JavaScript สำหรับ GEE
* ผู้บรรยาย / สถาบัน / วันที่
* ภาพประกอบ: โลโก้ Google Earth Engine และ JavaScript

---

#### สไลด์ที่ 2: ทำไมต้องใช้ JavaScript กับ GEE?

* GEE Code Editor รองรับภาษา JavaScript เป็นหลัก
* ใช้เขียนสคริปต์วิเคราะห์ข้อมูลภูมิสารสนเทศผ่าน Cloud
* เขียนคำสั่งเชิงวิเคราะห์ (NDVI, การกรองภาพ, การแมสก์) ได้ง่าย
* มีฟังก์ชันเฉพาะของ Earth Engine (เช่น ee.Image, ee.Geometry)

---

#### สไลด์ที่ 3: แนวคิด Client-side vs Server-side

* **Client-side**: ทำงานในเบราว์เซอร์ เช่น print(), Map.addLayer()
* **Server-side**: ประมวลผลข้อมูลขนาดใหญ่บนเซิร์ฟเวอร์ Google
* ตัวแปรแบบ ee.Object จะทำงานฝั่ง Server-side
* ต้องเข้าใจความแตกต่างเพื่อไม่ให้เกิด error จากการจัดการข้อมูลผิดฝั่ง
* **ตัวอย่าง Server-side**:

```javascript
var image = ee.Image('COPERNICUS/S2/20240101T000000');
```

* **ตัวอย่าง Client-side**:

```javascript
Map.addLayer(image);
print(image);
```

* การใช้ `print()` กับ ee.Object จะต้องให้เซิร์ฟเวอร์ดึงค่ากลับมาที่เบราว์เซอร์
* การพยายามใช้ค่าจาก Server-side มาประมวลผลใน Client-side โดยตรงจะทำให้เกิดข้อผิดพลาด เช่น `image.getInfo()` ต้องใช้กับข้อมูลขนาดเล็กเท่านั้น
* หลักการ: ควรเขียนสคริปต์ให้ทำงานอยู่ฝั่ง Server-side ให้มากที่สุดเพื่อความรวดเร็ว

---

#### สไลด์ที่ 4: การประกาศตัวแปร

* ใช้ `var` ในการประกาศตัวแปรใน JavaScript

```javascript
var city = 'Chiang Mai';
var value = 100;
```

* ตั้งชื่อตัวแปรตามหลัก Camel Case เช่น `ndviValue`
* หลีกเลี่ยงการใช้คำสงวน (reserved words)

---

#### สไลด์ที่ 5: ประเภทข้อมูลพื้นฐาน

* Number: ตัวเลข เช่น 10, 3.14
* String: ข้อความ เช่น 'GEE', "เชียงใหม่"
* Boolean: true, false
* Array: กลุ่มข้อมูล เช่น \[1, 2, 3]
* Object: เช่น `{name: 'Thailand', area: 513000}`

```javascript
var number = 42;                  // Number
var text = "Hello, Earth!";       // String
var boolean = true;               // Boolean
var list = [1, 2, 3, 4];          // Array
var object = {key: "value"};      // Object
```

---

#### สไลด์ที่ 6: การใช้ Array และ Object

```javascript
var cities = ['Chiang Mai', 'Lamphun'];
var province = {name: 'Nan', area: 12000};
print(cities[0]);
print(province.name);
```

* Array ใช้จัดข้อมูลแบบลำดับ
* Object ใช้จัดข้อมูลเชิงโครงสร้างแบบ key-value

---

#### สไลด์ที่ 7: ฟังก์ชัน (Function)

* ฟังก์ชันคือกลุ่มคำสั่งที่นำกลับมาใช้ซ้ำได้

```javascript
function getArea(radius) {
  return 3.14 * radius * radius;
}
print(getArea(10));
```

* ใน GEE นิยมใช้ฟังก์ชันกับการ map ข้อมูล หรือคำนวณค่าต่าง ๆ

---

#### สไลด์ที่ 8: การใช้ If-Else

```javascript
var score = 85;
if (score >= 80) {
  print('A');
} else {
  print('B หรือ ต่ำกว่า');
}
```

* ใช้เพื่อควบคุมเงื่อนไขทางตรรกะ

---

#### สไลด์ที่ 9: การใช้งานกับ ee.Image

```javascript
var image = ee.Image('COPERNICUS/S2/20240101T000000');
var ndvi = image.normalizedDifference(['B8','B4']).rename('NDVI');
Map.addLayer(ndvi, {min: 0, max: 1, palette: ['red','green']}, 'NDVI');
```

* ใช้ method ของ ee.Image เช่น `normalizedDifference()`
* เหมาะสำหรับการวิเคราะห์พืชพรรณ (NDVI, NDWI)

---

#### สไลด์ที่ 10: ฟังก์ชัน Map และการประมวลผลหลายภาพ

```javascript
var collection = ee.ImageCollection('COPERNICUS/S2')
                    .filterDate('2024-01-01','2024-01-31');
var ndviCol = collection.map(function(img) {
  return img.normalizedDifference(['B8','B4']).rename('NDVI');
});
```

* `.map()` ใช้ประมวลผลซ้ำกับทุกภาพใน collection
* นิยมใช้สำหรับคำนวณค่าดัชนี เช่น NDVI, EVI

---

#### สไลด์ที่ 11: การจัดการ Geometry

```javascript
var point = ee.Geometry.Point([100.5, 18.8]);
var buffer = point.buffer(1000);
Map.addLayer(buffer);
```

* GEE มี object geometry หลายรูปแบบ: Point, Polygon, LineString
* ใช้กำหนดพื้นที่ศึกษา, วาด AOI (Area of Interest)

---

#### สไลด์ที่ 12: การจัดการ Feature และ FeatureCollection

```javascript
var feature = ee.Feature(point, {name: 'CMU'});
var fc = ee.FeatureCollection([feature]);
```

* Feature = Geometry + Properties
* FeatureCollection = กลุ่มของ Feature ที่ใช้งานร่วมกัน

---

#### สไลด์ที่ 13: การใช้ print(), Map.addLayer()

* `print()` แสดงผลลัพธ์ใน Console
* `Map.addLayer()` แสดงผลลัพธ์เชิงแผนที่
* ใช้ปรับ style การแสดงผล เช่น min, max, palette

---

#### สไลด์ที่ 14: สรุปบทเรียน

* JavaScript คือเครื่องมือสำคัญในการใช้งาน GEE
* เข้าใจ Server-side vs Client-side ช่วยลด error
* ฟังก์ชันและโครงสร้างข้อมูลใน JavaScript ช่วยให้วิเคราะห์ข้อมูลเชิงพื้นที่ได้หลากหลายและมีประสิทธิภาพ

---

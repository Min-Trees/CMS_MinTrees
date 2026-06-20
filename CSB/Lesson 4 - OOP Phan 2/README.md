# 📘 Course → CSB → Lesson 4 – Lập Trình Hướng Đối Tượng (OOP) – Phần 2

> **Khóa học:** CSB – Nền Tảng Lập Trình Python  
> **Buổi:** 4 / 14  
> **Chủ đề:** Tính Đa Hình (Polymorphism) · Tính Trừu Tượng (Abstraction)  

---

## PHẦN 1 – GIẢI THÍCH ĐƠN GIẢN

### 🎭 Tính Đa Hình (Polymorphism)

**Ẩn dụ:** Nút "Play" trên mọi thiết bị.

> Tivi, điện thoại, laptop đều có nút **Play** — nhưng:  
> - Tivi phát kênh truyền hình  
> - Điện thoại phát nhạc  
> - Laptop phát video YouTube  

**Cùng một tên phương thức, nhưng hành vi khác nhau ở từng class con.**

```python
class Hinh:
    def dien_tich(self):  # Cùng tên phương thức
        pass

class HinhTron(Hinh):
    def dien_tich(self):  # Nhưng tính khác nhau
        return 3.14 * self.ban_kinh ** 2

class HinhVuong(Hinh):
    def dien_tich(self):
        return self.canh ** 2
```

> **Ưu điểm:**  
> Code gọi `hinh.dien_tich()` mà **không cần biết** đó là hình tròn hay hình vuông!  
> → Dễ mở rộng, thêm hình mới mà không sửa code cũ.

---

### 🎭 Tính Trừu Tượng (Abstraction)

**Ẩn dụ:** Lái xe hơi — bạn không cần biết động cơ hoạt động thế nào.

> Bạn chỉ cần biết: **vô lăng, ga, phanh**.  
> Phần phức tạp bên trong (piston, trục khuỷu...) được **ẩn đi**.

Trong Python, dùng module `abc` để tạo **Abstract Class**:
- Abstract class **không thể** tạo object trực tiếp  
- Buộc class con **phải triển khai** các phương thức được đánh dấu `@abstractmethod`  
- Đảm bảo **tất cả class con đều có cùng "giao diện"**

```python
from abc import ABC, abstractmethod

class HinhHoc(ABC):         # Abstract class – "bản hợp đồng"
    @abstractmethod
    def dien_tich(self):    # Phương thức bắt buộc – class con phải viết
        pass

    @abstractmethod
    def chu_vi(self):
        pass
```

> Nếu class con không cài đặt `dien_tich()` → Python báo lỗi ngay khi tạo object.  
> → Tránh "quên" triển khai tính năng quan trọng.

---

## PHẦN 2 – VÍ DỤ MINH HỌA (LOGIC)

### 📝 Bài toán: Hệ thống tính diện tích đa hình

**Mô tả:**  
Xây dựng abstract class `HinhHoc`, rồi tạo 3 class con: `HinhTron`, `HinhChuNhat`, `HinhTamGiac`. Dùng polymorphism để in thông tin tất cả hình mà không cần `if-else`.

**Input:**
```
Hình tròn     : bán kính = 5
Hình chữ nhật : dài = 8, rộng = 4
Hình tam giác : đáy = 6, chiều cao = 3
```

**Output:**
```
=== DANH SÁCH CÁC HÌNH ===
HinhTron     | Diện tích:  78.54 | Chu vi:  31.42
HinhChuNhat  | Diện tích:  32.00 | Chu vi:  24.00
HinhTamGiac  | Diện tích:   9.00 | Chu vi: N/A
```

**🔍 Dry Run:**
```
Bước 1 – Tạo danh sách [HinhTron(5), HinhChuNhat(8,4), HinhTamGiac(6,3)]

Bước 2 – Vòng for duyệt qua danh sách:
  Phần tử 1: HinhTron → gọi .dien_tich() → 3.14159 × 5² = 78.54
             → gọi .chu_vi() → 2 × 3.14159 × 5 = 31.42
  Phần tử 2: HinhChuNhat → .dien_tich() = 8×4 = 32.00
                          → .chu_vi() = 2×(8+4) = 24.00
  Phần tử 3: HinhTamGiac → .dien_tich() = (6×3)/2 = 9.00

→ Cùng lệnh gọi .dien_tich() nhưng kết quả khác nhau → ĐA HÌNH!
→ Python tự biết gọi phiên bản nào (dựa vào kiểu thực tế của object)
```

---

## PHẦN 3 – CODE DEMO

> Xem file: [`demo.py`](./demo.py)

---

## 💡 Tổng kết buổi 4 – Hoàn thiện 4 trụ cột OOP

| Tính chất | Buổi | Ý nghĩa cốt lõi |
|-----------|------|-----------------|
| **Đóng gói** | 3 | Bảo vệ dữ liệu, kiểm soát truy cập |
| **Kế thừa** | 3 | Tái dụng code, xây dựng phân cấp |
| **Đa hình** | 4 | Cùng interface – hành vi khác nhau |
| **Trừu tượng** | 4 | Ẩn chi tiết – chỉ lộ những gì cần thiết |

> 🎯 **Bài tập về nhà:** Tạo Abstract class `Phuong_Tien` với `@abstractmethod di_chuyen()` và `@abstractmethod tieu_thu_nhien_lieu()`. Cài đặt cho `XeHoi`, `XeDap`, `May_Bay`.

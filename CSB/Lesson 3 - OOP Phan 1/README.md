# 📘 Course → CSB → Lesson 3 – Lập Trình Hướng Đối Tượng (OOP) – Phần 1

> **Khóa học:** CSB – Nền Tảng Lập Trình Python  
> **Buổi:** 3 / 14  
> **Chủ đề:** Class · Object · Tính Đóng Gói · Tính Kế Thừa  

---

## PHẦN 1 – GIẢI THÍCH ĐƠN GIẢN

### 🏛️ Class và Object là gì?

**Ẩn dụ:** Khuôn bánh và những chiếc bánh.

- **Class** = Khuôn bánh → bản thiết kế, định nghĩa hình dạng, kích thước  
- **Object** = Chiếc bánh được tạo ra từ khuôn đó → thực thể cụ thể  

> Từ **một** khuôn bánh (class), bạn có thể tạo ra **vô số** chiếc bánh (objects) khác nhau — mỗi chiếc có thể có màu và nhân khác nhau, nhưng đều từ cùng một bản thiết kế.

```python
class HocSinh:           # Định nghĩa khuôn (class)
    def __init__(self, ten, diem):
        self.ten  = ten  # Thuộc tính của từng object
        self.diem = diem

hs1 = HocSinh("An", 9)  # Tạo chiếc bánh thứ nhất (object)
hs2 = HocSinh("Bình", 7) # Tạo chiếc bánh thứ hai
```

| Thuật ngữ | Python | Ẩn dụ |
|-----------|--------|-------|
| Class | `class TenClass:` | Khuôn bánh |
| Object | `obj = TenClass()` | Chiếc bánh cụ thể |
| Thuộc tính | `self.ten` | Đặc điểm của mỗi chiếc bánh |
| Phương thức | `def chao(self):` | Hành động mà chiếc bánh có thể làm |
| Constructor | `def __init__(self):` | Công thức bắt buộc khi tạo bánh |

---

### 🔒 Tính Đóng Gói (Encapsulation)

**Ẩn dụ:** Tủ hồ sơ bệnh viện có khóa.

> Hồ sơ bệnh nhân được khóa trong tủ — không phải ai cũng xem được.  
> Chỉ bác sĩ được ủy quyền mới có thể truy cập qua cửa sổ tiếp nhận (phương thức getter/setter).

- **Thuộc tính private** (`__ten_bien`): chỉ truy cập được bên trong class  
- **Getter/Setter**: phương thức công khai cho phép đọc/sửa có kiểm tra  

```python
class TaiKhoanNganHang:
    def __init__(self, so_du_ban_dau):
        self.__so_du = so_du_ban_dau  # Private: không ai ngoài class được sờ vào

    def get_so_du(self):              # Getter: chỉ cho đọc
        return self.__so_du

    def rut_tien(self, so_tien):      # Setter có kiểm tra
        if so_tien > self.__so_du:
            print("Số dư không đủ!")
        else:
            self.__so_du -= so_tien
```

---

### 🧬 Tính Kế Thừa (Inheritance)

**Ẩn dụ:** Con thừa hưởng đặc điểm từ bố mẹ.

> Con cái có tất cả đặc điểm của bố mẹ (thừa hưởng), đồng thời có thêm đặc điểm riêng của mình.

```python
class DongVat:          # Class cha (parent)
    def an(self):
        print("Đang ăn...")

class Cho(DongVat):     # Class con (child) — thừa hưởng từ DongVat
    def sua(self):      # Thêm hành động mới riêng của Chó
        print("Gâu gâu!")
```

> `super()` dùng để gọi constructor hoặc phương thức của class cha.

---

## PHẦN 2 – VÍ DỤ MINH HỌA (LOGIC)

### 📝 Bài toán: Hệ thống quản lý nhân viên

**Mô tả:**  
Xây dựng class `NhanVien` (class cha) và class `QuanLy` (class con kế thừa). Áp dụng đóng gói cho lương.

**Input:**
```
Nhân viên: "Minh", lương=15_000_000
Quản lý  : "Lan", lương=25_000_000, phong_ban="Kỹ thuật"
Tăng lương Minh 10%
```

**Output:**
```
--- Thông tin nhân viên ---
Tên  : Minh
Lương: 15,000,000 VNĐ

--- Thông tin quản lý ---
Tên     : Lan
Lương   : 25,000,000 VNĐ
Phòng ban: Kỹ thuật

Sau khi tăng lương 10%:
Lương mới của Minh: 16,500,000 VNĐ
```

**🔍 Dry Run:**
```
Bước 1 – Tạo object NhanVien("Minh", 15_000_000)
  __init__ được gọi: self.__ten = "Minh", self.__luong = 15000000

Bước 2 – Tạo object QuanLy("Lan", 25_000_000, "Kỹ thuật")
  QuanLy.__init__ gọi super().__init__("Lan", 25_000_000)
  rồi thêm: self.phong_ban = "Kỹ thuật"

Bước 3 – Tăng lương Minh 10%
  tang_luong(10) → self.__luong *= 1.10
  15_000_000 × 1.1 = 16_500_000
  → Lương mới = 16,500,000 VNĐ
```

---

## PHẦN 3 – CODE DEMO

> Xem file: [`demo.py`](./demo.py)

---

## 💡 Tổng kết buổi 3

| Khái niệm | Bạn đã học |
|-----------|-----------|
| Class & Object | Định nghĩa class, tạo object với `__init__` |
| Encapsulation | `__private`, getter, setter có kiểm tra |
| Inheritance | `class Con(Cha)`, `super()` |
| `self` | Đại diện cho object hiện tại trong phương thức |

> 🎯 **Bài tập về nhà:** Xây dựng class `XeHoi` (có: `__bien_so`, `__toc_do`, phương thức `tang_toc`, `di_chuyen`). Tạo class `XeTai` kế thừa từ `XeHoi` và thêm thuộc tính `tai_trong`.

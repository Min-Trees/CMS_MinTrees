# 📘 Course → CSB → Lesson 10 – Tập Hợp và Ánh Xạ

> **Khóa học:** CSB – Nền Tảng Lập Trình Python  
> **Buổi:** 10 / 14  
> **Chủ đề:** Set · Map · Dictionary trong Python  

---

## PHẦN 1 – GIẢI THÍCH ĐƠN GIẢN

### 🎭 Set (Tập Hợp)

**Ẩn dụ:** Bộ sưu tập tem — **không có con tem trùng nhau**.

> Dù bạn có nhét cùng một con tem vào bộ sưu tập 10 lần, nó vẫn chỉ xuất hiện **1 lần**.  
> Và bộ sưu tập cũng **không quan tâm thứ tự** — chỉ quan tâm **cái gì có, cái gì không**.

```python
mon_hoc_a = {"Toán", "Lý", "Hóa", "Anh"}
mon_hoc_b = {"Toán", "Sinh", "Địa", "Anh"}

# Phép toán tập hợp
print(mon_hoc_a | mon_hoc_b)   # Hợp: tất cả môn của cả 2 lớp
print(mon_hoc_a & mon_hoc_b)   # Giao: môn học chung
print(mon_hoc_a - mon_hoc_b)   # Hiệu: môn A có, B không có
```

| Phép toán | Ký hiệu | Phương thức |
|-----------|---------|-------------|
| Hợp | `A \| B` | `A.union(B)` |
| Giao | `A & B` | `A.intersection(B)` |
| Hiệu | `A - B` | `A.difference(B)` |
| Đối xứng | `A ^ B` | `A.symmetric_difference(B)` |

---

### 📖 Dictionary (Từ Điển)

**Ẩn dụ:** Cuốn từ điển Anh–Việt.

> Bạn tra từ khóa **"cat"** → nhận về nghĩa **"con mèo"**.  
> Mỗi mục có 2 phần: **key** (chữ tiếng Anh) và **value** (nghĩa tiếng Việt).

- **Key** phải là kiểu **bất biến** (int, str, tuple) và **duy nhất**  
- **Value** có thể là bất kỳ thứ gì (list, dict, object...)  
- Truy cập **O(1)** — cực kỳ nhanh dù từ điển có triệu mục!

```python
menu = {
    "trà sữa": 35_000,
    "cà phê":  25_000,
    "nước cam": 30_000
}

print(menu["trà sữa"])          # 35000
menu["nước dừa"] = 28_000       # Thêm mục mới
del menu["cà phê"]                # Xóa mục
```

---

## PHẦN 2 – VÍ DỤ MINH HỌA (LOGIC)

### 📝 Bài toán: Hệ thống quản lý môn học và điểm

**Mô tả:**  
1. Tìm học sinh đăng ký cả hai lớp (dùng Set giao)  
2. Tra cứu điểm học sinh nhanh (dùng Dictionary)  
3. Thống kê số học sinh theo xếp loại (Dictionary đếm)  

**Input:**
```
lop_a = {"An", "Bình", "Cúc", "Dũng"}
lop_b = {"Bình", "Én", "Dũng", "Hoa"}
diem  = {"An": 9.0, "Bình": 7.5, "Cúc": 8.2, "Dũng": 5.5, "Én": 6.0, "Hoa": 8.8}
```

**Output:**
```
Học sinh cả 2 lớp : {'Bình', 'Dũng'}
Học sinh chỉ lớp A: {'An', 'Cúc'}
Tổng học sinh      : 6 (không trùng)

Bảng xếp loại:
  Xuất sắc (≥9.0): ['An']
  Giỏi     (≥8.0): ['Cúc', 'Hoa']
  Khá      (≥6.5): ['Bình', Én']
  TB       (≥5.0): ['Dũng']
```

**🔍 Dry Run:**
```
Set intersection: lop_a & lop_b
  Duyệt lop_a = {An, Bình, Cúc, Dũng}
    "An"   ∈ lop_b? Không
    "Bình" ∈ lop_b? Có → thêm vào kết quả
    "Cúc"  ∈ lop_b? Không
    "Dũng" ∈ lop_b? Có → thêm vào kết quả
  → {"Bình", "Dũng"}

Dictionary count:
  "An"   → 9.0 ≥ 9.0 → "Xuất sắc" → xep_loai["Xuất sắc"] += 1
  "Hoa"  → 8.8 → "Giỏi"
  ...
```

---

## PHẦN 3 – CODE DEMO

> Xem file: [`demo.py`](./demo.py)

---

## 💡 Tổng kết buổi 10

| Cấu trúc | Đặc điểm | Dùng khi |
|----------|----------|---------|
| `set` | Không trùng, không thứ tự, O(1) lookup | Loại trùng lặp, phép toán tập hợp |
| `dict` | Key-value, O(1) lookup, key duy nhất | Tra cứu nhanh, đếm, nhóm dữ liệu |
| `list` | Có thứ tự, có trùng, O(n) lookup | Dữ liệu có thứ tự, cần index |

> 🎯 **Bài tập về nhà:** Đọc một đoạn văn bản, dùng Dictionary đếm số lần xuất hiện của từng từ, sau đó in ra 5 từ xuất hiện nhiều nhất.

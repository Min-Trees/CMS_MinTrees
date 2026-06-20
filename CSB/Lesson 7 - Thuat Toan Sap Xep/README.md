# 📘 Course → CSB → Lesson 7 – Thuật Toán Sắp Xếp

> **Khóa học:** CSB – Nền Tảng Lập Trình Python  
> **Buổi:** 7 / 14  
> **Chủ đề:** Insertion Sort · Bubble Sort · Quick Sort  

---

## PHẦN 1 – GIẢI THÍCH ĐƠN GIẢN

### 🃏 Sắp Xếp Chèn (Insertion Sort)

**Ẩn dụ:** Sắp xếp bài tú lơ khơ trên tay.

> Mỗi lần rút thêm một lá bài, bạn **chèn nó vào đúng vị trí** trong phần bài đã sắp xếp trên tay.  
> Lá bài cầm trên tay luôn được giữ theo thứ tự!

- Độ phức tạp: **O(n²)** trung bình, **O(n)** nếu gần như đã sắp xếp  
- Dùng tốt cho: Danh sách nhỏ hoặc gần như đã được sắp xếp  

---

### 🫧 Sắp Xếp Nổi Bọt (Bubble Sort)

**Ẩn dụ:** Bong bóng khí trong ly nước.

> Phần tử lớn nhất sẽ **"nổi lên"** về cuối danh sách sau mỗi vòng so sánh cặp kề.  
> Như bong bóng khí luôn thoát lên trên!

- Độ phức tạp: **O(n²)**  
- Dễ hiểu nhất nhưng kém hiệu quả — chủ yếu dùng để học  

---

### ⚡ Sắp Xếp Nhanh (Quick Sort)

**Ẩn dụ:** Phân chia để trị — chia để học bài.

> Chọn một "đội trưởng" (pivot). Những bạn yếu hơn đội trưởng sang bên trái, mạnh hơn sang bên phải.  
> Rồi mỗi nhóm con lại tiếp tục chọn "đội trưởng" của mình... cho đến khi mỗi nhóm chỉ còn 1 người.

- Độ phức tạp: **O(n log n)** trung bình, **O(n²)** xấu nhất  
- **Nhanh nhất** trong thực tế với dữ liệu ngẫu nhiên  

---

### 📊 So sánh 3 thuật toán

| Thuật toán | Tốt nhất | Trung bình | Xấu nhất | Dùng khi |
|-----------|----------|-----------|----------|---------|
| Insertion Sort | O(n) | O(n²) | O(n²) | List nhỏ, gần sort |
| Bubble Sort | O(n) | O(n²) | O(n²) | Giảng dạy, học |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | Thực tế, list lớn |

---

## PHẦN 2 – VÍ DỤ MINH HỌA (LOGIC)

### 📝 Bài toán: Sắp xếp điểm học sinh

**Input:** `[64, 25, 12, 22, 11]`

**🔍 Dry Run – Bubble Sort:**
```
Vòng 1: [64,25,12,22,11]
  64>25 → hoán đổi: [25,64,12,22,11]
  64>12 → hoán đổi: [25,12,64,22,11]
  64>22 → hoán đổi: [25,12,22,64,11]
  64>11 → hoán đổi: [25,12,22,11,64]  ← 64 đã "nổi" về cuối

Vòng 2: [25,12,22,11,64]
  25>12 → hoán đổi: [12,25,22,11,64]
  25>22 → hoán đổi: [12,22,25,11,64]
  25>11 → hoán đổi: [12,22,11,25,64]  ← 25 về đúng vị trí

Kết quả cuối: [11, 12, 22, 25, 64]
```

**🔍 Dry Run – Quick Sort với pivot = phần tử cuối:**
```
[64, 25, 12, 22, 11]  pivot=11
  Phân vùng: [] | 11 | [64,25,12,22]
Quick([64,25,12,22]) pivot=22
  Phân vùng: [12] | 22 | [64,25]
Quick([64,25]) pivot=25
  Phân vùng: [] | 25 | [64]
Kết quả ghép: [11, 12, 22, 25, 64]
```

---

## PHẦN 3 – CODE DEMO

> Xem file: [`demo.py`](./demo.py)

---

## 💡 Tổng kết buổi 7

> 🎯 **Bài tập về nhà:** Cài đặt **Merge Sort** (sắp xếp trộn) — chia đôi mảng, sort hai nửa, rồi gộp lại — và so sánh thời gian chạy với Bubble Sort trên 10.000 phần tử ngẫu nhiên.

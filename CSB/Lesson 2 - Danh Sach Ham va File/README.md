# 📘 Course → CSB → Lesson 2 – Danh Sách, Hàm và Xử Lý Tệp

> **Khóa học:** CSB – Nền Tảng Lập Trình Python  
> **Buổi:** 2 / 14  
> **Chủ đề:** List · Hàm (Function) · Đọc/Ghi File  

---

## PHẦN 1 – GIẢI THÍCH ĐƠN GIẢN

### 📋 List (Danh sách)

**Ẩn dụ:** Dãy ngăn tủ có đánh số từ 0.

> Mỗi ngăn tủ chứa một thứ gì đó và được đánh số liên tiếp 0, 1, 2, ...  
> Bạn có thể mở ngăn số 2, thêm ngăn mới vào cuối, hoặc xóa bớt ngăn.

```
ds = ["An", "Bình", "Cúc"]
       [0]    [1]     [2]
```

| Thao tác | Cú pháp | Ý nghĩa |
|----------|---------|---------|
| Tạo list | `ds = [1, 2, 3]` | Khởi tạo danh sách |
| Truy cập | `ds[0]` | Lấy phần tử đầu tiên |
| Thêm cuối | `ds.append(4)` | Thêm vào cuối danh sách |
| Chèn vào | `ds.insert(1, 99)` | Chèn tại vị trí 1 |
| Xóa theo giá trị | `ds.remove(99)` | Xóa lần xuất hiện đầu tiên |
| Xóa theo vị trí | `ds.pop(i)` | Xóa và trả về phần tử tại vị trí i |
| Độ dài | `len(ds)` | Đếm số phần tử |
| Sắp xếp | `ds.sort()` | Sắp xếp tại chỗ (tăng dần) |
| Cắt đoạn | `ds[1:3]` | Lấy phần tử từ vị trí 1 đến 2 |

---

### 🔧 Hàm (Function)

**Ẩn dụ:** Máy pha cà phê tự động.

- Bạn bỏ vào: `hạt cà phê + nước + đường` → (đầu vào – **tham số**)  
- Máy xử lý bên trong (bạn không cần biết chi tiết)  
- Bạn nhận được: `ly cà phê thơm ngon` → (đầu ra – **return value**)

Định nghĩa hàm **một lần**, gọi lại **bao nhiêu lần cũng được**!

```python
def ten_ham(tham_so_1, tham_so_2="mac_dinh"):
    # logic xử lý
    return ket_qua
```

---

### 🗂️ File (Tệp)

**Ẩn dụ:** Cuốn sổ tay vật lý.

- **Ghi (write):** bạn cầm bút viết → thông tin tồn tại kể cả khi tắt máy  
- **Đọc (read):** bạn mở sổ lật lại xem  
- **Thêm vào (append):** bạn viết tiếp ở trang cuối mà không xóa nội dung cũ  

> Luôn dùng `with open(...)` — Python sẽ tự đóng file dù có lỗi xảy ra.

| Chế độ | Ký hiệu | Ý nghĩa |
|--------|---------|---------|
| Đọc | `"r"` | Chỉ đọc, file phải tồn tại |
| Ghi | `"w"` | Ghi đè toàn bộ (xóa cũ viết mới) |
| Thêm | `"a"` | Thêm nội dung vào cuối file |

---

## PHẦN 2 – VÍ DỤ MINH HỌA (LOGIC)

### 📝 Bài toán: Quản lý điểm lớp học

**Mô tả:**  
Có danh sách học sinh và điểm số. Chương trình cần:  
1. Tính điểm trung bình cả lớp  
2. Tìm học sinh có điểm cao nhất  
3. Lọc danh sách học sinh đạt (điểm ≥ 5)  
4. Lưu kết quả ra file `ket_qua.txt`  

**Input:**
```
hoc_sinh = ["An", "Bình", "Cúc", "Dũng", "Én"]
diem     = [9, 4, 7, 8, 6]
```

**Output:**
```
Điểm TB cả lớp    : 6.8
Học sinh giỏi nhất: An (9 điểm)
Học sinh đạt      : ['An', 'Cúc', 'Dũng', 'Én']
→ Đã ghi xong file: ket_qua.txt
```

**🔍 Dry Run:**
```
Bước 1 – Tính điểm TB (gọi hàm tinh_diem_trung_binh)
  tong   = 9 + 4 + 7 + 8 + 6 = 34
  diem_tb = 34 / 5 = 6.8

Bước 2 – Tìm học sinh giỏi nhất (gọi hàm tim_hoc_sinh_gioi_nhat)
  max(diem) = 9
  diem.index(9) = 0
  hoc_sinh[0] = "An"

Bước 3 – Lọc học sinh đạt (gọi hàm loc_hoc_sinh_dat, ngưỡng=5)
  i=0: 9 ≥ 5? ✓ → thêm "An"
  i=1: 4 ≥ 5? ✗ → bỏ qua
  i=2: 7 ≥ 5? ✓ → thêm "Cúc"
  i=3: 8 ≥ 5? ✓ → thêm "Dũng"
  i=4: 6 ≥ 5? ✓ → thêm "Én"
  → dat = ["An", "Cúc", "Dũng", "Én"]

Bước 4 – Ghi file
  Mở "ket_qua.txt" chế độ "w"
  Ghi từng dòng thông tin → đóng file tự động
```

---

## PHẦN 3 – CODE DEMO

> Xem file: [`demo.py`](./demo.py)

---

## 💡 Tổng kết buổi 2

| Khái niệm | Bạn đã học được |
|-----------|----------------|
| List | Tạo, truy cập, thêm, xóa, sort, slice |
| Function | `def`, tham số, giá trị mặc định, `return` |
| File | `open()`, `with`, chế độ `r`/`w`/`a`, encoding UTF-8 |

> 🎯 **Bài tập về nhà:** Viết hàm nhận vào một danh sách số nguyên, trả về danh sách chỉ chứa các số chẵn. Lưu kết quả ra file `so_chan.txt`.

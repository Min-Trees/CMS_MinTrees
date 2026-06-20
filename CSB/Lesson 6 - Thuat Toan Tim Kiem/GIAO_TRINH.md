# 🎯 Buổi 6: Thuật Toán Tìm Kiếm

> **Khóa:** CSB | **Buổi:** 6/14 | **Thời lượng:** 90 phút

---

## 🎯 Mục tiêu

Sau buổi này học viên làm được:
- ✅ Mô tả và cài đặt Linear Search (tìm kiếm tuyến tính)
- ✅ Mô tả và cài đặt Binary Search (tìm kiếm nhị phân) — cả iterative lẫn recursive
- ✅ So sánh độ phức tạp O(n) và O(log n) và biết khi nào dùng loại nào
- ✅ Áp dụng tìm kiếm vào bài toán thực tế (tìm học sinh, tìm sản phẩm)

---

## 🔁 Ôn bài cũ (10 phút)

**3 câu hỏi nhanh:**
1. `isinstance(obj, ClassName)` dùng để làm gì? Cho ví dụ.
2. Tại sao không thể tạo object từ Abstract Class?
3. Sự khác biệt giữa Override và Overload?

**Bài mini (3 phút):**
```python
# Đoạn code này có polymorphism không? Nếu có, chỉ ra ở dòng nào?
class Xe:
    def am_thanh(self): print("Vroom")

class XeDap(Xe):
    def am_thanh(self): print("Ting ting!")

xe_may = Xe()
xe_dap = XeDap()
for x in [xe_may, xe_dap, xe_may]:
    x.am_thanh()
```

---

## 📖 Kiến thức 1: Linear Search (Tìm kiếm tuyến tính)

### ✅ Giải thích

**Ẩn dụ: Tìm chìa khóa trong ngăn kéo lộn xộn**

> 🔑 Bạn mở ngăn kéo, **dò từng đồ vật từ trái sang phải**:  
> "Bút? Không — Cục tẩy? Không — À, chìa khóa rồi!"  
>  
> → Đó là **Linear Search**: kiểm tra từng phần tử theo thứ tự.

**Đặc điểm:**
- ✅ Làm việc với **bất kỳ danh sách nào** (đã sắp xếp hay chưa cũng được)
- ✅ Dễ cài đặt
- ❌ **Chậm với danh sách lớn** — trường hợp xấu nhất phải xem qua `n` phần tử

**Độ phức tạp:** O(n) — số bước tỉ lệ thuận với kích thước danh sách

| Danh sách | Xấu nhất | Trung bình |
|-----------|----------|-----------|
| 10 phần tử | 10 bước | 5 bước |
| 100 phần tử | 100 bước | 50 bước |
| 1.000.000 = 1 triệu | 1.000.000 bước | 500.000 bước |

### 📌 Ví dụ

**Input:** `ds = [5, 2, 8, 1, 9, 3]`, tìm `8`  
**Output:** `Tìm thấy tại chỉ số 2`

### 💻 Code

```python
# === LINEAR SEARCH CƠ BẢN ===
def linear_search(ds, can_tim):
    """Tìm kiếm tuyến tính.

    Trả về chỉ số (index) của phần tử nếu tìm thấy, -1 nếu không có.
    """
    for i in range(len(ds)):
        if ds[i] == can_tim:
            return i   # Tìm thấy: trả về vị trí ngay lập tức
    return -1   # Đã dó qua hết mà không thấy


# Test cơ bản
ds      = [5, 2, 8, 1, 9, 3]
can_tim = 8
vi_tri  = linear_search(ds, can_tim)
if vi_tri != -1:
    print(f"Tìm thấy {can_tim} tại chỉ số {vi_tri}")
else:
    print(f"Không tìm thấy {can_tim}")

print(f"Tìm 99: chỉ số {linear_search(ds, 99)}")   # → -1


# === LINEAR SEARCH VỚI LIST OBJECTS ===
class HocSinh:
    def __init__(self, ten, ma_hs, diem_tb):
        self.ten    = ten
        self.ma_hs  = ma_hs
        self.diem_tb = diem_tb

    def __str__(self):
        return f"{self.ma_hs}: {self.ten} ({self.diem_tb})"


def tim_hoc_sinh_theo_ten(ds_hs, ten_can_tim):
    """Tìm học sinh theo tên (không phân biệt hoa thường)."""
    ket_qua = []
    for hs in ds_hs:
        if ten_can_tim.lower() in hs.ten.lower():
            ket_qua.append(hs)
    return ket_qua   # Có thể tìm được nhiều kết quả!

def tim_hoc_sinh_theo_ma(ds_hs, ma_can_tim):
    """Tìm học sinh theo mã (duy nhất — chỉ trả về 1 hoặc None)."""
    for hs in ds_hs:
        if hs.ma_hs == ma_can_tim:
            return hs
    return None


lop_hoc = [
    HocSinh("Nguyễn Văn An",   "HS001", 8.5),
    HocSinh("Trần Thị Bình",   "HS002", 7.2),
    HocSinh("Lê Văn An",       "HS003", 9.1),    # Cũng tên An!
    HocSinh("Phạm Thị Cúc",   "HS004", 6.8),
    HocSinh("Hoàng Văn Dũng",  "HS005", 8.0),
]

print("\n--- Tìm theo tên 'an' ---")
ket_qua = tim_hoc_sinh_theo_ten(lop_hoc, "an")
for hs in ket_qua:
    print(f"  {hs}")

print("\n--- Tìm theo mã 'HS003' ---")
hs_tim = tim_hoc_sinh_theo_ma(lop_hoc, "HS003")
print(f"  {hs_tim if hs_tim else 'Không tìm thấy'}")


# === ĐẾM SỐ BƯỚC LINEAR SEARCH (minh họa O(n)) ===
def linear_search_dem_buoc(ds, can_tim):
    """Linear search nhưng đếm số bước so sánh."""
    bo_dem = 0
    for i in range(len(ds)):
        bo_dem += 1
        if ds[i] == can_tim:
            return i, bo_dem
    return -1, bo_dem

import random
random.seed(42)
ds_10    = list(range(10));        random.shuffle(ds_10)
ds_100   = list(range(100));      random.shuffle(ds_100)
ds_1000  = list(range(1000));    random.shuffle(ds_1000)

for ds in [ds_10, ds_100, ds_1000]:
    vi_tri, buoc = linear_search_dem_buoc(ds, ds[-1])   # Tìm phần tử cuối → xấu nhất
    print(f"  n={len(ds):5}: {buoc} bước (xấu nhất)")
```

### ⚠️ Lỗi thường gặp

```python
# LỖI 1: Dùng Linear Search cho list đã sort – lãng phí!
ds_da_sort = sorted(range(1000000))
# → Nên dùng Binary Search thay thế (nhanh hơn rất nhiều)

# LỖI 2: Không kiểm tra kết quả trả về
vi_tri = linear_search(ds, can_tim)
print(ds[vi_tri])    # ❌ Nếu không tìm thấy, vi_tri = -1 → ds[-1] = phần tử cuối!

if vi_tri != -1:     # ✅ Luôn kiểm tra trước khi dùng
    print(ds[vi_tri])
```

---

## 📖 Kiến thức 2: Binary Search (Tìm kiếm nhị phân)

### ✅ Giải thích

**Ẩn dụ: Trò chơi đoán số 1–100**

> 🎮 Bạn nghĩ số 73. Người đoán hỏi:  
> "50?" → "Lớn hơn" → Loại 1–50 (còn 51–100)  
> "75?" → "Nhỏ hơn" → Loại 76–100 (còn 51–75)  
> "63?" → "Lớn hơn" → Loại 51–63 (còn 64–75)  
> "70?" → "Lớn hơn" → (còn 71–75)  
> "73?" → "Đúng!" ✅ — Chỉ cần 5 lần đoán cho 100 số!

Với 1 triệu số, chỉ cần **tối đa 20 lần** (vì log₂(1.000.000) ≈ 20)!

**Điều kiện:** Danh sách **PHẢI được sắp xếp** trước!

**Cách hoạt động (3 bước lặp lại):**
1. Nhìn vào **phần tử GIỮA**
2. Nếu đúng → thắng! Nếu cần tìm > giữa → tìm nửa **phải**, ngược lại → nửa **trái**
3. Lặp lại cho đến khi tìm thấy hoặc không còn phần tử nào

### 📌 Ví dụ — Theo từng bước

**Input:** `ds = [1, 3, 5, 7, 9, 11, 13, 15]`, tìm `11`  
**Output:** Tìm thấy tại chỉ số 5

```
Bước 1: trái=0, phải=7, giữa=3 → ds[3]=7  < 11 → tìm nửa phải
Bước 2: trái=4, phải=7, giữa=5 → ds[5]=11 = 11 → TÌM THẤY! ✅
Chỉ 2 bước thay vì 6 bước (linear search)
```

### 💻 Code

```python
# === BINARY SEARCH - ITERATIVE (dùng vòng lặp) ===
def binary_search(ds_da_sort, can_tim):
    """Binary search dùng vòng lặp while.

    QUAN TRỌNG: ds phải được sắp xếp tăng dần!
    Trả về chỉ số nếu tìm thấy, -1 nếu không.
    """
    trai  = 0
    phai  = len(ds_da_sort) - 1

    while trai <= phai:
        giua  = (trai + phai) // 2   # Chỉ số phần tử giữa
        pt_giua = ds_da_sort[giua]

        if pt_giua == can_tim:
            return giua    # Tìm thấy!
        elif pt_giua < can_tim:
            trai = giua + 1    # Bỏ nửa trái, tìm nửa phải
        else:
            phai = giua - 1    # Bỏ nửa phải, tìm nửa trái

    return -1   # Không tìm thấy


# === BINARY SEARCH - RECURSIVE (đệ quy) ===
def binary_search_recursive(ds, can_tim, trai=0, phai=None):
    """Binary search dùng đệ quy."""
    if phai is None:
        phai = len(ds) - 1

    if trai > phai:    # Điều kiện dừng: dải tìm kiếm rỗng
        return -1

    giua = (trai + phai) // 2

    if ds[giua] == can_tim:
        return giua
    elif ds[giua] < can_tim:
        return binary_search_recursive(ds, can_tim, giua + 1, phai)   # Tìm nửa phải
    else:
        return binary_search_recursive(ds, can_tim, trai, giua - 1)   # Tìm nửa trái


# === TEST ===
ds_sort = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

for can_tim in [11, 1, 19, 6]:
    kq_iter = binary_search(ds_sort, can_tim)
    kq_rec  = binary_search_recursive(ds_sort, can_tim)
    thu_km  = f"→ index {kq_iter}" if kq_iter != -1 else "→ không tìm thấy"
    print(f"  Tìm {can_tim:3}: {thu_km} (iter) | {kq_rec} (recursive)")


# === MINH HỌA SỐ BƯỚC ===
def binary_search_chi_tiet(ds, can_tim):
    """Binary search in chi tiết từng bước."""
    trai, phai = 0, len(ds) - 1
    buoc = 0
    print(f"\nTìm {can_tim} trong {ds}")

    while trai <= phai:
        buoc += 1
        giua = (trai + phai) // 2
        print(f"  Bước {buoc}: [{trai}..{phai}] → giữa={giua}, ds[{giua}]={ds[giua]}", end="")

        if ds[giua] == can_tim:
            print(f" ✅ Tìm thấy!")
            return giua
        elif ds[giua] < can_tim:
            print(f" → Tìm nửa phải")
            trai = giua + 1
        else:
            print(f" → Tìm nửa trái")
            phai = giua - 1

    print(f"  → Không tìm thấy sau {buoc} bước")
    return -1

binary_search_chi_tiet(ds_sort, 11)
```

### ⚠️ Lỗi thường gặp

```python
# LỖI 1: Dùng Binary Search trên list CHƯA sort
ds_chua_sort = [5, 2, 8, 1, 9]
print(binary_search(ds_chua_sort, 8))   # ❌ Kết quả SAI/ngẫu nhiên!

# ✅ Sort trước khi dùng
ds_da_sort = sorted(ds_chua_sort)
print(binary_search(ds_da_sort, 8))   # Đúng

# LỖI 2: Vòng lặp vô tận nếu tính giữa sai
giua = trai + phai // 2    # ❌ Thứ tự ưu tiên! → trai + (phai//2) — WRONG!
giua = (trai + phai) // 2   # ✅ Cần dấu ngoặc

# LỖI 3: Điều kiện while sai
while trai < phai:   # ❌ Bỏ sót trường hợp trai == phai (danh sách 1 phần tử)
while trai <= phai:  # ✅
```

---

## 📖 Kiến thức 3: So sánh Độ Phức Tạp

### ✅ Giải thích — O(n) vs O(log n)

> 📚 **Big-O** đo lường "nếu dữ liệu tăng lên, thời gian chạy tăng bao nhiêu?"

| n (số phần tử) | O(n) — Linear | O(log n) — Binary |
|----------------|---------------|-------------------|
| 10 | 10 bước | 4 bước |
| 100 | 100 bước | 7 bước |
| 1.000 | 1.000 bước | 10 bước |
| 1.000.000 | 1.000.000 bước | **20 bước** |
| 1.000.000.000 | 1 tỷ bước | **30 bước** |

> 💡 **Khi nào dùng gì?**
> - **Linear Search:** List nhỏ (<100) HOẶC chưa được sắp xếp
> - **Binary Search:** List lớn VÀ đã được sắp xếp  
>   *(Nếu search nhiều lần: tốn 1 lần sort → tiết kiệm thời gian dài hạn)*

### 💻 Code — So sánh thực tế

```python
import time
import random

def benchmark(n, can_tim):
    """So sánh thời gian Linear vs Binary với n phần tử."""
    ds_goc  = list(range(n))
    random.shuffle(ds_goc)

    # Linear search trên list chưa sort
    t0 = time.perf_counter()
    linear_search(ds_goc, can_tim)
    t_linear = time.perf_counter() - t0

    # Binary search — cần sort trước
    ds_sort = sorted(ds_goc)
    t0 = time.perf_counter()
    binary_search(ds_sort, can_tim)
    t_binary = time.perf_counter() - t0

    return t_linear, t_binary

print("  n          Linear       Binary")
print("  " + "-"*40)
for n in [1_000, 10_000, 100_000, 1_000_000]:
    tl, tb = benchmark(n, n - 1)   # Tìm phần tử gần cuối (xấu nhất)
    print(f"  {n:>10,}: {tl*1000:7.3f}ms   {tb*1000:7.4f}ms")
```

---

## 💻 Demo Tổng Hợp — Hệ Thống Tra Cứu Sản Phẩm

```python
# ============================================================
#  DEMO: Linear Search + Binary Search trên dữ liệu thực tế
# ============================================================

class SanPham:
    def __init__(self, ma, ten, gia, danh_muc):
        self.ma       = ma
        self.ten      = ten
        self.gia      = gia
        self.danh_muc = danh_muc

    def __str__(self):
        return f"[{self.ma}] {self.ten:<20} {self.gia:>10,}đ  ({self.danh_muc})"

    def __repr__(self): return self.__str__()


class HeCuaHang:
    def __init__(self):
        self.__san_pham = []
        self.__sorted_by_gia = None   # Cache sort theo giá

    def them_san_pham(self, sp):
        self.__san_pham.append(sp)
        self.__sorted_by_gia = None   # Xóa cache khi thêm mới

    def _get_sorted_by_gia(self):
        """Lazy sort – chỉ sort khi cần và chưa có cache."""
        if self.__sorted_by_gia is None:
            self.__sorted_by_gia = sorted(self.__san_pham, key=lambda x: x.gia)
        return self.__sorted_by_gia

    # --- LINEAR SEARCH: tìm theo tên (không cần sort) ---
    def tim_theo_ten(self, tu_khoa):
        return [sp for sp in self.__san_pham
                if tu_khoa.lower() in sp.ten.lower()]

    # --- BINARY SEARCH: tìm sản phẩm có giá gần nhất với ngân sách ---
    def tim_gia_gan_nhat(self, ngan_sach):
        ds_sort = self._get_sorted_by_gia()
        gia_sort = [sp.gia for sp in ds_sort]

        trai, phai = 0, len(gia_sort) - 1
        while trai <= phai:
            giua = (trai + phai) // 2
            if gia_sort[giua] == ngan_sach:
                return ds_sort[giua]
            elif gia_sort[giua] < ngan_sach:
                trai = giua + 1
            else:
                phai = giua - 1

        # Không có chính xác: trả về sản phẩm có giá gần nhất
        if trai >= len(ds_sort): return ds_sort[-1]
        if phai < 0:             return ds_sort[0]
        # So sánh 2 phần tử xung quanh
        if abs(gia_sort[trai] - ngan_sach) < abs(gia_sort[phai] - ngan_sach):
            return ds_sort[trai]
        return ds_sort[phai]

    def in_danh_sach(self):
        for sp in self.__san_pham:
            print(f"  {sp}")


# Demo
cua_hang = HeCuaHang()
for sp_data in [
    ("SP001", "Laptop MindX A1",    12_000_000, "Laptop"),
    ("SP002", "Chuột Logitech M100",   250_000, "Phụ kiện"),
    ("SP003", "Bàn Phím cơ MK850",  1_800_000, "Phụ kiện"),
    ("SP004", "Màn hình 24 inch",   4_500_000, "Màn hình"),
    ("SP005", "Tai nghe Sony WH",   3_200_000, "Âm thanh"),
    ("SP006", "Laptop MindX Pro",  18_000_000, "Laptop"),
    ("SP007", "USB Hub 7 cổng",      320_000, "Phụ kiện"),
]:
    cua_hang.them_san_pham(SanPham(*sp_data))

print("=== CỬA HÀNG MINDX TECH ===\n")
cua_hang.in_danh_sach()

print("\n--- Tìm 'laptop' ---")
for sp in cua_hang.tim_theo_ten("laptop"):
    print(f"  {sp}")

print("\n--- Tìm giá gần nhất với ngân sách 3.500.000đ ---")
sp = cua_hang.tim_gia_gan_nhat(3_500_000)
print(f"  {sp}")
```

---

## 📝 Bài Tập Trên Lớp

### 🟢 Bài 1 (Dễ): Tìm kiếm cơ bản
> Cho `ds = [15, 8, 3, 22, 7, 19, 11, 4]`.  
> a) Dùng linear search tìm 22, 99. In kết quả và số bước.  
> b) Sort ds, dùng binary search tìm cùng 2 giá trị đó.  
> c) So sánh số bước của 2 cách.

### 🟡 Bài 2 (Trung bình): Tìm kiếm tên học sinh
> Danh sách 10 học sinh (viết tay vào code).  
> a) Linear search: tìm TẤT CẢ học sinh có tên chứa từ khóa (không phân biệt hoa thường).  
> b) Sort theo điểm, binary search: tìm học sinh có điểm chính xác là `8.5`.  
> c) Nếu không tìm thấy điểm chính xác, in ra "2 học sinh có điểm gần nhất".

### 🔴 Bài 3 (Nâng cao nhẹ): Tìm kiếm trong file
> 1. Viết 20 sản phẩm (tên, giá) ra file `san_pham.txt`
> 2. Đọc file, tạo list objects
> 3. Linear search theo tên (in tất cả kết quả)
> 4. Sort theo giá, binary search exact match theo giá
> 5. Đo thời gian cả 2 phương pháp với 1000 phép tìm kiếm

---

## 🏠 Bài Tập Về Nhà

### 🏠 Bài 1: Từ điển thông minh
> Xây dựng hệ thống:
> - 50 từ tiếng Anh + nghĩa tiếng Việt
> - Linear search: tìm kiếm mờ (fuzzy) theo ký tự đầu từ
> - Binary search: tìm kiếm chính xác (từ đã sort alphabet)
> - Đếm và so sánh số bước của cả 2 phương pháp

### 🏠 Bài 2: Hệ thống tra cứu điểm thi
> - 100 thí sinh với mã số và điểm (tạo ngẫu nhiên)
> - Binary search theo mã số (đã sort theo mã)
> - Linear search tìm tất cả thí sinh có điểm trong khoảng `[x, y]`  
> - In: thứ hạng của 1 thí sinh bất kỳ (dùng binary search để tính)

---

## 🎯 Tổng Kết Buổi 6

**3 điều PHẢI nhớ:**
1. 🔍 **Linear Search:** Dò từng phần tử — đơn giản, không cần sort, O(n)
2. ⚖️ **Binary Search:** Chia đôi tìm kiếm — nhanh hơn *rất nhiều*, BẮT BUỘC list đã sort, O(log n)
3. 📊 **n=1 triệu:** Linear = 1.000.000 bước vs Binary = chỉ **20 bước** — Binary nhanh hơn 50.000 lần!

**Liên kết:**
- Buổi trước: Loop để lặp qua danh sách → Bây giờ: Loop thông minh để tìm kiếm hiệu quả
- Buổi sau (Buổi 7): **Sắp xếp** — làm sao sắp xếp danh sách để Binary Search hoạt động được!

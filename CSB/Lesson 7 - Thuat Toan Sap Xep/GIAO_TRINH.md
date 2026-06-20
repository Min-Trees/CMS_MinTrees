# 🎯 Buổi 7: Thuật Toán Sắp Xếp

> **Khóa:** CSB | **Buổi:** 7/14 | **Thời lượng:** 90 phút

---

## 🎯 Mục tiêu

Sau buổi này học viên làm được:
- ✅ Giải thích và cài đặt Bubble Sort (sắp xếp nổi bọt)
- ✅ Giải thích và cài đặt Insertion Sort (sắp xếp chèn)
- ✅ Giải thích và cài đặt Quick Sort (sắp xếp nhanh) — bao gồm phiên bản đệ quy
- ✅ So sánh độ phức tạp O(n²) vs O(n log n) và biết chọn thuật toán phù hợp
- ✅ Sắp xếp objects theo nhiều tiêu chí (tên, điểm, ngày tháng)

---

## 🔁 Ôn bài cũ (10 phút)

**3 câu hỏi nhanh:**
1. Điều kiện BẮT BUỘC để dùng Binary Search là gì?
2. O(n) vs O(log n): với n=1.000.000, cái nào nhanh hơn và nhanh hơn bao nhiêu lần?
3. `sorted(ds)` và `ds.sort()` khác nhau thế nào?

**Bài mini (3 phút):**
```python
# Binary search dưới đây có lỗi không? Nếu có, sửa lại:
def binary_search(ds, can_tim):
    trai = 0
    phai = len(ds)          # Bug ở đây?

    while trai < phai:      # Bug ở đây?
        giua = trai + phai // 2   # Bug ở đây?
        if ds[giua] == can_tim:
            return giua
        elif ds[giua] < can_tim:
            trai = giua
        else:
            phai = giua
    return -1
```
*(3 lỗi — tìm và sửa tất cả)*

---

## 📖 Kiến thức 1: Bubble Sort

### ✅ Giải thích

**Ẩn dụ: Bong bóng nổi lên**

> 🫧 Tưởng tượng hồ bơi với các bong bóng nặng nhẹ khác nhau:  
> Bong bóng nhẹ nhất dần **nổi lên trên** qua mỗi lượt.  
> Sau mỗi lượt "sục qua hồ", bong bóng nhẹ nhất đã ở đúng vị trí.

**Cách hoạt động:**
1. So sánh 2 phần tử liền kề
2. Nếu cặp đó sai thứ tự → đổi chỗ nhau
3. Lặp qua toàn bộ list nhiều lần cho đến khi hết đổi chỗ

**Ví dụ thủ công:**
```
[5, 2, 8, 1]   Lượt 1: so sánh cặp
 ↓
(5,2) → đổi → [2, 5, 8, 1]
(5,8) → ok  → [2, 5, 8, 1]
(8,1) → đổi → [2, 5, 1, 8]   Phần tử lớn nhất (8) đã về cuối!

 Lượt 2: xét [2, 5, 1] (8 đã xong)
(2,5) → ok
(5,1) → đổi → [2, 1, 5, 8]

 Lượt 3: xét [2, 1] → đổi → [1, 2, 5, 8]  ✅
```

**Độ phức tạp:** O(n²) — chậm với n lớn

### 📌 Ví dụ

**Input:** `[5, 2, 8, 1, 9, 3]`  
**Output:** `[1, 2, 3, 5, 8, 9]`

### 💻 Code

```python
# === BUBBLE SORT CƠ BẢN ===
def bubble_sort(ds):
    """Bubble sort — trả về list mới, không thay đổi list gốc."""
    arr = ds.copy()    # Sao chép, không phá vỡ list gốc
    n   = len(arr)

    for luot in range(n - 1):
        # Sau mỗi lượt, phần tử lớn nhất đã về đúng vị trí (cuối arr[:n-luot])
        for j in range(n - 1 - luot):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]   # Đổi chỗ (Python 1 dòng)
    return arr


# === BUBBLE SORT TỐI ƯU (thêm cờ dừng sớm) ===
def bubble_sort_toi_uu(ds):
    """Có cờ 'thay_doi' — dừng sớm nếu list đã sort."""
    arr = ds.copy()
    n   = len(arr)

    for luot in range(n - 1):
        thay_doi = False    # Cờ theo dõi
        for j in range(n - 1 - luot):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                thay_doi = True   # Có đổi chỗ → chưa xong

        if not thay_doi:   # Không đổi chỗ nào → đã sort hoàn toàn!
            print(f"  Dừng sớm sau {luot + 1} lượt!")
            break
    return arr


# === MINH HỌA TỪNG BƯỚC ===
def bubble_sort_chi_tiet(ds):
    """In chi tiết từng lượt để học."""
    arr = ds.copy()
    n   = len(arr)
    print(f"  Ban đầu: {arr}")

    for luot in range(n - 1):
        for j in range(n - 1 - luot):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
        print(f"  Lượt {luot+1}: {arr}")
    return arr


# Test
ds = [5, 2, 8, 1, 9, 3]
print("=== BUBBLE SORT ===")
bubble_sort_chi_tiet(ds)

print("\nTest dừng sớm với list đã gần sort:")
bubble_sort_toi_uu([1, 2, 3, 5, 4])   # Chỉ cần 1 lượt
```

### ⚠️ Lỗi thường gặp

```python
# LỖI 1: Sort thay đổi list gốc mà không có ý định
def bubble_sort_bug(ds):
    n = len(ds)
    for i in range(n-1):
        for j in range(n-1-i):
            if ds[j] > ds[j+1]:
                ds[j], ds[j+1] = ds[j+1], ds[j]   # ❌ Sửa trực tiếp ds!
    return ds

goc = [3, 1, 2]
ket_qua = bubble_sort_bug(goc)
print(goc)      # ❌ [1, 2, 3] — list gốc đã bị thay đổi!
# ✅ Sửa: arr = ds.copy() trước khi xử lý

# LỖI 2: Vòng lặp trong sai giới hạn
for j in range(n):      # ❌ j+1 sẽ vượt ra ngoài ở j = n-1!
for j in range(n - 1):  # ✅ (không tối ưu nhưng đúng)
for j in range(n - 1 - luot):  # ✅ (tối ưu hơn)
```

---

## 📖 Kiến thức 2: Insertion Sort

### ✅ Giải thích

**Ẩn dụ: Sắp xếp bài trong tay khi chơi bài**

> 🃏 Bạn nhặt từng quân bài và **chèn đúng vị trí** vào bộ bài đã sẵn trong tay:  
> Tay trái lúc nào cũng có bài đã sắp xếp sẵn.  
> Quân mới nhặt lên → so sánh và trượt vào đúng chỗ.

**Cách hoạt động:**
1. Coi phần tử đầu tiên là "đã sắp xếp"
2. Lấy phần tử tiếp theo, tìm vị trí đúng và **chèn vào**
3. Lặp cho đến hết

```
[5, 2, 8, 1]
 ↓ Lấy 2: so sánh với 5 → chèn trước 5
[2, 5, 8, 1]
 ↓ Lấy 8: 8 > 5 → giữ nguyên
[2, 5, 8, 1]
 ↓ Lấy 1: 1 < 8, 1 < 5, 1 < 2 → chèn đầu
[1, 2, 5, 8] ✅
```

**Ưu điểm:** Rất nhanh với **dữ liệu gần như đã sort** (O(n))  
**Nhược điểm:** Chậm với dữ liệu ngẫu nhiên lớn (O(n²))

### 💻 Code

```python
def insertion_sort(ds):
    """Insertion sort — trả về list mới đã sắp xếp."""
    arr = ds.copy()
    n   = len(arr)

    for i in range(1, n):        # Bắt đầu từ phần tử thứ 2
        khoa  = arr[i]           # Phần tử cần chèn vào đúng chỗ
        j     = i - 1

        # Dịch các phần tử lớn hơn khóa sang phải 1 vị trí
        while j >= 0 and arr[j] > khoa:
            arr[j + 1] = arr[j]
            j -= 1

        arr[j + 1] = khoa   # Đặt khóa vào đúng vị trí
    return arr


def insertion_sort_chi_tiet(ds):
    """In chi tiết để dễ theo dõi."""
    arr = ds.copy()
    n   = len(arr)
    print(f"  Ban đầu: {arr}")

    for i in range(1, n):
        khoa = arr[i]
        j    = i - 1
        while j >= 0 and arr[j] > khoa:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = khoa
        print(f"  Chèn {khoa}: {arr}")
    return arr


ds = [5, 2, 8, 1, 9, 3]
print("=== INSERTION SORT ===")
ket_qua = insertion_sort_chi_tiet(ds)
print(f"  Kết quả: {ket_qua}")
```

---

## 📖 Kiến thức 3: Quick Sort

### ✅ Giải thích

**Ẩn dụ: Chọn đội trưởng rồi chia phe**

> ⚽ Đội trưởng (pivot) đứng ra:  
> "Ai thấp hơn tôi đứng bên trái, ai cao hơn đứng bên phải!"  
> → Hai nhóm lại chọn đội trưởng riêng và tiếp tục chia phe  
> → Cho đến khi mỗi nhóm chỉ còn 1 người → xong!

**Cách hoạt động:**
1. Chọn 1 phần tử làm **pivot** (thường là phần tử cuối)
2. Chia list thành: `[nhỏ hơn pivot]` + `[pivot]` + `[lớn hơn pivot]`
3. Đệ quy sort 2 phần nhỏ hơn

**Độ phức tạp:** Trung bình O(n log n) — nhanh nhất trong 3 thuật toán!

### 💻 Code

```python
# === QUICK SORT - PHIÊN BẢN ĐỆ QUY ĐƠN GIẢN ===
def quick_sort(ds):
    """Quick sort đệ quy — tạo list mới."""
    if len(ds) <= 1:   # Điều kiện dừng: 0 hoặc 1 phần tử → đã "sort" rồi
        return ds

    pivot  = ds[-1]    # Chọn phần tử cuối làm pivot
    nho    = [x for x in ds[:-1] if x <= pivot]   # Nhỏ hơn hoặc bằng
    lon    = [x for x in ds[:-1] if x > pivot]    # Lớn hơn

    return quick_sort(nho) + [pivot] + quick_sort(lon)   # Ghép lại


def quick_sort_chi_tiet(ds, cap_sau=0):
    """Quick sort in chi tiết (số khoảng trắng = khung đệ quy)."""
    thut_le = "  " * cap_sau
    if len(ds) <= 1:
        print(f"{thut_le}Base case: {ds}")
        return ds

    pivot  = ds[-1]
    nho    = [x for x in ds[:-1] if x <= pivot]
    lon    = [x for x in ds[:-1] if x > pivot]
    print(f"{thut_le}pivot={pivot}: nhỏ={nho} | lớn={lon}")

    ket_qua = (quick_sort_chi_tiet(nho, cap_sau+1)
               + [pivot]
               + quick_sort_chi_tiet(lon, cap_sau+1))
    print(f"{thut_le}→ {ket_qua}")
    return ket_qua


ds = [5, 2, 8, 1, 9, 3]
print("=== QUICK SORT ===")
quick_sort_chi_tiet(ds)
```

---

## 📖 Kiến thức 4: Sắp xếp Objects & So sánh thuật toán

### 💻 Code — Sắp xếp với `key`

```python
import time, random

class HocSinh:
    def __init__(self, ten, diem_tb, lop):
        self.ten     = ten
        self.diem_tb = diem_tb
        self.lop     = lop
    def __repr__(self):
        return f"{self.ten}({self.diem_tb})"

lop = [
    HocSinh("Bình",  7.5, "10A2"),
    HocSinh("An",    9.0, "10A1"),
    HocSinh("Cúc",   8.2, "10A1"),
    HocSinh("Dũng",  6.5, "10A3"),
    HocSinh("Én",    9.0, "10A2"),
]

# --- Sắp xếp theo 1 tiêu chí ---
theo_diem = sorted(lop, key=lambda hs: hs.diem_tb, reverse=True)
print("Theo điểm giảm dần:", theo_diem)

# --- Sắp xếp theo nhiều tiêu chí (tuple) ---
theo_lop_roi_diem = sorted(lop, key=lambda hs: (hs.lop, -hs.diem_tb))
print("Theo lớp rồi điểm:", theo_lop_roi_diem)

# --- Benchmark 3 thuật toán ---
def benchmark_sort(n):
    random.seed(0)
    ds = [random.randint(1, 10000) for _ in range(n)]

    t0 = time.perf_counter()
    bubble_sort(ds)
    t_bubble = time.perf_counter() - t0

    t0 = time.perf_counter()
    insertion_sort(ds)
    t_insert = time.perf_counter() - t0

    t0 = time.perf_counter()
    quick_sort(ds)
    t_quick = time.perf_counter() - t0

    print(f"  n={n:>6}: Bubble={t_bubble*1000:.2f}ms | Insertion={t_insert*1000:.2f}ms | Quick={t_quick*1000:.2f}ms")

print("\n=== BENCHMARK ===")
for n in [100, 500, 1000]:
    benchmark_sort(n)
```

### ⚠️ Lỗi thường gặp

```python
# LỖI 1: Quick sort không có base case → đệ quy vô tận
def quick_sort_bug(ds):
    pivot = ds[-1]
    # Quên kiểm tra len(ds) <= 1 → RecursionError với list 1 phần tử!
    nho = [x for x in ds[:-1] if x <= pivot]
    lon = [x for x in ds[:-1] if x > pivot]
    return quick_sort_bug(nho) + [pivot] + quick_sort_bug(lon)

# LỖI 2: Sắp xếp object không có key
lop = [HocSinh("An", 9.0), HocSinh("Bình", 7.5)]
sorted(lop)             # ❌ TypeError: '<' not supported between instances of HocSinh
sorted(lop, key=lambda hs: hs.diem_tb)  # ✅
```

---

## 💻 Demo Tổng Hợp — Hệ Thống Xếp Hạng

```python
# ============================================================
#  DEMO: So sánh 3 thuật toán + Sắp xếp đa tiêu chí
# ============================================================

class VanDongVien:
    def __init__(self, ten, quoc_gia, diem, thoi_gian_s):
        self.ten         = ten
        self.quoc_gia    = quoc_gia
        self.diem        = diem
        self.thoi_gian   = thoi_gian_s    # Giây (thấp hơn = tốt hơn)

    def __repr__(self):
        return f"{self.ten}({self.diem}đ,{self.thoi_gian}s)"


vdv = [
    VanDongVien("Lý",       "VN",  95, 120),
    VanDongVien("Smith",    "US",  87, 115),
    VanDongVien("Kim",      "KR",  95, 118),
    VanDongVien("Santos",   "BR",  90, 122),
    VanDongVien("Yamada",   "JP",  87, 110),
    VanDongVien("Müller",   "DE",  92, 116),
]

# Xếp hạng: điểm cao trước; nếu bằng điểm → thời gian thấp trước
xep_hang = sorted(vdv, key=lambda v: (-v.diem, v.thoi_gian))

print("=== KẾT QUẢ THI ĐẤU ===")
for hang, v in enumerate(xep_hang, 1):
    huy = "🥇" if hang == 1 else "🥈" if hang == 2 else "🥉" if hang == 3 else "  "
    print(f"  {huy} #{hang:2}: {v.ten:<10} ({v.quoc_gia}) | {v.diem}đ | {v.thoi_gian}s")
```

---

## 📝 Bài Tập Trên Lớp

### 🟢 Bài 1 (Dễ): Chạy tay Bubble Sort
> Mảng: `[4, 7, 2, 9, 1, 5, 3]`  
> a) Vẽ ra giấy từng bước Bubble Sort lượt 1 và lượt 2.  
> b) Cài đặt bằng code, in từng lượt, kiểm tra kết quả.

### 🟡 Bài 2 (Trung bình): Sắp xếp đa tiêu chí
> Danh sách 8 cuốn sách (tên, năm XB, số trang).  
> Sắp xếp theo: a) năm XB tăng dần, b) số trang giảm dần, c) năm XB rồi số trang.

### 🔴 Bài 3 (Nâng cao nhẹ): Đo tốc độ thực tế
> Tạo 3 list ngẫu nhiên với n=100, 500, 1000.  
> Chạy cả 3 thuật toán, đo thời gian, in bảng so sánh.  
> Vẽ ra nhận xét: cái nào luôn nhanh nhất?

---

## 🏠 Bài Tập Về Nhà

### 🏠 Bài 1: Sắp xếp bảng điểm
> 20 học sinh với 5 môn học.  
> Sắp xếp theo: điểm TB giảm dần.  
> Nếu bằng điểm TB: sort theo tên A→Z.  
> In bảng xếp hạng đẹp (có thứ hạng và highlight Top 3).

### 🏠 Bài 2: Thuật toán Selection Sort
> Tự nghiên cứu và cài đặt **Selection Sort** (không học trong buổi này):  
> Ý tưởng: Tìm phần tử nhỏ nhất trong phần chưa sort, đặt vào đầu.  
> So sánh tốc độ với Bubble Sort và Insertion Sort.

---

## 🎯 Tổng Kết Buổi 7

**So sánh 3 thuật toán sắp xếp:**

| Thuật toán | Ẩn dụ | Độ phức tạp TB | Ưu điểm |
|------------|-------|----------------|---------|
| **Bubble** | Bong bóng nổi | O(n²) | Dễ hiểu, dừng sớm khi đã sort |
| **Insertion** | Sắp bài | O(n²) | Nhanh với dữ liệu gần-sort |
| **Quick** | Chia phe đội trưởng | O(n log n) | Nhanh nhất trong thực tế |

**3 điều PHẢI nhớ:**
1. 🫧 **Bubble Sort:** Đổi chỗ cặp sai thứ tự — đơn giản nhất, chậm nhất
2. 🃏 **Insertion Sort:** Chèn từng phần tử vào đúng chỗ — nhanh khi data gần sort  
3. ⚡ **Quick Sort:** Pivot + đệ quy — nhanh nhất, nhưng cần base case để không vô tận

**Liên kết:** Buổi sau (Buổi 8): **Thực Hành Tổng Hợp** — kết hợp OOP + Tìm kiếm + Sắp xếp vào project thực tế.

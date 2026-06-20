# 🎯 Buổi 2: Danh Sách, Hàm và Xử Lý Tệp

> **Khóa:** CSB | **Buổi:** 2/14 | **Thời lượng:** 90 phút

---

## 🎯 Mục tiêu

Sau buổi này học viên làm được:
- ✅ Tạo và thao tác List (thêm, xóa, sắp xếp, truy cập)
- ✅ Định nghĩa hàm với tham số và giá trị trả về
- ✅ Dùng tham số mặc định và viết list comprehension
- ✅ Đọc và ghi file với `open()` + `with`
- ✅ Tách code thành hàm tái sử dụng

---

## 🔁 Ôn bài cũ (10 phút)

**3 câu hỏi nhanh:**
1. Khai báo biến `diem = 8.5`. Gõ `type(diem)` cho ra gì?
2. `10 % 3` bằng bao nhiêu? Dùng được để kiểm tra gì?
3. Tại sao vòng `while` cần thay đổi biến điều kiện bên trong?

**Bài mini (2 phút):**
```python
# Sửa các lỗi trong đoạn code sau:
ten = Nguyen An
diem = "9.5"
if diem >= 8:
print("Giỏi")
```
*(Có 3 lỗi — tìm và sửa)*

> **Đáp án:** `ten = "Nguyen An"` · `diem = 9.5` · thụt lề `print`

---

## 📖 Kiến thức 1: List (Danh Sách)

### ✅ Giải thích

**Vấn đề:** Bạn có 30 học sinh trong lớp. Không lẽ khai báo 30 biến riêng?

```python
# ❌ Không ai làm thế này!
ten1 = "An"
ten2 = "Bình"
ten3 = "Cúc"
# ...và còn 27 biến nữa 😱
```

**Giải pháp: List** — giống **dãy ngăn tủ có đánh số từ 0**:

```
tens = ["An", "Bình", "Cúc", "Dũng", "Én"]
         [0]    [1]     [2]     [3]    [4]
              ↑ chỉ số (index) bắt đầu từ 0 !!!
```

> 💡 **Nhớ:** Python đếm từ 0, không phải từ 1!  
> Ngăn đầu tiên = chỉ số 0, ngăn thứ 2 = chỉ số 1, ...

**Các thao tác quan trọng:**

| Việc muốn làm | Cú pháp | Ví dụ |
|---------------|---------|-------|
| Tạo list | `ds = [1, 2, 3]` | |
| Lấy phần tử | `ds[0]` → phần tử đầu | `ds[-1]` → phần tử cuối |
| Thêm vào cuối | `ds.append(x)` | |
| Chèn vào giữa | `ds.insert(i, x)` | chèn x tại vị trí i |
| Xóa theo giá trị | `ds.remove(x)` | xóa x đầu tiên tìm thấy |
| Xóa theo vị trí | `ds.pop(i)` | xóa và trả về phần tử |
| Độ dài | `len(ds)` | |
| Sắp xếp tại chỗ | `ds.sort()` | thay đổi list gốc |
| Sắp xếp mới | `sorted(ds)` | tạo list mới, list gốc không đổi |
| Cắt đoạn | `ds[1:4]` | lấy phần tử 1, 2, 3 |

### 📌 Ví dụ — Quản lý điểm lớp học

**Input:** `diem = [9, 4, 7, 8, 6]`  
**Output:** Điểm cao nhất, thấp nhất, trung bình; danh sách đã sắp xếp

### 💻 Code

```python
# Khởi tạo list điểm
diem = [9, 4, 7, 8, 6]

# === TRUY CẬP PHẦN TỬ ===
print(f"Phần tử đầu: {diem[0]}")     # → 9 (chỉ số 0)
print(f"Phần tử cuối: {diem[-1]}")   # → 6 (chỉ số -1 = cuối cùng)
print(f"Phần tử 2-3: {diem[1:3]}")   # → [4, 7] (chỉ số 1 đến 2)

# === THÊM / XÓA ===
diem.append(10)        # Thêm 10 vào cuối → [9,4,7,8,6,10]
diem.insert(0, 5)      # Chèn 5 vào đầu  → [5,9,4,7,8,6,10]
print(f"Sau khi thêm: {diem}")

diem.remove(4)         # Xóa phần tử có giá trị 4
phan_tu_da_xoa = diem.pop(0)   # Xóa phần tử ở vị trí 0, lấy giá trị ra
print(f"Đã xóa: {phan_tu_da_xoa}")
print(f"Sau khi xóa: {diem}")

# === THỐNG KÊ ===
print(f"\nSố lượng  : {len(diem)}")
print(f"Cao nhất  : {max(diem)}")
print(f"Thấp nhất : {min(diem)}")
print(f"Tổng điểm : {sum(diem)}")
print(f"Trung bình: {sum(diem) / len(diem):.2f}")

# === SẮP XẾP ===
diem_goc    = [9, 4, 7, 8, 6]
diem_tang   = sorted(diem_goc)              # Tạo list mới, list gốc không đổi
diem_giam   = sorted(diem_goc, reverse=True)
print(f"\nGốc      : {diem_goc}")
print(f"Tăng dần : {diem_tang}")
print(f"Giảm dần : {diem_giam}")

# Sắp xếp tại chỗ (thay đổi list gốc)
diem_goc.sort()           # diem_goc bây giờ đã được sắp xếp
print(f"Sau sort(): {diem_goc}")
```

### ⚠️ Lỗi thường gặp

```python
# LỖI 1: Index bắt đầu từ 0, không phải 1
ds = ["An", "Bình", "Cúc"]
print(ds[1])     # → "Bình" (không phải "An"!)
print(ds[3])     # ❌ IndexError: list index out of range (chỉ có 0,1,2)

# LỖI 2: append() vs insert()
ds.append("Dũng")       # → thêm "Dũng" vào CUỐI
ds.insert(0, "Dũng")    # → chèn "Dũng" vào ĐẦU (vị trí 0)

# LỖI 3: sort() vs sorted()
ds1 = [3, 1, 2]
ket_qua = ds1.sort()    # ❌ sort() trả về None, không trả về list!
print(ket_qua)          # → None

ds2 = [3, 1, 2]
ket_qua = sorted(ds2)   # ✅ sorted() trả về list mới
print(ket_qua)          # → [1, 2, 3]
```

---

## 📖 Kiến thức 2: Hàm (Function)

### ✅ Giải thích

**Vấn đề:** Bạn cần tính điểm trung bình cho 30 học sinh. Không lẽ viết code tính 30 lần?

```python
# ❌ Không tái sử dụng được
diem_tb_an    = (8 + 9 + 7) / 3
diem_tb_binh  = (6 + 7 + 8) / 3
# ... 28 lần nữa 😱
```

**Giải pháp: Hàm** — như **máy pha cà phê**:

> ☕ Bạn bỏ nguyên liệu vào (tham số đầu vào)  
> → Máy tự xử lý bên trong  
> → Đưa ra ly cà phê (giá trị trả về)

Viết hàm **1 lần**, gọi **bao nhiêu lần cũng được**!

```python
def ten_ham(tham_so_1, tham_so_2):
    # Xử lý bên trong
    ket_qua = ...
    return ket_qua   # Trả kết quả ra ngoài

# Gọi hàm
bien_nhan = ten_ham(gia_tri_1, gia_tri_2)
```

### 📌 Ví dụ

**Input:** `[8, 9, 7]`  
**Output:** `8.0` (điểm trung bình)

### 💻 Code

```python
# === HÀM CƠ BẢN ===
def tinh_trung_binh(danh_sach_diem):
    """Tính điểm trung bình từ danh sách điểm.

    Args:
        danh_sach_diem: list chứa các điểm số

    Returns:
        Điểm trung bình (float)
    """
    if len(danh_sach_diem) == 0:   # Xử lý trường hợp đặc biệt: list rỗng
        return 0
    return sum(danh_sach_diem) / len(danh_sach_diem)


# Gọi hàm nhiều lần với dữ liệu khác nhau
print(tinh_trung_binh([8, 9, 7]))          # → 8.0
print(tinh_trung_binh([6, 5, 7, 8, 9]))   # → 7.0
print(tinh_trung_binh([]))                  # → 0 (không lỗi nhờ xử lý bên trong)


# === HÀM CÓ NHIỀU THAM SỐ VÀ THAM SỐ MẶC ĐỊNH ===
def xep_loai(diem, he_thang=10):
    """Xếp loại dựa trên điểm và hệ thống thang điểm.

    Tham số he_thang mặc định = 10 (có thể không truyền vào)
    """
    ty_le = diem / he_thang * 10   # Quy về thang 10

    if ty_le >= 9.0:   return "Xuất Sắc"
    elif ty_le >= 8.0: return "Giỏi"
    elif ty_le >= 6.5: return "Khá"
    elif ty_le >= 5.0: return "Trung Bình"
    else:              return "Yếu"


print(xep_loai(8.5))          # Dùng he_thang mặc định = 10
print(xep_loai(85, 100))      # Hệ thang điểm 100


# === HÀM TRẢ VỀ NHIỀU GIÁ TRỊ ===
def phan_tich_diem(danh_sach):
    """Trả về (trung_binh, cao_nhat, thap_nhat) cùng một lúc."""
    tb  = sum(danh_sach) / len(danh_sach)
    cao = max(danh_sach)
    thap = min(danh_sach)
    return tb, cao, thap    # Trả về 3 giá trị dưới dạng tuple


diem_an = [8, 9, 7, 6, 10]
trung_binh, cao_nhat, thap_nhat = phan_tich_diem(diem_an)   # Giải nén tuple
print(f"TB: {trung_binh:.1f} | Cao: {cao_nhat} | Thấp: {thap_nhat}")


# === LIST COMPREHENSION: cách ngắn gọn thay vì for + append ===
diem  = [9, 4, 7, 8, 6, 3]

# Cách dài (truyền thống)
dat_truyen_thong = []
for d in diem:
    if d >= 5:
        dat_truyen_thong.append(d)

# Cách ngắn (list comprehension) – CÙNG NGHĨA
dat_ngan = [d for d in diem if d >= 5]

print(f"Học viên đạt: {dat_ngan}")   # → [9, 7, 8, 6]
```

### ⚠️ Lỗi thường gặp

```python
# LỖI 1: Quên return – hàm trả về None
def tinh_tb(ds):
    ket_qua = sum(ds) / len(ds)
    # Quên return!

print(tinh_tb([8,9,7]))   # → None  ← không phải 8.0!

# LỖI 2: Tham số và biến cục bộ
x = 10
def tang_len():
    x = x + 1    # ❌ UnboundLocalError – Python tưởng x là biến cục bộ
    return x

def tang_len_dung(x):   # ✅ Truyền x vào làm tham số
    return x + 1

# LỖI 3: Thứ tự tham số mặc định
def ham(a, b=5, c):   # ❌ SyntaxError! Tham số mặc định phải đứng SAU
def ham(a, c, b=5):   # ✅ Đúng
```

---

## 📖 Kiến thức 3: Đọc / Ghi File

### ✅ Giải thích

**Vấn đề:** Dữ liệu trong chương trình sẽ mất khi tắt máy. Làm sao lưu lại?

> 📔 **Ghi file** = bạn cầm bút ghi vào cuốn sổ tay → thông tin lưu kể cả khi tắt máy  
> 📖 **Đọc file** = bạn mở sổ ra đọc lại những gì đã ghi

**Luôn dùng `with open(...)`** — Python tự đóng file kể cả khi có lỗi xảy ra!

| Chế độ | Ký hiệu | Ý nghĩa |
|--------|---------|---------|
| Đọc | `"r"` | Chỉ đọc, file PHẢI tồn tại sẵn |
| Ghi (xóa cũ) | `"w"` | Ghi mới, XÓA toàn bộ nội dung cũ |
| Thêm vào cuối | `"a"` | Ghi tiếp vào cuối, giữ nội dung cũ |

> ⚠️ Luôn thêm `encoding="utf-8"` khi làm việc với tiếng Việt!

### 📌 Ví dụ — Lưu điểm học sinh

**Input:** Danh sách học sinh và điểm  
**Output:** File `diem_lop.txt` chứa thông tin

### 💻 Code

```python
import os

# === GHI FILE ===
hoc_sinh = ["An", "Bình", "Cúc", "Dũng"]
diem     = [9.0, 7.5, 8.2, 6.0]

print("--- Ghi file ---")
with open("diem_lop.txt", "w", encoding="utf-8") as f:
    # "w" = write: tạo file mới, nếu đã có thì XÓA và tạo lại
    f.write("=== BẢNG ĐIỂM LỚP 10A ===\n")    # \n = xuống dòng
    for i in range(len(hoc_sinh)):
        dong = f"{hoc_sinh[i]:<10}: {diem[i]:.1f}\n"
        f.write(dong)    # Ghi từng dòng vào file

print("✓ Đã lưu file diem_lop.txt")

# === ĐỌC FILE – TOÀN BỘ ===
print("\n--- Đọc toàn bộ ---")
with open("diem_lop.txt", "r", encoding="utf-8") as f:
    noi_dung = f.read()   # Đọc toàn bộ thành 1 chuỗi lớn
    print(noi_dung)

# === ĐỌC FILE – TỪNG DÒNG ===
print("--- Đọc từng dòng ---")
with open("diem_lop.txt", "r", encoding="utf-8") as f:
    for so_dong, dong in enumerate(f, start=1):
        dong = dong.strip()    # Xóa \n và khoảng trắng thừa ở hai đầu
        if dong:               # Bỏ qua dòng trống
            print(f"Dòng {so_dong:2}: {dong}")

# === THÊM VÀO CUỐI FILE (không xóa nội dung cũ) ===
print("\n--- Thêm vào cuối ---")
with open("diem_lop.txt", "a", encoding="utf-8") as f:
    # "a" = append: NỐI vào cuối, không xóa nội dung cũ
    f.write("\n=== Học sinh mới ===\n")
    f.write("Én         : 7.8\n")
print("✓ Đã thêm học sinh mới vào file")

# Dọn dẹp file demo
os.remove("diem_lop.txt")
```

### ⚠️ Lỗi thường gặp

```python
# LỖI 1: Quên encoding – lỗi tiếng Việt
with open("file.txt", "w") as f:          # ❌ Lỗi khi ghi tiếng Việt
with open("file.txt", "w", encoding="utf-8") as f:  # ✅

# LỖI 2: Ghi file bằng "w" xóa mất dữ liệu cũ!
with open("diem.txt", "w", encoding="utf-8") as f:
    f.write("An: 9\n")    # Ghi lại → XÓA toàn bộ cũ, chỉ còn "An: 9"!
# ✅ Dùng "a" nếu muốn giữ nội dung cũ

# LỖI 3: Đọc file không tồn tại
with open("file_khong_co.txt", "r") as f:   # ❌ FileNotFoundError
    ...
# ✅ Sửa bằng try/except hoặc kiểm tra file tồn tại
import os
if os.path.exists("file.txt"):
    with open("file.txt", "r") as f:
        ...
```

---

## 💻 Demo Tổng Hợp — Hệ Thống Quản Lý Điểm Lớp

```python
# ============================================================
#  DEMO TỔNG HỢP – Hệ thống quản lý điểm lớp
#  Dùng: List, Function, File I/O
# ============================================================

import os

# ── Hàm xử lý dữ liệu ─────────────────────────────────────

def tinh_trung_binh(ds_diem):
    """Tính điểm trung bình, trả về 0 nếu list rỗng."""
    return sum(ds_diem) / len(ds_diem) if ds_diem else 0

def xep_loai(diem_tb):
    """Xếp loại dựa vào điểm trung bình."""
    if diem_tb >= 9.0:   return "Xuất Sắc"
    elif diem_tb >= 8.0: return "Giỏi"
    elif diem_tb >= 6.5: return "Khá"
    elif diem_tb >= 5.0: return "Trung Bình"
    else:                return "Yếu"

def loc_hoc_sinh_dat(ten, diem, nguong=5.0):
    """Trả về list tên học sinh đạt điểm >= ngưỡng."""
    return [ten[i] for i in range(len(ten)) if diem[i] >= nguong]

def ghi_ket_qua_file(ten_file, ten, diem):
    """Ghi kết quả ra file."""
    with open(ten_file, "w", encoding="utf-8") as f:
        f.write("BẢNG ĐIỂM LỚP HỌC\n")
        f.write("=" * 35 + "\n")
        for i in range(len(ten)):
            tb    = tinh_trung_binh(diem[i])
            loai  = xep_loai(tb)
            f.write(f"{ten[i]:<12}: {tb:.2f} ({loai})\n")
    print(f"✓ Đã lưu kết quả vào '{ten_file}'")

# ── Dữ liệu ───────────────────────────────────────────────

ten   = ["An", "Bình", "Cúc", "Dũng", "Én"]
diem  = [
    [9, 8, 10, 7],    # An
    [4, 6, 5, 7],     # Bình
    [8, 9, 7, 8],     # Cúc
    [7, 8, 6, 7],     # Dũng
    [10, 9, 8, 10],   # Én
]

# ── Xử lý và in báo cáo ────────────────────────────────────

print("=" * 40)
print("        BẢNG ĐIỂM LỚP HỌC")
print("=" * 40)

for i in range(len(ten)):
    tb   = tinh_trung_binh(diem[i])
    loai = xep_loai(tb)
    dau  = "✓" if tb >= 5 else "✗"
    print(f"{dau} {ten[i]:<8}: {tb:.2f} → {loai}")

# Thống kê cả lớp
diem_tb_ca_lop = [tinh_trung_binh(d) for d in diem]   # List comprehension!
print("-" * 40)
print(f"TB lớp : {tinh_trung_binh(diem_tb_ca_lop):.2f}")
print(f"Cao nhất: {max(diem_tb_ca_lop):.2f} ({ten[diem_tb_ca_lop.index(max(diem_tb_ca_lop))]})")
print(f"Học sinh đạt: {loc_hoc_sinh_dat(ten, diem_tb_ca_lop)}")

# Lưu file
TEN_FILE = "ket_qua_lop.txt"
ghi_ket_qua_file(TEN_FILE, ten, diem)
os.remove(TEN_FILE)   # Dọn dẹp sau demo
```

---

## 📝 Bài Tập Trên Lớp

### 🟢 Bài 1 (Dễ): Làm việc với List
> Tạo list 5 điểm bất kỳ.  
> a) In phần tử đầu và cuối.  
> b) Thêm điểm 9.5 vào cuối.  
> c) Xóa điểm thấp nhất.  
> d) In list đã sort tăng dần.

### 🟡 Bài 2 (Trung bình): Viết hàm
> Viết 3 hàm:
> - `tinh_tong(ds)` — trả về tổng các phần tử
> - `dem_gia_tri(ds, x)` — đếm số lần x xuất hiện trong ds
> - `dao_nguoc(ds)` — trả về list đảo ngược (không dùng `.reverse()`)
>
> Test với: `[5, 3, 8, 3, 1, 7, 3]`

### 🔴 Bài 3 (Nâng cao nhẹ): Nhật ký điểm số
> Viết chương trình:
> 1. Dùng list lưu danh sách các điểm được nhập vào (nhập đến khi nhập -1 thì dừng)
> 2. Tính và in: TB, cao nhất, thấp nhất, số điểm trên TB
> 3. Lưu kết quả ra file `nhat_ky_diem.txt`

---

## 🏠 Bài Tập Về Nhà

### 🏠 Bài 1: Quản lý giỏ hàng siêu thị
> Viết chương trình:
> - List `gio_hang = []` ban đầu trống
> - Hàm `them_vao_gio(san_pham, gia)` — thêm tuple `(san_pham, gia)` vào gio_hang
> - Hàm `tinh_tong_hoa_don(gio_hang)` — tính tổng tiền
> - Hàm `in_hoa_don(gio_hang)` — in hóa đơn đẹp ra màn hình
> - Ghi hóa đơn ra file `hoa_don.txt`

### 🏠 Bài 2: Từ điển đơn giản
> Viết chương trình:
> - List `tu_dien = [("cat", "con mèo"), ("dog", "con chó"), ("fish", "con cá")]`
> - Hàm `tra_tu(tu_khoa)` — tìm nghĩa của từ, trả về `"Không tìm thấy"` nếu không có
> - Hàm `them_tu(tieng_anh, tieng_viet)` — thêm từ mới vào từ điển  
> - Lưu từ điển ra file và đọc lại khi khởi động chương trình

---

## 🎯 Tổng Kết Buổi 2

**3 điều PHẢI nhớ:**
1. 📋 **List index bắt đầu từ 0** — `ds[0]` là phần tử đầu, `ds[-1]` là cuối cùng
2. 🔧 **Hàm = máy tái sử dụng** — viết 1 lần, gọi nhiều lần với `def` + `return`
3. 📂 **File luôn dùng `with open()` + `encoding="utf-8"`** — tự đóng file, hỗ trợ tiếng Việt

**Liên kết:**
- Buổi trước: Biến và vòng lặp → Bây giờ gộp nhiều biến lại thành List
- Buổi sau (Buổi 3): **OOP** — đóng gói List, hàm và biến vào trong một **Class**

# 🎯 Buổi 10: Set và Dictionary

> **Khóa:** CSB | **Buổi:** 10/14 | **Thời lượng:** 90 phút

---

## 🎯 Mục tiêu

Sau buổi này học viên làm được:
- ✅ Tạo và thao tác với Set (tập hợp): thêm, xóa, toán tử tập hợp
- ✅ Tạo và thao tác với Dictionary: CRUD, lặp qua items, nested dict
- ✅ Biết khi nào dùng Set/Dict thay vì List để tối ưu tốc độ
- ✅ Áp dụng dict comprehension và set comprehension

---

## 🔁 Ôn bài cũ (10 phút)

**3 câu hỏi nhanh:**
1. Viết nhanh Binary Search với 3 dòng code (không đầy đủ, chỉ ý tưởng)
2. Quicksort chọn pivot là phần tử nào? Base case là gì?
3. `try/except ValueError` bắt được lỗi nào? Ví dụ?

**Bài mini (3 phút):**
```python
# Kết quả là gì?
ds = [1, 2, 2, 3, 3, 3, 4]
ket_qua = {}
for x in ds:
    ket_qua[x] = ket_qua.get(x, 0) + 1
print(ket_qua)
```

---

## 📖 Kiến thức 1: Set (Tập Hợp)

### ✅ Giải thích

**Ẩn dụ: Danh sách khách mời tiệc**

> 🎉 Tiệc chỉ cần biết **ai được mời** — không cần thứ tự, không cần đếm xuất hiện bao nhiêu lần.  
> Mỗi người **chỉ có 1 vé** dù được nhắc tên 10 lần.

**Set** = Tập hợp các giá trị **duy nhất**, **không có thứ tự**.

| Đặc điểm | List | Set |
|----------|------|-----|
| Thứ tự | ✅ Có thứ tự | ❌ Không có |
| Trùng lặp | ✅ Cho phép | ❌ Tự động loại bỏ |
| Truy cập theo index | ✅ `ds[0]` | ❌ Không được |
| Kiểm tra `x in ...` | O(n) chậm | O(1) **rất nhanh** |
| Khai báo | `[1, 2, 3]` | `{1, 2, 3}` |

**Toán tử tập hợp:**
```
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

A | B  → Hợp    = {1, 2, 3, 4, 5, 6}   (tất cả phần tử)
A & B  → Giao   = {3, 4}               (chỉ phần tử chung)
A - B  → Hiệu   = {1, 2}               (A nhưng không có trong B)
A ^ B  → Đối xứng = {1, 2, 5, 6}      (chỉ một bên có)
```

### 📌 Ví dụ — Phân tích môn học đăng ký

**Input:** Danh sách môn học 2 lớp  
**Output:** Môn chung, môn riêng mỗi lớp, tất cả môn

### 💻 Code

```python
# === TẠO SET ===
tap_hop_1 = {1, 2, 3}                   # Khai báo trực tiếp
tap_hop_2 = set([1, 1, 2, 2, 3, 4])    # Từ list — tự loại trùng
tap_hop_3 = set()                        # Set rỗng (KHÔNG dùng {} — đó là dict rỗng!)

print(tap_hop_2)   # → {1, 2, 3, 4} (thứ tự có thể khác)

# Loại trùng từ list
ds_co_trung = [1, 2, 2, 3, 3, 3, 4, 1]
ds_duy_nhat = list(set(ds_co_trung))   # Chuyển Set → List lại
print(f"Gốc: {ds_co_trung}")
print(f"Sau khi loại trùng: {sorted(ds_duy_nhat)}")


# === CÁC THAO TÁC TRÊN SET ===
mon_lop_A = {"Toán", "Lý", "Hóa", "Văn", "Anh"}
mon_lop_B = {"Toán", "Anh", "Sử", "Địa", "Sinh"}

print(f"\n=== PHÂN TÍCH MÔN HỌC ===")
print(f"Lớp A: {sorted(mon_lop_A)}")
print(f"Lớp B: {sorted(mon_lop_B)}")
print(f"\nMôn chung cả 2 lớp (Giao): {sorted(mon_lop_A & mon_lop_B)}")
print(f"Tất cả môn (Hợp)          : {sorted(mon_lop_A | mon_lop_B)}")
print(f"Chỉ lớp A học (Hiệu A-B)  : {sorted(mon_lop_A - mon_lop_B)}")
print(f"Chỉ lớp B học (Hiệu B-A)  : {sorted(mon_lop_B - mon_lop_A)}")
print(f"Mỗi lớp học riêng (Đối xứng): {sorted(mon_lop_A ^ mon_lop_B)}")


# === THÊM / XÓA ===
cap_phep = {"Bơi", "Chạy", "Đá bóng"}
cap_phep.add("Cầu lông")          # Thêm 1 phần tử
cap_phep.update({"Bơi", "Tennis"}) # Thêm nhiều (Bơi đã có → không trùng)
cap_phep.discard("Đá bóng")       # Xóa an toàn (không lỗi nếu không có)
print(f"\nBộ môn: {cap_phep}")


# === KIỂM TRA — O(1) vs O(n) ===
import time

ds_list = list(range(1_000_000))
ds_set  = set(range(1_000_000))
can_tim = 999_999

t0 = time.perf_counter()
for _ in range(1000): can_tim in ds_list
t_list = time.perf_counter() - t0

t0 = time.perf_counter()
for _ in range(1000): can_tim in ds_set
t_set  = time.perf_counter() - t0

print(f"\n'in list': {t_list*1000:.2f}ms")
print(f"'in set' : {t_set*1000:.3f}ms  ← Nhanh hơn ~{t_list/t_set:.0f}x!")
```

### ⚠️ Lỗi thường gặp

```python
# LỖI 1: {} rỗng là dict, không phải set!
d = {}         # ← dict rỗng!
s = set()      # ✅ set rỗng

# LỖI 2: Set không có thứ tự — không index được
s = {3, 1, 2}
print(s[0])    # ❌ TypeError: 'set' object is not subscriptable
# ✅ Chuyển sang list nếu cần index
print(list(s)[0])  # Nhưng thứ tự không đảm bảo!

# LỖI 3: Set chỉ chứa phần tử hashable
s = {[1, 2], [3, 4]}   # ❌ TypeError: unhashable type: 'list'
s = {(1, 2), (3, 4)}   # ✅ Tuple được (hashable)
```

---

## 📖 Kiến thức 2: Dictionary (Từ Điển)

### ✅ Giải thích

**Ẩn dụ: Danh bạ điện thoại**

> 📱 Mỗi liên hệ có **TÊN (key)** và **SỐ ĐIỆN THOẠI (value)**.  
> Bạn tìm bằng TÊN → tra ra SỐ ĐIỆN THOẠI ngay lập tức.  
> Không cần dò từ đầu như List!

```
danh_ba = {
    "Mẹ":    "0901234567",     # key: value
    "Thầy Nam": "0912345678",
    "MindX":  "1800xxxx",
}
danh_ba["Mẹ"]   → "0901234567"   # Tra cứu tức thì O(1)
```

**Đặc điểm:**
- **Key** phải duy nhất (như tên trong danh bạ)
- **Key** phải không thể thay đổi (string, number, tuple)
- **Value** có thể là bất cứ thứ gì (kể cả list, dict khác)
- Tra cứu theo key: O(1) — rất nhanh

### 📌 Ví dụ — Đếm từ trong văn bản

**Input:** `"apple banana apple cherry banana apple"`  
**Output:** `{"apple": 3, "banana": 2, "cherry": 1}`

### 💻 Code

```python
# === TẠO VÀ TRUY CẬP DICTIONARY ===
hoc_sinh = {
    "ten"    : "Nguyễn An",
    "lop"    : "10A1",
    "diem"   : [8, 9, 7, 10],
    "dat"    : True,
}

# Truy cập
print(hoc_sinh["ten"])          # → Nguyễn An
print(hoc_sinh.get("tuoi", 16)) # → 16 (mặc định nếu key không tồn tại)

# Thêm / sửa
hoc_sinh["tuoi"]   = 16
hoc_sinh["diem"].append(9)   # Sửa value (list)
print(f"Sau khi thêm: {hoc_sinh}")

# Xóa
del hoc_sinh["dat"]               # Xóa key "dat"
tuoi = hoc_sinh.pop("tuoi", None)  # Xóa và lấy giá trị
print(f"Đã xóa tuoi={tuoi}. Dict còn: {hoc_sinh}")


# === DUYỆT DICTIONARY ===
quan_the = {"Hà Nội": 8_400_000, "HCM": 9_200_000, "Đà Nẵng": 1_200_000}

for thanh_pho, dan_so in quan_the.items():   # Duyệt cặp key-value
    print(f"  {thanh_pho:<12}: {dan_so:>12,} người")

print("Thành phố:", list(quan_the.keys()))     # Chỉ lấy keys
print("Dân số:"  , list(quan_the.values()))    # Chỉ lấy values


# === ĐẾM TỪ XUẤT HIỆN ===
van_ban = "apple banana apple cherry banana apple mango cherry"

dem_tu = {}
for tu in van_ban.split():
    dem_tu[tu] = dem_tu.get(tu, 0) + 1   # get() trả về 0 nếu chưa có
print(f"\nĐếm từ: {dem_tu}")

# Sắp xếp theo số lần xuất hiện
theo_tan_suat = sorted(dem_tu.items(), key=lambda x: x[1], reverse=True)
print("Theo tần suất:")
for tu, so_lan in theo_tan_suat:
    print(f"  '{tu}': {'█' * so_lan} ({so_lan})")


# === DICT LỒNG NHAU (Nested Dict) ===
lop_hoc = {
    "10A1": {
        "si_so": 35,
        "giao_vien_chu_nhiem": "Cô Hoa",
        "diem_trung_binh": 7.8,
    },
    "10A2": {
        "si_so": 32,
        "giao_vien_chu_nhiem": "Thầy Nam",
        "diem_trung_binh": 8.1,
    },
}

for ten_lop, thong_tin in lop_hoc.items():
    print(f"\n  Lớp {ten_lop}: {thong_tin['si_so']} HS | ĐTB: {thong_tin['diem_trung_binh']}")

# Thêm vào nested dict
lop_hoc["10A1"]["hoc_sinh_gioi"] = 12
print(f"\n  Học sinh giỏi 10A1: {lop_hoc['10A1']['hoc_sinh_gioi']}")


# === DICT COMPREHENSION ===
so = [1, 2, 3, 4, 5]

# Cách dài
binh_phuong_dai = {}
for x in so:
    binh_phuong_dai[x] = x ** 2

# Cách ngắn (dict comprehension)
binh_phuong = {x: x**2 for x in so}
print(f"\nBình phương: {binh_phuong}")

# Lọc + comprehension
chan_bp = {x: x**2 for x in so if x % 2 == 0}
print(f"Số chẵn và BP: {chan_bp}")
```

### ⚠️ Lỗi thường gặp

```python
# LỖI 1: Truy cập key không tồn tại
d = {"a": 1}
print(d["b"])          # ❌ KeyError: 'b'
print(d.get("b"))      # ✅ → None (không lỗi)
print(d.get("b", 0))   # ✅ → 0 (giá trị mặc định)

# LỖI 2: Sửa dict trong khi duyệt
d = {"a": 1, "b": 2, "c": 3}
for k in d:
    if d[k] < 2:
        del d[k]           # ❌ RuntimeError: dictionary changed size during iteration
# ✅ Sửa bằng cách duyệt copy
for k in list(d.keys()):
    if d[k] < 2:
        del d[k]

# LỖI 3: Key phải hash được
d = {[1,2]: "value"}   # ❌ TypeError: unhashable type: 'list'
d = {(1,2): "value"}   # ✅ Tuple được
```

---

## 📖 Kiến thức 3: Khi Nào Dùng Gì?

### ✅ Bảng so sánh chiến lược

| Bài toán | Nên dùng | Lý do |
|----------|----------|-------|
| Lưu chuỗi phần tử có thứ tự | **List** | Giữ thứ tự, có index |
| Kiểm tra `x in ...` nhanh | **Set** | O(1) thay vì O(n) |
| Loại bỏ phần tử trùng | **Set** | Tự động loại trùng |
| Toán tử giao, hợp, hiệu | **Set** | Hỗ trợ sẵn |
| Tra cứu theo "tên" → "giá trị" | **Dict** | O(1), trực quan |
| Đếm xuất hiện | **Dict** | `{x: count}` |
| Nhóm dữ liệu theo khóa | **Dict** | `{loai: [items]}` |

---

## 💻 Demo Tổng Hợp — Hệ Thống Phân Tích Học Viên

```python
# ============================================================
#  DEMO TỔNG HỢP: Set + Dict phân tích dữ liệu học viên
# ============================================================

hoc_vien_data = [
    # (ten, khoa_hoc, diem)
    ("An",   "Python", 9.0), ("Bình", "Python", 7.5),
    ("Cúc",  "Web",    8.2), ("Dũng", "Python", 8.0),
    ("Én",   "Web",    9.5), ("Hoa",  "AI",     8.8),
    ("Minh", "AI",     7.0), ("Nam",  "Python", 6.5),
    ("Oanh", "Web",    9.0), ("Phúc", "AI",     9.2),
]

# 1. Set: tất cả khóa học có sẵn
khoa_hoc = {hv[1] for hv in hoc_vien_data}   # Set comprehension
print(f"Các khóa học: {khoa_hoc}")   # Không trùng, không thứ tự

# 2. Dict: nhóm học viên theo khóa
theo_khoa = {}
for ten, khoa, diem in hoc_vien_data:
    if khoa not in theo_khoa:
        theo_khoa[khoa] = []
    theo_khoa[khoa].append((ten, diem))

# 3. Dict: thống kê từng khóa
print("\n=== THỐNG KÊ THEO KHÓA ===")
for khoa, ds in sorted(theo_khoa.items()):
    diem_list = [d for _, d in ds]
    hs_gioi   = {ten for ten, d in ds if d >= 8.5}   # Set tên học viên giỏi
    print(f"\n  Khóa {khoa}:")
    print(f"    Số học viên: {len(ds)}")
    print(f"    ĐTB: {sum(diem_list)/len(diem_list):.2f}")
    print(f"    Cao nhất: {max(diem_list)}")
    print(f"    Xuất sắc (>=8.5): {hs_gioi}")

# 4. Set operations: học viên điểm cao
gioi  = {ten for ten, _, diem in hoc_vien_data if diem >= 8.0}
kha   = {ten for ten, _, diem in hoc_vien_data if 6.5 <= diem < 8.0}
print(f"\n=== PHÂN LOẠI ===")
print(f"Giỏi: {gioi}")
print(f"Khá : {kha}")
print(f"Giỏi nhưng không học Python: {gioi - {ten for ten,k,_ in hoc_vien_data if k=='Python'}}")

# 5. Top 3 học viên
print("\n=== TOP 3 ===")
xep_hang = sorted(hoc_vien_data, key=lambda x: x[2], reverse=True)[:3]
for i, (ten, khoa, diem) in enumerate(xep_hang, 1):
    print(f"  #{i} {ten} ({khoa}): {diem}")
```

---

## 📝 Bài Tập Trên Lớp

### 🟢 Bài 1 (Dễ): Set cơ bản
> `ds1 = [1, 2, 2, 3, 4, 4, 5]`  
> `ds2 = [3, 4, 5, 6, 7]`  
> a) Chuyển sang set, in Hợp, Giao, Hiệu (ds1 - ds2)  
> b) Kiểm tra: `3 in ds1.count > 1` → True/False?  
> c) Đếm số phần tử duy nhất trong `[1,2,2,3,3,3,4]`

### 🟡 Bài 2 (Trung bình): Dict thống kê
> Cho đoạn văn 50 chữ bất kỳ.  
> a) Dùng dict đếm số lần xuất hiện của mỗi từ  
> b) In từ xuất hiện nhiều nhất  
> c) In 5 từ dài nhất (không trùng)  
> d) Dict comprehension: `{tu: len(tu) for tu in ...}`

### 🔴 Bài 3 (Nâng cao nhẹ): Phân tích môn học
> 10 học sinh, mỗi em đăng ký 3-5 môn tùy thích.  
> a) Set: tìm môn được nhiều học sinh chọn nhất  
> b) Dict: `{hoc_sinh: set(mon_hoc)}` — ai học giống nhau nhất?  
> c) Học sinh nào học tất cả các môn "bắt buộc" = {"Toán", "Văn", "Anh"}?

---

## 🏠 Bài Tập Về Nhà

### 🏠 Bài 1: Quản lý kho sản phẩm
> Dict `kho = {ma_sp: {"ten": ..., "so_luong": ..., "gia": ...}}`  
> Hàm `nhap_hang(ma, so_luong)`, `xuat_hang(ma, so_luong)`, `kiem_ke()`, `canh_bao_ton_kho(nguong=5)`  
> Lưu kho ra file JSON (dùng module `json`)

### 🏠 Bài 2: Hệ thống gợi ý môn học
> 20 học viên, mỗi người có set các môn đã học.  
> Hàm `goi_y(hoc_vien_a, hoc_vien_b)` — in "Bạn chưa học những môn này mà B đã học: ..."  
> Hàm `cac_mon_chung_ca_lop(ds_hoc_vien)` — môn nào tất cả mọi người đều học

---

## 🎯 Tổng Kết Buổi 10

**3 điều PHẢI nhớ:**
1. 🔠 **Set:** Không có thứ tự, không trùng, kiểm tra `in` rất nhanh (O(1)), toán tử | & - ^
2. 📖 **Dict:** Tra cứu key→value O(1), `.get(k, default)` tránh KeyError, duyệt bằng `.items()`
3. 🎯 **Chọn đúng cấu trúc:** List khi cần thứ tự/trùng lặp; Set khi kiểm tra/loại trùng; Dict khi mapping

**Buổi tiếp theo (Buổi 11):** Stack và Queue — hai cấu trúc dữ liệu quan trọng dùng trong nhiều thuật toán.

# 🎯 Buổi 14: Thi Cuối Khóa CSB

> **Khóa:** CSB | **Buổi:** 14/14 | **Thời lượng:** 90 phút  
> **Hình thức:** Viết code trên máy | Thi cá nhân | Không tài liệu

---

## 🎯 Mục tiêu Kỳ Thi

Đánh giá toàn diện năng lực Python sau khóa CSB:
- ✅ Python cơ bản (biến, cấu trúc điều kiện, vòng lặp)
- ✅ Danh sách, hàm, xử lý file
- ✅ OOP: thiết kế class, kế thừa, đóng gói, đa hình, trừu tượng
- ✅ Thuật toán: tìm kiếm (linear/binary), sắp xếp (bubble/insertion/quick)
- ✅ Cấu trúc dữ liệu: Set, Dict, Stack, Queue

---

## 🔁 Ôn Bài Trước Thi (15 phút)

**Checklist "Bạn có thể làm được không?"**

| Kỹ năng | Tự đánh giá (✅/⚠️/❌) |
|---------|----------------------|
| Viết hàm với tham số mặc định và return tuple | |
| Tạo List, dùng sort/sorted/comprehension | |
| Đọc/ghi file UTF-8 với try/except | |
| Tạo class với `__init__`, `self`, `__private` | |
| Viết class con kế thừa với `super().__init__()` | |
| Override phương thức, dùng `isinstance()` | |
| Abstract class với `@abstractmethod` | |
| Binary Search – điều kiện và vòng lặp | |
| Quick Sort – pivot, đệ quy, base case | |
| Dùng Dict để đếm/nhóm dữ liệu | |
| Dùng Set cho toán tử giao/hợp/hiệu | |
| Stack (LIFO) và Queue (FIFO) | |

---

## 📝 Đề Thi Cuối Khóa

> **Thời gian:** 75 phút  
> **Tổng điểm:** 10 điểm  
> **Nộp bài:** Nén folder `[HoTen]_CSB_Final.zip` và upload

---

### Phần 1 — Thuật Toán Nền (2 điểm)

**Câu 1.1 (1 điểm):** Sắp xếp và Tìm kiếm

Cho danh sách dân số theo năm (đơn vị: nghìn người):
```python
nam_dan_so = [
    (2018, 96_000), (2020, 97_258), (2015, 91_713), (2022, 99_461),
    (2016, 92_695), (2019, 96_484), (2021, 98_507), (2017, 93_672),
]
```

a) Dùng **Insertion Sort** sắp xếp danh sách theo **năm** tăng dần  
b) Dùng **Binary Search** tìm dân số năm 2020  
c) Dùng **Quick Sort** sắp xếp theo **dân số** giảm dần, in Top 3

---

**Câu 1.2 (1 điểm):** Set và Dict

Cho dữ liệu bán hàng:
```python
don_hangs = [
    {"khach": "An",   "san_pham": "Laptop",  "gia": 12_000_000},
    {"khach": "Bình", "san_pham": "Chuột",   "gia":    250_000},
    {"khach": "An",   "san_pham": "Bàn phím","gia":  1_800_000},
    {"khach": "Cúc",  "san_pham": "Laptop",  "gia": 12_000_000},
    {"khach": "Bình", "san_pham": "Laptop",  "gia": 12_000_000},
    {"khach": "An",   "san_pham": "Chuột",   "gia":    250_000},
]
```

a) Dùng Set: in tên tất cả khách hàng duy nhất  
b) Dùng Dict: tính tổng doanh thu của từng khách hàng  
c) Dùng Dict: đếm số lần mỗi sản phẩm được mua  
d) Set operations: khách mua "Laptop" và khách mua "Chuột" — ai mua cả hai?

---

### Phần 2 — OOP (5 điểm)

**Câu 2 — Hệ thống quản lý phòng gym**

Xây dựng hệ thống quản lý phòng gym theo yêu cầu:

**Abstract class `ThietBi(ABC)` (0.5 điểm)**
- `ten`, `so_serial`, `năm_san_xuat`
- Abstract methods: `kiem_tra_tinh_trang()`, `mo_ta()`
- Method có sẵn: `tuoi_thiet_bi()` → trả về năm hiện tại - năm sản xuất

**Class `MayChay(ThietBi)` và `TaGan(ThietBi)` (1 điểm)**
- `MayChay`: thêm `toc_do_max_kmh`, `gio_su_dung = 0`  
  - `kiem_tra_tinh_trang()` → nếu giờ sử dụng > 1000 in cảnh báo bảo dưỡng
  - `chay(gio)` → cộng vào `gio_su_dung`
- `TaGan`: thêm `trong_luong_kg`, `so_lan_dung = 0`  
  - `kiem_tra_tinh_trang()` → nếu số lần dùng > 500 in cảnh báo thay thế
  - `nang(so_lan)` → cộng vào `so_lan_dung`

**Class `ThanhVien` (1 điểm)**
- `ten`, `hang_thanh_vien` (Bạc/Vàng/Kim Cương), `ngay_dang_ky`
- `__du_lieu_the_duc = []` — private — lưu tuple (thiet_bi.ten, thoi_gian)
- `thuc_hien_bai_tap(thiet_bi, thoi_gian_phut)` — thêm vào `__du_lieu_the_duc`
- `xem_lich_su()` — in lịch sử tập luyện
- `tinh_tong_thoi_gian()` → tổng phút đã tập
- `loi_ich_hang()` → dựa vào `hang_thanh_vien` in lợi ích (Bạc: 10% off, Vàng: 20% off + guest pass, Kim Cương: all-access + 1 PT session)

**Class `PhongGym` (2.5 điểm)**
- `ten`, `dia_chi`
- `__danh_sach_thiet_bi: List[ThietBi]` — private
- `__danh_sach_thanh_vien: List[ThanhVien]` — private
- `them_thiet_bi(tb)`, `xoa_thiet_bi(so_serial)`
- `them_thanh_vien(tv)`, `tim_thanh_vien(tu_khoa)` — linear search
- `kiem_tra_tat_ca_thiet_bi()` — gọi `kiem_tra_tinh_trang()` cho tất cả thiết bị
- `xep_hang_thanh_vien()` — sort theo tổng thời gian tập (quick sort)
- `thong_ke_theo_hang()` — dict: {hang: so_luong_thanh_vien}
- `luu_bao_cao(ten_file)` — ghi file: thống kê + top 5 thành viên

---

### Phần 3 — Tổng Hợp (3 điểm)

**Câu 3 — Stack + Queue trong Gym**

Bổ sung vào hệ thống:

a) *(1.5 điểm)* `HangDoiThietBi` (dùng Queue):
- Khi thiết bị đang được dùng, thành viên vào hàng đợi
- Method `dat_cho(thanh_vien)`, `thong_bao_xong()` — phục vụ người tiếp theo
- In thông báo "Kính mời [tên] sử dụng [thiết bị]"

b) *(1.5 điểm)* `LichSuBuoiTap` (dùng Stack):
- Mỗi thành viên có stack lưu 10 buổi tập gần nhất
- Method `ghi_buoi_tap(mo_ta)`, `xem_3_buoi_gan_nhat()`, `hoan_tac_buoi_cuoi()`
- Mô phỏng 15 buổi tập, huỷ 2 buổi cuối

---

## 📋 Đáp Án Tham Khảo — Phần 1

### Câu 1.1

```python
# Dữ liệu
nam_dan_so = [
    (2018, 96_000), (2020, 97_258), (2015, 91_713), (2022, 99_461),
    (2016, 92_695), (2019, 96_484), (2021, 98_507), (2017, 93_672),
]

# (a) Insertion Sort theo năm
def insertion_sort_tuples(ds, key_idx=0):
    arr = ds.copy()
    for i in range(1, len(arr)):
        khoa = arr[i]
        j    = i - 1
        while j >= 0 and arr[j][key_idx] > khoa[key_idx]:
            arr[j+1] = arr[j]; j -= 1
        arr[j+1] = khoa
    return arr

theo_nam = insertion_sort_tuples(nam_dan_so, key_idx=0)
print("Theo năm:", theo_nam)

# (b) Binary Search năm 2020
theo_nam_sort = sorted(nam_dan_so, key=lambda x: x[0])
nam_list = [t[0] for t in theo_nam_sort]
t, p = 0, len(nam_list)-1
while t <= p:
    g = (t+p)//2
    if nam_list[g] == 2020: print(f"2020: {theo_nam_sort[g][1]:,} nghìn"); break
    elif nam_list[g] < 2020: t = g+1
    else: p = g-1

# (c) Quick Sort theo dân số giảm dần
def qsort_giam(ds):
    if len(ds) <= 1: return ds
    pivot = ds[-1][1]
    lon  = [x for x in ds[:-1] if x[1] > pivot]
    bang = [x for x in ds[:-1] if x[1] == pivot]
    nho  = [x for x in ds[:-1] if x[1] < pivot]
    return qsort_giam(lon) + bang + [ds[-1]] + qsort_giam(nho)

theo_ds = qsort_giam(nam_dan_so)
print("Top 3 dân số lớn nhất:")
for nam, ds in theo_ds[:3]:
    print(f"  {nam}: {ds:,} nghìn người")
```

### Câu 1.2

```python
don_hangs = [
    {"khach": "An",   "san_pham": "Laptop",   "gia": 12_000_000},
    {"khach": "Bình", "san_pham": "Chuột",    "gia":    250_000},
    {"khach": "An",   "san_pham": "Bàn phím", "gia":  1_800_000},
    {"khach": "Cúc",  "san_pham": "Laptop",   "gia": 12_000_000},
    {"khach": "Bình", "san_pham": "Laptop",   "gia": 12_000_000},
    {"khach": "An",   "san_pham": "Chuột",    "gia":    250_000},
]

# (a) Set khách hàng duy nhất
khach_duy_nhat = {dh["khach"] for dh in don_hangs}
print(f"(a) Khách hàng: {khach_duy_nhat}")

# (b) Tổng doanh thu theo khách
doanh_thu = {}
for dh in don_hangs:
    doanh_thu[dh["khach"]] = doanh_thu.get(dh["khach"], 0) + dh["gia"]
print(f"(b) Doanh thu: {doanh_thu}")
for k, v in sorted(doanh_thu.items(), key=lambda x: x[1], reverse=True):
    print(f"    {k}: {v:,}đ")

# (c) Đếm sản phẩm được mua
dem_sp = {}
for dh in don_hangs:
    dem_sp[dh["san_pham"]] = dem_sp.get(dh["san_pham"], 0) + 1
print(f"(c) Số lần mua: {dem_sp}")

# (d) Set operations
mua_laptop = {dh["khach"] for dh in don_hangs if dh["san_pham"] == "Laptop"}
mua_chuot  = {dh["khach"] for dh in don_hangs if dh["san_pham"] == "Chuột"}
ca_hai     = mua_laptop & mua_chuot
print(f"(d) Mua cả Laptop và Chuột: {ca_hai}")
```

---

## 🎯 Tiêu Chí Chấm Điểm Cuối Khóa

| Tiêu chí | Trọng số | Ghi chú |
|----------|----------|---------|
| **Đúng logic, kết quả chính xác** | 45% | Test case pass |
| **OOP đúng chuẩn** | 25% | Encapsulation, Inheritance, Polymorphism, Abstraction đầy đủ |
| **Không có lỗi runtime** | 15% | Code chạy được trước khi submit |
| **Code sạch, tổ chức tốt** | 10% | Tên biến/hàm rõ ràng, có comment quan trọng |
| **Xử lý edge case** | 5% | List rỗng, giá trị âm, file I/O lỗi |

---

## 🏆 Chứng Chỉ Hoàn Thành

> Học viên đạt **≥ 7.0/10** sẽ nhận Chứng Chỉ Hoàn Thành Khóa CSB.  
> Học viên đạt **≥ 9.0/10** sẽ nhận Chứng Chỉ **Xuất Sắc** kèm thư giới thiệu.

---

## 🚀 Tiếp Theo Sau CSB

Sau khi hoàn thành CSB, học viên có thể học tiếp:

| Khóa | Nội dung | Điều kiện |
|------|----------|-----------|
| **CSA** | Data Science: pandas, matplotlib, sklearn | CSB ≥ 7.0 |
| **CSI** | AI/Deep Learning: TensorFlow, Keras, Streamlit | CSB ≥ 8.0 |

---

**Chúc tất cả học viên làm bài tốt! 🎉**

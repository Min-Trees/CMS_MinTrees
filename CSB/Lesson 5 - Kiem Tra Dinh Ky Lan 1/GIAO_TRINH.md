# 🎯 Buổi 5: Kiểm Tra Định Kỳ Lần 1

> **Khóa:** CSB | **Buổi:** 5/14 | **Thời lượng:** 90 phút  
> **Hình thức:** Viết code trên máy | **Không được tra cứu tài liệu ngoài**

---

## 🎯 Mục tiêu

- ✅ Đánh giá mức độ hiểu biết về Python cơ bản (Buổi 1–2)
- ✅ Đánh giá khả năng áp dụng OOP (Buổi 3–4)
- ✅ Học sinh nhận diện được điểm mạnh / điểm cần cải thiện

---

## 🔁 Ôn Bài Trước Kiểm Tra (15 phút)

**Checklist tự kiểm tra — hỏi thầy/cô nếu chưa nắm:**

**Python Cơ Bản (Buổi 1)**
- [ ] Khai báo biến, 4 kiểu dữ liệu cơ bản
- [ ] `if/elif/else` — điều kiện lồng nhau
- [ ] `for i in range(...)` vs `for x in list`
- [ ] `while` và cách thoát vòng lặp

**Danh Sách, Hàm, File (Buổi 2)**
- [ ] Tạo, truy cập, thay đổi list (append, remove, pop, sort, slice)
- [ ] `def ham(tham_so, mac_dinh=gia_tri)` + `return`
- [ ] `with open("file", "r/w/a", encoding="utf-8") as f:`
- [ ] List comprehension: `[x for x in ds if dk]`

**OOP (Buổi 3–4)**
- [ ] Định nghĩa class, `__init__`, `self`
- [ ] `__private` + getter/setter
- [ ] `class Con(Cha)` + `super().__init__()`
- [ ] Override phương thức
- [ ] `from abc import ABC, abstractmethod`

---

## 📝 Đề Kiểm Tra

> **Thời gian:** 60 phút  
> **Điểm tối đa:** 10 điểm  
> **Yêu cầu:** Code phải chạy được, không có lỗi khi submit

---

### Phần 1: Python Cơ Bản (3 điểm)

**Câu 1.1 – List và Hàm (1.5 điểm)**

Viết hàm `phan_tich_nhiet_do(ds_nhiet_do)` nhận vào một danh sách nhiệt độ (số nguyên hoặc thực) và trả về dictionary chứa:
- `"cao_nhat"`: nhiệt độ cao nhất
- `"thap_nhat"`: nhiệt độ thấp nhất  
- `"trung_binh"`: nhiệt độ trung bình (làm tròn 1 chữ số thập phân)
- `"so_ngay_nong"`: số ngày có nhiệt độ ≥ 35°C

Test với: `[28, 35, 40, 32, 38, 25, 35, 29]`

**Kết quả mong đợi:**
```
cao_nhat   : 40
thap_nhat  : 25
trung_binh : 32.8
so_ngay_nong: 4
```

---

**Câu 1.2 – File I/O (1.5 điểm)**

1. Viết hàm `ghi_nhiet_do_file(ds, ten_file)` — ghi danh sách nhiệt độ ra file, mỗi dòng một giá trị
2. Viết hàm `doc_nhiet_do_file(ten_file)` — đọc file và trả về list các giá trị số thực
3. Ghi danh sách từ Câu 1.1 ra file `nhiet_do.txt`, đọc lại và in thống kê

---

### Phần 2: OOP (5 điểm)

**Câu 2 – Xây dựng hệ thống quản lý thư viện (5 điểm)**

Xây dựng hệ thống với các class sau:

**Class `Sach` (1.5 điểm)**
- Thuộc tính: `ten_sach`, `tac_gia`, `nam_xuat_ban`
- `__so_trang` là private
- Getter cho `so_trang`
- Phương thức `gioi_thieu()` — in thông tin đẹp
- Phương thức `__str__()` — trả về chuỗi mô tả ngắn

**Class `SachGiaoKhoa(Sach)` và `SachThamKhao(Sach)` (1.5 điểm)**  
- `SachGiaoKhoa`: thêm thuộc tính `mon_hoc`, `lop_su_dung`
- `SachThamKhao`: thêm thuộc tính `linh_vuc`, `do_kho` (dễ/trung bình/khó)
- Cả hai override `gioi_thieu()` để in thêm thông tin riêng

**Class `ThuVien` (2 điểm)**
- `__danh_sach_sach` là private (list)
- `them_sach(sach)` — thêm sách vào thư viện
- `tim_kiem(tu_khoa)` — tìm sách theo tên hoặc tác giả (so sánh không phân biệt hoa thường)
- `sap_xep_theo_nam()` — trả về list sách sắp xếp theo năm xuất bản
- `thong_ke()` — in tổng số sách, số SGK, số sách tham khảo

---

### Phần 3: Thực hành tổng hợp (2 điểm) — Bonus

**Câu 3 – Kết hợp ThuVien + File**

Viết hàm:
- `luu_thu_vien(thu_vien, ten_file)` — lưu thông tin tất cả sách ra file text
- `tai_thu_vien(ten_file)` — đọc file, tạo lại các object Sach và trả về ThuVien

*(Hint: Lưu mỗi sách trên 1 dòng, các trường ngăn cách bằng `|`)*

---

## 📋 Đáp Án Tham Khảo

### Đáp án Câu 1.1

```python
def phan_tich_nhiet_do(ds_nhiet_do):
    if not ds_nhiet_do:
        return {}
    return {
        "cao_nhat"     : max(ds_nhiet_do),
        "thap_nhat"    : min(ds_nhiet_do),
        "trung_binh"   : round(sum(ds_nhiet_do) / len(ds_nhiet_do), 1),
        "so_ngay_nong" : sum(1 for t in ds_nhiet_do if t >= 35),
    }

nhiet_do = [28, 35, 40, 32, 38, 25, 35, 29]
ket_qua  = phan_tich_nhiet_do(nhiet_do)
for k, v in ket_qua.items():
    print(f"{k:<15}: {v}")
```

### Đáp án Câu 1.2

```python
import os

def ghi_nhiet_do_file(ds, ten_file):
    with open(ten_file, "w", encoding="utf-8") as f:
        for nhiet_do in ds:
            f.write(f"{nhiet_do}\n")

def doc_nhiet_do_file(ten_file):
    with open(ten_file, "r", encoding="utf-8") as f:
        return [float(dong.strip()) for dong in f if dong.strip()]

nhiet_do = [28, 35, 40, 32, 38, 25, 35, 29]
ghi_nhiet_do_file(nhiet_do, "nhiet_do.txt")
ds_doc   = doc_nhiet_do_file("nhiet_do.txt")
ket_qua  = phan_tich_nhiet_do(ds_doc)
print("\nThống kê sau khi đọc từ file:")
for k, v in ket_qua.items():
    print(f"  {k:<15}: {v}")
os.remove("nhiet_do.txt")
```

### Đáp án Câu 2 (đầy đủ)

```python
class Sach:
    def __init__(self, ten_sach, tac_gia, nam_xuat_ban, so_trang):
        self.ten_sach      = ten_sach
        self.tac_gia       = tac_gia
        self.nam_xuat_ban  = nam_xuat_ban
        self.__so_trang    = so_trang

    def get_so_trang(self):  return self.__so_trang

    def gioi_thieu(self):
        print(f"  📚 {self.ten_sach} | {self.tac_gia} | {self.nam_xuat_ban} | {self.__so_trang} trang")

    def __str__(self):
        return f"{self.ten_sach} ({self.tac_gia}, {self.nam_xuat_ban})"


class SachGiaoKhoa(Sach):
    def __init__(self, ten, tac_gia, nam, so_trang, mon_hoc, lop):
        super().__init__(ten, tac_gia, nam, so_trang)
        self.mon_hoc       = mon_hoc
        self.lop_su_dung   = lop

    def gioi_thieu(self):
        super().gioi_thieu()
        print(f"    → SGK {self.mon_hoc} | Lớp: {self.lop_su_dung}")


class SachThamKhao(Sach):
    def __init__(self, ten, tac_gia, nam, so_trang, linh_vuc, do_kho):
        super().__init__(ten, tac_gia, nam, so_trang)
        self.linh_vuc  = linh_vuc
        self.do_kho    = do_kho

    def gioi_thieu(self):
        super().gioi_thieu()
        print(f"    → Lĩnh vực: {self.linh_vuc} | Độ khó: {self.do_kho}")


class ThuVien:
    def __init__(self, ten):
        self.ten               = ten
        self.__danh_sach_sach  = []

    def them_sach(self, sach):
        self.__danh_sach_sach.append(sach)

    def tim_kiem(self, tu_khoa):
        tu_khoa = tu_khoa.lower()
        return [
            s for s in self.__danh_sach_sach
            if tu_khoa in s.ten_sach.lower() or tu_khoa in s.tac_gia.lower()
        ]

    def sap_xep_theo_nam(self):
        return sorted(self.__danh_sach_sach, key=lambda s: s.nam_xuat_ban)

    def thong_ke(self):
        print(f"\n=== {self.ten} ===")
        print(f"  Tổng số sách    : {len(self.__danh_sach_sach)}")
        print(f"  Sách giáo khoa  : {sum(1 for s in self.__danh_sach_sach if isinstance(s, SachGiaoKhoa))}")
        print(f"  Sách tham khảo  : {sum(1 for s in self.__danh_sach_sach if isinstance(s, SachThamKhao))}")


# Test
tv = ThuVien("Thư viện MindX")
tv.them_sach(SachGiaoKhoa("Toán 10", "Bộ GD", 2022, 180, "Toán", "10"))
tv.them_sach(SachGiaoKhoa("Vật Lý 11", "Bộ GD", 2023, 160, "Vật Lý", "11"))
tv.them_sach(SachThamKhao("Python Cơ Bản", "Nguyễn A", 2021, 350, "Lập Trình", "Dễ"))
tv.them_sach(SachThamKhao("Giải Thuật Nâng Cao", "Trần B", 2020, 500, "KHMT", "Khó"))

tv.thong_ke()

print("\nSắp xếp theo năm:")
for s in tv.sap_xep_theo_nam():
    s.gioi_thieu()

print("\nTìm kiếm 'python':")
for s in tv.tim_kiem("python"): s.gioi_thieu()
```

---

## 🎯 Tiêu Chí Chấm Điểm

| Tiêu chí | Điểm | Mô tả |
|----------|------|-------|
| Code chạy không lỗi | bắt buộc | Nếu lỗi runtime, mất 50% điểm phần đó |
| Logic đúng | 60% | Thuật toán, điều kiện, kết quả đúng |
| OOP đúng chuẩn | 25% | Encapsulation, Inheritance, Override |
| Code sạch, có comment | 15% | Đặt tên biến/hàm rõ ràng, có ghi chú |

---

## 📌 Hướng Dẫn Phát Đề

1. Tạo folder `bai_kiem_tra/[ten_hoc_vien]/` trên máy học viên
2. Học viên viết code trong file `bai_kiem_tra.py`
3. Khi nộp: `Zip` folder, đổi tên thành `[HoTen]_CSB_KT1.zip`
4. Gửi qua Google Classroom hoặc email giảng viên

---

## 🎯 Nhận Xét Chung Sau Khi Chấm

*(Điền sau khi chấm bài)*

| Lỗi phổ biến | Số HS mắc | Hướng khắc phục |
|-------------|-----------|-----------------|
| Quên `self.` khi khai báo attribute | | Nhắc lại buổi 3 |
| `sort()` thay vì `sorted()` | | Demo lại sự khác biệt |
| Quên `encoding="utf-8"` file | | Rule: luôn ghi encoding |
| Không gọi `super().__init__()` | | Demo lỗi scope attribute |

---

**Buổi tiếp theo (Buổi 6):** Thuật toán Tìm kiếm — Linear Search và Binary Search.

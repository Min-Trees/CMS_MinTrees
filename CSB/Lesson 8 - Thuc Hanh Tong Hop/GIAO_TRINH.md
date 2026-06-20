# 🎯 Buổi 8: Thực Hành Tổng Hợp

> **Khóa:** CSB | **Buổi:** 8/14 | **Thời lượng:** 90 phút  
> **Tính chất:** Buổi project — áp dụng toàn bộ kiến thức đã học

---

## 🎯 Mục tiêu

Sau buổi này học viên làm được:
- ✅ Kết hợp OOP + List + Tìm kiếm + Sắp xếp + File vào 1 project hoàn chỉnh
- ✅ Thiết kế class với quan hệ hợp lý (Hợp thành, không chỉ Kế thừa)
- ✅ Xây dựng menu tương tác đơn giản bằng `input()`
- ✅ Xử lý lỗi cơ bản với `try/except`

---

## 🔁 Ôn bài cũ (10 phút)

**Câu hỏi tổng hợp (chọn 2 câu để thảo luận):**
1. Vẽ sơ đồ: Bubble Sort, Insertion Sort, Quick Sort — mô tả ẩn dụ của từng cái
2. Tại sao Quick Sort cần base case? Điều gì xảy ra nếu bỏ đi?
3. Viết nhanh hàm `tim_phan_tu_lon_thu_k(ds, k)` — không dùng `sorted()`

**Warm-up Code (5 phút):**
```python
# Kết quả của đoạn này là gì?
ds = [{"ten": "An", "diem": 9}, {"ten": "Bình", "diem": 7}, {"ten": "Cúc", "diem": 8}]
ket_qua = sorted(ds, key=lambda x: x["diem"], reverse=True)
print([x["ten"] for x in ket_qua])
```

---

## 📖 Kiến thức 1: Xử lý Lỗi với try/except

### ✅ Giải thích

**Ẩn dụ: Lưới an toàn của diễn viên xiếc**

> 🎪 Diễn viên nhào lộn mà không có lưới an toàn = nguy hiểm.  
> Lập trình mà không có try/except = chương trình "chết" khi gặp input sai.

```python
# ❌ Không có xử lý lỗi
diem = float(input("Nhập điểm: "))   # User nhập "abc" → crash!

# ✅ Có xử lý lỗi
try:
    diem = float(input("Nhập điểm: "))  # Thử chạy
    print(f"Điểm: {diem}")
except ValueError:
    print("Lỗi: Vui lòng nhập số!")    # Bắt lỗi nếu không phải số
except Exception as e:
    print(f"Lỗi không mong đợi: {e}")  # Bắt mọi lỗi khác
finally:
    print("Luôn chạy dù lỗi hay không")  # Dọn dẹp
```

### 💻 Code — Nhập liệu an toàn

```python
def nhap_so_hop_le(thong_bao, kieu=float, nho_nhat=None, lon_nhat=None):
    """Vòng lặp nhập liệu đến khi nhập đúng."""
    while True:
        try:
            gia_tri = kieu(input(thong_bao))
            if nho_nhat is not None and gia_tri < nho_nhat:
                print(f"  Phải >= {nho_nhat}")
                continue
            if lon_nhat is not None and gia_tri > lon_nhat:
                print(f"  Phải <= {lon_nhat}")
                continue
            return gia_tri
        except ValueError:
            print(f"  Lỗi: Vui lòng nhập {'số nguyên' if kieu == int else 'số'}!")

# Test:
# tuoi = nhap_so_hop_le("Tuổi: ", kieu=int, nho_nhat=1, lon_nhat=120)
# diem = nhap_so_hop_le("Điểm (0-10): ", nho_nhat=0, lon_nhat=10)
```

---

## 📖 Kiến thức 2: Thiết Kế Class – Hợp Thành vs Kế Thừa

### ✅ Giải thích

> 🚗 **Kế thừa (IS-A):** "Xe tải IS-A (là một loại) Phương Tiện" → `class XeTai(PhuongTien)`  
> 🔧 **Hợp Thành (HAS-A):** "Xe hơi HAS-A (có một) Động Cơ" → `class XeHoi: self.dong_co = DongCo()`

**Quy tắc:** Nếu câu hỏi "A là một loại B?" → Kế thừa  
Nếu câu hỏi "A có một B?" → Hợp Thành

```python
# HỢP THÀNH: ThuVien CÓ NHIỀU Sach
class ThuVien:
    def __init__(self):
        self.__danh_sach = []    # List các object Sach

    def them_sach(self, sach):   # sach là object của class Sach
        self.__danh_sach.append(sach)
```

---

## 💻 Demo Tổng Hợp — Hệ thống Quản lý Thư Viện

```python
# ============================================================
#  PROJECT: Hệ thống quản lý sách thư viện
#  Áp dụng: OOP (4 tính chất) + List + Tìm kiếm + Sắp xếp + File
# ============================================================

import os

# ── Class Sach ──────────────────────────────────────────────

class Sach:
    """Đại diện một cuốn sách trong thư viện."""

    def __init__(self, ma, ten, tac_gia, the_loai, nam_xb, so_trang):
        self.ma       = ma
        self.ten      = ten
        self.tac_gia  = tac_gia
        self.the_loai = the_loai
        self.nam_xb   = nam_xb
        self.__so_trang = so_trang   # Private
        self.__muon     = False       # Private – đang được mượn?

    def get_so_trang(self): return self.__so_trang
    def dang_muon(self):    return self.__muon

    def muon_sach(self):
        if self.__muon:
            print(f"  ✗ '{self.ten}' đang được mượn!")
            return False
        self.__muon = True
        print(f"  ✓ Mượn thành công: '{self.ten}'")
        return True

    def tra_sach(self):
        if not self.__muon:
            print(f"  ✗ '{self.ten}' chưa được mượn!")
            return False
        self.__muon = False
        print(f"  ✓ Trả sách: '{self.ten}'")
        return True

    def __str__(self):
        trang_thai = "📤 Đang mượn" if self.__muon else "📚 Có sẵn"
        return (f"[{self.ma}] {self.ten[:25]:<25} | {self.tac_gia:<15} "
                f"| {self.the_loai:<12} | {self.nam_xb} | {trang_thai}")

    def to_csv_line(self):
        """Chuyển thành dòng CSV để lưu file."""
        return f"{self.ma}|{self.ten}|{self.tac_gia}|{self.the_loai}|{self.nam_xb}|{self.__so_trang}|{int(self.__muon)}\n"


# ── Class ThuVien ────────────────────────────────────────────

class ThuVien:
    """Hệ thống quản lý thư viện."""

    def __init__(self, ten_thu_vien, ten_file="thu_vien.txt"):
        self.ten        = ten_thu_vien
        self.__file     = ten_file
        self.__sach     = []
        self._tai_du_lieu()   # Tự tải dữ liệu khi khởi tạo

    # ── Quản lý dữ liệu (File I/O) ─────────────────────────

    def _tai_du_lieu(self):
        """Đọc file, tạo lại danh sách sách."""
        if not os.path.exists(self.__file):
            return
        try:
            with open(self.__file, "r", encoding="utf-8") as f:
                for dong in f:
                    dong = dong.strip()
                    if not dong: continue
                    parts   = dong.split("|")
                    if len(parts) < 7: continue
                    ma, ten, tg, loai, nam, trang, muon = parts
                    sach = Sach(ma, ten, tg, loai, int(nam), int(trang))
                    if int(muon): sach.muon_sach()
                    self.__sach.append(sach)
            print(f"  ✓ Tải {len(self.__sach)} cuốn sách từ file.")
        except Exception as e:
            print(f"  ✗ Lỗi đọc file: {e}")

    def luu_du_lieu(self):
        """Ghi toàn bộ danh sách sách ra file."""
        try:
            with open(self.__file, "w", encoding="utf-8") as f:
                for sach in self.__sach:
                    f.write(sach.to_csv_line())
            print(f"  ✓ Đã lưu {len(self.__sach)} sách vào '{self.__file}'")
        except Exception as e:
            print(f"  ✗ Lỗi ghi file: {e}")

    # ── CRUD ──────────────────────────────────────────────────

    def them_sach(self, sach):
        # Kiểm tra trùng mã
        if any(s.ma == sach.ma for s in self.__sach):
            print(f"  ✗ Mã {sach.ma} đã tồn tại!")
            return False
        self.__sach.append(sach)
        print(f"  ✓ Thêm: '{sach.ten}'")
        return True

    def xoa_sach(self, ma):
        for i, s in enumerate(self.__sach):
            if s.ma == ma:
                if s.dang_muon():
                    print(f"  ✗ Sách đang được mượn, không thể xóa!")
                    return False
                ten = self.__sach.pop(i).ten
                print(f"  ✓ Đã xóa: '{ten}'")
                return True
        print(f"  ✗ Không tìm thấy mã {ma}!")
        return False

    # ── Tìm kiếm (Linear Search) ──────────────────────────────

    def tim_theo_ma(self, ma):
        """Binary search theo mã (nếu đã sort theo mã)."""
        ds_sort = sorted(self.__sach, key=lambda s: s.ma)
        mas     = [s.ma for s in ds_sort]
        trai, phai = 0, len(mas) - 1
        while trai <= phai:
            giua = (trai + phai) // 2
            if mas[giua] == ma:       return ds_sort[giua]
            elif mas[giua] < ma:      trai = giua + 1
            else:                     phai = giua - 1
        return None

    def tim_theo_tu_khoa(self, tu_khoa):
        """Linear search — tìm theo tên hoặc tác giả."""
        tk = tu_khoa.lower()
        return [s for s in self.__sach
                if tk in s.ten.lower() or tk in s.tac_gia.lower()]

    def tim_theo_the_loai(self, the_loai):
        return [s for s in self.__sach if s.the_loai.lower() == the_loai.lower()]

    # ── Sắp xếp ─────────────────────────────────────────────

    def sap_xep(self, tieu_chi="ten"):
        """Soft copy đã sắp xếp theo tiêu chí."""
        if tieu_chi == "ten":    return sorted(self.__sach, key=lambda s: s.ten)
        if tieu_chi == "nam":    return sorted(self.__sach, key=lambda s: s.nam_xb)
        if tieu_chi == "trang":  return sorted(self.__sach, key=lambda s: s.get_so_trang(), reverse=True)
        return self.__sach[:]

    # ── Thống kê ─────────────────────────────────────────────

    def thong_ke(self):
        if not self.__sach:
            print("  Thư viện trống!")
            return
        print(f"\n=== {self.ten.upper()} ===")
        print(f"  Tổng số sách   : {len(self.__sach)}")
        print(f"  Đang được mượn : {sum(1 for s in self.__sach if s.dang_muon())}")
        print(f"  Có sẵn         : {sum(1 for s in self.__sach if not s.dang_muon())}")
        # Thể loại phổ biến
        the_loai = {}
        for s in self.__sach:
            the_loai[s.the_loai] = the_loai.get(s.the_loai, 0) + 1
        pho_bien = max(the_loai, key=the_loai.get)
        print(f"  Thể loại nhiều : {pho_bien} ({the_loai[pho_bien]} cuốn)")

    def in_danh_sach(self, ds=None):
        ds = ds if ds is not None else self.__sach
        if not ds:
            print("  (Không có sách)")
            return
        print(f"  {'Mã':<8} {'Tên sách':<27} {'Tác giả':<15} {'Thể loại':<12} {'Năm'} {'Trạng thái'}")
        print("  " + "-" * 85)
        for s in ds:
            print(f"  {s}")


# ── CHƯƠNG TRÌNH CHÍNH ────────────────────────────────────────

def menu():
    print("\n" + "="*40)
    print("    📚 THƯ VIỆN MINDX")
    print("="*40)
    print("  1. Xem danh sách sách")
    print("  2. Thêm sách mới")
    print("  3. Tìm kiếm sách")
    print("  4. Mượn sách")
    print("  5. Trả sách")
    print("  6. Sắp xếp danh sách")
    print("  7. Thống kê")
    print("  8. Lưu và thoát")
    print("="*40)


def chay_chuong_trinh():
    tv = ThuVien("Thư Viện MindX")

    # Thêm sách mẫu nếu chưa có dữ liệu
    if not tv._ThuVien__sach:
        for s in [
            Sach("P001", "Python Cơ Bản",          "Nguyễn A",   "Lập Trình", 2022, 350),
            Sach("P002", "Thuật Toán và CTDL",      "Trần B",     "Lập Trình", 2021, 480),
            Sach("M001", "Giải Tích 1",              "Lê C",       "Toán Học",  2020, 400),
            Sach("L001", "Lịch Sử Việt Nam",        "Phạm D",     "Lịch Sử",   2019, 300),
            Sach("T001", "Vật Lý Đại Cương",        "Hoàng E",    "Khoa Học",  2023, 520),
        ]:
            tv.them_sach(s)

    while True:
        menu()
        try:
            lua_chon = input("  Chọn (1-8): ").strip()
        except (KeyboardInterrupt, EOFError):
            break

        if lua_chon == "1":
            tv.in_danh_sach()

        elif lua_chon == "2":
            print("\n  --- Thêm sách mới ---")
            ma     = input("  Mã sách: ").strip().upper()
            ten    = input("  Tên sách: ").strip()
            tg     = input("  Tác giả: ").strip()
            loai   = input("  Thể loại: ").strip()
            try:
                nam   = int(input("  Năm XB: "))
                trang = int(input("  Số trang: "))
                tv.them_sach(Sach(ma, ten, tg, loai, nam, trang))
            except ValueError:
                print("  ✗ Năm và số trang phải là số nguyên!")

        elif lua_chon == "3":
            tk = input("  Từ khóa (tên/tác giả): ").strip()
            ket_qua = tv.tim_theo_tu_khoa(tk)
            print(f"\n  Tìm thấy {len(ket_qua)} kết quả:")
            tv.in_danh_sach(ket_qua)

        elif lua_chon == "4":
            ma   = input("  Mã sách cần mượn: ").strip().upper()
            sach = tv.tim_theo_ma(ma)
            if sach: sach.muon_sach()
            else:    print(f"  ✗ Không tìm thấy mã {ma}")

        elif lua_chon == "5":
            ma   = input("  Mã sách cần trả: ").strip().upper()
            sach = tv.tim_theo_ma(ma)
            if sach: sach.tra_sach()
            else:    print(f"  ✗ Không tìm thấy mã {ma}")

        elif lua_chon == "6":
            tieu_chi = input("  Sắp xếp theo (ten/nam/trang): ").strip().lower()
            ds_sort  = tv.sap_xep(tieu_chi)
            tv.in_danh_sach(ds_sort)

        elif lua_chon == "7":
            tv.thong_ke()

        elif lua_chon == "8":
            tv.luu_du_lieu()
            print("  Tạm biệt! 👋")
            break
        else:
            print("  ✗ Lựa chọn không hợp lệ!")

    # Dọn dẹp file demo
    if os.path.exists("thu_vien.txt"):
        os.remove("thu_vien.txt")


# Chạy chương trình (demo không dùng input tương tác để tránh block terminal)
print("=== DEMO KHÔNG TƯƠNG TÁC ===")
tv = ThuVien("Demo Library", "demo_lib.txt")
for s in [
    Sach("B001", "Clean Code",        "Robert Martin", "Dev",    2008, 431),
    Sach("B002", "The Pragmatic Prog","Andy Hunt",     "Dev",    1999, 352),
    Sach("B003", "Python Cookbook",   "David Beazley", "Python", 2013, 706),
]:
    tv.them_sach(s)

tv.thong_ke()
print("\nDanh sách theo tên:")
tv.in_danh_sach(tv.sap_xep("ten"))

print("\nTìm 'python':")
tv.in_danh_sach(tv.tim_theo_tu_khoa("python"))

s = tv.tim_theo_ma("B001")
if s: s.muon_sach()
tv.thong_ke()

tv.luu_du_lieu()
if os.path.exists("demo_lib.txt"):
    os.remove("demo_lib.txt")
```

---

## 📝 Bài Tập Trên Lớp

### 🟢 Bài 1 (Dễ): Mở rộng Sach
> Thêm vào class `Sach`:  
> - Thuộc tính `__so_lan_muon = 0` (private)  
> - Khi `muon_sach()` thành công → tăng `__so_lan_muon` lên 1  
> - Phương thức `get_so_lan_muon()` (getter)  
> - Thêm vào `thong_ke()`: in ra 3 cuốn sách được mượn nhiều nhất

### 🟡 Bài 2 (Trung bình): Thêm class DocGia
> Tạo class `DocGia(ten, ma_doc_gia)`:  
> - `__sach_dang_muon = []` (private, danh sách mã sách)  
> - `muon(ma_sach)` — thêm mã vào danh sách đang mượn  
> - `tra(ma_sach)` — xóa mã khỏi danh sách  
> - `in_sach_dang_muon()` — in các sách đang mượn  
> Sửa `ThuVien.muon_sach()` để nhận thêm đối tượng `DocGia`

### 🔴 Bài 3 (Nâng cao): Hệ thống hoàn chỉnh
> Kết hợp `Sach`, `DocGia`, `ThuVien` vào menu tương tác đầy đủ.  
> Thêm chức năng: "Xem lịch sử mượn trả" (lưu log vào file riêng).

---

## 🏠 Bài Tập Về Nhà

### 🏠 Bài 1: Cửa hàng tiện lợi
> Project từ đầu (không dùng code buổi học):  
> Class `SanPham`, `KhoHang`, `HoaDon`, `CuaHang`  
> Chức năng: thêm/xóa sản phẩm, bán hàng, lập hóa đơn, lưu/đọc file

### 🏠 Bài 2: Viết README cho project thư viện
> Viết file `README.md` cho project thư viện:  
> - Mô tả chức năng  
> - Thiết kế class (vẽ sơ đồ đơn giản bằng text)  
> - Hướng dẫn cài đặt và chạy  
> - Các tính năng muốn thêm trong tương lai

---

## 🎯 Tổng Kết Buổi 8

**Kỹ năng tổng hợp đã dùng:**
- 🏛️ OOP: 4 tính chất trong 1 project
- 📋 List: lưu trữ tập hợp objects
- 🔍 Tìm kiếm: Linear (tên) + Binary (mã)
- 📊 Sắp xếp: `sorted()` với `key` đa tiêu chí
- 📂 File: đọc/ghi CSV đơn giản
- 🔒 try/except: xử lý lỗi nhập liệu

**Buổi tiếp theo (Buổi 9):** Kiểm tra định kỳ lần 2 — kết hợp tất cả kiến thức.

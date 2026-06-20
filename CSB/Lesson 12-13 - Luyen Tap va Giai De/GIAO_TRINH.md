# 🎯 Buổi 12–13: Luyện Tập và Giải Đề

> **Khóa:** CSB | **Buổi:** 12–13/14 | **Thời lượng:** 2 × 90 phút  
> **Tính chất:** Ôn tập tổng hợp — giải đề mẫu — thực hành dự án

---

## 🎯 Mục tiêu

Sau 2 buổi này học viên có thể:
- ✅ Nhận diện yêu cầu đề bài và chọn cấu trúc dữ liệu phù hợp (List/Set/Dict/Stack/Queue)
- ✅ Thiết kế hệ thống OOP từ đề bài mô tả bằng tiếng Việt
- ✅ Viết code hoàn chỉnh, có xử lý lỗi, lưu file trong 60 phút
- ✅ Tự đánh giá code của mình theo tiêu chí rõ ràng

---

## 🔁 Ôn Tập Tổng Hơp — Sơ Đồ Kiến Thức

```
                CSB — Bản đồ kiến thức
               ┌─────────────────────────┐
               │      Python Cơ Bản      │
               │  biến · if · for · while │
               └────────────┬────────────┘
                            │
          ┌─────────────────┼─────────────────┐
          ▼                 ▼                  ▼
    ┌──────────┐     ┌──────────┐      ┌──────────────┐
    │   List   │     │   Dict   │      │     OOP      │
    │  Hàm     │     │   Set    │      │ Class · kế   │
    │  File    │     │ Stack    │      │ thừa · abc   │
    └──────────┘     │ Queue    │      └──────────────┘
                     └──────────┘
                            │
          ┌─────────────────┴─────────────────┐
          ▼                                   ▼
    ┌──────────────┐                 ┌──────────────────┐
    │  Tìm kiếm    │                 │   Sắp xếp        │
    │ LinearSearch │                 │ BubbleSort       │
    │ BinarySearch │                 │ InsertionSort    │
    └──────────────┘                 │ QuickSort        │
                                     └──────────────────┘
```

---

## 📝 Buổi 12: Giải Đề Mẫu Có Hướng Dẫn

### Đề 1: Hệ thống điểm học viên (45 phút)

**Mô tả bài toán:**

> Xây dựng hệ thống quản lý điểm cho một trung tâm đào tạo với các yêu cầu:
> 1. Mỗi học viên có tên, mã số, và điểm các môn học (dict {môn: điểm})
> 2. Hệ thống lưu file và tải lại khi khởi động
> 3. Chức năng: thêm HV, nhập điểm, xem bảng xếp hạng, thống kê

---

**Bước 1: Phân tích → Thiết kế trước khi code**

```
Danh sách thực thể:
  - HocVien: ten, ma_hv, {mon: diem}

Quan hệ:
  - HeThong HAS-A nhiều HocVien (List)

Methods cần thiết:
  HocVien:
    - tinh_diem_tb()
    - xep_loai()
    - get_diem(mon)
    - set_diem(mon, diem)

  HeThong:
    - them_hoc_vien()
    - tim_theo_ma()         ← Binary Search
    - bang_xep_hang()       ← Quick Sort theo dtb
    - thong_ke_mon(mon)
    - luu_file() / tai_file()
```

---

**Bước 2: Code hoàn chỉnh**

```python
import os, json

class HocVien:
    def __init__(self, ten, ma_hv):
        self.ten    = ten
        self.ma_hv  = ma_hv.upper()
        self.__diem = {}   # {ten_mon: diem}

    def get_diem(self, mon):
        return self.__diem.get(mon, None)

    def set_diem(self, mon, diem):
        if not (0 <= diem <= 10):
            print(f"  ✗ Điểm phải trong khoảng [0, 10]!")
            return False
        self.__diem[mon] = diem
        return True

    def get_all_diem(self):
        return dict(self.__diem)   # Trả bản sao, không expose private dict

    def tinh_diem_tb(self):
        if not self.__diem: return 0.0
        return sum(self.__diem.values()) / len(self.__diem)

    def xep_loai(self):
        dtb = self.tinh_diem_tb()
        if dtb >= 9.0:   return "Xuất Sắc"
        elif dtb >= 8.0: return "Giỏi"
        elif dtb >= 6.5: return "Khá"
        elif dtb >= 5.0: return "Trung Bình"
        else:            return "Yếu"

    def to_dict(self):
        """Chuyển sang dict để lưu JSON."""
        return {"ten": self.ten, "ma_hv": self.ma_hv, "diem": self.__diem}

    @classmethod
    def from_dict(cls, d):
        """Tạo HocVien từ dict (khi đọc file)."""
        hv = cls(d["ten"], d["ma_hv"])
        for mon, diem in d.get("diem", {}).items():
            hv.set_diem(mon, diem)
        return hv

    def __str__(self):
        return (f"[{self.ma_hv}] {self.ten:<15} "
                f"| ĐTB: {self.tinh_diem_tb():.2f} "
                f"| {self.xep_loai()}")


class HeThong:
    def __init__(self, ten_trung_tam, file_luu="hoc_vien.json"):
        self.ten_tt    = ten_trung_tam
        self.__file    = file_luu
        self.__hoc_vien = []
        self._tai_du_lieu()

    # ── File I/O ──────────────────────────────────────────────

    def _tai_du_lieu(self):
        if not os.path.exists(self.__file): return
        try:
            with open(self.__file, "r", encoding="utf-8") as f:
                data = json.load(f)
                self.__hoc_vien = [HocVien.from_dict(d) for d in data]
            print(f"  ✓ Tải {len(self.__hoc_vien)} học viên từ file.")
        except Exception as e:
            print(f"  ✗ Lỗi tải file: {e}")

    def luu_du_lieu(self):
        try:
            with open(self.__file, "w", encoding="utf-8") as f:
                json.dump([hv.to_dict() for hv in self.__hoc_vien], f,
                          ensure_ascii=False, indent=2)
            print(f"  ✓ Đã lưu {len(self.__hoc_vien)} học viên.")
        except Exception as e:
            print(f"  ✗ Lỗi lưu file: {e}")

    # ── CRUD ─────────────────────────────────────────────────

    def them_hoc_vien(self, ten, ma_hv):
        if any(hv.ma_hv == ma_hv.upper() for hv in self.__hoc_vien):
            print(f"  ✗ Mã {ma_hv} đã tồn tại!")
            return None
        hv = HocVien(ten, ma_hv)
        self.__hoc_vien.append(hv)
        print(f"  ✓ Thêm học viên: {hv.ten} ({hv.ma_hv})")
        return hv

    # ── Tìm kiếm ─────────────────────────────────────────────

    def tim_theo_ma(self, ma_hv):
        """Binary search theo mã HV (đã sort tên)."""
        ds_sort = sorted(self.__hoc_vien, key=lambda hv: hv.ma_hv)
        mas     = [hv.ma_hv for hv in ds_sort]
        ma_hv   = ma_hv.upper()
        t, p    = 0, len(mas) - 1
        while t <= p:
            g = (t + p) // 2
            if mas[g] == ma_hv:      return ds_sort[g]
            elif mas[g] < ma_hv:     t = g + 1
            else:                    p = g - 1
        return None

    def tim_theo_ten(self, tu_khoa):
        """Linear search tên."""
        return [hv for hv in self.__hoc_vien if tu_khoa.lower() in hv.ten.lower()]

    # ── Sắp xếp & Thống kê ────────────────────────────────────

    def bang_xep_hang(self):
        """Quick sort theo ĐTB giảm dần."""
        def qsort(ds):
            if len(ds) <= 1: return ds
            pivot = ds[-1]
            kem   = [x for x in ds[:-1] if x.tinh_diem_tb() < pivot.tinh_diem_tb()]
            bang  = [x for x in ds[:-1] if x.tinh_diem_tb() == pivot.tinh_diem_tb()]
            hon   = [x for x in ds[:-1] if x.tinh_diem_tb() > pivot.tinh_diem_tb()]
            return qsort(hon) + bang + [pivot] + qsort(kem)

        xep_hang = qsort(self.__hoc_vien[:])
        print(f"\n=== BẢNG XẾP HẠNG — {self.ten_tt} ===")
        for hang, hv in enumerate(xep_hang, 1):
            huy = "🥇" if hang == 1 else "🥈" if hang == 2 else "🥉" if hang == 3 else f"  #{hang}"
            print(f"  {huy} {hv}")
        return xep_hang

    def thong_ke_mon(self, ten_mon):
        diem_cac_hv = [hv.get_diem(ten_mon) for hv in self.__hoc_vien
                       if hv.get_diem(ten_mon) is not None]
        if not diem_cac_hv:
            print(f"  Không có dữ liệu môn '{ten_mon}'")
            return
        print(f"\n  Môn {ten_mon}: {len(diem_cac_hv)} học viên có điểm")
        print(f"  TB: {sum(diem_cac_hv)/len(diem_cac_hv):.2f} | Max: {max(diem_cac_hv)} | Min: {min(diem_cac_hv)}")
        gioi = sum(1 for d in diem_cac_hv if d >= 8)
        print(f"  Xếp loại Giỏi trở lên: {gioi}/{len(diem_cac_hv)}")


# ── DEMO ─────────────────────────────────────────────────────
ht = HeThong("MindX Academy", "demo_hv.json")

# Thêm học viên
ht.them_hoc_vien("Nguyễn Văn An",  "HV001")
ht.them_hoc_vien("Trần Thị Bình",  "HV002")
ht.them_hoc_vien("Lê Minh Cúc",    "HV003")
ht.them_hoc_vien("Phạm Tuấn Dũng", "HV004")

# Nhập điểm
for ma, diem in [
    ("HV001", {"Python": 9, "Toán": 8, "Văn": 7.5}),
    ("HV002", {"Python": 7, "Toán": 9, "Văn": 8.0}),
    ("HV003", {"Python": 10,"Toán": 9, "Văn": 9.0}),
    ("HV004", {"Python": 6, "Toán": 7, "Văn": 7.5}),
]:
    hv = ht.tim_theo_ma(ma)
    if hv:
        for mon, d in diem.items():
            hv.set_diem(mon, d)

ht.bang_xep_hang()
ht.thong_ke_mon("Python")

ht.luu_du_lieu()
os.remove("demo_hv.json")
```

---

## 📝 Buổi 13: Practice Problems — Tự Giải

### Đề 2: Stack-Queue kết hợp (30 phút)

```python
# ============================================================
#  Đề 2: Mô phỏng máy ATM
#  - Queue: khách hàng xếp hàng chờ
#  - Stack: lịch sử giao dịch của mỗi tài khoản (Undo)
# ============================================================

from collections import deque

class GiaoDich:
    def __init__(self, loai, so_tien):
        self.loai     = loai     # "nap" hoặc "rut"
        self.so_tien  = so_tien

    def __str__(self):
        ky = "+" if self.loai == "nap" else "-"
        return f"{ky}{self.so_tien:,}đ"


class TaiKhoanATM:
    def __init__(self, ten, so_tien_ban_dau=0):
        self.ten          = ten
        self.__so_du      = so_tien_ban_dau
        self.__lich_su    = deque(maxlen=5)   # Chỉ giữ 5 giao dịch gần nhất

    def nap(self, so_tien):
        if so_tien <= 0:
            print(f"    ✗ Số tiền không hợp lệ"); return
        self.__so_du += so_tien
        self.__lich_su.append(GiaoDich("nap", so_tien))
        print(f"    ✓ {self.ten} nạp {so_tien:,}đ → Số dư: {self.__so_du:,}đ")

    def rut(self, so_tien):
        if so_tien <= 0:
            print(f"    ✗ Số tiền không hợp lệ"); return
        if so_tien > self.__so_du:
            print(f"    ✗ Số dư không đủ ({self.__so_du:,}đ)"); return
        self.__so_du -= so_tien
        self.__lich_su.append(GiaoDich("rut", so_tien))
        print(f"    ✓ {self.ten} rút {so_tien:,}đ → Số dư: {self.__so_du:,}đ")

    def in_lich_su(self):
        print(f"    {self.ten}: [{' | '.join(str(g) for g in self.__lich_su)}]")

    def get_so_du(self): return self.__so_du
    def __str__(self):   return f"{self.ten} (Số dư: {self.__so_du:,}đ)"


class MayATM:
    def __init__(self, ma_may):
        self.ma_may      = ma_may
        self.__hang_doi  = deque()   # Queue khách chờ
        self.__dang_phuc_vu = None

    def xep_hang(self, tai_khoan):
        self.__hang_doi.append(tai_khoan)
        print(f"  [{self.ma_may}] {tai_khoan.ten} xếp hàng (vị trí {len(self.__hang_doi)})")

    def phuc_vu_tiep(self):
        if not self.__hang_doi:
            print(f"  [{self.ma_may}] Hàng đợi trống!")
            return None
        self.__dang_phuc_vu = self.__hang_doi.popleft()
        print(f"\n  [{self.ma_may}] Đang phục vụ: {self.__dang_phuc_vu}")
        return self.__dang_phuc_vu

    def xem_hang_doi(self):
        print(f"\n  Hàng đợi ATM {self.ma_may}: {len(self.__hang_doi)} người")
        for i, tk in enumerate(self.__hang_doi, 1):
            print(f"    {i}. {tk.ten}")


# Demo
atm = MayATM("ATM-001")

tk1 = TaiKhoanATM("Nguyễn An",   2_000_000)
tk2 = TaiKhoanATM("Trần Bình",     500_000)
tk3 = TaiKhoanATM("Lê Cúc",     1_500_000)

atm.xep_hang(tk1)
atm.xep_hang(tk2)
atm.xep_hang(tk3)
atm.xem_hang_doi()

khach = atm.phuc_vu_tiep()
khach.rut(300_000)
khach.nap(500_000)
khach.in_lich_su()

khach = atm.phuc_vu_tiep()
khach.rut(1_000_000)   # Sẽ lỗi – không đủ tiền
atm.xem_hang_doi()
```

---

### Đề 3: Mini Project — Chọn 1 trong 2 đề (60 phút)

#### Option A: Hệ thống điểm danh

> **Yêu cầu:**
> - Class `HocVien(ten, ma_hv, lop)`
> - Class `BuoiHoc(ngay, ten_bai)`: set `hoc_vien_co_mat`
> - Class `HeThong` quản lý danh sách học viên và buổi học
> - Tính % điểm danh từng học viên
> - Cảnh báo học viên vắng ≥ 3 buổi
> - Lưu/đọc file

#### Option B: Game đơn giản

> **Yêu cầu:**
> - Abstract class `NhanVat(ABC)`: `ten`, `mau`, `mana`
> - `@abstractmethod tan_cong()`, `nhan_sat_thuong()`
> - Class `ChienSi(NhanVat)`: tấn công vật lý, phòng thủ cao
> - Class `PhapSu(NhanVat)`: tấn công phép, tiêu mana
> - `BattleSystem`: Stack lưu lịch sử lượt đánh, Queue nhân vật đang chờ đánh
> - Mô phỏng 10 lượt chiến đấu

---

## 🎯 Tổng Kết Buổi 12–13

**Chiến lược khi gặp bài toán mới:**

1. **Đọc đề** — Xác định: "Có những thực thể nào? Quan hệ giữa chúng là gì?"
2. **Chọn cấu trúc:** Cần thứ tự? → List. Cần tra nhanh? → Dict. Không trùng? → Set. Undo? → Stack. Hàng chờ? → Queue.
3. **Thiết kế trước** — Vẽ sơ đồ class, liệt kê attributes và methods TRƯỚC khi code.
4. **Code từng phần** — Viết và test từng class riêng lẻ.
5. **Kết hợp lại** — Tích hợp vào hệ thống hoàn chỉnh.
6. **Xử lý edge case** — List rỗng, giá trị âm, file không tồn tại.

**Buổi tiếp theo (Buổi 14):** Thi cuối khóa — đánh giá tổng hợp toàn bộ kiến thức CSB.

# =============================================================
#  Course  : CSB – Nền Tảng Lập Trình Python
#  Buổi   : 4 – Lập Trình Hướng Đối Tượng (OOP) – Phần 2
#  Nội dung: Polymorphism (Đa hình), Abstraction (Trừu tượng)
# =============================================================

import math
from abc import ABC, abstractmethod   # ABC = Abstract Base Class


# ─────────────────────────────────────────────
# PHẦN 1 – TRỪU TƯỢNG (ABSTRACTION)
# Abstract class định nghĩa "hợp đồng" – class con BẮT BUỘC tuân thủ
# ─────────────────────────────────────────────

class HinhHoc(ABC):
    """Abstract class – không thể tạo object trực tiếp.
    Định nghĩa giao diện chung cho mọi hình học."""

    @abstractmethod
    def dien_tich(self) -> float:
        """Tính diện tích – class con phải cài đặt phương thức này."""
        pass

    @abstractmethod
    def chu_vi(self) -> float:
        """Tính chu vi – class con phải cài đặt phương thức này."""
        pass

    # Phương thức thường (không abstract): class con thừa hưởng dùng luôn
    def mo_ta(self):
        """In mô tả hình học – dùng chung cho tất cả hình."""
        ten_loai = type(self).__name__     # Lấy tên class hiện tại
        print(f"  {ten_loai:<14} | Diện tích: {self.dien_tich():>8.2f} | Chu vi: {self.chu_vi():>8.2f}")


# ─────────────────────────────────────────────
# PHẦN 2 – ĐA HÌNH (POLYMORPHISM)
# Cùng tên phương thức, hành vi khác nhau ở mỗi class
# ─────────────────────────────────────────────

class HinhTron(HinhHoc):
    """Hình tròn – kế thừa HinhHoc."""

    def __init__(self, ban_kinh):
        self.ban_kinh = ban_kinh

    def dien_tich(self) -> float:
        return math.pi * self.ban_kinh ** 2    # π × r²

    def chu_vi(self) -> float:
        return 2 * math.pi * self.ban_kinh     # 2πr


class HinhChuNhat(HinhHoc):
    """Hình chữ nhật – kế thừa HinhHoc."""

    def __init__(self, dai, rong):
        self.dai  = dai
        self.rong = rong

    def dien_tich(self) -> float:
        return self.dai * self.rong            # d × r

    def chu_vi(self) -> float:
        return 2 * (self.dai + self.rong)      # 2 × (d + r)


class HinhVuong(HinhChuNhat):
    """Hình vuông – kế thừa HinhChuNhat (canh = dai = rong)."""

    def __init__(self, canh):
        super().__init__(canh, canh)    # Truyền canh cho cả dai và rong


class HinhTamGiac(HinhHoc):
    """Hình tam giác – kế thừa HinhHoc."""

    def __init__(self, a, b, c):
        self.a = a    # Cạnh a
        self.b = b    # Cạnh b
        self.c = c    # Cạnh c

    def dien_tich(self) -> float:
        # Công thức Heron: S = √(s(s-a)(s-b)(s-c)), s = nửa chu vi
        s = self.chu_vi() / 2
        return math.sqrt(s * (s - self.a) * (s - self.b) * (s - self.c))

    def chu_vi(self) -> float:
        return self.a + self.b + self.c


# ─────────────────────────────────────────────
# PHẦN 3 – VÍ DỤ THÊM: ĐA HÌNH VỚI PHƯƠNG TIỆN
# ─────────────────────────────────────────────

class PhuongTien(ABC):
    """Abstract class cho các phương tiện giao thông."""

    def __init__(self, ten, van_toc_km):
        self.ten      = ten
        self.van_toc  = van_toc_km

    @abstractmethod
    def di_chuyen(self):
        pass

    @abstractmethod
    def am_thanh(self):
        pass

    def thoi_gian_hanh_trinh(self, khoang_cach_km):
        """Tính thời gian (giờ) = khoảng cách / vận tốc."""
        return khoang_cach_km / self.van_toc


class XeHoi(PhuongTien):
    def di_chuyen(self):
        print(f"  {self.ten} đang chạy trên đường bộ 🚗")

    def am_thanh(self):
        print(f"  {self.ten}: Vroom vroom!")


class TauHoa(PhuongTien):
    def di_chuyen(self):
        print(f"  {self.ten} đang chạy trên đường ray 🚂")

    def am_thanh(self):
        print(f"  {self.ten}: Tu tu!")


class MayBay(PhuongTien):
    def di_chuyen(self):
        print(f"  {self.ten} đang bay trên bầu trời ✈️")

    def am_thanh(self):
        print(f"  {self.ten}: Roarrr!")


# ─────────────────────────────────────────────
# CHƯƠNG TRÌNH CHÍNH – DEMO
# ─────────────────────────────────────────────

print("=" * 55)
print("  DEMO OOP – ĐA HÌNH VÀ TRỪU TƯỢNG")
print("=" * 55)

# Kiểm tra Abstraction: thử tạo object từ abstract class → sẽ lỗi
print("\n--- KIỂM TRA ABSTRACTION ---")
try:
    h = HinhHoc()   # Dòng này sẽ raise TypeError
except TypeError as e:
    print(f"  [Đúng như dự đoán] Không thể tạo HinhHoc trực tiếp!")
    print(f"  Lỗi: {e}")

# Tạo danh sách nhiều loại hình khác nhau (đa hình)
danh_sach_hinh = [
    HinhTron(5),
    HinhChuNhat(8, 4),
    HinhVuong(6),
    HinhTamGiac(3, 4, 5),
]

print("\n--- TÍNH DIỆN TÍCH & CHU VI (ĐA HÌNH) ---")
print(f"  {'Loại hình':<14} | {'Diện tích':>10} | {'Chu vi':>8}")
print("  " + "-" * 40)

for hinh in danh_sach_hinh:
    # Cùng gọi .mo_ta() nhưng kết quả khác nhau tùy loại hình → ĐA HÌNH
    hinh.mo_ta()

# Tìm hình có diện tích lớn nhất – dùng max() với key
hinh_lon_nhat = max(danh_sach_hinh, key=lambda h: h.dien_tich())
print(f"\n  Hình có diện tích lớn nhất: {type(hinh_lon_nhat).__name__} "
      f"({hinh_lon_nhat.dien_tich():.2f})")

# Demo phương tiện
print("\n--- ĐA HÌNH VỚI PHƯƠNG TIỆN ---")
phuong_tien = [
    XeHoi("Toyota Camry", van_toc_km=120),
    TauHoa("Tàu SE1",     van_toc_km=90),
    MayBay("VietJet A321", van_toc_km=850),
]

KHOANG_CACH = 500  # km (ví dụ Hà Nội – TP.HCM ~1500km, dùng 500 cho demo)

for pt in phuong_tien:
    pt.di_chuyen()         # Cùng gọi di_chuyen() – hành vi khác nhau
    pt.am_thanh()
    tg = pt.thoi_gian_hanh_trinh(KHOANG_CACH)
    print(f"  → {KHOANG_CACH} km mất: {tg:.1f} giờ\n")

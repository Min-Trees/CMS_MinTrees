# 🎯 Buổi 4: Lập Trình Hướng Đối Tượng – Phần 2

> **Khóa:** CSB | **Buổi:** 4/14 | **Thời lượng:** 90 phút

---

## 🎯 Mục tiêu

Sau buổi này học viên làm được:
- ✅ Giải thích Tính Đa Hình và viết code thể hiện nó (method override)
- ✅ Định nghĩa Abstract Class với `ABC` và `@abstractmethod`
- ✅ Áp dụng nguyên tắc "viết code chương trình tướng quân, không phải lính cụ thể"
- ✅ Kết hợp cả 4 tính chất OOP trong một dự án nhỏ

---

## 🔁 Ôn bài cũ (10 phút)

**3 câu hỏi nhanh:**
1. Sự khác nhau giữa class cha và class con là gì?
2. Tại sao cần gọi `super().__init__()` trong class con?
3. Khi in `print(obj)`, Python gọi phương thức đặc biệt nào?

**Bài mini (3 phút):**
```python
# Kết quả in ra là gì? Giải thích tại sao
class A:
    def gioi_thieu(self):
        print("Tôi là A")

class B(A):
    def gioi_thieu(self):
        print("Tôi là B")

ds = [A(), B(), A(), B()]
for obj in ds:
    obj.gioi_thieu()
```

---

## 📖 Kiến thức 1: Tính Đa Hình (Polymorphism)

### ✅ Giải thích

**Ẩn dụ: Nút "Phát nhạc" trên các thiết bị khác nhau**

> 🎵 Cùng một nút "▶️ Phát" — nhưng:  
> - Trên điện thoại → phát qua loa điện thoại  
> - Trên tivi → phát qua loa tivi  
> - Trên laptop → phát qua tai nghe  

Cùng **một cái tên**, **hành vi khác nhau** tùy đối tượng → đó là **Đa Hình**.

**Trong OOP:**
```python
# Các class khác nhau đều có phương thức .keu() nhưng hành vi khác
class Cho:
    def keu(self): print("Gâu gâu!")

class Meo:
    def keu(self): print("Meo meo!")

class Vit:
    def keu(self): print("Cạc cạc!")

dong_vat = [Cho(), Meo(), Vit()]
for dv in dong_vat:
    dv.keu()   # Python tự biết gọi đúng phương thức của từng class!
```

> 💡 **Lợi ích:** Bạn viết code `for dv in dong_vat: dv.keu()` — một lần cho tất cả,  
> không cần biết từng con là loài gì!

**Có 2 loại Đa Hình:**

| Loại | Cách làm | Ý nghĩa |
|------|----------|---------|
| **Override** (ghi đè) | Class con định nghĩa lại phương thức của cha | Cùng tên, hành vi khác |
| **Overload** (Python) | Dùng tham số mặc định hoặc `*args` | Một hàm xử lý nhiều kiểu tham số |

### 📌 Ví dụ — Hệ thống tính diện tích

**Input:** Danh sách hình học (tròn, chữ nhật, tam giác)  
**Output:** Diện tích và chu vi từng hình

### 💻 Code

```python
import math

# === CÁC CLASS HÌNH HỌC ===
class HinhHoc:
    """Class cha – tất cả hình học đều phải tính được diện tích và chu vi."""
    def __init__(self, ten):
        self.ten = ten

    def dien_tich(self):
        return 0   # Giá trị mặc định (class con sẽ override)

    def chu_vi(self):
        return 0

    def in_thong_tin(self):
        print(f"  {self.ten:<12}: diện tích = {self.dien_tich():.2f} | chu vi = {self.chu_vi():.2f}")


class HinhTron(HinhHoc):
    def __init__(self, ban_kinh):
        super().__init__("Hình Tròn")
        self.r = ban_kinh

    def dien_tich(self):   # OVERRIDE: ghi đè phương thức của cha
        return math.pi * self.r ** 2

    def chu_vi(self):      # OVERRIDE
        return 2 * math.pi * self.r


class HinhChuNhat(HinhHoc):
    def __init__(self, chieu_dai, chieu_rong):
        super().__init__("Hình Chữ Nhật")
        self.cd = chieu_dai
        self.cr = chieu_rong

    def dien_tich(self):   # OVERRIDE
        return self.cd * self.cr

    def chu_vi(self):      # OVERRIDE
        return 2 * (self.cd + self.cr)


class HinhVuong(HinhChuNhat):   # Kế thừa từ HinhChuNhat!
    def __init__(self, canh):
        super().__init__(canh, canh)   # Hình vuông là HCN đặc biệt
        self.ten = "Hình Vuông"       # Override lại tên


class HinhTamGiac(HinhHoc):
    def __init__(self, a, b, c):
        super().__init__("Hình Tam Giác")
        self.a, self.b, self.c = a, b, c

    def dien_tich(self):   # Công thức Heron
        s = (self.a + self.b + self.c) / 2
        return math.sqrt(s * (s-self.a) * (s-self.b) * (s-self.c))

    def chu_vi(self):
        return self.a + self.b + self.c


# TÍNH ĐA HÌNH trong hành động: tất cả dùng chung 1 vòng lặp
cac_hinh = [
    HinhTron(5),
    HinhChuNhat(4, 6),
    HinhVuong(3),
    HinhTamGiac(3, 4, 5),
]

print("=== THỐNG KÊ DIỆN TÍCH ===")
tong_dien_tich = 0
for hinh in cac_hinh:
    hinh.in_thong_tin()        # Cùng gọi in_thong_tin() — nhưng kết quả khác nhau!
    tong_dien_tich += hinh.dien_tich()

print(f"\nTổng diện tích: {tong_dien_tich:.2f}")
```

### ⚠️ Lỗi thường gặp

```python
# LỖI 1: Override nhưng không gọi super() khi cần
class HinhVuong(HinhChuNhat):
    def __init__(self, canh):
        self.canh = canh         # ❌ Quên super() → self.cd, self.cr không có!

    def __init__(self, canh):
        super().__init__(canh, canh)   # ✅ Gọi cha trước
        self.canh = canh

# LỖI 2: Nhầm tên phương thức (không override, tạo phương thức mới)
class HinhTron(HinhHoc):
    def Dien_Tich(self):  # ❌ Viết hoa D → không override dien_tich() của cha!
        return math.pi * self.r ** 2
```

---

## 📖 Kiến thức 2: Tính Trừu Tượng (Abstraction)

### ✅ Giải thích

**Ẩn dụ: Bảng điều khiển máy bay vs buồng lái thực**

> ✈️ Hành khách chỉ thấy **ghế ngồi, màn hình, nút gọi tiếp viên** (interface đơn giản)  
> Phi công nhìn thấy **hàng trăm nút và đồng hồ** (chi tiết triển khai phức tạp)  
>  
> **Trừu tượng = ẩn chi tiết phức tạp, chỉ lộ giao diện cần thiết.**

**Abstract Class (Class Trừu Tượng):**
- Là class **không thể tạo object trực tiếp** — chỉ dùng để kế thừa
- Định nghĩa **"hợp đồng"**: bất kỳ class con nào cũng PHẢI triển khai các phương thức được đánh dấu
- Dùng module `abc` (Abstract Base Class)

```python
from abc import ABC, abstractmethod

class HinhHoc(ABC):          # Kế thừa ABC = class trừu tượng
    @abstractmethod          # Decorator: buộc class con phải override
    def dien_tich(self):
        pass                 # Không cần nội dung – đây chỉ là "hợp đồng"

# h = HinhHoc()             # ❌ TypeError: Can't instantiate abstract class
# HinhTron là class con phải triển khai dien_tich()
```

> 💡 **Khi nào dùng Abstract Class?**  
> Khi bạn thiết kế một nhóm class có điểm chung về **cấu trúc** nhưng **chi tiết khác nhau**.  
> "Mọi phương tiện đều phải di chuyển" — nhưng cách di chuyển của ô tô ≠ tàu thủy ≠ máy bay.

### 📌 Ví dụ — Hệ thống thanh toán

**Hợp đồng:** Mọi phương thức thanh toán đều phải có `xu_ly_thanh_toan()` và `xac_nhan()`

### 💻 Code

```python
from abc import ABC, abstractmethod

# === ABSTRACT CLASS: Hợp đồng giao diện ===
class PhuongThucThanhToan(ABC):
    """Abstract class – mọi loại thanh toán phải triển khai các phương thức này."""

    def __init__(self, ten_phuong_thuc):
        self.ten = ten_phuong_thuc

    @abstractmethod
    def xu_ly_thanh_toan(self, so_tien):
        """Triển khai logic thanh toán cụ thể."""
        pass

    @abstractmethod
    def xac_nhan(self):
        """Xác nhận giao dịch."""
        pass

    # Phương thức KHÔNG abstract → class con dùng được luôn, không cần override
    def in_bien_lai(self, so_tien):
        print(f"\n  ===== BIÊN LAI =====")
        print(f"  Phương thức: {self.ten}")
        print(f"  Số tiền     : {so_tien:,}đ")
        self.xac_nhan()   # Gọi phương thức abstract (polymorphism!)
        print(f"  ====================")


# === CÁC CLASS CON: Triển khai cụ thể ===
class ThanhToanTienMat(PhuongThucThanhToan):
    def __init__(self):
        super().__init__("Tiền Mặt")
        self.tien_nhan = 0

    def xu_ly_thanh_toan(self, so_tien):
        self.tien_nhan = so_tien
        print(f"  Nhận {so_tien:,}đ tiền mặt từ khách hàng")
        return True

    def xac_nhan(self):
        print(f"  Trạng thái: ✅ Xác nhận bằng phiếu thu tiền mặt")


class ThanhToanTheNganHang(PhuongThucThanhToan):
    def __init__(self, so_the):
        super().__init__("Thẻ Ngân Hàng")
        self.__so_the = so_the

    def xu_ly_thanh_toan(self, so_tien):
        print(f"  Quẹt thẻ **** **** **** {self.__so_the[-4:]} — {so_tien:,}đ")
        return True   # Giả sử luôn thành công

    def xac_nhan(self):
        print(f"  Trạng thái: ✅ Giao dịch thẻ được ngân hàng phê duyệt (OTP đã xác nhận)")


class ThanhToanVNPay(PhuongThucThanhToan):
    def __init__(self, so_dien_thoai):
        super().__init__("VNPay QR")
        self.sdt = so_dien_thoai

    def xu_ly_thanh_toan(self, so_tien):
        print(f"  Quét QR code — tài khoản {self.sdt} thanh toán {so_tien:,}đ")
        return True

    def xac_nhan(self):
        print(f"  Trạng thái: ✅ VNPay xác nhận giao dịch thành công")


# === DEMO: Tính Đa Hình + Trừu Tượng ===
gio_hang_tong = 350_000

print("=== HỆ THỐNG THANH TOÁN ===")

cac_phuong_thuc = [
    ThanhToanTienMat(),
    ThanhToanTheNganHang("1234567890123456"),
    ThanhToanVNPay("0901234567"),
]

for pttt in cac_phuong_thuc:
    pttt.xu_ly_thanh_toan(gio_hang_tong)
    pttt.in_bien_lai(gio_hang_tong)   # Gọi chung – polymorphism xử lý phần khác nhau

# Thử tạo object từ abstract class
try:
    p = PhuongThucThanhToan("Test")
except TypeError as e:
    print(f"\n  Lỗi như mong đợi: {e}")
```

### ⚠️ Lỗi thường gặp

```python
# LỖI 1: Class con không triển khai đủ abstractmethod
class ThanhToanBiThi(PhuongThucThanhToan):
    def xu_ly_thanh_toan(self, so_tien):
        print("Xử lý...")
    # Quên xac_nhan() !

t = ThanhToanBiThi()   # ❌ TypeError: Can't instantiate because xac_nhan is not implemented

# LỖI 2: Dùng ABC nhưng không import
class MyABC(ABC):   # ❌ NameError nếu không from abc import ABC
from abc import ABC, abstractmethod  # ✅

# LỖI 3: Đặt @abstractmethod nhưng không kế thừa ABC
class MyClass:                  # ❌ Không kế thừa ABC!
    @abstractmethod
    def do_something(self): pass
# → Decorator @abstractmethod không có tác dụng, vẫn tạo object được!
```

---

## 💻 Demo Tổng Hợp — Hệ Sinh Thái Phương Tiện

```python
# ============================================================
#  DEMO TỔNG HỢP (Buổi 4)
#  Abstract Class + Polymorphism + Encapsulation + Inheritance
# ============================================================

from abc import ABC, abstractmethod

class PhuongTien(ABC):
    """Abstract class – tất cả phương tiện đều phải có di_chuyen() và tinh_chi_phi()."""
    def __init__(self, ten, van_toc_km_h):
        self.ten           = ten
        self.__van_toc     = van_toc_km_h
        self.__km_da_di    = 0

    def get_van_toc(self):   return self.__van_toc
    def get_km_da_di(self):  return self.__km_da_di

    def _tang_km(self, km):  # Protected – chỉ class con gọi
        self.__km_da_di += km

    @abstractmethod
    def di_chuyen(self, km):  pass

    @abstractmethod
    def tinh_chi_phi(self, km):  pass

    def bao_cao(self, km_di):
        cp = self.tinh_chi_phi(km_di)
        print(f"  {self.ten:<12}: {km_di} km | Chi phí: {cp:,.0f}đ | V: {self.__van_toc} km/h")


class XeHoi(PhuongTien):
    def __init__(self, ten, van_toc, muc_tieu_thu_lit_100km, gia_xang_lit):
        super().__init__(ten, van_toc)
        self.__muc_tieu_thu = muc_tieu_thu_lit_100km
        self.__gia_xang     = gia_xang_lit

    def di_chuyen(self, km):
        self._tang_km(km)
        print(f"  🚗 {self.ten} lăn bánh {km} km trên đường bộ")

    def tinh_chi_phi(self, km):
        return (km / 100) * self.__muc_tieu_thu * self.__gia_xang


class TauHoa(PhuongTien):
    def __init__(self, ten, van_toc, gia_ve_km):
        super().__init__(ten, van_toc)
        self.__gia_ve_km = gia_ve_km

    def di_chuyen(self, km):
        self._tang_km(km)
        print(f"  🚂 {self.ten} chạy trên đường ray {km} km")

    def tinh_chi_phi(self, km):
        return km * self.__gia_ve_km


class MayBay(PhuongTien):
    def __init__(self, ten, van_toc, gia_ve_co_dinh):
        super().__init__(ten, van_toc)
        self.__gia_ve = gia_ve_co_dinh

    def di_chuyen(self, km):
        self._tang_km(km)
        print(f"  ✈️  {self.ten} cất cánh bay {km} km")

    def tinh_chi_phi(self, km):
        return self.__gia_ve   # Giá vé cố định với máy bay

    def bao_cao(self, km):    # Override bao_cao() cho máy bay
        super().bao_cao(km)
        print(f"    (Bao gồm phí sân bay và hành lý)")


CHUYEN_DI_KM = 400
phuong_tien = [
    XeHoi("Xe Toyota", 120, 8.0, 24_000),      # 8L/100km, 24k/lít
    TauHoa("Tàu SE1", 80, 450),                  # 450đ/km
    MayBay("VJ101", 800, 1_500_000),             # Giá vé cố định
]

print(f"=== CHI PHÍ DI CHUYỂN {CHUYEN_DI_KM} KM ===\n")
for pt in phuong_tien:
    pt.di_chuyen(CHUYEN_DI_KM)
    pt.bao_cao(CHUYEN_DI_KM)
    print()

# Tìm phương tiện rẻ nhất
re_nhat = min(phuong_tien, key=lambda pt: pt.tinh_chi_phi(CHUYEN_DI_KM))
print(f"Phương tiện rẻ nhất: {re_nhat.ten}")
```

---

## 📝 Bài Tập Trên Lớp

### 🟢 Bài 1 (Dễ): Đa hình Animal
> Tạo 4 class: `DongVat` (cha), `Cho(DongVat)`, `Meo(DongVat)`, `Chim(DongVat)`.  
> Mỗi class override `phat_am()`: in âm thanh đặc trưng.  
> Tạo list 6 con vật hỗn hợp, dùng 1 vòng for gọi `phat_am()` tất cả.

### 🟡 Bài 2 (Trung bình): Abstract Hình học
> Tạo abstract class `HinhHoc(ABC)` với 2 abstract method: `dien_tich()`, `chu_vi()`.  
> Triển khai class `HinhChuNhat` và `HinhTron`.  
> Tạo list 4 hình, dùng vòng for in diện tích và chu vi.  
> Thử tạo `HinhHoc()` trực tiếp — quan sát lỗi.

### 🔴 Bài 3 (Nâng cao nhẹ): Hệ thống nhân viên hoàn chỉnh
> Abstract class `NhanVien(ABC)`: `ten`, `muc_luong_co_ban`  
> Abstract method: `tinh_luong_thang()` (công thức tính khác nhau)  
> Class `NhanVienToanThoiGian(NhanVien)`: lương = mức cơ bản  
> Class `NhanVienTheoGio(NhanVien)`: lương = số giờ × đơn giá/giờ  
> Class `NhanVienHoaHong(NhanVien)`: lương = cơ bản + 10% doanh thu  
> Tạo list 5 nhân viên hỗn hợp, in bảng lương tháng.

---

## 🏠 Bài Tập Về Nhà

### 🏠 Bài 1: Hệ thống game đơn giản
> Abstract class `NhanVat(ABC)`: `ten`, `mau`, `mana`  
> Abstract methods: `tan_cong(muc_tieu)`, `phong_thu(sat_thuong)`  
> Class `Chien_Si(NhanVat)`: tấn công vật lý (sát thương cao)  
> Class `Phap_Su(NhanVat)`: tấn công phép thuật (tiêu tốn mana)  
> Simulation: Chiến Sĩ vs Pháp Sư đánh nhau 5 lượt

### 🏠 Bài 2: Ngân hàng (tổng hợp 4 tính chất OOP)
> Abstract class `TaiKhoan(ABC)`: `so_tai_khoan`, `__so_du` (private)  
> Abstract methods: `rut_tien(so_tien)`, `mo_ta_loai()`  
> Class `TaiKhoanThanhToan(TaiKhoan)`: rút tối đa 5tr/ngày  
> Class `TaiKhoanTietKiem(TaiKhoan)`: rút phải để lại tối thiểu 50k  
> Class `TaiKhoanVIP(TaiKhoanThanhToan)`: rút không giới hạn  
> Demo: Tạo 3 tài khoản, thử rút tiền, in sao kê

---

## 🎯 Tổng Kết Buổi 4

**4 Tính Chất OOP — Bảng tóm tắt:**

| Tính chất | Từ khóa | Ý nghĩa | Khi dùng |
|-----------|---------|---------|----------|
| **Đóng gói** | `__private`, getter/setter | Bảo vệ dữ liệu, kiểm soát truy cập | Khi không muốn ai can thiệp trực tiếp |
| **Kế thừa** | `class Con(Cha)`, `super()` | Tái sử dụng code, mở rộng | Khi nhiều class có điểm chung |
| **Đa hình** | Override, duck typing | Cùng tên, hành vi khác | Khi cần xử lý đồng nhất nhiều loại |
| **Trừu tượng** | `ABC`, `@abstractmethod` | Định nghĩa "hợp đồng" | Khi thiết kế framework/API |

**3 điều PHẢI nhớ:**
1. 🎭 **Đa hình = cùng gọi, hành vi khác** — viết code theo class cha/abstract, không theo class con cụ thể
2. 🧩 **Abstract class = hợp đồng** — không tạo object được trực tiếp; class con PHẢI triển khai `@abstractmethod`
3. 🛡️ **Kết hợp 4 tính chất** = code mạnh, dễ mở rộng, ít lỗi

**Buổi tiếp theo (Buổi 5):** Kiểm tra định kỳ lần 1 — ôn tập và thực hành tổng hợp Python cơ bản + OOP.

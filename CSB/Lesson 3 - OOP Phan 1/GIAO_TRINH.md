# 🎯 Buổi 3: Lập Trình Hướng Đối Tượng – Phần 1

> **Khóa:** CSB | **Buổi:** 3/14 | **Thời lượng:** 90 phút

---

## 🎯 Mục tiêu

Sau buổi này học viên làm được:
- ✅ Hiểu tại sao cần OOP và OOP khác code thông thường thế nào
- ✅ Định nghĩa class với thuộc tính và constructor `__init__`
- ✅ Tạo object từ class, truy cập thuộc tính và gọi phương thức
- ✅ Áp dụng Tính Đóng Gói với `__private`, getter, setter
- ✅ Xây dựng mối quan hệ kế thừa giữa class cha và con

---

## 🔁 Ôn bài cũ (10 phút)

**3 câu hỏi nhanh:**
1. `ds = [5, 3, 8]`. Gọi `ds.sort()` thì `ds` trở thành gì?
2. Viết hàm `la_so_chan(n)` trả về `True` nếu n là số chẵn?
3. Muốn THÊM nội dung vào cuối file mà không xóa cũ, dùng chế độ gì?

**Bài mini (3 phút):**
```python
# Hàm này có lỗi gì? Sửa lại:
def loc_so_duong(ds):
    ket_qua = []
    for x in ds:
        if x > 0
            ket_qua.append(x)
    return ket_qua  # có 1 lỗi cú pháp và 1 lỗi logic tiềm ẩn
```

---

## 📖 Kiến thức 1: Tại Sao Cần OOP?

### ✅ Giải thích

Hãy tưởng tượng bạn quản lý một lớp học với 30 học sinh.

**Cách cũ (không OOP) — hỗn loạn:**
```python
# Dữ liệu rải rác, không liên kết
ten_an    = "An"
diem_an   = [9, 8, 10]
lop_an    = "10A1"

ten_binh  = "Bình"
diem_binh = [7, 6, 8]
lop_binh  = "10A2"
# ... nhân lên 30 học sinh = 90 biến! 😱
```

**Cách OOP — có tổ chức:**
```python
# Mỗi học sinh là 1 "gói" hoàn chỉnh
an   = HocSinh("An",   [9, 8, 10], "10A1")
binh = HocSinh("Bình", [7, 6, 8],  "10A2")
# Gọn gàng, rõ ràng, dễ mở rộng ✅
```

> 💡 **OOP = Lập trình theo mô hình thực tế**  
> Trong thực tế, mọi thứ đều là "vật thể" có:  
> - **Thuộc tính** (đặc điểm): con mèo có màu lông, cân nặng, tuổi  
> - **Hành động** (phương thức): con mèo có thể kêu, ăn, ngủ

| Thực tế | OOP |
|---------|-----|
| Bản thiết kế nhà | `class` |
| Ngôi nhà được xây từ bản vẽ | `object` |
| Diện tích, màu sơn, số phòng | thuộc tính |
| Mở cửa, bật đèn | phương thức |

---

## 📖 Kiến thức 2: Class và Object

### ✅ Giải thích

**Ẩn dụ hoàn hảo: Khuôn bánh và những chiếc bánh**

> 🍰 **Class (Khuôn bánh)** = Bản thiết kế, định nghĩa hình dạng  
> 🎂 **Object (Chiếc bánh)** = Thực thể cụ thể được tạo ra từ khuôn

Từ **1 khuôn** (class), bạn tạo **vô số chiếc bánh** (objects), mỗi chiếc có màu sắc riêng!

**Cấu trúc class:**
```python
class TenClass:                          # class = khuôn
    def __init__(self, tham_so_1, ...): # Constructor: chạy khi TẠO object mới
        self.thuoc_tinh_1 = tham_so_1  # self. = "chiếc bánh này có màu..."
        self.thuoc_tinh_2 = ...

    def phuong_thuc(self):              # Hành động của mỗi object
        # xử lý
        return ket_qua
```

> 💡 **`self`** = đại diện cho object đang được tạo ra.  
> Hiểu như "chiếc bánh **này**" — phân biệt bánh này với bánh khác.

### 📌 Ví dụ

**Input:** Tạo 2 học sinh với thông tin khác nhau  
**Output:** In thông tin và điểm trung bình của từng người

### 💻 Code

```python
# === ĐỊNH NGHĨA CLASS ===
class HocSinh:
    """Class đại diện cho một học sinh."""

    def __init__(self, ten, lop, diem_cac_mon):
        # Các dòng self. = khai báo thuộc tính của object
        self.ten         = ten           # Tên
        self.lop         = lop           # Lớp
        self.diem_cac_mon = diem_cac_mon  # List điểm các môn

    def tinh_diem_trung_binh(self):
        """Tính điểm trung bình."""
        if not self.diem_cac_mon:
            return 0
        return sum(self.diem_cac_mon) / len(self.diem_cac_mon)

    def xep_loai(self):
        """Xếp loại dựa trên điểm TB."""
        diem_tb = self.tinh_diem_trung_binh()
        if diem_tb >= 8.0:   return "Giỏi"
        elif diem_tb >= 6.5: return "Khá"
        elif diem_tb >= 5.0: return "Trung Bình"
        else:                return "Yếu"

    def gioi_thieu(self):
        """In thông tin học sinh."""
        diem_tb = self.tinh_diem_trung_binh()
        print(f"  Tên: {self.ten} | Lớp: {self.lop} | "
              f"TB: {diem_tb:.2f} | Xếp loại: {self.xep_loai()}")

    def __str__(self):
        # Phương thức đặc biệt: chạy khi print(object)
        return f"HocSinh({self.ten}, {self.lop})"


# === TẠO OBJECTS TỪ CLASS ===
hs1 = HocSinh("Nguyễn An",   "10A1", [9, 8, 10, 7])    # Object 1
hs2 = HocSinh("Trần Bình",   "10A2", [6, 7, 5, 8])     # Object 2
hs3 = HocSinh("Lê Cúc",      "10A1", [10, 9, 8, 10])   # Object 3

# Truy cập thuộc tính (dấu chấm)
print(hs1.ten)        # → Nguyễn An
print(hs1.lop)        # → 10A1

# Gọi phương thức (dấu chấm + dấu ngoặc)
print(hs1.tinh_diem_trung_binh())   # → 8.5
hs1.gioi_thieu()
hs2.gioi_thieu()
hs3.gioi_thieu()

# Dùng print() sẽ gọi __str__
print(hs1)   # → HocSinh(Nguyễn An, 10A1)

# Tổ chức nhiều object vào list
lop_hoc = [hs1, hs2, hs3]
print("\n=== BẢNG ĐIỂM LỚP ===")
for hoc_sinh in lop_hoc:
    hoc_sinh.gioi_thieu()
```

### ⚠️ Lỗi thường gặp

```python
# LỖI 1: Quên self khi khai báo phương thức
class Meo:
    def len_tieng():    # ❌ Thiếu self!
        print("Meo meo")

    def len_tieng(self):  # ✅

# LỖI 2: Quên dấu () khi tạo object
hs = HocSinh          # ❌ Đây là class, không phải object!
hs = HocSinh("An", "10A", [8,9])  # ✅ Phải có ()

# LỖI 3: Nhầm self.x và x
class HocSinh:
    def __init__(self, ten):
        ten = ten          # ❌ Chỉ là biến cục bộ, không lưu vào object!
        self.ten = ten     # ✅ Lưu vào object thông qua self
```

---

## 📖 Kiến thức 3: Tính Đóng Gói (Encapsulation)

### ✅ Giải thích

**Ẩn dụ: Tủ ATM**

> 💳 Bạn không thể thò tay vào ATM lấy tiền tùy ý.  
> Bạn CHỈ có thể tương tác qua **màn hình và nút bấm** (như phương thức getter/setter).  
> Bên trong máy ATM có tiền và logic bảo vệ — bạn không được đụng trực tiếp.

**Cách áp dụng trong Python:**
- `__ten_bien` (hai dấu `__`) → thuộc tính **private** — không ai ngoài class được truy cập thẳng
- **Getter** = phương thức chỉ cho đọc
- **Setter** = phương thức cho phép sửa nhưng **có kiểm tra điều kiện**

```python
class TaiKhoan:
    def __init__(self, so_du):
        self.__so_du = so_du        # Private: ai cũng thấy tên, nhưng không sửa được

    def get_so_du(self):            # Getter: cho phép ĐỌC
        return self.__so_du

    def rut_tien(self, so_tien):    # Setter có bảo vệ
        if so_tien > self.__so_du:
            print("Số dư không đủ!")
        else:
            self.__so_du -= so_tien
```

> 💡 **Tại sao cần đóng gói?**  
> Nếu `so_du` public, ai cũng có thể làm `tk.so_du = -999999` → phi lý!  
> Đóng gói bắt mọi thao tác phải đi qua hàm kiểm tra.

### 📌 Ví dụ

**Input:** Tài khoản với số dư 500.000đ. Rút 200.000đ rồi rút thêm 400.000đ  
**Output:** Thông báo giao dịch thành công / thất bại

### 💻 Code

```python
class TaiKhoanNganHang:
    """Tài khoản ngân hàng với đóng gói dữ liệu."""

    def __init__(self, so_tai_khoan, ten_chu, so_du_ban_dau=0):
        self.so_tai_khoan       = so_tai_khoan    # Public
        self.ten_chu            = ten_chu          # Public
        self.__so_du            = so_du_ban_dau    # PRIVATE (hai dấu __)
        self.__lich_su_gd       = []               # PRIVATE

    # Getter: cho phép đọc nhưng không sửa trực tiếp
    def get_so_du(self):
        return self.__so_du

    # Nộp tiền: setter có kiểm tra
    def nap_tien(self, so_tien):
        if so_tien <= 0:
            print(f"  ✗ Số tiền nạp phải > 0!")
            return False
        self.__so_du += so_tien
        self.__lich_su_gd.append(f"Nạp: +{so_tien:,}")
        print(f"  ✓ Nạp {so_tien:,}đ | Số dư mới: {self.__so_du:,}đ")
        return True

    # Rút tiền: setter có kiểm tra
    def rut_tien(self, so_tien):
        if so_tien <= 0:
            print(f"  ✗ Số tiền phải > 0!")
            return False
        if so_tien > self.__so_du:
            print(f"  ✗ Số dư không đủ! (Có: {self.__so_du:,}đ)")
            return False
        self.__so_du -= so_tien
        self.__lich_su_gd.append(f"Rút: -{so_tien:,}")
        print(f"  ✓ Rút {so_tien:,}đ | Số dư còn: {self.__so_du:,}đ")
        return True

    def in_lich_su(self):
        print(f"\n  [{self.so_tai_khoan}] {self.ten_chu}")
        for gd in self.__lich_su_gd:
            print(f"    • {gd}")
        print(f"  Số dư hiện tại: {self.__so_du:,}đ")


# Demo
tk = TaiKhoanNganHang("STK001", "Nguyễn An", 500_000)

tk.nap_tien(300_000)    # ✓
tk.rut_tien(200_000)    # ✓
tk.rut_tien(800_000)    # ✗ – không đủ
tk.nap_tien(-5_000)     # ✗ – số âm

# Thử truy cập private trực tiếp
# tk.__so_du = 999_999  # ❌ Không hoạt động như mong đợi (Python tạo biến mới)
print(f"\n  Đọc qua getter: {tk.get_so_du():,}đ")  # ✅ Đúng cách

tk.in_lich_su()
```

### ⚠️ Lỗi thường gặp

```python
# LỖI 1: Nhầm _ (protected) với __ (private)
self._so_du = 100    # Protected: quy ước "đừng truy cập trực tiếp" nhưng VẪN được
self.__so_du = 100   # Private: Python đổi tên thành _TenClass__so_du

# LỖI 2: Nghĩ rằng __ là khóa tuyệt đối
tk.__so_du = 999     # Python tạo biến MỚI tên __so_du! Không thay đổi biến gốc!
tk._TaiKhoanNganHang__so_du = 999  # Kỹ thuật này MỚI thực sự truy cập được
# → Nhưng đừng làm vậy! Đó là lý do tại sao đóng gói quan trọng về mặt quy ước

# LỖI 3: Getter không cần tham số ngoài self
def get_so_du(self, x):   # ❌ getter thường không cần tham số thêm
def get_so_du(self):      # ✅
```

---

## 📖 Kiến thức 4: Tính Kế Thừa (Inheritance)

### ✅ Giải thích

**Ẩn dụ: Di truyền trong gia đình**

> 👨‍👩‍👧 Con cái **thừa hưởng** từ bố mẹ:  
> - Màu tóc, nhóm máu = thuộc tính kế thừa  
> - Các kỹ năng và tính cách riêng = thuộc tính mới  

Trong OOP:
- **Class cha** = bố/mẹ (có những thứ dùng chung)
- **Class con** = đứa con (thừa hưởng + thêm đặc điểm riêng)

```python
class cha_me:             # Class cha
    def noi_chung(self):
        print("Kỹ năng chung")

class con_cai(cha_me):   # Class con – () là kế thừa từ cha_me
    def rieng_cua_con(self):
        print("Kỹ năng riêng")

# Đứa con dùng được cả kỹ năng của bố mẹ lẫn của chính mình!
con = con_cai()
con.noi_chung()     # Từ bố mẹ ✅
con.rieng_cua_con() # Của mình ✅
```

> 💡 `super()` = "gọi cho bố/mẹ" — dùng khi class con muốn mở rộng thêm constructor của bố/mẹ

### 📌 Ví dụ — Hệ thống nhân viên

**Mô hình:** `NhanVien` (cha) → `QuanLy` (con) → `GiamDoc` (cháu)

### 💻 Code

```python
# === CLASS CHA ===
class NhanVien:
    """Class cha đại diện cho nhân viên thông thường."""

    def __init__(self, ten, phong_ban, luong_co_ban):
        self.ten          = ten
        self.phong_ban    = phong_ban
        self.__luong      = luong_co_ban    # Private

    def get_luong(self):
        return self.__luong

    def tang_luong(self, phan_tram):
        if 0 < phan_tram <= 30:
            self.__luong *= (1 + phan_tram / 100)
            print(f"  ✓ Lương {self.ten} tăng {phan_tram}% → {self.__luong:,.0f}đ")
        else:
            print(f"  ✗ % tăng không hợp lệ (phải từ 0 đến 30)")

    def gioi_thieu(self):
        print(f"  [{type(self).__name__}] {self.ten} | Phòng: {self.phong_ban} | Lương: {self.__luong:,}đ")


# === CLASS CON – kế thừa NhanVien ===
class QuanLy(NhanVien):
    """Quản lý = Nhân viên + có nhóm phụ trách."""

    def __init__(self, ten, phong_ban, luong_co_ban, nhan_vien_phu_trach):
        # super() gọi constructor của NhanVien – tránh viết lại
        super().__init__(ten, phong_ban, luong_co_ban)
        # Thêm thuộc tính riêng của QuanLy
        self.__nv_phu_trach = nhan_vien_phu_trach   # list các NhanVien

    def them_nhan_vien(self, nv):
        self.__nv_phu_trach.append(nv)
        print(f"  + {nv.ten} giờ báo cáo cho {self.ten}")

    def bao_cao_phong(self):
        print(f"\n  --- Phòng {self.phong_ban} (QL: {self.ten}) ---")
        for nv in self.__nv_phu_trach:
            print(f"    • {nv.ten}: {nv.get_luong():,}đ")


# === CLASS CHÁU – kế thừa QuanLy ===
class GiamDoc(QuanLy):
    """Giám đốc = Quản lý + có quyền quyết định chiến lược."""

    def __init__(self, ten, luong_co_ban, cong_ty):
        super().__init__(ten, "Ban Giám Đốc", luong_co_ban, [])
        self.cong_ty = cong_ty   # Thuộc tính riêng

    def ra_quyet_dinh(self, quyet_dinh):
        print(f"  📢 {self.ten} ({self.cong_ty}) quyết định: {quyet_dinh}")


# === DEMO ===
print("=== HỆ THỐNG NHÂN VIÊN ===")

# Tạo objects
nv1 = NhanVien("Hoàng Minh", "Kỹ thuật", 15_000_000)
nv2 = NhanVien("Phạm Hoa",   "Kỹ thuật", 12_000_000)
ql  = QuanLy("Lê Nam", "Kỹ thuật", 25_000_000, [])
gd  = GiamDoc("Trần Bình", 50_000_000, "MindX Tech")

# Giới thiệu – gọi cùng phương thức gioi_thieu() từ class cha
print("\nDanh sách nhân viên:")
for nguoi in [nv1, nv2, ql, gd]:
    nguoi.gioi_thieu()   # Tất cả đều có phương thức này từ NhanVien

# Kế thừa: ql dùng được tang_luong() từ NhanVien
ql.them_nhan_vien(nv1)
ql.them_nhan_vien(nv2)
ql.bao_cao_phong()

nv1.tang_luong(10)   # Tăng 10% hợp lệ
gd.ra_quyet_dinh("Mở thêm văn phòng tại Đà Nẵng")

# Kiểm tra kế thừa
print("\n--- Kiểm tra isinstance ---")
print(f"  gd là GiamDoc?  {isinstance(gd, GiamDoc)}")    # True
print(f"  gd là QuanLy?   {isinstance(gd, QuanLy)}")     # True – vì GiamDoc kế thừa QuanLy
print(f"  gd là NhanVien? {isinstance(gd, NhanVien)}")   # True – kế thừa nhiều cấp
print(f"  nv1 là QuanLy?  {isinstance(nv1, QuanLy)}")    # False
```

### ⚠️ Lỗi thường gặp

```python
# LỖI 1: Quên gọi super().__init__() trong class con
class QuanLy(NhanVien):
    def __init__(self, ten, luong, phong):
        # Quên super().__init__ → self.ten, self.luong không được khởi tạo!
        self.phong = phong   # Chỉ có phong, không có ten, luong

# ✅ Sửa:
class QuanLy(NhanVien):
    def __init__(self, ten, luong, phong):
        super().__init__(ten, luong)   # Gọi cha trước
        self.phong = phong             # Rồi thêm của mình

# LỖI 2: Không kế thừa đúng cú pháp
class QuanLy extends NhanVien:   # ❌ Java syntax! Không dùng được trong Python
class QuanLy(NhanVien):          # ✅ Python syntax
```

---

## 💻 Demo Tổng Hợp — Hệ Thống Trường Học

```python
# ============================================================
#  DEMO: Class + Encapsulation + Inheritance
#  Mô hình: Nguoi → HocSinh, GiaoVien
# ============================================================

class Nguoi:
    """Class cha – có tên và tuổi."""
    def __init__(self, ten, tuoi):
        self.ten  = ten
        self.__tuoi = tuoi   # Private

    def get_tuoi(self): return self.__tuoi

    def gioi_thieu(self):
        print(f"  Tên: {self.ten} | Tuổi: {self.__tuoi}")


class HocSinh(Nguoi):
    """Học sinh kế thừa Nguoi, thêm điểm và lớp."""
    def __init__(self, ten, tuoi, lop, diem):
        super().__init__(ten, tuoi)
        self.lop  = lop
        self.__diem = diem   # Private

    def get_diem_tb(self):
        return sum(self.__diem) / len(self.__diem) if self.__diem else 0

    def gioi_thieu(self):       # Override phương thức của cha
        super().gioi_thieu()    # Gọi cha trước
        print(f"  Lớp: {self.lop} | ĐTB: {self.get_diem_tb():.2f}")


class GiaoVien(Nguoi):
    """Giáo viên kế thừa Nguoi, thêm môn dạy và lương."""
    def __init__(self, ten, tuoi, mon_day, luong):
        super().__init__(ten, tuoi)
        self.mon_day = mon_day
        self.__luong = luong

    def gioi_thieu(self):
        super().gioi_thieu()
        print(f"  Dạy môn: {self.mon_day} | Lương: {self.__luong:,}đ")


print("=== TRƯỜNG HỌC MINDX ===\n")
hoc_sinh = [
    HocSinh("An",   16, "10A1", [9, 8, 10]),
    HocSinh("Bình", 15, "10A2", [7, 6, 8]),
]
giao_vien = [
    GiaoVien("Cô Hoa", 30, "Toán", 18_000_000),
    GiaoVien("Thầy Nam", 35, "Lý",  20_000_000),
]

print("--- Học sinh ---")
for hs in hoc_sinh:
    hs.gioi_thieu(); print()

print("--- Giảng viên ---")
for gv in giao_vien:
    gv.gioi_thieu(); print()
```

---

## 📝 Bài Tập Trên Lớp

### 🟢 Bài 1 (Dễ): Class Xe Hơi
> Tạo class `XeHoi` với: `hang_xe`, `mau_xe`, `toc_do` (khởi đầu = 0).  
> Phương thức: `tang_toc(them)`, `giam_toc(bot)`, `mo_ta()`.  
> Tạo 2 xe, tăng tốc và giảm tốc, in mô tả.

### 🟡 Bài 2 (Trung bình): Đóng gói Mật Khẩu
> Class `TaiKhoan(ten_dang_nhap, mat_khau)`.  
> `__mat_khau` là private.  
> Phương thức `dang_nhap(mat_khau_nhap)` → trả True/False.  
> Phương thức `doi_mat_khau(cu, moi)` → kiểm tra mật khẩu cũ đúng mới cho đổi.

### 🔴 Bài 3 (Nâng cao nhẹ): Kế thừa Động Vật
> Class `DongVat(ten, can_nang)` với `an()`, `ngu()`.  
> Class `Cho(DongVat)` thêm phương thức `sua(n_lan)` — in "Gâu!" n lần.  
> Class `Meo(DongVat)` thêm `de_thuong()` — in "Meo meo~ 😺".  
> Tạo list 5 con vật hỗn hợp, dùng for gọi `.an()` cho tất cả.

---

## 🏠 Bài Tập Về Nhà

### 🏠 Bài 1: Quản lý sản phẩm
> Class `SanPham(ten, gia, so_luong_ton)`.  
> `__gia` và `__so_luong_ton` là private.  
> Phương thức `ban(so_luong)` — giảm tồn kho, báo lỗi nếu không đủ.  
> Phương thức `nhap_hang(so_luong)` — tăng tồn kho.  
> Phương thức `thong_tin()` — in thông tin đẹp.

### 🏠 Bài 2: Kế thừa phương tiện
> Class `PhuongTien(ten, van_toc_km_h, gia_xang_lit)`.  
> Phương thức `tinh_chi_phi_di_chuyen(km)` — tính tiền xăng.  
> Class `XeHoi(PhuongTien)` thêm `so_cho_ngoi`.  
> Class `XeTai(PhuongTien)` thêm `tai_trong_tan`.  
> Tạo 3 phương tiện, tính chi phí chuyến đi 100km mỗi loại.

---

## 🎯 Tổng Kết Buổi 3

**3 điều PHẢI nhớ:**
1. 🏛️ **Class = Khuôn, Object = Sản phẩm** — `__init__` chạy tự động khi tạo object mới
2. 🔒 **Đóng gói = Bảo vệ dữ liệu** — `__bien` để private, getter/setter để kiểm soát truy cập
3. 🧬 **Kế thừa = Tái sử dụng code** — `class Con(Cha)` + `super().__init__(...)` để khởi tạo đầy đủ

**Buổi tiếp theo (Buổi 4):** Học 2 tính chất còn lại của OOP:  
**Đa Hình** (cùng tên phương thức, hành vi khác nhau) và  
**Trừu Tượng** (ẩn chi tiết, chỉ lộ giao diện cần thiết).

# =============================================================
#  Course  : CSB – Nền Tảng Lập Trình Python
#  Buổi   : 3 – Lập Trình Hướng Đối Tượng (OOP) – Phần 1
#  Nội dung: Class, Object, Encapsulation, Inheritance
# =============================================================


# ─────────────────────────────────────────────
# PHẦN 1 – CLASS, OBJECT VÀ __init__
# ─────────────────────────────────────────────

class NhanVien:
    """Class đại diện cho một nhân viên trong công ty."""

    # __init__ là constructor: tự động chạy khi tạo object mới
    def __init__(self, ten, chuc_vu, luong):
        # Thuộc tính private (dấu __) – không truy cập trực tiếp từ bên ngoài
        self.__ten    = ten
        self.__chuc_vu = chuc_vu
        self.__luong  = luong    # Lưu trữ số tiền – cần bảo vệ, không cho sửa tùy tiện

    # ── GETTER – cho phép đọc dữ liệu private ──────────────────
    def get_ten(self):
        return self.__ten

    def get_chuc_vu(self):
        return self.__chuc_vu

    def get_luong(self):
        return self.__luong

    # ── SETTER – cho phép sửa có kiểm tra điều kiện ────────────
    def tang_luong(self, phan_tram):
        """Tăng lương theo % – phải > 0 và <= 50% mỗi lần."""
        if phan_tram <= 0 or phan_tram > 50:
            print(f"  [!] Phần trăm tăng lương không hợp lệ: {phan_tram}%")
            return
        luong_cu  = self.__luong
        self.__luong = round(self.__luong * (1 + phan_tram / 100))
        print(f"  Tăng lương {phan_tram}%: {luong_cu:,} → {self.__luong:,} VNĐ")

    # ── PHƯƠNG THỨC HÀNH ĐỘNG ────────────────────────────────────
    def gioi_thieu(self):
        """In thông tin cơ bản của nhân viên."""
        print(f"  Tên     : {self.__ten}")
        print(f"  Chức vụ : {self.__chuc_vu}")
        print(f"  Lương   : {self.__luong:,} VNĐ")

    # __str__ – phương thức đặc biệt, trả về chuỗi khi print(object)
    def __str__(self):
        return f"NhanVien({self.__ten}, {self.__chuc_vu})"


# ─────────────────────────────────────────────
# PHẦN 2 – TÍNH KẾ THỪA (INHERITANCE)
# ─────────────────────────────────────────────

class QuanLy(NhanVien):
    """Class QuanLy kế thừa từ NhanVien – có thêm phòng ban và nhóm."""

    def __init__(self, ten, luong, phong_ban):
        # super() gọi constructor của class cha (NhanVien)
        super().__init__(ten, chuc_vu="Quản lý", luong=luong)
        # Thuộc tính riêng của QuanLy – class cha không có
        self.__phong_ban = phong_ban
        self.__danh_sach_nhan_vien = []   # Danh sách nhân viên được quản lý

    def get_phong_ban(self):
        return self.__phong_ban

    def them_nhan_vien(self, nhan_vien):
        """Thêm một nhân viên vào danh sách quản lý."""
        self.__danh_sach_nhan_vien.append(nhan_vien)
        print(f"  ✓ Đã thêm '{nhan_vien.get_ten()}' vào phòng {self.__phong_ban}")

    # Override phương thức gioi_thieu của class cha – bổ sung thêm thông tin
    def gioi_thieu(self):
        super().gioi_thieu()    # Gọi phương thức giới thiệu của NhanVien trước
        print(f"  Phòng ban: {self.__phong_ban}")
        print(f"  Quản lý  : {len(self.__danh_sach_nhan_vien)} nhân viên")

    def bao_cao_phong(self):
        """In báo cáo lương toàn phòng."""
        print(f"\n  --- Báo cáo phòng {self.__phong_ban} ---")
        tong_luong = self.get_luong()    # Tính cả lương của quản lý
        for nv in self.__danh_sach_nhan_vien:
            print(f"    {nv.get_ten():<12}: {nv.get_luong():>14,} VNĐ")
            tong_luong += nv.get_luong()
        print(f"  Tổng quỹ lương phòng : {tong_luong:,} VNĐ")


# ─────────────────────────────────────────────
# PHẦN 3 – SỬ DỤNG CLASSES -> TẠO OBJECTS
# ─────────────────────────────────────────────

print("=" * 50)
print("  DEMO OOP – QUẢN LÝ NHÂN VIÊN")
print("=" * 50)

# Tạo các nhân viên thông thường
nv1 = NhanVien("Nguyễn Minh", "Lập trình viên", 15_000_000)
nv2 = NhanVien("Trần Hoa",    "Designer",       13_000_000)
nv3 = NhanVien("Lê Tuấn",     "Tester",         12_000_000)

# Tạo quản lý
ql1 = QuanLy("Phạm Lan", 28_000_000, "Kỹ thuật")

print("\n--- THÔNG TIN NHÂN VIÊN ---")
nv1.gioi_thieu()

print("\n--- THÔNG TIN QUẢN LÝ ---")
ql1.gioi_thieu()

# Kiểm tra đóng gói: truy cập private trực tiếp sẽ báo lỗi
print("\n--- KIỂM TRA ĐÓNG GÓI ---")
# print(nv1.__luong)    # ← Dòng này sẽ gây AttributeError!
print(f"  Truy cập qua getter: {nv1.get_luong():,} VNĐ  ✓")

# Tăng lương thông qua phương thức có kiểm tra
print("\n--- TĂNG LƯƠNG ---")
nv1.tang_luong(10)       # Hợp lệ: tăng 10%
nv1.tang_luong(60)       # Không hợp lệ: quá 50%
nv1.tang_luong(-5)       # Không hợp lệ: âm

# Thêm nhân viên vào phòng của quản lý
print("\n--- TỔ CHỨC PHÒNG BAN ---")
ql1.them_nhan_vien(nv1)
ql1.them_nhan_vien(nv2)
ql1.them_nhan_vien(nv3)
ql1.bao_cao_phong()

# Kiểm tra kế thừa: isinstance()
print("\n--- KIỂM TRA KẾ THỪA ---")
print(f"  ql1 là QuanLy?   {isinstance(ql1, QuanLy)}")    # True
print(f"  ql1 là NhanVien? {isinstance(ql1, NhanVien)}")  # True – vì kế thừa!
print(f"  nv1 là QuanLy?   {isinstance(nv1, QuanLy)}")    # False

# __str__ method
print(f"\n  str(nv1) = {nv1}")
print(f"  str(ql1) = {ql1}")

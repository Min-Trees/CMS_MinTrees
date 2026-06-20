# =============================================================
#  Course  : CSB – Nền Tảng Lập Trình Python
#  Buổi   : 12 & 13 – Luyện Tập & Giải Đề
#  Nội dung: Giải mẫu các dạng bài thi cuối khóa CSB
# =============================================================


# ═══════════════════════════════════════════════════════════
# ĐỀ MẪU 1 – CÂU 1: ĐẾM SỐ NGUYÊN TỐ
# ═══════════════════════════════════════════════════════════

def la_nguyen_to(n):
    """Kiểm tra n có phải số nguyên tố không."""
    if n < 2: return False
    for i in range(2, int(n**0.5) + 1):   # Chỉ cần kiểm tra đến √n
        if n % i == 0:
            return False
    return True


def dem_nguyen_to(gioi_han):
    """Đếm số lượng số nguyên tố từ 2 đến gioi_han."""
    return sum(1 for x in range(2, gioi_han + 1) if la_nguyen_to(x))


print("=" * 55)
print("  ĐỀ MẪU 1 – CÂU 1: SỐ NGUYÊN TỐ")
print("=" * 55)
cac_snt_den_30 = [x for x in range(2, 31) if la_nguyen_to(x)]
print(f"  Số nguyên tố từ 2 đến 30: {cac_snt_den_30}")
print(f"  Số lượng                 : {dem_nguyen_to(30)}")
print(f"  Từ 2 đến 100            : {dem_nguyen_to(100)} số nguyên tố")
print()


# ═══════════════════════════════════════════════════════════
# ĐỀ MẪU 1 – CÂU 2: OOP TÀI KHOẢN NGÂN HÀNG
# ═══════════════════════════════════════════════════════════

print("=" * 55)
print("  ĐỀ MẪU 1 – CÂU 2: OOP TÀI KHOẢN")
print("=" * 55)

class TaiKhoan:
    """Tài khoản ngân hàng có đóng gói số dư."""

    _id_ke_tiep = 1

    def __init__(self, chu_tai_khoan, so_du_ban_dau=0):
        self.__so_tai_khoan   = f"VCB{TaiKhoan._id_ke_tiep:06d}"
        TaiKhoan._id_ke_tiep += 1
        self.__chu_tai_khoan  = chu_tai_khoan
        self.__so_du          = so_du_ban_dau
        self.__lich_su        = []    # Lưu lịch sử giao dịch

    def get_so_du(self):
        return self.__so_du

    def nap_tien(self, so_tien):
        if so_tien <= 0:
            print(f"  ✗ Số tiền nạp phải > 0")
            return
        self.__so_du += so_tien
        self.__lich_su.append(f"+{so_tien:,}")
        print(f"  ✓ Nạp {so_tien:,} VNĐ | Số dư: {self.__so_du:,} VNĐ")

    def rut_tien(self, so_tien):
        if so_tien <= 0:
            print(f"  ✗ Số tiền rút phải > 0")
            return
        if so_tien > self.__so_du:
            print(f"  ✗ Số dư không đủ ({self.__so_du:,} < {so_tien:,})")
            return
        self.__so_du -= so_tien
        self.__lich_su.append(f"-{so_tien:,}")
        print(f"  ✓ Rút {so_tien:,} VNĐ | Số dư: {self.__so_du:,} VNĐ")

    def in_so_du(self):
        print(f"  [{self.__so_tai_khoan}] {self.__chu_tai_khoan}: {self.__so_du:,} VNĐ")
        print(f"  Lịch sử: {' | '.join(self.__lich_su[-5:]) if self.__lich_su else 'Không có'}")


tk1 = TaiKhoan("Nguyễn An", 5_000_000)
tk1.nap_tien(3_000_000)
tk1.rut_tien(2_000_000)
tk1.rut_tien(10_000_000)   # Không đủ tiền
tk1.in_so_du()
print()


# ═══════════════════════════════════════════════════════════
# ĐỀ MẪU 1 – CÂU 3: BUBBLE SORT + BINARY SEARCH
# ═══════════════════════════════════════════════════════════

print("=" * 55)
print("  ĐỀ MẪU 1 – CÂU 3: SORT + SEARCH")
print("=" * 55)

so = [64, 34, 25, 12, 22, 11, 90]

def bubble_sort_demo(arr):
    a = arr.copy()
    n = len(a)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if a[j] > a[j+1]:
                a[j], a[j+1] = a[j+1], a[j]
        print(f"  Sau vòng {i+1}: {a}")
    return a

print(f"  Input: {so}")
so_sorted = bubble_sort_demo(so)
print(f"  Kết quả: {so_sorted}")

def binary_search_dem_buoc(ds, target):
    l, r, buoc = 0, len(ds)-1, 0
    while l <= r:
        buoc += 1
        m = (l+r)//2
        if ds[m] == target: return m, buoc
        elif ds[m] < target: l = m+1
        else: r = m-1
    return -1, buoc

vi_tri, so_buoc = binary_search_dem_buoc(so_sorted, 22)
print(f"\n  Binary Search tìm 22: vị trí={vi_tri}, số bước={so_buoc}")
print()


# ═══════════════════════════════════════════════════════════
# ĐỀ MẪU 2 – CÂU 1: STACK + NGOẶC HỢP LỆ
# ═══════════════════════════════════════════════════════════

print("=" * 55)
print("  ĐỀ MẪU 2 – CÂU 1: STACK NGOẶC")
print("=" * 55)

def kiem_tra_ngoac(s):
    stack = []
    cap = {')':'(', ']':'[', '}':'{'}
    for c in s:
        if c in '([{': stack.append(c)
        elif c in ')]}':
            if not stack or stack[-1] != cap[c]: return False
            stack.pop()
    return len(stack) == 0

for chuoi in ["(())", "({[]})", "([)]", "(()", "()[]{}"]:
    ket = "✓ Hợp lệ" if kiem_tra_ngoac(chuoi) else "✗ Không hợp lệ"
    print(f"  '{chuoi}' → {ket}")
print()


# ═══════════════════════════════════════════════════════════
# ĐỀ MẪU 2 – CÂU 3: OOP ĐA HÌNH
# ═══════════════════════════════════════════════════════════

print("=" * 55)
print("  ĐỀ MẪU 2 – CÂU 3: OOP ĐA HÌNH")
print("=" * 55)

from abc import ABC, abstractmethod
from collections import deque

class DongVat(ABC):
    def __init__(self, ten):
        self.ten = ten

    @abstractmethod
    def am_thanh(self):
        pass

    def an(self):
        print(f"  {self.ten} đang ăn...")

class Cho(DongVat):
    def am_thanh(self):
        print(f"  {self.ten}: Gâu gâu! 🐕")

class Meo(DongVat):
    def am_thanh(self):
        print(f"  {self.ten}: Meo meo~ 🐈")

class Chim(DongVat):
    def am_thanh(self):
        print(f"  {self.ten}: Chíp chíp! 🐦")

vuon_thu = [Cho("Cún"), Meo("Mướp"), Chim("Vàng Anh"), Cho("Rex"), Meo("Bông")]
for con_vat in vuon_thu:
    con_vat.am_thanh()   # Đa hình: cùng lệnh gọi, hành vi khác nhau
print()


# ═══════════════════════════════════════════════════════════
# ĐỀ MẪU 2 – CÂU 4: TỔNG HỢP SET + DICT
# ═══════════════════════════════════════════════════════════

print("=" * 55)
print("  ĐỀ MẪU 2 – CÂU 4: SET + DICTIONARY")
print("=" * 55)

# Mô phỏng dữ liệu đăng ký (thay vì đọc file)
dang_ky = [
    ("An", "Python"), ("An", "AI"), ("An", "Data"),
    ("Bình", "Python"), ("Bình", "AI"),
    ("Cúc", "Python"),
    ("Dũng", "AI"), ("Dũng", "Python"), ("Dũng", "Data"), ("Dũng", "Web"),
    ("Én", "Web"),
]

# Đếm số môn của mỗi học sinh
so_mon = {}
mon_dict = {}   # {mon: set(ten)}
for ten, mon in dang_ky:
    so_mon[ten]  = so_mon.get(ten, 0) + 1
    if mon not in mon_dict: mon_dict[mon] = set()
    mon_dict[mon].add(ten)

# Học sinh đăng ký nhiều nhất
hs_nhieu_nhat = max(so_mon, key=lambda k: so_mon[k])
mon_it_nhat   = min(mon_dict, key=lambda k: len(mon_dict[k]))

print(f"  Số môn mỗi học sinh: {so_mon}")
print(f"  Học sinh đăng ký nhiều nhất: {hs_nhieu_nhat} ({so_mon[hs_nhieu_nhat]} môn)")
print(f"  Môn được đăng ký ít nhất   : {mon_it_nhat} ({len(mon_dict[mon_it_nhat])} học sinh)")

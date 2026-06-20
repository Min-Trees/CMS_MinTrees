# =============================================================
#  Course  : CSB – Nền Tảng Lập Trình Python
#  Buổi   : 8 – Thực Hành Tổng Hợp
#  Nội dung: OOP + Thuật toán + List + File → Hệ thống Thư Viện
# =============================================================

import os


# ─────────────────────────────────────────────
# PHẦN 1 – CLASS SACH
# ─────────────────────────────────────────────

class Sach:
    """Đại diện cho một cuốn sách trong thư viện."""

    _so_luong = 0   # Biến class: đếm tổng số sách đã tạo

    def __init__(self, tieu_de, tac_gia, nam_xb, the_loai):
        Sach._so_luong += 1
        self.__ma_sach  = f"S{Sach._so_luong:03d}"   # S001, S002, ...
        self.__tieu_de  = tieu_de
        self.__tac_gia  = tac_gia
        self.__nam_xb   = nam_xb
        self.__the_loai = the_loai
        self.__da_muon  = False              # Trạng thái: chưa mượn
        self.__nguoi_muon = None             # Ai đang mượn sách này

    # Getter
    def get_ma(self):      return self.__ma_sach
    def get_ten(self):     return self.__tieu_de
    def get_tac_gia(self): return self.__tac_gia
    def get_nam(self):     return self.__nam_xb
    def get_loai(self):    return self.__the_loai
    def la_da_muon(self):  return self.__da_muon

    def muon(self, ten_doc_gia):
        """Đăng ký mượn sách – trả False nếu đang được mượn."""
        if self.__da_muon:
            return False
        self.__da_muon    = True
        self.__nguoi_muon = ten_doc_gia
        return True

    def tra_sach(self):
        """Trả sách về trạng thái có sẵn."""
        self.__da_muon    = False
        self.__nguoi_muon = None

    def __str__(self):
        trang_thai = f"[Đang mượn: {self.__nguoi_muon}]" if self.__da_muon else "[Còn sẵn]"
        return f"[{self.__ma_sach}] {self.__tieu_de:<35} – {self.__tac_gia:<12} ({self.__nam_xb}) {trang_thai}"


# ─────────────────────────────────────────────
# PHẦN 2 – CLASS THU VIEN
# ─────────────────────────────────────────────

class ThuVien:
    """Quản lý kho sách, thao tác tìm kiếm và sắp xếp."""

    def __init__(self, ten_thu_vien):
        self.__ten   = ten_thu_vien
        self.__kho   = []         # List các object Sach

    def them_sach(self, sach):
        """Thêm một cuốn sách vào kho."""
        self.__kho.append(sach)
        print(f"  ✓ Đã thêm: {sach.get_ten()}")

    def hien_thi_kho(self):
        """In danh sách toàn bộ kho sách."""
        print(f"\n{'='*70}")
        print(f"  📚 THƯ VIỆN: {self.__ten}  ({len(self.__kho)} đầu sách)")
        print(f"{'='*70}")
        for sach in self.__kho:
            print(f"  {sach}")

    # ── TÌM KIẾM TUYẾN TÍNH (theo tiêu đề, không phân biệt hoa thường) ───
    def tim_kiem(self, tu_khoa):
        """Linear Search: tìm sách theo từ khóa trong tiêu đề."""
        ket_qua = []
        tu_khoa_lower = tu_khoa.lower()
        for sach in self.__kho:
            if tu_khoa_lower in sach.get_ten().lower():
                ket_qua.append(sach)
        return ket_qua

    # ── SẮP XẾP (Insertion Sort theo năm xuất bản) ────────────────────────
    def sap_xep_theo_nam(self, tang_dan=True):
        """Insertion Sort sắp xếp kho sách theo năm xuất bản."""
        ds = self.__kho.copy()
        n  = len(ds)
        for i in range(1, n):
            khoa = ds[i]
            j    = i - 1
            if tang_dan:
                while j >= 0 and ds[j].get_nam() > khoa.get_nam():
                    ds[j+1] = ds[j]; j -= 1
            else:
                while j >= 0 and ds[j].get_nam() < khoa.get_nam():
                    ds[j+1] = ds[j]; j -= 1
            ds[j+1] = khoa
        return ds

    def muon_sach(self, ma_sach, ten_doc_gia):
        """Mượn sách theo mã – trả True nếu thành công."""
        for sach in self.__kho:
            if sach.get_ma() == ma_sach.upper():
                if sach.muon(ten_doc_gia):
                    print(f"  ✓ {ten_doc_gia} đã mượn: {sach.get_ten()}")
                    return True
                else:
                    print(f"  ✗ Sách '{sach.get_ten()}' đang được mượn!")
                    return False
        print(f"  ✗ Không tìm thấy mã sách: {ma_sach}")
        return False

    def tra_sach(self, ma_sach):
        """Trả sách theo mã."""
        for sach in self.__kho:
            if sach.get_ma() == ma_sach.upper():
                sach.tra_sach()
                print(f"  ✓ Đã nhận trả sách: {sach.get_ten()}")
                return True
        print(f"  ✗ Không tìm thấy mã sách: {ma_sach}")
        return False

    def luu_file(self, ten_file):
        """Ghi danh mục sách ra file txt."""
        with open(ten_file, "w", encoding="utf-8") as f:
            f.write(f"THƯ VIỆN: {self.__ten}\n")
            f.write("=" * 70 + "\n")
            for sach in self.__kho:
                f.write(str(sach) + "\n")
        print(f"\n  → Đã lưu catalog vào: {ten_file}")

    def thong_ke(self):
        """Thống kê nhanh kho sách."""
        so_con = sum(1 for s in self.__kho if not s.la_da_muon())
        so_muon = len(self.__kho) - so_con
        print(f"\n  Tổng số sách : {len(self.__kho)}")
        print(f"  Còn trong kho: {so_con}")
        print(f"  Đang được mượn: {so_muon}")


# ─────────────────────────────────────────────
# CHƯƠNG TRÌNH CHÍNH – DEMO
# ─────────────────────────────────────────────

tv = ThuVien("MindX Library")

# Thêm sách vào kho
print("--- NHẬP KHO SÁCH ---")
sach_list = [
    Sach("Lập Trình Python Cơ Bản",  "Nguyễn An",   2020, "Lập trình"),
    Sach("Cấu Trúc Dữ Liệu & GT",    "Trần Bình",   2018, "Thuật toán"),
    Sach("Học Máy Thực Hành",         "Lê Cúc",      2022, "AI/ML"),
    Sach("Python cho Khoa Học DL",    "Phạm Dũng",   2021, "Data Science"),
    Sach("Deep Learning cơ bản",      "Hoàng Én",    2023, "AI/ML"),
]
for s in sach_list:
    tv.them_sach(s)

# Hiển thị kho
tv.hien_thi_kho()

# Mượn sách
print("\n--- MƯỢN SÁCH ---")
tv.muon_sach("S003", "Minh Tuấn")
tv.muon_sach("S003", "Thu Hà")    # Mượn sách đang được mượn

# Tìm kiếm
print("\n--- TÌM KIẾM ---")
ket_qua = tv.tim_kiem("python")
print(f"  Từ khóa 'python' → tìm được {len(ket_qua)} sách:")
for s in ket_qua:
    print(f"    {s}")

# Sắp xếp theo năm
print("\n--- SẮP XẾP THEO NĂM (tăng dần) ---")
sach_sap_xep = tv.sap_xep_theo_nam(tang_dan=True)
for s in sach_sap_xep:
    print(f"  ({s.get_nam()}) {s.get_ten()}")

# Thống kê
tv.thong_ke()

# Lưu file
FILE_KQ = "thu_vien.txt"
tv.luu_file(FILE_KQ)

# Trả sách
print("\n--- TRẢ SÁCH ---")
tv.tra_sach("S003")
tv.thong_ke()

# Dọn dẹp
os.remove(FILE_KQ)
print(f"  (Đã xóa file '{FILE_KQ}' sau demo)")

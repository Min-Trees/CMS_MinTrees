# =============================================================
#  Course  : CSB – Nền Tảng Lập Trình Python
#  Buổi   : 2 – Cấu Trúc Dữ Liệu & Xử Lý Tệp
#  Nội dung: List, Hàm (Function), Đọc/Ghi File
# =============================================================

import os

# ─────────────────────────────────────────────
# PHẦN 1 – LÀM VIỆC VỚI LIST
# ─────────────────────────────────────────────

# Tạo danh sách học sinh và điểm tương ứng
hoc_sinh = ["An", "Bình", "Cúc", "Dũng", "Én"]
diem     = [9, 4, 7, 8, 6]

print("=== THAO TÁC VỚI LIST ===")
print(f"Danh sách ban đầu  : {hoc_sinh}")
print(f"Phần tử đầu (ds[0]): {hoc_sinh[0]}")    # Chỉ số 0 – phần tử đầu tiên
print(f"Phần tử cuối (ds[-1]): {hoc_sinh[-1]}") # Chỉ số âm: đếm ngược từ cuối
print(f"3 phần tử đầu [0:3]: {hoc_sinh[0:3]}")  # Slicing: từ vị trí 0 đến 2

# Thêm học sinh mới vào cuối danh sách
hoc_sinh.append("Phong")
diem.append(5)
print(f"\nSau khi .append('Phong') : {hoc_sinh}")

# Chèn "Giang" vào đúng vị trí số 2 (không phải cuối)
hoc_sinh.insert(2, "Giang")
diem.insert(2, 6)
print(f"Sau khi .insert(2,'Giang'): {hoc_sinh}")

# Xóa "Bình" khỏi danh sách theo tên (giá trị)
index_binh = hoc_sinh.index("Bình")   # Tìm vị trí của "Bình" trước
hoc_sinh.remove("Bình")
diem.pop(index_binh)                  # Xóa điểm tương ứng theo vị trí
print(f"Sau khi xóa 'Bình'        : {hoc_sinh}")

# Sắp xếp điểm tăng dần (sorted = tạo list mới, không thay đổi list gốc)
diem_tang = sorted(diem)
diem_giam = sorted(diem, reverse=True)
print(f"\nĐiểm gốc        : {diem}")
print(f"Sắp xếp tăng dần: {diem_tang}")
print(f"Sắp xếp giảm dần: {diem_giam}")
print(f"Điểm cao nhất   : {max(diem)}")
print(f"Điểm thấp nhất  : {min(diem)}")
print()


# ─────────────────────────────────────────────
# PHẦN 2 – ĐỊNH NGHĨA VÀ GỌI HÀM
# ─────────────────────────────────────────────

def tinh_diem_trung_binh(danh_sach_diem):
    """Tính điểm trung bình từ danh sách điểm số."""
    if len(danh_sach_diem) == 0:      # Tránh chia cho 0
        return 0
    return sum(danh_sach_diem) / len(danh_sach_diem)


def tim_hoc_sinh_gioi_nhat(ten, diem_so):
    """Trả về tên và điểm của học sinh có điểm cao nhất."""
    diem_max  = max(diem_so)              # Tìm giá trị lớn nhất
    vi_tri    = diem_so.index(diem_max)   # Tìm vị trí của giá trị đó
    return ten[vi_tri], diem_max          # Trả về 2 giá trị (tuple)


def loc_hoc_sinh_dat(ten, diem_so, nguong=5.0):
    """Lọc học sinh đạt điểm >= ngưỡng.

    Tham số:
        ten      – danh sách tên
        diem_so  – danh sách điểm tương ứng
        nguong   – ngưỡng điểm đạt (mặc định 5.0)
    """
    # List comprehension: cách ngắn gọn thay vì for + append
    return [ten[i] for i in range(len(ten)) if diem_so[i] >= nguong]


print("=== GỌI HÀM ===")

diem_tb = tinh_diem_trung_binh(diem)
print(f"Điểm TB cả lớp    : {diem_tb:.2f}")   # :.2f – hiển thị 2 chữ số thập phân

ten_gioi, diem_gioi = tim_hoc_sinh_gioi_nhat(hoc_sinh, diem)
print(f"Học sinh giỏi nhất: {ten_gioi} ({diem_gioi} điểm)")

danh_sach_dat  = loc_hoc_sinh_dat(hoc_sinh, diem)
danh_sach_gioi = loc_hoc_sinh_dat(hoc_sinh, diem, nguong=7.0)  # Tùy chỉnh ngưỡng
print(f"Học sinh đạt (≥5) : {danh_sach_dat}")
print(f"Học sinh giỏi (≥7): {danh_sach_gioi}")
print()


# ─────────────────────────────────────────────
# PHẦN 3 – GHI VÀ ĐỌC FILE
# ─────────────────────────────────────────────

TEN_FILE = "ket_qua.txt"

# --- Ghi file ---
print("=== GHI FILE ===")
# "with" bảo đảm file được đóng tự động ngay cả khi có lỗi xảy ra
# encoding="utf-8" để tiếng Việt hiển thị đúng
with open(TEN_FILE, "w", encoding="utf-8") as f:
    f.write("=== BÁO CÁO KẾT QUẢ LỚP HỌC ===\n")      # \n = xuống dòng mới
    f.write(f"Điểm TB cả lớp    : {diem_tb:.2f}\n")
    f.write(f"Học sinh giỏi nhất: {ten_gioi} ({diem_gioi} điểm)\n")
    f.write(f"Học sinh đạt (≥5) : {', '.join(danh_sach_dat)}\n")
    f.write("\nBảng điểm chi tiết:\n")
    for i in range(len(hoc_sinh)):
        f.write(f"  {hoc_sinh[i]:<10}: {diem[i]} điểm\n")  # :<10 căn trái 10 ký tự

print(f"→ Đã ghi xong file: {TEN_FILE}")

# --- Đọc file toàn bộ ---
print("\n=== ĐỌC LẠI FILE (toàn bộ) ===")
with open(TEN_FILE, "r", encoding="utf-8") as f:
    noi_dung = f.read()    # Đọc toàn bộ thành một chuỗi lớn
    print(noi_dung)

# --- Đọc file từng dòng ---
print("=== ĐỌC TỪNG DÒNG ===")
with open(TEN_FILE, "r", encoding="utf-8") as f:
    for so_dong, dong in enumerate(f, start=1):
        dong_sach = dong.strip()      # Xóa khoảng trắng và \n ở hai đầu
        if dong_sach:                  # Bỏ qua dòng hoàn toàn trống
            print(f"  Dòng {so_dong:2d}: {dong_sach}")

# --- Dọn dẹp file demo ---
os.remove(TEN_FILE)
print(f"\n(Đã xóa file '{TEN_FILE}' sau khi demo kết thúc)")

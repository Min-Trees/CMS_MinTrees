# =============================================================
#  Course  : CSB – Nền Tảng Lập Trình Python
#  Buổi   : 10 – Tập Hợp và Ánh Xạ
#  Nội dung: Set, Dictionary, các phép toán và ứng dụng thực tế
# =============================================================


# ─────────────────────────────────────────────
# PHẦN 1 – SET (TẬP HỢP)
# Không trùng lặp, không thứ tự, tra cứu O(1)
# ─────────────────────────────────────────────

print("=" * 55)
print("  PHẦN 1: SET (TẬP HỢP)")
print("=" * 55)

# Tạo set – dùng dấu {} hoặc set()
mon_hoc_lop_a = {"Toán", "Lý", "Hóa", "Anh", "Toán"}   # "Toán" trùng → tự loại
mon_hoc_lop_b = {"Toán", "Sinh", "Địa", "Văn", "Anh"}

print(f"\nLớp A: {mon_hoc_lop_a}")   # Lưu ý: Toán chỉ xuất hiện 1 lần
print(f"Lớp B: {mon_hoc_lop_b}")

# Phép toán tập hợp
hop    = mon_hoc_lop_a | mon_hoc_lop_b   # Hợp: tất cả môn học ở 2 lớp
giao   = mon_hoc_lop_a & mon_hoc_lop_b   # Giao: môn học chung
hieu   = mon_hoc_lop_a - mon_hoc_lop_b   # Hiệu: lớp A có, B không
doi_xung = mon_hoc_lop_a ^ mon_hoc_lop_b # Đối xứng: mỗi lớp có riêng

print(f"\nHợp (A|B)  – tất cả môn  : {hop}")
print(f"Giao (A&B) – môn chung   : {giao}")
print(f"Hiệu (A-B) – chỉ lớp A  : {hieu}")
print(f"Đối xứng   – riêng mỗi lớp: {doi_xung}")

# Kiểm tra phần tử – cực nhanh O(1)
print(f"\n'Toán' trong lớp A? {'Toán' in mon_hoc_lop_a}")       # True
print(f"'Nhạc' trong lớp A? {'Nhạc' in mon_hoc_lop_a}")         # False

# Thêm và xóa phần tử
mon_hoc_lop_a.add("Nhạc")      # Thêm một phần tử
mon_hoc_lop_a.discard("Hóa")   # Xóa nếu tồn tại – không lỗi nếu không có
print(f"\nSau khi thêm Nhạc, xóa Hóa: {mon_hoc_lop_a}")

# Ứng dụng: Loại bỏ trùng lặp trong danh sách
diem_nhap = [9, 7, 8, 9, 7, 10, 8, 6, 9]
diem_duy_nhat = sorted(set(diem_nhap))   # set() loại trùng, sorted() sắp xếp
print(f"\nDanh sách điểm gốc : {diem_nhap}")
print(f"Sau khi loại trùng : {diem_duy_nhat}")
print()


# ─────────────────────────────────────────────
# PHẦN 2 – DICTIONARY (TỪ ĐIỂN)
# Cặp key-value, tra cứu O(1)
# ─────────────────────────────────────────────

print("=" * 55)
print("  PHẦN 2: DICTIONARY")
print("=" * 55)

# Tạo dictionary
diem_hoc_sinh = {
    "An":   9.0,
    "Bình": 7.5,
    "Cúc":  8.2,
    "Dũng": 5.5,
    "Én":   6.0,
    "Hoa":  8.8
}

# Truy cập, thêm, sửa, xóa
print(f"\nĐiểm của An  : {diem_hoc_sinh['An']}")
print(f"Điểm của Bình: {diem_hoc_sinh.get('Bình', 'Không có')}")    # .get() an toàn hơn
print(f"Điểm của Vân : {diem_hoc_sinh.get('Vân',  'Chưa có dữ liệu')}")  # Không lỗi

diem_hoc_sinh["Vân"] = 7.8    # Thêm mục mới
diem_hoc_sinh["An"]  = 9.5    # Cập nhật mục đã có
del diem_hoc_sinh["Én"]        # Xóa mục

print(f"\nSau khi cập nhật: {diem_hoc_sinh}")

# Duyệt dictionary
print("\n--- Duyệt dictionary ---")
for ten, diem in diem_hoc_sinh.items():    # .items() trả về cặp (key, value)
    print(f"  {ten:<8}: {diem}")

print(f"\nDanh sách tên   : {list(diem_hoc_sinh.keys())}")    # Tất cả keys
print(f"Danh sách điểm  : {list(diem_hoc_sinh.values())}")   # Tất cả values
print()


# ─────────────────────────────────────────────
# PHẦN 3 – ỨNG DỤNG THỰC TẾ: ĐẾM VÀ NHÓM DỮ LIỆU
# ─────────────────────────────────────────────

print("=" * 55)
print("  PHẦN 3: ỨNG DỤNG – ĐẾM VÀ NHÓM")
print("=" * 55)

# Đếm tần suất xuất hiện (Word Count)
cau = "python là ngôn ngữ python dễ học python rất hay hay"
tan_suat = {}   # Dictionary trống để đếm
for tu in cau.split():                    # Tách câu thành danh sách từ
    tan_suat[tu] = tan_suat.get(tu, 0) + 1  # Tăng đếm, mặc định là 0 nếu chưa có

top3 = sorted(tan_suat.items(), key=lambda x: x[1], reverse=True)[:3]
print(f"\nCâu: '{cau}'")
print(f"Tần suất từ: {tan_suat}")
print(f"TOP 3 từ phổ biến: {top3}")

# Nhóm học sinh theo xếp loại
print("\n--- Xếp loại học sinh ---")
xep_loai = {}   # {"Giỏi": ["An", "Hoa"], "Khá": [...], ...}

def get_xep_loai(diem):
    if diem >= 9.0: return "Xuất sắc"
    if diem >= 8.0: return "Giỏi"
    if diem >= 6.5: return "Khá"
    if diem >= 5.0: return "Trung bình"
    return "Yếu"

for ten, diem in diem_hoc_sinh.items():
    loai = get_xep_loai(diem)
    if loai not in xep_loai:      # Nếu chưa có key này
        xep_loai[loai] = []        # Tạo list rỗng
    xep_loai[loai].append(ten)     # Thêm học sinh vào nhóm

for loai, ds_ten in sorted(xep_loai.items()):
    print(f"  {loai:<12}: {ds_ten}")

# Dictionary comprehension – cú pháp ngắn gọn
print("\n--- Dictionary Comprehension ---")
diem_quy_doi = {ten: round(diem * 10) for ten, diem in diem_hoc_sinh.items()}
print(f"Điểm thang 100: {diem_quy_doi}")

# Nested dictionary – dictionary chứa dictionary
print("\n--- Nested Dictionary ---")
hoc_sinh_info = {
    "An": {"diem": 9.5, "lop": "12A1", "mon_gioi": ["Toán", "Lý"]},
    "Bình": {"diem": 7.5, "lop": "12A2", "mon_gioi": ["Văn", "Anh"]},
}
print(f"Lớp của An     : {hoc_sinh_info['An']['lop']}")
print(f"Môn giỏi của An: {hoc_sinh_info['An']['mon_gioi']}")

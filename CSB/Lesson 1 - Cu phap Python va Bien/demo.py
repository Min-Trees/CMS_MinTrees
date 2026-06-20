# =============================================================
#  Course  : CSB – Nền Tảng Lập Trình Python
#  Buổi   : 1 – Cú Pháp Python và Biến
#  Nội dung: Biến, Kiểu dữ liệu, Toán tử, if/else, for, while
# =============================================================


# ─────────────────────────────────────────────
# PHẦN 1 – KHAI BÁO BIẾN VÀ KIỂU DỮ LIỆU
# ─────────────────────────────────────────────

ten_hoc_sinh = "Nguyễn Văn An"   # str  – chuỗi văn bản, dùng dấu nháy kép hoặc đơn
diem_tb      = 8.2                # float – số thực (có phần thập phân)
so_nghi_hoc  = 3                  # int   – số nguyên
la_hoc_sinh  = True               # bool  – giá trị đúng/sai (True hoặc False)
diem_cac_mon = [7, 8, 9, 6, 10]  # list  – danh sách điểm của 5 môn

# Dùng type() để kiểm tra kiểu dữ liệu của một biến
print("Kiểu dữ liệu của biến 'diem_tb':", type(diem_tb))   # <class 'float'>
print("Kiểu dữ liệu của biến 'ten_hoc_sinh':", type(ten_hoc_sinh))  # <class 'str'>
print()


# ─────────────────────────────────────────────
# PHẦN 2 – TOÁN TỬ SỐ HỌC VÀ LOGIC
# ─────────────────────────────────────────────

diem_mon_1 = 7
diem_mon_2 = 9

tong       = diem_mon_1 + diem_mon_2   # Phép cộng
hieu       = diem_mon_2 - diem_mon_1   # Phép trừ
tich       = diem_mon_1 * diem_mon_2   # Phép nhân
thuong     = tong / 2                  # Phép chia (trả về float)
phan_du    = 10 % 3                    # Lấy phần dư: 10 ÷ 3 dư 1

print("=== TOÁN TỬ SỐ HỌC ===")
print(f"  {diem_mon_1} + {diem_mon_2} = {tong}")
print(f"  {diem_mon_2} - {diem_mon_1} = {hieu}")
print(f"  {diem_mon_1} * {diem_mon_2} = {tich}")
print(f"  ({diem_mon_1} + {diem_mon_2}) / 2 = {thuong}")
print(f"  10 % 3 = {phan_du}   (phần dư khi chia 10 cho 3)")
print()

# Toán tử so sánh – kết quả luôn là True hoặc False
print("=== TOÁN TỬ SO SÁNH ===")
print(f"  8.2 >= 8.0  →  {8.2 >= 8.0}")    # True
print(f"  7 == 8      →  {7 == 8}")          # False
print(f"  7 != 8      →  {7 != 8}")          # True
print()

# Toán tử logic – kết hợp nhiều điều kiện
co_diem_cao  = diem_tb >= 8.0      # True: điểm TB >= 8
it_vang_hoc  = so_nghi_hoc <= 3   # True: nghỉ không quá 3 buổi

du_dieu_kien_khen_thuong = co_diem_cao and it_vang_hoc  # Cả hai đều True → True
print("=== TOÁN TỬ LOGIC ===")
print(f"  Điểm cao AND ít nghỉ → Đủ điều kiện khen thưởng: {du_dieu_kien_khen_thuong}")
print()


# ─────────────────────────────────────────────
# PHẦN 3 – CẤU TRÚC if / elif / else
# ─────────────────────────────────────────────

print("=== XẾP LOẠI HỌC LỰC ===")

# Kiểm tra lần lượt từng ngưỡng điểm
if diem_tb >= 9.0:
    xep_loai = "Xuất Sắc"
elif diem_tb >= 8.0:
    xep_loai = "Giỏi"
elif diem_tb >= 6.5:
    xep_loai = "Khá"
elif diem_tb >= 5.0:
    xep_loai = "Trung Bình"
else:
    xep_loai = "Yếu"          # Mọi trường hợp còn lại (điểm dưới 5.0)

# In báo cáo – dùng f-string để chèn biến vào chuỗi
print(f"  Học sinh : {ten_hoc_sinh}")
print(f"  Điểm TB  : {diem_tb}")
print(f"  Xếp loại : {xep_loai}")
print()


# ─────────────────────────────────────────────
# PHẦN 4 – VÒNG LẶP for
# ─────────────────────────────────────────────

print("=== BẢNG ĐIỂM CHI TIẾT (dùng vòng for) ===")

# enumerate() cho biết cả chỉ số (i) lẫn giá trị (diem) trong mỗi lần lặp
for i, diem in enumerate(diem_cac_mon, start=1):
    # f-string: {i} là số thứ tự môn, {diem} là điểm môn đó
    print(f"  Môn {i}: {diem}")

print()

# Dùng range() để tạo dãy số từ 1 đến 5 (range(1, 6) = 1,2,3,4,5)
print("Đếm ngược từ 5 xuống 1 (dùng range với bước -1):")
for so in range(5, 0, -1):     # bắt đầu = 5, kết thúc trước 0, bước = -1
    print(f"  {so}...")
print("  Hết giờ!")
print()


# ─────────────────────────────────────────────
# PHẦN 5 – VÒNG LẶP while
# ─────────────────────────────────────────────

print("=== ĐẾM MÔN ĐẠT >= 8 (dùng vòng while) ===")

so_mon_gioi = 0   # Biến đếm, khởi đầu bằng 0
j = 0             # Biến chỉ số, dùng để duyệt danh sách thủ công

# Điều kiện while: tiếp tục khi j còn nằm trong phạm vi danh sách
while j < len(diem_cac_mon):
    if diem_cac_mon[j] >= 8:          # Nếu điểm môn này >= 8
        so_mon_gioi += 1              # Tăng biến đếm lên 1 (viết tắt của += )
    j += 1                            # Chuyển sang môn tiếp theo

print(f"  Số môn đạt >= 8: {so_mon_gioi}")
print()


# ─────────────────────────────────────────────
# PHẦN 6 – TỔNG HỢP: IN BÁO CÁO CUỐI
# ─────────────────────────────────────────────

print("=" * 40)
print("         BÁO CÁO HỌC SINH")
print("=" * 40)
print(f"  Họ tên     : {ten_hoc_sinh}")
print(f"  Điểm TB    : {diem_tb}")
print(f"  Xếp loại  : {xep_loai}")
print(f"  Số buổi nghỉ: {so_nghi_hoc}")
print(f"  Môn đạt ≥8 : {so_mon_gioi}/{len(diem_cac_mon)}")

# Dùng toán tử logic để đưa ra nhận xét cuối
if xep_loai in ("Xuất Sắc", "Giỏi") and so_nghi_hoc <= 3:
    print("  → Đề nghị khen thưởng! 🎉")
else:
    print("  → Cần cố gắng thêm trong kỳ tới.")

print("=" * 40)

# =============================================================
#  Course  : CSB – Nền Tảng Lập Trình Python
#  Buổi   : 11 – Stack và Queue
#  Nội dung: Stack (LIFO), Queue (FIFO), ứng dụng thực tế
# =============================================================

from collections import deque   # deque = double-ended queue – hiệu quả hơn list cho Queue


# ─────────────────────────────────────────────
# PHẦN 1 – STACK (NGĂN XẾP) – LIFO
# Dùng list Python: append() = push, pop() = pop
# ─────────────────────────────────────────────

print("=" * 55)
print("  PHẦN 1: STACK (LIFO)")
print("=" * 55)

stack = []    # Stack rỗng – dùng list thông thường

# Push – đẩy phần tử vào đỉnh stack
for trang in ["trang_chu", "san_pham", "gio_hang", "thanh_toan"]:
    stack.append(trang)           # append() → push vào đỉnh
    print(f"  Truy cập: {trang:<15} | Stack: {stack}")

print(f"\n  Trang hiện tại (đỉnh): {stack[-1]}")   # Nhìn đỉnh mà không lấy ra

# Pop – lấy từ đỉnh (nút Back trình duyệt)
print("\n  Nhấn nút Back:")
while stack:
    trang_hien_tai = stack.pop()   # pop() – lấy từ đỉnh, O(1)
    print(f"  ← Rời '{trang_hien_tai}'", end="")
    print(f" | Quay về: '{stack[-1]}'" if stack else " | (Không còn trang trước)")

print()


# ─────────────────────────────────────────────
# PHẦN 2 – ỨNG DỤNG STACK: KIỂM TRA NGOẶC HỢP LỆ
# ─────────────────────────────────────────────

print("\n" + "=" * 55)
print("  PHẦN 2: ỨNG DỤNG STACK – KIỂM TRA NGOẶC")
print("=" * 55)

def kiem_tra_ngoac(chuoi):
    """Kiểm tra chuỗi có dấu ngoặc hợp lệ dùng Stack."""
    stack_ngoac = []
    dong_mo = {')': '(', ']': '[', '}': '{'}   # Ngoặc đóng → ngoặc mở tương ứng

    for ky_tu in chuoi:
        if ky_tu in '([{':              # Ngoặc mở → push vào stack
            stack_ngoac.append(ky_tu)
        elif ky_tu in ')]}':            # Ngoặc đóng → kiểm tra khớp với đỉnh stack
            if not stack_ngoac or stack_ngoac[-1] != dong_mo[ky_tu]:
                return False, f"Lỗi tại '{ky_tu}': không khớp"
            stack_ngoac.pop()

    if stack_ngoac:
        return False, f"Còn {len(stack_ngoac)} ngoặc chưa đóng: {stack_ngoac}"
    return True, "Hợp lệ"


cac_vi_du = ["(())", "({[]})", "([)]", "((", "{}[]()"]
for vi_du in cac_vi_du:
    hop_le, thong_bao = kiem_tra_ngoac(vi_du)
    ky_hieu = "✓" if hop_le else "✗"
    print(f"  {ky_hieu} '{vi_du}' → {thong_bao}")

print()


# ─────────────────────────────────────────────
# PHẦN 3 – QUEUE (HÀNG ĐỢI) – FIFO
# Dùng collections.deque: append() = enqueue, popleft() = dequeue
# ─────────────────────────────────────────────

print("=" * 55)
print("  PHẦN 3: QUEUE (FIFO)")
print("=" * 55)

hang_doi_in = deque()   # Queue rỗng

# Enqueue – thêm công việc in vào cuối hàng đợi
cac_lenh_in = ["Báo cáo_Q1.pdf", "Hợp đồng.docx", "CV_NhanVien.pdf", "Biên bản.pdf"]
for lenh in cac_lenh_in:
    hang_doi_in.append(lenh)             # append() – thêm vào cuối, O(1)
    print(f"  + Nhận lệnh in: {lenh:<25} | Hàng đợi: {list(hang_doi_in)}")

print(f"\n  Hàng đợi hiện tại: {list(hang_doi_in)}")
print(f"  Tổng lệnh chờ in: {len(hang_doi_in)}")

# Dequeue – xử lý lần lượt từ đầu hàng
print("\n  Bắt đầu in:")
so_thu_tu = 1
while hang_doi_in:
    tai_lieu = hang_doi_in.popleft()     # popleft() – lấy từ đầu, O(1)
    print(f"  In #{so_thu_tu}: {tai_lieu:<25} | Còn lại: {list(hang_doi_in)}")
    so_thu_tu += 1

print(f"\n  Hàng đợi sau khi in xong: {list(hang_doi_in)} (rỗng)")
print()


# ─────────────────────────────────────────────
# PHẦN 4 – ỨNG DỤNG QUEUE: MÔ PHỎNG HỆ THỐNG TICKET SUPPORT
# ─────────────────────────────────────────────

print("=" * 55)
print("  PHẦN 4: ỨNG DỤNG QUEUE – TICKET HỖ TRỢ")
print("=" * 55)

class HeThongHoTro:
    """Hệ thống ticket hỗ trợ – xử lý theo thứ tự FIFO."""

    def __init__(self):
        self._hang_doi  = deque()
        self._so_ticket = 0

    def gui_yeu_cau(self, ten_khach, van_de):
        """Khách hàng gửi yêu cầu – thêm vào cuối hàng đợi."""
        self._so_ticket += 1
        ticket = {"id": f"TK{self._so_ticket:03d}", "khach": ten_khach, "van_de": van_de}
        self._hang_doi.append(ticket)
        print(f"  + [{ticket['id']}] {ten_khach}: '{van_de}' (vị trí {len(self._hang_doi)})")

    def xu_ly_tiep_theo(self):
        """Nhân viên xử lý ticket đầu hàng đợi."""
        if not self._hang_doi:
            print("  (Hàng đợi trống, không có gì để xử lý)")
            return
        ticket = self._hang_doi.popleft()
        print(f"  ✓ Đang xử lý [{ticket['id']}] – {ticket['khach']}: '{ticket['van_de']}'")
        print(f"    Còn {len(self._hang_doi)} ticket đang chờ")

    def hien_thi_hang_doi(self):
        if not self._hang_doi:
            print("  Hàng đợi trống.")
        else:
            for i, tk in enumerate(self._hang_doi, 1):
                print(f"  [{i}] [{tk['id']}] {tk['khach']}: {tk['van_de']}")


ht = HeThongHoTro()

print("\nKhách hàng gửi ticket:")
ht.gui_yeu_cau("Minh Tuấn", "Không đăng nhập được")
ht.gui_yeu_cau("Thu Hà",   "Quên mật khẩu")
ht.gui_yeu_cau("Bảo Long", "Ứng dụng bị crash")

print("\nNhân viên bắt đầu xử lý:")
ht.xu_ly_tiep_theo()
ht.xu_ly_tiep_theo()

print("\nThêm ticket mới giữa chừng:")
ht.gui_yeu_cau("Lan Anh", "Lỗi thanh toán")

print("\nXử lý tiếp:")
ht.xu_ly_tiep_theo()

print("\nHàng đợi còn lại:")
ht.hien_thi_hang_doi()

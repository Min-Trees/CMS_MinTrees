# =============================================================
#  Course  : CSB – Nền Tảng Lập Trình Python
#  Buổi   : 6 – Thuật Toán Tìm Kiếm
#  Nội dung: Linear Search, Binary Search (iterative & recursive)
# =============================================================


# ─────────────────────────────────────────────
# PHẦN 1 – TÌM KIẾM TUYẾN TÍNH (LINEAR SEARCH)
# Duyệt tuần tự từ đầu đến cuối – O(n)
# ─────────────────────────────────────────────

def linear_search(ds, gia_tri_can_tim):
    """Tìm kiếm tuyến tính – trả về (vị trí, số_bước) hoặc (-1, số_bước)."""
    so_buoc = 0
    for i in range(len(ds)):
        so_buoc += 1                          # Đếm mỗi lần kiểm tra
        if ds[i] == gia_tri_can_tim:
            return i, so_buoc                 # Tìm thấy: trả về vị trí
    return -1, so_buoc                        # Không tìm thấy: trả về -1


def linear_search_verbose(ds, target):
    """Phiên bản có in từng bước – dùng để giảng dạy."""
    print(f"\n  Tìm kiếm tuyến tính: {target} trong {ds}")
    for i, gia_tri in enumerate(ds):
        trang_thai = "✓ TÌM THẤY!" if gia_tri == target else "✗"
        print(f"    Bước {i+1}: kiểm tra ds[{i}] = {gia_tri} {trang_thai}")
        if gia_tri == target:
            return i
    print(f"    → Không tìm thấy {target}")
    return -1


# ─────────────────────────────────────────────
# PHẦN 2 – TÌM KIẾM NHỊ PHÂN (BINARY SEARCH)
# Chia đôi khoảng tìm kiếm mỗi lần – O(log n)
# Yêu cầu: danh sách ĐÃ ĐƯỢC SẮP XẾP
# ─────────────────────────────────────────────

def binary_search(ds, gia_tri_can_tim):
    """Tìm kiếm nhị phân iterative – trả về (vị trí, số_bước)."""
    left    = 0
    right   = len(ds) - 1
    so_buoc = 0

    while left <= right:
        so_buoc += 1
        mid = (left + right) // 2    # Tìm vị trí chính giữa

        if ds[mid] == gia_tri_can_tim:
            return mid, so_buoc      # Tìm thấy ngay giữa
        elif ds[mid] < gia_tri_can_tim:
            left = mid + 1           # Giá trị lớn hơn → tìm nửa phải
        else:
            right = mid - 1          # Giá trị nhỏ hơn → tìm nửa trái

    return -1, so_buoc               # Không tìm thấy


def binary_search_verbose(ds, target):
    """Binary Search có in từng bước – dùng để giảng dạy."""
    left    = 0
    right   = len(ds) - 1
    so_buoc = 0
    print(f"\n  Tìm kiếm nhị phân: {target} trong {ds}")

    while left <= right:
        so_buoc += 1
        mid    = (left + right) // 2
        gia_tri = ds[mid]

        print(f"    Bước {so_buoc}: left={left}, right={right}, "
              f"mid={mid} → ds[{mid}]={gia_tri}", end="")

        if gia_tri == target:
            print(f" → ✓ TÌM THẤY tại vị trí {mid}!")
            return mid
        elif gia_tri < target:
            print(f" → {target} lớn hơn → tìm nửa PHẢI")
            left = mid + 1
        else:
            print(f" → {target} nhỏ hơn → tìm nửa TRÁI")
            right = mid - 1

    print(f"    → Không tìm thấy {target}")
    return -1


def binary_search_recursive(ds, target, left, right, buoc=1):
    """Binary Search phiên bản ĐỆ QUY – mỗi lần gọi chính nó với phạm vi nhỏ hơn."""
    if left > right:
        return -1                      # Trường hợp cơ sở: không còn phạm vi để tìm

    mid = (left + right) // 2

    if ds[mid] == target:
        return mid                     # Tìm thấy
    elif ds[mid] < target:
        return binary_search_recursive(ds, target, mid + 1, right, buoc + 1)
    else:
        return binary_search_recursive(ds, target, left, mid - 1, buoc + 1)


# ─────────────────────────────────────────────
# PHẦN 3 – SO SÁNH HIỆU NĂNG
# ─────────────────────────────────────────────

import time
import random

def tao_danh_sach_lon(n):
    """Tạo danh sách ngẫu nhiên đã sắp xếp gồm n phần tử."""
    return sorted(random.sample(range(n * 10), n))


# ─────────────────────────────────────────────
# CHƯƠNG TRÌNH CHÍNH – DEMO
# ─────────────────────────────────────────────

print("=" * 55)
print("  DEMO THUẬT TOÁN TÌM KIẾM")
print("=" * 55)

# --- Ví dụ cụ thể với bước chạy ---
diem_thi = [45, 52, 61, 67, 73, 78, 82, 88, 91, 95]  # Đã sắp xếp
can_tim  = 78

linear_search_verbose(diem_thi, can_tim)
binary_search_verbose(diem_thi, can_tim)

# Tìm giá trị không tồn tại
print()
binary_search_verbose(diem_thi, 70)

# --- Demo binary search recursive ---
print("\n--- BINARY SEARCH ĐỆ QUY ---")
ds_test = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
ket_qua = binary_search_recursive(ds_test, 23, 0, len(ds_test) - 1)
print(f"  Tìm 23 trong {ds_test}")
print(f"  → Kết quả: vị trí {ket_qua} (giá trị: {ds_test[ket_qua] if ket_qua != -1 else 'Không có'})")

# --- So sánh số bước ---
print("\n--- SO SÁNH SỐ BƯỚC THỰC HIỆN ---")
print(f"{'Danh sách':>6} | {'Linear (bước)':>15} | {'Binary (bước)':>15}")
print("  " + "-" * 40)
for kich_thuoc in [10, 100, 1000, 10000, 100000]:
    ds = list(range(kich_thuoc))        # [0, 1, 2, ..., n-1] đã sort
    target_worst = kich_thuoc - 1       # Xấu nhất: phần tử cuối cùng
    _, buoc_linear = linear_search(ds, target_worst)
    _, buoc_binary = binary_search(ds, target_worst)
    print(f"  n={kich_thuoc:<6} | {buoc_linear:>15,} | {buoc_binary:>15,}")

# --- Benchmark thời gian ---
print("\n--- BENCHMARK THỜI GIAN (n = 1.000.000) ---")
N = 1_000_000
ds_lon = list(range(N))
target = N - 1   # Tìm phần tử cuối – trường hợp xấu nhất cho Linear

t0 = time.time()
linear_search(ds_lon, target)
tg_linear = (time.time() - t0) * 1000

t0 = time.time()
binary_search(ds_lon, target)
tg_binary = (time.time() - t0) * 1000

print(f"  Linear Search: {tg_linear:.3f} ms")
print(f"  Binary Search: {tg_binary:.3f} ms")
print(f"  Binary nhanh hơn: ~{tg_linear/max(tg_binary,0.001):.0f} lần")

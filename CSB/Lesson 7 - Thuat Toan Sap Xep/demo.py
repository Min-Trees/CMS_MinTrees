# =============================================================
#  Course  : CSB – Nền Tảng Lập Trình Python
#  Buổi   : 7 – Thuật Toán Sắp Xếp
#  Nội dung: Insertion Sort, Bubble Sort, Quick Sort
# =============================================================

import time
import random
import copy


# ─────────────────────────────────────────────
# PHẦN 1 – SẮP XẾP NỔI BỌT (BUBBLE SORT)
# So sánh từng cặp kề, phần tử lớn "nổi" về cuối – O(n²)
# ─────────────────────────────────────────────

def bubble_sort(ds):
    """Bubble Sort – hoán đổi các cặp kề sai thứ tự qua nhiều vòng."""
    n    = len(ds)
    arr  = ds.copy()    # Làm bản sao, không thay đổi list gốc
    hoan_doi = 0

    for i in range(n - 1):               # n-1 vòng ngoài
        co_hoan_doi = False               # Cờ tối ưu: nếu vòng này không đổi gì → đã sort
        for j in range(n - 1 - i):       # Mỗi vòng, phần tử lớn nhất đã về cuối
            if arr[j] > arr[j + 1]:      # Sai thứ tự → hoán đổi
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                hoan_doi  += 1
                co_hoan_doi = True
        if not co_hoan_doi:              # Không có hoán đổi → đã sắp xếp xong
            break

    return arr, hoan_doi


def bubble_sort_verbose(ds):
    """Bubble Sort có in từng vòng – dùng để giảng dạy."""
    arr = ds.copy()
    n   = len(arr)
    print(f"\n  Bắt đầu: {arr}")

    for i in range(n - 1):
        co_hoan_doi = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                co_hoan_doi = True
        print(f"  Sau vòng {i+1}: {arr}")
        if not co_hoan_doi:
            print(f"  → Không có hoán đổi – đã sắp xếp xong sớm!")
            break

    return arr


# ─────────────────────────────────────────────
# PHẦN 2 – SẮP XẾP CHÈN (INSERTION SORT)
# Lấy từng phần tử chèn vào đúng vị trí trong phần đã sort – O(n²)
# ─────────────────────────────────────────────

def insertion_sort(ds):
    """Insertion Sort – như sắp xếp bài tú lơ khơ trên tay."""
    arr = ds.copy()
    n   = len(arr)

    for i in range(1, n):              # Bắt đầu từ phần tử thứ 2 (index 1)
        khoa = arr[i]                  # Phần tử đang cầm trên tay ("key")
        j = i - 1

        # Dịch chuyển các phần tử lớn hơn "khóa" sang phải
        while j >= 0 and arr[j] > khoa:
            arr[j + 1] = arr[j]
            j -= 1

        arr[j + 1] = khoa              # Chèn "khóa" vào vị trí đúng
    return arr


def insertion_sort_verbose(ds):
    """Insertion Sort có in từng bước – dùng để giảng dạy."""
    arr = ds.copy()
    n   = len(arr)
    print(f"\n  Bắt đầu: {arr}")

    for i in range(1, n):
        khoa = arr[i]
        j    = i - 1
        while j >= 0 and arr[j] > khoa:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = khoa
        print(f"  Chèn {khoa:3d} → {arr}  (đã sort: {arr[:i+1]})")

    return arr


# ─────────────────────────────────────────────
# PHẦN 3 – SẮP XẾP NHANH (QUICK SORT)
# Chọn pivot, chia dãy, đệ quy – O(n log n) trung bình
# ─────────────────────────────────────────────

def quick_sort(ds):
    """Quick Sort đệ quy – phân vùng theo pivot (phần tử cuối)."""
    if len(ds) <= 1:
        return ds    # Trường hợp cơ sở: 0 hoặc 1 phần tử → đã sort

    pivot   = ds[-1]                           # Chọn phần tử cuối làm pivot
    trai    = [x for x in ds[:-1] if x <= pivot]   # Nhỏ hơn/bằng pivot
    phai    = [x for x in ds[:-1] if x > pivot]    # Lớn hơn pivot

    # Đệ quy sort từng nửa, rồi ghép lại với pivot ở giữa
    return quick_sort(trai) + [pivot] + quick_sort(phai)


def quick_sort_verbose(ds, cap_do=0):
    """Quick Sort với in đệ quy cây phân chia."""
    thut_le = "  " * cap_do
    if len(ds) <= 1:
        print(f"{thut_le}→ [{', '.join(map(str,ds))}] (cơ sở)")
        return ds

    pivot  = ds[-1]
    trai   = [x for x in ds[:-1] if x <= pivot]
    phai   = [x for x in ds[:-1] if x > pivot]

    print(f"{thut_le}Pivot={pivot} | Trái={trai} | Phải={phai}")
    ket_qua = quick_sort_verbose(trai, cap_do+1) + [pivot] + quick_sort_verbose(phai, cap_do+1)
    print(f"{thut_le}Ghép: {ket_qua}")
    return ket_qua


# ─────────────────────────────────────────────
# CHƯƠNG TRÌNH CHÍNH – DEMO
# ─────────────────────────────────────────────

print("=" * 55)
print("  DEMO THUẬT TOÁN SẮP XẾP")
print("=" * 55)

ds_demo = [64, 25, 12, 22, 11]

# --- Bubble Sort ---
print("\n📌 BUBBLE SORT (Sắp xếp nổi bọt)")
bubble_sort_verbose(ds_demo)
ket_qua, so_hoan_doi = bubble_sort(ds_demo)
print(f"  Kết quả: {ket_qua} | Số lần hoán đổi: {so_hoan_doi}")

# --- Insertion Sort ---
print("\n📌 INSERTION SORT (Sắp xếp chèn)")
insertion_sort_verbose(ds_demo)
print(f"  Kết quả: {insertion_sort(ds_demo)}")

# --- Quick Sort ---
print("\n📌 QUICK SORT (Sắp xếp nhanh)")
ket_qua_quick = quick_sort_verbose(ds_demo)
print(f"  Kết quả cuối: {ket_qua_quick}")

# --- Kiểm chứng cả 3 đều cho kết quả như nhau ---
print("\n--- KIỂM CHỨNG ---")
ds_test = [38, 27, 43, 3, 9, 82, 10]
print(f"  Input          : {ds_test}")
print(f"  Bubble Sort    : {bubble_sort(ds_test)[0]}")
print(f"  Insertion Sort : {insertion_sort(ds_test)}")
print(f"  Quick Sort     : {quick_sort(ds_test)}")
print(f"  Python sort()  : {sorted(ds_test)}")

# --- Benchmark thời gian ---
print("\n--- BENCHMARK (n = 5,000) ---")
N = 5000
ds_lon = random.sample(range(N * 10), N)

algos = [
    ("Bubble Sort",    lambda d: bubble_sort(d)[0]),
    ("Insertion Sort", insertion_sort),
    ("Quick Sort",     quick_sort),
]

for ten, func in algos:
    ban_sao = ds_lon.copy()
    t0 = time.time()
    func(ban_sao)
    tg = (time.time() - t0) * 1000
    print(f"  {ten:<15}: {tg:7.2f} ms")

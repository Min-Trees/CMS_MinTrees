"""
CSA - Buổi 1: Giới Thiệu Data Science & Pandas Cơ Bản
======================================================
Chạy: python demo.py
Cài trước: pip install pandas openpyxl
"""

import pandas as pd
import os

print("=" * 55)
print("   CSA Buổi 1 — Pandas Series & DataFrame")
print("=" * 55)

# ──────────────────────────────────────────────────────────
# 1. SERIES — chuỗi 1 chiều có index
# ──────────────────────────────────────────────────────────
print("\n── 1. Series ──")
nhiet_do = pd.Series(
    [28.5, 30.1, 27.8, 31.0, 29.6],
    index=["T2", "T3", "T4", "T5", "T6"],
    name="Nhiệt độ HCM (°C)"
)
print(nhiet_do)
print(f"Trung bình  : {nhiet_do.mean():.1f}°C")
print(f"Cao nhất    : {nhiet_do.max():.1f}°C vào {nhiet_do.idxmax()}")
print(f"Ngày > 30°C : {list(nhiet_do[nhiet_do > 30].index)}")

# ──────────────────────────────────────────────────────────
# 2. DATAFRAME — bảng 2 chiều
# ──────────────────────────────────────────────────────────
print("\n── 2. DataFrame từ dict ──")
data = {
    "ten":     ["Nguyễn An", "Trần Bình", "Lê Cúc", "Phạm Dũng", "Hoàng Em"],
    "tuoi":    [22, 25, 23, 28, 21],
    "thanh_pho": ["HCM", "HN", "HCM", "ĐN", "HN"],
    "luong":   [8_500_000, 12_000_000, 9_000_000, 15_000_000, 7_500_000],
    "kinh_nghiem_nam": [1, 3, 2, 5, 0],
}
df = pd.DataFrame(data)
print(df.to_string(index=False))

# ──────────────────────────────────────────────────────────
# 3. CÁC THUỘC TÍNH CƠ BẢN
# ──────────────────────────────────────────────────────────
print("\n── 3. Thông tin cơ bản ──")
print(f"Shape  : {df.shape}")       # (5, 5)
print(f"Columns: {list(df.columns)}")
print(f"Dtypes :\n{df.dtypes}")
print(f"\n.head(3):\n{df.head(3)}")
print(f"\n.describe():\n{df.describe()}")

# ──────────────────────────────────────────────────────────
# 4. TRUY CẬP DỮ LIỆU
# ──────────────────────────────────────────────────────────
print("\n── 4. Truy cập dữ liệu ──")
print(f"Cột 'ten'    : {list(df['ten'])}")
print(f"Hàng 0 (loc) : {df.loc[0, 'ten']} — {df.loc[0, 'luong']:,}đ")
print(f"Hàng 1 (iloc): {df.iloc[1].to_dict()}")

# ──────────────────────────────────────────────────────────
# 5. ĐỌC / GHI CSV
# ──────────────────────────────────────────────────────────
print("\n── 5. Đọc/ghi CSV ──")
TEN_FILE = "nhan_vien_demo.csv"
df.to_csv(TEN_FILE, index=False, encoding="utf-8-sig")
print(f"  ✓ Ghi file: {TEN_FILE}")

df2 = pd.read_csv(TEN_FILE, encoding="utf-8-sig")
print(f"  ✓ Đọc lại: {len(df2)} hàng, {len(df2.columns)} cột")
print(df2[["ten", "luong"]].to_string(index=False))

# Dọn file demo
os.remove(TEN_FILE)

# ──────────────────────────────────────────────────────────
# 6. TẠO DATAFRAME TỪ FILE CSV (giả lập)
# ──────────────────────────────────────────────────────────
print("\n── 6. Thống kê nhanh ──")
print(f"Lương TB       : {df['luong'].mean():,.0f}đ")
print(f"Lương cao nhất : {df['luong'].max():,}đ — {df.loc[df['luong'].idxmax(), 'ten']}")
print(f"Thành phố duy nhất: {sorted(df['thanh_pho'].unique())}")
print(f"Số NV mỗi TP  :\n{df['thanh_pho'].value_counts()}")

print("\n✅ Demo hoàn tất!")

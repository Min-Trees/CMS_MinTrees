"""
CSA - Buổi 2: Lọc và Xử Lý Dữ Liệu với Pandas
================================================
Chạy: python demo.py
"""

import pandas as pd
import numpy as np

print("=" * 55)
print("   CSA Buổi 2 — Filtering & Xử lý dữ liệu")
print("=" * 55)

# ── Dữ liệu mẫu ──────────────────────────────────────────
data = {
    "ten":       ["An", "Bình", "Cúc", "Dũng", "Em", "Phú", "Giang", "Hoa"],
    "tuoi":      [22, 25, None, 28, 21, 30, 24, None],
    "tp":        ["HCM", "HN", "HCM", "ĐN", "HN", "HCM", "ĐN", "HN"],
    "luong":     [8.5, 12.0, 9.0, 15.0, 7.5, None, 11.0, 10.5],  # triệu
    "ky_nang":   ["Python", "SQL", "Python", "ML", "SQL", "Python", "ML", "Python"],
    "diem_kpi":  [8.5, 7.0, 9.2, 6.5, None, 8.0, 7.8, 9.5],
}
df = pd.DataFrame(data)
print("\n── Dữ liệu gốc ──")
print(df.to_string())

# ──────────────────────────────────────────────────────────
# 1. TRUY XUẤT BẰNG loc / iloc
# ──────────────────────────────────────────────────────────
print("\n── 1. loc vs iloc ──")
print(f"  df.loc[0, 'ten']        = {df.loc[0, 'ten']}")
print(f"  df.iloc[2, 3]           = {df.iloc[2, 3]}")
print(f"  df.loc[1:3, ['ten','tp']]:\n{df.loc[1:3, ['ten', 'tp']]}")

# ──────────────────────────────────────────────────────────
# 2. FILTERING — boolean mask
# ──────────────────────────────────────────────────────────
print("\n── 2. Filtering ──")

# Một điều kiện
print("  Lương ≥ 10 triệu:")
print(df[df["luong"] >= 10][["ten", "luong"]])

# Nhiều điều kiện (&  |)
print("\n  Ở HCM VÀ Python:")
mask = (df["tp"] == "HCM") & (df["ky_nang"] == "Python")
print(df[mask][["ten", "tp", "ky_nang"]])

# isin
print("\n  Ở HCM hoặc HN:")
print(df[df["tp"].isin(["HCM", "HN"])][["ten", "tp"]])

# between
print("\n  Tuổi từ 22 đến 26:")
print(df[df["tuoi"].between(22, 26)][["ten", "tuoi"]])

# ──────────────────────────────────────────────────────────
# 3. XỬ LÝ MISSING VALUES
# ──────────────────────────────────────────────────────────
print("\n── 3. Missing values ──")
print("  Số NaN mỗi cột:")
print(df.isna().sum())

# fillna cho từng cột
df["tuoi"]    = df["tuoi"].fillna(df["tuoi"].median())
df["luong"]   = df["luong"].fillna(df["luong"].mean())
df["diem_kpi"]= df["diem_kpi"].fillna(df["diem_kpi"].median())
print("\n  Sau fill NaN:")
print(df[["ten", "tuoi", "luong", "diem_kpi"]].to_string())

# ──────────────────────────────────────────────────────────
# 4. THAO TÁC CỘT
# ──────────────────────────────────────────────────────────
print("\n── 4. Thao tác cột ──")

# Thêm cột mới
df["luong_usd"]   = (df["luong"] * 1_000_000 / 25_000).round(0)
df["xep_loai_kpi"] = pd.cut(
    df["diem_kpi"],
    bins=[0, 6, 7.5, 9, 10],
    labels=["Yếu", "TB", "Khá", "Giỏi"]
)
print(df[["ten", "luong", "luong_usd", "diem_kpi", "xep_loai_kpi"]].to_string())

# Đổi tên cột
df = df.rename(columns={"tp": "thanh_pho", "luong": "luong_trieu"})
print(f"\n  Tên cột sau đổi: {list(df.columns)}")

# Xóa cột
df = df.drop(columns=["luong_usd"])
print(f"  Cột sau khi drop: {list(df.columns)}")

# ──────────────────────────────────────────────────────────
# 5. SORT
# ──────────────────────────────────────────────────────────
print("\n── 5. Sort ──")
print("  Top 3 lương cao nhất:")
print(df.sort_values("luong_trieu", ascending=False).head(3)[["ten", "luong_trieu"]])

print("\n✅ Demo hoàn tất!")

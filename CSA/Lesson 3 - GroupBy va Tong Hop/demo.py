"""
CSA - Buổi 3: GroupBy, Aggregation và Kết Hợp Bảng
====================================================
Chạy: python demo.py
"""

import pandas as pd

print("=" * 55)
print("   CSA Buổi 3 — GroupBy, Merge, Pivot")
print("=" * 55)

# ── Dữ liệu bán hàng ─────────────────────────────────────
ban_hang = pd.DataFrame({
    "nhan_vien": ["An","An","Bình","Bình","Cúc","Cúc","An","Bình"],
    "thang":     [1, 2, 1, 2, 1, 2, 3, 3],
    "san_pham":  ["Laptop","Mouse","Laptop","Keyboard","Mouse","Laptop","Keyboard","Mouse"],
    "doanh_thu": [12.0, 0.25, 11.5, 1.8, 0.30, 13.0, 1.8, 0.25],  # triệu
    "so_don":    [1, 5, 1, 3, 6, 1, 4, 7],
})
print("\n── Dữ liệu bán hàng ──")
print(ban_hang.to_string(index=False))

# ──────────────────────────────────────────────────────────
# 1. GROUPBY CĂN BẢN
# ──────────────────────────────────────────────────────────
print("\n── 1. GroupBy cơ bản ──")
print("  Tổng doanh thu mỗi nhân viên:")
print(ban_hang.groupby("nhan_vien")["doanh_thu"].sum().sort_values(ascending=False))

print("\n  Thống kê nhiều chỉ số:")
print(ban_hang.groupby("nhan_vien").agg(
    tong_dt=("doanh_thu", "sum"),
    tb_dt  =("doanh_thu", "mean"),
    tong_don=("so_don",   "sum"),
    so_giao_dich=("doanh_thu", "count")
).round(2))

# ──────────────────────────────────────────────────────────
# 2. GROUPBY NHIỀU CỘT
# ──────────────────────────────────────────────────────────
print("\n── 2. GroupBy nhiều cột ──")
print("  Doanh thu theo nhân viên & tháng:")
print(ban_hang.groupby(["nhan_vien", "thang"])["doanh_thu"].sum().unstack(fill_value=0))

print("\n  Top sản phẩm mỗi nhân viên:")
print(ban_hang.groupby(["nhan_vien", "san_pham"])["doanh_thu"].sum().reset_index()
      .sort_values(["nhan_vien", "doanh_thu"], ascending=[True, False])
      .groupby("nhan_vien").head(1))

# ──────────────────────────────────────────────────────────
# 3. PIVOT TABLE
# ──────────────────────────────────────────────────────────
print("\n── 3. Pivot Table ──")
pivot = pd.pivot_table(
    ban_hang,
    values="doanh_thu",
    index="nhan_vien",
    columns="thang",
    aggfunc="sum",
    fill_value=0,
    margins=True,           # Thêm hàng/cột tổng
    margins_name="Tổng"
)
print(pivot)

# ──────────────────────────────────────────────────────────
# 4. TRANSFORM — tính % đóng góp
# ──────────────────────────────────────────────────────────
print("\n── 4. transform ──")
ban_hang["tong_theo_nv"] = ban_hang.groupby("nhan_vien")["doanh_thu"].transform("sum")
ban_hang["phan_tram"]    = (ban_hang["doanh_thu"] / ban_hang["tong_theo_nv"] * 100).round(1)
print(ban_hang[["nhan_vien", "san_pham", "doanh_thu", "phan_tram"]].to_string(index=False))

# ──────────────────────────────────────────────────────────
# 5. MERGE — kết hợp bảng
# ──────────────────────────────────────────────────────────
print("\n── 5. Merge ──")
nhan_vien = pd.DataFrame({
    "nhan_vien": ["An", "Bình", "Cúc", "Dũng"],
    "phong_ban": ["Kinh doanh", "Kinh doanh", "Kỹ thuật", "Kinh doanh"],
    "luong_cb":  [10, 12, 11, 9],   # triệu
})
kpi = ban_hang.groupby("nhan_vien")["doanh_thu"].sum().reset_index()
kpi.columns = ["nhan_vien", "tong_doanh_thu"]

# Left join để giữ tất cả nhân viên kể cả Dũng chưa bán
ket_hop = pd.merge(nhan_vien, kpi, on="nhan_vien", how="left")
ket_hop["tong_doanh_thu"] = ket_hop["tong_doanh_thu"].fillna(0)
ket_hop["thuong"] = (ket_hop["tong_doanh_thu"] * 0.03).round(2)
print(ket_hop.to_string(index=False))

# ──────────────────────────────────────────────────────────
# 6. CONCAT — nối bảng
# ──────────────────────────────────────────────────────────
print("\n── 6. Concat ──")
thang4 = pd.DataFrame({
    "nhan_vien": ["An", "Cúc"],
    "thang":     [4, 4],
    "san_pham":  ["Laptop", "Mouse"],
    "doanh_thu": [14.0, 0.5],
    "so_don":    [1, 10],
})
tat_ca = pd.concat([ban_hang[["nhan_vien","thang","san_pham","doanh_thu","so_don"]], thang4],
                   ignore_index=True)
print(f"  Tổng số giao dịch sau concat: {len(tat_ca)}")
print(f"  Doanh thu tổng: {tat_ca['doanh_thu'].sum():.2f} triệu")

print("\n✅ Demo hoàn tất!")

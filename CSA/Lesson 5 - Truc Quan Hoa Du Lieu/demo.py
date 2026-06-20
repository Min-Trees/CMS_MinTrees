"""
CSA - Buổi 5: Trực Quan Hóa Dữ Liệu
=======================================
Màn hình sẽ chỉ hiện text nếu không có GUI.
Cài trước: pip install matplotlib seaborn
"""

import pandas as pd
import numpy as np
import matplotlib
matplotlib.use("Agg")   # Không hiện cửa sổ — dùng file
import matplotlib.pyplot as plt
import seaborn as sns
import os

sns.set_theme(style="whitegrid", palette="muted")

# ── Dữ liệu mẫu ──────────────────────────────────────────
np.random.seed(0)
doanh_thu = pd.DataFrame({
    "thang": list(range(1, 13)) * 2,
    "nhan_vien": ["An"]*12 + ["Bình"]*12,
    "dt": (np.random.normal(50, 15, 24)).clip(20, 100).round(1),
})

tip = sns.load_dataset("tips")

os.makedirs("charts", exist_ok=True)

# ──────────────────────────────────────────────────────────
# 1. LINE CHART — xu hướng theo thời gian
# ──────────────────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(9, 4))
for nv, grp in doanh_thu.groupby("nhan_vien"):
    ax.plot(grp["thang"], grp["dt"], marker="o", label=nv, linewidth=2)
ax.set_title("Doanh Thu Theo Tháng", fontsize=14, fontweight="bold")
ax.set_xlabel("Tháng"); ax.set_ylabel("Doanh thu (triệu)")
ax.set_xticks(range(1, 13))
ax.legend(); ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig("charts/1_line_chart.png", dpi=100)
plt.close()
print("✓ Line chart → charts/1_line_chart.png")

# ──────────────────────────────────────────────────────────
# 2. BAR CHART — so sánh
# ──────────────────────────────────────────────────────────
theo_ngay = tip.groupby("day")["tip"].mean().reset_index()
theo_ngay = theo_ngay.sort_values("tip", ascending=False)

fig, ax = plt.subplots(figsize=(7, 4))
bars = ax.bar(theo_ngay["day"], theo_ngay["tip"],
              color=sns.color_palette("muted", len(theo_ngay)))
ax.bar_label(bars, fmt="%.2f", fontsize=9)
ax.set_title("Tiền Tip TB theo Ngày trong Tuần")
ax.set_xlabel("Ngày"); ax.set_ylabel("Tip trung bình ($)")
plt.tight_layout()
plt.savefig("charts/2_bar_chart.png", dpi=100)
plt.close()
print("✓ Bar chart → charts/2_bar_chart.png")

# ──────────────────────────────────────────────────────────
# 3. HISTOGRAM — phân phối
# ──────────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 2, figsize=(10, 4))
axes[0].hist(tip["total_bill"], bins=20, color="steelblue", edgecolor="white")
axes[0].set_title("Phân Phối Tổng Bill"); axes[0].set_xlabel("$")
sns.histplot(tip["tip"], kde=True, bins=20, ax=axes[1], color="coral")
axes[1].set_title("Phân Phối Tiền Tip (có KDE)")
plt.tight_layout()
plt.savefig("charts/3_histogram.png", dpi=100)
plt.close()
print("✓ Histogram → charts/3_histogram.png")

# ──────────────────────────────────────────────────────────
# 4. BOXPLOT — phân phối theo nhóm
# ──────────────────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(8, 4))
sns.boxplot(data=tip, x="day", y="total_bill", hue="time", ax=ax)
ax.set_title("Phân Phối Bill theo Ngày và Bữa Ăn")
plt.tight_layout()
plt.savefig("charts/4_boxplot.png", dpi=100)
plt.close()
print("✓ Boxplot → charts/4_boxplot.png")

# ──────────────────────────────────────────────────────────
# 5. SCATTER PLOT — tương quan
# ──────────────────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(7, 5))
sns.scatterplot(data=tip, x="total_bill", y="tip",
                hue="sex", size="size", alpha=0.7, ax=ax)
# Đường hồi quy
z = np.polyfit(tip["total_bill"], tip["tip"], 1)
p = np.poly1d(z)
x_range = np.linspace(tip["total_bill"].min(), tip["total_bill"].max(), 100)
ax.plot(x_range, p(x_range), "r--", linewidth=1.5, label="Trend")
ax.set_title("Tương Quan: Bill vs Tip")
ax.legend(); plt.tight_layout()
plt.savefig("charts/5_scatter.png", dpi=100)
plt.close()
print("✓ Scatter → charts/5_scatter.png")

# ──────────────────────────────────────────────────────────
# 6. HEATMAP — ma trận tương quan
# ──────────────────────────────────────────────────────────
corr = tip[["total_bill","tip","size"]].corr()
fig, ax = plt.subplots(figsize=(5, 4))
sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm",
            square=True, linewidths=0.5, ax=ax)
ax.set_title("Correlation Matrix")
plt.tight_layout()
plt.savefig("charts/6_heatmap.png", dpi=100)
plt.close()
print("✓ Heatmap → charts/6_heatmap.png")

# ──────────────────────────────────────────────────────────
# 7. SUBPLOTS — Dashboard tổng hợp
# ──────────────────────────────────────────────────────────
fig, axes = plt.subplots(2, 2, figsize=(12, 8))
fig.suptitle("Dashboard Phân Tích Tips Dataset", fontsize=14, fontweight="bold")

# 7a. Line
theo_nv = doanh_thu.pivot(index="thang", columns="nhan_vien", values="dt")
theo_nv.plot(ax=axes[0,0], marker="o"); axes[0,0].set_title("Doanh Thu NV")

# 7b. Bar
axes[0,1].bar(theo_ngay["day"], theo_ngay["tip"])
axes[0,1].set_title("Tip TB theo Ngày")

# 7c. Hist
axes[1,0].hist(tip["total_bill"], bins=15, color="steelblue")
axes[1,0].set_title("Phân Phối Bill")

# 7d. Scatter
axes[1,1].scatter(tip["total_bill"], tip["tip"], alpha=0.5, color="coral")
axes[1,1].set_title("Bill vs Tip")

plt.tight_layout()
plt.savefig("charts/7_dashboard.png", dpi=100)
plt.close()
print("✓ Dashboard → charts/7_dashboard.png")

print("\n✅ Tất cả biểu đồ đã lưu trong folder charts/")
print("   Mở file PNG bằng trình xem ảnh để xem kết quả.")

# 🎯 Buổi 5: Trực Quan Hóa Dữ Liệu với Matplotlib & Seaborn

> **Khóa:** CSA | **Buổi:** 5/8 | **Thời lượng:** 90 phút  
> **Cài đặt:** `pip install matplotlib seaborn`

---

## 🎯 Mục Tiêu

Sau buổi này học viên có thể:
- ✅ Vẽ biểu đồ đường, cột, tròn với `matplotlib.pyplot`
- ✅ Tùy chỉnh tiêu đề, nhãn trục, màu sắc, legend
- ✅ Vẽ histogram, boxplot, scatter với seaborn
- ✅ Tạo heatmap tương quan và subplot dashboard
- ✅ Lưu biểu đồ ra file PNG

---

## 🔁 Ôn Bài Cũ (10 phút)

1. Sự khác nhau giữa `groupby().agg()` và `groupby().transform()`?
2. Khi nào dùng `inner join` vs `left join`?
3. Pivot table khác groupby ở điểm gì?
4. **Mini task:** Cho DataFrame bán hàng, tính doanh thu theo tháng và tạo pivot nhân viên × tháng.

---

## 📖 Kiến Thức 1: Matplotlib Cơ Bản

### ✅ Giải Thích

**matplotlib.pyplot** như **bộ bút vẽ** trong Python — bạn phải tự vẽ từng chi tiết.

Quy trình vẽ biểu đồ:
1. Tạo canvas: `fig, ax = plt.subplots(figsize=...)`
2. Vẽ lên canvas: `ax.plot()`, `ax.bar()`, `ax.scatter()`
3. Trang trí: `ax.set_title()`, `ax.set_xlabel()`, `ax.legend()`
4. Hiển thị/lưu: `plt.show()` hoặc `plt.savefig()`

| Hàm | Biểu đồ | Dùng khi |
|-----|---------|---------|
| `ax.plot()` | Đường | Xu hướng theo thời gian |
| `ax.bar()` | Cột dọc | So sánh nhiều giá trị |
| `ax.barh()` | Cột ngang | Tên dài, nhiều danh mục |
| `ax.scatter()` | Điểm | Tương quan 2 biến |
| `ax.pie()` | Tròn | Tỷ lệ phần trăm |
| `ax.hist()` | Histogram | Phân phối dữ liệu |

### 📌 Ví Dụ

**Input:** Dữ liệu doanh thu 6 tháng  
**Output:** Biểu đồ đường, cột có tên, màu sắc

### 💻 Code

```python
import matplotlib.pyplot as plt
import numpy as np

thang = list(range(1, 7))
dt_an   = [12, 15, 11, 18, 14, 20]
dt_binh = [10, 13, 16, 12, 17, 15]

fig, axes = plt.subplots(1, 2, figsize=(12, 4))

# ── Line chart ───────────────────────────────────────────
axes[0].plot(thang, dt_an,   marker="o", color="royalblue", label="An",   linewidth=2)
axes[0].plot(thang, dt_binh, marker="s", color="coral",     label="Bình", linewidth=2)
axes[0].set_title("Doanh Thu Theo Tháng", fontsize=13, fontweight="bold")
axes[0].set_xlabel("Tháng")
axes[0].set_ylabel("Doanh thu (triệu đồng)")
axes[0].set_xticks(thang)
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# ── Bar chart ────────────────────────────────────────────
x = np.arange(len(thang))
width = 0.35
bars1 = axes[1].bar(x - width/2, dt_an,   width, label="An",   color="royalblue")
bars2 = axes[1].bar(x + width/2, dt_binh, width, label="Bình", color="coral")
axes[1].bar_label(bars1, fontsize=8)    # Ghi số trên đầu cột
axes[1].bar_label(bars2, fontsize=8)
axes[1].set_title("Doanh Thu — Biểu Đồ Cột")
axes[1].set_xlabel("Tháng")
axes[1].set_xticks(x)
axes[1].set_xticklabels([f"T{t}" for t in thang])
axes[1].legend()

plt.tight_layout()
plt.savefig("bieu_do.png", dpi=120)
plt.close()
print("Đã lưu: bieu_do.png")
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Gọi plt.figure() thay ax — code dài và khó quản lý
plt.figure(figsize=(8,4))
plt.plot(...)
plt.title(...)

# ✅ Luôn dùng fig, ax = plt.subplots()
fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(...)
ax.set_title(...)

# ❌ Quên plt.close() — tốn RAM khi vẽ nhiều biểu đồ
for i in range(100):
    plt.subplots()  # Mỗi lần tạo mới mà không đóng!
# ✅
    fig, ax = plt.subplots()
    # ... vẽ ...
    plt.close(fig)  # Đóng sau khi xong
```

---

## 📖 Kiến Thức 2: Seaborn — Biểu Đồ Thống Kê Đẹp

### ✅ Giải Thích

**Seaborn** như **filter tự động** — bạn chỉ nói "cột nào vào trục nào", nó tự lo màu sắc, style đẹp.

Seaborn hiểu **tidy data** — dataframe với cột `hue` để phân nhóm tự động.

| Seaborn | Dùng khi |
|---------|---------|
| `sns.histplot()` | Phân phối 1 biến + KDE |
| `sns.boxplot()` | So sánh phân phối theo nhóm |
| `sns.scatterplot()` | Tương quan có màu nhóm |
| `sns.heatmap()` | Ma trận tương quan |
| `sns.barplot()` | Cột với CI (confidence interval) |
| `sns.pairplot()` | Xem tương quan mọi cặp biến |

### 📌 Ví Dụ

**Input:** Dataset `tips` từ seaborn  
**Output:** Histogram, boxplot, scatter có nhóm màu

### 💻 Code

```python
import seaborn as sns
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid")   # Theme global một lần
tip = sns.load_dataset("tips")

fig, axes = plt.subplots(2, 2, figsize=(12, 8))
fig.suptitle("Tips Dataset Analysis", fontsize=14, fontweight="bold")

# Histogram + KDE
sns.histplot(tip["total_bill"], kde=True, bins=20, ax=axes[0,0], color="steelblue")
axes[0,0].set_title("Phân Phối Tổng Bill")

# Boxplot theo ngày
sns.boxplot(data=tip, x="day", y="tip", hue="sex", ax=axes[0,1])
axes[0,1].set_title("Tiền Tip theo Ngày và Giới Tính")

# Scatter có màu nhóm
sns.scatterplot(data=tip, x="total_bill", y="tip", hue="smoker",
                size="size", alpha=0.7, ax=axes[1,0])
axes[1,0].set_title("Bill vs Tip — Phân nhóm Smoker")

# Barplot với CI
sns.barplot(data=tip, x="day", y="tip", hue="time",
            errorbar="sd", ax=axes[1,1])
axes[1,1].set_title("Tip TB theo Ngày & Bữa")

plt.tight_layout()
plt.savefig("seaborn_analysis.png", dpi=120)
plt.close()
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Dùng sns.set() bị deprecated
sns.set(style="whitegrid")  # Cũ, vẫn chạy nhưng cảnh báo
# ✅ Dùng sns.set_theme()
sns.set_theme(style="whitegrid", palette="muted")

# ❌ Nhầm plt.show() khi dùng backend không có GUI (server, CI/CD)
plt.show()   # Có thể bị treo hoặc lỗi
# ✅ Dùng savefig() khi không cần hiển thị trực tiếp
plt.savefig("output.png")
plt.close()
```

---

## 📖 Kiến Thức 3: Heatmap và Correlation

### ✅ Giải Thích

**Correlation matrix** cho biết hai biến có quan hệ thuận/nghịch mạnh hay yếu:
- **+1.0**: Quan hệ thuận tuyệt đối
- **0.0**: Không có quan hệ tuyến tính
- **-1.0**: Quan hệ nghịch tuyệt đối

**Heatmap** trực quan hóa ma trận này bằng màu sắc — đỏ/cam = tương quan mạnh.

### 💻 Code

```python
import seaborn as sns
import matplotlib.pyplot as plt

tip = sns.load_dataset("tips")

# Tính correlation matrix
corr = tip[["total_bill", "tip", "size"]].corr()
print(corr)

# Vẽ heatmap
fig, ax = plt.subplots(figsize=(5, 4))
sns.heatmap(
    corr,
    annot   = True,        # Hiển thị số
    fmt     = ".2f",       # 2 chữ số thập phân
    cmap    = "coolwarm",  # Màu xanh-đỏ
    square  = True,        # Ô vuông
    linewidths = 0.5,      # Đường kẻ ô
    vmin=-1, vmax=1,       # Cố định thang màu
    ax=ax
)
ax.set_title("Ma Trận Tương Quan")
plt.tight_layout()
plt.savefig("heatmap.png", dpi=120)
plt.close()

# Pairplot — xem tất cả tương quan cùng lúc
# (Lưu ý: chậm với dataset lớn)
g = sns.pairplot(tip, hue="sex", corner=True)
g.fig.suptitle("Pairplot Tips", y=1.02)
g.savefig("pairplot.png")
plt.close()
```

---

## 📖 Kiến Thức 4: Dashboard với Subplots

### ✅ Giải Thích

Dashboard = nhiều biểu đồ trên cùng một trang — như bảng điều khiển xe.  
`plt.subplots(nrow, ncol)` cho lưới biểu đồ.  
`gridspec` và `subplot_mosaic` cho layout linh hoạt hơn.

### 💻 Code

```python
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import seaborn as sns
import pandas as pd

tip = sns.load_dataset("tips")
theo_ngay = tip.groupby("day")["tip"].mean()

# Layout tùy chỉnh với gridspec
fig = plt.figure(figsize=(14, 8))
fig.suptitle("Dashboard Phân Tích Nhà Hàng", fontsize=14, fontweight="bold")
gs  = gridspec.GridSpec(2, 3, figure=fig, hspace=0.4, wspace=0.35)

# Biểu đồ lớn ở trên trái (chiếm 2 cột)
ax1 = fig.add_subplot(gs[0, :2])
sns.boxplot(data=tip, x="day", y="total_bill", hue="time", ax=ax1)
ax1.set_title("Phân Phối Bill theo Ngày")

# Biểu đồ tròn ở trên phải
ax2 = fig.add_subplot(gs[0, 2])
ax2.pie(theo_ngay, labels=theo_ngay.index, autopct="%1.1f%%", startangle=90)
ax2.set_title("Tip TB theo Ngày")

# Ba biểu đồ nhỏ ở hàng dưới
for i, col in enumerate(["total_bill", "tip", "size"]):
    ax = fig.add_subplot(gs[1, i])
    sns.histplot(tip[col], bins=15, ax=ax, kde=True)
    ax.set_title(f"Phân phối {col}")

plt.savefig("dashboard.png", dpi=120, bbox_inches="tight")
plt.close()
```

---

## 💻 Demo Tổng Hợp: Báo Cáo Doanh Thu Visual

```python
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import seaborn as sns
import os

sns.set_theme(style="whitegrid", palette="Set2")
os.makedirs("bao_cao", exist_ok=True)
np.random.seed(1)

# Tạo dữ liệu
months = list(range(1, 13))
nhan_vien = ["An", "Bình", "Cúc"]
rows = []
for nv in nhan_vien:
    for m in months:
        rows.append({"nhan_vien": nv, "thang": m,
                     "doanh_thu": max(5, np.random.normal(50, 15)),
                     "so_don": np.random.randint(5, 30)})
df = pd.DataFrame(rows)

# ── Vẽ biểu đồ 1: Line chart xu hướng ───────────────────
fig, ax = plt.subplots(figsize=(10, 4))
for nv in nhan_vien:
    grp = df[df["nhan_vien"]==nv]
    ax.plot(grp["thang"], grp["doanh_thu"], marker="o", label=nv, linewidth=2)
ax.set_title("Xu Hướng Doanh Thu Cả Năm", fontsize=13)
ax.set_xlabel("Tháng"); ax.set_ylabel("Doanh thu (triệu)")
ax.set_xticks(months); ax.legend(); ax.grid(alpha=0.3)
plt.tight_layout(); plt.savefig("bao_cao/1_xu_huong.png", dpi=100); plt.close()

# ── Vẽ biểu đồ 2: Heatmap nhân viên × tháng ─────────────
pivot = df.pivot_table(values="doanh_thu", index="nhan_vien", columns="thang", aggfunc="sum")
fig, ax = plt.subplots(figsize=(12, 3))
sns.heatmap(pivot.round(1), annot=True, fmt=".0f", cmap="YlOrRd", ax=ax, linewidths=0.5)
ax.set_title("Doanh Thu Nhân Viên × Tháng (triệu)")
plt.tight_layout(); plt.savefig("bao_cao/2_heatmap.png", dpi=100); plt.close()

# ── Vẽ biểu đồ 3: Box nhân viên ─────────────────────────
fig, ax = plt.subplots(figsize=(7, 4))
sns.boxplot(data=df, x="nhan_vien", y="doanh_thu", ax=ax)
ax.set_title("Phân Phối Doanh Thu Mỗi Nhân Viên")
plt.tight_layout(); plt.savefig("bao_cao/3_boxplot.png", dpi=100); plt.close()

print("✅ Đã tạo 3 biểu đồ trong folder bao_cao/")

# Dọn dẹp
import shutil; shutil.rmtree("bao_cao")
```

---

## 📝 Bài Tập Trên Lớp

**🟢 Bài 1 (Dễ):** Line + Bar chart  
Dữ liệu nhiệt độ TB Hà Nội 12 tháng (hoặc tự điền).  
a) Line chart: nhiệt độ theo tháng  
b) Bar chart: so sánh T1–T6 vs T7–T12  
c) Thêm tiêu đề, màu sắc, nhãn trục, legend

**🟡 Bài 2 (Trung Bình):** Seaborn analysis  
Dùng `sns.load_dataset("iris")`:  
a) Boxplot: phân phối `sepal_length` theo `species`  
b) Scatter: `sepal_length` vs `petal_length` với màu theo `species`  
c) Heatmap correlation matrix  
d) Nhận xét: loài nào có sepal dài nhất? Biến nào tương quan cao nhất?

**🔴 Bài 3 (Nâng Cao):** Dashboard hoàn chỉnh  
Tạo dashboard 2×2 với dataset `titanic` (từ seaborn):  
a) Bar chart: tỷ lệ sống sót theo class  
b) Histogram: phân phối tuổi (có hue=survived)  
c) Boxplot: giá vé theo class  
d) Heatmap: correlation matrix của các cột số  
Lưu file dashboard.png chất lượng cao (dpi=150)

---

## 🏠 Bài Tập Về Nhà

**Bài 1:** Visual Report từ dữ liệu thực  
Lấy dataset CSV bạn đã làm buổi 3.  
Tạo báo cáo trực quan: ít nhất 4 biểu đồ khác loại.  
Lưu tất cả vào 1 file PDF hoặc 4 file PNG.

**Bài 2:** Animated-like Report  
Từ dữliệu bán hàng theo tháng:  
Vẽ 12 subplot (subplot 1×12 hoặc 3×4), mỗi subplot = 1 tháng, biểu đồ cột top-5 sản phẩm.  
Thêm màu sắc nhất quán, tiêu đề, caption.

---

## 🎯 Tổng Kết

**3 điểm cần nhớ:**
1. **matplotlib dùng `fig, ax = plt.subplots()`** — không dùng `plt.plot()` trực tiếp khi cần subplots
2. **seaborn + `hue=`** = tự phân màu theo nhóm, không cần vòng lặp
3. **Luôn `plt.tight_layout()` và `plt.close()`** sau khi lưu — tránh lỗi layout và rò bộ nhớ

**Buổi tiếp theo (Buổi 6):** Machine Learning — xây dựng mô hình dự đoán với Linear Regression và scikit-learn.

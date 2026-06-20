# 🎯 Buổi 4: Kiểm Tra Lần 1

> **Khóa:** CSA | **Buổi:** 4/8 | **Thời lượng:** 90 phút  
> **Hình thức:** Thực hành trên máy | Tài liệu đóng

---

## 🎯 Mục Tiêu Đánh Giá

- ✅ Tạo và thao tác DataFrame
- ✅ Lọc dữ liệu với nhiều điều kiện
- ✅ Xử lý giá trị thiếu
- ✅ GroupBy và Aggregation
- ✅ Merge bảng, pivot table

---

## 🔁 Ôn Tập Trước Thi (15 phút)

**Checklist nhanh:**

| Kỹ năng | Ghi nhớ |
|---------|---------|
| `df.read_csv()` | `encoding="utf-8-sig"`, `index=False` khi ghi |
| `loc` vs `iloc` | loc=nhãn, iloc=vị trí số |
| Boolean mask | `()` quanh mỗi điều kiện, dùng `&`, `|`, `~` |
| NaN detection | `.isna()`, không dùng `== None` |
| GroupBy pipeline | `.groupby("col").agg(new_name=("col","func"))` |
| Merge | `how="left"` giữ toàn bộ bảng trái |
| Pivot | `pd.pivot_table(df, values, index, columns, aggfunc)` |

---

## 📝 Đề Thi (75 phút — 10 điểm)

**File dữ liệu:** Tải `hoc_vien_csa.csv` từ Google Classroom hoặc dùng code tạo dữ liệu bên dưới.

```python
# TẠO DỮ LIỆU THI (chạy đầu bài)
import pandas as pd
import numpy as np

np.random.seed(42)
n = 50
hoc_vien = pd.DataFrame({
    "ma_hv":     [f"HV{i:03d}" for i in range(1, n+1)],
    "ten":       [f"Học Viên {i}" for i in range(1, n+1)],
    "lop":       np.random.choice(["A","B","C"], n),
    "diem_ly_thuyet": np.where(np.random.rand(n) < 0.15, np.nan,
                               np.random.uniform(4, 10, n).round(1)),
    "diem_thuc_hanh": np.where(np.random.rand(n) < 0.10, np.nan,
                               np.random.uniform(5, 10, n).round(1)),
    "gio_hoc":   np.random.randint(10, 50, n),
    "thanh_pho": np.random.choice(["HCM","HN","ĐN","CTO"], n),
})
hoc_vien.to_csv("hoc_vien_csa.csv", index=False, encoding="utf-8-sig")
print("✓ Đã tạo file hoc_vien_csa.csv")
```

---

### Câu 1 (2 điểm): Đọc và Khám Phá Dữ Liệu

a) *(0.5đ)* Đọc `hoc_vien_csa.csv` vào DataFrame, in:
   - Số hàng, số cột  
   - Kiểu dữ liệu từng cột  
   - 5 hàng đầu

b) *(0.5đ)* Thống kê `describe()`. Nhận xét: điểm thực hành TB là bao nhiêu? Max là bao nhiêu?

c) *(1đ)* Xử lý NaN:
   - Đếm NaN theo từng cột
   - Điền NaN `diem_ly_thuyet` bằng median **theo từng lớp**
   - Điền NaN `diem_thuc_hanh` bằng mean **theo từng thành phố**
   - Kiểm tra: sau khi fill không còn NaN

---

### Câu 2 (2 điểm): Lọc và Thao Tác Cột

a) *(0.5đ)* Thêm cột `diem_tong_ket` = 40% lý thuyết + 60% thực hành (làm tròn 1 chữ số)

b) *(0.5đ)* Thêm cột `xep_loai`:
   - ≥ 8.5 → "Giỏi"
   - ≥ 7.0 → "Khá"
   - ≥ 5.0 → "Trung Bình"
   - < 5.0 → "Yếu"

c) *(0.5đ)* Lọc ra học viên: lớp "A" hoặc "B", điểm tổng kết ≥ 7.5, học ≥ 30 giờ

d) *(0.5đ)* Dùng `.loc[]` để tăng điểm thực hành thêm 0.5 cho học viên ở Đà Nẵng (không vượt quá 10)

---

### Câu 3 (3 điểm): GroupBy và Thống Kê

a) *(0.75đ)* Thống kê theo lớp:
   - Số học viên mỗi lớp
   - Điểm tổng kết TB, max, min
   - Số giờ học TB

b) *(0.75đ)* Thống kê theo xếp loại:
   - Số học viên mỗi xếp loại
   - % mỗi loại trong tổng số (làm tròn 1 chữ số thập phân)

c) *(0.75đ)* Học viên xuất sắc nhất mỗi thành phố (điểm tổng kết cao nhất)

d) *(0.75đ)* Pivot table: `lop` (hàng) × `thanh_pho` (cột) → điểm tổng kết TB, có margins

---

### Câu 4 (3 điểm): Merge và Tổng Hợp

Tạo thêm bảng dữ liệu:

```python
# Bảng phong trào (học viên có thể không có, hoặc có nhiều lần)
phong_trao = pd.DataFrame({
    "ma_hv":    [f"HV{i:03d}" for i in np.random.choice(range(1,51), 30, replace=False)],
    "hoat_dong":np.random.choice(["Hackathon","Workshop","Mentoring","Contest"], 30),
    "diem_cong":np.random.randint(5, 20, 30),
})
phong_trao.to_csv("phong_trao.csv", index=False)
```

a) *(1đ)* Left merge `hoc_vien` với `phong_trao` trên `ma_hv`.  
   Học viên không tham gia phong trào có `diem_cong` = 0.  
   Học viên tham gia nhiều hoạt động → tính tổng điểm cộng.

b) *(1đ)* Thêm cột `diem_cuoi_cung` = `diem_tong_ket` + `diem_cong * 0.1` (tối đa 10).

c) *(1đ)* In bảng xếp hạng Top 10 toàn trường theo `diem_cuoi_cung`.

---

## 📋 Đáp Án Tham Khảo

```python
import pandas as pd
import numpy as np

# ── Câu 1 ────────────────────────────────────────────────
df = pd.read_csv("hoc_vien_csa.csv", encoding="utf-8-sig")
print(df.shape, df.dtypes)
print(df.head())
print(df.describe())
print("NaN:", df.isna().sum())

# 1c — Fill NaN theo nhóm
df["diem_ly_thuyet"] = df.groupby("lop")["diem_ly_thuyet"].transform(
    lambda x: x.fillna(x.median())
)
df["diem_thuc_hanh"] = df.groupby("thanh_pho")["diem_thuc_hanh"].transform(
    lambda x: x.fillna(x.mean())
)
print("NaN sau fill:", df.isna().sum())

# ── Câu 2 ────────────────────────────────────────────────
df["diem_tong_ket"] = (df["diem_ly_thuyet"]*0.4 + df["diem_thuc_hanh"]*0.6).round(1)

def xep_loai(d):
    if d >= 8.5: return "Giỏi"
    elif d >= 7.0: return "Khá"
    elif d >= 5.0: return "Trung Bình"
    else: return "Yếu"
df["xep_loai"] = df["diem_tong_ket"].apply(xep_loai)

# 2c — Lọc
ds_loc = df[(df["lop"].isin(["A","B"])) & (df["diem_tong_ket"]>=7.5) & (df["gio_hoc"]>=30)]
print(ds_loc[["ten","lop","diem_tong_ket","gio_hoc"]])

# 2d — Tăng điểm TH cho ĐN
df.loc[df["thanh_pho"]=="ĐN","diem_thuc_hanh"] = (
    df.loc[df["thanh_pho"]=="ĐN","diem_thuc_hanh"] + 0.5
).clip(upper=10)

# ── Câu 3 ────────────────────────────────────────────────
# 3a
print(df.groupby("lop").agg(
    so_hv=("ma_hv","count"),
    tb_dtk=("diem_tong_ket","mean"),
    max_dtk=("diem_tong_ket","max"),
    min_dtk=("diem_tong_ket","min"),
    tb_gio=("gio_hoc","mean"),
).round(2))

# 3b
dem_xep_loai = df["xep_loai"].value_counts().reset_index()
dem_xep_loai.columns = ["xep_loai","so_hv"]
dem_xep_loai["phan_tram"] = (dem_xep_loai["so_hv"] / len(df) * 100).round(1)
print(dem_xep_loai)

# 3c
xuat_sac = df.loc[df.groupby("thanh_pho")["diem_tong_ket"].idxmax(),
                   ["ten","thanh_pho","diem_tong_ket"]]
print(xuat_sac)

# 3d
print(pd.pivot_table(df, values="diem_tong_ket",
                     index="lop", columns="thanh_pho",
                     aggfunc="mean", fill_value=0,
                     margins=True).round(2))

# ── Câu 4 ────────────────────────────────────────────────
pt = pd.read_csv("phong_trao.csv")
# Tính tổng điểm cộng mỗi học viên
dc_sum = pt.groupby("ma_hv")["diem_cong"].sum().reset_index()
dc_sum.columns = ["ma_hv","tong_diem_cong"]

df_ket = pd.merge(df, dc_sum, on="ma_hv", how="left")
df_ket["tong_diem_cong"] = df_ket["tong_diem_cong"].fillna(0)
df_ket["diem_cuoi_cung"] = (df_ket["diem_tong_ket"] + df_ket["tong_diem_cong"]*0.1).clip(upper=10)

print("Top 10:")
print(df_ket.sort_values("diem_cuoi_cung",ascending=False)
      .head(10)[["ten","lop","diem_tong_ket","tong_diem_cong","diem_cuoi_cung"]].to_string(index=False))

import os
for f in ["hoc_vien_csa.csv","phong_trao.csv"]:
    if os.path.exists(f): os.remove(f)
```

---

## 🎯 Tổng Kết Buổi 4

**Buổi tiếp theo (Buổi 5):** Trực quan hóa dữ liệu với matplotlib và seaborn — biến số liệu thành biểu đồ đẹp, dễ đọc.

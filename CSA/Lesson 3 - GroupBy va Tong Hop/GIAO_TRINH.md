# 🎯 Buổi 3: GroupBy, Aggregation và Kết Hợp Bảng

> **Khóa:** CSA | **Buổi:** 3/8 | **Thời lượng:** 90 phút

---

## 🎯 Mục Tiêu

Sau buổi này học viên có thể:
- ✅ Nhóm dữ liệu theo một hoặc nhiều cột (`groupby`)
- ✅ Tính nhiều thống kê cùng lúc với `.agg()`
- ✅ Tạo pivot table như trong Excel
- ✅ Kết hợp hai bảng bằng `merge` (inner/left/right/outer join)
- ✅ Nối bảng theo hàng với `pd.concat()`

---

## 🔁 Ôn Bài Cũ (10 phút)

1. Sự khác nhau giữa `df.loc[0]` và `df.iloc[0]` khi index không bắt đầu từ 0?
2. Tại sao phải dùng `()` khi kết hợp nhiều điều kiện filter?
3. Phân biệt `dropna()` và `fillna()` — khi nào dùng cái nào?
4. **Mini task:** Cho DataFrame bán hàng, thêm cột `giam_gia` = 10% nếu `so_luong > 3`, ngược lại 0. Thêm cột `thuc_tra`.

---

## 📖 Kiến Thức 1: GroupBy — Nhóm và Tổng Hợp

### ✅ Giải Thích

**GroupBy** như **bộ phân loại thư** — gom tất cả thư cùng địa chỉ vào một chồng, rồi đếm hoặc tính tổng từng chồng.

Quy trình "Split → Apply → Combine":
1. **Split**: chia DataFrame thành các nhóm theo giá trị cột
2. **Apply**: tính toán trong từng nhóm
3. **Combine**: ghép kết quả lại

| Hàm | Ý nghĩa |
|-----|---------|
| `.sum()` | Tổng |
| `.mean()` | Trung bình |
| `.count()` | Đếm hàng không NaN |
| `.size()` | Đếm tất cả hàng |
| `.max()` / `.min()` | Lớn nhất / nhỏ nhất |
| `.std()` | Độ lệch chuẩn |

### 📌 Ví Dụ

**Input:** Bảng đơn hàng với cột `nhan_vien`, `doanh_thu`  
**Output:** Tổng doanh thu theo từng nhân viên

### 💻 Code

```python
import pandas as pd

df = pd.DataFrame({
    "nv":    ["An","An","Bình","Bình","Cúc","Cúc","An"],
    "thang": [1, 2, 1, 2, 1, 2, 3],
    "sp":    ["Laptop","Mouse","Laptop","Keyboard","Mouse","Laptop","Keyboard"],
    "dt":    [12.0, 0.25, 11.5, 1.8, 0.30, 13.0, 1.8],   # triệu
    "don":   [1, 5, 1, 3, 6, 1, 4],
})

# GroupBy cơ bản — một hàm
print(df.groupby("nv")["dt"].sum())
print(df.groupby("nv")["dt"].mean().round(2))

# GroupBy nhiều hàm cùng lúc — .agg()
ket_qua = df.groupby("nv").agg(
    tong_dt  = ("dt",  "sum"),
    tb_dt    = ("dt",  "mean"),
    so_gd    = ("dt",  "count"),
    max_dt   = ("dt",  "max"),
    tong_don = ("don", "sum"),
).round(2)
print(ket_qua)

# GroupBy nhiều cột
print(df.groupby(["nv","thang"])["dt"].sum().reset_index())

# GroupBy rồi lấy top trong nhóm
top_sp = (df.groupby(["nv","sp"])["dt"].sum()
            .reset_index()
            .sort_values(["nv","dt"], ascending=[True,False])
            .groupby("nv").head(1))
print(top_sp)
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ GroupBy trả về GroupBy object, không phải DataFrame
grp = df.groupby("nv")
print(grp)   # <DataFrameGroupBy object ...>

# ✅ Phải thêm hàm thống kê và cột
print(grp["dt"].sum())

# ❌ Nhầm .count() và .size()
df.groupby("nv")["dt"].count()  # Đếm hàng không NaN trong cột "dt"
df.groupby("nv").size()         # Đếm TẤT CẢ hàng (kể cả NaN)
```

---

## 📖 Kiến Thức 2: Transform và Filter trong GroupBy

### ✅ Giải Thích

- **`.transform()`** — tính theo nhóm nhưng trả về cùng số hàng với DataFrame gốc (thêm cột mới)
- **`.filter()`** — giữ lại cả nhóm nếu nhóm đó thỏa điều kiện

Hình dung: tiệm bánh có 3 chi nhánh (nhóm). 
- `transform` = ghi doanh thu của chi nhánh vào mỗi đơn hàng → mỗi đơn biết chi nhánh mình đứng đầu hay không
- `filter` = loại bỏ hoàn toàn chi nhánh có doanh thu <10 triệu

### 📌 Ví Dụ

**Input:** Bảng bán hàng  
**Output:** Cột % đóng góp, loại bỏ nhóm yếu

### 💻 Code

```python
import pandas as pd

df = pd.DataFrame({
    "nv":    ["An","An","Bình","Bình","Cúc","Cúc"],
    "sp":    ["Laptop","Mouse","Laptop","Keyboard","Mouse","Laptop"],
    "dt":    [12.0, 0.25, 11.5, 1.8, 0.30, 13.0],
})

# transform — cùng shape với df
df["tong_nv"]   = df.groupby("nv")["dt"].transform("sum")
df["phan_tram"] = (df["dt"] / df["tong_nv"] * 100).round(1)
print(df)

# filter — giữ cả nhóm nếu tổng dt > 13
df_manh = df.groupby("nv").filter(lambda x: x["dt"].sum() > 13)
print(f"\nNhóm có tổng DT > 13 triệu:\n{df_manh}")
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Nhầm .apply() với .transform()
# .apply() có thể trả về shape khác nhau
# .transform() luôn trả về cùng shape với df

# ❌ transform không thể dùng 'custom agg' mà aggregate thành 1 giá trị
df.groupby("nv")["dt"].transform(lambda x: x.sum())   # OK
df.groupby("nv")["dt"].transform(lambda x: [1,2,3])   # Sai
```

---

## 📖 Kiến Thức 3: Pivot Table

### ✅ Giải Thích

**Pivot Table** = chuyển dữ liệu dạng "dài" (long format) sang "rộng" (wide) như bảng chéo trong Excel.

| Dạng Dài | Dạng Rộng (Pivot) |
|----------|------------------|
| Mỗi hàng = 1 giao dịch | Mỗi hàng = 1 nhân viên |
| Tháng là giá trị | Tháng là cột |
| Khó so sánh | Dễ thấy xu hướng |

### 📌 Ví Dụ

**Input:** Bảng bán hàng theo nhân viên và tháng  
**Output:** Bảng pivot doanh thu nhân viên × tháng

### 💻 Code

```python
import pandas as pd

df = pd.DataFrame({
    "nv":    ["An","An","Bình","Bình","Cúc","Cúc","An","Bình"],
    "thang": [1, 2, 1, 2, 1, 2, 3, 3],
    "sp":    ["Laptop","Mouse","Laptop","Keyboard","Mouse","Laptop","Keyboard","Mouse"],
    "dt":    [12.0, 0.25, 11.5, 1.8, 0.30, 13.0, 1.8, 0.25],
})

# Pivot table cơ bản
pivot = pd.pivot_table(
    df,
    values  = "dt",          # Giá trị cần tổng hợp
    index   = "nv",          # Nhóm theo hàng
    columns = "thang",       # Nhóm theo cột
    aggfunc = "sum",          # Hàm tổng hợp
    fill_value = 0,           # Điền 0 cho ô trống
    margins    = True,        # Thêm tổng
    margins_name = "Tổng",
)
print(pivot)

# Pivot nhiều hàm
pivot2 = pd.pivot_table(
    df,
    values  = "dt",
    index   = "nv",
    columns = "thang",
    aggfunc = ["sum", "count"],
    fill_value = 0,
)
print(pivot2)

# Chuyển về DataFrame bình thường
df_pivot = pivot.reset_index()
print(df_pivot)
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Kết quả có MultiIndex columns khi dùng list aggfunc
pivot = pd.pivot_table(df, values="dt", columns="thang", aggfunc=["sum","mean"])
# pivot.columns là MultiIndex — truy cập bằng:
pivot[("sum", 1)]   # Cột "sum" of tháng 1
# ✅ Flatten multiindex
pivot.columns = ["_".join(map(str, col)) for col in pivot.columns]
```

---

## 📖 Kiến Thức 4: Merge và Concat

### ✅ Giải Thích

**Merge** như **phép JOIN trong SQL** — kết hợp hai bảng dựa trên cột khóa chung.

**Concat** như **dán hai tờ giấy** — nối theo hàng (axis=0) hoặc cột (axis=1).

| Loại Join | Kết quả |
|-----------|---------|
| **inner** | Chỉ hàng có khóa chung ở cả hai bảng |
| **left** | Tất cả hàng bảng trái + khớp từ phải (NaN nếu không có) |
| **right** | Ngược lại left |
| **outer** | Hợp — tất cả hàng từ cả hai bảng |

### 📌 Ví Dụ

**Input:** Bảng nhân viên + bảng KPI  
**Output:** Bảng kết hợp thông tin đầy đủ

### 💻 Code

```python
import pandas as pd

nhan_vien = pd.DataFrame({
    "ma_nv":    ["NV01","NV02","NV03","NV04"],
    "ten":      ["An","Bình","Cúc","Dũng"],
    "phong_ban":["KD","KD","IT","KD"],
    "luong_cb": [10, 12, 11, 9],    # triệu
})

kpi = pd.DataFrame({
    "ma_nv":   ["NV01","NV02","NV03","NV05"],   # NV04 không có KPI, NV05 không trong NV
    "diem_kpi":[8.5, 7.0, 9.2, 8.0],
    "xep_hang":[2, 3, 1, 4],
})

# Inner join — chỉ NV01, NV02, NV03 (không có NV04 và NV05)
inner = pd.merge(nhan_vien, kpi, on="ma_nv", how="inner")
print(f"Inner ({len(inner)} hàng):\n{inner}\n")

# Left join — giữ tất cả nhân viên, NV04 có NaN ở diem_kpi
left = pd.merge(nhan_vien, kpi, on="ma_nv", how="left")
print(f"Left ({len(left)} hàng):\n{left}\n")

# Outer join — tất cả, NaN ở chỗ không khớp
outer = pd.merge(nhan_vien, kpi, on="ma_nv", how="outer")
print(f"Outer ({len(outer)} hàng):\n{outer}\n")

# ── Concat ──────────────────────────────────────────────
nv_moi = pd.DataFrame({
    "ma_nv":    ["NV06","NV07"],
    "ten":      ["Oanh","Phúc"],
    "phong_ban":["IT","KD"],
    "luong_cb": [13, 10],
})
tat_ca = pd.concat([nhan_vien, nv_moi], ignore_index=True)
print(f"Sau concat: {len(tat_ca)} nhân viên\n{tat_ca}")
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Khóa join có kiểu dữ liệu khác nhau
df1["id"] = [1, 2, 3]           # int
df2["id"] = ["1", "2", "3"]     # str
pd.merge(df1, df2, on="id")     # Không khớp → 0 hàng!
# ✅ Đồng nhất kiểu
df2["id"] = df2["id"].astype(int)

# ❌ Cột cùng tên nhưng ý nghĩa khác
pd.merge(df1, df2, on="id")
# Cột "ten" bị đổi thành "ten_x", "ten_y"
# ✅ Đổi tên trước hoặc dùng suffixes
pd.merge(df1, df2, on="id", suffixes=("_nv", "_kpi"))
```

---

## 💻 Demo Tổng Hợp: Báo Cáo Doanh Nghiệp Tổng Hợp

```python
import pandas as pd

print("=" * 60)
print("   BÁO CÁO KINH DOANH Q1/2024 — TỔNG HỢP")
print("=" * 60)

# ── Dữ liệu ───────────────────────────────────────────────
don_hang = pd.DataFrame({
    "ma_don":    ["D01","D02","D03","D04","D05","D06","D07","D08","D09","D10"],
    "ma_nv":     ["NV01","NV02","NV01","NV03","NV02","NV01","NV03","NV02","NV03","NV01"],
    "ma_sp":     ["SP01","SP02","SP01","SP03","SP01","SP02","SP02","SP03","SP01","SP03"],
    "thang":     [1, 1, 2, 1, 2, 3, 2, 3, 3, 2],
    "so_luong":  [2, 5, 1, 3, 2, 4, 6, 1, 2, 2],
    "gia_ban":   [10.0, 0.5, 10.0, 2.0, 10.0, 0.5, 0.5, 2.0, 10.0, 2.0],
})

nhan_vien = pd.DataFrame({
    "ma_nv":     ["NV01","NV02","NV03"],
    "ten":       ["Nguyễn An","Trần Bình","Lê Cúc"],
    "phong_ban": ["Kinh doanh","Kinh doanh","Kỹ thuật"],
})

san_pham = pd.DataFrame({
    "ma_sp":   ["SP01","SP02","SP03"],
    "ten_sp":  ["Laptop","Mouse","Keyboard"],
    "danh_muc":["Hardware","Peripheral","Peripheral"],
})

# ── Xử lý ─────────────────────────────────────────────────
don_hang["doanh_thu"] = don_hang["so_luong"] * don_hang["gia_ban"]

# Merge thêm thông tin
df = (don_hang
      .merge(nhan_vien, on="ma_nv", how="left")
      .merge(san_pham,  on="ma_sp", how="left"))

# ── Báo cáo 1: Doanh thu theo nhân viên ──────────────────
print("\n📊 1. Doanh thu theo nhân viên:")
bao_cao_nv = df.groupby(["ma_nv","ten"]).agg(
    tong_dt  = ("doanh_thu","sum"),
    so_don   = ("ma_don","count"),
    tb_don   = ("doanh_thu","mean"),
).round(2).sort_values("tong_dt", ascending=False)
print(bao_cao_nv)

# ── Báo cáo 2: Pivot tháng × nhân viên ───────────────────
print("\n📊 2. Doanh thu theo tháng:")
pivot = pd.pivot_table(df, values="doanh_thu",
                        index="ten", columns="thang",
                        aggfunc="sum", fill_value=0,
                        margins=True, margins_name="Tổng")
print(pivot)

# ── Báo cáo 3: Top sản phẩm ──────────────────────────────
print("\n📊 3. Top sản phẩm:")
top_sp = df.groupby(["ten_sp","danh_muc"]).agg(
    doanh_thu=("doanh_thu","sum"),
    so_don   =("ma_don","count"),
).sort_values("doanh_thu", ascending=False)
print(top_sp)

# ── Báo cáo 4: % đóng góp mỗi giao dịch ─────────────────
df["tong_theo_nv"] = df.groupby("ma_nv")["doanh_thu"].transform("sum")
df["dong_gop_pct"] = (df["doanh_thu"] / df["tong_theo_nv"] * 100).round(1)
print("\n📊 4. % đóng góp từng giao dịch:")
print(df[["ten","ten_sp","thang","doanh_thu","dong_gop_pct"]].to_string(index=False))
```

---

## 📝 Bài Tập Trên Lớp

**🟢 Bài 1 (Dễ):** GroupBy cơ bản  
Cho DataFrame điểm thi: `hoc_vien`, `mon_hoc`, `ki_thi` (1/2), `diem`.  
a) Điểm trung bình mỗi học viên  
b) Điểm thi cao nhất mỗi môn  
c) Số học viên thi mỗi kỳ

**🟡 Bài 2 (Trung Bình):** Pivot + GroupBy  
Dữ liệu bán hàng theo cửa hàng, tháng, sản phẩm.  
a) Tạo pivot: cửa hàng × tháng  
b) Tìm tháng nào mỗi cửa hàng có doanh thu cao nhất  
c) Thêm cột % so với cùng kỳ tháng trước

**🔴 Bài 3 (Nâng Cao):** Merge phức tạp  
3 bảng: `sinh_vien(ma_sv, ten, ma_nganh)`, `nganh(ma_nganh, ten_nganh, khoa)`, `diem(ma_sv, mon, diem_lan1, diem_lan2)`.  
a) Tạo bảng kết hợp đầy đủ  
b) Tính điểm cuối = max(lan1, lan2) cho mỗi sinh viên mỗi môn  
c) Tính GPA từng sinh viên  
d) Bảng pivot: khoa × môn học (GPA trung bình)

---

## 🏠 Bài Tập Về Nhà

**Bài 1:** E-commerce Analysis  
Tải dataset đơn hàng (ví dụ: Brazilian E-Commerce Public Dataset trên Kaggle).  
Đọc 2 file: `orders.csv` và `order_items.csv`.  
Merge, GroupBy và pivot để tìm:  
- Tháng có doanh thu cao nhất  
- Top 5 seller  
- Trung bình số ngày giao hàng theo state

**Bài 2:** Phân tích nhóm học viên  
Cho dataset điểm thi 30 học viên qua 4 buổi.  
- GroupBy `cap_do` (Junior/Senior) → thống kê điểm  
- Transform: thêm cột xếp hạng trong nhóm  
- Filter: chỉ giữ học viên tham gia đủ 4 buổi  
- Pivot: học viên × buổi

---

## 🎯 Tổng Kết

**3 điểm cần nhớ:**
1. **GroupBy → agg()** cho nhiều thống kê cùng lúc; **transform()** khi cần giữ shape gốc
2. **Kiểu join quan trọng**: `left` phổ biến nhất trong báo cáo — giữ toàn bộ bảng chính
3. **Pivot table** = crosstab mạnh, dùng `margins=True` để có tổng hàng/cột

**Buổi tiếp theo (Buổi 4):** Kiểm tra lần 1 — ôn tổng hợp Pandas L1–3 và giải đề thực hành.

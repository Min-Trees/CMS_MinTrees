# 🎯 Buổi 1: Giới Thiệu Data Science & Pandas Cơ Bản

> **Khóa:** CSA | **Buổi:** 1/8 | **Thời lượng:** 90 phút  
> **Cài đặt:** `pip install pandas openpyxl`

---

## 🎯 Mục Tiêu

Sau buổi này học viên có thể:
- ✅ Giải thích Data Science làm gì và vị trí của pandas trong hệ sinh thái Python
- ✅ Tạo **Series** và **DataFrame** từ dict, list, file CSV
- ✅ Dùng `.head()`, `.info()`, `.describe()`, `.shape`, `.dtypes`
- ✅ Truy cập dữ liệu bằng `[]`, `.loc`, `.iloc`
- ✅ Đọc và ghi file CSV/Excel

---

## 🔁 Ôn Bài Cũ (10 phút)

> *(CSB là tiền khóa — buổi 1 CSA không có ôn bài. Thay vào đó kiểm tra nền tảng CSB)*

**Quiz kiểm tra Python cơ bản:**

1. List comprehension — viết biểu thức tạo list bình phương các số từ 1–10
2. Dictionary — cho `d = {"a":1,"b":2,"c":3}`, lọc ra các key có value > 1
3. Class cơ bản — class `NhanVien` với `ten`, `luong` và method `tang_luong(phan_tram)`
4. Mini task: Đọc file text `data.txt` có mỗi dòng là số nguyên, tính tổng

---

## 📖 Kiến Thức 1: Hệ Sinh Thái Data Science Python

### ✅ Giải Thích

Hãy nghĩ đến **một nhà bếp hoàn chỉnh**:
- **NumPy** = dao và thớt (xử lý số nhanh, array)
- **pandas** = bàn bếp và hộp đựng (tổ chức dữ liệu bảng)
- **matplotlib/seaborn** = đĩa bày đẹp (trực quan hóa)
- **scikit-learn** = lò nướng thông minh (machine learning)

Không ai cần hiểu cách lò nướng sản sinh nhiệt để làm bánh ngon — nhưng phải biết dùng bàn bếp trước.

| Thư viện | Dùng để | Ví dụ |
|----------|---------|-------|
| `numpy` | Tính toán ma trận, phép tính nhanh | Tính trung bình 1 triệu điểm số |
| `pandas` | Đọc, lọc, nhóm, thống kê dữ liệu bảng | Phân tích file Excel doanh số |
| `matplotlib` | Vẽ biểu đồ cơ bản | Biểu đồ đường, cột, tròn |
| `seaborn` | Biểu đồ đẹp, phân phối, tương quan | Heatmap, boxplot |
| `scikit-learn` | Huấn luyện mô hình dự đoán | Dự đoán giá nhà, phân loại spam |

### 📌 Ví Dụ

**Input:** File CSV có 10,000 đơn hàng  
**Output:** "Tháng 3 doanh thu cao nhất, sản phẩm A chiếm 40%"

### 💻 Code

```python
# Cài đặt (chạy 1 lần trong terminal)
# pip install pandas numpy matplotlib seaborn scikit-learn openpyxl

import pandas as pd
import numpy as np

# Kiểm tra version
print(f"pandas : {pd.__version__}")
print(f"numpy  : {np.__version__}")
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Lỗi
import pandas  # ModuleNotFoundError: No module named 'pandas'

# ✅ Giải quyết
# Trong terminal: pip install pandas
# Trong Jupyter: !pip install pandas
```

---

## 📖 Kiến Thức 2: pandas Series

### ✅ Giải Thích

**Series** giống **cột trong Excel** — một dải số/chữ kèm tên hàng (index).

Trục ngang của bảng Excel (A, B, C...) = **index** của Series.  
Giá trị trong ô = **values** của Series.

| Khái niệm | Excel | pandas Series |
|-----------|-------|---------------|
| Tên hàng | A2, A3... | index |
| Giá trị | Số/chữ trong ô | values |
| Tên cột | "Doanh thu" | `series.name` |

### 📌 Ví Dụ

**Input:** Nhiệt độ 5 ngày trong tuần  
**Output:** Series với index ngày, tính max/min/mean

### 💻 Code

```python
import pandas as pd

# Tạo Series từ list
nhiet_do = pd.Series(
    [28.5, 30.1, 27.8, 31.0, 29.6],
    index=["T2", "T3", "T4", "T5", "T6"],
    name="Nhiệt độ (°C)"
)
print(nhiet_do)
# T2    28.5
# T3    30.1
# T4    27.8
# T5    31.0
# T6    29.6
# Name: Nhiệt độ (°C), dtype: float64

# Truy cập
print(nhiet_do["T3"])     # 30.1    (theo nhãn)
print(nhiet_do[1])        # 30.1    (theo vị trí)
print(nhiet_do[["T2","T5"]])  # 2 phần tử

# Thống kê
print(f"Trung bình: {nhiet_do.mean():.1f}°C")
print(f"Cao nhất  : {nhiet_do.max()}°C vào {nhiet_do.idxmax()}")

# Lọc
print(nhiet_do[nhiet_do > 30])   # Ngày nóng
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Lấy phần tử ngoài index
s = pd.Series([1, 2, 3])
print(s[3])   # KeyError: 3 (index chỉ có 0,1,2)

# ✅ Dùng .get() hoặc kiểm tra trước
print(s.get(3, "Không có"))
```

---

## 📖 Kiến Thức 3: pandas DataFrame

### ✅ Giải Thích

**DataFrame** = **bảng Excel** trong Python.

Mỗi cột là một Series. Các cột chia sẻ chung index (số thứ tự hàng).

```
           ten    tuoi    luong
0       An       22    8500000
1       Bình     25   12000000   ← Mỗi hàng = 1 bản ghi
2       Cúc      23    9000000
↑ index
```

| Thao tác | Kết quả |
|----------|---------|
| `df['ten']` | Series cột "ten" |
| `df[['ten','tuoi']]` | DataFrame 2 cột |
| `df.loc[0]` | Series hàng 0 |

### 📌 Ví Dụ

**Input:** Dict Python  
**Output:** DataFrame 5 hàng, thống kê lương

### 💻 Code

```python
import pandas as pd

# Tạo từ dict
data = {
    "ten":    ["An", "Bình", "Cúc", "Dũng", "Em"],
    "tuoi":   [22, 25, 23, 28, 21],
    "tp":     ["HCM", "HN", "HCM", "ĐN", "HN"],
    "luong":  [8_500_000, 12_000_000, 9_000_000, 15_000_000, 7_500_000],
}
df = pd.DataFrame(data)

# Xem thông tin
print(df.shape)       # (5, 4)
print(df.dtypes)
print(df.head(3))     # 3 hàng đầu
print(df.describe())  # thống kê số học

# Truy cập cột
print(df["ten"])              # Series
print(df[["ten", "luong"]])   # DataFrame 2 cột

# Truy cập ô cụ thể
print(df.loc[0, "ten"])       # "An"  (theo nhãn)
print(df.iloc[1, 2])          # "HN"  (theo vị trí)

# Thao tác nhanh
print(df["luong"].mean())
print(df.sort_values("luong", ascending=False))
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Dùng .loc với số nguyên khi index là số — dễ nhầm
df.loc[0]   # Lấy hàng có NHÃN index = 0
df.iloc[0]  # Lấy hàng vị trí đầu tiên

# Khi df được filter, index không reset về 0
df_loc = df[df["tuoi"] > 23]
# ❌ Sẽ lỗi hoặc sai nếu dùng df_loc.iloc[0] và df_loc.loc[0]
# ✅ Reset index sau khi filter
df_loc = df[df["tuoi"] > 23].reset_index(drop=True)
```

---

## 📖 Kiến Thức 4: Đọc/Ghi File

### ✅ Giải Thích

Dữ liệu thực tế thường nằm trong **CSV** (txt phân cách bởi dấu phẩy) hoặc **Excel** (`.xlsx`).

pandas có thể đọc hầu hết mọi định dạng dữ liệu:

| Hàm | Định dạng | Ghi chú |
|-----|-----------|---------|
| `pd.read_csv()` | `.csv` | Phổ biến nhất |
| `pd.read_excel()` | `.xlsx, .xls` | Cần `openpyxl` |
| `pd.read_json()` | `.json` | API data |
| `df.to_csv()` | `.csv` | `index=False` |
| `df.to_excel()` | `.xlsx` | `index=False` |

### 📌 Ví Dụ

**Input:** File `nhan_vien.csv`  
**Output:** DataFrame đã đọc, in thông tin

### 💻 Code

```python
import pandas as pd

# Ghi ra file CSV
df.to_csv("nhan_vien.csv", index=False, encoding="utf-8-sig")
# utf-8-sig: Excel đọc được tiếng Việt

# Đọc từ CSV
df2 = pd.read_csv("nhan_vien.csv", encoding="utf-8-sig")
print(df2.info())

# Đọc từ Excel  
# df3 = pd.read_excel("bao_cao.xlsx", sheet_name="Sheet1")

# Đọc CSV có phân cách đặc biệt (tab, semicolon)
# df4 = pd.read_csv("data.tsv", sep="\t")
# df5 = pd.read_csv("data.csv", sep=";")

# Đọc chỉ 1 số cột
df6 = pd.read_csv("nhan_vien.csv",
                  usecols=["ten", "luong"],
                  encoding="utf-8-sig")
print(df6)
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Tiếng Việt bị lỗi mã hóa
df = pd.read_csv("data.csv")   
# UnicodeDecodeError

# ✅ Thêm encoding
df = pd.read_csv("data.csv", encoding="utf-8-sig")
# Hoặc thử: encoding="utf-8", encoding="latin1"

# ❌ Ghi file mà index bị lặp thêm cột số
df.to_csv("out.csv")           # Sẽ có cột 0,1,2...
# ✅ Luôn dùng index=False
df.to_csv("out.csv", index=False)
```

---

## 💻 Demo Tổng Hợp: Phân Tích Dữ Liệu Cửa Hàng

```python
import pandas as pd
import os

print("=" * 50)
print("   PHÂN TÍCH DỮ LIỆU BÁN HÀNG THÁNG 1/2024")
print("=" * 50)

# Giả lập dữ liệu (thực tế đọc từ CSV)
data = {
    "ma_don":   ["DH001","DH002","DH003","DH004","DH005",
                  "DH006","DH007","DH008","DH009","DH010"],
    "san_pham": ["Laptop","Mouse","Keyboard","Laptop","Monitor",
                  "Mouse","Keyboard","Laptop","Mouse","Monitor"],
    "so_luong": [1, 3, 2, 2, 1, 5, 1, 1, 4, 2],
    "don_gia":  [12_000_000, 250_000, 1_800_000, 12_000_000, 5_500_000,
                 250_000, 1_800_000, 12_000_000, 250_000, 5_500_000],
    "khach_hang": ["A","B","C","A","B","D","C","E","B","A"],
}
df = pd.DataFrame(data)
df["thanh_tien"] = df["so_luong"] * df["don_gia"]

print("\n📋 Bảng dữ liệu:")
print(df[["ma_don","san_pham","so_luong","thanh_tien","khach_hang"]].to_string(index=False))

print("\n📊 Thống kê tổng quan:")
print(f"  Tổng đơn hàng  : {len(df)}")
print(f"  Tổng doanh thu : {df['thanh_tien'].sum():>15,.0f}đ")
print(f"  Đơn hàng TB    : {df['thanh_tien'].mean():>15,.0f}đ")
print(f"  Đơn lớn nhất   : {df['thanh_tien'].max():>15,.0f}đ")

print("\n🏆 Doanh thu theo sản phẩm:")
theo_sp = df.groupby("san_pham")["thanh_tien"].sum().sort_values(ascending=False)
for sp, dt in theo_sp.items():
    phan_tram = dt / df["thanh_tien"].sum() * 100
    print(f"  {sp:<12}: {dt:>15,.0f}đ  ({phan_tram:.1f}%)")

print("\n👤 Top khách hàng:")
theo_kh = df.groupby("khach_hang")["thanh_tien"].sum().sort_values(ascending=False)
for i, (kh, dt) in enumerate(theo_kh.items(), 1):
    print(f"  #{i} Khách {kh}: {dt:,.0f}đ")

# Ghi báo cáo
df.to_csv("bao_cao_thang1.csv", index=False, encoding="utf-8-sig")
print("\n✅ Đã lưu báo cáo: bao_cao_thang1.csv")
os.remove("bao_cao_thang1.csv")
```

---

## 📝 Bài Tập Trên Lớp

**🟢 Bài 1 (Dễ):** Tạo DataFrame  
Tạo DataFrame chứa thông tin 6 học viên: `ten`, `gioi_tinh`, `diem_python`, `diem_toan`.  
In ra: tổng số học viên, điểm Python cao nhất, học viên nào đạt điểm cao nhất.

**🟡 Bài 2 (Trung Bình):** Phân tích CSV  
Tạo file CSV sau rồi đọc vào pandas:
```
ten,doanh_thu_q1,doanh_thu_q2,doanh_thu_q3,doanh_thu_q4
An,150,180,210,190
Bình,120,140,160,200
Cúc,200,220,195,240
```
a) Thêm cột `tong_nam` = tổng 4 quý  
b) Thêm cột `quy_manh_nhat` = tên quý có doanh thu cao nhất  
c) Sắp xếp và in bảng xếp hạng

**🔴 Bài 3 (Nâng Cao):** Data exploration  
Tải dataset `tips` từ seaborn (hoặc dùng file CSV cung cấp):
```python
import seaborn as sns
df = sns.load_dataset("tips")
```
a) In 5 dòng đầu, shape, dtypes  
b) Thống kê: tổng tiền bill, % tiền tip TB so với bill  
c) So sánh tiền tip trung bình theo ngày (day) và theo bữa ăn (time)  
d) Tìm hóa đơn lớn nhất và nhỏ nhất

---

## 🏠 Bài Tập Về Nhà

**Bài 1:** Tạo DataFrame từ CSV thực tế  
Tải dataset miễn phí từ Kaggle hoặc dùng file CSV của dữ liệu thực tế bạn quan tâm (dân số, thời tiết, bóng đá...).  
- Đọc vào pandas, in `.info()` và `.describe()`
- Xác định cột nào là số học, cột nào là danh mục
- Viết 3 nhận xét về dataset dựa trên thống kê

**Bài 2:** Series time series  
Tạo Series nhiệt độ Hà Nội 12 tháng (tự điền số):  
- Tháng lạnh nhất, tháng nóng nhất  
- Nhiệt độ TB mùa hè (T6–T8) vs mùa đông (T12–T2)  
- Plot biểu đồ đường (dùng `series.plot()` hoặc `matplotlib`)

---

## 🎯 Tổng Kết

**3 điểm cần nhớ:**
1. **DataFrame = Excel trong Python** — hàng × cột, mỗi cột là Series
2. **`.loc[]` theo nhãn, `.iloc[]` theo vị trí số** — đừng nhầm lẫn
3. **Luôn dùng `encoding="utf-8-sig"` khi đọc/ghi file tiếng Việt**

**Buổi tiếp theo (Buổi 2):** Lọc dữ liệu với `loc`, `boolean mask`, xử lý giá trị thiếu `NaN`, thêm/xóa/đổi tên cột.

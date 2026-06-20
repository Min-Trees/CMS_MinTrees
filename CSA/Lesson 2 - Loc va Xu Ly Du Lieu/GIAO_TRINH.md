# 🎯 Buổi 2: Lọc và Xử Lý Dữ Liệu với Pandas

> **Khóa:** CSA | **Buổi:** 2/8 | **Thời lượng:** 90 phút

---

## 🎯 Mục Tiêu

Sau buổi này học viên có thể:
- ✅ Chọn hàng/cột bằng `[]`, `.loc[]`, `.iloc[]` một cách chính xác
- ✅ Lọc dữ liệu theo một hoặc nhiều điều kiện với boolean mask
- ✅ Phát hiện, điền và xóa giá trị thiếu (`NaN`)
- ✅ Thêm, xóa, đổi tên cột; tạo cột tính toán
- ✅ Sắp xếp DataFrame theo một hoặc nhiều cột

---

## 🔁 Ôn Bài Cũ (10 phút)

1. Sự khác nhau giữa `Series` và `DataFrame` là gì?
2. Khi nào dùng `df["cot"]` so với `df[["cot1","cot2"]]`?
3. `df.describe()` cho biết những thông tin gì?
4. **Mini task:** Cho `df` có cột `luong`, viết lệnh: in lương lớn nhất và tên người có lương đó.

---

## 📖 Kiến Thức 1: Truy Xuất Dữ Liệu — loc vs iloc

### ✅ Giải Thích

Tưởng tượng DataFrame là **tòa nhà văn phòng**:
- **`.loc[]`** = Tìm theo **tên phòng** ("Phòng Marketing", "Tầng 3")
- **`.iloc[]`** = Tìm theo **số thứ tự** ("Phòng thứ 2", "Tầng thứ 1")

Khi bạn filter DataFrame, cách đánh số hàng (`index`) không tự reset — nên `.iloc[0]` và `.loc[0]` có thể trỏ đến hàng khác nhau!

| Cú pháp | Nghĩa |
|---------|-------|
| `df.loc[2, "ten"]` | Hàng có label index=2, cột "ten" |
| `df.iloc[2, 0]` | Hàng thứ 3 (0-based), cột thứ 1 |
| `df.loc[1:3, ["a","b"]]` | Hàng 1 đến 3 (gồm 3), cột a và b |
| `df.iloc[1:3, 0:2]` | Hàng 1,2 (không gồm 3), cột 0,1 |

### 📌 Ví Dụ

**Input:** DataFrame nhân viên 5 hàng  
**Output:** Truy cập hàng/cột cụ thể

### 💻 Code

```python
import pandas as pd

df = pd.DataFrame({
    "ten":   ["An","Bình","Cúc","Dũng","Em"],
    "tuoi":  [22, 25, 23, 28, 21],
    "luong": [8.5, 12.0, 9.0, 15.0, 7.5],
}, index=[10, 20, 30, 40, 50])  # index không phải 0,1,2!

# loc — dùng nhãn index (10, 20, 30...)
print(df.loc[10])              # Hàng có index=10
print(df.loc[20, "ten"])       # "Bình"
print(df.loc[10:30, ["ten","luong"]])  # 3 hàng

# iloc — dùng vị trí (0, 1, 2...)
print(df.iloc[0])              # Hàng đầu tiên (index=10)
print(df.iloc[1, 0])           # Hàng thứ 2, cột thứ 1 → "Bình"
print(df.iloc[0:3])            # 3 hàng đầu (không gồm iloc[3])

# Sau khi filter, reset_index nếu dùng iloc
df_loc = df[df["tuoi"] > 22].reset_index(drop=True)
print(df_loc.iloc[0])  # Giờ mới là hàng đầu tiên của kết quả filter
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Slice loc vs iloc khác nhau!
df.loc[10:30]   # Gồm cả hàng 30 (inclusive)
df.iloc[0:3]    # Không gồm hàng iloc[3] (exclusive)

# ❌ Nhầm lẫn khi index sau reset bằng từ filter
df2 = df[df["tuoi"] > 22]  # Index vẫn là 20, 30, 40
df2.iloc[0]    # OK — hàng đầu tiên của df2
df2.loc[0]     # KeyError — không có nhãn index=0!
```

---

## 📖 Kiến Thức 2: Lọc Dữ Liệu — Boolean Mask

### ✅ Giải Thích

**Boolean mask** như **bộ lọc sàng** — mỗi hàng được gắn nhãn `True`/`False`, chỉ những hàng `True` mới qua lưới.

Điều kiện phức hợp:
- `&` = VÀ (cả hai điều kiện đều phải đúng)
- `|` = HOẶC (ít nhất một điều kiện đúng)
- `~` = KHÔNG (đảo ngược)

⚠️ Trong pandas KHÔNG dùng `and`/`or`/`not` — phải dùng `&`/`|`/`~` và bọc ngoặc!

### 📌 Ví Dụ

**Input:** DataFrame nhân viên  
**Output:** Lọc nhân viên đủ điều kiện

### 💻 Code

```python
import pandas as pd

df = pd.DataFrame({
    "ten":     ["An","Bình","Cúc","Dũng","Em","Phú"],
    "tuoi":    [22, 25, 23, 28, 21, 30],
    "tp":      ["HCM","HN","HCM","ĐN","HN","HCM"],
    "luong":   [8.5, 12.0, 9.0, 15.0, 7.5, 11.0],
    "ky_nang": ["Python","SQL","Python","ML","SQL","Python"],
})

# Một điều kiện
print("Lương ≥ 10:")
print(df[df["luong"] >= 10][["ten","luong"]])

# Nhiều điều kiện — PHẢI dùng () ngoặc mỗi điều kiện!
print("\nHCM VÀ Python:")
mask = (df["tp"] == "HCM") & (df["ky_nang"] == "Python")
print(df[mask][["ten","tp","ky_nang"]])

print("\nHN HOẶC lương > 11:")
print(df[(df["tp"] == "HN") | (df["luong"] > 11)][["ten","tp","luong"]])

print("\nKHÔNG ở HN:")
print(df[~(df["tp"] == "HN")][["ten","tp"]])

# isin — thuộc danh sách
print("\nTP HCM hoặc HN:")
print(df[df["tp"].isin(["HCM","HN"])][["ten","tp"]])

# between — khoảng giá trị
print("\nTuổi 22-25:")
print(df[df["tuoi"].between(22, 25)][["ten","tuoi"]])

# str.contains — tìm chuỗi
# (nếu cột là string)
print("\nisin ngược (không phải Python):")
print(df[~df["ky_nang"].isin(["Python"])][["ten","ky_nang"]])
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Dùng and thay vì &
mask = df["tuoi"] > 22 and df["luong"] > 10  # ValueError!
# ✅
mask = (df["tuoi"] > 22) & (df["luong"] > 10)

# ❌ Quên ngoặc
mask = df["tuoi"] > 22 & df["luong"] > 10
# Python tính & trước > → sai logic!
# ✅
mask = (df["tuoi"] > 22) & (df["luong"] > 10)
```

---

## 📖 Kiến Thức 3: Xử Lý Giá Trị Thiếu (NaN)

### ✅ Giải Thích

**NaN** (Not a Number) là "ô trống" trong pandas — xuất hiện khi dữ liệu bị thiếu, lỗi nhập, hoặc không áp dụng.

Như **chỗ trống trong profile mạng xã hội** — bạn phải quyết định: điền thông tin mặc định hay bỏ luôn cả hàng đó?

| Tình huống | Xử lý |
|-----------|-------|
| Cột số — ít NaN | Điền bằng median hoặc mean |
| Cột danh mục | Điền bằng giá trị phổ biến nhất (mode) |
| Nhiều NaN trong một hàng | Xóa hàng đó |
| Cột có >50% NaN | Bỏ luôn cột đó |

### 📌 Ví Dụ

**Input:** DataFrame có nhiều giá trị NaN  
**Output:** DataFrame đã xử lý, không còn NaN

### 💻 Code

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    "ten":    ["An","Bình","Cúc","Dũng","Em"],
    "tuoi":   [22, None, 23, 28, None],
    "luong":  [8.5, 12.0, None, 15.0, 7.5],
    "diem":   [8.5, 7.0, 9.2, None, None],
})
print("Trước khi xử lý:")
print(df)
print("\nSố NaN mỗi cột:")
print(df.isna().sum())
print(f"% NaN: {df.isna().sum() / len(df) * 100}")

# Kiểm tra từng hàng có NaN không
print("\nHàng có ít nhất 1 NaN:")
print(df[df.isna().any(axis=1)])

# Điền NaN cho cột số
df["tuoi"]  = df["tuoi"].fillna(df["tuoi"].median())
df["luong"] = df["luong"].fillna(df["luong"].mean().round(2))
df["diem"]  = df["diem"].fillna(df["diem"].median())

print("\nSau khi fill NaN:")
print(df)
print("NaN còn lại:", df.isna().sum().sum())

# Cách khác: xóa hàng có NaN
df_sach = df.dropna()          # Xóa hàng có bất kỳ NaN
df_sach2 = df.dropna(subset=["diem"])  # Chỉ xóa khi "diem" là NaN
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ So sánh với NaN bằng ==
df[df["tuoi"] == None]   # Không bao giờ tìm được NaN!
df[df["tuoi"] == np.nan] # Cũng sai

# ✅ Dùng isna() hoặc isnull()
df[df["tuoi"].isna()]
df[df["tuoi"].notna()]

# ❌ fillna không inplace
df["tuoi"].fillna(0)  # Không thay đổi df!
# ✅
df["tuoi"] = df["tuoi"].fillna(0)
# Hoặc:
df.fillna({"tuoi": 0, "luong": df["luong"].mean()}, inplace=True)
```

---

## 📖 Kiến Thức 4: Thao Tác Cột

### ✅ Giải Thích

Cột trong DataFrame như **trường dữ liệu trong database** — bạn có thể thêm, sửa, xóa, đổi tên bất cứ lúc nào.

Cột tính toán (computed column) rất mạnh — như Excel tự động tính khi thêm dữ liệu.

### 📌 Ví Dụ

**Input:** DataFrame với `luong` và `kinh_nghiem_nam`  
**Output:** DataFrame với các cột được bổ sung và chỉnh sửa

### 💻 Code

```python
import pandas as pd

df = pd.DataFrame({
    "ten":    ["An","Bình","Cúc","Dũng"],
    "luong":  [8.5, 12.0, 9.0, 15.0],   # triệu
    "kn":     [1, 3, 2, 5],              # năm kinh nghiệm
    "tp":     ["HCM","HN","HCM","ĐN"],
})

# Thêm cột tính toán
df["luong_hieu_chinh"] = df["luong"] * (1 + df["kn"] * 0.05)

# Thêm cột danh mục dựa trên điều kiện
df["cap_bac"] = "Junior"
df.loc[df["kn"] >= 3, "cap_bac"] = "Senior"
df.loc[df["kn"] >= 5, "cap_bac"] = "Lead"

# pd.cut — phân nhóm theo khoảng
df["nhom_luong"] = pd.cut(
    df["luong"],
    bins=[0, 9, 12, float("inf")],
    labels=["Thấp","Trung bình","Cao"]
)

print(df)

# Đổi tên cột
df = df.rename(columns={"kn": "kinh_nghiem", "tp": "thanh_pho"})

# Xóa cột
df = df.drop(columns=["luong_hieu_chinh"])

# Sắp xếp nhiều cột
df_sorted = df.sort_values(
    ["cap_bac", "luong"],
    ascending=[True, False]
)
print(df_sorted[["ten","luong","kinh_nghiem","cap_bac"]].to_string(index=False))
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ SettingWithCopyWarning khi sửa cột trên slice
df_hcm = df[df["tp"] == "HCM"]
df_hcm["luong"] = 99   # Cảnh báo! Có thể không thay đổi df gốc

# ✅ Dùng .copy() khi muốn làm việc với subset độc lập
df_hcm = df[df["tp"] == "HCM"].copy()
df_hcm["luong"] = 99   # OK

# ✅ Hoặc dùng .loc] để sửa trực tiếp df gốc
df.loc[df["tp"] == "HCM", "luong"] = 99
```

---

## 💻 Demo Tổng Hợp: Làm Sạch Dataset Thực Tế

```python
import pandas as pd
import numpy as np

print("=" * 55)
print("   DATA CLEANING — Dataset Đơn Hàng Thực Tế")
print("=" * 55)

# Giả lập dataset "bẩn" (dữ liệu thực thường có vấn đề)
raw_data = {
    "ma_don":   ["DH001","DH002","DH003","DH004","DH005","DH006","DH007"],
    "khach":    ["Nguyễn An","Trần Bình",None,"Lê Cúc","Phạm Dũng","Hoàng Em","Nguyễn An"],
    "sp":       ["Laptop","Mouse","Keyboard",None,"Laptop","Monitor","Mouse"],
    "so_luong": [1, -3, 2, 1, 2, 1, 0],    # có giá trị âm và bằng 0!
    "gia":      [12.0, 0.25, 1.8, 5.5, None, 5.5, 0.25],   # triệu
    "ngay":     ["2024-01-05","2024-01-07","2024-01-07",
                  "2024-01-08","2024-13-01","2024-01-09","2024-01-10"],
}
df = pd.DataFrame(raw_data)

print("\n📋 Dataset gốc (có lỗi):")
print(df.to_string())

# ── Bước 1: Phát hiện vấn đề ──────────────────────────────
print("\n🔍 Phát hiện vấn đề:")
print(f"  Tổng hàng  : {len(df)}")
print(f"  NaN mỗi cột:\n{df.isna().sum()}")
print(f"  Số lượng ≤ 0: {len(df[df['so_luong'] <= 0])}")

# ── Bước 2: Xóa hàng không thể phục hồi ──────────────────
# Xóa hàng thiếu tên hoặc thiếu sản phẩm
df = df.dropna(subset=["khach", "sp"])
print(f"\n  Sau dropna(khach/sp): {len(df)} hàng")

# Xóa đơn hàng số lượng ≤ 0 (dữ liệu vô nghĩa)
df = df[df["so_luong"] > 0]
print(f"  Sau lọc số lượng > 0: {len(df)} hàng")

# ── Bước 3: Điền giá trị NaN hợp lý ──────────────────────
df["gia"] = df["gia"].fillna(df["gia"].median())

# ── Bước 4: Kiểm tra ngày hợp lệ ─────────────────────────
df["ngay"] = pd.to_datetime(df["ngay"], errors="coerce")
# errors="coerce" — ngày sai format → NaN
print(f"  Ngày không hợp lệ: {df['ngay'].isna().sum()}")
df = df.dropna(subset=["ngay"])

# ── Bước 5: Tính cột mới ──────────────────────────────────
df["thanh_tien"] = df["so_luong"] * df["gia"]
df = df.reset_index(drop=True)

# ── Kết quả ───────────────────────────────────────────────
print(f"\n✅ Dataset sạch ({len(df)} hàng):")
print(df.to_string())

print(f"\n📊 Thống kê:")
print(f"  Tổng doanh thu: {df['thanh_tien'].sum():.2f} triệu")
print(f"  TB đơn hàng   : {df['thanh_tien'].mean():.2f} triệu")
print(f"\n  Doanh thu theo khách:")
print(df.groupby("khach")["thanh_tien"].sum().sort_values(ascending=False))
```

---

## 📝 Bài Tập Trên Lớp

**🟢 Bài 1 (Dễ):** Lọc tìm kiếm  
Cho DataFrame học viên có cột: `ten`, `diem_ly_thuyet`, `diem_thuc_hanh`, `lop`.  
Lọc ra học viên:  
a) Điểm lý thuyết ≥ 8 VÀ thực hành ≥ 7  
b) Lớp "Thứ 2" HOẶC "Thứ 4"  
c) Tính điểm tổng kết = 40%*LT + 60%*TH, thêm vào cột mới

**🟡 Bài 2 (Trung Bình):** Xử lý dữ liệu thiếu  
```python
data = {
  "ten": ["A","B","C","D","E","F"],
  "chieu_cao": [165, None, 172, 158, None, 180],   # cm
  "can_nang":  [55, 70, None, 48, 65, None],        # kg
  "gioi_tinh": ["Nam","Nữ","Nam","Nữ","Nam","Nữ"],
}
```
a) Điền NaN chiều cao bằng median **theo giới tính**  
b) Điền NaN cân nặng bằng median **theo giới tính**  
c) Tính BMI = can_nang / (chieu_cao/100)²  
d) Phân loại BMI: <18.5=Thiếu cân, 18.5-25=Bình thường, >25=Thừa cân

**🔴 Bài 3 (Nâng Cao):** Multi-condition Filtering  
Tải dataset `titanic` từ seaborn: `sns.load_dataset("titanic")`  
a) Tìm hành khách: Phụ nữ, hạng 1, còn sống  
b) Điền NaN cột `age` theo median của từng class  
c) Tạo cột `gia_nhom`: Trẻ em (<12), Thanh niên (12-30), Trung niên (30-60), Cao tuổi (>60)  
d) Tính tỷ lệ sống sót theo `gia_nhom`

---

## 🏠 Bài Tập Về Nhà

**Bài 1:** Làm sạch dataset thực tế  
Lấy một file CSV bất kỳ từ internet (Kaggle, data.gov.vn...).  
- Kiểm tra NaN, tỷ lệ NaN từng cột  
- Viết kế hoạch xử lý: cột nào fill, cột nào drop  
- Thực thi kế hoạch và xuất file `cleaned.csv`

**Bài 2:** Phân tích hành vi user  
```python
# Dữ liệu lượt xem web
views = {
  "user": ["A","A","B","B","B","C","A","C"],
  "trang": ["Home","Product","Home","Cart","Checkout","Home","Product","Cart"],
  "thoi_gian_giay": [30, 180, 25, 120, 300, 45, 200, 90],
  "thiet_bi": ["Mobile","Desktop","Mobile","Mobile","Mobile","Desktop","Desktop","Desktop"],
}
```
a) Lọc user B trên thiết bị Mobile  
b) Tính tổng thời gian mỗi user đã xem  
c) Trang nào được xem nhiều nhất?  
d) User nào có khả năng mua hàng nhất (vào trang Checkout)?

---

## 🎯 Tổng Kết

**3 điểm cần nhớ:**
1. **`.loc[]` dùng nhãn, `.iloc[]` dùng số** — khi filter xong, nhớ `.reset_index(drop=True)` nếu dùng `.iloc`
2. **Boolean mask phải có `()` và dùng `&`/`|`/`~`** — không dùng `and`/`or`/`not`
3. **NaN không bắt được bằng `==`** — luôn dùng `.isna()` hoặc `.notna()`

**Buổi tiếp theo (Buổi 3):** GroupBy, Aggregation, Pivot Table và merge bảng — công cụ phân tích mạnh nhất trong pandas.

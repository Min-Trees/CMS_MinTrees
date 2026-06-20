# 🎯 Buổi 6: Machine Learning Cơ Bản — Hồi Quy Tuyến Tính

> **Khóa:** CSA | **Buổi:** 6/8 | **Thời lượng:** 90 phút  
> **Cài đặt:** `pip install scikit-learn`

---

## 🎯 Mục Tiêu

Sau buổi này học viên có thể:
- ✅ Giải thích Machine Learning là gì và pipeline cơ bản
- ✅ Chia dữ liệu thành tập Train/Test với `train_test_split`
- ✅ Xây dựng và huấn luyện `LinearRegression`
- ✅ Đánh giá mô hình: MAE, RMSE, R²
- ✅ Áp dụng Polynomial Regression cho dữ liệu phi tuyến

---

## 🔁 Ôn Bài Cũ (10 phút)

1. Sự khác nhau giữa `scatter plot` và `line chart` — khi nào dùng cái nào?
2. Heatmap correlation có ý nghĩa gì? Giá trị +0.8 và -0.8 nghĩa là gì?
3. Seaborn `hue` dùng để làm gì?
4. **Mini task:** Vẽ scatter plot `gio_hoc` vs `diem_thi`, màu theo `lop`.

---

## 📖 Kiến Thức 1: Machine Learning Pipeline

### ✅ Giải Thích

**Machine Learning** như **dạy trẻ em nhận biết mèo** — bạn cho xem hàng nghìn ảnh (training), nó tự học quy tắc, rồi nhận ra mèo trong ảnh mới (prediction).

```
Pipeline ML Chuẩn:
  Dữ liệu thô
    ↓ Thu thập & Làm sạch (buổi 2)
  Dữ liệu sạch
    ↓ Khám phá (EDA — buổi 1,3,5)
  Hiểu dữ liệu
    ↓ Chọn features (feature engineering)
  X (features) và y (target)
    ↓ train_test_split
  X_train, y_train | X_test, y_test
    ↓ model.fit(X_train, y_train)
  Mô hình đã huấn luyện
    ↓ model.predict(X_test)
  y_pred
    ↓ Đánh giá (MAE, R²...)
  Kết quả
```

| Loại bài toán | Ví dụ | Thuật toán |
|---------------|-------|------------|
| **Regression** | Dự đoán giá nhà, lương | LinearRegression, Ridge |
| **Classification** | Spam/Not spam, churn | LogisticReg, RF, KNN |
| **Clustering** | Nhóm khách hàng | KMeans, DBSCAN |

### 💻 Code

```python
# Scikit-learn API nhất quán:
# model = AlgorithmName(hyperparams)
# model.fit(X_train, y_train)
# y_pred = model.predict(X_test)
# score  = model.score(X_test, y_test)

from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)    # Huấn luyện
y_pred = model.predict(X_test) # Dự đoán
```

---

## 📖 Kiến Thức 2: Train/Test Split và Overfitting

### ✅ Giải Thích

**Train/Test split** như **thi thử vs thi thật**:
- Học (train) với 80% dữ liệu
- Đánh giá (test) với 20% dữ liệu chưa thấy

**Overfitting** = học thuộc lòng không hiểu bản chất — điểm train cao nhưng test thấp.  
**Underfitting** = mô hình quá đơn giản — cả train lẫn test đều thấp.

### 💻 Code

```python
from sklearn.model_selection import train_test_split

X = df[["gio_hoc", "kinh_nghiem"]]   # Features — ma trận
y = df["luong"]                       # Target — vector

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size    = 0.2,    # 20% cho test
    random_state = 42,     # Seed để tái lập
    shuffle      = True,   # Xáo trộn trước khi chia
)
print(f"Train: {X_train.shape}, Test: {X_test.shape}")
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Data leakage — dùng thông tin test vào quá trình huấn luyện
scaler.fit(X)  # Fit trên toàn bộ X — SAIIIIII
X_train_s = scaler.transform(X_train)
X_test_s  = scaler.transform(X_test)

# ✅ Chỉ fit scaler trên X_train
scaler.fit(X_train)
X_train_s = scaler.transform(X_train)
X_test_s  = scaler.transform(X_test)   # Chỉ transform, không fit
```

---

## 📖 Kiến Thức 3: Linear Regression và Các Chỉ Số Đánh Giá

### ✅ Giải Thích

**Linear Regression** tìm đường thẳng tốt nhất qua các điểm dữ liệu:

$$y = a \cdot x + b$$

Trong đó:
- $a$ = `model.coef_` — độ dốc (tăng 1 đơn vị x thì y tăng bao nhiêu)
- $b$ = `model.intercept_` — giá trị y khi x = 0

**Chỉ số đánh giá:**

| Chỉ số | Công thức | Tốt khi |
|--------|-----------|---------|
| **MAE** | $\frac{1}{n}\sum|y_i - \hat{y}_i|$ | Nhỏ |
| **RMSE** | $\sqrt{\frac{1}{n}\sum(y_i-\hat{y}_i)^2}$ | Nhỏ |
| **R²** | $1 - \frac{SS_{res}}{SS_{tot}}$ | Gần 1.0 |

**R²** đọc là "R squared" — % phương sai được mô hình giải thích.  
R²=0.85 nghĩa là mô hình giải thích được 85% sự biến động của y.

### 💻 Code

```python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

print(f"Hệ số a (slope)    : {model.coef_}")
print(f"Hệ số b (intercept): {model.intercept_:.2f}")

mae  = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2   = r2_score(y_test, y_pred)

print(f"MAE  : {mae:.2f}")
print(f"RMSE : {rmse:.2f}")
print(f"R²   : {r2:.3f}")
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ X là 1D array
X = df["gio_hoc"].values          # Shape: (n,)
model.fit(X, y)                   # ValueError!
# ✅ X phải là 2D
X = df[["gio_hoc"]].values        # Shape: (n, 1)
X = df["gio_hoc"].values.reshape(-1, 1)   # Cũng OK
```

---

## 📖 Kiến Thức 4: Feature Engineering & Polynomial Regression

### ✅ Giải Thích

Không phải mọi quan hệ đều tuyến tính. Ví dụ: lương tăng nhanh với ít kinh nghiệm, chậm lại khi nhiều.

**Polynomial Regression** thêm các cột $x^2, x^3, ...$ để mô phỏng đường cong.

**Feature Engineering** = tạo feature mới từ feature có sẵn để cải thiện mô hình.

### 💻 Code

```python
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import Pipeline

# Polynomial degree 2
poly_pipeline = Pipeline([
    ("poly",      PolynomialFeatures(degree=2, include_bias=False)),
    ("regressor", LinearRegression()),
])
poly_pipeline.fit(X_train, y_train)
y_pred_poly = poly_pipeline.predict(X_test)
print(f"R² Polynomial (deg=2): {r2_score(y_test, y_pred_poly):.3f}")

# Feature Engineering ví dụ
df["gio_hoc_squared"]    = df["gio_hoc"] ** 2
df["kn_x_trinh_do"]      = df["kinh_nghiem"] * df["trinh_do"]  # tương tác
df["log_kinh_nghiem"]    = np.log1p(df["kinh_nghiem"])          # log transform
```

---

## 💻 Demo Tổng Hợp: Dự Đoán Giá Nhà

```python
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, r2_score
import os

np.random.seed(7)
n = 200

# Tạo dataset giá nhà
df = pd.DataFrame({
    "dien_tich":     np.random.uniform(40, 200, n),
    "so_phong":      np.random.randint(1, 6, n),
    "khoang_cach":   np.random.uniform(1, 30, n),  # km từ trung tâm
    "tang":          np.random.randint(1, 25, n),
})
df["gia"] = (
    df["dien_tich"] * 35
    + df["so_phong"] * 200
    - df["khoang_cach"] * 150
    + df["tang"] * 20
    + np.random.normal(0, 500, n)
) / 1000   # tỷ đồng

print("Dataset giá nhà:")
print(df.describe().round(2))

# Feature engineering
df["dt_per_phong"]   = df["dien_tich"] / df["so_phong"]
df["xa_trung_tam"]   = (df["khoang_cach"] > 15).astype(int)

# Chia train/test
features = ["dien_tich","so_phong","khoang_cach","tang","dt_per_phong","xa_trung_tam"]
X = df[features]; y = df["gia"]
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)

# Chuẩn hóa features
scaler = StandardScaler()
X_tr_s = scaler.fit_transform(X_tr)     # fit + transform train
X_te_s = scaler.transform(X_te)         # chỉ transform test

# So sánh 2 mô hình
results = {}
for name, model in [("Linear Regression", LinearRegression()),
                     ("Ridge Regression",  Ridge(alpha=1.0))]:
    model.fit(X_tr_s, y_tr)
    y_pred = model.predict(X_te_s)
    results[name] = {"MAE": mean_absolute_error(y_te, y_pred),
                     "R2":  r2_score(y_te, y_pred)}

print("\nSo sánh mô hình:")
print(f"{'Model':<25} {'MAE (tỷ)':<12} R²")
print("-" * 45)
for name, m in results.items():
    print(f"{name:<25} {m['MAE']:>8.3f}     {m['R2']:.3f}")

# Vẽ so sánh actual vs predicted
best_model = LinearRegression()
best_model.fit(X_tr_s, y_tr)
y_pred_best = best_model.predict(X_te_s)

fig, ax = plt.subplots(figsize=(6, 5))
ax.scatter(y_te, y_pred_best, alpha=0.5, color="steelblue")
lim = [y.min(), y.max()]
ax.plot(lim, lim, "r--", linewidth=2)
ax.set_xlabel("Giá Thực Tế (tỷ)")
ax.set_ylabel("Giá Dự Đoán (tỷ)")
ax.set_title(f"Actual vs Predicted — R²={results['Linear Regression']['R2']:.3f}")
plt.tight_layout()
os.makedirs("charts", exist_ok=True)
plt.savefig("charts/house_predict.png", dpi=100)
plt.close()
print("\n✓ Biểu đồ → charts/house_predict.png")

import shutil; shutil.rmtree("charts")
print("✅ Demo hoàn tất!")
```

---

## 📝 Bài Tập Trên Lớp

**🟢 Bài 1 (Dễ):** Regression đơn giản  
Cho dataset: `gio_choi_game` (giờ/ngày) và `diem_hoc` (0–10).  
a) Tạo tập dữ liệu (tự tạo hoặc dùng `numpy.random`)  
b) Vẽ scatter plot — bạn thấy quan hệ gì?  
c) Huấn luyện LinearRegression, in R² và MAE

**🟡 Bài 2 (Trung Bình):** Multiple Regression  
Dataset: `luong_trieu` phụ thuộc vào `kn_nam`, `trinh_do` (0/1/2), `chung_chi` (0–3).  
a) Tạo dữ liệu 150 mẫu  
b) Vẽ pairplot hoặc heatmap correlation  
c) Huấn luyện, đánh giá, in hệ số từng feature  
d) Dự đoán: KN=5, Đại học, 2 chứng chỉ → lương bao nhiêu?

**🔴 Bài 3 (Nâng Cao):** Feature Engineering + So sánh mô hình  
Tải `california_housing` từ sklearn:  
```python
from sklearn.datasets import fetch_california_housing
data = fetch_california_housing(as_frame=True)
df   = data.frame
```  
a) EDA: describe, heatmap correlation  
b) Chọn top 3 feature tương quan nhất với `MedHouseVal`  
c) Thêm feature mới: `phong_per_ho` = `AveRooms / AveOccup`  
d) So sánh: Linear vs Polynomial Reg (deg=2) — cái nào R² cao hơn?

---

## 🏠 Bài Tập Về Nhà

**Bài 1:** Dự đoán điểm thi  
Thu thập hoặc tạo dataset: 50 học viên, features: `gio_hoc`, `so_bai_tap_nop`, `diem_giua_ky`.  
Target: `diem_cuoi_ky`.  
- Train Linear Regression  
- In R², MAE trên test set  
- Vẽ actual vs predicted

**Bài 2:** Đọc thêm và trả lời  
Đọc tài liệu scikit-learn về `Ridge` và `Lasso`:  
- Hai mô hình này khác LinearRegression ở điểm gì?  
- Khi nào dùng Ridge thay vì LinearRegression?  
- Thử Ridge với `alpha=0.1, 1.0, 10.0` — alpha ảnh hưởng R² như thế nào?

---

## 🎯 Tổng Kết

**3 điểm cần nhớ:**
1. **Luôn chia train/test trước** — không bao giờ fit model trên toàn bộ data
2. **Fit scaler chỉ trên X_train** — tránh data leakage từ test set
3. **R² ≥ 0.8 là tốt** cho dữ liệu thực tế; R² < 0.5 nên xem lại features

**Buổi tiếp theo (Buổi 7):** Classification — phân loại với KNN, Decision Tree, Random Forest; đánh giá với Confusion Matrix.

"""
CSA - Buổi 6: Machine Learning cơ bản - Hồi Quy Tuyến Tính
============================================================
Cài trước: pip install scikit-learn matplotlib
"""

import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import os

print("=" * 55)
print("   CSA Buổi 6 — Hồi Quy Tuyến Tính")
print("=" * 55)

os.makedirs("charts", exist_ok=True)
np.random.seed(42)

# ──────────────────────────────────────────────────────────
# 1. BÀI TOÁN: DỰ ĐOÁN LƯƠNG THEO KINH NGHIỆM
# ──────────────────────────────────────────────────────────
print("\n── 1. Dự đoán lương theo kinh nghiệm ──")
n = 80
kn = np.random.uniform(0, 10, n)
luong = 10 + kn * 2.5 + np.random.normal(0, 2, n)   # triệu

df = pd.DataFrame({"kinh_nghiem": kn, "luong": luong})

# Chia train/test: 80/20
X = df[["kinh_nghiem"]]
y = df["luong"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"  Train: {len(X_train)} mẫu | Test: {len(X_test)} mẫu")

# Huấn luyện mô hình
model = LinearRegression()
model.fit(X_train, y_train)
print(f"  Hệ số a (slope)    : {model.coef_[0]:.3f}")
print(f"  Hệ số b (intercept): {model.intercept_:.3f}")
print(f"  Phương trình: Lương = {model.coef_[0]:.2f} × KN + {model.intercept_:.2f} triệu")

# Dự đoán và đánh giá
y_pred = model.predict(X_test)
mae  = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2   = r2_score(y_test, y_pred)
print(f"\n  ── Kết quả trên Test set ──")
print(f"  MAE  (Sai số TB tuyệt đối): {mae:.2f} triệu")
print(f"  RMSE (Căn sai số bình phương TB): {rmse:.2f} triệu")
print(f"  R²   (Hệ số xác định): {r2:.3f}")

# Dự đoán cho người mới tuyển
mau_moi = [[3.5], [7.0], [1.0]]
for km in mau_moi:
    pred = model.predict(km)[0]
    print(f"  KN {km[0]} năm → Lương ước tính: {pred:.1f} triệu")

# ──────────────────────────────────────────────────────────
# 2. MULTIPLE LINEAR REGRESSION
# ──────────────────────────────────────────────────────────
print("\n── 2. Multiple Regression — nhiều biến ──")
n = 100
kn2 = np.random.uniform(0, 10, n)
cap_bang = np.random.choice([0, 1, 2], n)    # 0=CĐ, 1=ĐH, 2=ThS
chung_chi = np.random.randint(0, 5, n)
luong2 = 8 + kn2*2.5 + cap_bang*3 + chung_chi*0.8 + np.random.normal(0, 1.5, n)

df2 = pd.DataFrame({
    "kinh_nghiem": kn2, "cap_bang": cap_bang,
    "chung_chi": chung_chi, "luong": luong2
})
X2     = df2[["kinh_nghiem","cap_bang","chung_chi"]]
y2     = df2["luong"]
X2_train, X2_test, y2_train, y2_test = train_test_split(X2, y2, test_size=0.2, random_state=1)

model2 = LinearRegression()
model2.fit(X2_train, y2_train)
y2_pred = model2.predict(X2_test)
print(f"  R² (Multiple): {r2_score(y2_test, y2_pred):.3f}")
print(f"  Hệ số: KN={model2.coef_[0]:.2f}, Bằng={model2.coef_[1]:.2f}, CC={model2.coef_[2]:.2f}")

# ──────────────────────────────────────────────────────────
# 3. POLYNOMIAL REGRESSION
# ──────────────────────────────────────────────────────────
print("\n── 3. Polynomial Regression ──")
x3 = np.linspace(0, 10, 60)
y3 = 2 + 0.5*x3 - 0.05*x3**2 + np.random.normal(0, 0.5, 60)  # Phi tuyến

X3 = x3.reshape(-1, 1)
X3_train, X3_test, y3_train, y3_test = train_test_split(X3, y3, test_size=0.25, random_state=0)

for deg in [1, 2, 3]:
    poly = PolynomialFeatures(degree=deg)
    X3p_train = poly.fit_transform(X3_train)
    X3p_test  = poly.transform(X3_test)
    m = LinearRegression().fit(X3p_train, y3_train)
    r2_val = r2_score(y3_test, m.predict(X3p_test))
    print(f"  Degree {deg}: R² = {r2_val:.3f}")

# ──────────────────────────────────────────────────────────
# 4. VẼ BIỂU ĐỒ
# ──────────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Plot 1: Scatter + regression line
axes[0].scatter(X_test, y_test, label="Dữ liệu thực", alpha=0.6)
x_range = np.linspace(0, 10, 100).reshape(-1, 1)
axes[0].plot(x_range, model.predict(x_range), "r-", linewidth=2, label="Đường hồi quy")
axes[0].set_title(f"Lương vs Kinh Nghiệm (R²={r2:.3f})")
axes[0].set_xlabel("Năm kinh nghiệm"); axes[0].set_ylabel("Lương (triệu)")
axes[0].legend()

# Plot 2: Actual vs Predicted
all_pred = model.predict(X)
axes[1].scatter(y, all_pred, alpha=0.5)
axes[1].plot([y.min(), y.max()], [y.min(), y.max()], "r--", linewidth=2)
axes[1].set_title("Actual vs Predicted")
axes[1].set_xlabel("Thực tế"); axes[1].set_ylabel("Dự đoán")

plt.suptitle("Linear Regression — CSA Buổi 6", fontweight="bold")
plt.tight_layout()
plt.savefig("charts/regression.png", dpi=100)
plt.close()
print("\n✓ Biểu đồ → charts/regression.png")
print("✅ Demo hoàn tất!")

# 🎯 Buổi 7: Phân Loại với Machine Learning

> **Khóa:** CSA | **Buổi:** 7/8 | **Thời lượng:** 90 phút

---

## 🎯 Mục Tiêu

Sau buổi này học viên có thể:
- ✅ Phân biệt Regression và Classification
- ✅ Xây dựng mô hình KNN, Decision Tree, Random Forest
- ✅ Đánh giá bằng Accuracy, Confusion Matrix, Precision/Recall/F1
- ✅ Mã hóa dữ liệu phân loại: Label Encoding, One-Hot Encoding
- ✅ Chọn mô hình phù hợp dựa trên trade-off

---

## 🔁 Ôn Bài Cũ (10 phút)

1. R² là gì? R²=0.75 có nghĩa là gì?
2. Tại sao phải fit scaler chỉ trên X_train?
3. MAE và RMSE khác nhau như thế nào?
4. **Mini task:** Huấn luyện LinearRegression với dataset: `gio_hoc` → `diem`. In R² và dự đoán cho gio_hoc=30.

---

## 📖 Kiến Thức 1: Regression vs Classification

### ✅ Giải Thích

| | Regression | Classification |
|-|------------|----------------|
| **Output** | Số thực (giá, lương) | Nhãn/lớp (Pass/Fail, spam/ham) |
| **Ví dụ** | Dự đoán giá nhà = 3.2 tỷ | Con email này có phải spam không? |
| **Đánh giá** | MAE, RMSE, R² | Accuracy, F1, Confusion Matrix |

**Binary Classification**: 2 lớp (0/1, True/False)  
**Multi-class**: 3+ lớp (Giỏi/Khá/TB/Yếu)

### 💻 Code

```python
# Tất cả sklearn Classifiers đều như nhau về API
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)           # y là nhãn lớp: 0, 1, "pass"...
y_pred = model.predict(X_test)        # Trả về nhãn
y_prob = model.predict_proba(X_test)  # Trả về xác suất mỗi lớp
```

---

## 📖 Kiến Thức 2: Các Thuật Toán Classification

### ✅ Giải Thích

**K-Nearest Neighbors (KNN):**  
Phân loại điểm mới dựa trên k điểm gần nhất — "Nói cho tôi biết bạn bè bạn là ai, tôi sẽ biết bạn là ai."

**Decision Tree:**  
Cây quyết định — hỏi từng câu hỏi yes/no để phân loại, như bác sĩ chẩn bệnh.

**Random Forest:**  
Tổng hợp nhiều Decision Tree — "Bình chọn của đám đông ít sai hơn 1 người."

| Thuật toán | Ưu | Nhược | Hyperparams quan trọng |
|-----------|-----|-------|------------------------|
| KNN | Đơn giản, dễ hiểu | Chậm với dữ liệu lớn | `n_neighbors=k` |
| Decision Tree | Giải thích được | Dễ overfit | `max_depth` |
| Random Forest | Mạnh, ổn định | Khó giải thích | `n_estimators` |

### 💻 Code

```python
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

# KNN — cần chuẩn hóa features!
scaler = StandardScaler()
X_tr_s = scaler.fit_transform(X_tr)
X_te_s = scaler.transform(X_te)
knn = KNeighborsClassifier(n_neighbors=7)
knn.fit(X_tr_s, y_tr)
print(f"KNN Accuracy: {accuracy_score(y_te, knn.predict(X_te_s)):.3f}")

# Decision Tree — không cần chuẩn hóa
dt = DecisionTreeClassifier(max_depth=5, min_samples_leaf=3, random_state=0)
dt.fit(X_tr, y_tr)
print(f"DT  Accuracy: {accuracy_score(y_te, dt.predict(X_te)):.3f}")

# Random Forest
rf = RandomForestClassifier(n_estimators=200, max_depth=10, random_state=0)
rf.fit(X_tr, y_tr)
print(f"RF  Accuracy: {accuracy_score(y_te, rf.predict(X_te)):.3f}")

# Feature importance (chỉ có ở RF và DT)
import pandas as pd
fi = pd.Series(rf.feature_importances_, index=X.columns).sort_values(ascending=False)
print("\nFeature Importance:")
print(fi)
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Dùng KNN mà không chuẩn hóa features
# Feature có giá trị lớn (gio_hoc=40) sẽ áp đảo feature nhỏ (bai_tap=3)
knn.fit(X_tr, y_tr)   # Kết quả sẽ bị bias!
# ✅ Luôn scale trước KNN
X_tr_s = StandardScaler().fit_transform(X_tr)
knn.fit(X_tr_s, y_tr)

# ❌ Decision Tree không giới hạn depth
dt = DecisionTreeClassifier()   # Overfit nghiêm trọng
dt.fit(X_tr, y_tr)
print(dt.score(X_tr, y_tr))  # 100%  ← Overfit
print(dt.score(X_te, y_te))  # 70%   ← Thật sự thế này
# ✅ Giới hạn max_depth
dt = DecisionTreeClassifier(max_depth=5)
```

---

## 📖 Kiến Thức 3: Đánh Giá Mô Hình Classification

### ✅ Giải Thích

**Accuracy** = tỷ lệ dự đoán đúng — đủ dùng khi dữ liệu cân bằng.

Khi dữ liệu **mất cân bằng** (imbalanced) — ví dụ 95% học viên pass, 5% fail — model có thể đoán "Pass" hết vẫn đạt accuracy 95%!  
→ Dùng **Precision**, **Recall**, **F1-score**.

| Chỉ số | Công thức | Ý nghĩa |
|--------|-----------|---------|
| **Precision** | TP / (TP+FP) | Trong số dự đoán là 1, bao nhiêu thực sự là 1 |
| **Recall** | TP / (TP+FN) | Trong số thực là 1, bao nhiêu được phát hiện |
| **F1-score** | 2×P×R / (P+R) | Cân bằng Precision và Recall |

**Confusion Matrix:**
```
                    Thực tế
              Negative    Positive
Dự đoán  Neg |  TN    |    FN  |
         Pos |  FP    |    TP  |
```

### 💻 Code

```python
from sklearn.metrics import (accuracy_score, confusion_matrix,
                              classification_report, ConfusionMatrixDisplay)
import matplotlib.pyplot as plt

y_pred = model.predict(X_te)

# Accuracy
print(f"Accuracy: {accuracy_score(y_te, y_pred):.3f}")

# Classification report
print(classification_report(y_te, y_pred, target_names=["Fail","Pass"]))

# Confusion matrix — vẽ
cm   = confusion_matrix(y_te, y_pred)
disp = ConfusionMatrixDisplay(cm, display_labels=["Fail","Pass"])
fig, ax = plt.subplots(figsize=(4, 3))
disp.plot(ax=ax, colorbar=False, cmap="Blues")
ax.set_title("Confusion Matrix")
plt.tight_layout()
plt.savefig("confusion.png")
plt.close()

# predict_proba — xác suất mỗi lớp
probs = model.predict_proba(X_te)
print("Xác suất [Fail, Pass]:")
print(probs[:5].round(2))
```

---

## 📖 Kiến Thức 4: Mã Hóa Dữ Liệu Phân Loại

### ✅ Giải Thích

ML models yêu cầu **đầu vào là số** — không nhận "HCM", "HN", "Male", "Female".

| Kỹ thuật | Khi nào dùng | Ví dụ |
|----------|-------------|-------|
| **Label Encoding** | Thứ tự có ý nghĩa | Nhỏ→Vừa→Lớn → 0,1,2 |
| **One-Hot Encoding** | Danh mục không có thứ tự | HCM→[1,0,0], HN→[0,1,0] |
| **Ordinal Encoding** | Thứ tự tùy chỉnh | Yếu=1, TB=2, Khá=3, Giỏi=4 |

### 💻 Code

```python
import pandas as pd
from sklearn.preprocessing import LabelEncoder

df = pd.DataFrame({
    "tp":        ["HCM","HN","ĐN","HCM","HN"],
    "cap_bac":   ["Junior","Senior","Lead","Junior","Lead"],
    "gioi_tinh": ["Nam","Nữ","Nam","Nữ","Nam"],
})

# Label Encoding — chỉ dùng cho cột có thứ tự
le = LabelEncoder()
df["cap_bac_enc"] = le.fit_transform(df["cap_bac"])

# One-Hot Encoding — cho nominal categories (pandas tự làm)
df_encoded = pd.get_dummies(df, columns=["tp","gioi_tinh"], drop_first=True)
print(df_encoded)
#    cap_bac  cap_bac_enc  tp_HN  tp_ĐN  gioi_tinh_Nữ
# 0   Junior  1            False  False  False
# ...

# Sklearn OneHotEncoder  (khi fit/transform riêng train/test)
from sklearn.preprocessing import OneHotEncoder
enc = OneHotEncoder(sparse_output=False, handle_unknown="ignore")
enc.fit(X_train[["tp"]])
X_train_oh = enc.transform(X_train[["tp"]])
X_test_oh  = enc.transform(X_test[["tp"]])
```

---

## 💻 Demo Tổng Hợp: Phân Loại Khách Hàng Churn

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, ConfusionMatrixDisplay
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import os

np.random.seed(5)
n = 300

# ── Dataset: dự đoán khách hàng có rời dịch vụ không (Churn) ──
df = pd.DataFrame({
    "so_thang_su_dung":  np.random.randint(1, 48, n),
    "cuoc_phi_thang":    np.random.uniform(200_000, 2_000_000, n),
    "so_cuoc_go1":       np.random.randint(0, 30, n),
    "so_cuoc_go2":       np.random.randint(0, 20, n),
    "goi_cuoc":          np.random.choice(["Basic","Standard","Premium"], n),
    "da_khieu_nai":      np.random.choice([0, 1], n, p=[0.7, 0.3]),
})
# Label churn: khách khiếu nại nhiều, dùng ít, gói Basic → dễ churn
prob_churn = (
    (1 - df["so_thang_su_dung"] / 48) * 0.4
    + df["da_khieu_nai"] * 0.3
    + (df["goi_cuoc"] == "Basic").astype(int) * 0.2
    + df["so_cuoc_go1"] / 30 * 0.1
)
df["churn"] = (prob_churn + np.random.uniform(-0.2, 0.2, n) > 0.45).astype(int)

print("Dataset Churn:")
print(f"  Churn: {df['churn'].sum()} ({df['churn'].mean():.0%})")
print(f"  Không Churn: {(df['churn']==0).sum()}")

# Mã hóa & chuẩn bị
df_enc = pd.get_dummies(df, columns=["goi_cuoc"], drop_first=False)
feat = [c for c in df_enc.columns if c != "churn"]
X = df_enc[feat]; y = df_enc["churn"]
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=1,
                                            stratify=y)   # Giữ tỷ lệ

# Huấn luyện
rf = RandomForestClassifier(n_estimators=150, max_depth=8,
                             class_weight="balanced", random_state=1)
rf.fit(X_tr, y_tr)
y_pred = rf.predict(X_te)

print("\nKết quả:")
print(classification_report(y_te, y_pred, target_names=["Không churn","Churn"]))

# Feature importance
fi = pd.Series(rf.feature_importances_, index=feat).sort_values(ascending=False)
print("Feature Importance (Top 5):")
print(fi.head(5))

# Vẽ Confusion Matrix + Feature Importance
fig, axes = plt.subplots(1, 2, figsize=(10, 4))
ConfusionMatrixDisplay(rf.score.__class__.__mro__,
                       display_labels=["Không","Churn"])
from sklearn.metrics import ConfusionMatrixDisplay, confusion_matrix
cm = confusion_matrix(y_te, y_pred)
ConfusionMatrixDisplay(cm, display_labels=["Không Churn","Churn"]).plot(
    ax=axes[0], colorbar=False, cmap="Blues")
axes[0].set_title("Confusion Matrix")

fi.head(8).plot(kind="barh", ax=axes[1])
axes[1].set_title("Feature Importance")
axes[1].invert_yaxis()

plt.suptitle("Customer Churn Classification", fontweight="bold")
plt.tight_layout()
os.makedirs("charts", exist_ok=True)
plt.savefig("charts/churn_model.png", dpi=100)
plt.close()
print("\n✓ Biểu đồ → charts/churn_model.png")

# Dự đoán khách mới
print("\nDự đoán khách mới:")
kh_moi = pd.DataFrame({
    "so_thang_su_dung": [2, 36],
    "cuoc_phi_thang":   [250_000, 1_500_000],
    "so_cuoc_go1":      [25, 2],
    "so_cuoc_go2":      [15, 1],
    "da_khieu_nai":     [1, 0],
    "goi_cuoc_Basic":   [1, 0],
    "goi_cuoc_Premium": [0, 1],
    "goi_cuoc_Standard":[0, 0],
})
for col in feat:
    if col not in kh_moi.columns:
        kh_moi[col] = 0
kh_moi = kh_moi[feat]
preds = rf.predict(kh_moi)
probs = rf.predict_proba(kh_moi)
for i in range(len(kh_moi)):
    risk = "⚠️ CÓ THỂ CHURN" if preds[i] else "✅ Ổn định"
    print(f"  Khách {i+1}: {risk} (xác suất churn: {probs[i][1]:.0%})")

import shutil; shutil.rmtree("charts")
print("\n✅ Demo hoàn tất!")

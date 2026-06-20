# 🎯 Buổi 8: Project Cuối Khóa & Thi Cuối Kỳ CSA

> **Khóa:** CSA | **Buổi:** 8/8 | **Thời lượng:** 90 phút  
> **Hình thức:** Project thực hành + Thi

---

## 🎯 Mục Tiêu Cuối Khóa

- ✅ Vận dụng toàn bộ pipeline Data Science: Thu thập → Làm sạch → EDA → Model → Đánh giá
- ✅ Trình bày kết quả phân tích bằng biểu đồ rõ ràng
- ✅ Chọn mô hình phù hợp và giải thích kết quả cho người không chuyên

---

## 🔁 Ôn Tập Tổng Hợp (15 phút)

**Sơ đồ kiến thức CSA:**

```
  pandas
    ├── Series, DataFrame, read_csv, to_csv
    ├── loc/iloc, boolean mask, isin, between
    ├── fillna, dropna, astype
    ├── groupby().agg(), transform(), filter()
    ├── merge (inner/left/right/outer)
    └── pivot_table

  Visualization
    ├── matplotlib: line, bar, scatter, hist
    └── seaborn: boxplot, histplot, heatmap, pairplot

  Machine Learning
    ├── train_test_split, StandardScaler
    ├── Regression: LinearRegression, Ridge, Polynomial
    ├── Classification: KNN, DecisionTree, RandomForest
    └── Metrics: MAE/R², Accuracy/F1/Confusion Matrix
```

---

## 📝 Đề Thi Cuối Kỳ (75 phút — 10 điểm)

### Tạo dữ liệu thi

```python
import pandas as pd, numpy as np, os
np.random.seed(2024)
n=200
df = pd.DataFrame({
    "id":        range(1, n+1),
    "tuoi":      np.random.randint(18, 60, n),
    "gioi_tinh": np.random.choice(["Nam","Nữ"], n),
    "hoc_van":   np.random.choice(["THPT","CĐ","ĐH","ThS"], n),
    "kinh_nghiem": np.random.uniform(0, 20, n).round(1),
    "luong":     np.nan_to_num(np.where(
        np.random.rand(n)<0.12, np.nan,
        np.random.uniform(7, 35, n).round(2))),
    "thanh_pho": np.random.choice(["HCM","HN","ĐN","CT"], n, p=[0.4,0.35,0.15,0.1]),
    "nghanh":    np.random.choice(["Kỹ thuật","Kinh tế","Y tế","Khác"], n),
    "goi_con":   np.random.randint(0, 4, n),
    "hai_long":  np.random.choice([0,1], n, p=[0.35, 0.65]),  # target
})
# Làm NaN ngẫu nhiên
df.loc[np.random.choice(n, 10, replace=False), "kinh_nghiem"] = np.nan
df.loc[np.random.choice(n, 8,  replace=False), "tuoi"] = np.nan
df.to_csv("nhan_su.csv", index=False, encoding="utf-8-sig")
print("✓ Đã tạo nhan_su.csv")
```

---

### Câu 1 (1.5 điểm): Làm Sạch và Khám Phá

a) Đọc `nhan_su.csv`, in shape, dtypes, tỷ lệ NaN từng cột  
b) Điền NaN: `luong` bằng median theo `thanh_pho` + `hoc_van`; `tuoi` và `kinh_nghiem` bằng median toàn bộ  
c) Thêm cột `nhom_tuoi`: Trẻ (<30), Trung niên (30-45), Cao tuổi (>45)  
d) In thống kê: lương TB theo nhóm tuổi và giới tính

---

### Câu 2 (2 điểm): Phân Tích và Trực Quan Hóa

a) *(0.5đ)* Tạo pivot table: `hoc_van` × `thanh_pho` → lương TB. In và nhận xét  
b) *(0.5đ)* Vẽ boxplot: phân phối lương theo `hoc_van`, có `hue=gioi_tinh`  
c) *(0.5đ)* Heatmap correlation của các cột số  
d) *(0.5đ)* Bar chart: tỷ lệ hài lòng (%) theo `nghanh`, sorted giảm dần

---

### Câu 3 (3 điểm): Machine Learning — Dự Đoán Lương

a) *(1đ)* Feature engineering:  
   - Mã hóa `gioi_tinh`, `hoc_van`, `thanh_pho`, `nghanh` bằng One-Hot  
   - Chuẩn bị X (tất cả features trừ `hai_long`, `id`) và y = `luong`

b) *(1đ)* Huấn luyện và so sánh **2 mô hình** regression:  
   - LinearRegression và Ridge (alpha=1.0)  
   - Chuẩn hóa features trước khi train  
   - In MAE và R² cho cả 2

c) *(1đ)* Vẽ "Actual vs Predicted" cho mô hình tốt hơn.  
   Nhận xét: Mô hình hoạt động tốt với khoảng lương nào? Tệ ở đâu?

---

### Câu 4 (3.5 điểm): Machine Learning — Dự Đoán Hài Lòng

a) *(1đ)* Chuẩn bị dữ liệu cho bài toán Classification:  
   - X = tất cả features trừ `hai_long` và `id`  
   - y = `hai_long` (0/1)  
   - Chia train/test, chuẩn hóa

b) *(1.5đ)* Huấn luyện và so sánh **3 mô hình**:  
   - KNN (k=9), Decision Tree (max_depth=6), Random Forest (n_estimators=150)  
   - In Accuracy, F1-score (class=1) cho cả 3  
   - Confusion Matrix cho mô hình tốt nhất

c) *(1đ)* Feature Importance: vẽ biểu đồ cột ngang, nhận xét:  
   - Yếu tố nào quan trọng nhất/nhì ảnh hưởng đến sự hài lòng?

---

## 📋 Đáp Án Tham Khảo

```python
import pandas as pd, numpy as np
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt, seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (mean_absolute_error, r2_score,
                              accuracy_score, classification_report,
                              confusion_matrix, ConfusionMatrixDisplay)

# ── C1 ─────────────────────────────────────────────────────
df = pd.read_csv("nhan_su.csv", encoding="utf-8-sig")
print(df.shape, "\n", df.isna().sum())

df["luong"] = df.groupby(["thanh_pho","hoc_van"])["luong"].transform(
    lambda x: x.fillna(x.median()))
df["luong"] = df["luong"].fillna(df["luong"].median())
df["tuoi"]         = df["tuoi"].fillna(df["tuoi"].median())
df["kinh_nghiem"]  = df["kinh_nghiem"].fillna(df["kinh_nghiem"].median())

df["nhom_tuoi"] = pd.cut(df["tuoi"], bins=[0,30,45,99],
                          labels=["Trẻ","Trung niên","Cao tuổi"])
print(df.groupby(["nhom_tuoi","gioi_tinh"])["luong"].mean().unstack().round(2))

# ── C2 ─────────────────────────────────────────────────────
pivot = pd.pivot_table(df, values="luong", index="hoc_van",
                        columns="thanh_pho", aggfunc="mean",
                        fill_value=0, margins=True).round(2)
print(pivot)

fig, axes = plt.subplots(2, 2, figsize=(14, 10))
sns.boxplot(data=df, x="hoc_van", y="luong", hue="gioi_tinh", ax=axes[0,0])
axes[0,0].set_title("Lương theo Học Vấn")

num_cols = df[["tuoi","kinh_nghiem","luong","goi_con"]].corr()
sns.heatmap(num_cols, annot=True, fmt=".2f", cmap="coolwarm", ax=axes[0,1])
axes[0,1].set_title("Correlation Matrix")

ty_le = df.groupby("nghanh")["hai_long"].mean().sort_values(ascending=False)
axes[1,0].bar(ty_le.index, ty_le.values * 100)
axes[1,0].set_title("Tỷ lệ Hài Lòng theo Ngành")
axes[1,0].set_ylabel("%")

plt.tight_layout(); plt.savefig("eda.png", dpi=100); plt.close()

# ── C3 ─────────────────────────────────────────────────────
df_enc = pd.get_dummies(df, columns=["gioi_tinh","hoc_van","thanh_pho","nghanh","nhom_tuoi"])
feat_r = [c for c in df_enc.columns if c not in ["id","luong","hai_long"]]
X_r = df_enc[feat_r]; y_r = df_enc["luong"]
X_rtr, X_rte, y_rtr, y_rte = train_test_split(X_r, y_r, test_size=0.2, random_state=0)
sc = StandardScaler()
X_rtr_s = sc.fit_transform(X_rtr); X_rte_s = sc.transform(X_rte)

for name, m in [("Linear", LinearRegression()), ("Ridge", Ridge(1.0))]:
    m.fit(X_rtr_s, y_rtr); pred = m.predict(X_rte_s)
    print(f"{name}: MAE={mean_absolute_error(y_rte,pred):.2f}  R²={r2_score(y_rte,pred):.3f}")

# ── C4 ─────────────────────────────────────────────────────
feat_c = [c for c in df_enc.columns if c not in ["id","hai_long"]]
X_c = df_enc[feat_c]; y_c = df_enc["hai_long"]
X_ctr, X_cte, y_ctr, y_cte = train_test_split(X_c, y_c, test_size=0.25, random_state=1, stratify=y_c)
sc2 = StandardScaler(); X_ctr_s = sc2.fit_transform(X_ctr); X_cte_s = sc2.transform(X_cte)

models_c = {"KNN(9)": KNeighborsClassifier(9), "DT(6)": DecisionTreeClassifier(max_depth=6),
             "RF(150)": RandomForestClassifier(150, random_state=1)}
best_f1 = 0; best_cm = None; best_model = None
for nm, m in models_c.items():
    Xf = X_ctr_s if "KNN" in nm else X_ctr
    Xp = X_cte_s if "KNN" in nm else X_cte
    m.fit(Xf, y_ctr); yp = m.predict(Xp)
    rep = __import__("sklearn.metrics", fromlist=["classification_report"]).classification_report(y_cte,yp,output_dict=True)
    f1 = rep["1"]["f1-score"]; acc = accuracy_score(y_cte,yp)
    print(f"{nm}: Acc={acc:.3f} F1(1)={f1:.3f}")
    if f1 > best_f1: best_f1=f1; best_cm=yp; best_model=m

print(classification_report(y_cte, best_cm, target_names=["Không hài lòng","Hài lòng"]))

rf_model = models_c["RF(150)"]
fi = pd.Series(rf_model.feature_importances_, index=feat_c).sort_values(ascending=False).head(10)
fig, ax = plt.subplots(figsize=(8, 4))
fi.sort_values().plot(kind="barh", ax=ax)
ax.set_title("Top 10 Feature Importance")
plt.tight_layout(); plt.savefig("fi.png", dpi=100); plt.close()

import os
for f in ["nhan_su.csv","eda.png","fi.png"]:
    if os.path.exists(f): os.remove(f)
print("✅ Done!")
```

---

## 🎯 Bảng Điểm Hoàn Thành Khóa CSA

| Ngưỡng | Chứng Chỉ |
|--------|-----------|
| ≥ 8.5 | Xuất Sắc + Thư Giới Thiệu |
| ≥ 7.0 | Hoàn Thành Tốt |
| ≥ 5.0 | Hoàn Thành |
| < 5.0 | Không Đạt — Được Thi Lại |

## 🚀 Tiếp Theo

**Khóa CSI (AI/Deep Learning)** — yêu cầu CSA ≥ 7.0:
- Neural Networks với TensorFlow/Keras
- Computer Vision: CNN, Image Classification
- NLP: Text Processing, Hugging Face Transformers
- Deployment: Streamlit app, API endpoints

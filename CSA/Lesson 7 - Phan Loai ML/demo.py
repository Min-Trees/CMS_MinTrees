"""
CSA - Buổi 7: Phân Loại với Machine Learning
==============================================
Cài trước: pip install scikit-learn matplotlib seaborn
"""

import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (accuracy_score, confusion_matrix,
                              classification_report, ConfusionMatrixDisplay)
import os

print("=" * 55)
print("   CSA Buổi 7 — Classification")
print("=" * 55)

os.makedirs("charts", exist_ok=True)
np.random.seed(42)

# ──────────────────────────────────────────────────────────
# 1. DATASET: Dự đoán học viên có pass không
# ──────────────────────────────────────────────────────────
n = 200
df = pd.DataFrame({
    "gio_hoc":    np.random.uniform(0, 50, n),
    "bai_tap":    np.random.randint(0, 10, n),
    "diem_gk":    np.random.uniform(2, 10, n),
    "diem_ph":    np.random.uniform(3, 10, n),
})
df["pass"] = ((df["gio_hoc"] * 0.3 +
               df["bai_tap"] * 0.5 +
               df["diem_gk"] * 0.4 +
               df["diem_ph"] * 0.5
               + np.random.normal(0, 2, n)) > 12).astype(int)

print(f"\nDataset: {n} học viên")
print(f"Pass: {df['pass'].sum()} | Fail: {(df['pass']==0).sum()}")
print(df.describe().round(2))

# ──────────────────────────────────────────────────────────
# 2. CHUẨN BỊ DỮ LIỆU
# ──────────────────────────────────────────────────────────
features = ["gio_hoc","bai_tap","diem_gk","diem_ph"]
X = df[features]; y = df["pass"]
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)

scaler     = StandardScaler()
X_tr_s     = scaler.fit_transform(X_tr)
X_te_s     = scaler.transform(X_te)

# ──────────────────────────────────────────────────────────
# 3. HUẤN LUYỆN 3 MÔ HÌNH
# ──────────────────────────────────────────────────────────
models = {
    "KNN (k=5)":           KNeighborsClassifier(n_neighbors=5),
    "Decision Tree":       DecisionTreeClassifier(max_depth=5, random_state=42),
    "Random Forest (100)": RandomForestClassifier(n_estimators=100, random_state=42),
}
print("\n── So sánh mô hình ──")
print(f"{'Model':<25} {'Accuracy':<12} {'Recall(1)':<12} {'F1(1)'}")
print("-" * 60)

best_acc   = 0
best_model = None
best_name  = ""

for name, model in models.items():
    X_fit = X_tr_s if "KNN" in name else X_tr
    X_pred = X_te_s if "KNN" in name else X_te
    model.fit(X_fit, y_tr)
    y_pred = model.predict(X_pred)
    acc  = accuracy_score(y_te, y_pred)
    rep  = classification_report(y_te, y_pred, output_dict=True)
    rec1 = rep["1"]["recall"]
    f1_1 = rep["1"]["f1-score"]
    print(f"  {name:<23} {acc:.3f}        {rec1:.3f}        {f1_1:.3f}")
    if acc > best_acc:
        best_acc = acc; best_model = model; best_name = name

# ──────────────────────────────────────────────────────────
# 4. CONFUSION MATRIX VÀ PHÂN TÍCH CHI TIẾT
# ──────────────────────────────────────────────────────────
print(f"\n── Chi tiết: {best_name} ──")
Xf = X_te_s if "KNN" in best_name else X_te
y_pred_best = best_model.predict(Xf)
print(classification_report(y_te, y_pred_best, target_names=["Fail","Pass"]))

fig, axes = plt.subplots(1, 2, figsize=(10, 4))
# Confusion Matrix
cm = confusion_matrix(y_te, y_pred_best)
disp = ConfusionMatrixDisplay(cm, display_labels=["Fail","Pass"])
disp.plot(ax=axes[0], colorbar=False)
axes[0].set_title(f"Confusion Matrix — {best_name}")

# Feature Importance (nếu Random Forest)
rf = models["Random Forest (100)"]
importances = pd.Series(rf.feature_importances_, index=features).sort_values(ascending=True)
axes[1].barh(importances.index, importances.values)
axes[1].set_title("Feature Importance (Random Forest)")
axes[1].set_xlabel("Importance")

plt.tight_layout()
plt.savefig("charts/classification.png", dpi=100)
plt.close()
print("\n✓ Biểu đồ → charts/classification.png")

# ──────────────────────────────────────────────────────────
# 5. KNN — ảnh hưởng của k
# ──────────────────────────────────────────────────────────
print("\n── Ảnh hưởng của k trong KNN ──")
ks = [1, 3, 5, 7, 11, 15, 21]
for k in ks:
    knn = KNeighborsClassifier(n_neighbors=k)
    knn.fit(X_tr_s, y_tr)
    acc = accuracy_score(y_te, knn.predict(X_te_s))
    bar = "█" * int(acc * 30)
    print(f"  k={k:>2}: {bar} {acc:.3f}")

# ──────────────────────────────────────────────────────────
# 6. DỰ ĐOÁN HỌC VIÊN MỚI
# ──────────────────────────────────────────────────────────
print("\n── Dự đoán học viên mới ──")
rf = models["Random Forest (100)"]
mau_moi = pd.DataFrame({
    "gio_hoc":  [5,  35, 20],
    "bai_tap":  [2,  9,  6],
    "diem_gk":  [4,  8,  7],
    "diem_ph":  [5,  9,  6.5],
})
y_new  = rf.predict(mau_moi)
y_prob = rf.predict_proba(mau_moi)
for i, row in mau_moi.iterrows():
    ket = "PASS ✅" if y_new[i] == 1 else "FAIL ❌"
    conf = max(y_prob[i])
    print(f"  HV{i+1}: GH={row['gio_hoc']}h BT={row['bai_tap']} GK={row['diem_gk']} PH={row['diem_ph']} → {ket} (độ tin: {conf:.0%})")

import shutil; shutil.rmtree("charts")
print("\n✅ Demo hoàn tất!")

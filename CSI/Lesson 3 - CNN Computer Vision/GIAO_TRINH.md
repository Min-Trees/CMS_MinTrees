# 🎯 Buổi 3: CNN — Computer Vision

> **Khóa:** CSI | **Buổi:** 3/14 | **Thời lượng:** 90 phút  
> **Cài đặt:** `pip install tensorflow`

---

## 🎯 Mục Tiêu

Sau buổi này học viên có thể:
- ✅ Giải thích tại sao Dense không hiệu quả với ảnh
- ✅ Mô tả Conv2D, MaxPooling, Dropout hoạt động như thế nào
- ✅ Xây dựng CNN chuẩn với Keras (Conv blocks + Dense head)
- ✅ Áp dụng Data Augmentation tránh overfit với dataset nhỏ
- ✅ Phân loại ảnh CIFAR-10 (10 loại vật thể)

---

## 🔁 Ôn Bài Cũ (10 phút)

1. `EarlyStopping(patience=5, restore_best_weights=True)` có nghĩa gì?
2. `sparse_categorical_crossentropy` vs `categorical_crossentropy` — khác ở chỗ nào?
3. Dropout hoạt động thế nào trong training? Khác gì lúc inference?
4. **Mini task:** Viết 5 dòng: định nghĩa model 3 lớp Dense → compile → fit 1 epoch → evaluate → predict 1 sample.

---

## 📖 Kiến Thức 1: Vấn Đề Dense với Ảnh

### ✅ Giải Thích

Ảnh 32×32×3 = **3072 số**. Dùng Dense(256) sẽ tạo ra 3072×256 = **786,432 tham số** chỉ ở lớp đầu.

Vấn đề còn sâu hơn: Dense không "hiểu" không gian.

| Vấn đề | Dense | Conv2D |
|--------|-------|--------|
| Giữ thông tin vị trí | ❌ Flatten mất vị trí | ✅ Duyệt qua ảnh |
| Chia sẻ trọng số | ❌ Mỗi pixel riêng | ✅ Cùng filter dùng lại |
| Số tham số | Rất nhiều | Ít hơn nhiều |
| Bất biến dịch chuyển | ❌ "chó ở góc phải" ≠ "chó ở góc trái" | ✅ Nhận ra pattern ở bất kỳ vị trí |

**Analogy:** Dense nhìn ảnh như danh sách pixel ngẫu nhiên. Conv nhìn như CON NGƯỜI — quét từng vùng nhỏ, nhận ra cạnh, góc, shape.

### 📌 Ví Dụ

```
Input ảnh 5×5:       Filter 3×3:      Output 3×3:
1 1 1 0 0           1 0 1            4 3 4
0 1 1 1 0    ⊛      0 1 0    =       2 4 3
0 0 1 1 1           1 0 1            2 3 4
0 0 1 1 0
0 0 0 1 1

Filter "nhận ra đường chéo" — được học tự động qua backprop
```

---

## 📖 Kiến Thức 2: Conv2D & MaxPooling2D

### ✅ Giải Thích

**Conv2D(filters, kernel_size):**
- `filters` = số lượng filter (= số channel output)
- `kernel_size=(3,3)` = cửa sổ 3×3 trượt trên ảnh
- Mỗi filter học nhận ra 1 pattern: cạnh ngang, cạnh dọc, đốm tròn...

**MaxPooling2D(pool_size=(2,2)):**
- Chia ảnh thành ô 2×2, lấy giá trị lớn nhất
- Giảm kích thước ảnh xuống ½ → giảm tham số, bất biến dịch chuyển nhỏ

```
Conv2D(32, 3x3)  MaxPool(2x2)    Conv2D(64, 3x3)  Flatten  Dense(10)
32×32×3  ──────→  32×32×32  ──────→  16×16×32  ──────→  16×16×64  ──→  (flat) ──→ 10
```

### 💻 Code

```python
from tensorflow import keras

model = keras.Sequential([
    keras.layers.Input(shape=(32, 32, 3)),

    # Block 1
    keras.layers.Conv2D(32, (3,3), activation="relu", padding="same"),
    keras.layers.MaxPooling2D(2, 2),    # 32x32 → 16x16

    # Block 2
    keras.layers.Conv2D(64, (3,3), activation="relu", padding="same"),
    keras.layers.MaxPooling2D(2, 2),    # 16x16 → 8x8

    # Block 3
    keras.layers.Conv2D(128, (3,3), activation="relu", padding="same"),
    keras.layers.MaxPooling2D(2, 2),    # 8x8 → 4x4

    # Classifier Head
    keras.layers.Flatten(),
    keras.layers.Dense(256, activation="relu"),
    keras.layers.Dense(10,  activation="softmax"),
])

model.summary()
# Tổng tham số: << so với Dense thuần túy
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Quên padding="same" — hình thu nhỏ nhanh quá
keras.layers.Conv2D(32, (3,3), activation="relu")  # 32×32 → 30×30

# ✅ padding="same" giữ kích thước
keras.layers.Conv2D(32, (3,3), activation="relu", padding="same")  # 32×32 → 32×32
```

---

## 📖 Kiến Thức 3: Dropout & BatchNormalization

### ✅ Giải Thích

**Dropout(rate)** — Regularization: trong mỗi batch training, ngẫu nhiên "tắt" `rate×100%` neurons.
- Buộc mạng không phụ thuộc vào vài neurons cụ thể
- Khi inference / evaluate: tất cả neurons hoạt động, output nhân hệ số `1-rate`

**BatchNormalization()** — Chuẩn hóa output của layer trước khi đưa vào activation:
- Ổn định training, học nhanh hơn
- Giảm nhạy cảm với learning rate

| Technique | Vị trí | Tác dụng |
|-----------|--------|---------|
| Dropout | Sau Dense | Tránh overfit Dense head |
| BatchNorm | Sau Conv2D (trước activation) | Ổn định Conv layers |

### 💻 Code

```python
# BN có thể đặt trước activation
keras.layers.Conv2D(64, (3,3), padding="same"),
keras.layers.BatchNormalization(),
keras.layers.Activation("relu"),
keras.layers.MaxPooling2D(2, 2),

# Hoặc Dropout sau MaxPooling
keras.layers.Conv2D(128, (3,3), padding="same", activation="relu"),
keras.layers.MaxPooling2D(2, 2),
keras.layers.Dropout(0.25),
```

---

## 📖 Kiến Thức 4: Data Augmentation

### ✅ Giải Thích

Dataset nhỏ → overfit. Data augmentation tạo ra biến thể ngẫu nhiên từ ảnh có sẵn:
- Lật ngang (flip)
- Xoay nhẹ (rotation)
- Zoom
- Dịch chuyển (translation)

Kết quả: model thấy "hàng triệu" ảnh khác nhau từ vài nghìn ảnh gốc.

### 💻 Code

```python
# Keras layers — chạy trên GPU, chỉ active khi training
data_aug = keras.Sequential([
    keras.layers.RandomFlip("horizontal"),
    keras.layers.RandomRotation(0.1),     # ±10°
    keras.layers.RandomZoom(0.1),         # ±10%
    keras.layers.RandomTranslation(0.1, 0.1),
], name="data_augmentation")

# Tích hợp vào model
model = keras.Sequential([
    keras.layers.Input(shape=(32, 32, 3)),
    data_aug,          # Augment online khi training
    keras.layers.Conv2D(32, (3,3), activation="relu", padding="same"),
    ...
])

# Hoặc dùng keras.preprocessing (offline, linh hoạt hơn)
```

---

## 💻 Demo Tổng Hợp: CIFAR-10 CNN

```python
import numpy as np
import tensorflow as tf
from tensorflow import keras
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import os

tf.random.set_seed(0)
os.makedirs("output", exist_ok=True)

CLASSES = ["airplane","automobile","bird","cat","deer",
           "dog","frog","horse","ship","truck"]

# ── Dữ liệu ───────────────────────────────────────────────
(X_tr, y_tr), (X_te, y_te) = keras.datasets.cifar10.load_data()
X_tr = X_tr.astype("float32") / 255.0
X_te = X_te.astype("float32") / 255.0
y_tr = y_tr.squeeze()
y_te = y_te.squeeze()
print(f"Train: {X_tr.shape} | Test: {X_te.shape}")

# ── Mô hình ───────────────────────────────────────────────
aug = keras.Sequential([
    keras.layers.RandomFlip("horizontal"),
    keras.layers.RandomRotation(0.1),
])

model = keras.Sequential([
    keras.layers.Input(shape=(32,32,3)),
    aug,

    keras.layers.Conv2D(32, 3, padding="same"),
    keras.layers.BatchNormalization(), keras.layers.Activation("relu"),
    keras.layers.Conv2D(32, 3, padding="same"),
    keras.layers.BatchNormalization(), keras.layers.Activation("relu"),
    keras.layers.MaxPooling2D(2,2), keras.layers.Dropout(0.25),

    keras.layers.Conv2D(64, 3, padding="same"),
    keras.layers.BatchNormalization(), keras.layers.Activation("relu"),
    keras.layers.MaxPooling2D(2,2), keras.layers.Dropout(0.25),

    keras.layers.Flatten(),
    keras.layers.Dense(256, activation="relu"),
    keras.layers.Dropout(0.5),
    keras.layers.Dense(10, activation="softmax"),
])
model.compile("adam", "sparse_categorical_crossentropy", ["accuracy"])
model.summary()

# ── Training ──────────────────────────────────────────────
history = model.fit(X_tr, y_tr, epochs=15, batch_size=128,
                    validation_split=0.1,
                    callbacks=[keras.callbacks.EarlyStopping(patience=3,
                        restore_best_weights=True)])

# ── Đánh giá ──────────────────────────────────────────────
loss, acc = model.evaluate(X_te, y_te, verbose=0)
print(f"\nCIFAR-10 Test Accuracy: {acc:.4f}")

# ── Predictions ───────────────────────────────────────────
y_pred = model.predict(X_te[:20], verbose=0).argmax(1)
fig, axes = plt.subplots(2, 10, figsize=(18, 4))
for i, ax in enumerate(axes.flatten()):
    ax.imshow(X_te[i]); ax.axis("off")
    c = "green" if y_pred[i] == y_te[i] else "red"
    ax.set_title(f"{CLASSES[y_pred[i]]}", color=c, fontsize=7)
plt.tight_layout()
plt.savefig("output/cifar_pred.png", dpi=80); plt.close()
print("✅ output/cifar_pred.png saved")
import shutil; shutil.rmtree("output")
```

---

## 📝 Bài Tập Trên Lớp

**🟢 Bài 1 (Dễ):** Đếm tham số  
Xây dựng CNN 2 conv blocks (32→64 filters) + head Dense(128) → Dense(10).  
a) In model.summary()  
b) Tính tay số tham số của Conv2D(32,(3,3)) với input (32,32,3)  
c) So sánh với model Dense có cùng accuracy trên CIFAR-10

**🟡 Bài 2 (Trung Bình):** Ablation Study  
Train 3 phiên bản CNN trên CIFAR-10:  
- Baseline: Conv blocks không Dropout, không BN  
- + Dropout: thêm Dropout(0.25) sau mỗi block  
- + BatchNorm: thêm BN trong mỗi block  
So sánh val_accuracy và nhận xét overfitting.

**🔴 Bài 3 (Nâng Cao):** CIFAR-10 per-class analysis  
Sau khi train model tốt nhất:  
a) Tính precision/recall cho từng class  
b) Vẽ confusion matrix 10×10  
c) Class nào khó nhất? (ví dụ: cat vs dog)  
d) Visualize feature maps (output của Conv layers đầu) với 1 ảnh ví dụ

---

## 🏠 Bài Tập Về Nhà

**Bài 1:** MNIST với CNN  
Thay vì Dense, dùng CNN để giải MNIST.  
So sánh accuracy CNN vs Dense với MLP2Layer đã làm buổi 1.

**Bài 2:** Custom Dataset  
Dùng `keras.utils.image_dataset_from_directory` để load dataset ảnh cá nhân (>20 ảnh/class).  
Xây CNN đơn giản và train, report accuracy.

---

## 🎯 Tổng Kết

**3 điểm cần nhớ:**
1. **Conv2D học spatial features** — filter chia sẻ weights, bất biến dịch chuyển
2. **CNN Block chuẩn:** Conv → BN → ReLU → MaxPool → Dropout
3. **Data augmentation** = giải pháp #1 khi dataset nhỏ, luôn thêm vào trước khi nghĩ đến thứ khác

**Buổi tiếp theo (Buổi 4):** Transfer Learning — tận dụng MobileNetV2 được train trên 1.2 triệu ảnh ImageNet thay vì train từ đầu.

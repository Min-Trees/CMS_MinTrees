# 🎯 Buổi 2: TensorFlow & Keras Cơ Bản

> **Khóa:** CSI | **Buổi:** 2/14 | **Thời lượng:** 90 phút  
> **Cài đặt:** `pip install tensorflow`

---

## 🎯 Mục Tiêu

Sau buổi này học viên có thể:
- ✅ Xây dựng mạng Dense bằng `keras.Sequential`
- ✅ Compile mô hình: chọn optimizer, loss, metrics phù hợp
- ✅ Huấn luyện với `model.fit()` và xem training curves
- ✅ Sử dụng `EarlyStopping` để tránh overfit
- ✅ Đánh giá mô hình trên test set, in confusion matrix

---

## 🔁 Ôn Bài Cũ (10 phút)

1. Forward pass qua 1 neuron: biểu thức tính z và a là gì?
2. Tại sao cần activation function phi tuyến?
3. Khi nào dùng ReLU, khi nào dùng Softmax?
4. **Mini task:** Tính softmax([3.0, 1.0, -2.0]) bằng tay rồi kiểm tra bằng numpy.

---

## 📖 Kiến Thức 1: TensorFlow & Keras Ecosystem

### ✅ Giải Thích

**TensorFlow** = thư viện tính toán tensor (GPU-accelerated)  
**Keras** = high-level API trên TensorFlow — như "bếp trên bếp"

Năm 2024, `import keras` hoặc `from tensorflow import keras` đều dùng Keras 3.x.

```
                Keras (High-level API)
         ┌─────────────────────────────┐
         │  Sequential | Functional    │
         │  Model.fit | Model.predict  │
         └──────────────┬──────────────┘
                        │ builds on
         ┌──────────────▼──────────────┐
         │         TensorFlow          │
         │   Tensor ops, AutoDiff      │
         │   GPU/TPU distribution      │
         └─────────────────────────────┘
```

### 💻 Code

```python
import tensorflow as tf
from tensorflow import keras

print(tf.__version__)        # 2.x.x hoặc 3.x.x
print(tf.config.list_physical_devices("GPU"))  # Kiểm tra GPU

# Keras 3 standalone (không cần TF)
# import keras
# keras.config.set_backend("tensorflow")   # hoặc "jax", "numpy"
```

---

## 📖 Kiến Thức 2: Sequential API — Xây Mạng

### ✅ Giải Thích

**Sequential** = chồng các layer lên nhau theo thứ tự thẳng.  
Phù hợp với 90% bài toán cơ bản — input → layer1 → layer2 → output.

Mỗi `Dense(n)` = n neurons, tất cả kết nối với layer trước (fully connected).

| Layer | Hàm | Tham số |
|-------|-----|---------|
| `Dense(n, activation)` | Fully connected | units, activation |
| `Dropout(rate)` | Tắt ngẫu nhiên neurons | 0.2–0.5 |
| `BatchNormalization()` | Chuẩn hóa output | — |
| `Flatten()` | Reshape (n,m,k) → (n, m*k) | — |

### 💻 Code

```python
from tensorflow import keras

# Cách 1: Truyền list vào constructor
model = keras.Sequential([
    keras.layers.Input(shape=(784,)),
    keras.layers.Dense(256, activation="relu"),
    keras.layers.Dropout(0.3),
    keras.layers.Dense(128, activation="relu"),
    keras.layers.Dense(10,  activation="softmax"),
])

# Cách 2: Thêm từng layer (linh hoạt hơn)
model2 = keras.Sequential(name="my_model")
model2.add(keras.layers.Input(shape=(784,)))
model2.add(keras.layers.Dense(256, activation="relu"))
model2.add(keras.layers.Dense(10,  activation="softmax"))

# Xem kiến trúc
model.summary()
# Model: "sequential"
# Layer (type)     Output Shape     Param #
# dense (Dense)    (None, 256)      200960
# dropout          (None, 256)      0
# ...
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Không chỉ định input shape
model = keras.Sequential([
    keras.layers.Dense(256, activation="relu"),  # Chưa biết input shape
])
model.summary()   # WARNING: input shape chưa xác định

# ✅ Thêm Input layer đầu tiên
model = keras.Sequential([
    keras.layers.Input(shape=(784,)),    # Chỉ rõ shape!
    keras.layers.Dense(256, activation="relu"),
])
```

---

## 📖 Kiến Thức 3: Compile, Fit, Evaluate

### ✅ Giải Thích

**Compile** = cấu hình cách học:
- **Optimizer**: Adam (mặc định tốt), SGD, RMSprop
- **Loss**: Hàm đo sai số — phụ thuộc bài toán
- **Metrics**: Tiêu chí theo dõi (không ảnh hưởng training)

| Bài toán | Loss | Output activation |
|----------|------|------------------|
| Binary classification | `binary_crossentropy` | sigmoid |
| Multi-class | `categorical_crossentropy` | softmax + one-hot y |
| Multi-class | `sparse_categorical_crossentropy` | softmax + integer y |
| Regression | `mse` / `mae` | linear (không có) |

### 💻 Code

```python
# Compile
model.compile(
    optimizer = keras.optimizers.Adam(learning_rate=0.001),
    loss      = "sparse_categorical_crossentropy",
    metrics   = ["accuracy"],
)

# Fit (huấn luyện)
history = model.fit(
    X_train, y_train,
    epochs           = 30,
    batch_size       = 128,
    validation_split = 0.2,   # 20% train để validate
    # validation_data = (X_val, y_val),   # Hoặc dùng tập riêng
    verbose          = 1,
)

# Evaluate
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"Test accuracy: {test_acc:.4f}")

# Predict
y_pred_probs = model.predict(X_test[:5])           # Shape: (5, 10)
y_pred_class = y_pred_probs.argmax(axis=1)         # Shape: (5,)
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Sai loss cho multi-class
# y là integer [0,1,2,...9] nhưng dùng categorical_crossentropy
model.compile(loss="categorical_crossentropy")  # Cần y là one-hot!
# ✅ Dùng sparse khi y là integer
model.compile(loss="sparse_categorical_crossentropy")

# ❌ Không scale input
X = X_raw   # Pixel 0-255  → gradient không ổn định
# ✅ Scale về [0,1] hoặc [-1,1]
X = X_raw.astype("float32") / 255.0
```

---

## 📖 Kiến Thức 4: Callbacks — Điều Khiển Training

### ✅ Giải Thích

**Callbacks** = hành động tự động xảy ra trong quá trình training.

| Callback | Tác dụng |
|----------|---------|
| `EarlyStopping` | Dừng sớm khi val_loss không cải thiện |
| `ModelCheckpoint` | Lưu model tốt nhất vào file |
| `ReduceLROnPlateau` | Giảm learning rate khi training chậm |
| `TensorBoard` | Visualize training realtime |

### 💻 Code

```python
from tensorflow import keras

callbacks = [
    # Dừng nếu val_loss không giảm trong 5 epochs
    keras.callbacks.EarlyStopping(
        monitor            = "val_loss",
        patience           = 5,
        restore_best_weights = True,   # Load lại best checkpoint
        verbose            = 1,
    ),

    # Lưu model tốt nhất
    keras.callbacks.ModelCheckpoint(
        filepath   = "best_model.keras",
        monitor    = "val_accuracy",
        save_best_only = True,
        verbose    = 1,
    ),

    # Giảm LR khi val_loss không giảm trong 3 epochs
    keras.callbacks.ReduceLROnPlateau(
        monitor  = "val_loss",
        factor   = 0.5,        # LR mới = LR cũ × 0.5
        patience = 3,
        min_lr   = 1e-6,
    ),
]

history = model.fit(
    X_tr, y_tr,
    epochs           = 100,
    validation_split = 0.2,
    callbacks        = callbacks,
)

# Load lại model đã lưu
# best_model = keras.models.load_model("best_model.keras")
```

---

## 💻 Demo Tổng Hợp: MNIST Phân Loại 10 Chữ Số

```python
import numpy as np
import tensorflow as tf
from tensorflow import keras
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import os

tf.random.set_seed(42)
os.makedirs("output", exist_ok=True)

print("=== MNIST Classifier ===\n")

# ── Dữ liệu ───────────────────────────────────────────────
(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()
X_train = X_train.astype("float32").reshape(-1, 784) / 255.0
X_test  = X_test.astype("float32").reshape(-1, 784)  / 255.0
print(f"Train: {X_train.shape} | Test: {X_test.shape}")

# ── Mô hình ───────────────────────────────────────────────
model = keras.Sequential([
    keras.layers.Input(shape=(784,)),
    keras.layers.Dense(512, activation="relu"),
    keras.layers.Dropout(0.4),
    keras.layers.Dense(256, activation="relu"),
    keras.layers.Dropout(0.3),
    keras.layers.Dense(10,  activation="softmax"),
])
model.compile(optimizer="adam",
              loss="sparse_categorical_crossentropy",
              metrics=["accuracy"])
model.summary()

# ── Training ──────────────────────────────────────────────
callbacks = [
    keras.callbacks.EarlyStopping(patience=3, restore_best_weights=True),
]
history = model.fit(X_train, y_train,
                    epochs=25, batch_size=256,
                    validation_split=0.15,
                    callbacks=callbacks, verbose=1)

# ── Đánh giá ──────────────────────────────────────────────
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"\nTest Accuracy: {test_acc:.4f}")

# ── Training Curves ────────────────────────────────────────
hist = history.history
fig, axes = plt.subplots(1, 2, figsize=(10, 4))
axes[0].plot(hist["accuracy"], label="Train")
axes[0].plot(hist["val_accuracy"], label="Val")
axes[0].set_title("Accuracy"); axes[0].legend()
axes[1].plot(hist["loss"], label="Train")
axes[1].plot(hist["val_loss"], label="Val")
axes[1].set_title("Loss"); axes[1].legend()
plt.suptitle(f"MNIST — Final Test Acc: {test_acc:.3f}", fontweight="bold")
plt.tight_layout(); plt.savefig("output/mnist_curves.png", dpi=100); plt.close()

# ── Predictions ────────────────────────────────────────────
y_pred = model.predict(X_test[:20], verbose=0).argmax(axis=1)
fig, axes = plt.subplots(2, 10, figsize=(18, 3))
for i, ax in enumerate(axes.flatten()):
    ax.imshow(X_test[i].reshape(28,28), cmap="gray"); ax.axis("off")
    col = "green" if y_pred[i] == y_test[i] else "red"
    ax.set_title(f"{y_pred[i]}", color=col, fontsize=9)
plt.suptitle("Dự đoán (xanh=đúng, đỏ=sai)")
plt.tight_layout(); plt.savefig("output/predictions.png", dpi=80); plt.close()

print("✅ Kết quả lưu tại: output/")
import shutil; shutil.rmtree("output")
```

---

## 📝 Bài Tập Trên Lớp

**🟢 Bài 1 (Dễ):** Sequential API  
Xây dựng mô hình phân loại MNIST với kiến trúc đơn giản: [784 → 128 → 64 → 10].  
a) In model.summary(), đếm tổng số tham số  
b) Compile với loss phù hợp  
c) Train 10 epochs, nhận xét accuracy ở epoch cuối

**🟡 Bài 2 (Trung Bình):** So sánh kiến trúc  
So sánh 3 cấu hình trên MNIST:  
- Shallow: [784 → 256 → 10]  
- Medium: [784 → 512 → 256 → 10] + Dropout  
- Deep: [784 → 512 → 256 → 128 → 64 → 10] + Dropout  
Vẽ training curves của cả 3 trên cùng biểu đồ.

**🔴 Bài 3 (Nâng Cao):** Fashion MNIST  
Dùng `keras.datasets.fashion_mnist` (10 loại quần áo).  
a) EDA: visualize 1 mẫu mỗi class  
b) Xây dựng mô hình tốt nhất (target: accuracy ≥ 88%)  
c) In classification report cho 10 class  
d) Tìm những class nào hay bị nhầm lẫn?

---

## 🏠 Bài Tập Về Nhà

**Bài 1:** Custom Dataset  
Tự tạo dataset đơn giản (ví dụ: điểm hình tròn hai nhóm).  
Xây dựng mạng Keras, train và vẽ decision boundary.

**Bài 2:** TensorBoard  
Thêm `keras.callbacks.TensorBoard(log_dir="logs")` vào training.  
Chạy `tensorboard --logdir logs` trong terminal.  
Screenshot và mô tả những gì thấy trên TensorBoard.

---

## 🎯 Tổng Kết

**3 điểm cần nhớ:**
1. **Sequential API:** Input → Dense... → Output — `model.compile()` trước `model.fit()`
2. **Loss function phụ thuộc bài toán:** `sparse_categorical` khi y là integer, `categorical` khi y là one-hot
3. **EarlyStopping + `restore_best_weights=True`** = tránh overfit tự động

**Buổi tiếp theo (Buổi 3):** CNN — tại sao Dense không tốt cho ảnh và Conv2D hoạt động như thế nào.

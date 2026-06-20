"""
CSI - Buổi 3: CNN - Convolutional Neural Network
=================================================
Dataset: CIFAR-10 (ảnh màu 32×32)
Cài trước: pip install tensorflow
"""

import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import os

print("=" * 55)
print("   CSI Buổi 3 — CNN phân loại ảnh CIFAR-10")
print("=" * 55)

try:
    import tensorflow as tf
    from tensorflow import keras
    print(f"  TensorFlow: {tf.__version__}")
except ImportError:
    print("  Cài: pip install tensorflow"); exit()

os.makedirs("charts", exist_ok=True)
tf.random.set_seed(42)

# ── Tên nhãn CIFAR-10 ─────────────────────────────────────
LABELS = ["airplane","automobile","bird","cat","deer",
          "dog","frog","horse","ship","truck"]

# ──────────────────────────────────────────────────────────
# 1. LOAD & TIỀN XỬ LÝ
# ──────────────────────────────────────────────────────────
print("\n── 1. Load CIFAR-10 ──")
(X_tr, y_tr), (X_te, y_te) = keras.datasets.cifar10.load_data()
print(f"  Train: {X_tr.shape}  Test: {X_te.shape}")

X_tr = X_tr.astype("float32") / 255.0
X_te = X_te.astype("float32") / 255.0
y_tr_flat = y_tr.flatten(); y_te_flat = y_te.flatten()

# Visualize mẫu
fig, axes = plt.subplots(2, 5, figsize=(12, 5))
for i, ax in enumerate(axes.flatten()):
    idx = np.random.randint(len(X_tr))
    ax.imshow(X_tr[idx]); ax.set_title(LABELS[y_tr_flat[idx]]); ax.axis("off")
plt.suptitle("Mẫu CIFAR-10 (32×32)"); plt.tight_layout()
plt.savefig("charts/cifar_samples.png", dpi=80); plt.close()

# ──────────────────────────────────────────────────────────
# 2. XÂY DỰNG CNN
# ──────────────────────────────────────────────────────────
print("\n── 2. CNN Architecture ──")
model = keras.Sequential([
    # Block 1
    keras.layers.Conv2D(32, (3,3), activation="relu", padding="same", input_shape=(32,32,3)),
    keras.layers.BatchNormalization(),
    keras.layers.Conv2D(32, (3,3), activation="relu", padding="same"),
    keras.layers.MaxPooling2D((2,2)),
    keras.layers.Dropout(0.25),

    # Block 2
    keras.layers.Conv2D(64, (3,3), activation="relu", padding="same"),
    keras.layers.BatchNormalization(),
    keras.layers.Conv2D(64, (3,3), activation="relu", padding="same"),
    keras.layers.MaxPooling2D((2,2)),
    keras.layers.Dropout(0.25),

    # Block 3
    keras.layers.Conv2D(128, (3,3), activation="relu", padding="same"),
    keras.layers.BatchNormalization(),
    keras.layers.MaxPooling2D((2,2)),
    keras.layers.Dropout(0.3),

    # Classifier
    keras.layers.Flatten(),
    keras.layers.Dense(256, activation="relu"),
    keras.layers.Dropout(0.5),
    keras.layers.Dense(10,  activation="softmax"),
], name="cifar10_cnn")

model.summary()
total_params = model.count_params()
print(f"\n  Tổng tham số: {total_params:,}")

# ──────────────────────────────────────────────────────────
# 3. DATA AUGMENTATION (inline)
# ──────────────────────────────────────────────────────────
data_aug = keras.Sequential([
    keras.layers.RandomFlip("horizontal"),
    keras.layers.RandomRotation(0.1),
    keras.layers.RandomZoom(0.1),
    keras.layers.RandomTranslation(0.1, 0.1),
], name="augmentation")

# ──────────────────────────────────────────────────────────
# 4. COMPILE & TRAIN (chỉ 5 epochs demo)
# ──────────────────────────────────────────────────────────
model.compile(
    optimizer = keras.optimizers.Adam(learning_rate=0.001),
    loss      = "sparse_categorical_crossentropy",
    metrics   = ["accuracy"],
)
print("\n── 3. Training (5 epochs demo) ──")
history = model.fit(
    X_tr, y_tr_flat,
    epochs           = 5,    # Demo: thực tế cần 50-100 epochs
    batch_size       = 128,
    validation_data  = (X_te, y_te_flat),
    verbose          = 1,
)

# ──────────────────────────────────────────────────────────
# 5. ĐÁNH GIÁ & VISUALIZE
# ──────────────────────────────────────────────────────────
test_loss, test_acc = model.evaluate(X_te, y_te_flat, verbose=0)
print(f"\n  Test Accuracy: {test_acc:.3f}")
print("  (Với 50+ epoch và augmentation: có thể đạt ~85%)")

# Training curves
fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(history.history["accuracy"],     label="Train")
ax.plot(history.history["val_accuracy"], label="Validation")
ax.set_title(f"CNN Accuracy Curves (5 epochs demo)")
ax.set_xlabel("Epoch"); ax.set_ylabel("Accuracy")
ax.legend(); ax.grid(True, alpha=0.3)
plt.tight_layout(); plt.savefig("charts/cnn_curves.png", dpi=100); plt.close()

# Visualize predictions
y_pred = np.argmax(model.predict(X_te[:20], verbose=0), axis=1)
fig, axes = plt.subplots(2, 10, figsize=(20, 4))
for i, ax in enumerate(axes.flatten()):
    ax.imshow(X_te[i]); ax.axis("off")
    col = "green" if y_pred[i] == y_te_flat[i] else "red"
    ax.set_title(f"{LABELS[y_pred[i]]}", color=col, fontsize=7)
plt.suptitle("Dự đoán 20 ảnh đầu (xanh=đúng, đỏ=sai)", fontsize=11)
plt.tight_layout(); plt.savefig("charts/predictions.png", dpi=80); plt.close()

print("  ✓ Charts → charts/")
import shutil; shutil.rmtree("charts")
print("✅ Demo hoàn tất!")

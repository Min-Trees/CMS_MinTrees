"""
CSI - Buổi 2: TensorFlow & Keras Cơ Bản
=========================================
Cài trước: pip install tensorflow
Dataset: MNIST (handwritten digits)
"""

import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import os

print("=" * 55)
print("   CSI Buổi 2 — TensorFlow & Keras")
print("=" * 55)

try:
    import tensorflow as tf
    from tensorflow import keras
    print(f"  TensorFlow version: {tf.__version__}")
except ImportError:
    print("  ⚠️  TensorFlow chưa cài. Chạy: pip install tensorflow")
    print("  Demo sẽ dùng sklearn thay thế...\n")
    # Fallback demo
    from sklearn.neural_network import MLPClassifier
    from sklearn.datasets import load_digits
    from sklearn.model_selection import train_test_split
    from sklearn.preprocessing import StandardScaler
    from sklearn.metrics import accuracy_score
    digits = load_digits()
    X = digits.data / 16.0; y = digits.target
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
    mlp = MLPClassifier(hidden_layer_sizes=(256, 128), max_iter=500, random_state=0)
    mlp.fit(X_tr, y_tr)
    print(f"  Sklearn MLP Accuracy: {accuracy_score(y_te, mlp.predict(X_te)):.3f}")
    exit()

os.makedirs("charts", exist_ok=True)
tf.random.set_seed(42)

# ──────────────────────────────────────────────────────────
# 1. LOAD & TIỀN XỬ LÝ MNIST
# ──────────────────────────────────────────────────────────
print("\n── 1. Load MNIST ──")
(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()
print(f"  Train: {X_train.shape}  Test: {X_test.shape}")
print(f"  Giá trị pixel: [{X_train.min()}, {X_train.max()}]")

# Chuẩn hóa: pixel / 255 → [0, 1]
X_train = X_train.astype("float32") / 255.0
X_test  = X_test.astype("float32")  / 255.0

# Flatten: 28×28 → 784
X_tr_flat = X_train.reshape(-1, 784)
X_te_flat = X_test.reshape(-1, 784)

# one-hot encode labels
y_tr_oh = keras.utils.to_categorical(y_train, 10)
y_te_oh = keras.utils.to_categorical(y_test,  10)

# Visualize mẫu
fig, axes = plt.subplots(2, 5, figsize=(10, 4))
for i, ax in enumerate(axes.flatten()):
    ax.imshow(X_train[i], cmap="gray")
    ax.set_title(f"Label: {y_train[i]}"); ax.axis("off")
plt.suptitle("Mẫu MNIST"); plt.tight_layout()
plt.savefig("charts/mnist_samples.png", dpi=80); plt.close()
print("  ✓ Mẫu → charts/mnist_samples.png")

# ──────────────────────────────────────────────────────────
# 2. XÂY DỰNG MÔ HÌNH (Sequential API)
# ──────────────────────────────────────────────────────────
print("\n── 2. Xây dựng mô hình ──")
model = keras.Sequential([
    keras.layers.Input(shape=(784,)),
    keras.layers.Dense(256, activation="relu"),
    keras.layers.Dropout(0.3),
    keras.layers.Dense(128, activation="relu"),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(10,  activation="softmax"),
], name="mnist_classifier")

model.summary()

# Compile
model.compile(
    optimizer = "adam",
    loss      = "categorical_crossentropy",
    metrics   = ["accuracy"],
)

# ──────────────────────────────────────────────────────────
# 3. TRAINING VỚI CALLBACKS
# ──────────────────────────────────────────────────────────
print("\n── 3. Training ──")
callbacks = [
    keras.callbacks.EarlyStopping(
        monitor="val_loss", patience=3, restore_best_weights=True),
]
history = model.fit(
    X_tr_flat, y_tr_oh,
    epochs           = 20,
    batch_size       = 128,
    validation_split = 0.15,
    callbacks        = callbacks,
    verbose          = 1,
)

# ──────────────────────────────────────────────────────────
# 4. ĐÁNH GIÁ
# ──────────────────────────────────────────────────────────
print("\n── 4. Đánh giá ──")
loss, acc = model.evaluate(X_te_flat, y_te_oh, verbose=0)
print(f"  Test Accuracy: {acc:.4f}")
print(f"  Test Loss:     {loss:.4f}")

# ──────────────────────────────────────────────────────────
# 5. VẼ TRAINING CURVES
# ──────────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 2, figsize=(10, 4))
hist = history.history
epochs_done = len(hist["accuracy"])

axes[0].plot(hist["accuracy"],     label="Train Acc")
axes[0].plot(hist["val_accuracy"], label="Val Acc")
axes[0].set_title(f"Accuracy (best val={max(hist['val_accuracy']):.3f})")
axes[0].set_xlabel("Epoch"); axes[0].legend()

axes[1].plot(hist["loss"],     label="Train Loss")
axes[1].plot(hist["val_loss"], label="Val Loss")
axes[1].set_title(f"Loss ({epochs_done} epochs, EarlyStopping)")
axes[1].set_xlabel("Epoch"); axes[1].legend()

plt.suptitle("Training Curves — MNIST Classifier", fontweight="bold")
plt.tight_layout()
plt.savefig("charts/training_curves.png", dpi=100)
plt.close()
print("  ✓ Training curves → charts/training_curves.png")

# ──────────────────────────────────────────────────────────
# 6. DỰ ĐOÁN VÀ CONFUSION MATRIX
# ──────────────────────────────────────────────────────────
y_pred = np.argmax(model.predict(X_te_flat, verbose=0), axis=1)
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
cm = confusion_matrix(y_test, y_pred)
fig, ax = plt.subplots(figsize=(8, 7))
ConfusionMatrixDisplay(cm).plot(ax=ax, colorbar=True, cmap="Blues")
ax.set_title(f"Confusion Matrix — Test Accuracy: {acc:.3f}")
plt.tight_layout()
plt.savefig("charts/confusion_matrix.png", dpi=100)
plt.close()
print("  ✓ Confusion matrix → charts/confusion_matrix.png")

import shutil; shutil.rmtree("charts")
print("\n✅ Demo hoàn tất!")

"""
CSI Buổi 4 — Transfer Learning với MobileNetV2
Demo: Fine-tune MobileNetV2 trên tập ảnh 10 class (CIFAR-10)
"""
import os
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

try:
    import tensorflow as tf
    from tensorflow import keras

    tf.random.set_seed(42)
    os.makedirs("output", exist_ok=True)

    CLASSES = ["airplane","automobile","bird","cat","deer",
               "dog","frog","horse","ship","truck"]
    IMG_SIZE = 96   # MobileNetV2 cần ít nhất 32x32, khuyến nghị ≥96

    # ── Dữ liệu CIFAR-10, resize lên IMG_SIZE ─────────────────────
    print("=== Transfer Learning với MobileNetV2 ===\n")
    (X_tr_raw, y_tr), (X_te_raw, y_te) = keras.datasets.cifar10.load_data()
    y_tr = y_tr.squeeze()
    y_te = y_te.squeeze()

    # Resize 32→96 bằng tf.image.resize
    def resize_batch(X, size):
        X = tf.cast(X, tf.float32) / 255.0
        X = tf.image.resize(X, [size, size])
        return X.numpy()

    print(f"Resizing {len(X_tr_raw)} train images to {IMG_SIZE}×{IMG_SIZE}...")
    # Demo nhỏ: dùng 5000 train, 1000 test để chạy nhanh
    X_tr = resize_batch(X_tr_raw[:5000], IMG_SIZE)
    X_te = resize_batch(X_te_raw[:1000], IMG_SIZE)
    y_tr_s = y_tr[:5000]
    y_te_s = y_te[:1000]
    print(f"Train: {X_tr.shape} | Test: {X_te.shape}")

    # ── Bước 1: FEATURE EXTRACTION (Freeze pretrained base) ────────
    print("\n--- Bước 1: Feature Extraction (base layers frozen) ---")

    base = keras.applications.MobileNetV2(
        input_shape = (IMG_SIZE, IMG_SIZE, 3),
        include_top = False,       # Bỏ Dense head gốc (imagenet 1000 class)
        weights     = "imagenet",  # Load trọng số pretrained
        pooling     = "avg",       # Global Average Pooling thay Flatten
    )
    base.trainable = False         # ❄️ Đóng băng — không update weights

    # ── Custom head cho 10 class ────────────────────────────────────
    inputs = keras.Input(shape=(IMG_SIZE, IMG_SIZE, 3))
    x = base(inputs, training=False)   # training=False → BN dùng inference mode
    x = keras.layers.Dropout(0.3)(x)
    x = keras.layers.Dense(128, activation="relu")(x)
    outputs = keras.layers.Dense(10, activation="softmax")(x)
    model = keras.Model(inputs, outputs, name="mobilenetv2_transfer")

    model.compile(
        optimizer = keras.optimizers.Adam(1e-3),
        loss      = "sparse_categorical_crossentropy",
        metrics   = ["accuracy"],
    )
    model.summary()
    print(f"\nBase trainable: {base.trainable}")
    print(f"Tổng params có thể train: {model.trainable_variables.__len__()}")

    history1 = model.fit(
        X_tr, y_tr_s,
        epochs=10, batch_size=64,
        validation_split=0.15,
        callbacks=[keras.callbacks.EarlyStopping(patience=3,
                   restore_best_weights=True)],
    )

    loss1, acc1 = model.evaluate(X_te, y_te_s, verbose=0)
    print(f"\n[Feature Extraction] Test Acc: {acc1:.4f}")

    # ── Bước 2: FINE-TUNING (mở freeze 1 phần) ─────────────────────
    print("\n--- Bước 2: Fine-Tuning (mở 30 lớp cuối của base) ---")

    base.trainable = True
    # Chỉ fine-tune 30 lớp cuối, đóng băng phần còn lại
    for layer in base.layers[:-30]:
        layer.trainable = False

    trainable_count = sum(1 for l in base.layers if l.trainable)
    print(f"Base layers trainable: {trainable_count}/{len(base.layers)}")

    # Dùng learning rate nhỏ hơn để không phá weights pretrained
    model.compile(
        optimizer = keras.optimizers.Adam(1e-4),
        loss      = "sparse_categorical_crossentropy",
        metrics   = ["accuracy"],
    )

    history2 = model.fit(
        X_tr, y_tr_s,
        epochs=10, batch_size=64,
        validation_split=0.15,
        callbacks=[keras.callbacks.EarlyStopping(patience=3,
                   restore_best_weights=True)],
    )

    loss2, acc2 = model.evaluate(X_te, y_te_s, verbose=0)
    print(f"\n[Fine-Tuning] Test Acc: {acc2:.4f}")
    print(f"Cải thiện nhờ fine-tuning: {(acc2-acc1)*100:+.2f}%")

    # ── Vẽ training curves so sánh ─────────────────────────────────
    fig, axes = plt.subplots(1, 2, figsize=(12, 4))
    for i, (hist, label) in enumerate([(history1, "Feature Extraction"),
                                        (history2, "Fine-Tuning")]):
        axes[0].plot(hist.history["accuracy"],     label=f"{label} Train")
        axes[0].plot(hist.history["val_accuracy"], label=f"{label} Val", linestyle="--")
        axes[1].plot(hist.history["loss"],         label=f"{label} Train")
        axes[1].plot(hist.history["val_loss"],     label=f"{label} Val", linestyle="--")
    axes[0].set_title("Accuracy"); axes[0].legend(fontsize=7)
    axes[1].set_title("Loss"); axes[1].legend(fontsize=7)
    plt.suptitle(f"Transfer Learning — Feat Ext: {acc1:.3f} → Fine-Tune: {acc2:.3f}")
    plt.tight_layout()
    plt.savefig("output/transfer_curves.png", dpi=100); plt.close()

    # ── Predictions ───────────────────────────────────────────────
    y_pred = model.predict(X_te[:16], verbose=0).argmax(1)
    fig, axes = plt.subplots(2, 8, figsize=(18, 4))
    for i, ax in enumerate(axes.flatten()):
        ax.imshow(X_te[i]); ax.axis("off")
        c = "green" if y_pred[i] == y_te_s[i] else "red"
        ax.set_title(f"P:{CLASSES[y_pred[i]][:4]}\nT:{CLASSES[y_te_s[i]][:4]}",
                     color=c, fontsize=6)
    plt.tight_layout()
    plt.savefig("output/transfer_pred.png", dpi=80); plt.close()

    print("\n✅ Saved: output/transfer_curves.png, output/transfer_pred.png")
    import shutil; shutil.rmtree("output")

except ImportError:
    print("TensorFlow không có sẵn. Chạy: pip install tensorflow")
    print("\nFallback demo: Transfer Learning concept với sklearn")
    from sklearn.datasets import load_digits
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.linear_model import LogisticRegression
    from sklearn.model_selection import train_test_split
    from sklearn.preprocessing import StandardScaler
    from sklearn.metrics import accuracy_score

    # Mô phỏng transfer learning: dùng RF lấy feature, LR phân loại
    X, y = load_digits(return_X_y=True)
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)

    # "Pretrained" feature extractor
    rf = RandomForestClassifier(n_estimators=100, random_state=0)
    rf.fit(X_tr, y_tr)
    X_tr_feat = rf.apply(X_tr)   # Leaf indices as features
    X_te_feat = rf.apply(X_te)

    # "Fine-tune" classifier head
    lr = LogisticRegression(max_iter=500)
    lr.fit(X_tr_feat, y_tr)
    acc = accuracy_score(y_te, lr.predict(X_te_feat))
    print(f"RF feature extractor + LR head accuracy: {acc:.4f}")

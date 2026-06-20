"""
CSI Buổi 6 — NLP cơ bản: Tokenization, Embedding, LSTM
Demo: Phân tích cảm xúc (Sentiment Analysis) trên IMDB dataset
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

    print("=== NLP cơ bản: IMDB Sentiment Analysis ===\n")

    # ── 1. Concept: NLP Pipeline ────────────────────────────────────
    print("--- NLP Pipeline ---")
    print("Văn bản gốc:")
    sentences = [
        "This movie is absolutely wonderful!",
        "Terrible film, waste of time.",
        "Good story but boring ending.",
    ]
    for s in sentences:
        print(f"  '{s}'")

    # ── 2. Load IMDB Dataset ─────────────────────────────────────────
    print("\n--- Load IMDB dataset ---")
    VOCAB_SIZE  = 10000
    MAX_LEN     = 200

    (X_tr, y_tr), (X_te, y_te) = keras.datasets.imdb.load_data(
        num_words=VOCAB_SIZE
    )
    print(f"Train: {len(X_tr)} reviews | Test: {len(X_te)} reviews")
    print(f"Sample review (encoded): {X_tr[0][:10]}...")
    print(f"Label: {y_tr[0]} (0=negative, 1=positive)")

    # ── 3. Padding — đưa về cùng độ dài ────────────────────────────
    X_tr_pad = keras.preprocessing.sequence.pad_sequences(X_tr, maxlen=MAX_LEN)
    X_te_pad = keras.preprocessing.sequence.pad_sequences(X_te, maxlen=MAX_LEN)
    print(f"\nSau padding shape: {X_tr_pad.shape}")  # (25000, 200)

    # ── 4. Model với Embedding + LSTM ───────────────────────────────
    print("\n--- Xây mô hình LSTM ---")

    EMBED_DIM = 64

    model = keras.Sequential([
        keras.layers.Input(shape=(MAX_LEN,)),
        # Embedding: mỗi token → vector 64 chiều
        keras.layers.Embedding(VOCAB_SIZE, EMBED_DIM),

        # LSTM học context tuần tự
        keras.layers.LSTM(64, return_sequences=True),
        keras.layers.LSTM(32),

        keras.layers.Dense(32, activation="relu"),
        keras.layers.Dropout(0.5),
        keras.layers.Dense(1, activation="sigmoid"),   # Binary: pos/neg
    ])

    model.compile(
        optimizer = "adam",
        loss      = "binary_crossentropy",
        metrics   = ["accuracy"],
    )
    model.summary()

    # ── 5. Training ──────────────────────────────────────────────────
    print("\n--- Training ---")
    history = model.fit(
        X_tr_pad, y_tr,
        epochs           = 5,
        batch_size       = 256,
        validation_split = 0.15,
        callbacks        = [keras.callbacks.EarlyStopping(
                                patience=2, restore_best_weights=True)],
    )

    loss, acc = model.evaluate(X_te_pad, y_te, verbose=0)
    print(f"\nTest Accuracy: {acc:.4f}")

    # ── 6. Demo decode & predict ────────────────────────────────────
    word_index = keras.datasets.imdb.get_word_index()
    id_to_word = {v+3: k for k,v in word_index.items()}
    id_to_word.update({0:"<PAD>", 1:"<START>", 2:"<UNK>", 3:"<UNUSED>"})

    def decode_review(encoded, n=20):
        words = [id_to_word.get(i, "?") for i in encoded]
        return " ".join(words[:n]) + "..."

    print("\n--- Predictions trên 5 test samples ---")
    preds = model.predict(X_te_pad[:5], verbose=0).flatten()
    for i in range(5):
        label = "POSITIVE" if preds[i] > 0.5 else "NEGATIVE"
        actual = "pos" if y_te[i] == 1 else "neg"
        decoded = decode_review(X_te[i])
        print(f"  [{actual}→{label} ({preds[i]:.2f})] {decoded}")

    # ── 7. Training Curves ──────────────────────────────────────────
    fig, axes = plt.subplots(1, 2, figsize=(10, 4))
    axes[0].plot(history.history["accuracy"],     label="Train")
    axes[0].plot(history.history["val_accuracy"], label="Val")
    axes[0].set_title("Accuracy"); axes[0].legend()
    axes[1].plot(history.history["loss"],     label="Train")
    axes[1].plot(history.history["val_loss"], label="Val")
    axes[1].set_title("Loss"); axes[1].legend()
    plt.suptitle(f"IMDB Sentiment — Test Acc: {acc:.3f}")
    plt.tight_layout()
    plt.savefig("output/nlp_curves.png", dpi=100); plt.close()
    print("\n✅ output/nlp_curves.png saved")
    import shutil; shutil.rmtree("output")

except ImportError:
    print("TensorFlow không có. Fallback: TF-IDF + Logistic Regression")
    from sklearn.datasets import fetch_20newsgroups
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.linear_model import LogisticRegression
    from sklearn.metrics import accuracy_score

    cats   = ["rec.sport.hockey","sci.med","comp.graphics","talk.politics.misc"]
    train  = fetch_20newsgroups(subset="train", categories=cats)
    test   = fetch_20newsgroups(subset="test",  categories=cats)

    tfidf  = TfidfVectorizer(max_features=5000, stop_words="english")
    X_tr   = tfidf.fit_transform(train.data)
    X_te   = tfidf.transform(test.data)

    lr     = LogisticRegression(max_iter=500, C=5)
    lr.fit(X_tr, train.target)
    acc    = accuracy_score(test.target, lr.predict(X_te))
    print(f"TF-IDF + LR accuracy ({len(cats)} newsgroups): {acc:.4f}")

"""
CSI Buổi 13 — Giải Đề Mẫu Tổng Hợp
Đề 1: CNN Fashion MNIST + Transfer Learning
Đề 2: NLP IMDB + Hugging Face
Đề 3: Streamlit Multi-Task App
"""

# ════════════════════════════════════════════════════════════
#  ĐỀ 1: CNN + Transfer Learning
# ════════════════════════════════════════════════════════════
def de1_cnn_transfer():
    print("=== Đề 1: CNN Fashion MNIST + Transfer Learning ===\n")
    try:
        import numpy as np
        import tensorflow as tf
        from tensorflow import keras

        # ── Phần A: CNN from scratch ──────────────────────────
        print("--- Phần A: CNN Fashion MNIST ---")
        (X_tr, y_tr), (X_te, y_te) = keras.datasets.fashion_mnist.load_data()
        X_tr = X_tr.astype("float32")[:, :, :, np.newaxis] / 255.0
        X_te = X_te.astype("float32")[:, :, :, np.newaxis] / 255.0

        model_cnn = keras.Sequential([
            keras.layers.Input(shape=(28, 28, 1)),
            keras.layers.Conv2D(32, 3, padding="same"),
            keras.layers.BatchNormalization(),
            keras.layers.Activation("relu"),
            keras.layers.MaxPooling2D(2, 2),
            keras.layers.Conv2D(64, 3, padding="same"),
            keras.layers.BatchNormalization(),
            keras.layers.Activation("relu"),
            keras.layers.MaxPooling2D(2, 2),
            keras.layers.Flatten(),
            keras.layers.Dense(128, activation="relu"),
            keras.layers.Dropout(0.5),
            keras.layers.Dense(10, activation="softmax"),
        ])
        model_cnn.compile("adam", "sparse_categorical_crossentropy", ["accuracy"])

        history = model_cnn.fit(X_tr, y_tr, epochs=5, batch_size=256,
                                validation_split=0.1, verbose=0)
        _, acc = model_cnn.evaluate(X_te, y_te, verbose=0)
        print(f"  Fashion MNIST Test Accuracy: {acc:.4f}")
        print(f"  Final val_accuracy: {history.history['val_accuracy'][-1]:.4f}")

        # ── Phần B: Transfer Learning ─────────────────────────
        print("\n--- Phần B: Transfer Learning CIFAR-10 (Demo) ---")
        print("  (Skipped full training — xem demo.py Lesson 4)")
        print("  Key steps:")
        print("    1. base = MobileNetV2(include_top=False, weights='imagenet')")
        print("    2. base.trainable = False")
        print("    3. Train head 10 epochs with lr=1e-3")
        print("    4. base.trainable = True; freeze base.layers[:-30]")
        print("    5. Recompile with lr=1e-4; train 5 more epochs")

        return acc

    except ImportError:
        print("  TensorFlow không có sẵn")
        return None


# ════════════════════════════════════════════════════════════
#  ĐỀ 2: NLP — IMDB + Hugging Face
# ════════════════════════════════════════════════════════════
def de2_nlp():
    print("\n=== Đề 2: NLP IMDB + Hugging Face ===\n")
    try:
        import numpy as np
        from tensorflow import keras

        # ── Phần A: LSTM Sentiment ────────────────────────────
        print("--- Phần A: LSTM Sentiment IMDB ---")
        VOCAB, MAXLEN = 10000, 200

        (X_tr, y_tr), (X_te, y_te) = keras.datasets.imdb.load_data(num_words=VOCAB)
        X_tr = keras.preprocessing.sequence.pad_sequences(X_tr, maxlen=MAXLEN)
        X_te = keras.preprocessing.sequence.pad_sequences(X_te, maxlen=MAXLEN)

        model_lstm = keras.Sequential([
            keras.layers.Input(shape=(MAXLEN,)),
            keras.layers.Embedding(VOCAB, 64),
            keras.layers.Bidirectional(keras.layers.LSTM(64, return_sequences=True)),
            keras.layers.Bidirectional(keras.layers.LSTM(32)),
            keras.layers.Dense(32, activation="relu"),
            keras.layers.Dropout(0.5),
            keras.layers.Dense(1, activation="sigmoid"),
        ])
        model_lstm.compile("adam", "binary_crossentropy", ["accuracy"])

        history = model_lstm.fit(X_tr, y_tr, epochs=3, batch_size=256,
                                 validation_split=0.1, verbose=0)
        _, acc = model_lstm.evaluate(X_te, y_te, verbose=0)
        print(f"  IMDB Bidirectional LSTM Accuracy: {acc:.4f}")

        # ── Phần B: Hugging Face pipeline ─────────────────────
        print("\n--- Phần B: Hugging Face Sentiment (fallback) ---")
        try:
            from transformers import pipeline
            pipe = pipeline("sentiment-analysis")
            samples = ["This is incredible!", "Worst experience ever.", "It was okay."]
            results = pipe(samples)
            for s, r in zip(samples, results):
                print(f"  [{r['label']:8} {r['score']:.2f}] {s}")
        except ImportError:
            print("  Transformers không có — dùng sklearn TF-IDF fallback")
            from sklearn.feature_extraction.text import TfidfVectorizer
            from sklearn.linear_model import LogisticRegression
            train_texts = ["great movie love it", "terrible bad film", "amazing wonderful best"] * 10 + \
                          ["awful waste boring", "horrible disappointing awful"] * 12
            train_y     = [1]*30 + [0]*24
            tfidf = TfidfVectorizer(max_features=100)
            X_sk  = tfidf.fit_transform(train_texts)
            lr    = LogisticRegression().fit(X_sk, train_y)
            test_t = ["this was great", "really bad and boring"]
            preds  = lr.predict(tfidf.transform(test_t))
            for t, p in zip(test_t, preds):
                print(f"  [{'POS' if p==1 else 'NEG'}] {t}")

        return acc

    except ImportError:
        print("  TensorFlow không có sẵn")
        return None


# ════════════════════════════════════════════════════════════
#  ĐỀ 3: Streamlit App (Mô tả + Code mẫu)
# ════════════════════════════════════════════════════════════
def de3_streamlit_description():
    print("\n=== Đề 3: Streamlit Multi-Task App (mô tả) ===\n")
    code = '''
# app.py — chạy bằng: streamlit run app.py
import streamlit as st
import numpy as np

st.set_page_config(page_title="CSI AI App", page_icon="🤖", layout="wide")
st.title("🤖 CSI Final Project — AI Demo")

mode = st.sidebar.radio("Chọn model:", [
    "🌸 Iris Classifier",
    "📝 IMDB Sentiment",
    "🖼️ CNN Image Classifier",
])

@st.cache_resource
def load_iris_model():
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.datasets import load_iris
    iris = load_iris()
    clf  = RandomForestClassifier(n_estimators=100, random_state=0)
    clf.fit(iris.data, iris.target)
    return clf, iris.target_names

if mode == "🌸 Iris Classifier":
    st.header("🌸 Phân loại hoa Iris")
    col1, col2 = st.columns(2)
    with col1:
        sl = st.slider("Sepal Length", 4.0, 8.0, 5.8, 0.1)
        sw = st.slider("Sepal Width",  2.0, 4.5, 3.0, 0.1)
    with col2:
        pl = st.slider("Petal Length", 1.0, 7.0, 3.5, 0.1)
        pw = st.slider("Petal Width",  0.1, 2.5, 1.2, 0.1)
    if st.button("Phân loại", type="primary"):
        clf, names = load_iris_model()
        pred  = clf.predict([[sl, sw, pl, pw]])[0]
        probs = clf.predict_proba([[sl, sw, pl, pw]])[0]
        st.success(f"### {names[pred].upper()}")
        for n, p in zip(names, probs):
            st.progress(float(p), text=f"{n}: {p:.1%}")

elif mode == "📝 IMDB Sentiment":
    st.header("📝 Phân tích cảm xúc review phim")
    text = st.text_area("Nhập review (tiếng Anh):", height=100)
    if st.button("Phân tích", type="primary") and text:
        # Rule-based fallback
        pos = sum(1 for w in ["great","amazing","love","wonderful","excellent"] if w in text.lower())
        neg = sum(1 for w in ["terrible","awful","hate","bad","boring"] if w in text.lower())
        sentiment = "POSITIVE 😊" if pos > neg else "NEGATIVE 😟" if neg > pos else "NEUTRAL 😐"
        if pos > neg: st.success(f"## {sentiment}")
        elif neg > pos: st.error(f"## {sentiment}")
        else: st.info(f"## {sentiment}")
'''
    print(code)
    print("  Chạy: streamlit run app.py")


# ── Main ──────────────────────────────────────────────────────
if __name__ == "__main__":
    acc1 = de1_cnn_transfer()
    acc2 = de2_nlp()
    de3_streamlit_description()

    print("\n" + "="*55)
    print("TỔNG KẾT ĐỀ MẪU:")
    if acc1: print(f"  Đề 1 CNN Fashion MNIST accuracy: {acc1:.4f}")
    if acc2: print(f"  Đề 2 LSTM IMDB accuracy:        {acc2:.4f}")
    print("  Đề 3 Streamlit: xem code mô tả bên trên")

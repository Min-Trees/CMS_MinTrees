"""
CSI Buổi 8 — Streamlit Deployment
Chạy: streamlit run demo.py

Xây dựng web app cho:
1. Image Classification (CIFAR-10 CNN)
2. Text Sentiment Analysis
3. Iris Flower Classification
"""
import streamlit as st
import numpy as np
import io

# ── Cấu hình trang ────────────────────────────────────────────
st.set_page_config(
    page_title = "AI Demo App",
    page_icon  = "🤖",
    layout     = "wide",
)

st.title("🤖 MindX AI Demo App")
st.markdown("Ứng dụng minh họa các mô hình AI đã học trong khóa CSI.")

# ── Sidebar navigation ────────────────────────────────────────
mode = st.sidebar.radio(
    "Chọn demo:",
    ["🌸 Iris Classifier", "📝 Sentiment Analysis", "🖼️ Image Classification"],
)
st.sidebar.markdown("---")
st.sidebar.markdown("**CSI — MindX Education**")

# ═══════════════════════════════════════════════════════════════
#  Demo 1: Iris Classifier
# ═══════════════════════════════════════════════════════════════
if mode == "🌸 Iris Classifier":
    st.header("🌸 Iris Flower Classifier")
    st.markdown("Nhập thông số hoa Iris để phân loại 3 loài.")

    col1, col2 = st.columns(2)
    with col1:
        sepal_length = st.slider("Sepal Length (cm)", 4.0, 8.0, 5.8, 0.1)
        sepal_width  = st.slider("Sepal Width (cm)",  2.0, 4.5, 3.0, 0.1)
    with col2:
        petal_length = st.slider("Petal Length (cm)", 1.0, 7.0, 3.5, 0.1)
        petal_width  = st.slider("Petal Width (cm)",  0.1, 2.5, 1.2, 0.1)

    if st.button("🔍 Phân loại", type="primary"):
        try:
            from sklearn.datasets import load_iris
            from sklearn.ensemble import RandomForestClassifier
            from sklearn.model_selection import train_test_split

            iris      = load_iris()
            X, y      = iris.data, iris.target
            X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
            clf       = RandomForestClassifier(n_estimators=100, random_state=0)
            clf.fit(X_tr, y_tr)

            sample = np.array([[sepal_length, sepal_width, petal_length, petal_width]])
            pred   = clf.predict(sample)[0]
            probs  = clf.predict_proba(sample)[0]
            names  = iris.target_names

            st.success(f"### Kết quả: **{names[pred].upper()}**")

            st.markdown("**Xác suất cho từng loài:**")
            for i, (name, prob) in enumerate(zip(names, probs)):
                color = "🟢" if i == pred else "⚪"
                st.progress(float(prob), text=f"{color} {name}: {prob:.1%}")

        except ImportError:
            st.error("Cần cài scikit-learn: `pip install scikit-learn`")

# ═══════════════════════════════════════════════════════════════
#  Demo 2: Sentiment Analysis
# ═══════════════════════════════════════════════════════════════
elif mode == "📝 Sentiment Analysis":
    st.header("📝 Phân Tích Cảm Xúc Văn Bản")
    st.markdown("Nhập đánh giá phim hoặc sản phẩm bằng tiếng Anh.")

    text = st.text_area(
        "Nhập văn bản:",
        value="This movie was absolutely incredible! The plot had me on the edge of my seat.",
        height=150,
    )

    if st.button("🔍 Phân tích", type="primary"):
        if not text.strip():
            st.warning("Vui lòng nhập văn bản.")
        else:
            with st.spinner("Đang phân tích..."):
                try:
                    from transformers import pipeline as hf_pipeline
                    sentiment_pipe = hf_pipeline("sentiment-analysis")
                    result = sentiment_pipe(text[:512])[0]

                    label = result["label"]
                    score = result["score"]
                    emoji = "😊" if label == "POSITIVE" else "😟"

                    if label == "POSITIVE":
                        st.success(f"## {emoji} {label} ({score:.1%})")
                    else:
                        st.error(f"## {emoji} {label} ({score:.1%})")

                    st.progress(score if label == "POSITIVE" else 1-score,
                                text=f"Độ tự tin: {score:.1%}")

                except ImportError:
                    # Fallback: đơn giản rule-based
                    pos_words = ["great","amazing","wonderful","fantastic","love","excellent","best"]
                    neg_words = ["terrible","awful","horrible","hate","worst","boring","bad"]
                    words     = text.lower().split()
                    pos_count = sum(1 for w in words if any(p in w for p in pos_words))
                    neg_count = sum(1 for w in words if any(n in w for n in neg_words))

                    if pos_count > neg_count:
                        st.success(f"## 😊 POSITIVE (pos_words: {pos_count})")
                    elif neg_count > pos_count:
                        st.error(f"## 😟 NEGATIVE (neg_words: {neg_count})")
                    else:
                        st.info("## 😐 NEUTRAL")
                    st.caption("_Cài `transformers` để dùng model BERT chính xác hơn_")

# ═══════════════════════════════════════════════════════════════
#  Demo 3: Image Classification
# ═══════════════════════════════════════════════════════════════
elif mode == "🖼️ Image Classification":
    st.header("🖼️ Phân Loại Ảnh CIFAR-10")
    st.markdown("Upload ảnh để phân loại thành 10 loại: plane, car, bird, cat, deer, dog, frog, horse, ship, truck.")

    uploaded = st.file_uploader("Chọn ảnh (PNG/JPG):", type=["png","jpg","jpeg"])

    if uploaded:
        from PIL import Image
        img = Image.open(uploaded).convert("RGB")
        st.image(img, caption="Ảnh đã upload", width=200)

        if st.button("🔍 Phân loại", type="primary"):
            with st.spinner("Đang phân loại..."):
                try:
                    import tensorflow as tf
                    from tensorflow import keras

                    CLASSES = ["airplane","automobile","bird","cat","deer",
                               "dog","frog","horse","ship","truck"]

                    # Demo: dùng model giả (chưa train)
                    # Trong thực tế: keras.models.load_model("cifar10_model.keras")
                    st.info("⚠️ Demo: model chưa được train, kết quả ngẫu nhiên.\n\n"
                            "Trong thực tế, load model đã train từ file .keras")

                    # Preprocess
                    img_arr = np.array(img.resize((32, 32))).astype("float32") / 255.0
                    img_arr = img_arr[np.newaxis, ...]   # (1, 32, 32, 3)

                    # Giả lập predictions
                    probs = np.random.dirichlet(np.ones(10))
                    pred  = probs.argmax()

                    st.success(f"### Kết quả: **{CLASSES[pred].upper()}**")
                    st.markdown("**Top 3 dự đoán:**")
                    top3 = np.argsort(probs)[::-1][:3]
                    for i in top3:
                        st.progress(float(probs[i]), text=f"{CLASSES[i]}: {probs[i]:.1%}")

                except ImportError:
                    st.error("Cần cài TensorFlow: `pip install tensorflow pillow`")

# ── Footer ────────────────────────────────────────────────────
st.markdown("---")
st.markdown("_Xây dựng bởi MindX CSI Course | `streamlit run demo.py`_")

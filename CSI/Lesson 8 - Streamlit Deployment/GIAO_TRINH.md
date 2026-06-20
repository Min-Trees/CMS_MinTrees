# 🎯 Buổi 8: Streamlit — Deploy AI Model thành Web App

> **Khóa:** CSI | **Buổi:** 8/14 | **Thời lượng:** 90 phút  
> **Cài đặt:** `pip install streamlit pillow`  
> **Chạy app:** `streamlit run demo.py`

---

## 🎯 Mục Tiêu

- ✅ Giải thích tại sao cần deployment (model không chỉ chạy trong notebook)
- ✅ Xây dựng web app với Streamlit trong <30 phút
- ✅ Tích hợp model sklearn/keras vào Streamlit app
- ✅ Deploy lên Streamlit Community Cloud (miễn phí)

---

## 🔁 Ôn Bài Cũ (10 phút)

1. `pipeline("sentiment-analysis")` của Hugging Face làm gì?
2. `[CLS]` token embedding dùng để làm gì?
3. Cosine similarity là gì? Giá trị 1.0 nghĩa là gì?
4. **Mini task:** Viết 3 dòng: load model từ HuggingFace Hub, tokenize 1 câu, lấy embedding.

---

## 📖 Kiến Thức 1: Tại Sao Cần Deployment?

### ✅ Giải Thích

Model trong Jupyter Notebook chỉ chạy được trên máy tính của bạn với Python.

**Deployment** = đưa model ra thế giới thực:

```
Notebook (bạn)   →  API / Web App  →  Người dùng
                       (deployment)      (browser, mobile)
```

| Tool | Dùng khi | Khó độ |
|------|----------|--------|
| **Streamlit** | Demo nhanh, prototype | ⭐ Dễ |
| **FastAPI** | REST API cho developer | ⭐⭐ Vừa |
| **Flask** | Web app với HTML | ⭐⭐⭐ |
| **Docker + Cloud** | Production | ⭐⭐⭐⭐ |

Streamlit = **1 file Python → Web App đẹp** — lý tưởng cho demo AI.

---

## 📖 Kiến Thức 2: Streamlit Cơ Bản

### ✅ Giải Thích

Streamlit chạy script Python từ trên xuống dưới mỗi khi user tương tác.  
Không cần HTML, CSS, JavaScript.

### 💻 Code

```python
import streamlit as st
import numpy as np

# ── Cấu hình ──────────────────────────────────────────────────
st.set_page_config(page_title="AI Demo", page_icon="🤖", layout="wide")

# ── Text Display ───────────────────────────────────────────────
st.title("🤖 Tiêu đề lớn")
st.header("## Header")
st.subheader("### Subheader")
st.write("Văn bản bình thường")
st.markdown("**Bold**, *italic*, `code`")
st.info("Hộp xanh thông tin")
st.success("Hộp xanh lá thành công")
st.warning("Hộp vàng cảnh báo")
st.error("Hộp đỏ lỗi")

# ── Input Widgets ──────────────────────────────────────────────
name    = st.text_input("Tên của bạn:", placeholder="Nhập tên...")
age     = st.number_input("Tuổi:", min_value=1, max_value=120, value=25)
score   = st.slider("Điểm số:", 0, 100, 75)
option  = st.selectbox("Môn học:", ["Python", "Math", "AI", "Data"])
confirm = st.checkbox("Tôi đồng ý điều khoản")
btn     = st.button("Submit", type="primary")

if btn:
    st.success(f"Xin chào {name}! Tuổi: {age}, Điểm: {score}")

# ── Layout ─────────────────────────────────────────────────────
col1, col2, col3 = st.columns(3)
with col1: st.metric("Accuracy", "92.5%", "+1.2%")
with col2: st.metric("Loss",     "0.234", "-0.015")
with col3: st.metric("Epoch",    "15",    "")

# ── Sidebar ────────────────────────────────────────────────────
with st.sidebar:
    st.header("⚙️ Cài đặt")
    model_type = st.radio("Chọn model:", ["CNN", "ResNet", "MobileNet"])
```

---

## 📖 Kiến Thức 3: File Upload & Media

### ✅ Giải Thích

Streamlit xử lý file upload rất dễ — trả về `BytesIO` object.

### 💻 Code

```python
import streamlit as st
from PIL import Image
import numpy as np

# ── Upload ảnh ────────────────────────────────────────────────
uploaded = st.file_uploader("Upload ảnh:", type=["png","jpg","jpeg"])
if uploaded:
    img = Image.open(uploaded).convert("RGB")
    st.image(img, caption="Ảnh đã upload", use_column_width=False, width=300)

    # Preprocess cho model
    img_arr = np.array(img.resize((224, 224))).astype("float32") / 255.0

# ── Upload CSV ────────────────────────────────────────────────
csv_file = st.file_uploader("Upload CSV:", type=["csv"])
if csv_file:
    import pandas as pd
    df = pd.read_csv(csv_file)
    st.dataframe(df.head(10))
    st.write(f"Shape: {df.shape}")

# ── Camera input ──────────────────────────────────────────────
photo = st.camera_input("Chụp ảnh từ webcam:")
if photo:
    st.image(photo)
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Reload model mỗi lần user click → rất chậm
def classify(img):
    model = keras.models.load_model("model.keras")  # Load lại mỗi lần!
    return model.predict(img)

# ✅ Cache model với @st.cache_resource
@st.cache_resource
def load_model():
    return keras.models.load_model("model.keras")   # Load 1 lần duy nhất

model = load_model()  # Gọi ở top-level
```

---

## 📖 Kiến Thức 4: Cache & Performance

### ✅ Giải Thích

Streamlit re-run toàn bộ script mỗi khi tương tác → cần cache operations nặng.

| Decorator | Dùng cho | Cache khi |
|-----------|---------|----------|
| `@st.cache_resource` | Model, DB connection | Load 1 lần/session |
| `@st.cache_data` | Data processing, CSV load | Cache theo arguments |

### 💻 Code

```python
import streamlit as st
import pandas as pd
import numpy as np

# Cache model (chỉ load 1 lần)
@st.cache_resource
def get_model():
    from tensorflow import keras
    return keras.models.load_model("best_model.keras")

# Cache data processing (cache dựa trên file hash)
@st.cache_data
def load_data(filepath):
    return pd.read_csv(filepath)

# Cache prediction (cache dựa trên input)
@st.cache_data
def predict(_model, img_bytes):
    img_arr = np.frombuffer(img_bytes, dtype=np.uint8)
    # ... preprocess ...
    return _model.predict(img_arr)

# Usage
with st.spinner("Đang tải model..."):
    model = get_model()
st.success("Model đã tải!")
```

---

## 💻 Demo Tổng Hợp

Xem `demo.py` — Streamlit app với 3 tab:
1. **Iris Classifier** — sliders nhập features → Random Forest predict
2. **Sentiment Analysis** — text area → HuggingFace pipeline
3. **Image Classification** — upload ảnh → CNN predict

Chạy: `streamlit run demo.py`

---

## 📝 Bài Tập Trên Lớp

**🟢 Bài 1 (Dễ):** Streamlit Hello World  
Tạo app `hello.py`:  
a) Title + subheader + divider  
b) Text input tên + number input điểm → nút Submit → hiển thị "Xếp loại"  
c) Sidebar với `st.radio` chọn chủ đề màu sắc

**🟡 Bài 2 (Trung Bình):** Iris App với cache  
Xây app phân loại Iris:  
a) Load + train model với `@st.cache_resource`  
b) 4 sliders cho features  
c) Kết quả hiển thị với progress bar xác suất  
d) Thêm biểu đồ scatter plot (sepal features) với điểm đang predict highlight

**🔴 Bài 3 (Nâng Cao):** Deploy Production-Ready App  
Xây app phân loại MNIST từ upload ảnh:  
a) Load model Keras với `@st.cache_resource`  
b) User upload ảnh chữ số viết tay  
c) Preprocess, predict, hiển thị top-3 predictions với confidence bars  
d) Thêm "Lịch sử predictions" lưu vào `st.session_state`

---

## 🏠 Bài Tập Về Nhà

**Bài 1:** Deploy lên Streamlit Cloud  
a) Push code lên GitHub repository (public)  
b) Vào streamlit.io/cloud → Connect GitHub → Deploy  
c) Share URL với instructor

**Bài 2:** Portfolio App  
Xây app demo tổng hợp 3-4 model bạn đã làm trong khóa.  
Sidebar navigation, cache, đẹp về UI.

---

## 🎯 Tổng Kết

**3 điểm cần nhớ:**
1. **`streamlit run app.py`** — 1 lệnh, web app chạy ngay
2. **`@st.cache_resource`** cho model — tránh load lại mỗi click
3. **Session state** — `st.session_state` lưu biến xuyên suốt interactions

**Buổi tiếp theo (Buổi 9):** Kiểm tra lần 2 — NLP + Streamlit deployment.

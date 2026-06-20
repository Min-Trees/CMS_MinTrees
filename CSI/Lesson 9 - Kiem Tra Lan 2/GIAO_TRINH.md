# 🎯 Buổi 9: Kiểm Tra Lần 2 (NLP + Deployment)

> **Khóa:** CSI | **Buổi:** 9/14 | **Thời lượng:** 90 phút

---

## 🎯 Mục Tiêu Kiểm Tra

- ✅ NLP pipeline: Tokenization → Embedding → LSTM → Output
- ✅ Hugging Face Pipeline API và Tokenizer/Model manual
- ✅ Xây dựng Streamlit app tích hợp model AI

---

## 🔁 Ôn Tập Nhanh — Buổi 6, 7, 8 (15 phút)

**B6 NLP:**
1. Tại sao Word Embedding tốt hơn One-Hot?
2. `return_sequences=True` cần khi nào?
3. `pad_sequences` làm gì?

**B7 Hugging Face:**
1. `pipeline("zero-shot-classification")` dùng model gì mặc định?
2. `[CLS]` token trong BERT dùng để làm gì?
3. Sự khác nhau BERT vs GPT về kiến trúc?

**B8 Streamlit:**
1. Sự khác nhau `@st.cache_resource` vs `@st.cache_data`?
2. `st.session_state` giải quyết vấn đề gì?
3. Lệnh chạy Streamlit app là gì?

---

## 📋 Đề Kiểm Tra

> **Thời gian:** 60 phút | **Mở:** tài liệu học | **Cấm:** ChatGPT

---

### 📌 Phần 1: Lý Thuyết (20 điểm)

**Câu 1 (5đ):** NLP Pipeline  
Cho câu "I really love this product!"  
a) Mô tả 4 bước transform câu thành dự đoán sentiment  
b) One-Hot vs Embedding — tại sao Embedding tốt hơn?  
c) LSTM đọc câu này từ trái sang phải — hidden state ở bước 4 chứa thông tin gì?

**Câu 2 (5đ):** Hugging Face  
a) Giải thích "Transformer đọc câu song song" — khác LSTM như nào?  
b) Khi gọi `pipeline("sentiment-analysis")` mặc định dùng model gì?  
c) `tokenizer.encode("hello world")` trả về gì? Có token đặc biệt nào?

**Câu 3 (5đ):** Tìm lỗi code  
```python
import streamlit as st
from tensorflow import keras

def get_model():                              # Line 4
    return keras.models.load_model("m.keras")

uploaded = st.file_uploader("Upload:", type=["jpg"])
if uploaded:
    if st.button("Predict"):
        model = get_model()                   # Line 11
        # ... predict ...
```
a) Vấn đề gì ở Line 4 và 11?  
b) Fix như thế nào?  
c) Thêm `st.spinner` ở đâu?

**Câu 4 (5đ):** Điền chỗ trống  
```python
# Hoàn thành code LSTM sentiment
model = keras.Sequential([
    keras.layers.Input(shape=(___,)),         # MAX_LEN = 200
    keras.layers.Embedding(___, 64),          # VOCAB_SIZE
    keras.layers.LSTM(64, ___=True),          # return cả sequence
    keras.layers.LSTM(32),
    keras.layers.Dense(1, activation=___),    # Binary output
])
model.compile("adam", ___, ["accuracy"])      # Loss cho binary
```

---

### 💻 Phần 2: Code (60 điểm)

**Bài 2A (20đ):** LSTM Sentiment Classifier  
Dataset: Tự tạo 40 câu tiếng Anh (20 positive, 20 negative) trong code.  
```python
# Yêu cầu:
# 1. Tokenize + pad_sequences
# 2. LSTM model (ít nhất 1 LSTM layer + Dropout)
# 3. compile + fit (10 epochs)  
# 4. In train/val accuracy
# 5. Test với 3 câu mới (tự chọn)
```

Tiêu chí:
- Corpus đủ 40 câu: 5đ
- Tokenizer đúng: 4đ
- LSTM architecture: 6đ
- Training + metrics: 5đ

**Bài 2B (25đ):** Streamlit Classifier App  
Xây dựng `app.py` (không cần chạy, chỉ đánh giá code):  
```python
# Yêu cầu:
# 1. Sidebar navigation: 2 mode (Text Sentiment | Iris Classifier)
# 2. Mode Sentiment:
#    - Text area input
#    - Nút "Phân tích"
#    - Hiển thị kết quả (label + confidence bar)
# 3. Mode Iris:
#    - 4 sliders (feature ranges)
#    - @st.cache_resource cho model
#    - Hiển thị prediction + probability barchart
# 4. Footer với thông tin tác giả
```

Tiêu chí:
- Sidebar + navigation đúng: 5đ
- Sentiment mode hoàn chỉnh: 8đ
- Iris mode với cache: 8đ
- UI/UX (emoji, color, layout): 4đ

**Bài 2C (15đ — BONUS):** Hugging Face Integration  
Tích hợp 1 Hugging Face pipeline vào Streamlit app:  
- Chọn bất kỳ task: sentiment, NER, zero-shot, summarization...  
- Xử lý trường hợp `transformers` chưa cài (try/except fallback)  
- Hiển thị kết quả đẹp với st.json hoặc st.table

---

### 📝 Phần 3: Short Questions (20 điểm)

1. **(4đ)** Cho biết output shape của từng layer:  
   `Input(200,)` → `Embedding(10000, 64)` → `LSTM(32)` → `Dense(1)`  
   Điền: (batch, 200) → ? → ? → ?

2. **(4đ)** Khi nào nên dùng LSTM, khi nào nên dùng BERT?

3. **(4đ)** Giải thích `attention_mask` trong Hugging Face tokenizer.

4. **(4đ)** `st.session_state` vs biến Python thường — khác nhau ở điểm nào quan trọng nhất?

5. **(4đ)** Model bạn train → muốn người khác dùng được. Liệt kê 4 thứ cần cung cấp.

---

## 📊 Bảng Điểm

| Phần | Điểm | Ngưỡng đạt |
|------|------|-----------|
| Phần 1: Lý thuyết | 20 | ≥ 14 |
| Phần 2A: LSTM | 20 | ≥ 14 |
| Phần 2B: Streamlit | 25 | ≥ 18 |
| Phần 3: Short Q | 20 | ≥ 14 |
| **Tổng** | **85** | **≥ 65** |
| 2C Bonus | +15 | — |

---

## ✅ Đáp Án Tham Khảo — Phần 3

1. `(batch,200)` → `(batch,200,64)` → `(batch,32)` → `(batch,1)`
2. LSTM: dataset nhỏ, không cần GPU, sequential task. BERT: cần accuracy cao, có GPU, text classification/NER/QA
3. `attention_mask` = 1 cho token thực, 0 cho padding — model bỏ qua vị trí padding khi tính attention
4. `session_state` tồn tại xuyên suốt interactions, biến Python reset mỗi lần re-run
5. Model file (.keras/.pkl), preprocessing code, requirements.txt, cách chạy (README)

---

## 🎯 Nhìn Về Nửa Sau Khóa

**3 buổi đã học (B6-B8):** NLP, Transformers, Deployment  
**Buổi 10-14:** Chatbot + LLM, Object Detection, Speech AI, Tổng hợp, Final Project

**Buổi tiếp theo (Buổi 10):** Chatbot & LLM — OpenAI API, prompt engineering, build chatbot.

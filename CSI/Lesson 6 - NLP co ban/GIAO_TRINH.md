# 🎯 Buổi 6: NLP Cơ Bản — Xử Lý Văn Bản

> **Khóa:** CSI | **Buổi:** 6/14 | **Thời lượng:** 90 phút  
> **Cài đặt:** `pip install tensorflow`

---

## 🎯 Mục Tiêu

- ✅ Mô tả NLP pipeline: Text → Tokenize → Embed → Model → Output
- ✅ Giải thích Word Embedding (so sánh với One-Hot)
- ✅ Hiểu tại sao LSTM tốt hơn Dense cho dữ liệu sequential
- ✅ Xây dựng IMDB sentiment classifier với Keras LSTM

---

## 🔁 Ôn Bài Cũ (10 phút)

1. Transfer Learning gồm bao nhiêu bước? Liệt kê thứ tự
2. `include_top=False` làm gì với pretrained model?
3. Tại sao fine-tuning dùng LR nhỏ hơn feature extraction?
4. **Mini task:** Viết code tạo custom head 2 lớp Dense cho pretrained base (giả sử base output shape là (None, 1280)).

---

## 📖 Kiến Thức 1: NLP Pipeline

### ✅ Giải Thích

Văn bản → con số → model → bài toán học được.

```
"The cat sat on the mat"
        │ Tokenize
        ▼
[4, 12, 55, 3, 4, 89]       ← Index từ trong vocabulary
        │ Embedding
        ▼
[[0.2,-0.5,...], ...]       ← Vector cho mỗi từ (64 chiều)
        │ LSTM
        ▼
context vector              ← "Tóm tắt" câu
        │ Dense
        ▼
[0.12, 0.88]                ← Negative 12%, Positive 88%
```

### 📌 Preprocessing Steps

| Bước | Mô tả | Ví dụ |
|------|-------|-------|
| Tokenize | Tách câu thành tokens (từ/subword) | "don't" → ["don", "'t"] |
| Numericalize | Ánh xạ token → index | "cat"→45, "dog"→78 |
| Pad/Truncate | Đưa về cùng độ dài | [4,7,12,0,0,0] |
| Embed | Index → dense vector | 45 → [0.1,-0.3,...] |

### 💻 Code

```python
from tensorflow import keras

# Tokenizer — build vocabulary từ corpus
tokenizer = keras.preprocessing.text.Tokenizer(
    num_words = 10000,   # Chỉ giữ 10000 từ phổ biến nhất
    oov_token = "<OOV>", # Unknown word token
)
texts = ["I love this movie", "This film is terrible", "Great story!"]
tokenizer.fit_on_texts(texts)

print(tokenizer.word_index)  # {'i': 1, 'this': 2, 'love': 3, ...}

sequences = tokenizer.texts_to_sequences(texts)
print(sequences)  # [[3, 1, 4, 5], [4, 6, 7, 2], ...]

# Padding về cùng độ dài
padded = keras.preprocessing.sequence.pad_sequences(sequences, maxlen=10)
print(padded.shape)  # (3, 10)
```

---

## 📖 Kiến Thức 2: Word Embedding

### ✅ Giải Thích

**One-Hot Encoding** (cũ): "cat" = [0,0,1,0,...,0] — vector 10000 chiều, không có nghĩa ngữ nghĩa.

**Word Embedding** (hiện đại): "cat" = [0.2, -0.5, 0.8, ...] — vector 64-300 chiều, học được.

Đặc tính quan trọng:  
$$\text{king} - \text{man} + \text{woman} \approx \text{queen}$$

Các từ có nghĩa gần → vector gần nhau trong không gian embedding.

| | One-Hot | Embedding |
|-|---------|-----------|
| Kích thước | vocab_size (10000+) | embed_dim (64-300) |
| Ngữ nghĩa | Không | Có |
| Tham số | Cố định | Học được |

### 💻 Code

```python
VOCAB_SIZE = 10000
EMBED_DIM  = 64

# Embedding layer: (batch, seq_len) → (batch, seq_len, embed_dim)
embed = keras.layers.Embedding(
    input_dim  = VOCAB_SIZE,  # Số từ trong vocabulary
    output_dim = EMBED_DIM,   # Kích thước vector embedding
    # input_length = MAX_LEN, # Optional
)

# Ví dụ
import numpy as np
x = np.array([[1, 2, 3, 4, 5]])  # 1 câu, 5 từ
out = embed(x)
print(out.shape)  # (1, 5, 64) — mỗi từ → vector 64 chiều
```

---

## 📖 Kiến Thức 3: Recurrent Networks (RNN/LSTM)

### ✅ Giải Thích

**Vấn đề:** Dense "không nhớ thứ tự" — "I am not happy" vs "I am happy" cho cùng kết quả nếu bag-of-words.

**RNN:** Có hidden state — mỗi bước đọc 1 từ, cập nhật "bộ nhớ":

$$h_t = \tanh(W_h h_{t-1} + W_x x_t)$$

**LSTM (Long Short-Term Memory):** RNN cải tiến với 3 "cổng":
- **Forget gate:** Quên thông tin cũ
- **Input gate:** Thêm thông tin mới
- **Output gate:** Quyết định output

LSTM giải quyết **vanishing gradient** — học dependencies dài hạn tốt hơn RNN đơn giản.

### 💻 Code

```python
from tensorflow import keras

# Chỉ lấy output cuối cùng (summarize cả câu)
model = keras.Sequential([
    keras.layers.Input(shape=(200,)),
    keras.layers.Embedding(10000, 64),
    keras.layers.LSTM(64),          # return_sequences=False (default)
    keras.layers.Dense(1, activation="sigmoid"),
])

# Stacked LSTM (intermediate layers cần return_sequences=True)
model2 = keras.Sequential([
    keras.layers.Input(shape=(200,)),
    keras.layers.Embedding(10000, 64),
    keras.layers.LSTM(64, return_sequences=True),   # Trả output mỗi bước
    keras.layers.LSTM(32),                          # Layer cuối không cần
    keras.layers.Dense(1, activation="sigmoid"),
])

# GRU — đơn giản hơn LSTM, thường cho kết quả tương đương
model3 = keras.Sequential([
    keras.layers.Input(shape=(200,)),
    keras.layers.Embedding(10000, 64),
    keras.layers.GRU(64),
    keras.layers.Dense(1, activation="sigmoid"),
])
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Stacked LSTM không có return_sequences
keras.layers.LSTM(64),
keras.layers.LSTM(32),  # Lỗi: lớp trước không trả sequence

# ✅ Intermediate LSTM phải return_sequences=True
keras.layers.LSTM(64, return_sequences=True),
keras.layers.LSTM(32),
```

---

## 📖 Kiến Thức 4: Text Classification với Keras

### ✅ Giải Thích

IMDB dataset: 25000 reviews phim được label (+/-). Đây là dataset chuẩn NLP.

`keras.datasets.imdb.load_data(num_words=N)` trả về reviews đã được tokenize sẵn thành số.

### 💻 Code

```python
from tensorflow import keras

VOCAB_SIZE = 10000
MAX_LEN    = 200

(X_tr, y_tr), (X_te, y_te) = keras.datasets.imdb.load_data(num_words=VOCAB_SIZE)
X_tr = keras.preprocessing.sequence.pad_sequences(X_tr, maxlen=MAX_LEN)
X_te = keras.preprocessing.sequence.pad_sequences(X_te, maxlen=MAX_LEN)

model = keras.Sequential([
    keras.layers.Input(shape=(MAX_LEN,)),
    keras.layers.Embedding(VOCAB_SIZE, 64),
    keras.layers.LSTM(64, return_sequences=True),
    keras.layers.LSTM(32),
    keras.layers.Dense(32, activation="relu"),
    keras.layers.Dropout(0.5),
    keras.layers.Dense(1, activation="sigmoid"),  # Binary output
])

model.compile("adam", "binary_crossentropy", ["accuracy"])
model.summary()
```

---

## 💻 Demo Tổng Hợp

Xem `demo.py` — IMDB Sentiment Classification đầy đủ:
- Load & decode reviews
- Padding sequences
- Stacked LSTM model
- Predictions với decoded text

---

## 📝 Bài Tập Trên Lớp

**🟢 Bài 1 (Dễ):** Tokenization thủ công  
Cho 10 câu tiếng Anh (tự chọn).  
a) Dùng `Tokenizer.fit_on_texts()` → print 20 từ phổ biến nhất  
b) Tokenize câu "I do not think this is good"  
c) Thêm câu mới chứa từ không có trong vocab → "<OOV>" xuất hiện ở đâu?

**🟡 Bài 2 (Trung Bình):** LSTM vs Dense cho NLP  
Trên IMDB, so sánh 2 mô hình:  
- Model A: Embedding → Flatten → Dense(128) → Dense(1)  
- Model B: Embedding → LSTM(64) → Dense(1)  
Vẽ training curves cả hai, giải thích kết quả.

**🔴 Bài 3 (Nâng Cao):** Bidirectional LSTM  
Thêm `keras.layers.Bidirectional(keras.layers.LSTM(64))` — đọc văn bản từ 2 hướng.  
a) Giải thích tại sao Bidirectional tốt hơn LSTM đơn hướng  
b) So sánh accuracy với LSTM thường  
c) Thêm `Attention` mechanism (self-attention đơn giản)

---

## 🏠 Bài Tập Về Nhà

**Bài 1:** Phân loại tin tức Việt Nam  
Tìm dataset tin tức tiếng Việt (>2 class).  
Dùng `underthesea` hoặc `pyvi` để tokenize tiếng Việt.  
Xây LSTM classifier, report accuracy.

**Bài 2:** Text Generation  
Dùng LSTM để generate text:  
- Load một đoạn văn dài  
- Train model dự đoán từ tiếp theo  
- Generate 50 từ từ seed text

---

## 🎯 Tổng Kết

**3 điểm cần nhớ:**
1. **Embedding layer** học biểu diễn ngữ nghĩa từ — không phải one-hot
2. **LSTM đọc tuần tự** — nhớ context, giải quyết "I am NOT happy"
3. **Binary → sigmoid + binary_crossentropy | Multi-class → softmax + categorical**

**Buổi tiếp theo (Buổi 7):** Hugging Face Transformers — BERT và state-of-the-art NLP.

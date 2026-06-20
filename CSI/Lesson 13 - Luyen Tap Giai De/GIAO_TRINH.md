# 🎯 Buổi 13: Luyện Tập Giải Đề Tổng Hợp

> **Khóa:** CSI | **Buổi:** 13/14 | **Thời lượng:** 90 phút

---

## 🎯 Mục Tiêu

- ✅ Ôn tập hệ thống toàn bộ kiến thức CSI (Buổi 1-12)
- ✅ Giải 3 đề tổng hợp theo dạng thi cuối khóa
- ✅ Identify điểm yếu, review kịp thời trước buổi 14
- ✅ Lên kế hoạch Project cuối khóa

---

## 🔁 Ôn Tập Toàn Khóa (20 phút)

### Mind Map CSI

```
                          CSI Course
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
    Ch.1 Deep Learning   Ch.2 NLP & LLM      Ch.3 Applied
         │                    │                    │
    ┌────┴────┐          ┌────┴────┐          ┌────┴────┐
    B1 NN    B5 Exam1    B6 NLP    B9 Exam2   B10 Chat  B13 Review
    B2 Keras            B7 Hugging           B11 Detect
    B3 CNN              B8 Deploy            B12 Speech
    B4 Transfer                              B14 Final
```

### Quick Review Flash Cards

**B1:** Neuron = `z = Wx + b` → `a = f(z)` | ReLU hidden, Softmax output  
**B2:** Sequential → compile → fit → evaluate | Loss by problem type  
**B3:** Conv2D = spatial features, few params | Block = Conv→BN→ReLU→Pool→Drop  
**B4:** Feature Extraction → Fine-tuning | Recompile với LR nhỏ hơn 10×  
**B5:** [Kiểm tra - không review mới]  
**B6:** Embedding > One-Hot | LSTM đọc tuần tự | `return_sequences` stacked LSTM  
**B7:** Transformer = parallel + Attention | `pipeline()` 1 dòng | [CLS] embedding  
**B8:** `streamlit run app.py` | `@st.cache_resource` model | session_state  
**B9:** [Kiểm tra]  
**B10:** Messages=[system,user,assistant...] | Few-shot > Zero-shot | No hardcode key  
**B11:** Detection = Classify + Localize | IoU = overlap ratio | YOLOv8 ultralytics  
**B12:** MFCC = audio features | Whisper = best open STT | Audio→MFCC→Model

---

## 📋 Đề Luyện Tập 1 — Computer Vision Pipeline

> **Thời gian:** 25 phút

**Bài 1 (15 điểm):** Xây dựng CNN-Transfer Learning pipeline

```python
# Yêu cầu: CIFAR-10 với Transfer Learning
# Bước 1: Load CIFAR-10 (10000 train, 2000 test — subset để nhanh)
# Bước 2: Resize images lên 96×96 (MobileNetV2 cần >= 32x32)
# Bước 3: Feature Extraction — frozen base + custom head
#   head: Dropout(0.3) → Dense(128, relu) → Dense(10, softmax)
# Bước 4: Train 5 epochs với EarlyStopping(patience=2)
# Bước 5: In test accuracy

# Câu hỏi: Nếu thay MobileNetV2 bằng EfficientNetB0, 
# tham số nào cần thay đổi?
```

**Bài 2 (10 điểm):** Tìm lỗi

```python
# Đoạn code này có 3 lỗi. Tìm và sửa:

import tensorflow as tf
from tensorflow import keras

(X_tr, y_tr), (X_te, y_te) = keras.datasets.cifar10.load_data()
y_tr = y_tr.squeeze()

base = keras.applications.MobileNetV2(
    input_shape=(32,32,3),     # Lỗi 1: ?
    include_top=True,          # Lỗi 2: ?
    weights="imagenet"
)
base.trainable = False

model = keras.Sequential([base, keras.layers.Dense(10)])
model.compile("adam", "sparse_categorical_crossentropy", ["accuracy"])
model.fit(X_tr, y_tr, epochs=10)     # Lỗi 3: ?
```

<details>
<summary>💡 Đáp án</summary>

```
Lỗi 1: input_shape=(32,32,3) quá nhỏ cho MobileNetV2 trong một số version 
        → Khuyến nghị ≥ 96×96 để tránh cảnh báo/lỗi
Lỗi 2: include_top=True giữ lại Dense head 1000 class của ImageNet
        → Phải include_top=False để bỏ head
Lỗi 3: Không có pooling="avg" hoặc Flatten trước Dense
        và không có EarlyStopping
```
</details>

---

## 📋 Đề Luyện Tập 2 — NLP & Deployment

> **Thời gian:** 25 phút

**Bài 1 (15 điểm):** LSTM + Streamlit app

```python
# Phần A: LSTM Model
# Dataset tự tạo: 50 câu tiếng Anh (25 pos, 25 neg)
# 1. Tokenize + pad (maxlen=30)
# 2. Model: Input → Embedding(vocab,32) → LSTM(32) → Dense(1,sigmoid)
# 3. compile + fit 10 epochs
# 4. Test với 3 câu mới

# Phần B: Streamlit Widget Design
# Mô tả (không cần chạy) app.py với:
# - Sidebar chọn: "Text Sentiment" vs "IMDB Review"
# - Text area + submit button
# - Result: color-coded (green/red) với confidence score
# - Session state lưu history 5 predictions cuối
```

**Bài 2 (10 điểm):** OpenAI API Code Review

```python
# Code này có vấn đề gì về performance và security?

import os
from openai import OpenAI

API_KEY = "sk-proj-abc123xyz..."    # from config file
client  = OpenAI(api_key=API_KEY)

def answer_question(question):
    resp = client.chat.completions.create(
        model    = "gpt-4",             # Mỗi câu hỏi
        messages = [{"role":"user","content":question}],
        max_tokens = 2000,
    )
    return resp.choices[0].message.content

# Gọi 100 lần trong vòng lặp
for q in questions_list:   # 100 câu
    print(answer_question(q))
```

<details>
<summary>💡 Đáp án</summary>

```
Security: API key hardcoded → dùng os.environ.get("OPENAI_API_KEY")
Performance: Không có system prompt, không reuse client session
Cost: GPT-4 đắt hơn GPT-3.5-turbo nhiều lần — kiểm tra có cần không
Missing: rate limiting, error handling (RateLimitError, APIError)
Context: 100 lần call riêng → không có conversation context
```
</details>

---

## 📋 Đề Luyện Tập 3 — Multi-Modal Project

> **Thời gian:** 30 phút (có thể làm tiếp ở nhà)

Xây dựng **"AI Content Analyzer"** app:

```
Input: Người dùng upload ảnh + nhập câu hỏi về ảnh
Output: 1) VGG/ResNet classify ảnh → top 3 labels
        2) Whisper hoặc text input mô tả ảnh
        3) Chatbot giải thích kết quả

Tech stack:
├── Streamlit — UI
├── Transfer Learning — image feature extraction
├── Hugging Face BLIP — image captioning (optional)
└── OpenAI API — conversational Q&A
```

**Requirement tối thiểu (để pass):**
- [ ] Streamlit app với file uploader + text input
- [ ] Phân loại ảnh với bất kỳ pretrained model nào
- [ ] Hiển thị top 3 predictions với confidence
- [ ] Tích hợp sentiment/keyword analysis cho text input

**Requirement nâng cao (điểm bonus):**
- [ ] Chatbot follow-up về ảnh
- [ ] Audio description của kết quả (TTS)
- [ ] Deploy lên Streamlit Cloud
- [ ] Clean, professional UI

---

## 🎯 Project Cuối Khóa — Kế Hoạch

> Nộp tại Buổi 14

### Yêu Cầu Chung

| Hạng mục | Mô tả |
|----------|-------|
| **Chủ đề** | Tự chọn — giải quyết 1 vấn đề thực tế bằng AI |
| **Tech** | Ít nhất 2 kỹ thuật từ CSI course |
| **UI** | Streamlit app (hoặc FastAPI) |
| **Code** | Sạch, có comments tiếng Việt |
| **Báo cáo** | 5-10 slide: vấn đề, giải pháp, kết quả |
| **Demo** | 5 phút live demo |

### Gợi Ý Project

1. **AI Tutor Chatbot** — Chatbot dạy học 1 môn cụ thể với knowledge base
2. **Smart CV Analyzer** — Upload CV PDF → Extract thông tin → Score fit với JD
3. **Image Captioning App** — Upload ảnh → Generate mô tả tiếng Việt
4. **News Bias Detector** — Phân tích bias trong bài báo (sentiment + NER)
5. **Audio Diary** — Record → Transcribe → Summary + Sentiment tracking
6. **Product Review Dashboard** — Scrape → Sentiment → Category → Visualization
7. **Code Review Bot** — Paste Python code → AI review bugs + suggestions

---

## 🎯 Tổng Kết

**3 điểm cần nhớ:**
1. **Full pipeline:** Data → Preprocess → Model → Deploy — luôn nghĩ end-to-end
2. **Production code:** Error handling, caching, environment variables
3. **Choose the right tool:** CNN cho ảnh, LSTM/BERT cho NLP, YOLO cho detection

**Buổi tiếp theo (Buổi 14):** Thi cuối khóa + Project Demo.

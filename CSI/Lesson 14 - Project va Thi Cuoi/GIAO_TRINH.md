# 🎯 Buổi 14: Project Cuối Khóa & Thi Cuối Kỳ

> **Khóa:** CSI | **Buổi:** 14/14 | **Thời lượng:** 120 phút

---

## 🎯 Mục Tiêu Buổi Cuối

- ✅ Trình bày và demo project cuối khóa (5 phút/người)
- ✅ Hoàn thành bài thi cuối kỳ 90 phút
- ✅ Nhận feedback cá nhân và định hướng tiếp theo

---

## 📋 Lịch Trình Buổi 14

| Thời gian | Hoạt động |
|-----------|----------|
| 0–20 phút | Project Demo (4 học viên × 5 phút) |
| 20–25 phút | Break + chuẩn bị thi |
| 25–115 phút | Thi cuối kỳ (90 phút) |
| 115–120 phút | Thu bài + wrap up |

---

## 🏆 Tiêu Chí Chấm Project (40 điểm)

| Tiêu chí | Điểm |
|----------|------|
| **Kỹ thuật** — Ít nhất 2 CSI tech, code đúng và chạy được | 15 |
| **UI/UX** — Streamlit/FastAPI, user-friendly, không crash | 10 |
| **Vấn đề thực tế** — Ý tưởng rõ ràng, giải quyết đúng vấn đề | 8 |
| **Trình bày** — Slide rõ ràng, demo live, Q&A | 7 |

---

## 📋 Đề Thi Cuối Kỳ CSI

> **Thời gian:** 90 phút | **Tổng:** 100 điểm | **Mở:** tài liệu học | **Cấm:** ChatGPT

---

### 📌 Phần 1: Lý Thuyết (25 điểm)

**Câu 1 (5đ):** Điền vào bảng so sánh

| | Dense | CNN | LSTM | Transformer |
|-|-------|-----|------|-------------|
| Phù hợp với | ? | ? | ? | ? |
| Xử lý vị trí/thứ tự | ? | ? | ? | ? |
| Số params với input lớn | ? | ? | ? | ? |
| Mô hình tiêu biểu | ? | ? | ? | ? |

**Câu 2 (5đ):** Transfer Learning  
a) Tại sao `base.trainable = False` trong Feature Extraction?  
b) Sau bước fine-tuning, nếu val_accuracy giảm so với feature extraction — điều gì xảy ra?  
c) `include_top=False, pooling="avg"` cho output shape gì với MobileNetV2?

**Câu 3 (5đ):** NLP  
a) "I didn't NOT enjoy the film" — LSTM hay Transformer xử lý tốt hơn? Tại sao?  
b) Giải thích `[CLS]` token trong BERT  
c) Zero-shot vs Few-shot prompting — khi nào dùng cái nào?

**Câu 4 (5đ):** Deployment & Systems  
a) Sự khác nhau `@st.cache_resource` vs `@st.cache_data` — cho ví dụ mỗi cái  
b) Tại sao không hardcode API key trong code? Cách đúng là gì?  
c) `messages=[...]` trong OpenAI API — tại sao phải gửi cả history?

**Câu 5 (5đ):** Computer Vision Applied  
a) Object Detection khác gì Classification?  
b) IoU = 0.6 giữa prediction box và ground truth — đây là True/False Positive với threshold=0.5?  
c) MFCC dùng để làm gì? Liệt kê 3 ứng dụng của audio AI.

---

### 💻 Phần 2: Code (60 điểm)

**Bài 2A (20đ) — CNN Image Classifier từ đầu đến cuối:**

```python
# Dataset: keras.datasets.cifar10
# Yêu cầu:
# 1. Load + normalize (float32 / 255.0)
# 2. CNN model ≥2 blocks: Conv2D → BatchNorm → ReLU → MaxPool → Dropout
#    + Data augmentation (RandomFlip + RandomRotation)
# 3. Compile + EarlyStopping(patience=3) + ModelCheckpoint(best_model.keras)
# 4. Evaluate: test accuracy + per-class accuracy (10 classes)
# 5. Vizualize: 16 test predictions (title màu xanh/đỏ)
```

Tiêu chí:
- Preprocessing đúng: 3đ
- CNN architecture ≥2 blocks: 6đ  
- Data aug + callbacks: 4đ
- Per-class evaluation: 4đ
- Prediction visualization: 3đ

**Bài 2B (20đ) — End-to-End NLP Pipeline:**

```python
# Yêu cầu:
# 1. Dùng TF IMDB dataset hoặc tự tạo 60+ sentences
# 2. Tokenize → padded sequences
# 3. Bidirectional LSTM model
# 4. Train + EarlyStopping
# 5. Classify 5 câu tiếng Anh mới (tự chọn)
# 6. Bonus: Tích hợp Hugging Face pipeline làm "second opinion"
#    và so sánh kết quả 2 model
```

Tiêu chí:
- Data + tokenizer: 4đ
- BiLSTM architecture đúng: 6đ
- Training + metrics: 4đ
- Prediction trên câu mới: 4đ
- HuggingFace bonus: +2đ

**Bài 2C (20đ) — Streamlit + OpenAI Integration:**

```python
# Yêu cầu: File app.py (không cần run, chỉ chấm code)
#
# 1. st.set_page_config với title + icon
# 2. Sidebar: 2 modes — "Image Classifier" + "AI Chatbot"
#
# Mode Image Classifier:
#   - File uploader (jpg, png)
#   - @st.cache_resource load sklearn/keras model
#   - Predict + hiển thị top 3 predictions với progress bars
#   - Lưu history vào st.session_state
#
# Mode AI Chatbot:
#   - Text input + Send button
#   - Gọi OpenAI API với conversation history từ session_state
#   - Hiển thị conversation dạng message bubbles
#   - Nút Clear conversation
#   - try/except cho OpenAI error (APIError, RateLimitError)
```

Tiêu chí:
- Architecture (sidebar, pages): 5đ
- Image classifier mode đầy đủ: 7đ
- Chatbot với session_state: 6đ
- Error handling + cache: 2đ

---

### 📝 Phần 3: Short Analysis (15 điểm)

**Bài 3:** Bạn được giao xây **"AI-powered Hiring Assistant"**:

Yêu cầu:
- Input: CV file (PDF/text) + Job Description text
- Output: Match score (0-100) + detailed feedback

Trả lời các câu sau:
1. **(3đ)** Tech stack của bạn là gì? (pipeline từng bước)
2. **(3đ)** Model nào dùng cho text similarity: TF-IDF+cosine vs BERT embeddings? Tại sao?
3. **(3đ)** Giải thích "match score" sẽ được tính như thế nào?
4. **(3đ)** Vấn đề bias (thiên kiến) trong hiring AI là gì? Làm thế nào để mitigate?
5. **(3đ)** Deploy lên Streamlit Cloud cần những file gì? (liệt kê)

---

## 📊 Bảng Điểm Tổng Kết Buổi 14

| Hạng mục | Điểm |
|----------|------|
| Thi cuối kỳ | 60% |
| Project cuối | 40% |
| **Tổng** | **100%** |

**Xếp loại:**
- ≥ 90: Xuất sắc (A+)  
- 80-89: Giỏi (A)  
- 70-79: Khá (B)  
- 60-69: Trung bình (C)  
- < 60: Cần ôn thêm

---

## ✅ Đáp Án Phần 1

**Câu 1:**

| | Dense | CNN | LSTM | Transformer |
|-|-------|-----|------|-------------|
| Phù hợp | Tabular/vector | Ảnh/2D | Sequential/text | NLP, bất kỳ |
| Vị trí/thứ tự | Không | Spatial | Sequential | Attention (tất cả) |
| Params/input lớn | Rất nhiều | Ít (weight sharing) | Vừa | Nhiều |
| Ví dụ | MLP, FCN | ResNet, YOLO | LSTM, GRU | BERT, GPT |

**Câu 2b:** Overfitting xảy ra trong fine-tuning — fine-tune quá nhiều layers với LR quá cao, phá vỡ pretrained weights

**Câu 2c:** (None, 1280) — Global Average Pooling sau conv base

**Câu 3a:** Transformer — Attention nhìn toàn bộ câu song song, xử lý negation tốt hơn

**Câu 4c:** LLM không có memory built-in — mỗi API call là stateless

**Câu 5b:** True Positive (IoU 0.6 > threshold 0.5)

---

## 🚀 Định Hướng Sau Khóa

**Tiếp theo sau CSI:**

| Path | Gợi ý resource |
|------|---------------|
| **Computer Vision chuyên sâu** | roboflow.com, Detectron2, SAM |
| **NLP/LLM Engineering** | LangChain, RAG, RLHF |
| **MLOps & Production** | MLflow, DVC, Docker, Kubernetes |
| **Research** | Papers With Code, Arxiv |
| **Kaggle Competitions** | kaggle.com — practice với real datasets |

**Cộng đồng:**
- Hugging Face Discord
- Fast.ai forums
- r/MachineLearning
- Viet AI community (Facebook groups)

---

## 🎓 Chúc Mừng Hoàn Thành Khóa CSI!

> *"The best way to predict the future is to create it."*

Bạn đã học:
- 🧠 Neural Networks từ numpy → Keras → Transformers
- 👁️ Computer Vision: CNN → Transfer Learning → Object Detection  
- 📝 NLP: LSTM → BERT → LLM & Chatbot
- 🔊 Audio AI: Whisper, MFCC, classification
- 🚀 Deployment: Streamlit → Cloud

Hành trình AI của bạn mới chỉ bắt đầu. Keep building! 💪

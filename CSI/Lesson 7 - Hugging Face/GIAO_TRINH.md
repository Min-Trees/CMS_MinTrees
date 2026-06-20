# 🎯 Buổi 7: Hugging Face Transformers

> **Khóa:** CSI | **Buổi:** 7/14 | **Thời lượng:** 90 phút  
> **Cài đặt:** `pip install transformers torch datasets`

---

## 🎯 Mục Tiêu

- ✅ Giải thích ý tưởng Attention mechanism
- ✅ Dùng Hugging Face `pipeline()` cho các task NLP phổ biến
- ✅ Load pretrained tokenizer và model từ Hub
- ✅ Trích xuất sentence embeddings và tính semantic similarity

---

## 🔁 Ôn Bài Cũ (10 phút)

1. Tại sao cần padding sequences trước khi đưa vào LSTM?
2. `return_sequences=True` trả gì khác với `return_sequences=False`?
3. Binary crossentropy vs sparse categorical crossentropy — khi nào dùng cái nào?
4. **Mini task:** Viết code tokenize câu "AI is the future" với Keras Tokenizer.

---

## 📖 Kiến Thức 1: Transformer & Attention

### ✅ Giải Thích

**Vấn đề LSTM:** Đọc tuần tự từ trái sang phải — không xử lý song song, khó học long-range dependency.

**Transformer** (2017 — "Attention is All You Need"):
- Xử lý **toàn bộ câu cùng lúc** (không tuần tự)
- **Self-Attention:** Mỗi từ "chú ý" đến các từ khác trong câu

$$\text{Attention}(Q,K,V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

| | RNN/LSTM | Transformer |
|-|----------|-------------|
| Xử lý | Tuần tự | Song song |
| Long-range deps | Khó | Tốt (Attention) |
| Training speed | Chậm | Nhanh (GPU) |
| Model tiêu biểu | LSTM, GRU | BERT, GPT |

**BERT** = Bidirectional Encoder Representations from Transformers  
→ Đọc câu theo cả 2 hướng, hiểu context tốt hơn

### 📌 Self-Attention Example

Câu: "The animal didn't cross the street because **it** was too tired"

BERT tự tìm được "**it**" refer đến "**animal**" (không phải "street") nhờ attention:
```
it → animal (attention score cao)
it → street (attention score thấp)
```

---

## 📖 Kiến Thức 2: Hugging Face Pipeline API

### ✅ Giải Thích

`transformers.pipeline` = 1 dòng code cho hầu hết NLP tasks.  
Hugging Face Hub có hàng nghìn pretrained model miễn phí.

### 💻 Code

```python
from transformers import pipeline

# ── Các pipeline phổ biến ────────────────────────────────────

# 1. Phân tích cảm xúc
sentiment = pipeline("sentiment-analysis")
print(sentiment("This movie is amazing!"))
# [{'label': 'POSITIVE', 'score': 0.9998}]

# 2. Zero-shot classification — không cần fine-tune!
classifier = pipeline("zero-shot-classification",
                       model="facebook/bart-large-mnli")
result = classifier(
    "The economy grew by 5% last quarter.",
    candidate_labels=["finance", "sports", "technology"],
)
print(result["labels"][:2], result["scores"][:2])

# 3. Named Entity Recognition
ner = pipeline("ner", grouped_entities=True)
print(ner("Apple Inc. was founded by Steve Jobs in California."))

# 4. Question Answering
qa = pipeline("question-answering")
print(qa(question="What year was Python created?",
         context="Python was created by Guido van Rossum in 1991."))

# 5. Summarization
summarizer = pipeline("summarization", max_length=50)
long_text  = "..."  # Đoạn văn dài
print(summarizer(long_text))
```

---

## 📖 Kiến Thức 3: Tokenizer & Model Manual

### ✅ Giải Thích

Khi cần kiểm soát nhiều hơn pipeline, dùng `AutoTokenizer` + `AutoModel` trực tiếp.

Tokenizer BERT thêm special tokens:
- `[CLS]` = đầu câu (embedding chứa thông tin toàn câu)
- `[SEP]` = cuối câu / ngăn cách 2 câu

### 💻 Code

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

model_name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer  = AutoTokenizer.from_pretrained(model_name)
model      = AutoModelForSequenceClassification.from_pretrained(model_name)

text   = "Absolutely loved this film!"
inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=128)
print(inputs.keys())           # input_ids, attention_mask
print(inputs["input_ids"])     # Tensor với [CLS], tokens, [SEP]

with torch.no_grad():
    logits = model(**inputs).logits
    probs  = torch.softmax(logits, dim=1)
    label  = model.config.id2label[probs.argmax().item()]
    print(f"Prediction: {label} ({probs.max().item():.3f})")
```

---

## 📖 Kiến Thức 4: Sentence Embeddings & Semantic Search

### ✅ Giải Thích

`[CLS]` token embedding từ BERT = vector đặc trưng của toàn câu.  
Cosine similarity giữa 2 embedding = mức độ tương đồng ngữ nghĩa.

Ứng dụng:
- **Semantic search:** Tìm tài liệu tương tự nhất với query
- **Duplicate detection:** Phát hiện câu trùng lặp
- **Recommendation:** Gợi ý nội dung liên quan

### 💻 Code

```python
from transformers import AutoTokenizer, AutoModel
import torch
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")
model     = AutoModel.from_pretrained("distilbert-base-uncased")
model.eval()

def get_embedding(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=128)
    with torch.no_grad():
        out = model(**inputs)
    return out.last_hidden_state[:, 0, :].numpy()   # [CLS] embedding

# Ví dụ semantic search
query    = "machine learning algorithms"
docs     = [
    "deep learning neural networks",    # Gần
    "weather forecast for tomorrow",    # Xa
    "supervised and unsupervised learning", # Khá gần
]

q_emb  = get_embedding(query)
d_embs = [get_embedding(d) for d in docs]
sims   = [cosine_similarity(q_emb, d)[0][0] for d in d_embs]

print(f"Query: '{query}'")
for doc, sim in sorted(zip(docs, sims), key=lambda x: -x[1]):
    print(f"  [{sim:.3f}] {doc}")
```

---

## 💻 Demo Tổng Hợp

Xem `demo.py` — đầy đủ:
- Pipeline API: sentiment, zero-shot, NER, text generation
- Manual tokenizer + model
- Sentence embeddings + cosine similarity

---

## 📝 Bài Tập Trên Lớp

**🟢 Bài 1 (Dễ):** Pipeline Exploration  
Dùng Pipeline API:  
a) Phân tích 5 câu review phim của riêng bạn, in label + score  
b) Thử `pipeline("fill-mask")` với câu "The [MASK] is the most powerful tool."  
c) Thử NER trên một đoạn tin tức tiếng Anh

**🟡 Bài 2 (Trung Bình):** Semantic Similarity  
a) Tạo 10 câu (mix 2-3 chủ đề: sport, tech, food)  
b) Tính cosine similarity ma trận 10×10  
c) Vẽ heatmap similarity  
d) Clusters hiện ra — có đúng với chủ đề không?

**🔴 Bài 3 (Nâng Cao):** Fine-Tune DistilBERT  
Dùng `datasets` từ Hugging Face:  
a) Load `imdb` dataset  
b) Tokenize với padding/truncation  
c) Fine-tune `distilbert-base-uncased` với `Trainer` API  
d) So sánh accuracy với LSTM buổi 6

---

## 🏠 Bài Tập Về Nhà

**Bài 1:** Vietnamese Sentiment  
Tìm model tiếng Việt trên HuggingFace Hub (search "vietnamese sentiment").  
Test với 10 câu review sản phẩm tiếng Việt.

**Bài 2:** Build Semantic Search  
Tạo nhỏ "search engine":  
- Corpus: 20-30 câu từ Wikipedia  
- Query bất kỳ → trả về top 3 câu liên quan nhất  
- Dùng cosine similarity với embeddings

---

## 🎯 Tổng Kết

**3 điểm cần nhớ:**
1. **Transformer > LSTM** cho NLP nhờ Attention song song + long-range context
2. **`pipeline()`** = 1 dòng cho inference, không cần hiểu internals
3. **[CLS] embedding** = fingerprint của câu — dùng cho search, similarity, classification

**Buổi tiếp theo (Buổi 8):** Streamlit — deploy model AI thành web app trong 30 phút.

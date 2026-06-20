# 🎯 Buổi 10: Chatbot & LLM

> **Khóa:** CSI | **Buổi:** 10/14 | **Thời lượng:** 90 phút  
> **Cài đặt:** `pip install openai streamlit`

---

## 🎯 Mục Tiêu

- ✅ Giải thích LLM là gì và cách Transformer tạo ra văn bản
- ✅ Gọi OpenAI API với `messages` structure đúng
- ✅ Viết prompts hiệu quả (Zero-shot, Few-shot, Chain-of-Thought)
- ✅ Xây chatbot có memory qua conversation history

---

## 🔁 Ôn Bài Cũ (10 phút)

1. `@st.cache_resource` vs `@st.cache_data` — khác nhau gì?
2. `st.session_state` giải quyết vấn đề gì?
3. Cách chạy Streamlit app là lệnh gì?
4. **Mini task:** Viết Streamlit app 10 dòng: text_input + button → hiển thị text.upper().

---

## 📖 Kiến Thức 1: LLM Là Gì?

### ✅ Giải Thích

**LLM (Large Language Model)** = Transformer cực lớn được train trên hàng tỷ trang văn bản để **dự đoán token tiếp theo**.

```
"The cat sat on the" → [the=0.01, mat=0.45, floor=0.20, roof=0.08, ...]
                             ↑ Lựa chọn có xác suất cao nhất
```

**GPT family:** GPT-3.5 (175B params), GPT-4 (1.8T params ước tính)

| Model | Params | Context | Đặc điểm |
|-------|--------|---------|----------|
| GPT-3.5-turbo | 175B | 16K | Nhanh, rẻ |
| GPT-4 | ~1.8T | 128K | Mạnh, đắt |
| GPT-4o | Chưa rõ | 128K | Multimodal |
| Claude | ? | 200K | Dài context |
| Gemini | ? | 1M | Google |

**Emergent abilities** — khi đủ lớn, LLM "tự nhiên" có khả năng:
- Lập luận (reasoning)
- Code generation
- Few-shot learning
- Zero-shot task

---

## 📖 Kiến Thức 2: OpenAI API

### ✅ Giải Thích

API = giao diện trả lời câu hỏi qua HTTP.  
**Messages** structure: mảng messages với 3 roles:
- `system`: Hướng dẫn cho model (persona, constraints)
- `user`: Input của người dùng
- `assistant`: Response của model (thêm vào cho conversation history)

### 💻 Code

```python
from openai import OpenAI
import os

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# ── Basic call ────────────────────────────────────────────────
response = client.chat.completions.create(
    model    = "gpt-3.5-turbo",
    messages = [
        {"role": "system", "content": "Bạn là giảng viên AI thân thiện."},
        {"role": "user",   "content": "Giải thích Gradient Descent bằng tiếng Việt."},
    ],
    max_tokens  = 200,
    temperature = 0.7,   # 0=deterministic, 2=very random
)

# Lấy text response
text = response.choices[0].message.content
print(text)

# Thông tin usage
print(f"Tokens: {response.usage.prompt_tokens} + {response.usage.completion_tokens}")
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ KHÔNG hardcode API key trong code
api_key = "sk-abc123..."
client  = OpenAI(api_key=api_key)    # Security risk!

# ✅ Dùng environment variable
import os
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# ✅ Hoặc dùng .env file với python-dotenv
from dotenv import load_dotenv
load_dotenv()
client = OpenAI()   # Tự đọc OPENAI_API_KEY từ .env
```

---

## 📖 Kiến Thức 3: Prompt Engineering

### ✅ Giải Thích

**Prompt = instruction bạn đưa cho LLM.**  
Prompt tốt → kết quả tốt hơn đáng kể.

| Kỹ thuật | Mô tả | Ví dụ |
|----------|-------|-------|
| **Zero-shot** | Hỏi thẳng, không ví dụ | "Classify: 'Great movie'" |
| **Few-shot** | Cho vài ví dụ trước | "pos: 'I love' → neg: 'I hate' → ?" |
| **Chain-of-Thought** | Yêu cầu giải thích từng bước | "Solve step by step:" |
| **Role prompting** | Gán role cho model | "You are a senior Python developer" |
| **Output format** | Yêu cầu format cụ thể | "Return ONLY valid JSON" |

### 💻 Code

```python
# ── Few-shot ──────────────────────────────────────────────────
few_shot_prompt = """
Phân loại cảm xúc review (positive/negative/neutral):
"Sản phẩm tuyệt vời, giao nhanh" → positive
"Hàng bị hư, rất thất vọng" → negative
"Bình thường, không có gì đặc biệt" → neutral
"Chất lượng vượt mong đợi!" →
"""

# ── Chain-of-Thought ──────────────────────────────────────────
cot_prompt = """
Hãy phân tích từng bước:
Model A: accuracy=95%, train_size=1000 samples
Model B: accuracy=87%, train_size=50000 samples
Câu hỏi: Model nào tốt hơn cho production? Giải thích.
"""

# ── Structured output ─────────────────────────────────────────
json_prompt = """
Trả về JSON với format:
{"models": [{"name": "...", "strength": "...", "weakness": "..."}]}
Liệt kê 3 framework Deep Learning phổ biến.
"""
```

---

## 📖 Kiến Thức 4: Chatbot với Memory

### ✅ Giải Thích

LLM không có memory giữa các calls. Để có "conversation", bạn phải gửi **toàn bộ lịch sử** mỗi lần.

```python
history = [system_message]

# Turn 1
history.append({"role": "user", "content": "TensorFlow là gì?"})
response_1 = api_call(messages=history)
history.append({"role": "assistant", "content": response_1})

# Turn 2 — toàn bộ history được gửi lại
history.append({"role": "user", "content": "PyTorch thì sao?"})
response_2 = api_call(messages=history)   # Model "nhớ" turn 1
```

### 💻 Code

```python
from openai import OpenAI

class ChatBot:
    def __init__(self, system_prompt, model="gpt-3.5-turbo"):
        self.client  = OpenAI()
        self.model   = model
        self.history = [{"role": "system", "content": system_prompt}]

    def chat(self, user_message, max_tokens=200):
        self.history.append({"role": "user", "content": user_message})
        response = self.client.chat.completions.create(
            model      = self.model,
            messages   = self.history,
            max_tokens = max_tokens,
        )
        assistant_msg = response.choices[0].message.content
        self.history.append({"role": "assistant", "content": assistant_msg})
        return assistant_msg

    def reset(self):
        self.history = self.history[:1]  # Giữ system message

# Usage
bot = ChatBot("Bạn là trợ lý AI dạy học lập trình. Trả lời ngắn gọn bằng tiếng Việt.")
print(bot.chat("TensorFlow là gì?"))
print(bot.chat("Nó khác PyTorch không?"))
print(bot.chat("Tôi nên học cái nào trước?"))
```

---

## 💻 Demo Tổng Hợp

Xem `demo.py`:
- Basic API call  
- Prompt engineering 3 styles  
- Chatbot với memory  
- Structured JSON output  
- Fallback rule-based bot (không cần API key)

---

## 📝 Bài Tập Trên Lớp

**🟢 Bài 1 (Dễ):** System Prompt Design  
Tạo chatbot với system prompt cho từng vai trò:  
a) "Giảng viên Toán cấp 3 kiên nhẫn"  
b) "Senior Python Developer thích chỉ ra bugs"  
c) So sánh cách chúng trả lời cùng 1 câu hỏi

**🟡 Bài 2 (Trung Bình):** Prompt Techniques  
Bài toán: Phân loại email spam/not spam  
a) Zero-shot prompt → test 5 email samples  
b) Few-shot với 3 ví dụ → test lại 5 email đó  
c) Output format JSON: `{"label": "spam", "confidence": 0.9}`  
d) So sánh kết quả

**🔴 Bài 3 (Nâng Cao):** Streamlit Chatbot  
Xây dựng Streamlit chatbot app:  
a) `st.session_state` lưu conversation history  
b) Input box + nút Send  
c) Hiển thị conversation dạng chat bubbles  
d) Nút "Reset conversation"  
e) Chọn system prompt từ dropdown (Student, Developer, Chef...)

---

## 🏠 Bài Tập Về Nhà

**Bài 1:** RAG đơn giản  
Chuẩn bị 10 "documents" (đoạn văn ngắn về Python).  
Dùng embeddings tìm document liên quan nhất với query.  
Thêm context vào prompt trước khi gọi LLM.  
*(Retrieval-Augmented Generation)*

**Bài 2:** Chatbot chuyên sâu  
Xây chatbot có personality riêng: tên, phong cách trả lời, chủ đề expertise.  
Deploy lên Streamlit Cloud, share link.

---

## 🎯 Tổng Kết

**3 điểm cần nhớ:**
1. **Messages = [system, user, assistant...]** — LLM không có memory, phải gửi history mỗi lần
2. **Prompt engineering quan trọng** — same model, better prompt = better results
3. **KHÔNG hardcode API key** — luôn dùng environment variables

**Buổi tiếp theo (Buổi 11):** Object Detection — YOLO, bounding boxes, real-time detection.

"""
CSI Buổi 10 — Chatbot & LLM
Demo: OpenAI API conversation + Prompt Engineering
"""
import os
import json

print("=== Chatbot & LLM Demo ===\n")

# ── Kiểm tra API key ─────────────────────────────────────────
api_key = os.environ.get("OPENAI_API_KEY", "")

try:
    from openai import OpenAI

    if not api_key:
        print("⚠️  OPENAI_API_KEY chưa được set.")
        print("   Set bằng: export OPENAI_API_KEY='sk-...'")
        print("   Chạy fallback demo (không cần API key)...\n")
        raise ValueError("No API key")

    client = OpenAI(api_key=api_key)

    # ── 1. Basic Completion ──────────────────────────────────────
    print("--- 1. Basic Completion ---")
    response = client.chat.completions.create(
        model    = "gpt-3.5-turbo",
        messages = [
            {"role": "system",  "content": "You are a helpful AI tutor for high school students."},
            {"role": "user",    "content": "Explain what a neural network is in 2 sentences."},
        ],
        max_tokens   = 100,
        temperature  = 0.7,
    )
    print(response.choices[0].message.content)

    # ── 2. Prompt Engineering Examples ─────────────────────────
    print("\n--- 2. Prompt Engineering ---")

    prompts = {
        "Zero-shot": "Classify the sentiment: 'This product is fantastic!'",
        "Few-shot":  ("Classify sentiment (positive/negative):\n"
                      "'I love this' → positive\n"
                      "'Waste of money' → negative\n"
                      "'This is amazing!' → "),
        "Chain-of-Thought": ("Solve step by step: If a model has 94% accuracy on 1000 test samples, "
                             "how many samples does it get wrong?"),
    }

    for style, prompt in prompts.items():
        print(f"\n[{style}]")
        print(f"Prompt: {prompt[:80]}...")
        resp = client.chat.completions.create(
            model    = "gpt-3.5-turbo",
            messages = [{"role": "user", "content": prompt}],
            max_tokens = 80,
        )
        print(f"Response: {resp.choices[0].message.content}")

    # ── 3. Chatbot với Memory ────────────────────────────────────
    print("\n--- 3. Chatbot với Conversation History ---")

    conversation = [
        {"role": "system", "content": "You are MindX AI tutor. Answer in Vietnamese. Be concise."}
    ]

    questions = [
        "TensorFlow là gì?",
        "Nó khác với PyTorch như thế nào?",
        "Cái nào tốt hơn cho người mới học?",
    ]

    for q in questions:
        conversation.append({"role": "user", "content": q})
        resp = client.chat.completions.create(
            model    = "gpt-3.5-turbo",
            messages = conversation,
            max_tokens = 100,
        )
        answer = resp.choices[0].message.content
        conversation.append({"role": "assistant", "content": answer})
        print(f"\n👤 User: {q}")
        print(f"🤖 Bot: {answer}")

    # ── 4. Structured Output ────────────────────────────────────
    print("\n--- 4. Structured Output (JSON) ---")
    resp = client.chat.completions.create(
        model    = "gpt-3.5-turbo",
        messages = [
            {"role": "system", "content": "Return ONLY valid JSON, no explanation."},
            {"role": "user",   "content": "List 3 popular ML frameworks with language and creator."},
        ],
        max_tokens   = 200,
        response_format = {"type": "json_object"},
    )
    data = json.loads(resp.choices[0].message.content)
    print(json.dumps(data, indent=2))

    print("\n✅ OpenAI API demo hoàn tất!")

except (ImportError, ValueError, Exception) as e:
    if "No API key" not in str(e) and "OPENAI_API_KEY" not in str(e):
        print(f"Lỗi: {e}")

    # ── Fallback: Simulation demo ─────────────────────────────
    print("\n=== FALLBACK: Chatbot Demo (không cần API) ===\n")

    # Mô phỏng conversation với rule-based chatbot
    class SimpleRuleBasedChatbot:
        def __init__(self, name="MindX Bot"):
            self.name        = name
            self.history     = []
            self.topic_memory = {}

        def respond(self, user_input):
            user_input_lower = user_input.lower()
            self.history.append(("user", user_input))

            # Rule-based responses
            if any(w in user_input_lower for w in ["xin chào", "hello", "hi"]):
                response = f"Xin chào! Tôi là {self.name}, trợ lý AI. Bạn cần giúp gì về AI/ML?"
            elif "tensorflow" in user_input_lower:
                response = "TensorFlow là framework Deep Learning của Google. Dùng cho production và mobile (TF Lite)."
            elif "pytorch" in user_input_lower:
                response = "PyTorch là framework ML của Meta/Facebook. Được ưa chuộng trong nghiên cứu."
            elif "khác nhau" in user_input_lower or "difference" in user_input_lower:
                response = "TF tốt cho deployment, PyTorch tốt cho research. Cả hai đều mạnh."
            elif "lstm" in user_input_lower:
                response = "LSTM (Long Short-Term Memory) là mạng RNN cải tiến, tốt cho dữ liệu tuần tự."
            elif "cnn" in user_input_lower:
                response = "CNN (Convolutional Neural Network) dùng cho ảnh, học spatial features qua Conv2D."
            elif "?" in user_input:
                response = "Câu hỏi hay! Tôi là chatbot đơn giản nên không biết câu trả lời chính xác. Hãy search Google hoặc dùng GPT-4!"
            else:
                response = f"Tôi hiểu bạn đang nói về: '{user_input[:30]}...'. Hãy hỏi cụ thể hơn về AI/ML!"

            self.history.append(("bot", response))
            return response

    bot = SimpleRuleBasedChatbot()
    conversation_demo = [
        "Xin chào!",
        "TensorFlow là gì?",
        "Nó khác với PyTorch như thế nào?",
        "LSTM dùng khi nào?",
    ]

    print("Conversation demo:\n" + "─"*50)
    for msg in conversation_demo:
        print(f"👤 User: {msg}")
        resp = bot.respond(msg)
        print(f"🤖 Bot:  {resp}\n")

    print(f"Conversation history: {len(bot.history)} turns")
    print("\n💡 Cài OpenAI: pip install openai")
    print("💡 Cần API key từ: platform.openai.com")

"""
CSI Buổi 7 — Hugging Face Transformers
Demo: Pipeline API + Text Classification với DistilBERT
"""
import os
import numpy as np

print("=== Hugging Face Transformers Demo ===\n")

try:
    from transformers import pipeline

    # ── 1. Pipeline API — Zero-shot usage ───────────────────────────
    print("--- 1. Sentiment Analysis Pipeline ---")
    sentiment = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

    texts = [
        "This movie is absolutely fantastic!",
        "I wasted two hours watching this garbage.",
        "The story was okay but quite predictable.",
    ]
    results = sentiment(texts)
    for t, r in zip(texts, results):
        print(f"  [{r['label']:8} {r['score']:.3f}] {t}")

    # ── 2. Các pipeline có sẵn ──────────────────────────────────────
    print("\n--- 2. Zero-Shot Classification ---")
    classifier = pipeline("zero-shot-classification",
                          model="facebook/bart-large-mnli")
    text     = "SpaceX launched its newest rocket last night."
    labels   = ["technology", "sports", "politics", "science"]
    result   = classifier(text, candidate_labels=labels)
    print(f"  Text: {text}")
    for lbl, sc in zip(result["labels"], result["scores"]):
        print(f"    {lbl:12}: {sc:.3f}")

    # ── 3. Text Generation ──────────────────────────────────────────
    print("\n--- 3. Text Generation (GPT-2) ---")
    generator = pipeline("text-generation", model="gpt2", max_new_tokens=50)
    prompt    = "Once upon a time in a land of AI,"
    gen_out   = generator(prompt, num_return_sequences=1)
    print(f"  Prompt: {prompt}")
    print(f"  Generated: {gen_out[0]['generated_text']}")

    # ── 4. Named Entity Recognition ─────────────────────────────────
    print("\n--- 4. Named Entity Recognition ---")
    ner = pipeline("ner", grouped_entities=True)
    text_ner = "Elon Musk founded Tesla in Palo Alto, California."
    entities = ner(text_ner)
    print(f"  Text: {text_ner}")
    for e in entities:
        print(f"    [{e['entity_group']:5}] '{e['word']}' (score={e['score']:.2f})")

    # ── 5. Tokenizer demo ────────────────────────────────────────────
    print("\n--- 5. Tokenizer (DistilBERT) ---")
    from transformers import AutoTokenizer, AutoModel
    import torch

    tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")
    sample    = "Deep learning is transforming the world."
    tokens    = tokenizer(sample, return_tensors="pt", padding=True, truncation=True)
    print(f"  Input text: '{sample}'")
    print(f"  Token IDs: {tokens['input_ids'][0].tolist()}")
    decoded   = tokenizer.decode(tokens['input_ids'][0])
    print(f"  Decoded: {decoded}")

    # ── 6. Feature extraction (embeddings) ─────────────────────────
    print("\n--- 6. Sentence Embeddings ---")
    model  = AutoModel.from_pretrained("distilbert-base-uncased")
    model.eval()
    with torch.no_grad():
        outputs = model(**tokens)
    cls_embedding = outputs.last_hidden_state[:, 0, :]  # [CLS] token
    print(f"  Embedding shape: {cls_embedding.shape}")   # (1, 768)

    # Tính cosine similarity giữa 2 câu
    from sklearn.metrics.pairwise import cosine_similarity

    sentences_pair = [
        "I love machine learning.",
        "I enjoy deep learning.",
        "The weather is nice today.",
    ]
    embeddings = []
    for sent in sentences_pair:
        tok = tokenizer(sent, return_tensors="pt", truncation=True)
        with torch.no_grad():
            out = model(**tok)
        emb = out.last_hidden_state[:, 0, :].numpy()
        embeddings.append(emb)

    sim_12 = cosine_similarity(embeddings[0], embeddings[1])[0][0]
    sim_13 = cosine_similarity(embeddings[0], embeddings[2])[0][0]
    print(f"\n  '{sentences_pair[0]}'")
    print(f"  ↔ '{sentences_pair[1]}': similarity={sim_12:.3f}")
    print(f"  ↔ '{sentences_pair[2]}': similarity={sim_13:.3f}")

    print("\n✅ Demo Hugging Face hoàn tất!")

except ImportError as e:
    print(f"Transformers chưa cài: {e}")
    print("Cài đặt: pip install transformers torch")
    print("\nFallback: TF-IDF Sentiment demo")
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.linear_model import LogisticRegression
    from sklearn.pipeline import Pipeline as SkPipeline

    texts_train = [
        "great movie loved it",   "terrible waste of time",
        "fantastic film highly recommended",  "boring and predictable",
        "amazing story wonderful cast",  "awful plot bad acting",
        "best film this year",   "disappointing not worth watching",
    ]
    labels = [1, 0, 1, 0, 1, 0, 1, 0]

    clf = SkPipeline([
        ("tfidf", TfidfVectorizer()),
        ("lr",    LogisticRegression()),
    ])
    clf.fit(texts_train, labels)

    test_texts = ["this was amazing", "really bad movie", "pretty good story"]
    preds = clf.predict(test_texts)
    for t, p in zip(test_texts, preds):
        label = "POSITIVE" if p == 1 else "NEGATIVE"
        print(f"  [{label}] {t}")

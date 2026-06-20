# 🎯 Buổi 12: Speech & Audio AI

> **Khóa:** CSI | **Buổi:** 12/14 | **Thời lượng:** 90 phút  
> **Cài đặt:** `pip install openai-whisper librosa soundfile`

---

## 🎯 Mục Tiêu

- ✅ Mô tả audio signal: waveform, sample rate, bit depth
- ✅ Trình bày Spectrogram và MFCC — ý nghĩa mỗi loại
- ✅ Dùng Whisper để transcribe audio sang text
- ✅ Xây dựng audio classification pipeline đơn giản

---

## 🔁 Ôn Bài Cũ (10 phút)

1. YOLO xử lý grid ảnh như thế nào?
2. IoU = 0.8 nghĩa là gì về 2 bounding boxes?
3. mAP50 là gì?
4. **Mini task:** Viết công thức IoU bằng code Python (4 dòng).

---

## 📖 Kiến Thức 1: Audio Signal Basics

### ✅ Giải Thích

Âm thanh = sóng áp suất không khí → microphone chuyển thành điện → số hóa thành mảng số.

**Sample Rate (SR):** Số mẫu/giây
- CD Quality: 44100 Hz (nghe được 20Hz–20kHz)
- Speech: 16000 Hz thường dùng cho speech models
- librosa default: 22050 Hz

**Bit Depth:** Độ chính xác mỗi mẫu (16-bit thường dùng)

```
audio_array = [0.003, -0.011, 0.045, -0.021, ...]
               ├──── duration × SR điểm ────┤
```

### 💻 Code

```python
import numpy as np
import librosa

# Load audio file
audio, sr = librosa.load("speech.wav", sr=None)   # sr=None giữ rate gốc
audio, sr = librosa.load("speech.wav", sr=16000)  # Resample về 16kHz

print(f"Sample rate: {sr}")
print(f"Duration: {len(audio)/sr:.2f}s")
print(f"Samples: {len(audio)}")

# Tạo audio từ code (sine wave)
t     = np.linspace(0, 1.0, sr, endpoint=False)
audio = np.sin(2 * np.pi * 440 * t)   # 440 Hz sine wave (A4)
```

---

## 📖 Kiến Thức 2: Spectrogram & MFCC

### ✅ Giải Thích

**Waveform** = amplitude vs time  
**Spectrogram** = frequency vs time (intensity = năng lượng)  
**MFCC** = Mel-Frequency Cepstral Coefficients — đặc trưng ngữ âm học

Tại sao dùng MFCC thay Spectrogram?
- Mel scale = xấp xỉ cách tai người nghe (phi tuyến, nhạy hơn ở tần số thấp)
- MFCC compact hơn (13-40 coefficients vs toàn spectrogram)

### 💻 Code

```python
import librosa
import librosa.display
import matplotlib.pyplot as plt
import numpy as np

audio, sr = librosa.load("audio.wav", sr=22050)

# ── Spectrogram ────────────────────────────────────────────────
D = librosa.stft(audio, n_fft=2048, hop_length=512)   # Complex STFT
S_db = librosa.amplitude_to_db(np.abs(D), ref=np.max)  # To dB

# ── Mel Spectrogram ────────────────────────────────────────────
M = librosa.feature.melspectrogram(y=audio, sr=sr, n_mels=128)
M_db = librosa.power_to_db(M, ref=np.max)

# ── MFCC ──────────────────────────────────────────────────────
mfcc = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13)
# Shape: (13, n_frames) — 13 coefficients per frame

# Plot
fig, axes = plt.subplots(3, 1, figsize=(12, 9))
librosa.display.specshow(S_db,   sr=sr, x_axis="time", y_axis="hz",  ax=axes[0])
librosa.display.specshow(M_db,   sr=sr, x_axis="time", y_axis="mel", ax=axes[1])
librosa.display.specshow(mfcc,   sr=sr, x_axis="time",               ax=axes[2])
axes[0].set_title("Spectrogram (STFT)")
axes[1].set_title("Mel Spectrogram")
axes[2].set_title("MFCC (13 coefficients)")
plt.tight_layout(); plt.savefig("audio_features.png")
```

---

## 📖 Kiến Thức 3: Whisper — Speech-to-Text

### ✅ Giải Thích

**Whisper** (OpenAI, 2022) = Transformer được train trên 680K giờ audio đa ngôn ngữ.  
- Hỗ trợ 99 ngôn ngữ (bao gồm tiếng Việt)
- Tự detect ngôn ngữ
- Miễn phí, chạy local

| Model | Params | Speed (RTF) | WER (English) |
|-------|--------|-------------|--------------|
| tiny | 39M | ~32x | 5.7% |
| base | 74M | ~16x | 4.2% |
| small | 244M | ~6x | 3.0% |
| medium | 769M | ~2x | 2.6% |
| large-v3 | 1550M | ~1x | 2.0% |

RTF = Real-Time Factor (32x = transcribe 1 phút trong ~2 giây)

### 💻 Code

```python
import whisper

# Load model (tự download lần đầu)
model = whisper.load_model("base")

# Transcribe — tự detect ngôn ngữ
result = model.transcribe("audio.mp3")
print(result["text"])
print(result["language"])

# Force ngôn ngữ cụ thể
result = model.transcribe("audio.mp3", language="vi")   # Tiếng Việt
result = model.transcribe("audio.mp3", language="en")   # English

# Word-level timestamps
result = model.transcribe("audio.mp3", word_timestamps=True)
for segment in result["segments"]:
    print(f"[{segment['start']:.1f}s – {segment['end']:.1f}s] {segment['text']}")

# Translate sang English từ bất kỳ ngôn ngữ
result = model.transcribe("audio_vi.mp3", task="translate")
print(result["text"])   # English translation
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Audio quá ngắn (<1s) → kết quả tệ
result = model.transcribe(very_short_clip)

# ✅ Nối audio nếu cần, hoặc dùng segment
import librosa, soundfile as sf
y, sr = librosa.load("clip.wav", sr=16000)
if len(y) / sr < 1.0:
    y = librosa.util.fix_length(y, size=sr)   # Pad to 1s
sf.write("padded.wav", y, sr)
```

---

## 📖 Kiến Thức 4: Audio Classification Pipeline

### ✅ Giải Thích

MFCC → CNN hoặc LSTM để phân loại:

```
Audio → Waveform → MFCC (13×frames) → 2D CNN → Class Label
                                     hoặc
                                   → LSTM    → Class Label
```

### 💻 Code

```python
import librosa, numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

def extract_features(file_path, n_mfcc=13):
    y, sr = librosa.load(file_path, sr=22050, duration=3.0)
    mfcc  = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc)
    # Dùng statistics để có fixed-size vector
    return np.concatenate([mfcc.mean(1), mfcc.std(1)])  # (26,)

# Train classifier
files  = ["dog.wav", "cat.wav", "bird.wav"] * 20  # Demo
labels = [0, 1, 2] * 20

X      = np.array([extract_features(f) for f in files])
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

from sklearn.model_selection import train_test_split
X_tr, X_te, y_tr, y_te = train_test_split(X_scaled, labels, test_size=0.2)
clf = SVC(kernel="rbf", C=10)
clf.fit(X_tr, y_tr)
print(f"Accuracy: {clf.score(X_te, y_te):.3f}")
```

---

## 💻 Demo Tổng Hợp

Xem `demo.py`:
- Tạo synthetic audio (sine waves + noise)
- Visualize waveform + spectrogram + MFCC
- Whisper STT (nếu có) hoặc concept explanation
- Audio classification với freq-based features

---

## 📝 Bài Tập Trên Lớp

**🟢 Bài 1 (Dễ):** Synthetic Audio  
a) Tạo 3 sine waves với tần số khác nhau (200, 440, 800 Hz)  
b) Vẽ waveform cả 3 trên subplot  
c) Tính "dominant frequency" từ FFT

**🟡 Bài 2 (Trung Bình):** Whisper Transcription  
a) Record 30 giây đọc một đoạn văn (hoặc download audio từ YouTube)  
b) Transcribe bằng Whisper base model  
c) So sánh transcript với text gốc, đếm số lỗi  
d) Thử `task="translate"` nếu audio tiếng Việt

**🔴 Bài 3 (Nâng Cao):** Audio Classifier  
Dataset: UrbanSound8K (free, Google) — 8732 clips, 10 environmental sounds  
a) Extract MFCC features cho tất cả clips  
b) Train Random Forest classifier  
c) Report accuracy và confusion matrix  
d) Deploy thành Streamlit app cho upload + classify

---

## 🏠 Bài Tập Về Nhà

**Bài 1:** Meeting Summarizer  
Ghi âm/download 5 phút meeting (hoặc bài giảng).  
a) Transcribe bằng Whisper  
b) Dùng OpenAI API tóm tắt transcript trong 100 từ  
c) Extract key points (3-5 bullet)

**Bài 2:** Voice Command App  
Xây Streamlit app:  
- Record 3 giây → Whisper transcribe → match với commands  
- Commands: "open chrome", "play music", "what time is it"

---

## 🎯 Tổng Kết

**3 điểm cần nhớ:**
1. **MFCC** = đặc trưng âm học tiêu chuẩn — 13 coefficients, capture ngữ âm
2. **Whisper** = best open-source STT — chạy local, 99 ngôn ngữ, miễn phí
3. **Pipeline:** Audio → Features (MFCC/Spectrogram) → Model — giống ảnh nhưng 1D→2D

**Buổi tiếp theo (Buổi 13):** Luyện tập giải đề tổng hợp — review toàn bộ CSI trước khi thi cuối.

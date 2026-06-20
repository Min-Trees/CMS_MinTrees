"""
CSI Buổi 12 — Speech & Audio AI
Demo: Waveforms, Spectrogram, MFCC, Whisper STT
"""
import os
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

os.makedirs("output", exist_ok=True)

print("=== Speech & Audio AI Demo ===\n")

# ── 1. Tạo audio giả bằng numpy (không cần microphone) ──────
print("--- 1. Synthetic Audio Signals ---")
sr    = 22050    # Sample rate: 22050 Hz
dur   = 2.0      # 2 giây
t     = np.linspace(0, dur, int(sr * dur), endpoint=False)

# Giọng nói đơn giản = mix nhiều sine waves
f0, f1, f2 = 220.0, 440.0, 660.0   # A3, A4, E5
audio  = (0.5 * np.sin(2 * np.pi * f0 * t) +
          0.3 * np.sin(2 * np.pi * f1 * t) +
          0.2 * np.sin(2 * np.pi * f2 * t))
audio += 0.02 * np.random.randn(len(t))   # Thêm noise
print(f"  Audio shape: {audio.shape} | Duration: {dur}s | SR: {sr}Hz")

# ── 2. Waveform Plot ─────────────────────────────────────────
fig, axes = plt.subplots(3, 1, figsize=(12, 9))

# Waveform
axes[0].plot(t[:sr//4], audio[:sr//4], lw=0.8)  # Hiển thị 0.25s đầu
axes[0].set_title("Waveform (0.25s đầu)", fontsize=12)
axes[0].set_xlabel("Time (s)"); axes[0].set_ylabel("Amplitude")
axes[0].grid(alpha=0.3)

# ── 3. Spectrogram (Short-Time Fourier Transform) ────────────
print("\n--- 2. Spectrogram (STFT) ---")
from numpy.fft import rfft

n_fft   = 2048
hop_len = 512
frames  = []
for start in range(0, len(audio) - n_fft, hop_len):
    frame_data = audio[start:start+n_fft]
    window     = np.hanning(n_fft)
    spectrum   = np.abs(rfft(frame_data * window))
    frames.append(spectrum)
spec = np.array(frames).T                    # (freq, time)
spec_db = 20 * np.log10(spec + 1e-10)       # To dB

axes[1].imshow(spec_db, aspect="auto", origin="lower",
               extent=[0, dur, 0, sr/2/1000])
axes[1].set_title("Spectrogram (STFT)", fontsize=12)
axes[1].set_xlabel("Time (s)"); axes[1].set_ylabel("Frequency (kHz)")
axes[1].set_ylim(0, 5)  # Hiển thị 0-5kHz

# ── 4. MFCC (Mel-Frequency Cepstral Coefficients) ────────────
print("--- 3. MFCC Features ---")
try:
    import librosa

    mfcc = librosa.feature.mfcc(y=audio.astype(np.float32), sr=sr, n_mfcc=13)
    librosa.display.specshow(mfcc, x_axis="time", sr=sr, ax=axes[2])
    axes[2].set_title("MFCC (13 coefficients)", fontsize=12)
    axes[2].set_ylabel("MFCC coefficient")
    print(f"  MFCC shape: {mfcc.shape}")  # (13, frames)

except ImportError:
    # Fallback: discrete cosine transform thủ công
    def mfcc_manual(y, sr, n_mfcc=13, n_fft=2048, hop=512, n_mels=40):
        frames = []
        for s in range(0, len(y)-n_fft, hop):
            f = y[s:s+n_fft] * np.hanning(n_fft)
            frames.append(np.abs(rfft(f)))
        spec = np.array(frames).T
        # Mel filterbank (simplified)
        mel = np.dot(np.random.rand(n_mels, spec.shape[0]), spec)
        log_mel = np.log(mel + 1e-10)
        # DCT
        from scipy.fft import dct
        mfcc_ = dct(log_mel, type=2, axis=0, norm="ortho")[:n_mfcc]
        return mfcc_

    try:
        mfcc = mfcc_manual(audio, sr)
        axes[2].imshow(mfcc, aspect="auto", origin="lower")
        axes[2].set_title("MFCC (manual, 13 coefficients)")
    except Exception:
        axes[2].text(0.5, 0.5, "librosa not installed\npip install librosa",
                     ha="center", va="center", transform=axes[2].transAxes)
        axes[2].set_title("MFCC (install librosa)")

plt.tight_layout()
plt.savefig("output/audio_viz.png", dpi=100)
plt.close()
print("  Saved: output/audio_viz.png")

# ── 5. Whisper Demo ──────────────────────────────────────────
print("\n--- 4. Whisper Speech-to-Text ---")
try:
    import whisper
    print("  Whisper available! Loading base model...")
    model = whisper.load_model("base")

    # Cần file audio để detect
    import tempfile, soundfile as sf
    tmp_path = tempfile.mktemp(suffix=".wav")
    sf.write(tmp_path, audio, sr)

    result = model.transcribe(tmp_path, language="en")
    print(f"  Transcription: '{result['text']}'")
    print(f"  Language detected: {result.get('language', 'unknown')}")
    os.unlink(tmp_path)

except ImportError:
    print("  Whisper không có sẵn. Cài: pip install openai-whisper")
    print("  Các khả năng của Whisper:")
    features = {
        "whisper.load_model('tiny')":  "39M params, fastest",
        "whisper.load_model('base')":  "74M params",
        "whisper.load_model('small')": "244M params",
        "whisper.load_model('medium')":"769M params",
        "whisper.load_model('large')": "1550M params, most accurate",
    }
    for model_name, desc in features.items():
        print(f"    {model_name:35}: {desc}")
    print("\n  Ví dụ code:")
    print("    result = model.transcribe('audio.mp3', language='vi')")
    print("    print(result['text'])  # Text transcription")

# ── 6. Audio Classification Concept ─────────────────────────
print("\n--- 5. Audio Classification Pipeline ---")
print("""
  Audio file → Waveform → Features → Model → Class
                              │
                        ┌─────┴──────┐
                        │            │
                    Spectrogram     MFCC
                        │            │
                    (CNN input)  (LSTM/SVM input)

  Ứng dụng:
    - Speech command recognition (Alexa "Hey Alexa")
    - Speaker identification
    - Emotion recognition from speech
    - Music genre classification
    - Environmental sound detection (gunshot, alarm...)
""")

# Sklearn demo: classify simple audio features
print("  Demo: Classify audio by dominant frequency")
np.random.seed(0)

def create_audio_sample(base_freq, sr=22050, dur=0.5):
    t = np.linspace(0, dur, int(sr*dur))
    y = (np.sin(2*np.pi*base_freq*t) + 0.1*np.random.randn(len(t)))
    frames = []
    for s in range(0, len(y)-512, 512):
        f = np.abs(rfft(y[s:s+512]))
        frames.append(f[:20])  # First 20 freq bins as features
    return np.mean(frames, axis=0)

# Classes: low (200Hz), mid (440Hz), high (880Hz)
X, y_labels = [], []
for freq, label in [(200, 0), (440, 1), (880, 2)]:
    for _ in range(30):
        noise = np.random.uniform(0.9, 1.1)
        X.append(create_audio_sample(freq * noise))
        y_labels.append(label)

X = np.array(X); y_labels = np.array(y_labels)

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

X_tr, X_te, y_tr, y_te = train_test_split(X, y_labels, test_size=0.3, random_state=0)
clf = RandomForestClassifier(n_estimators=50, random_state=0)
clf.fit(X_tr, y_tr)
acc = accuracy_score(y_te, clf.predict(X_te))
print(f"  Frequency classifier accuracy: {acc:.3f}")

print("\n✅ Audio demo complete! Output saved to output/")
import shutil; shutil.rmtree("output")

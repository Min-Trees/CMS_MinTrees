# 🎯 Buổi 4: Transfer Learning

> **Khóa:** CSI | **Buổi:** 4/14 | **Thời lượng:** 90 phút  
> **Cài đặt:** `pip install tensorflow`

---

## 🎯 Mục Tiêu

Sau buổi này học viên có thể:
- ✅ Giải thích ý tưởng và lợi ích của Transfer Learning
- ✅ Load pretrained model MobileNetV2 với `include_top=False`
- ✅ Đóng băng base model và train custom head (Feature Extraction)
- ✅ Mở freeze từng phần và fine-tune với LR nhỏ
- ✅ So sánh accuracy trước/sau fine-tuning

---

## 🔁 Ôn Bài Cũ (10 phút)

1. Sự khác nhau giữa Conv2D và Dense khi xử lý ảnh là gì?
2. `padding="same"` giữ kích thước feature map như thế nào?
3. BatchNormalization giải quyết vấn đề gì trong training?
4. **Mini task:** Viết 3 lớp CNN block chuẩn (Conv → BN → ReLU → MaxPool → Dropout).

---

## 📖 Kiến Thức 1: Transfer Learning Là Gì?

### ✅ Giải Thích

Khi học lái ô tô, bạn không cần học lại từ đầu các kỹ năng như nhìn đường, nhận tín hiệu đèn giao thông (kỹ năng từ đi xe đạp/xe máy). Bạn chỉ cần học thêm kỹ năng **đặc trưng của ô tô**.

Transfer Learning hoạt động tương tự:
- **Pretrained model** (MobileNetV2, ResNet50...) đã học nhận biết edges, textures, shapes từ 1.2M ảnh ImageNet
- Bạn chỉ cần **thêm classifier head** cho task cụ thể của mình

```
ImageNet (1.2M ảnh, 1000 class)
        │
        ▼
  MobileNetV2 Base               ← Đã train, "biết" feature ảnh
  (conv layers... 155 lớp)
        │
        ▼ (trích xuất features)
  Custom Head                    ← Bạn train từ đầu
  Dense(128) → Dense(10)         ← Cho 10 class của bạn
```

### 📌 So Sánh

| | Train từ đầu (Scratch) | Transfer Learning |
|-|------------------------|------------------|
| **Dữ liệu cần** | Hàng triệu mẫu | Hàng trăm mẫu |
| **Thời gian train** | Ngày/tuần | Giờ/phút |
| **Kết quả với ít data** | Overfit nặng | Tốt |
| **Khi nào dùng** | Dataset rất khác ImageNet | Hầu hết bài toán ảnh |

---

## 📖 Kiến Thức 2: Load Pretrained Model

### ✅ Giải Thích

Keras có sẵn nhiều pretrained models: MobileNetV2, VGG16, ResNet50, EfficientNet...

**`include_top=False`** = bỏ lớp Dense head gốc (1000 class ImageNet), chỉ lấy conv base.

**`pooling="avg"`** = thêm Global Average Pooling sau conv base → output shape (batch, features).

### 💻 Code

```python
from tensorflow import keras

# Load MobileNetV2 — nhẹ (~14MB), nhanh, phù hợp production
base = keras.applications.MobileNetV2(
    input_shape = (96, 96, 3),   # ảnh RGB, ≥32×32
    include_top = False,          # Bỏ Dense head 1000 class
    weights     = "imagenet",     # Download weights pretrained
    pooling     = "avg",          # Global Average Pooling
)

# Xem kiến trúc
print(f"Số lớp: {len(base.layers)}")      # 155 lớp
print(f"Output shape: {base.output_shape}")  # (None, 1280)

# Các lựa chọn model khác:
# keras.applications.VGG16(...)           — 138M params (nặng)
# keras.applications.ResNet50(...)        — 25M params
# keras.applications.EfficientNetB0(...) — 5.3M params (khuyến nghị)
# keras.applications.InceptionV3(...)    — 23M params, min size 75×75
```

---

## 📖 Kiến Thức 3: Feature Extraction vs Fine-Tuning

### ✅ Giải Thích

**Bước 1 — Feature Extraction:**
- Đóng băng toàn bộ base (`base.trainable = False`)
- Chỉ train custom head
- Nhanh, ít epoch, LR bình thường

**Bước 2 — Fine-Tuning:**
- Mở freeze một phần (các lớp cuối của base)
- Train toàn bộ với LR rất nhỏ
- Base đã học tốt → LR lớn sẽ phá hỏng

```
Feature Extraction:
    base (frozen ❄️) → head (training 🔥)

Fine-Tuning:
    base[:100] (frozen ❄️) → base[100:] (training 🔥) → head (training 🔥)
```

### 💻 Code

```python
from tensorflow import keras

# ─── Feature Extraction ──────────────────────────────────────
base.trainable = False

inputs  = keras.Input(shape=(96, 96, 3))
x       = base(inputs, training=False)   # training=False → BN dùng inference
x       = keras.layers.Dropout(0.3)(x)
x       = keras.layers.Dense(128, activation="relu")(x)
outputs = keras.layers.Dense(10, activation="softmax")(x)
model   = keras.Model(inputs, outputs)

model.compile(optimizer=keras.optimizers.Adam(1e-3),
              loss="sparse_categorical_crossentropy",
              metrics=["accuracy"])
history1 = model.fit(X_train, y_train, epochs=10, ...)

# ─── Fine-Tuning ─────────────────────────────────────────────
base.trainable = True
# Đóng băng 70% lớp đầu
for layer in base.layers[:-30]:
    layer.trainable = False

# ⚠️ Quan trọng: recompile với LR nhỏ hơn 10× sau khi thay trainable
model.compile(optimizer=keras.optimizers.Adam(1e-4),   # 1e-3 → 1e-4
              loss="sparse_categorical_crossentropy",
              metrics=["accuracy"])
history2 = model.fit(X_train, y_train, epochs=10, ...)
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Fine-tune với LR cao → phá vỡ pretrained weights
model.compile(optimizer=Adam(1e-3))   # Quá cao!
# → Model mất đi kiến thức từ ImageNet

# ✅ Fine-tune với LR nhỏ
model.compile(optimizer=Adam(1e-4))   # 10× nhỏ hơn feature extraction

# ❌ Quên recompile sau khi thay trainable
base.trainable = True
model.fit(...)   # Chưa compile lại! Optimizer state không reset đúng

# ✅ Luôn recompile sau khi thay đổi trainable
base.trainable = True
model.compile(...)   # Compile trước khi fit!
model.fit(...)
```

---

## 📖 Kiến Thức 4: Preprocessing Ảnh cho Pretrained Models

### ✅ Giải Thích

Mỗi pretrained model được train với preprocessing riêng — bắt buộc phải dùng đúng!

| Model | Preprocessing | Input range |
|-------|-------------|------------|
| MobileNetV2 | `keras.applications.mobilenet_v2.preprocess_input` | [-1, 1] |
| VGG16 | `keras.applications.vgg16.preprocess_input` | BGR, subtract mean |
| ResNet | `keras.applications.resnet.preprocess_input` | BGR |
| EfficientNet | `keras.applications.efficientnet.preprocess_input` | [0, 255] |

### 💻 Code

```python
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

# MobileNetV2: normalize [-1, 1]
X_train_pp = preprocess_input(X_train * 255)   # Input phải là 0-255

# Hoặc tích hợp vào model:
from tensorflow import keras
inputs   = keras.Input(shape=(96, 96, 3))
x        = keras.applications.mobilenet_v2.preprocess_input(inputs)
features = base(x, training=False)
...

# Khi dùng preprocessing trong model → predict tự động xử lý
y_pred = model.predict(X_test_raw / 255.0)   # Truyền vào [0,1] nếu PP đặt trong model
```

---

## 💻 Demo Tổng Hợp

Xem file `demo.py` trong cùng thư mục — demo đầy đủ:
1. Load CIFAR-10, resize 32→96
2. Feature Extraction với MobileNetV2 base frozen
3. Fine-tuning 30 lớp cuối với LR nhỏ
4. So sánh accuracy trước/sau
5. Visualize predictions

---

## 📝 Bài Tập Trên Lớp

**🟢 Bài 1 (Dễ):** Feature count  
a) Load MobileNetV2 với `include_top=False, pooling="avg"` → print output shape  
b) Đặt `base.trainable = False` → in số params trainable vs non-trainable  
c) Thêm Dense(10, softmax) head → in tổng params

**🟡 Bài 2 (Trung Bình):** So sánh base models  
Thử 3 base models (MobileNetV2, EfficientNetB0, ResNet50) với cùng head và cùng dataset (fake nếu cần).  
So sánh: số params, tốc độ inference, accuracy.

**🔴 Bài 3 (Nâng Cao):** Layer visualization  
a) Với MobileNetV2, lấy output của lớp Conv thứ 3  
b) Visualize 16 feature maps đầu tiên của một ảnh bất kỳ  
c) Nhận xét: lớp đầu detect gì (edges?), lớp sâu detect gì (textures? parts?)

---

## 🏠 Bài Tập Về Nhà

**Bài 1:** Custom Image Dataset  
Thu thập ~50 ảnh/class (2-3 class) từ Google Images.  
Dùng `keras.utils.image_dataset_from_directory` load.  
Apply Transfer Learning, đạt accuracy ≥ 85%.

**Bài 2:** Learning Rate Study  
Train cùng fine-tuning task với 5 LR khác nhau: [1e-2, 1e-3, 1e-4, 1e-5, 1e-6].  
Vẽ val_accuracy cho từng LR, tìm LR tối ưu.

---

## 🎯 Tổng Kết

**3 điểm cần nhớ:**
1. **Feature Extraction trước, Fine-Tuning sau** — 2 giai đoạn, không nhảy thẳng vào fine-tune
2. **Recompile sau khi đổi trainable** — optimizer phải biết params nào cần update
3. **LR nhỏ hơn 10× khi fine-tune** — bảo vệ kiến thức đã học từ ImageNet

**Buổi tiếp theo (Buổi 5):** Kiểm tra lần 1 — NN + CNN + Transfer Learning.

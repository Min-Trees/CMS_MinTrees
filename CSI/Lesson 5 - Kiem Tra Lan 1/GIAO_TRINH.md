# 🎯 Buổi 5: Kiểm Tra Lần 1 (NN + CNN + Transfer Learning)

> **Khóa:** CSI | **Buổi:** 5/14 | **Thời lượng:** 90 phút

---

## 🎯 Mục Tiêu Kiểm Tra

Học viên chứng minh có thể:
- ✅ Xây dựng và train MLP (Dense) với Keras từ đầu
- ✅ Xây dựng CNN cho bài toán phân loại ảnh
- ✅ Áp dụng Transfer Learning (feature extraction)
- ✅ Giải thích các kỹ thuật: Dropout, BatchNorm, EarlyStopping, Data Augmentation

---

## 🔁 Ôn Bài Cũ — Tóm Tắt 3 Buổi (15 phút)

### Quick Recap Q&A

**Buổi 1 — Neural Networks:**
1. Neuron nhân tạo = Lin. Combination + ___?
2. Tại sao cần activation function phi tuyến?
3. ReLU vs Sigmoid — khi nào dùng cái nào?

**Buổi 2 — Keras:**
1. 3 arguments bắt buộc trong `model.compile()`?
2. `validation_split=0.2` có nghĩa gì?
3. EarlyStopping dừng training khi nào?

**Buổi 3 — CNN:**
1. Tại sao Conv2D dùng ít tham số hơn Dense?
2. MaxPooling2D(2,2) làm gì với feature map 16×16?
3. Data augmentation giải quyết vấn đề gì?

**Buổi 4 — Transfer Learning:**
1. `include_top=False` có nghĩa gì?
2. Tại sao fine-tuning dùng learning rate nhỏ hơn feature extraction?
3. `base.trainable = False` có ảnh hưởng gì đến inference?

---

## 📋 Đề Kiểm Tra

> **Thời gian:** 60 phút | **Được mở:** tài liệu học, Google | **Không được mở:** ChatGPT

---

### 📌 Phần 1: Lý Thuyết (20 điểm)

**Câu 1 (5đ):** Giải thích quá trình forward pass qua mạng 2 lớp:

```
Input(3) → Dense(4, relu) → Dense(2, softmax)
```

Với input X=[1, -1, 2], hãy:
a) Viết công thức tính output của lớp 1
b) Sao softmax output 2 node luôn cộng = 1?
c) Nếu output=[0.7, 0.3] → model dự đoán class nào?

**Câu 2 (5đ):** So sánh và điền bảng:

| | Dense cho ảnh | CNN |
|-|--------------|-----|
| Cách xử lý không gian | ? | ? |
| Số tham số (32×32×3 → 64 units) | ? | ? |
| Bất biến với dịch chuyển | ? | ? |
| Phù hợp với ảnh | ? | ? |

**Câu 3 (5đ):** Đọc code và trả lời:

```python
model = keras.Sequential([
    keras.layers.Input(shape=(28, 28, 1)),
    keras.layers.Conv2D(32, 3, padding="same"),
    keras.layers.BatchNormalization(),
    keras.layers.Activation("relu"),
    keras.layers.MaxPooling2D(2, 2),
    keras.layers.Conv2D(64, 3, padding="same", activation="relu"),
    keras.layers.MaxPooling2D(2, 2),
    keras.layers.Flatten(),
    keras.layers.Dense(128, activation="relu"),
    keras.layers.Dropout(0.5),
    keras.layers.Dense(10, activation="softmax"),
])
```

a) Output shape sau lớp MaxPooling2D đầu tiên?
b) Output shape sau lớp Flatten?
c) BatchNorm trước hay sau activation — bạn thấy ở đây là trước hay sau?
d) Dropout(0.5) có nghĩa gì?

**Câu 4 (5đ):** Transfer Learning workflow:
a) Thứ tự 4 bước trong transfer learning là?
b) Khi fine-tuning, tại sao đóng băng các lớp đầu của base?
c) Sự khác nhau giữa `weights="imagenet"` và `weights=None`?

---

### 💻 Phần 2: Code (60 điểm)

**Bài 2A (20đ) — MLP từ đầu:**

```python
# Yêu cầu:
# Dataset: keras.datasets.fashion_mnist (28×28 grayscale, 10 class quần áo)
# 1. Load và preprocess
# 2. Xây dựng MLP: [784 → 512(relu) → Dropout(0.4) → 256(relu) → 10(softmax)]
# 3. Compile + EarlyStopping(patience=5)
# 4. In test accuracy
# 5. Vẽ training curves (loss + accuracy)
```

Tiêu chí chấm:
- Preprocessing đúng (normalize + reshape): 4đ
- Model architecture đúng: 6đ
- Compile + Loss đúng: 4đ
- EarlyStopping dùng đúng: 3đ
- Vẽ curves có labels: 3đ

**Bài 2B (25đ) — CNN:**

```python
# Yêu cầu:
# Dataset: keras.datasets.cifar10 (32×32 RGB, 10 class)
# 1. Xây dựng CNN với ít nhất 2 Conv blocks
# 2. Mỗi block: Conv2D → BatchNorm → ReLU → MaxPool → Dropout
# 3. Data augmentation: RandomFlip + RandomRotation
# 4. EarlyStopping + ModelCheckpoint
# 5. Đánh giá: test accuracy
# 6. Visualize 15 predictions (sample random từ test set)
```

Tiêu chí chấm:
- CNN architecture ≥2 blocks: 7đ
- BatchNorm + Dropout đúng chỗ: 5đ
- Data augmentation: 4đ
- Callbacks đầy đủ: 4đ
- Visualization + màu đúng/sai: 5đ

**Bài 2C (15đ) — Transfer Learning (BONUS):**

```python
# Yêu cầu:
# 1. Load MobileNetV2, include_top=False, weights="imagenet"
# 2. Thêm custom head (Dropout + Dense(10, softmax))
# 3. Freeze base, train head 5 epochs
# 4. Unfreeze 20 lớp cuối, fine-tune thêm 5 epochs với lr=1e-4
# 5. So sánh accuracy trước và sau fine-tuning
```

---

### 📝 Phần 3: Short Questions (20 điểm)

1. **(4đ)** Code sau có lỗi gì?  
```python
model.compile(loss="categorical_crossentropy", ...)
y_train = np.array([0, 1, 2, 3, 4])  # integer labels
model.fit(X_train, y_train)
```

2. **(4đ)** Code sau có lỗi gì?  
```python
base = keras.applications.MobileNetV2(...)
base.trainable = False
for layer in base.layers[-30:]:
    layer.trainable = True
model.compile(optimizer=Adam(1e-3), ...)   # Fine-tuning LR
```

3. **(4đ)** Giải thích tại sao validation loss tăng nhưng training loss giảm?

4. **(4đ)** Nếu model đạt train_acc=0.99 nhưng test_acc=0.71 — vấn đề gì? Đề xuất 2 giải pháp.

5. **(4đ)** Sắp xếp đúng thứ tự các bước predict với model đã có:
   - Gọi model.predict(X)
   - Preprocess input (normalize, resize...)
   - Argmax kết quả để lấy class
   - Load model đã lưu
   - Map class index sang class name

---

## 📊 Bảng Điểm

| Phần | Điểm tối đa | Ngưỡng đạt |
|------|-------------|-----------|
| Phần 1: Lý thuyết | 20 | ≥ 14 |
| Phần 2A: MLP | 20 | ≥ 14 |
| Phần 2B: CNN | 25 | ≥ 18 |
| Phần 3: Short Q | 20 | ≥ 14 |
| **Tổng (không bonus)** | **85** | **≥ 65 (pass)** |
| Bài 2C Bonus | +15 | — |

---

## ✅ Đáp Án Tham Khảo (Giảng Viên)

### Phần 3 Short Q:
1. **Lỗi:** labels là integer → cần `sparse_categorical_crossentropy`
2. **Lỗi:** recompile với `Adam(1e-3)` cho fine-tuning — đáng lẽ phải là `1e-4` hoặc `1e-5`
3. **Overfit** — model học thuộc train set nhưng không generalize
4. **Overfit** — giải pháp: thêm Dropout, Data Augmentation, giảm model complexity
5. **Thứ tự đúng:** Load model → Preprocess → Predict → Argmax → Map class

---

## 🎯 Tổng Kết Chương 1

**3 trụ cột đã học:**
1. **MLP (Dense networks)** — nền tảng, dữ liệu dạng vector
2. **CNN** — ảnh, video, bất kỳ dạng dữ liệu có cấu trúc không gian
3. **Transfer Learning** — phương pháp thực tế nhất: tận dụng pretrained model

**Buổi tiếp theo (Buổi 6):** NLP cơ bản — xử lý văn bản, tokenization, embedding, LSTM.

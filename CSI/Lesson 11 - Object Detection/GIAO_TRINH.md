# 🎯 Buổi 11: Object Detection

> **Khóa:** CSI | **Buổi:** 11/14 | **Thời lượng:** 90 phút  
> **Cài đặt:** `pip install ultralytics opencv-python`

---

## 🎯 Mục Tiêu

- ✅ Phân biệt Classification, Detection, Segmentation
- ✅ Giải thích bounding box formats và IoU
- ✅ Dùng YOLOv8 detect objects trong ảnh
- ✅ Vẽ bounding boxes lên ảnh với matplotlib

---

## 🔁 Ôn Bài Cũ (10 phút)

1. Conversation history trong LLM chatbot — tại sao phải gửi lại toàn bộ?
2. Few-shot prompting là gì, cho ví dụ?
3. `st.session_state` lưu gì qua các interactions?
4. **Mini task:** Viết system prompt cho chatbot chuyên gia Computer Vision.

---

## 📖 Kiến Thức 1: Classification vs Detection vs Segmentation

### ✅ Giải Thích

```
Ảnh với 2 con chó và 1 xe hơi:

Classification:    "dog"   (1 label, không biết vị trí)
Detection:         "dog" @ [100,80,200,300], "dog" @ [350,90,450,310], "car" @ [...]
Segmentation:      Mỗi pixel thuộc: dog/dog/car/background
Instance Seg:      dog_1 pixels | dog_2 pixels | car pixels
```

| Task | Output | Độ khó | Model tiêu biểu |
|------|--------|--------|----------------|
| Classification | Class label | ⭐ | ResNet, EfficientNet |
| Detection | Boxes + Labels | ⭐⭐⭐ | YOLO, Faster R-CNN |
| Segmentation | Pixel masks | ⭐⭐⭐⭐ | SAM, Mask R-CNN |

**YOLO** = You Only Look Once — real-time detection nhanh nhất.

---

## 📖 Kiến Thức 2: Bounding Box & IoU

### ✅ Giải Thích

**Bounding Box Formats:**

```
Pascal VOC: [x_min, y_min, x_max, y_max] — pixel coords
COCO:       [x_min, y_min, width, height] — pixel coords
YOLO:       [x_center, y_center, w, h]   — normalized [0,1]
```

**IoU (Intersection over Union)** = Đo độ overlap giữa 2 boxes:

$$\text{IoU} = \frac{\text{Area of Intersection}}{\text{Area of Union}}$$

- IoU = 1.0 → hoàn toàn trùng khớp
- IoU = 0.0 → không overlap
- IoU ≥ 0.5 → thường coi là "đúng" (mAP50)

### 💻 Code

```python
def iou(box1, box2):
    """box = [xmin, ymin, xmax, ymax]"""
    xi1 = max(box1[0], box2[0])
    yi1 = max(box1[1], box2[1])
    xi2 = min(box1[2], box2[2])
    yi2 = min(box1[3], box2[3])
    intersection = max(0, xi2 - xi1) * max(0, yi2 - yi1)
    area1  = (box1[2] - box1[0]) * (box1[3] - box1[1])
    area2  = (box2[2] - box2[0]) * (box2[3] - box2[1])
    return intersection / (area1 + area2 - intersection + 1e-8)

pred   = [100, 100, 200, 200]
gt     = [110, 110, 210, 210]
print(f"IoU: {iou(pred, gt):.3f}")
```

---

## 📖 Kiến Thức 3: YOLOv8 với Ultralytics

### ✅ Giải Thích

YOLO chia ảnh thành grid, mỗi ô dự đoán:
- B bounding boxes
- Confidence score cho mỗi box
- C class probabilities

YOLOv8 (2023) = phiên bản mới nhất, dễ dùng nhất qua `ultralytics` library.

| Model | mAP50 | Speed | Size |
|-------|-------|-------|------|
| YOLOv8n (nano) | 37.3 | Fast | 3.2M |
| YOLOv8s (small)| 44.9 | — | 11.2M |
| YOLOv8m | 50.2 | — | 25.9M |
| YOLOv8l | 52.9 | Slow | 43.7M |

### 💻 Code

```python
from ultralytics import YOLO
import cv2
import numpy as np

# Load pretrained model
model = YOLO("yolov8n.pt")   # Download tự động lần đầu

# ── Detect trong ảnh ──────────────────────────────────────────
results = model.predict(
    source     = "photo.jpg",  # file, folder, URL, hoặc numpy array
    conf       = 0.5,          # Confidence threshold
    iou        = 0.7,          # NMS IoU threshold
    classes    = [0, 2],       # Chỉ detect person (0) và car (2)
    save       = False,
    verbose    = False,
)

result = results[0]
print(f"Detected: {len(result.boxes)} objects")

for box in result.boxes:
    cls_id = int(box.cls[0])
    conf   = float(box.conf[0])
    xyxy   = box.xyxy[0].tolist()   # [xmin, ymin, xmax, ymax]
    name   = model.names[cls_id]
    print(f"  {name}: {conf:.2f} @ {[int(v) for v in xyxy]}")

# ── Vẽ lên ảnh ────────────────────────────────────────────────
img = cv2.imread("photo.jpg")
for box in result.boxes:
    xyxy = [int(v) for v in box.xyxy[0].tolist()]
    cv2.rectangle(img, (xyxy[0], xyxy[1]), (xyxy[2], xyxy[3]), (0,255,0), 2)
    label = f"{model.names[int(box.cls[0])]} {float(box.conf[0]):.2f}"
    cv2.putText(img, label, (xyxy[0], xyxy[1]-5),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,255,0), 1)
cv2.imwrite("result.jpg", img)
```

---

## 📖 Kiến Thức 4: NMS & Model Metrics

### ✅ Giải Thích

**NMS (Non-Maximum Suppression):** YOLO tạo ra nhiều boxes chồng lên nhau → NMS chọn box tốt nhất.

**mAP (mean Average Precision):**
- Precision = TP / (TP + FP)  
- Recall = TP / (TP + FN)
- AP = Area Under Precision-Recall Curve
- mAP = mean AP across all classes
- mAP50 = mAP với IoU threshold = 0.5

### 💻 Code

```python
# Ví dụ NMS thủ công
def simple_nms(boxes, scores, iou_threshold=0.5):
    """boxes: [[x1,y1,x2,y2], ...], scores: [conf, ...]"""
    order   = sorted(range(len(scores)), key=lambda i: -scores[i])
    keep    = []
    while order:
        idx = order.pop(0)
        keep.append(idx)
        order = [o for o in order if iou(boxes[idx], boxes[o]) < iou_threshold]
    return keep

boxes  = [[100,100,200,200], [110,110,210,210], [300,300,400,400]]
scores = [0.9, 0.85, 0.75]
kept   = simple_nms(boxes, scores)
print(f"Kept boxes: {[boxes[i] for i in kept]}")
# Box 1 và 2 overlap nhiều → giữ box 1 (score cao hơn)
```

---

## 💻 Demo Tổng Hợp

Xem `demo.py`:
- So sánh task CV (classification, detection, segmentation)
- Bounding box format conversion
- Simulated detection visualization
- Real YOLO detection (nếu có ultralytics)
- IoU calculation

---

## 📝 Bài Tập Trên Lớp

**🟢 Bài 1 (Dễ):** Bounding Box Visualization  
Cho một ảnh (tự chọn), tự "label" 3 objects:  
a) Vẽ bounding boxes bằng matplotlib.patches.Rectangle  
b) Thêm label text lên mỗi box  
c) Convert sang YOLO format

**🟡 Bài 2 (Trung Bình):** YOLOv8 Inference  
Dùng YOLOv8n để detect trong ảnh từ internet:  
a) Detect tất cả objects, in class + confidence  
b) Lọc chỉ giữ objects `conf > 0.6`  
c) Vẽ kết quả, đếm số lượng mỗi class

**🔴 Bài 3 (Nâng Cao):** Multi-Image Detection Report  
Detect 5 ảnh khác nhau:  
a) Tổng hợp: class nào xuất hiện nhiều nhất?  
b) Average confidence cho mỗi class  
c) Vẽ bar chart thống kê  
d) Lưu kết quả vào CSV

---

## 🏠 Bài Tập Về Nhà

**Bài 1:** Video Detection  
Dùng `model.predict(source="video.mp4")` để detect trên video.  
Đếm số frames có "person", tính % frames.

**Bài 2:** Custom Dataset  
Thu thập 20-30 ảnh (2 class: ví dụ "coffee cup" vs "water bottle").  
Dùng tool label ảnh (LabelImg hoặc Roboflow).  
Fine-tune YOLOv8n trên dataset nhỏ.

---

## 🎯 Tổng Kết

**3 điểm cần nhớ:**
1. **Detection = Classification + Localization** — predict class VÀ vị trí
2. **IoU** = thước đo overlap của bounding boxes — ≥0.5 thường là "đúng"
3. **YOLOv8** = state-of-the-art real-time detection — 1 dòng code để detect

**Buổi tiếp theo (Buổi 12):** Speech & Audio AI — Whisper, librosa, speech recognition.

"""
CSI Buổi 11 — Object Detection với YOLO
Demo: Load YOLOv8, detect objects trong ảnh, vẽ bounding boxes
"""
import os
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as patches

os.makedirs("output", exist_ok=True)

print("=== Object Detection với YOLO ===\n")

# ── 1. Concepts Demo (không cần YOLO install) ────────────────
print("--- 1. Phân loại task Computer Vision ---")
tasks = {
    "Image Classification": "Ảnh này là gì? → 1 label",
    "Object Detection":     "Vật gì ở đâu? → bounding boxes + labels",
    "Semantic Segmentation":"Mỗi pixel thuộc class nào?",
    "Instance Segmentation":"Mỗi object cụ thể mask riêng (YOLO-seg)",
    "Pose Estimation":      "Vị trí keypoints cơ thể người",
}
for task, desc in tasks.items():
    print(f"  {task:28}: {desc}")

# ── 2. Bounding Box Format ──────────────────────────────────
print("\n--- 2. Bounding Box Formats ---")
formats = {
    "YOLO":    "[x_center, y_center, width, height] (normalized 0-1)",
    "COCO":    "[x_min, y_min, width, height] (pixels)",
    "Pascal VOC": "[x_min, y_min, x_max, y_max] (pixels)",
}
for fmt, desc in formats.items():
    print(f"  {fmt:12}: {desc}")

# Conversion example
print("\n  Ví dụ: ảnh 640×480, bbox [100, 150, 200, 250] (xmin,ymin,xmax,ymax)")
xmin, ymin, xmax, ymax = 100, 150, 200, 250
img_w, img_h = 640, 480
x_c = (xmin + xmax) / 2 / img_w
y_c = (ymin + ymax) / 2 / img_h
w   = (xmax - xmin) / img_w
h   = (ymax - ymin) / img_h
print(f"  → YOLO format: [{x_c:.3f}, {y_c:.3f}, {w:.3f}, {h:.3f}]")

# ── 3. Demo giả lập detection ────────────────────────────────
print("\n--- 3. Simulated Detection Visualization ---")

# Tạo ảnh giả
np.random.seed(42)
img_arr = np.random.rand(480, 640, 3) * 0.3 + 0.2  # Nền xám nhạt

# Vẽ "objects" giả
fake_detections = [
    {"label": "person", "bbox": [100, 80, 220, 380],  "conf": 0.92},
    {"label": "car",    "bbox": [350, 200, 580, 380],  "conf": 0.87},
    {"label": "dog",    "bbox": [50, 300, 180, 440],   "conf": 0.78},
]

colors = {"person": "lime", "car": "red", "dog": "cyan"}

fig, ax = plt.subplots(figsize=(10, 7))
ax.imshow(img_arr)

for det in fake_detections:
    x1, y1, x2, y2 = det["bbox"]
    label, conf     = det["label"], det["conf"]
    color           = colors.get(label, "yellow")

    rect = patches.Rectangle((x1, y1), x2-x1, y2-y1,
                              linewidth=2, edgecolor=color, facecolor="none")
    ax.add_patch(rect)
    ax.text(x1, y1-5, f"{label} {conf:.2f}",
            fontsize=10, color=color, fontweight="bold",
            bbox=dict(boxstyle="round,pad=0.2", fc="black", alpha=0.5))

ax.set_title("Object Detection — Simulated Results", fontsize=14)
ax.axis("off")
plt.tight_layout()
plt.savefig("output/detection_demo.png", dpi=100, bbox_inches="tight")
plt.close()
print("  Saved: output/detection_demo.png")

# ── 4. Try YOLO ──────────────────────────────────────────────
try:
    from ultralytics import YOLO
    print("\n--- 4. YOLOv8 Detection ---")

    # Load YOLOv8 nano (nhỏ nhất, nhanh nhất)
    model = YOLO("yolov8n.pt")   # Tự download nếu chưa có (~6MB)

    # Detect trên ảnh URL hoặc local file
    print("  Running detection on sample image...")
    results = model.predict(
        source     = "https://ultralytics.com/images/bus.jpg",
        conf       = 0.5,    # Confidence threshold
        save       = False,  # Không save video
        verbose    = False,
    )

    result = results[0]
    print(f"  Input size: {result.orig_shape}")
    print(f"  Objects detected: {len(result.boxes)}")

    if len(result.boxes) > 0:
        for box in result.boxes:
            cls  = int(box.cls[0])
            conf = float(box.conf[0])
            xyxy = box.xyxy[0].tolist()
            name = model.names[cls]
            print(f"    [{name:12}] conf={conf:.2f}, bbox=[{int(xyxy[0])}, {int(xyxy[1])}, {int(xyxy[2])}, {int(xyxy[3])}]")

    # Lưu ảnh có detection
    import requests
    from PIL import Image
    from io import BytesIO

    url_resp = requests.get("https://ultralytics.com/images/bus.jpg", timeout=10)
    img_pil  = Image.open(BytesIO(url_resp.content))
    img_np   = np.array(img_pil)

    fig, ax  = plt.subplots(figsize=(12, 8))
    ax.imshow(img_np)

    for box in result.boxes:
        xyxy = box.xyxy[0].tolist()
        cls  = int(box.cls[0])
        conf = float(box.conf[0])
        name = model.names[cls]
        x1, y1, x2, y2 = [int(v) for v in xyxy]
        rect = patches.Rectangle((x1,y1), x2-x1, y2-y1,
                                  linewidth=2, edgecolor="lime", facecolor="none")
        ax.add_patch(rect)
        ax.text(x1, y1-4, f"{name} {conf:.2f}", fontsize=8, color="lime",
                bbox=dict(fc="black", alpha=0.5, pad=1))

    ax.set_title(f"YOLOv8n Detection — {len(result.boxes)} objects")
    ax.axis("off")
    plt.tight_layout()
    plt.savefig("output/yolo_detect.png", dpi=100, bbox_inches="tight")
    plt.close()
    print("  Saved: output/yolo_detect.png")

except ImportError:
    print("\n--- 4. YOLO không có sẵn ---")
    print("  Cài đặt: pip install ultralytics")

# ── 5. NMS concept ──────────────────────────────────────────
print("\n--- 5. Non-Maximum Suppression (NMS) ---")
print("  Vấn đề: YOLO tạo ra hàng nghìn bounding boxes")
print("  Giải pháp NMS:")
print("    1. Lấy box có confidence cao nhất")
print("    2. Tính IoU với tất cả box còn lại")
print("    3. Loại box nào IoU > threshold (0.5) — trùng quá nhiều")
print("    4. Lặp lại với box confidence cao tiếp theo")

# Minh họa IoU
def iou(box1, box2):
    """box = [xmin, ymin, xmax, ymax]"""
    xi1 = max(box1[0], box2[0]); yi1 = max(box1[1], box2[1])
    xi2 = min(box1[2], box2[2]); yi2 = min(box1[3], box2[3])
    intersection = max(0, xi2-xi1) * max(0, yi2-yi1)
    area1 = (box1[2]-box1[0]) * (box1[3]-box1[1])
    area2 = (box2[0]-box2[0]) * (box2[3]-box2[1])  # Note: intentional demo
    area1 = max(area1, 1); area2 = (box2[2]-box2[0]) * (box2[3]-box2[1]); area2 = max(area2, 1)
    union = area1 + area2 - intersection
    return intersection / union if union > 0 else 0

b1 = [100, 100, 200, 200]
b2 = [120, 120, 220, 220]   # Overlap nhiều
b3 = [300, 100, 400, 200]   # Không overlap
print(f"\n  IoU(b1, b2 [overlap]) = {iou(b1, b2):.2f}")
print(f"  IoU(b1, b3 [far])     = {iou(b1, b3):.2f}")

print("\n✅ Output files saved to: output/")
import shutil; shutil.rmtree("output")

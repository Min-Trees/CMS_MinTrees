# 🎯 Buổi 1: Giới Thiệu AI & Neural Networks

> **Khóa:** CSI | **Buổi:** 1/14 | **Thời lượng:** 90 phút

---

## 🎯 Mục Tiêu

Sau buổi này học viên có thể:
- ✅ Phân biệt AI / Machine Learning / Deep Learning bằng ví dụ cụ thể
- ✅ Mô tả cấu trúc Neuron sinh học và Perceptron nhân tạo
- ✅ Tính forward pass qua một neuron bằng tay
- ✅ Giải thích mục đích các activation functions: Sigmoid, ReLU, Softmax

---

## 🔁 Ôn Bài Cũ (10 phút)

> *(Buổi 1 CSI — Vào thẳng nội dung mới)*

**Quiz nền tảng CSA:**
1. `train_test_split` có tác dụng gì?
2. Sự khác nhau giữa Regression và Classification?
3. R² có ý nghĩa gì? Giá trị nào là tốt?
4. **Mini task:** Giải thích bằng lời "Random Forest hoạt động như thế nào?"

---

## 📖 Kiến Thức 1: Bức Tranh AI/ML/DL

### ✅ Giải Thích

Ba khái niệm xếp lồng nhau như búp bê Matryoshka:

```
                ┌───────────────────────────────┐
                │           AI (1956)           │
                │  ┌─────────────────────────┐  │
                │  │   Machine Learning      │  │
                │  │  (1980s)                │  │
                │  │  ┌───────────────────┐  │  │
                │  │  │  Deep Learning    │  │  │
                │  │  │  (2012–nay)       │  │  │
                │  │  └───────────────────┘  │  │
                │  └─────────────────────────┘  │
                └───────────────────────────────┘
```

| | AI Truyền thống | ML | Deep Learning |
|-|----------------|-----|---------------|
| **Cách học** | Quy tắc lập trình sẵn | Học từ dữ liệu | Tự rút trích feature |
| **Feature** | Con người định nghĩa | Con người định nghĩa | **Tự học** |
| **Dữ liệu** | Ít | Vừa (nghìn mẫu) | Nhiều (triệu mẫu) |
| **Ví dụ** | Chess AI, Expert System | Random Forest, SVM | GPT, DALL-E, AlphaFold |

### 💻 Code

```python
# So sánh 3 cách tiếp cận bài toán: Phân loại email spam

# 1. AI truyền thống — quy tắc thủ công
def spam_ai(email):
    spam_words = ["free", "winner", "click here", "urgent"]
    return any(w in email.lower() for w in spam_words) # Dễ qua mặt!

# 2. Machine Learning — sklearn
from sklearn.ensemble import RandomForestClassifier
# rf.fit(X_train, y_train) — học tự động từ dữ liệu

# 3. Deep Learning — tự học cả feature lẫn classification
# model = keras.Sequential([Embedding, LSTM, Dense])
# model.fit(...) — cực mạnh với nhiều dữ liệu
```

---

## 📖 Kiến Thức 2: Neuron Sinh Học vs Nhân Tạo

### ✅ Giải Thích

Neuron sinh học nhận tín hiệu từ nhiều neuron khác qua dendrite, nếu tổng tín hiệu đủ mạnh nó "kích hoạt" và truyền tín hiệu đi qua axon.

**Perceptron** (neuron nhân tạo) mô phỏng điều này:
1. Nhân mỗi đầu vào với **trọng số** (weight)
2. Cộng tất cả + **bias**
3. Đưa qua **activation function**

$$z = w_1 x_1 + w_2 x_2 + \ldots + w_n x_n + b = \mathbf{w} \cdot \mathbf{x} + b$$
$$a = f(z)$$

### 💻 Code

```python
import numpy as np

def neuron(inputs, weights, bias, activation="relu"):
    z = np.dot(weights, inputs) + bias
    if activation == "relu":
        return max(0, z)
    elif activation == "sigmoid":
        return 1 / (1 + np.exp(-z))
    else:
        return z

# Demo: neuron nhận biết hình ảnh đơn giản
# inputs = [độ sáng trái, độ sáng phải, cạnh dọc, cạnh ngang]
x = np.array([0.8, 0.2, 1.0, 0.3])
w = np.array([0.5, -0.3, 0.9, -0.1])
b = 0.1
print(f"z = {np.dot(w,x)+b:.3f}")
print(f"ReLU(z) = {neuron(x, w, b, 'relu'):.3f}")
print(f"Sigmoid(z) = {neuron(x, w, b, 'sigmoid'):.3f}")
```

### ⚠️ Lỗi Thường Gặp

```python
# ❌ Quên bias — kết quả luôn về 0 khi input=0
z = np.dot(w, x)      # Thiếu bias

# ✅ Luôn có bias — cho phép model dịch chuyển đường phân cách
z = np.dot(w, x) + b
```

---

## 📖 Kiến Thức 3: Activation Functions

### ✅ Giải Thích

Nếu không có activation function, mạng nhiều lớp chỉ là **phép biến đổi tuyến tính** — giống như 1 lớp.

| Activation | Công thức | Khi dùng | Vấn đề |
|------------|-----------|---------|--------|
| **Sigmoid** | $\frac{1}{1+e^{-z}}$ | Output binary | Vanishing gradient |
| **ReLU** | $\max(0, z)$ | Hidden layers | Dead neurons |
| **Tanh** | $\frac{e^z - e^{-z}}{e^z + e^{-z}}$ | RNN/LSTM | Vanishing gradient |
| **Softmax** | $\frac{e^{z_i}}{\sum e^{z_j}}$ | Output multi-class | Chỉ dùng output |

### 💻 Code

```python
import numpy as np

# Sigmoid — output [0, 1]
sigmoid = lambda z: 1 / (1 + np.exp(-z))
# Dùng khi: bài toán phị loại nhị phân (spam/not spam)

# ReLU — output [0, +∞)
relu = lambda z: np.maximum(0, z)
# Dùng khi: hidden layers — đơn giản và hiệu quả nhất

# Softmax — output vector xác suất tổng = 1
def softmax(z):
    e_z = np.exp(z - np.max(z))   # Trừ max tránh overflow
    return e_z / e_z.sum()
# Dùng khi: output multi-class (10 chữ số, 100 loại ảnh)

# Demo Softmax
logits = np.array([3.0, 1.0, 0.5])    # Điểm thô từ layer cuối
probs  = softmax(logits)
print(f"Logits : {logits}")
print(f"Softmax: {probs.round(3)}")    # [0.844, 0.114, 0.042]
print(f"Tổng   : {probs.sum():.1f}")  # 1.0 — luôn = 1
```

---

## 📖 Kiến Thức 4: Multi-Layer Perceptron (MLP)

### ✅ Giải Thích

Một neuron không thể học XOR — cần nhiều lớp!

```
Input Layer    Hidden Layer    Output Layer

    x₁ ────────→ h₁ ──────────→ ŷ
    x₂ ─────── × h₂ ──────────→
    x₃ ─── w  → h₃
    
    (3 neurons)  (3 neurons)    (1 neuron)
```

Mỗi lớp: *linear transformation* → *activation function*

### 💻 Code

```python
import numpy as np

def relu(z): return np.maximum(0, z)
def sigmoid(z): return 1 / (1 + np.exp(-z))

# Mạng 2 lớp tự làm (không dùng framework)
class MLP2Layer:
    def __init__(self, inp, hid, out):
        self.W1 = np.random.randn(inp, hid) * 0.1
        self.b1 = np.zeros(hid)
        self.W2 = np.random.randn(hid, out) * 0.1
        self.b2 = np.zeros(out)

    def predict(self, X):
        h = relu(X @ self.W1 + self.b1)    # Hidden layer
        y = sigmoid(h @ self.W2 + self.b2) # Output
        return y

nn = MLP2Layer(2, 4, 1)
X = np.array([[0,0],[0,1],[1,0],[1,1]])
probs = nn.predict(X)
print("Dự đoán trước khi train:", probs.flatten().round(3))
```

---

## 💻 Demo Tổng Hợp: Phân Loại Moons với sklearn MLP

```python
from sklearn.neural_network import MLPClassifier
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report
import numpy as np

# Tạo dữ liệu hình lưỡi liềm (không thể phân loại bằng đường thẳng)
X, y = make_moons(n_samples=500, noise=0.25, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=1)

scaler = StandardScaler()
X_tr_s = scaler.fit_transform(X_tr)
X_te_s = scaler.transform(X_te)

# So sánh kích thước mạng khác nhau
for arch in [(4,), (8, 8), (32, 16), (64, 32, 16)]:
    mlp = MLPClassifier(
        hidden_layer_sizes = arch,
        activation         = "relu",
        max_iter           = 300,
        random_state       = 0,
    )
    mlp.fit(X_tr_s, y_tr)
    acc = accuracy_score(y_te, mlp.predict(X_te_s))
    layers_desc = " → ".join(str(h) for h in [2] + list(arch) + [1])
    print(f"  Arch {str(arch):<15}: Acc={acc:.3f} | Layers: {layers_desc}")
```

---

## 📝 Bài Tập Trên Lớp

**🟢 Bài 1 (Dễ):** Các bước tính forward pass  
Cho mạng 1 lớp ẩn: input=[1, 2, -1], W1=[[0.1, 0.3],[-0.2, 0.5],[0.4, -0.1]], b1=[0.1, -0.2].  
a) Tính z1 = X @ W1 + b1 bằng tay, sau đó kiểm tra bằng numpy  
b) Áp dụng ReLU: a1 = relu(z1)  
c) Với W2=[0.6, -0.4], b2=0.1, tính output y = sigmoid(a1 @ W2 + b2)

**🟡 Bài 2 (Trung Bình):** Activation functions so sánh  
Plot 4 activation functions (Sigmoid, ReLU, Tanh, Leaky ReLU với alpha=0.1) trên cùng biểu đồ.  
Nhận xét:  
a) Hàm nào bão hòa (saturate) khi x lớn?  
b) Hàm nào có thể bị "dead neuron"?  
c) Gradient của ReLU tại x=-2, x=0, x=3 là bao nhiêu?

**🔴 Bài 3 (Nâng Cao):** MLP architecture search  
Với dataset `make_circles(noise=0.3)`:  
a) Thử 5 kiến trúc khác nhau, vẽ decision boundary cho mỗi mạng  
b) Kiến trúc nào cho Accuracy cao nhất?  
c) Kiến trúc nào overfit (train acc cao nhưng test acc thấp)?  
d) Thêm dropout (dùng sklearn không hỗ trợ — tự thêm noise vào input để mô phỏng)

---

## 🏠 Bài Tập Về Nhà

**Bài 1:** Viết class `NeuralLayer` từ numpy  
- `__init__(n_input, n_output, activation)`  
- `forward(X)` — tính output  
- Test với XOR input  

**Bài 2:** Đọc và tóm tắt  
Đọc bài blog "A Neural Network Playground" (https://playground.tensorflow.org) — chơi với công cụ tương tác, thử:  
- Bài toán spiral với các kiến trúc khác nhau  
- Trả lời: cần bao nhiêu lớp và neurons để học spiral?

---

## 🎯 Tổng Kết

**3 điểm cần nhớ:**
1. **Neuron = linear combination + activation** — activation function quyết định tính phi tuyến
2. **ReLU cho hidden layers, Softmax cho output multi-class** — đây là mặc định trong 2024
3. **Nhiều lớp = học biểu diễn phức tạp** — nhưng cần dữ liệu nhiều và kỹ thuật tránh overfit

**Buổi tiếp theo (Buổi 2):** TensorFlow & Keras — từ numpy thủ công sang framework mạnh mẽ, xây dựng phân loại MNIST.

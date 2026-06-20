"""
CSI - Buổi 1: Giới Thiệu AI & Neural Networks từ Numpy
========================================================
Không cần TensorFlow — xây dựng neural network từ đầu bằng numpy
"""

import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import os

print("=" * 55)
print("   CSI Buổi 1 — Neural Network từ Numpy")
print("=" * 55)

np.random.seed(0)
os.makedirs("charts", exist_ok=True)

# ──────────────────────────────────────────────────────────
# 1. ACTIVATION FUNCTIONS
# ──────────────────────────────────────────────────────────
print("\n── 1. Activation Functions ──")

def sigmoid(x):    return 1 / (1 + np.exp(-x))
def relu(x):       return np.maximum(0, x)
def tanh(x):       return np.tanh(x)
def softmax(x):
    e_x = np.exp(x - np.max(x))   # Trừ max để tránh overflow
    return e_x / e_x.sum()

x = np.linspace(-5, 5, 100)
fig, axes = plt.subplots(2, 2, figsize=(10, 7))
for ax, (name, func) in zip(axes.flatten(),
    [("Sigmoid", sigmoid), ("ReLU", relu), ("Tanh", tanh),
     ("Softmax (5 đầu vào)", lambda x: None)]):
    if name == "Softmax (5 đầu vào)":
        logits = np.array([2.0, 1.0, 0.5, -1.0, -2.0])
        probs  = softmax(logits)
        ax.bar(range(5), probs, color="steelblue")
        for i, p in enumerate(probs):
            ax.text(i, p+0.01, f"{p:.2f}", ha="center", fontsize=9)
        ax.set_title("Softmax"); ax.set_ylabel("Xác suất")
    else:
        y = func(x)
        ax.plot(x, y, color="coral", linewidth=2)
        ax.axhline(0, color="gray", linewidth=0.5)
        ax.axvline(0, color="gray", linewidth=0.5)
        ax.set_title(name); ax.set_xlabel("x"); ax.set_ylabel("f(x)")
        ax.grid(True, alpha=0.3)
plt.suptitle("Activation Functions", fontsize=13, fontweight="bold")
plt.tight_layout()
plt.savefig("charts/activations.png", dpi=100)
plt.close()
print("  ✓ Biểu đồ activation → charts/activations.png")

# Demo giá trị
for z in [-3, 0, 2, 5]:
    print(f"  z={z:>3}: sigmoid={sigmoid(z):.3f}  relu={relu(z):.1f}  tanh={tanh(z):.3f}")

# ──────────────────────────────────────────────────────────
# 2. SINGLE NEURON — FORWARD PASS
# ──────────────────────────────────────────────────────────
print("\n── 2. Single Neuron ──")
# Neuron: z = w·x + b, a = sigmoid(z)
inputs = np.array([1.5, -0.5, 2.0, 1.0])   # 4 features
weights= np.array([0.3,  0.7, -0.2, 0.5])
bias   = -0.1

z = np.dot(weights, inputs) + bias
a = sigmoid(z)
print(f"  inputs  : {inputs}")
print(f"  weights : {weights}")
print(f"  z = w·x + b = {np.dot(weights,inputs):.2f} + ({bias}) = {z:.2f}")
print(f"  a = sigmoid({z:.2f}) = {a:.4f}")

# ──────────────────────────────────────────────────────────
# 3. MẠNG 2 LỚP (2-layer MLP) TỪ NUMPY
# ──────────────────────────────────────────────────────────
print("\n── 3. 2-layer MLP (từ numpy) ──")

class SimpleNN:
    def __init__(self, input_size, hidden_size, output_size):
        # Xavier initialization
        scale1 = np.sqrt(2.0 / input_size)
        scale2 = np.sqrt(2.0 / hidden_size)
        self.W1 = np.random.randn(input_size,  hidden_size) * scale1
        self.b1 = np.zeros(hidden_size)
        self.W2 = np.random.randn(hidden_size, output_size) * scale2
        self.b2 = np.zeros(output_size)

    def relu(self, z):      return np.maximum(0, z)
    def sigmoid(self, z):   return 1 / (1 + np.exp(-z))

    def forward(self, X):
        self.z1  = X @ self.W1 + self.b1    # Hidden layer
        self.a1  = self.relu(self.z1)
        self.z2  = self.a1 @ self.W2 + self.b2
        self.a2  = self.sigmoid(self.z2)
        return self.a2

    def predict(self, X):
        probs = self.forward(X)
        return (probs > 0.5).astype(int).flatten()


# Tạo dữ liệu XOR (không thể phân ly tuyến tính)
X_xor = np.array([[0,0],[0,1],[1,0],[1,1]], dtype=float)
y_xor = np.array([0, 1, 1, 0], dtype=float)

nn = SimpleNN(input_size=2, hidden_size=4, output_size=1)
print("  Forward pass (trước khi train):")
for xi, yi in zip(X_xor, y_xor):
    pred = nn.forward(xi.reshape(1,-1))[0][0]
    print(f"    input={xi}  thực={int(yi)}  dự đoán={pred:.3f}")

# ──────────────────────────────────────────────────────────
# 4. TRAINING DEMO BÀI TOÁN PHÂN LOẠI ĐƠN GIẢN
# ──────────────────────────────────────────────────────────
print("\n── 4. Training với sklearn MLPClassifier ──")
from sklearn.neural_network import MLPClassifier
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

X_m, y_m = make_moons(n_samples=300, noise=0.2, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X_m, y_m, test_size=0.25, random_state=0)

mlp = MLPClassifier(hidden_layer_sizes=(8, 8), activation="relu",
                    max_iter=500, random_state=1)
mlp.fit(X_tr, y_tr)
acc = accuracy_score(y_te, mlp.predict(X_te))
print(f"  Accuracy (make_moons): {acc:.3f}")
print(f"  Số lớp: {len(mlp.coefs_)} | Layers: {[c.shape for c in mlp.coefs_]}")

# Vẽ decision boundary
xx, yy = np.meshgrid(np.linspace(-3,3,100), np.linspace(-2,2,100))
Z = mlp.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)
fig, ax = plt.subplots(figsize=(7, 5))
ax.contourf(xx, yy, Z, alpha=0.3, cmap="RdBu")
scatter = ax.scatter(X_m[:, 0], X_m[:, 1], c=y_m, cmap="RdBu", edgecolors="k", s=30)
ax.set_title(f"MLP Decision Boundary (Acc={acc:.2f})")
plt.tight_layout()
plt.savefig("charts/decision_boundary.png", dpi=100)
plt.close()
print("  ✓ Decision boundary → charts/decision_boundary.png")

import shutil; shutil.rmtree("charts")
print("\n✅ Demo hoàn tất!")

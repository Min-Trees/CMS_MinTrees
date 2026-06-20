# 📘 Course → CSB → Lesson 11 – Stack và Queue

> **Khóa học:** CSB – Nền Tảng Lập Trình Python  
> **Buổi:** 11 / 14  
> **Chủ đề:** Stack (Ngăn Xếp) · Queue (Hàng Đợi)  

---

## PHẦN 1 – GIẢI THÍCH ĐƠN GIẢN

### 📚 Stack (Ngăn Xếp) – LIFO

**Ẩn dụ:** Chồng đĩa trong quán ăn.

> Người rửa chén **đặt đĩa sạch lên trên cùng** (push).  
> Phục vụ **lấy đĩa từ trên cùng xuống** để dùng (pop).  
> → **Cái vào sau — ra trước!** (**L**ast **I**n, **F**irst **O**ut)

```
Thêm (push):  [1] → [1,2] → [1,2,3]
Lấy  (pop):   [1,2,3] → [1,2] (lấy 3) → [1] (lấy 2)
```

**Ứng dụng thực tế:**
- Nút **Ctrl+Z** (Undo): hành động gần nhất được hoàn tác trước
- Trình duyệt **Nút Back**: trang vừa ghé thăm trở lại trước
- Duyệt cây trong thuật toán DFS

---

### 🚶 Queue (Hàng Đợi) – FIFO

**Ẩn dụ:** Xếp hàng mua vé rạp chiếu phim.

> Khán giả **xếp vào cuối hàng** (enqueue).  
> Thu ngân **phục vụ người đầu hàng trước** (dequeue).  
> → **Ai vào trước — ra trước!** (**F**irst **I**n, **F**irst **O**ut)

```
Enqueue: [A] → [A,B] → [A,B,C]
Dequeue: [A,B,C] → [B,C] (A ra trước) → [C] (B ra tiếp)
```

**Ứng dụng thực tế:**
- Hàng đợi in máy in (printer queue)
- Xử lý request trên máy chủ web
- BFS (Breadth-First Search)

---

### 🐍 Cài Đặt trong Python

| | Stack | Queue |
|--|-------|-------|
| **Cài đặt đơn giản** | List (`append` / `pop`) | `collections.deque` (`append` / `popleft`) |
| **Thêm** | `stack.append(x)` | `queue.append(x)` |
| **Lấy ra** | `stack.pop()` | `queue.popleft()` |
| **Nhìn đỉnh/đầu** | `stack[-1]` | `queue[0]` |
| **Kiểm tra rỗng** | `len(stack) == 0` | `len(queue) == 0` |

> **Tại sao dùng `deque` cho Queue?**  
> `list.pop(0)` để lấy phần tử đầu phải dịch chuyển toàn bộ phần tử còn lại → **O(n)**.  
> `deque.popleft()` → **O(1)** — nhanh hơn nhiều.

---

## PHẦN 2 – VÍ DỤ MINH HỌA (LOGIC)

### 📝 Bài toán 1: Kiểm tra dấu ngoặc hợp lệ (dùng Stack)

**Input:** `"(({[]}))"` hoặc `"([)]"`  
**Output:** `Hợp lệ` hoặc `Không hợp lệ`

**🔍 Dry Run:**
```
Chuỗi: "({[]})"
stack = []

'(' → push → stack = ['(']
'{' → push → stack = ['(', '{']
'[' → push → stack = ['(', '{', '[']
']' → đóng → đỉnh stack là '[' ← khớp! pop → stack = ['(', '{']
'}' → đóng → đỉnh stack là '{' ← khớp! pop → stack = ['(']
')' → đóng → đỉnh stack là '(' ← khớp! pop → stack = []

Stack rỗng → HỢP LỆ ✓
```

### 📝 Bài toán 2: Mô phỏng hàng đợi in (dùng Queue)

**Input:** Các lệnh in đến theo thứ tự thời gian  
**Output:** Thứ tự xử lý in

---

## PHẦN 3 – CODE DEMO

> Xem file: [`demo.py`](./demo.py)

---

## 💡 Tổng kết buổi 11

| Cấu trúc | Nguyên tắc | Ứng dụng điển hình |
|----------|-----------|-------------------|
| Stack | LIFO – vào sau ra trước | Undo, duyệt DFS, call stack |
| Queue | FIFO – vào trước ra trước | Hàng đợi in, BFS, scheduling |

> 🎯 **Bài tập về nhà:** Dùng Stack mô phỏng chức năng **Undo/Redo** đơn giản (mỗi thao tác là một chuỗi, Ctrl+Z pop ra khỏi stack Undo và push vào stack Redo).

# 🎯 Buổi 11: Stack và Queue

> **Khóa:** CSB | **Buổi:** 11/14 | **Thời lượng:** 90 phút

---

## 🎯 Mục tiêu

Sau buổi này học viên làm được:
- ✅ Giải thích nguyên lý LIFO của Stack và FIFO của Queue
- ✅ Cài đặt Stack dùng `list` với `push/pop`
- ✅ Cài đặt Queue dùng `collections.deque` với `enqueue/dequeue`
- ✅ Ứng dụng Stack để kiểm tra dấu ngoặc hợp lệ
- ✅ Ứng dụng Queue mô phỏng hàng đợi thực tế

---

## 🔁 Ôn bài cũ (10 phút)

**3 câu hỏi nhanh:**
1. Set khác Dict như thế nào? Khai báo set rỗng đúng cách là gì?
2. `d.get("key", 0)` vs `d["key"]` — khi nào dùng cái nào?
3. Viết dict comprehension tạo `{1:1, 2:4, 3:9, 4:16, 5:25}` trong 1 dòng

**Bài mini (3 phút):**
```python
# Kết quả của đoạn này là gì?
ngan = {"A"}
lon  = {"A", "B", "C"}
print(ngan.issubset(lon))    # ?
print(ngan < lon)            # ?
print("D" not in lon)        # ?
```

---

## 📖 Kiến thức 1: Stack (Ngăn Xếp)

### ✅ Giải thích

**Ẩn dụ: Chồng đĩa trong bếp**

> 🍽️ Bạn chỉ lấy đĩa **từ trên cùng** và chỉ đặt đĩa **lên trên cùng**.  
> Đĩa được đặt vào **sau** sẽ được lấy ra **trước**.  
> → **LIFO: Last In, First Out**

**Ứng dụng thực tế của Stack:**
- 🔙 Nút "Undo" trong Word/Photoshop — hoàn tác thao tác cuối cùng
- 📞 "Back" trên điện thoại — quay về màn hình trước
- 🖩 Tính toán biểu thức số học (`3 + 4 * 2`)
- ✅ Kiểm tra dấu ngoặc có đóng mở khớp nhau không

**Các thao tác cơ bản:**
| Thao tác | Mô tả | List Python |
|----------|-------|-------------|
| `push(x)` | Thêm x lên trên cùng | `stack.append(x)` |
| `pop()` | Lấy và xóa phần tử trên cùng | `stack.pop()` |
| `peek()` | Xem phần tử trên cùng (không xóa) | `stack[-1]` |
| `is_empty()` | Stack có rỗng không? | `len(stack) == 0` |

### 📌 Ví dụ — Kiểm tra dấu ngoặc

**Input:** `"(hello [world])"`  
**Output:** `Hợp lệ`  
**Input:** `"(abc]"`  
**Output:** `Không hợp lệ`

### 💻 Code

```python
from collections import deque

# === CLASS STACK ===
class Stack:
    """Cài đặt Stack bằng list Python."""

    def __init__(self):
        self.__data = []   # Private — ẩn việc dùng list bên trong

    def push(self, item):
        """Đẩy phần tử lên đỉnh stack."""
        self.__data.append(item)

    def pop(self):
        """Lấy và xóa phần tử ở đỉnh stack."""
        if self.is_empty():
            raise IndexError("Stack rỗng, không thể pop!")
        return self.__data.pop()

    def peek(self):
        """Xem phần tử trên đỉnh (không xóa)."""
        if self.is_empty():
            raise IndexError("Stack rỗng!")
        return self.__data[-1]

    def is_empty(self):
        return len(self.__data) == 0

    def size(self):
        return len(self.__data)

    def __str__(self):
        return f"Stack(top→{self.__data[::-1]})"


# === ỨNG DỤNG 1: Undo / Redo ===
class BanSoan:
    """Bảng soạn thảo với chức năng Undo."""

    def __init__(self):
        self.__noi_dung = ""
        self.__lich_su  = Stack()   # Mỗi bước thay đổi lưu vào stack

    def go_them(self, van_ban):
        self.__lich_su.push(self.__noi_dung)   # Lưu trạng thái trước
        self.__noi_dung += van_ban
        print(f"  Gõ '{van_ban}' → '{self.__noi_dung}'")

    def undo(self):
        if self.__lich_su.is_empty():
            print("  Không còn gì để Undo!")
            return
        self.__noi_dung = self.__lich_su.pop()
        print(f"  ← Undo → '{self.__noi_dung}'")

    def get_noi_dung(self):
        return self.__noi_dung


print("=== BẢN SOẠN THẢO ===")
bs = BanSoan()
bs.go_them("Hello")
bs.go_them(", World")
bs.go_them("!")
bs.undo()   # Hủy dấu !
bs.undo()   # Hủy ", World"
print(f"  Nội dung cuối: '{bs.get_noi_dung()}'")


# === ỨNG DỤNG 2: Kiểm tra dấu ngoặc ===
def kiem_tra_ngoac(bieu_thuc):
    """Kiểm tra dấu ngoặc có hợp lệ không.

    Hợp lệ: mọi mở-đóng phải khớp nhau và đúng thứ tự.
    """
    stack  = Stack()
    dong   = {')': '(', ']': '[', '}': '{'}   # Dict map đóng → mở

    for i, ky_tu in enumerate(bieu_thuc):
        if ky_tu in '([{':
            stack.push(ky_tu)      # Gặp ngoặc mở → đẩy vào stack

        elif ky_tu in ')]}':
            if stack.is_empty():
                return False, f"Ngoặc '{ky_tu}' ở vị trí {i} không có ngoặc mở tương ứng"
            dinh_stack = stack.pop()
            if dinh_stack != dong[ky_tu]:
                return False, f"Ngoặc '{ky_tu}' ở vị trí {i} không khớp với '{dinh_stack}'"

    if not stack.is_empty():
        return False, f"Còn {stack.size()} ngoặc mở chưa đóng"
    return True, "Hợp lệ"


print("\n=== KIỂM TRA DẤU NGOẶC ===")
cac_bieu_thuc = [
    "(hello [world])",          # ✅
    "{a: [1, 2, (3)]}",         # ✅
    "(abc]",                     # ❌ Sai loại ngoặc
    "((x + y)",                  # ❌ Thiếu đóng
    "x + y))",                   # ❌ Thừa đóng
    "[({})]",                    # ✅
]
for bieu_thuc in cac_bieu_thuc:
    hop_le, thong_bao = kiem_tra_ngoac(bieu_thuc)
    ky_hieu = "✅" if hop_le else "❌"
    print(f"  {ky_hieu} '{bieu_thuc}' → {thong_bao}")
```

### ⚠️ Lỗi thường gặp

```python
# LỖI 1: Pop từ stack rỗng
stack = Stack()
stack.pop()   # ❌ IndexError nếu không kiểm tra is_empty()
if not stack.is_empty():   # ✅
    stack.pop()

# LỖI 2: Dùng list như stack nhưng pop sai đầu
stack = [1, 2, 3]
first_item = stack.pop(0)   # ❌ pop từ ĐẦU → đây là Queue, không phải Stack!
# Stack: pop() không có index → lấy từ CUỐI (đỉnh stack)
last_item  = stack.pop()    # ✅
```

---

## 📖 Kiến thức 2: Queue (Hàng Đợi)

### ✅ Giải thích

**Ẩn dụ: Hàng chờ tại quầy thu ngân**

> 🏪 Khách đến trước được phục vụ trước.  
> Khách mới xếp vào **cuối hàng**, phục vụ từ **đầu hàng**.  
> → **FIFO: First In, First Out**

**Ứng dụng thực tế của Queue:**
- 🖨️ Hàng đợi máy in — tài liệu gửi trước được in trước
- 📧 Hộp thư đến — email cũ nhất hiển thị sau
- 🎮 Hàng đợi server game — người vào trước được vào trước
- 🚦 Điều phối tiến trình hệ điều hành

**Tại sao không dùng list thông thường?**
- `list.pop(0)` — O(n) vì phải dịch tất cả phần tử!
- `collections.deque.popleft()` — O(1) — nhanh hơn rất nhiều

```python
from collections import deque

queue = deque()       # Tạo queue rỗng
queue.append(1)       # Enqueue: thêm vào cuối
queue.append(2)
queue.append(3)
item = queue.popleft() # Dequeue: lấy từ đầu → 1
```

### 📌 Ví dụ — Hệ thống hỗ trợ khách hàng

**Kịch bản:** 5 khách hàng gửi yêu cầu, hệ thống xử lý 1 yêu cầu mỗi "bước"

### 💻 Code

```python
# === CLASS QUEUE ===
class Queue:
    """Cài đặt Queue bằng deque để popleft() O(1)."""

    def __init__(self):
        self.__data = deque()

    def enqueue(self, item):
        """Thêm vào cuối hàng đợi."""
        self.__data.append(item)

    def dequeue(self):
        """Lấy và xóa phần tử đầu hàng đợi."""
        if self.is_empty():
            raise IndexError("Queue rỗng!")
        return self.__data.popleft()

    def peek(self):
        """Xem phần tử đầu hàng (không xóa)."""
        if self.is_empty():
            raise IndexError("Queue rỗng!")
        return self.__data[0]

    def is_empty(self):   return len(self.__data) == 0
    def size(self):       return len(self.__data)
    def __str__(self):    return f"Queue(front→{list(self.__data)}→back)"


# === ỨNG DỤNG: Hệ thống hỗ trợ (OOP + Queue) ===
class YeuCauHoTro:
    _dem_yc = 0

    def __init__(self, khach_hang, van_de, do_uu_tien=1):
        YeuCauHoTro._dem_yc += 1
        self.ma_yc      = f"TK{YeuCauHoTro._dem_yc:04d}"
        self.khach_hang = khach_hang
        self.van_de     = van_de
        self.uu_tien    = do_uu_tien   # 1=bình thường, 2=khẩn, 3=khẩn cấp
        self.da_xu_ly   = False

    def __str__(self):
        uu = "🔴" if self.uu_tien == 3 else "🟡" if self.uu_tien == 2 else "🟢"
        return f"[{self.ma_yc}] {uu} {self.khach_hang}: '{self.van_de}'"


class HeThongHoTro:
    def __init__(self, ten_hang):
        self.ten          = ten_hang
        self.__hang_doi   = Queue()
        self.__da_xu_ly   = []

    def gui_yeu_cau(self, khach, van_de, uu_tien=1):
        ycu = YeuCauHoTro(khach, van_de, uu_tien)
        self.__hang_doi.enqueue(ycu)
        print(f"  + Xếp hàng: {ycu}")
        return ycu

    def xu_ly_yeu_cau_tiep(self):
        if self.__hang_doi.is_empty():
            print("  Không có yêu cầu nào!")
            return None
        ycu = self.__hang_doi.dequeue()
        ycu.da_xu_ly = True
        self.__da_xu_ly.append(ycu)
        print(f"  ✓ Đang xử lý: {ycu}")
        return ycu

    def xem_hang_doi(self):
        if self.__hang_doi.is_empty():
            print("  Hàng đợi trống.")
            return
        print(f"\n  Hàng đợi ({self.__hang_doi.size()} yêu cầu):")
        print(f"  Tiếp theo: {self.__hang_doi.peek()}")

    def bao_cao(self):
        print(f"\n  [{self.ten}]")
        print(f"  Đã xử lý : {len(self.__da_xu_ly)}")
        print(f"  Còn đợi  : {self.__hang_doi.size()}")


print("=== HỆ THỐNG HỖ TRỢ KHÁCH HÀNG ===\n")
ht = HeThongHoTro("MindX Support")

# Khách hàng gửi yêu cầu
ht.gui_yeu_cau("Nguyễn An",   "Không đăng nhập được",  uu_tien=2)
ht.gui_yeu_cau("Trần Bình",   "Hỏi lịch học",          uu_tien=1)
ht.gui_yeu_cau("Lê Cúc",      "Lỗi thanh toán",        uu_tien=3)
ht.gui_yeu_cau("Phạm Dũng",   "Đổi lớp học",           uu_tien=1)

ht.xem_hang_doi()

print("\n  --- Bắt đầu xử lý theo thứ tự ---")
for _ in range(3):   # Xử lý 3 yêu cầu
    ht.xu_ly_yeu_cau_tiep()

ht.bao_cao()
ht.xem_hang_doi()
```

### ⚠️ Lỗi thường gặp

```python
# LỖI 1: Dùng list.pop(0) thay vì deque.popleft()
import time
n = 100_000

ds_list = list(range(n))
t0 = time.perf_counter()
while ds_list: ds_list.pop(0)    # O(n²) tổng!
print(f"list.pop(0)   : {time.perf_counter()-t0:.3f}s")

ds_deque = deque(range(n))
t0 = time.perf_counter()
while ds_deque: ds_deque.popleft()   # O(n) tổng!
print(f"deque.popleft : {time.perf_counter()-t0:.3f}s")

# LỖI 2: Enqueue từ sai đầu
q = deque()
q.appendleft(1)   # ❌ Thêm vào ĐẦU — phá vỡ FIFO!
q.append(1)       # ✅ Thêm vào CUỐI
q.popleft()       # ✅ Lấy từ ĐẦU
```

---

## 💻 Demo Tổng Hợp — Máy Tính Biểu Thức (Stack)

```python
# ============================================================
#  DEMO TỔNG HỢP: Stack để tính biểu thức hậu tố (RPN)
#  Ví dụ: "3 4 +" → 3+4 = 7
#         "5 1 2 + 4 * + 3 -" → 14
# ============================================================

def tinh_rpn(bieu_thuc_hau_to):
    """Tính biểu thức hậu tố dùng Stack."""
    stack = Stack()
    toan_tu = {'+', '-', '*', '/'}

    for token in bieu_thuc_hau_to.split():
        if token in toan_tu:
            b = stack.pop()   # Toán hạng thứ 2 (lấy ra sau → đứng sau trong biểu thức)
            a = stack.pop()   # Toán hạng thứ 1
            if   token == '+': stack.push(a + b)
            elif token == '-': stack.push(a - b)
            elif token == '*': stack.push(a * b)
            elif token == '/':
                if b == 0: raise ZeroDivisionError("Chia cho 0!")
                stack.push(a / b)
        else:
            stack.push(float(token))

    return stack.pop()

# Test
cac_bieu_thuc = [
    ("3 4 +",          7),     # 3+4
    ("5 1 2 + 4 * +",  17),    # 5+(1+2)*4 = 17 (không phải 14!)
    ("10 2 /",          5),    # 10/2
    ("2 3 4 * +",      14),    # 2+3*4
]

print("=== MÁY TÍNH BIỂU THỨC HẬU TỐ ===")
for bieu_thuc, ket_qua_mong_doi in cac_bieu_thuc:
    ket_qua = tinh_rpn(bieu_thuc)
    ok = "✅" if abs(ket_qua - ket_qua_mong_doi) < 1e-9 else "❌"
    print(f"  {ok} '{bieu_thuc}' = {ket_qua:.2f}")
```

---

## 📝 Bài Tập Trên Lớp

### 🟢 Bài 1 (Dễ): Dùng Stack
> Tạo Stack, push các số 1, 2, 3, 4, 5 vào.  
> Pop lần lượt và in ra — kết quả theo thứ tự gì?  
> Viết lại in ngược 1 chuỗi bằng Stack.

### 🟡 Bài 2 (Trung bình): Task Queue
> Mô phỏng hàng đợi công việc:  
> - Thêm 5 task với độ ưu tiên khác nhau  
> - Xử lý từng task theo thứ tự FIFO  
> - Sau mỗi bước xử lý, in hàng đợi còn lại

### 🔴 Bài 3 (Nâng cao nhẹ): Lịch sử trình duyệt
> Mô phỏng lịch sử duyệt web:  
> - Stack `lich_su`: các trang đã thăm  
> - Stack `trang_sau`: trang có thể "Forward" đến  
> - Hàm `di_den(url)`, `back()`, `forward()`, `in_lich_su()`

---

## 🏠 Bài Tập Về Nhà

### 🏠 Bài 1: Tính biểu thức số học
> Mở rộng demo RPN:  
> - Thêm hỗ trợ `^` (lũy thừa) và `%` (modulo)  
> - Xử lý lỗi: chia cho 0, stack rỗng khi pop

### 🏠 Bài 2: Hệ thống đặt vé xe khách
> Class `VeXe(ma_ve, hanh_trinh, gio_di)`, Class `HangDoiVe(Queue)`.  
> - Khách đặt vé → vào hàng đợi  
> - Hệ thống xử lý 1 vé mỗi 2 giây (mô phỏng)  
> - In trạng thái hàng đợi sau mỗi lần xử lý  
> - Thêm vé ưu tiên (người khuyết tật, trẻ em): Queue ưu tiên riêng

---

## 🎯 Tổng Kết Buổi 11

| | Stack | Queue |
|---|-------|-------|
| **Nguyên lý** | LIFO (vào sau ra trước) | FIFO (vào trước ra trước) |
| **Ẩn dụ** | Chồng đĩa | Hàng chờ thu ngân |
| **Cài đặt Python** | `list` + `append/pop` | `deque` + `append/popleft` |
| **Ứng dụng phổ biến** | Undo, ngoặc, đệ quy | Hàng đợi, BFS, in ấn |

**3 điều PHẢI nhớ:**
1. 🏚️ **Stack = LIFO** — `push` bằng `append()`, `pop` bằng `pop()` (không có index)
2. 🚶 **Queue = FIFO** — dùng `deque`, `enqueue` bằng `append()`, `dequeue` bằng `popleft()`
3. ⚡ **deque quan trọng** — `list.pop(0)` là O(n), `deque.popleft()` là O(1) — khác biệt lớn khi n lớn

**Buổi tiếp theo (Buổi 12–13):** Luyện tập và Giải đề — ôn tập tổng hợp toàn khóa học.

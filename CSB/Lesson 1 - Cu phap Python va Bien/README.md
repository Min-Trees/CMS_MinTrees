# 📘 Course → CSB → Lesson 1 – Cú Pháp Python và Biến

> **Khóa học:** CSB – Nền Tảng Lập Trình Python  
> **Buổi:** 1 / 14  
> **Chủ đề:** Cú pháp cơ bản · Biến & Kiểu dữ liệu · Toán tử · if/else · for · while  

---

## 🗂️ Nội dung buổi học

| Phần | Nội dung |
|------|----------|
| Phần 1 | Giải thích đơn giản + Ẩn dụ đời thực |
| Phần 2 | Ví dụ minh họa – Input / Output / Dry Run |
| Phần 3 | Code Demo hoàn chỉnh (xem file `demo.py`) |

---

## PHẦN 1 – GIẢI THÍCH ĐƠN GIẢN

### 🧠 Biến là gì?

Hãy tưởng tượng bạn đang dọn phòng và cần cất đồ vào các **hộp có dán nhãn**.

- Hộp dán nhãn **"tên_học_sinh"** → bạn bỏ vào đó tờ giấy ghi *"An"*  
- Hộp dán nhãn **"điểm_toán"** → bạn bỏ vào đó con số *9*  
- Hộp dán nhãn **"đã_vắng"** → bạn bỏ vào đó tờ giấy *True* hoặc *False*  

> Trong lập trình, **biến** chính là những chiếc hộp đó.  
> Python tự động nhận ra bạn đang cất thứ gì bên trong (số, chữ, hay đúng/sai).

---

### 📦 Các kiểu dữ liệu cơ bản

| Kiểu | Tên Python | Ví dụ | Ẩn dụ |
|------|-----------|-------|-------|
| Số nguyên | `int` | `10`, `-3` | Số tờ tiền trong ví |
| Số thực | `float` | `9.5`, `3.14` | Cân nặng trên bàn cân |
| Chuỗi văn bản | `str` | `"An"`, `'Xin chào'` | Nội dung tin nhắn |
| Đúng/Sai | `bool` | `True`, `False` | Công tắc đèn (bật/tắt) |

---

### ➕ Toán tử số học & Logic

**Toán tử số học** – giống máy tính bỏ túi:

| Ký hiệu | Ý nghĩa | Ví dụ | Kết quả |
|---------|---------|-------|---------|
| `+` | Cộng | `5 + 3` | `8` |
| `-` | Trừ | `10 - 4` | `6` |
| `*` | Nhân | `3 * 4` | `12` |
| `/` | Chia (kết quả thực) | `7 / 2` | `3.5` |
| `//` | Chia lấy phần nguyên | `7 // 2` | `3` |
| `%` | Chia lấy phần dư | `7 % 2` | `1` |
| `**` | Lũy thừa | `2 ** 3` | `8` |

**Toán tử so sánh** – trả về `True` hoặc `False`:

`==` (bằng) · `!=` (khác) · `>` · `<` · `>=` · `<=`

**Toán tử logic** – ghép điều kiện lại:

`and` · `or` · `not`

---

### 🔀 Cấu trúc điều khiển

#### if / else – "Ngã rẽ trên con đường"

> Giống như bảng hiệu chỉ đường: *"Nếu ngoài trời đang mưa → lấy ô. Nếu không → đi bình thường."*

```
if <điều kiện>:
    # làm điều này
elif <điều kiện khác>:
    # làm điều kia
else:
    # còn không thì làm thế này
```

#### for – "Làm lần lượt từng thứ trong danh sách"

> Như người thu ngân quét từng món hàng một trong giỏ siêu thị.

```
for <biến> in <dãy>:
    # xử lý từng phần tử
```

#### while – "Làm mãi cho đến khi thỏa điều kiện"

> Như báo thức reo liên tục cho đến khi bạn bấm tắt.

```
while <điều kiện còn đúng>:
    # cứ làm thế này
```

---

## PHẦN 2 – VÍ DỤ MINH HỌA (LOGIC)

### 📝 Bài toán: Xếp loại học lực

**Mô tả:**  
Nhập điểm trung bình của một học sinh. Chương trình xác định xếp loại học lực và in ra báo cáo ngắn gọn. Sau đó, liệt kê điểm của 5 môn học bằng vòng lặp.

---

**Input:**
```
Điểm trung bình : 8.2
Điểm 5 môn học : [7, 8, 9, 6, 10]
```

**Output mong đợi:**
```
Học sinh: Nguyễn Văn An
Điểm TB : 8.2
Xếp loại: Giỏi

Bảng điểm chi tiết:
  Môn 1: 7
  Môn 2: 8
  Môn 3: 9
  Môn 4: 6
  Môn 5: 10

Số môn đạt >= 8 : 3
```

---

**🔍 Dry Run (mô phỏng từng bước):**

```
Bước 1 – Gán biến
  ten_hoc_sinh = "Nguyễn Văn An"
  diem_tb       = 8.2
  diem_cac_mon  = [7, 8, 9, 6, 10]

Bước 2 – Kiểm tra xếp loại (if/elif/else)
  diem_tb = 8.2
  → 8.2 >= 8.0?  → True → xep_loai = "Giỏi"   ✓ dừng kiểm tra

Bước 3 – In thông tin cơ bản
  → In tên, điểm TB, xếp loại

Bước 4 – Vòng lặp for duyệt danh sách điểm
  i=0 → diem_cac_mon[0] = 7  → in "Môn 1: 7"
  i=1 → diem_cac_mon[1] = 8  → in "Môn 2: 8"
  i=2 → diem_cac_mon[2] = 9  → in "Môn 3: 9"
  i=3 → diem_cac_mon[3] = 6  → in "Môn 4: 6"
  i=4 → diem_cac_mon[4] = 10 → in "Môn 5: 10"

Bước 5 – Vòng lặp while đếm môn >= 8
  dem = 0
  j = 0 → 7 >= 8? Không → j=1
  j = 1 → 8 >= 8? Có → dem=1, j=2
  j = 2 → 9 >= 8? Có → dem=2, j=3
  j = 3 → 6 >= 8? Không → j=4
  j = 4 → 10 >= 8? Có → dem=3, j=5
  j = 5 → 5 >= 5? Không (vì điều kiện j < 5) → dừng
  → In "Số môn đạt >= 8 : 3"
```

---

## PHẦN 3 – CODE DEMO

> Xem file: [`demo.py`](./demo.py)

File code có đầy đủ comment tiếng Việt giải thích từng dòng.

---

## 💡 Tổng kết buổi 1

| Khái niệm | Bạn đã học được |
|-----------|----------------|
| Biến | Đặt tên, gán giá trị, thay đổi giá trị |
| Kiểu dữ liệu | `int`, `float`, `str`, `bool` |
| Toán tử | Số học, so sánh, logic |
| `if/elif/else` | Ra quyết định theo điều kiện |
| `for` | Duyệt qua từng phần tử |
| `while` | Lặp đến khi điều kiện sai |

> 🎯 **Bài tập về nhà:** Viết chương trình nhập vào nhiệt độ (°C) và phân loại: *Lạnh* (< 15°), *Mát* (15–25°), *Nóng* (> 25°). In kết quả ra màn hình.

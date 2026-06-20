# 📋 Course → CSB → Lesson 5 – Kiểm Tra Định Kỳ Lần 1

> **Khóa học:** CSB – Nền Tảng Lập Trình Python  
> **Buổi:** 5 / 14 — **Kiểm tra định kỳ**  
> **Phạm vi:** Buổi 1 → 4  

---

## 📚 Nội dung ôn tập

### ✅ Buổi 1 – Cú pháp & Biến
- Khai báo biến, đặt tên đúng chuẩn (snake_case)
- 4 kiểu dữ liệu cơ bản: `int`, `float`, `str`, `bool`
- Toán tử số học (`+`, `-`, `*`, `/`, `//`, `%`, `**`)
- Toán tử so sánh và logic (`and`, `or`, `not`)
- Cấu trúc `if / elif / else`
- Vòng lặp `for` với `range()` và duyệt danh sách
- Vòng lặp `while`

### ✅ Buổi 2 – List, Hàm, File
- Tạo và thao tác List: `append`, `insert`, `remove`, `pop`, `sort`, `len`, slicing
- Định nghĩa hàm `def`, tham số mặc định, `return`
- List comprehension
- Đọc/ghi file với `open()` và `with`, các chế độ `r`/`w`/`a`

### ✅ Buổi 3 – OOP Phần 1
- Định nghĩa `class`, tạo object
- Constructor `__init__`, từ khóa `self`
- Thuộc tính private `__ten_bien`, getter/setter
- Kế thừa (`class Con(Cha)`), `super()`

### ✅ Buổi 4 – OOP Phần 2
- `@abstractmethod` và `ABC`
- Đa hình (polymorphism): cùng tên phương thức, hành vi khác nhau
- `isinstance()`, `type()`
- Override phương thức

---

## 📝 Dạng câu hỏi kiểm tra

| Dạng | Nội dung |
|------|----------|
| Trắc nghiệm | Đọc code → dự đoán output |
| Điền vào ô trống | Hoàn thiện đoạn code còn thiếu |
| Viết code | Giải bài toán ngắn từ đề cho |
| OOP | Xây dựng class với thuộc tính và phương thức |

---

## 🔥 Câu hỏi ôn thi mẫu

### Câu 1 – Output là gì?
```python
x = 10
y = 3
print(x // y, x % y, x ** y)
```
<details>
<summary>Đáp án</summary>
3  1  1000
</details>

### Câu 2 – Điền vào ô trống
```python
def tinh_giai_thua(n):
    ket_qua = 1
    for i in _____(1, _____):
        ket_qua *= i
    return ket_qua

print(tinh_giai_thua(5))  # Kết quả: 120
```
<details>
<summary>Đáp án</summary>
range, n + 1
</details>

### Câu 3 – Viết code
> Viết class `HinhVuong` với thuộc tính `canh` (private), phương thức getter,  
> phương thức `dien_tich()` và `chu_vi()`. Tạo 2 object và in thông tin.

### Câu 4 – Đọc code OOP
```python
class A:
    def xin_chao(self):
        print("Xin chào từ A")

class B(A):
    def xin_chao(self):
        super().xin_chao()
        print("Xin chào từ B")

b = B()
b.xin_chao()
```
<details>
<summary>Output là gì?</summary>

Xin chào từ A  
Xin chào từ B
</details>

---

## 💡 Tips ôn thi

1. **Chạy code trong đầu** (dry run) từng bước trước khi viết đáp án  
2. **Nhớ thụt lề** – Python báo lỗi nếu indent sai  
3. **Kiểm tra `self`** – Mọi phương thức trong class đều có `self` là tham số đầu  
4. **Private = `__`** – Hai dấu gạch dưới đứng trước tên biến  
5. **`super().__init__()`** – Phải gọi nếu class con có constructor riêng  

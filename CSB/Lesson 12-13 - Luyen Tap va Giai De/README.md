# 📋 Course → CSB → Lesson 12 & 13 – Luyện Tập & Giải Đề

> **Khóa học:** CSB – Nền Tảng Lập Trình Python  
> **Buổi:** 12 & 13 / 14  
> **Mục tiêu:** Ôn toàn bộ kiến thức · Giải đề mẫu · Sửa lỗi thường gặp  

---

## 📚 Bản Đồ Kiến Thức Toàn Khóa CSB

```
CSB
├── Giai đoạn 1: Python Cơ Bản (Buổi 1–2)
│   ├── Biến, kiểu dữ liệu, toán tử
│   ├── if/elif/else, for, while
│   ├── List, Function, File I/O
│
├── Giai đoạn 2: OOP (Buổi 3–4)
│   ├── Class, Object, __init__, self
│   ├── Encapsulation (__private, getter/setter)
│   ├── Inheritance (super())
│   ├── Polymorphism (override)
│   └── Abstraction (ABC, @abstractmethod)
│
├── Giai đoạn 3: Thuật Toán (Buổi 6–7)
│   ├── Linear Search – O(n)
│   ├── Binary Search – O(log n)
│   ├── Bubble Sort   – O(n²)
│   ├── Insertion Sort – O(n²)
│   └── Quick Sort    – O(n log n)
│
└── Giai đoạn 4: Cấu Trúc Dữ Liệu Nâng Cao (Buổi 10–11)
    ├── Set – không trùng, |, &, -, ^
    ├── Dictionary – key-value, O(1) lookup
    ├── Stack – LIFO (list + append/pop)
    └── Queue – FIFO (deque + append/popleft)
```

---

## 📝 ĐỀ MẪU 1 – Cơ Bản đến Trung Cấp

### Câu 1 (2 điểm) – Viết hàm
> Viết hàm `dem_nguyen_to(n)` trả về số lượng số nguyên tố từ 2 đến n (bao gồm).

### Câu 2 (2 điểm) – OOP
> Tạo class `TaiKhoan(so_tai_khoan, so_du_ban_dau)`.  
> - Thuộc tính `__so_du` là private  
> - Phương thức `nap_tien(so_tien)`, `rut_tien(so_tien)` (kiểm tra số dư)  
> - Phương thức `in_so_du()`  

### Câu 3 (3 điểm) – Thuật toán
> Cho list `so = [64, 34, 25, 12, 22, 11, 90]`.  
> (a) Sắp xếp bằng Bubble Sort, liệt kê từng bước.  
> (b) Sau khi sort, dùng Binary Search tìm 22. Bao nhiêu bước?  

### Câu 4 (3 điểm) – Tổng hợp
> Viết chương trình quản lý **giỏ hàng**:  
> - Dictionary `gio_hang = {ten_sp: (gia, so_luong)}`  
> - Hàm `them_san_pham`, `xoa_san_pham`, `tinh_tong_tien`  
> - In hóa đơn, lưu ra file

---

## 📝 ĐỀ MẪU 2 – Nâng Cao

### Câu 1 (2 điểm) – Stack
> Dùng Stack kiểm tra chuỗi ngoặc `"({[]})"` có hợp lệ không.  
> Cài đặt hàm `kiem_tra_ngoac(chuoi)`.

### Câu 2 (2 điểm) – Queue + OOP
> Class `HangDoiIn` dùng Queue. Phương thức:  
> - `them_lenh_in(ten_tai_lieu)` – enqueue  
> - `xu_ly_lenh()` – dequeue và in thông báo  
> - `hien_thi_hang_doi()`  

### Câu 3 (3 điểm) – OOP Đa Hình
> Tạo abstract class `DongVat` với `@abstractmethod am_thanh()` và `an()`.  
> 3 class con: `Cho`, `Meo`, `Chim`. Tạo list 5 con vật, gọi vòng for `.am_thanh()`.

### Câu 4 (3 điểm) – Tổng hợp Set + Dict
> Đọc file `dang_ky.txt` (mỗi dòng: `<ten_hoc_sinh>,<mon_hoc>`).  
> Tìm: (a) Học sinh đăng ký nhiều môn nhất, (b) Môn được đăng ký ít nhất.

---

## 💡 Lỗi Thường Gặp & Cách Sửa

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|---------|
| `IndentationError` | Thụt lề sai | Dùng 4 dấu cách cho mỗi cấp |
| `AttributeError: __x` | Truy cập private ngoài class | Dùng getter |
| `list.pop(0)` chậm hơn `deque.popleft()` | List phải dịch toàn bộ phần tử | Dùng `collections.deque` cho Queue |
| Binary Search sai | Quên kiểm tra list đã sort | Sort trước khi tìm |
| `KeyError` trên dict | Key không tồn tại | Dùng `.get(key, gia_tri_mac_dinh)` |
| Quick Sort lỗi stack overflow | Đệ quy quá sâu | Dùng iterative hoặc shuffle trước |

---

## ✅ Checklist Chuẩn Bị Thi Cuối Khóa

- [ ] Viết được class OOP đầy đủ: `__init__`, private, getter, setter
- [ ] Cài đặt được Inheritance và gọi `super()`
- [ ] Cài đặt được cả 3 thuật toán sort mà không nhìn tài liệu
- [ ] Giải thích được khi nào dùng Binary Search
- [ ] Dùng được Stack để giải bài ngoặc hoặc Undo
- [ ] Dùng được Dict để đếm và nhóm dữ liệu
- [ ] Viết/đọc file với `with open()` và encoding UTF-8

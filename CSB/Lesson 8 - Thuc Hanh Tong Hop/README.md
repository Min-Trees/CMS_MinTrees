# 📘 Course → CSB → Lesson 8 – Thực Hành Tổng Hợp

> **Khóa học:** CSB – Nền Tảng Lập Trình Python  
> **Buổi:** 8 / 14  
> **Chủ đề:** Kết hợp OOP + Thuật Toán + List + File  

---

## PHẦN 1 – GIẢI THÍCH ĐƠN GIẢN

### 🎯 Mục tiêu buổi này

Tổng hợp tất cả kiến thức đã học vào **một dự án nhỏ thực tế**:

> Xây dựng **hệ thống quản lý thư viện mini** — nơi kết hợp:  
> - **OOP** (Class `Sach`, `ThuVien`, `DocGia`)  
> - **Thuật toán** (tìm kiếm, sắp xếp sách)  
> - **File I/O** (lưu/nạp dữ liệu)  
> - **List & Dictionary** (kho sách, danh sách mượn)  

**Ẩn dụ:** Một thủ thư quản lý kho sách.

> 📚 Kho sách = `List` các object `Sach`  
> 🔍 Tìm sách = Binary Search theo tên/mã  
> 📊 Xếp kệ = Sort theo tên hoặc năm xuất bản  
> 📋 Sổ ghi chú = File lưu trữ  

---

## PHẦN 2 – VÍ DỤ MINH HỌA (LOGIC)

### 📝 Bài toán: Hệ thống thư viện mini

**Mô tả:**  
Xây dựng hệ thống với các chức năng:  
1. Thêm sách vào kho  
2. Tìm kiếm sách theo tiêu đề  
3. Hiển thị sách sắp xếp theo năm  
4. Đăng ký mượn sách  
5. Lưu danh sách sách ra file  

**Input:**
```
Sách 1: "Lập trình Python cơ bản", tác giả="Nguyễn A", năm=2020
Sách 2: "Cấu trúc dữ liệu",        tác giả="Trần B",    năm=2018
Sách 3: "Học máy thực hành",        tác giả="Lê C",      năm=2022
Mượn sách "Học máy thực hành" bởi độc giả "Minh"
```

**Output:**
```
=== KHO SÁCH ===
[S001] Lập trình Python cơ bản – Nguyễn A (2020) [Còn]
[S002] Cấu trúc dữ liệu          – Trần B    (2018) [Còn]
[S003] Học máy thực hành          – Lê C      (2022) [Đã mượn]

Tìm "Python": Tìm thấy [S001] tại vị trí 0
Sắp xếp theo năm: S002(2018) → S001(2020) → S003(2022)
→ Đã lưu catalog vào file: thu_vien.txt
```

**🔍 Dry Run – Tìm kiếm theo tiêu đề:**
```
ds_sach = [S001, S002, S003]  (đã sort theo tiêu đề alphabet)
Tìm "Python" → Linear search (tìm kiếm partical match)
  i=0: "Lập trình Python cơ bản".lower().find("python") ≠ -1 → TÌM THẤY!
```

---

## PHẦN 3 – CODE DEMO

> Xem file: [`demo.py`](./demo.py)

---

## 💡 Thách thức mở rộng

| Tính năng | Gợi ý kỹ thuật |
|-----------|----------------|
| Tìm kiếm nhị phân (tìm chính xác theo mã sách) | Sort theo `ma_sach`, dùng Binary Search |
| Thống kê sách hay mượn nhất | Dictionary đếm số lần mượn |
| Lưu/nạp dữ liệu từ file | `json.dump` / `json.load` |
| Hạn mượn và cảnh báo trễ hạn | `datetime.date` |

> 🎯 **Bài tập về nhà:** Thêm tính năng **trả sách** và **thống kê** độc giả mượn nhiều nhất.

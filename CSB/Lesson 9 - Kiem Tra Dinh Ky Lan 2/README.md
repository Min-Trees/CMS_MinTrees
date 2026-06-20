# 📋 Course → CSB → Lesson 9 – Kiểm Tra Định Kỳ Lần 2

> **Khóa học:** CSB – Nền Tảng Lập Trình Python  
> **Buổi:** 9 / 14 — **Kiểm tra định kỳ**  
> **Phạm vi:** Buổi 6 → 8 (thuật toán + thực hành OOP)  

---

## 📚 Nội dung ôn tập

### ✅ Buổi 6 – Thuật Toán Tìm Kiếm
- **Linear Search:** duyệt tuần tự O(n), áp dụng mọi danh sách
- **Binary Search:** chia đôi O(log n), yêu cầu danh sách đã sắp xếp
- Phân tích độ phức tạp: O(n) vs O(log n) với ví dụ số bước
- Cài đặt iterative và recursive

### ✅ Buổi 7 – Thuật Toán Sắp Xếp
- **Bubble Sort:** hoán đổi cặp kề, O(n²), tối ưu bằng cờ
- **Insertion Sort:** chèn vào đúng vị trí, O(n²), tốt với dữ liệu gần sort
- **Quick Sort:** pivot + đệ quy, O(n log n) trung bình
- So sánh thời gian chạy thực tế

### ✅ Buổi 8 – Thực Hành Tổng Hợp
- Thiết kế class và quan hệ giữa các class
- Kết hợp OOP + List + Thuật toán + File
- Xử lý edge case (danh sách rỗng, không tìm thấy...)

---

## 📝 Dạng câu hỏi

| Dạng | Nội dung |
|------|----------|
| Dry Run | Cho đoạn code sort/search, điền kết quả từng bước |
| Viết code | Cài đặt thuật toán từ mô tả |
| Phân tích | So sánh O(n) vs O(n log n) với n cho trước |
| OOP | Debug class thiếu/sai method |

---

## 🔥 Câu hỏi ôn thi mẫu

### Câu 1 – Dry Run Bubble Sort
```
Input: [5, 1, 4, 2, 8]
Liệt kê trạng thái mảng sau mỗi vòng lặp ngoài.
```
<details>
<summary>Đáp án</summary>

Vòng 1: [1, 4, 2, 5, 8]  
Vòng 2: [1, 2, 4, 5, 8]  
Vòng 3: [1, 2, 4, 5, 8] (không đổi → kết thúc sớm)
</details>

### Câu 2 – Binary Search bao nhiêu bước?
```
ds = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]  (10 phần tử)
Tìm giá trị 7 – cần bao nhiêu bước?
```
<details>
<summary>Đáp án</summary>

Bước 1: mid=4, ds[4]=9 > 7 → right=3  
Bước 2: mid=1, ds[1]=3 < 7 → left=2  
Bước 3: mid=2, ds[2]=5 < 7 → left=3  
Bước 4: mid=3, ds[3]=7 == 7 → **Tìm thấy! 4 bước**
</details>

### Câu 3 – Viết code
> Viết hàm `tim_kiem_ten(danh_sach_ten, ten_can_tim)` dùng Linear Search,  
> không phân biệt hoa thường, trả về list tất cả vị trí tìm thấy.

### Câu 4 – OOP + Thuật toán
> Cho class `SinhVien(ma_sv, ten, gpa)`. Viết hàm nhận vào list SinhVien,  
> sắp xếp theo GPA giảm dần bằng Insertion Sort.

---

## 💡 Tips ôn thi

1. **Binary Search chỉ dùng khi dữ liệu đã sắp xếp** — quên điều này rất hay mắc sai
2. **Quick Sort đệ quy** — nhớ trường hợp cơ sở `len(ds) <= 1`
3. **Số bước Binary Search** ≈ log₂(n) — n=1000 chỉ cần ~10 bước
4. Khi so sánh thuật toán: luôn xét **worst case** (trường hợp xấu nhất)

# 📘 Course → CSB → Lesson 6 – Thuật Toán Tìm Kiếm

> **Khóa học:** CSB – Nền Tảng Lập Trình Python  
> **Buổi:** 6 / 14  
> **Chủ đề:** Tìm Kiếm Tuyến Tính (Linear Search) · Tìm Kiếm Nhị Phân (Binary Search)  

---

## PHẦN 1 – GIẢI THÍCH ĐƠN GIẢN

### 🔦 Tìm Kiếm Tuyến Tính (Linear Search)

**Ẩn dụ:** Tìm chìa khóa trong túi xách.

> Bạn thò tay vào túi và **rờ từng ngăn một** — từ ngăn đầu đến ngăn cuối — cho đến khi tìm thấy chìa.  
> Nếu xui xẻo, chìa ở ngăn cuối cùng → bạn phải rờ qua **toàn bộ** ngăn.

- **Ưu điểm:** Áp dụng được với mọi danh sách (kể cả chưa sắp xếp)  
- **Nhược điểm:** Chậm với danh sách lớn — độ phức tạp **O(n)**  

```
Danh sách: [5, 3, 8, 1, 9, 2]   Cần tìm: 9
→ Kiểm tra từng phần tử: 5? Không → 3? Không → 8? Không → 1? Không → 9? CÓ!
→ Cần 5 bước
```

---

### 🔍 Tìm Kiếm Nhị Phân (Binary Search)

**Ẩn dụ:** Trò chơi đoán số "nóng lạnh" thông minh.

> Mình nghĩ một số từ 1 đến 100.  
> Người chơi đoán: "50?" → Mình nói "Cao hơn!" → Người chơi giờ chỉ cần đoán 51-100.  
> "75?" → "Thấp hơn!" → Chỉ còn 51-74. Và cứ thế...  
> **Mỗi lần đoán loại bỏ một nửa** số lượng cần tìm!

> ⚠️ Yêu cầu: Danh sách phải được **sắp xếp trước**

- **Ưu điểm:** Cực nhanh — độ phức tạp **O(log n)**  
- **Nhược điểm:** Chỉ dùng được khi dữ liệu đã sắp xếp  

```
Danh sách (đã sort): [1, 3, 5, 7, 9, 11, 13]   Cần tìm: 7
Bước 1: left=0, right=6 → mid=3 → ds[3]=7 → TÌM THẤY! (chỉ 1 bước!)
```

---

### 📊 So sánh hai thuật toán

| Tiêu chí | Linear Search | Binary Search |
|----------|--------------|---------------|
| Yêu cầu đầu vào | Bất kỳ | Phải sắp xếp |
| Độ phức tạp | O(n) | O(log n) |
| 1.000.000 phần tử (xấu nhất) | 1.000.000 bước | ~20 bước |
| Khi nào dùng | Danh sách nhỏ/chưa sort | Danh sách lớn đã sort |

---

## PHẦN 2 – VÍ DỤ MINH HỌA (LOGIC)

### 📝 Bài toán: Tra cứu điểm học sinh

**Mô tả:**  
Có danh sách điểm thi được lưu theo thứ tự tăng dần. Tìm xem một học sinh có điểm X có trong danh sách hay không.

**Input:**
```
diem_thi = [45, 52, 61, 67, 73, 78, 82, 88, 91, 95]
Can_tim  = 78
```

**Output:**
```
[Linear Search]
Bước 1: kiểm tra 45 → không phải
...
Bước 6: kiểm tra 78 → TÌM THẤY tại vị trí 5!

[Binary Search]
Bước 1: mid=4, giá trị=73 → 78 > 73 → tìm nửa phải [78,82,88,91,95]
Bước 2: mid=7, giá trị=88 → 78 < 88 → tìm nửa trái [78,82]
Bước 3: mid=6, giá trị=82 → 78 < 82 → tìm nửa trái [78]
Bước 4: mid=5, giá trị=78 → TÌM THẤY tại vị trí 5!
```

**🔍 Dry Run Binary Search:**
```
ds = [45, 52, 61, 67, 73, 78, 82, 88, 91, 95]
         0   1   2   3   4   5   6   7   8   9

Lần 1: left=0, right=9 → mid=(0+9)//2=4 → ds[4]=73
        78 > 73 → left = mid+1 = 5

Lần 2: left=5, right=9 → mid=(5+9)//2=7 → ds[7]=88
        78 < 88 → right = mid-1 = 6

Lần 3: left=5, right=6 → mid=(5+6)//2=5 → ds[5]=78
        78 == 78 → TÌM THẤY! trả về 5
```

---

## PHẦN 3 – CODE DEMO

> Xem file: [`demo.py`](./demo.py)

---

## 💡 Tổng kết buổi 6

| Thuật toán | Độ phức tạp | Điều kiện |
|-----------|-------------|-----------|
| Linear Search | O(n) | Không yêu cầu |
| Binary Search | O(log n) | **Phải sắp xếp trước** |

> 🎯 **Bài tập về nhà:** Cài đặt Binary Search theo phiên bản **đệ quy** (recursive) thay vì dùng vòng while.

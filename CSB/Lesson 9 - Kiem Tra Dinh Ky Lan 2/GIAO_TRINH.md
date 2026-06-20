# 🎯 Buổi 9: Kiểm Tra Định Kỳ Lần 2

> **Khóa:** CSB | **Buổi:** 9/14 | **Thời lượng:** 90 phút  
> **Phạm vi:** Thuật toán Tìm kiếm + Sắp xếp + Thực hành OOP tổng hợp

---

## 🎯 Mục tiêu

- ✅ Đánh giá khả năng cài đặt Binary Search và các thuật toán sắp xếp
- ✅ Đánh giá khả năng thiết kế OOP cho bài toán thực tế
- ✅ Đánh giá khả năng kết hợp nhiều kỹ năng trong 1 chương trình

---

## 🔁 Ôn Bài Trước Kiểm Tra (15 phút)

**Checklist tự kiểm tra:**

**Tìm kiếm (Buổi 6)**
- [ ] Linear Search: O(n), hoạt động với mọi list
- [ ] Binary Search: O(log n), BẮT BUỘC list đã sort
- [ ] Iterative vs Recursive Binary Search
- [ ] Áp dụng tìm kiếm với Objects (theo thuộc tính)

**Sắp xếp (Buổi 7)**
- [ ] Bubble Sort: compare & swap cặp kề, O(n²)
- [ ] Insertion Sort: chèn vào đúng chỗ, O(n²) nhưng tốt với near-sorted
- [ ] Quick Sort: pivot + đệ quy, O(n log n) trung bình
- [ ] `sorted(ds, key=lambda x: x.attr, reverse=True)` với Objects

**Thực hành (Buổi 8)**
- [ ] try/except cho nhập liệu
- [ ] Thiết kế class theo quan hệ HAS-A và IS-A
- [ ] Lưu/đọc dữ liệu từ file

---

## 📝 Đề Kiểm Tra

> **Thời gian:** 65 phút  
> **Điểm tối đa:** 10 điểm

---

### Phần 1: Thuật Toán (4 điểm)

**Câu 1.1 – Cài đặt sắp xếp (2 điểm)**

Cho danh sách: `diem = [7.5, 9.0, 6.0, 8.5, 5.5, 9.0, 7.0, 4.5]`

a) *(0.5đ)* Dùng **Insertion Sort** sắp xếp tăng dần. In từng bước (sau khi chèn mỗi phần tử)  
b) *(0.5đ)* Dùng **Quick Sort** sắp xếp giảm dần. In danh sách kết quả  
c) *(1đ)* Viết hàm `tim_vi_tri_chen(ds_sort, x)` nhận vào list đã sort và giá trị x, trả về vị trí thích hợp để chèn x vào (dùng Binary Search, không dùng `bisect`)

---

**Câu 1.2 – Phân tích (2 điểm)**

Cho list `nhiet_do = [22, 25, 28, 30, 32, 35, 38, 40, 37, 33, 29, 26]` — nhiệt độ 12 tháng (đã có thứ tự tăng dần nếu sort)

a) *(0.5đ)* Sort list, dùng Binary Search tìm tháng có nhiệt độ = 35°C, in index và thông báo  
b) *(0.5đ)* Dùng Linear Search tìm tất cả tháng có nhiệt độ nằm trong khoảng [28, 35]  
c) *(1đ)* Viết hàm `tim_thang_am_ap_nhat(nhiet_do_list, nhiet_do_ly_tuong)` — tìm tháng có nhiệt độ gần nhất với `nhiet_do_ly_tuong` (dùng Binary Search)

---

### Phần 2: OOP Tổng Hợp (6 điểm)

**Câu 2 – Hệ thống quản lý nhà hàng**

Xây dựng hệ thống với các class:

**Class `MonAn` (1 điểm)**
- Thuộc tính: `ma_mon`, `ten`, `gia`, `danh_muc` ("Món chính"/"Tráng miệng"/"Đồ uống")
- `__so_luong_ban = 0` (private, đếm số lần bán)
- Phương thức: `ban(so_phan)`, `get_doanh_thu()`, `__str__()`

**Class `HoaDon` (2 điểm)**
- `__danh_sach_mon = []` — list các tuple `(MonAn, so_luong)` — private
- `them_mon(mon_an, so_luong)` — thêm món vào hóa đơn
- `tinh_tong()` — tính tổng tiền
- `ap_ma_giam_gia(ma_gg)` — nếu mã = "MINDX10" thì giảm 10%
- `in_hoa_don()` — in chi tiết hóa đơn đẹp (tên món, số lượng, thành tiền)
- `__str__()` — tóm tắt hóa đơn

**Class `NhaHang` (3 điểm)**
- `__thuc_don = []` (private)
- `__lich_su_hoa_don = []` (private)
- `them_mon_vao_thuc_don(mon)`, `xoa_mon(ma_mon)`
- `tim_mon_theo_ten(tu_khoa)` — linear search
- `tim_mon_theo_gia(gia_toi_da)` — trả về list các món có giá ≤ giá tối đa
- `tao_hoa_don()` → trả về đối tượng `HoaDon` mới
- `luu_hoa_don(hoa_don)` — thêm vào lịch sử và cập nhật doanh thu
- `sap_xep_thuc_don(theo="gia")` — sort theo giá hoặc tên
- `bao_cao_doanh_thu()` — in Top 3 món bán chạy nhất + tổng doanh thu

---

## 📋 Đáp Án Tham Khảo

### Câu 1.1

```python
# (a) Insertion Sort với in từng bước
def insertion_sort_in_buoc(ds):
    arr = ds.copy()
    print(f"  Bắt đầu: {arr}")
    for i in range(1, len(arr)):
        khoa = arr[i]
        j    = i - 1
        while j >= 0 and arr[j] > khoa:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = khoa
        print(f"  Chèn {khoa}: {arr}")
    return arr

diem = [7.5, 9.0, 6.0, 8.5, 5.5, 9.0, 7.0, 4.5]
print("=== Insertion Sort ===")
ket_qua = insertion_sort_in_buoc(diem)

# (b) Quick Sort giảm dần
def quick_sort(ds):
    if len(ds) <= 1: return ds
    pivot = ds[-1]
    nho = [x for x in ds[:-1] if x >= pivot]
    lon = [x for x in ds[:-1] if x < pivot]
    return quick_sort(nho) + [pivot] + quick_sort(lon)

print(f"\n=== Quick Sort giảm dần ===\n{quick_sort(diem)}")

# (c) Binary search vị trí chèn
def tim_vi_tri_chen(ds_sort, x):
    """Trả về vị trí để chèn x vào ds_sort (đã sort tăng dần)."""
    trai, phai = 0, len(ds_sort)
    while trai < phai:
        giua = (trai + phai) // 2
        if ds_sort[giua] < x: trai = giua + 1
        else:                 phai = giua
    return trai

ds_sort = sorted(diem)
for x in [5.0, 8.0, 10.0, 4.0]:
    print(f"  Chèn {x} vào {ds_sort} → vị trí {tim_vi_tri_chen(ds_sort, x)}")
```

### Câu 1.2

```python
nhiet_do = [22, 25, 28, 30, 32, 35, 38, 40, 37, 33, 29, 26]
thang_map = [f"T{i}" for i in range(1, 13)]

# (a) Binary search tháng có nhiệt độ 35
thu_tu = sorted(range(12), key=lambda i: nhiet_do[i])   # Sort theo nhiệt độ
nt_sort = sorted(nhiet_do)

def binary_search_exact(ds, x):
    t, p = 0, len(ds) - 1
    while t <= p:
        g = (t + p) // 2
        if ds[g] == x:   return g
        elif ds[g] < x:  t = g + 1
        else:            p = g - 1
    return -1

vi_tri = binary_search_exact(nt_sort, 35)
if vi_tri != -1:
    thang_goc = nhiet_do.index(35) + 1
    print(f"(a) 35°C → Tháng {thang_goc}")

# (b) Linear search 28 <= t <= 35
ket_qua = [(i+1, nhiet_do[i]) for i in range(12) if 28 <= nhiet_do[i] <= 35]
print(f"(b) Tháng ấm áp [{' '.join(f'T{t}('+str(nd)+')' for t, nd in ket_qua)}]")

# (c) Tháng gần nhất với nhiệt độ lý tưởng
def tim_thang_am_ap_nhat(nt_list, ly_tuong):
    thu_tu = sorted(range(len(nt_list)), key=lambda i: nt_list[i])
    nt_s   = sorted(nt_list)
    t, p   = 0, len(nt_s) - 1
    while t <= p:
        g = (t + p) // 2
        if nt_s[g] == ly_tuong:
            return thu_tu[g] + 1, nt_s[g]
        elif nt_s[g] < ly_tuong: t = g + 1
        else:                    p = g - 1
    # So sánh 2 cạnh
    if t >= len(nt_s):   idx = p
    elif p < 0:          idx = t
    elif abs(nt_s[t] - ly_tuong) <= abs(nt_s[p] - ly_tuong): idx = t
    else:                idx = p
    return thu_tu[idx] + 1, nt_s[idx]

thang, nt = tim_thang_am_ap_nhat(nhiet_do, 28)
print(f"(c) Lý tưởng 28°C → Tháng {thang} ({nt}°C)")
```

### Câu 2 – NhaHang (đầy đủ)

```python
class MonAn:
    def __init__(self, ma, ten, gia, danh_muc):
        self.ma          = ma
        self.ten         = ten
        self.gia         = gia
        self.danh_muc    = danh_muc
        self.__so_ban    = 0

    def ban(self, so_phan):
        self.__so_ban += so_phan

    def get_doanh_thu(self):    return self.gia * self.__so_ban
    def get_so_ban(self):       return self.__so_ban

    def __str__(self):
        return f"[{self.ma}] {self.ten:<20} {self.gia:>10,}đ ({self.danh_muc})"


class HoaDon:
    _dem_hd = 0

    def __init__(self):
        HoaDon._dem_hd += 1
        self.so_hd          = f"HD{HoaDon._dem_hd:04d}"
        self.__chi_tiet     = []   # list (MonAn, so_luong)
        self.__giam_gia     = 0

    def them_mon(self, mon, so_luong=1):
        for i, (m, sl) in enumerate(self.__chi_tiet):
            if m.ma == mon.ma:
                self.__chi_tiet[i] = (m, sl + so_luong); return
        self.__chi_tiet.append((mon, so_luong))

    def tinh_tong(self):
        tong = sum(m.gia * sl for m, sl in self.__chi_tiet)
        return tong * (1 - self.__giam_gia / 100)

    def ap_ma_giam_gia(self, ma):
        if ma == "MINDX10":
            self.__giam_gia = 10
            print(f"  ✓ Áp dụng giảm giá 10%")
        else:
            print(f"  ✗ Mã giảm giá không hợp lệ")

    def in_hoa_don(self):
        print(f"\n  {'='*45}")
        print(f"  Hóa đơn: {self.so_hd}")
        print(f"  {'-'*45}")
        for mon, sl in self.__chi_tiet:
            tp = mon.gia * sl
            print(f"  {mon.ten:<20} x{sl:2} = {tp:>10,}đ")
        print(f"  {'-'*45}")
        if self.__giam_gia:
            print(f"  Giảm giá {self.__giam_gia}%")
        print(f"  Tổng cộng: {self.tinh_tong():>12,.0f}đ")
        print(f"  {'='*45}")

    def __str__(self):
        return f"HoaDon({self.so_hd}, {self.tinh_tong():,.0f}đ)"


class NhaHang:
    def __init__(self, ten):
        self.ten            = ten
        self.__thuc_don     = []
        self.__lich_su_hd   = []

    def them_mon(self, mon):
        self.__thuc_don.append(mon)

    def xoa_mon(self, ma):
        for i, m in enumerate(self.__thuc_don):
            if m.ma == ma:
                print(f"  ✓ Xóa: {self.__thuc_don.pop(i).ten}")
                return True
        print(f"  ✗ Không tìm thấy {ma}"); return False

    def tim_mon_theo_ten(self, tu_khoa):
        return [m for m in self.__thuc_don if tu_khoa.lower() in m.ten.lower()]

    def tim_mon_theo_gia(self, gia_toi_da):
        return [m for m in self.__thuc_don if m.gia <= gia_toi_da]

    def tao_hoa_don(self): return HoaDon()

    def luu_hoa_don(self, hd):
        # Cập nhật doanh thu từng món
        for mon, sl in hd._HoaDon__chi_tiet:
            mon.ban(sl)
        self.__lich_su_hd.append(hd)

    def sap_xep_thuc_don(self, theo="gia"):
        if theo == "gia":  return sorted(self.__thuc_don, key=lambda m: m.gia)
        if theo == "ten":  return sorted(self.__thuc_don, key=lambda m: m.ten)
        return self.__thuc_don[:]

    def bao_cao_doanh_thu(self):
        top3  = sorted(self.__thuc_don, key=lambda m: m.get_so_ban(), reverse=True)[:3]
        tong  = sum(m.get_doanh_thu() for m in self.__thuc_don)
        print(f"\n  === BÁO CÁO: {self.ten} ===")
        print(f"  Top 3 món bán chạy:")
        for i, m in enumerate(top3, 1):
            print(f"    {i}. {m.ten}: {m.get_so_ban()} phần | {m.get_doanh_thu():,}đ")
        print(f"  Tổng doanh thu: {tong:,}đ")


# Test
nh = NhaHang("Nhà Hàng MindX")
for data in [
    ("MC01", "Bò Lúc Lắc",       185_000, "Món chính"),
    ("MC02", "Cá Hồi Sốt Bơ",    220_000, "Món chính"),
    ("TM01", "Chè Khúc Bạch",      55_000, "Tráng miệng"),
    ("DU01", "Sinh Tố Bơ",         65_000, "Đồ uống"),
    ("DU02", "Cà Phê Sữa",         35_000, "Đồ uống"),
]:
    nh.them_mon(MonAn(*data))

# Tạo 2 hóa đơn
hd1 = nh.tao_hoa_don()
hd1.them_mon(nh.tim_mon_theo_ten("Bò")[0], 2)
hd1.them_mon(nh.tim_mon_theo_ten("cà phê")[0], 2)
hd1.ap_ma_giam_gia("MINDX10")
hd1.in_hoa_don()
nh.luu_hoa_don(hd1)

hd2 = nh.tao_hoa_don()
hd2.them_mon(nh.tim_mon_theo_ten("Cá")[0], 1)
hd2.them_mon(nh.tim_mon_theo_ten("Sinh Tố")[0], 3)
hd2.in_hoa_don()
nh.luu_hoa_don(hd2)

nh.bao_cao_doanh_thu()
```

---

## 🎯 Tiêu Chí Chấm Điểm

| Tiêu chí | Trọng số |
|----------|----------|
| Thuật toán đúng logic | 40% |
| OOP đúng chuẩn (private, getter, kế thừa) | 30% |
| Code chạy không lỗi | 15% |
| Code sạch, comment, tên biến rõ | 15% |

---

**Buổi tiếp theo (Buổi 10):** Set và Dictionary — cấu trúc dữ liệu mạnh mẽ của Python.

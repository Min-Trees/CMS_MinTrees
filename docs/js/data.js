// ===== Dữ liệu Khóa học =====
// MindX Course - Học Python, Data Science & AI
// Cấu trúc chuẩn theo giáo trình

const coursesData = {
    csb: {
        name: "Python Cơ Bản",
        icon: "",
        color: "#10b981",
        lessons: [
            // ===== BÀI 1: Cú Pháp Python và Biến =====
            {
                id: 1,
                title: "Cú Pháp Python và Biến",
                duration: "90 phút",
                description: "Làm quen với Python: biến, kiểu dữ liệu, toán tử và luồng điều khiển cơ bản",
                objectives: [
                    "Khai báo biến và gán giá trị",
                    "Phân biệt 4 kiểu dữ liệu cơ bản (int, float, str, bool)",
                    "Dùng toán tử số học và so sánh",
                    "Viết chương trình có if/elif/else, for, while",
                    "In kết quả với print() và f-string"
                ],
                sections: [
                    {
                        title: "1.1 Biến và Kiểu Dữ Liệu",
                        icon: "",
                        content: `<strong>Biến</strong> trong Python là nơi lưu trữ dữ liệu, giống như một chiếc hộp có dán nhãn. Bạn đặt tên cho hộp để dễ nhớ và bỏ giá trị vào bên trong.

<strong>Quy tắc đặt tên biến:</strong>
-  Dùng snake_case: tất cả chữ thường, nối bằng dấu gạch dưới
-  Tên phải có ý nghĩa: diem_toan, ten_hoc_sinh
-  Không bắt đầu bằng số: 1diem
-  Không dấu cách: ten hoc sinh
-  Không dùng tiếng Việt có dấu

<strong>4 kiểu dữ liệu cơ bản:</strong>

| Kiểu | Mô tả | Ví dụ |
|------|-------|-------|
| int | Số nguyên | tuoi = 16 |
| float | Số thực | diem = 8.5 |
| str | Chuỗi văn bản | ten = "An" |
| bool | Đúng/Sai | la_hs = True |

<strong>Quy tắc chuyển kiểu khi dùng input():</strong> Hàm input() LUÔN trả về chuỗi. Muốn tính toán phải chuyển sang int/float.`,
                        code: `# Khai báo biến
ten = "Nguyễn Văn An"      # str
tuoi = 16                    # int
diem_tb = 8.5                # float
la_hoc_sinh = True           # bool

# In thông tin
print(f"Họ tên: {ten}")
print(f"Tuổi: {tuoi}")
print(f"Điểm TB: {diem_tb}")
print(f"Là học sinh: {la_hoc_sinh}")

# Kiểm tra kiểu
print(type(ten))      # <class 'str'>
print(type(tuoi))     # <class 'int'>

# Nhập liệu và chuyển kiểu
nam_sinh = int(input("Nhập năm sinh: "))
tuoi_hien_tai = 2024 - nam_sinh
print(f"Bạn {tuoi_hien_tai} tuổi")`
                    },
                    {
                        title: "1.2 Toán Tử Số Học và So Sánh",
                        icon: "",
                        content: `Python hỗ trợ đầy đủ các phép toán như máy tính bỏ túi, cộng thêm một số phép đặc biệt.

<strong>Toán tử số học:</strong>

| Ký hiệu | Ý nghĩa | Ví dụ | Kết quả |
|---------|---------|-------|---------|
| + | Cộng | 7 + 3 | 10 |
| - | Trừ | 10 - 4 | 6 |
| * | Nhân | 3 * 4 | 12 |
| / | Chia (ra float) | 7 / 2 | 3.5 |
| // | Chia lấy phần nguyên | 7 // 2 | 3 |
| % | Chia lấy phần dư | 7 % 2 | 1 |
| ** | Lũy thừa | 2 ** 10 | 1024 |

<strong>Toán tử so sánh</strong> (trả về True/False):

| Ký hiệu | Ý nghĩa | Ví dụ | Kết quả |
|---------|---------|-------|---------|
| == | Bằng | 5 == 5 | True |
| != | Khác | 5 != 3 | True |
| > | Lớn hơn | 8 > 5 | True |
| < | Nhỏ hơn | 3 < 1 | False |
| >= | Lớn hơn hoặc bằng | 8 >= 8 | True |
| <= | Nhỏ hơn hoặc bằng | 3 <= 5 | True |

<strong>Toán tử logic:</strong> and, or, not - dùng để kết hợp nhiều điều kiện.`,
                        code: `# Tính toán mua sắm
tien_co = 50_000
tien_nuoc = 25_000
tien_thua = tien_co - tien_nuoc

print(f"Tiền thừa: {tien_thua:,}đ")  # :, để thêm dấu phẩy

# Kiểm tra số chẵn lẻ với %
so = 7
print(f"{so} là số {'chẵn' if so % 2 == 0 else 'lẻ'}")

# Toán tử so sánh
diem = 8.5
print(f"Điểm >= 5? {diem >= 5}")  # True
print(f"Điểm == 8.5? {diem == 8.5}")  # True

# Toán tử logic - kết hợp điều kiện
diem_toan = 8
diem_van = 5
du_len_lop = diem_toan >= 5 and diem_van >= 5
print(f"Đủ điều kiện lên lớp: {du_len_lop}")`
                    },
                    {
                        title: "1.3 Cấu Trúc Điều Kiện if/elif/else",
                        icon: "",
                        content: `Cấu trúc điều kiện giúp chương trình đưa ra quyết định dựa trên điều kiện.

<strong>Quy tắc quan trọng:</strong>
- Dấu <code>:</code> cuối dòng if/elif/else là BẮT BUỘC
- Thụt lề 4 dấu cách cho code bên trong
- Kiểm tra từ ngưỡng CAO xuống THẤP

<strong>Mẹo nhớ:</strong> Tưởng tượng đèn giao thông:
- Đèn đỏ (if)  dừng
- Đèn vàng (elif)  chuẩn bị  
- Xanh (else)  đi`,
                        code: `diem_tb = 7.5

# Kiểm tra từ cao xuống thấp
if diem_tb >= 9.0:
    xep_loai = "Xuất Sắc"
elif diem_tb >= 8.0:
    xep_loai = "Giỏi"
elif diem_tb >= 6.5:
    xep_loai = "Khá"
elif diem_tb >= 5.0:
    xep_loai = "Trung Bình"
else:
    xep_loai = "Yếu"

print(f"Điểm {diem_tb}  Xếp loại: {xep_loai}")

# Kết hợp and/or
diem_toan = 8
diem_van = 5
if diem_toan >= 5 and diem_van >= 5:
    print("Đủ điều kiện lên lớp")
else:
    print("Phải thi lại")`
                    },
                    {
                        title: "1.4 Vòng Lặp for và while",
                        icon: "",
                        content: `Vòng lặp giúp thực hiện công việc lặp đi lặp lại nhiều lần.

<strong>Vòng for</strong> - Duyệt qua từng phần tử trong danh sách/dãy số. Giống như thu ngân quét từng món hàng.

<strong>Vòng while</strong> - Lặp cho đến khi điều kiện sai. Giống như báo thức reo đến khi bạn tắt.

<strong> Cảnh báo vòng while:</strong> Nếu quên thay đổi biến điều kiện  vòng lặp vô tận  máy treo!`,
                        code: `# Vòng for - in bảng cửu chương
print("Bảng cửu chương 7:")
for i in range(1, 11):
    print(f"  7 x {i:2d} = {7*i}")

# Vòng for với list
diem = [9, 4, 7, 8, 6]
for so_thu_tu, d in enumerate(diem, start=1):
    ket_qua = "Đỗ" if d >= 5 else "Trượt"
    print(f"  Môn {so_thu_tu}: {d} điểm  {ket_qua}")

# Vòng while - đếm ngược
print("\\nĐếm ngược:")
dem = 5
while dem > 0:
    print(f"  {dem}...")
    dem -= 1   # BẮT BUỘC phải thay đổi biến!
print("  Bắt đầu!")`
                    }
                ],
                exercises: [
                    {
                        level: "easy",
                        title: "Máy Tính Đơn Giản",
                        desc: "Nhập 2 số và một phép tính (+, -, *, /). In kết quả. Xử lý chia cho 0.",
                        hint: "Dùng if/elif/else để chọn phép tính"
                    },
                    {
                        level: "medium",
                        title: "Tính Tiền Điện",
                        desc: "Nhập số kWh. Tính tiền: 1 kWh = 3.500đ. In ra tổng tiền.",
                        hint: "tiền = số_kwh × 3500"
                    },
                    {
                        level: "hard",
                        title: "In Hình Tam Giác Sao",
                        desc: "Nhập chiều cao (ví dụ 5). In ra tam giác sao đặc.",
                        hint: "Dùng for lồng nhau hoặc print('*' * i)"
                    },
                    {
                        level: "easy",
                        title: "Chuyển đổi nhiệt độ",
                        desc: "Nhập nhiệt độ C, chuyển sang F (F = C*9/5 + 32) và ngược lại. In bảng chuyển đổi 0-100°C sang °F.",
                        hint: "Dùng for i in range(0, 101, 10): f = i*9/5 + 32"
                    },
                    {
                        level: "medium",
                        title: "Tính giai thừa & dãy Fibonacci",
                        desc: "Viết hàm giai_thua(n) tính n! (dùng for hoặc đệ quy). Viết hàm fibonacci(n) trả về số Fibonacci thứ n. In 10 số Fibonacci đầu tiên.",
                        hint: "Fibonacci: F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2). Giai thừa: 0!=1, n!=n*(n-1)!"
                    },
                    {
                        level: "hard",
                        title: "Game đoán số",
                        desc: "Máy random 1 số 1-100. Người chơi đoán, máy gợi ý 'lớn hơn'/'nhỏ hơn'. Đếm số lần đoán. In 'thắng' khi đúng. Cho chơi lại.",
                        hint: "import random; so = random.randint(1, 100). Dùng while True + break khi đoán đúng"
                    }
                ],
                summary: [
                    "Biến = hộp có nhãn, đặt tên bằng snake_case, không dấu",
                    "4 kiểu dữ liệu: int, float, str, bool - input() luôn trả str",
                    "Toán tử: + - * / // % **, so sánh: == != > < >= <=",
                    "if/elif/else kiểm tra từ cao xuống thấp, thụt lề 4 dấu cách",
                    "for duyệt dãy số, while cần thay đổi biến điều kiện"
                ]
            },

            // ===== BÀI 2: Danh Sách, Hàm và File =====
            {
                id: 2,
                title: "Danh Sách, Hàm và Xử Lý File",
                duration: "90 phút",
                description: "Học cách dùng List để chứa nhiều giá trị, tách code thành hàm và đọc ghi file",
                objectives: [
                    "Tạo và thao tác List (thêm, xóa, sắp xếp, truy cập)",
                    "Định nghĩa hàm với tham số và giá trị trả về",
                    "Dùng tham số mặc định và list comprehension",
                    "Đọc và ghi file với open() + with",
                    "Tách code thành hàm tái sử dụng"
                ],
                sections: [
                    {
                        title: "2.1 List - Danh Sách",
                        icon: "",
                        content: `<strong>List</strong> là dãy các phần tử có thứ tự, giống dãy ngăn tủ có đánh số từ 0.

<strong>Đặc điểm:</strong>
- Index bắt đầu từ 0 (không phải 1)
- Có thể chứa nhiều kiểu dữ liệu
- Có thể thay đổi được (mutable)

<strong>Các thao tác quan trọng:</strong>

| Cú pháp | Ý nghĩa |
|---------|---------|
| ds[i] | Truy cập phần tử thứ i |
| ds[-1] | Phần tử cuối |
| ds.append(x) | Thêm x vào cuối |
| ds.insert(i, x) | Chèn x vào vị trí i |
| ds.remove(x) | Xóa phần tử có giá trị x |
| ds.pop(i) | Xóa và trả về phần tử thứ i |
| len(ds) | Độ dài |
| ds.sort() | Sắp xếp tại chỗ |
| sorted(ds) | Tạo list mới đã sort |
| ds[1:4] | Cắt đoạn từ 1 đến 3 |`,
                        code: `diem = [9, 4, 7, 8, 6]

# Truy cập
print(f"Đầu: {diem[0]}")      # 9
print(f"Cuối: {diem[-1]}")    # 6
print(f"Đoạn 1-3: {diem[1:3]}")  # [4, 7]

# Thêm/Xóa
diem.append(10)      # Thêm 10 vào cuối
diem.insert(0, 5)    # Chèn 5 vào đầu
diem.remove(4)       # Xóa phần tử 4

# Sắp xếp
diem_goc = [9, 4, 7, 8, 6]
diem_tang = sorted(diem_goc)  # [4, 6, 7, 8, 9]
diem_giam = sorted(diem_goc, reverse=True)

# Thống kê
print(f"Max: {max(diem)}, Min: {min(diem)}")
print(f"TB: {sum(diem)/len(diem):.2f}")`
                    },
                    {
                        title: "2.2 Hàm (Function)",
                        icon: "",
                        content: `<strong>Hàm</strong> giúp đóng gói code để tái sử dụng. Giống như máy pha cà phê: bỏ nguyên liệu vào (tham số)  xử lý  ra sản phẩm (return).

<strong>Cú pháp:</strong>
<pre>def ten_ham(tham_so1, tham_so2=mac_dinh):
    '''Mô tả hàm'''
    # xử lý
    return ket_qua</pre>

<strong>Lưu ý:</strong>
- Tham số có giá trị mặc định phải đứng SAU
- Hàm không có return sẽ trả về None
- Có thể return nhiều giá trị (tuple)`,
                        code: `def tinh_trung_binh(danh_sach):
    """Tính điểm trung bình, trả về 0 nếu list rỗng."""
    if not danh_sach:
        return 0
    return sum(danh_sach) / len(danh_sach)

def xep_loai(diem, he_thang=10):
    """Xếp loại theo điểm (hệ 10 mặc định)."""
    ty_le = diem / he_thang * 10
    if ty_le >= 9.0:   return "Xuất Sắc"
    elif ty_le >= 8.0: return "Giỏi"
    elif ty_le >= 6.5: return "Khá"
    elif ty_le >= 5.0: return "Trung Bình"
    else:              return "Yếu"

# Trả về nhiều giá trị
def phan_tich(danh_sach):
    tb = sum(danh_sach) / len(danh_sach)
    return tb, max(danh_sach), min(danh_sach)

tb, cao, thap = phan_tich([8, 9, 7, 6, 10])
print(f"TB: {tb:.1f}, Cao: {cao}, Thấp: {thap}")

# List comprehension
diem = [9, 4, 7, 8, 6, 3]
dat = [d for d in diem if d >= 5]
print(f"Đạt: {dat}")  # [9, 7, 8, 6]`
                    },
                    {
                        title: "2.3 Đọc/Ghi File",
                        icon: "",
                        content: `File giúp lưu dữ liệu vĩnh viễn, không mất khi tắt máy.

<strong>Các chế độ mở file:</strong>

| Mode | Ý nghĩa |
|------|---------|
| "r" | Đọc (file phải tồn tại) |
| "w" | Ghi mới (XÓA nội dung cũ) |
| "a" | Ghi tiếp vào cuối (giữ nội dung cũ) |

<strong> Quan trọng:</strong> Luôn dùng <code>with open()</code> và <code>encoding="utf-8"</code> để đọc tiếng Việt đúng!`,
                        code: `import os

# Ghi file
hoc_sinh = ["An", "Bình", "Cúc"]
diem     = [9.0, 7.5, 8.2]

with open("diem_lop.txt", "w", encoding="utf-8") as f:
    f.write("=== BẢNG ĐIỂM LỚP 10A1 ===\\n")
    for i in range(len(hoc_sinh)):
        f.write(f"{hoc_sinh[i]:<10}: {diem[i]:.1f}\\n")

# Đọc toàn bộ
with open("diem_lop.txt", "r", encoding="utf-8") as f:
    print(f.read())

# Đọc từng dòng
with open("diem_lop.txt", "r", encoding="utf-8") as f:
    for so_dong, dong in enumerate(f, 1):
        print(f"Dòng {so_dong}: {dong.strip()}")

# Ghi tiếp (append)
with open("diem_lop.txt", "a", encoding="utf-8") as f:
    f.write("\\n=== Học sinh mới ===\\n")
    f.write("Dũng       : 7.8\\n")

os.remove("diem_lop.txt")  # Dọn dẹp`
                    }
                ],
                exercises: [
                    {
                        level: "easy",
                        title: "Làm việc với List",
                        desc: "Tạo list 5 điểm. In đầu/cuối, thêm 9.5, xóa điểm thấp nhất, in list đã sort tăng dần.",
                        hint: "Dùng append(), remove(), min(), sorted()"
                    },
                    {
                        level: "medium",
                        title: "Viết 3 hàm cơ bản",
                        desc: "Viết hàm: tinh_tong(ds), dem_gia_tri(ds, x), dao_nguoc(ds). Test với [5, 3, 8, 3, 1, 7, 3].",
                        hint: "Dùng sum(), count(), [::-1]"
                    },
                    {
                        level: "hard",
                        title: "Nhật ký điểm số",
                        desc: "Nhập điểm đến khi nhập -1. Tính TB, cao nhất, thấp nhất, số điểm trên TB. Lưu ra file.",
                        hint: "Dùng while True với break, ghi file với mode 'a'"
                    },
                    {
                        level: "easy",
                        title: "Quản lý danh sách mua sắm",
                        desc: "Menu: 1) Thêm món, 2) Xóa món, 3) Xem danh sách, 4) Đếm tổng món, 5) Tìm món, 6) Thoát. Dùng list + while True.",
                        hint: "while True: print menu → nhận lựa chọn → xử lý bằng if/elif. Break khi chọn 6"
                    },
                    {
                        level: "medium",
                        title: "Thống kê file CSV",
                        desc: "Tạo file CSV 20 học sinh (ten, tuoi, diem). Đọc file, in SV có điểm cao nhất/thấp nhất, tính TB cả lớp, lọc SV đạt (>=5), lưu SV đạt ra file mới.",
                        hint: "Đọc: f.readlines() rồi split(','). Ghi: open(path, 'w'). Dùng list comprehension để lọc"
                    },
                    {
                        level: "hard",
                        title: "Từ điển đơn giản",
                        desc: "Đọc file văn bản tiếng Anh/Việt. a) Đếm tần suất mỗi từ. b) Tìm 10 từ xuất hiện nhiều nhất. c) Tìm từ dài nhất. d) Đếm tổng số từ duy nhất.",
                        hint: "text.lower().split() để tách từ. dict.get(tu, 0) + 1 để đếm. sorted() với key=lambda x: -x[1]"
                    }
                ],
                summary: [
                    "List index bắt đầu từ 0, dùng append/insert/remove/pop để thay đổi",
                    "Hàm = máy tái sử dụng: def + return, tham số mặc định đứng sau",
                    "List comprehension: [x for x in ds if dk] - cú pháp ngắn gọn",
                    "File: luôn dùng with open() + encoding='utf-8' cho tiếng Việt"
                ]
            },

            // ===== BÀI 3: OOP Phần 1 =====
            {
                id: 3,
                title: "Lập Trình Hướng Đối Tượng - Phần 1",
                duration: "90 phút",
                description: "Class, Object, Tính đóng gói và Kế thừa trong Python",
                objectives: [
                    "Hiểu tại sao cần OOP",
                    "Định nghĩa class với __init__ và self",
                    "Tạo object, truy cập thuộc tính, gọi phương thức",
                    "Áp dụng Tính Đóng Gói với __private, getter, setter",
                    "Xây dựng quan hệ kế thừa class cha - con"
                ],
                sections: [
                    {
                        title: "3.1 Tại Sao Cần OOP?",
                        icon: "",
                        content: `Khi quản lý 30 học sinh, nếu không OOP sẽ có 90 biến rải rác. OOP gói gọn thành các object có tổ chức.

<strong>Khái niệm cốt lõi:</strong>

| Thực tế | OOP |
|---------|-----|
| Bản thiết kế nhà | <code>class</code> |
| Ngôi nhà cụ thể | <code>object</code> |
| Diện tích, màu sơn | thuộc tính (attribute) |
| Mở cửa, bật đèn | phương thức (method) |

<strong>Cú pháp class cơ bản:</strong>
<pre>class TenClass:
    def __init__(self, tham_so):
        self.thuoc_tinh = tham_so

    def phuong_thuc(self):
        return ket_qua

obj = TenClass("giá trị")</pre>

<strong>self</strong> = đại diện cho object hiện tại. Mỗi object có bản sao riêng của các thuộc tính.`,
                        code: `class HocSinh:
    """Class đại diện cho một học sinh."""

    def __init__(self, ten, lop, diem_cac_mon):
        self.ten         = ten
        self.lop         = lop
        self.diem_cac_mon = diem_cac_mon

    def tinh_diem_trung_binh(self):
        if not self.diem_cac_mon:
            return 0
        return sum(self.diem_cac_mon) / len(self.diem_cac_mon)

    def xep_loai(self):
        tb = self.tinh_diem_trung_binh()
        if tb >= 8.0:   return "Giỏi"
        elif tb >= 6.5: return "Khá"
        elif tb >= 5.0: return "Trung Bình"
        else:           return "Yếu"

    def gioi_thieu(self):
        print(f"  {self.ten} | Lớp: {self.lop} | TB: {self.tinh_diem_trung_binh():.2f} | {self.xep_loai()}")

# Tạo objects
hs1 = HocSinh("Nguyễn An", "10A1", [9, 8, 10, 7])
hs2 = HocSinh("Trần Bình", "10A2", [6, 7, 5, 8])
hs3 = HocSinh("Lê Cúc",   "10A1", [10, 9, 8, 10])

hs1.gioi_thieu()
hs2.gioi_thieu()
hs3.gioi_thieu()`
                    },
                    {
                        title: "3.2 Tính Đóng Gói (Encapsulation)",
                        icon: "",
                        content: `<strong>Đóng gói</strong> = bảo vệ dữ liệu bên trong object, chỉ cho phép truy cập qua các phương thức được kiểm soát.

<strong>Quy tắc:</strong>
- <code>__ten_bien</code> (2 dấu gạch dưới)  private, bên ngoài không truy cập trực tiếp được
- <code>_ten_bien</code> (1 dấu)  protected, quy ước không nên truy cập
- Getter: phương thức đọc dữ liệu
- Setter: phương thức ghi dữ liệu có kiểm tra

<strong>Ví dụ thực tế:</strong> Tủ ATM - bạn không thể thò tay vào lấy tiền, chỉ dùng nút bấm (phương thức).`,
                        code: `class TaiKhoanNganHang:
    def __init__(self, so_tai_khoan, ten_chu, so_du_ban_dau=0):
        self.so_tai_khoan  = so_tai_khoan
        self.ten_chu       = ten_chu
        self.__so_du       = so_du_ban_dau   # Private
        self.__lich_su_gd  = []              # Private

    def get_so_du(self):
        return self.__so_du

    def nap_tien(self, so_tien):
        if so_tien <= 0:
            print("Số tiền phải > 0!")
            return False
        self.__so_du += so_tien
        self.__lich_su_gd.append(f"Nạp: +{so_tien:,}")
        print(f" Nạp {so_tien:,}đ | Số dư: {self.__so_du:,}đ")
        return True

    def rut_tien(self, so_tien):
        if so_tien <= 0:
            print("Số tiền phải > 0!")
            return False
        if so_tien > self.__so_du:
            print(f"Số dư không đủ! (Có: {self.__so_du:,}đ)")
            return False
        self.__so_du -= so_tien
        self.__lich_su_gd.append(f"Rút: -{so_tien:,}")
        print(f" Rút {so_tien:,}đ | Còn: {self.__so_du:,}đ")
        return True

    def in_lich_su(self):
        print(f"\\nLịch sử [{self.so_tai_khoan}]:")
        for gd in self.__lich_su_gd:
            print(f"  • {gd}")

# Demo
tk = TaiKhoanNganHang("STK001", "Nguyễn An", 500_000)
tk.nap_tien(300_000)
tk.rut_tien(200_000)
tk.rut_tien(800_000)   # Thất bại
print(f"Số dư qua getter: {tk.get_so_du():,}đ")
tk.in_lich_su()`
                    },
                    {
                        title: "3.3 Tính Kế Thừa (Inheritance)",
                        icon: "",
                        content: `<strong>Kế thừa</strong> cho phép class con thừa hưởng tất cả thuộc tính/phương thức từ class cha, đồng thời mở rộng thêm.

<strong>Cú pháp:</strong>
<pre>class Cha:
    def __init__(self, ten):
        self.ten = ten

class Con(Cha):
    def __init__(self, ten, tuoi):
        super().__init__(ten)   # Gọi constructor cha
        self.tuoi = tuoi</pre>

<strong>super()</strong> = gọi phương thức/class cha. BẮT BUỘC gọi super().__init__() trong constructor class con để khởi tạo đầy đủ thuộc tính từ cha.`,
                        code: `class NhanVien:
    """Class cha - nhân viên thông thường."""
    def __init__(self, ten, phong_ban, luong_co_ban):
        self.ten       = ten
        self.phong_ban = phong_ban
        self.__luong   = luong_co_ban

    def get_luong(self):  return self.__luong
    def tang_luong(self, phan_tram):
        if 0 < phan_tram <= 30:
            self.__luong *= (1 + phan_tram / 100)
            print(f" Lương {self.ten} tăng {phan_tram}%  {self.__luong:,.0f}đ")

class QuanLy(NhanVien):
    """Class con - kế thừa NhanVien, thêm nhóm phụ trách."""
    def __init__(self, ten, phong_ban, luong_co_ban, nhan_vien_pt):
        super().__init__(ten, phong_ban, luong_co_ban)  # Gọi cha
        self.__nv_phu_trach = nhan_vien_pt

    def them_nhan_vien(self, nv):
        self.__nv_phu_trach.append(nv)
        print(f"+ {nv.ten} báo cáo cho {self.ten}")

class GiamDoc(QuanLy):
    """Class cháu - kế thừa QuanLy."""
    def __init__(self, ten, luong_co_ban, cong_ty):
        super().__init__(ten, "Ban Giám Đốc", luong_co_ban, [])
        self.cong_ty = cong_ty

    def ra_quyet_dinh(self, quyet_dinh):
        print(f" {self.ten} ({self.cong_ty}) quyết định: {quyet_dinh}")

# Demo
nv1 = NhanVien("Hoàng Minh", "Kỹ thuật", 15_000_000)
ql  = QuanLy("Lê Nam",    "Kỹ thuật", 25_000_000, [nv1])
gd  = GiamDoc("Trần Bình", 50_000_000, "MindX Tech")

gd.ra_quyet_dinh("Mở thêm văn phòng tại Đà Nẵng")
print(f"gd là GiamDoc? {isinstance(gd, GiamDoc)}")   # True
print(f"gd là NhanVien? {isinstance(gd, NhanVien)}")  # True`
                    }
                ],
                exercises: [
                    {
                        level: "easy",
                        title: "Class Xe Hơi",
                        desc: "Tạo class XeHoi với: hang_xe, mau_xe, toc_do (=0). Phương thức: tang_toc(them), giam_toc(bot), mo_ta().",
                        hint: "Dùng self.toc_do trong các phương thức"
                    },
                    {
                        level: "medium",
                        title: "Đóng gói Mật Khẩu",
                        desc: "Class TaiKhoan(ten_dang_nhap, mat_khau). __mat_khau private. Phương thức dang_nhap(mat_khau_nhap), doi_mat_khau(cu, moi).",
                        hint: "So sánh chuỗi bằng ==, cập nhật private trong setter"
                    },
                    {
                        level: "hard",
                        title: "Kế thừa Động Vật",
                        desc: "Class DongVat(ten, can_nang) với an(), ngu(). Class Cho(DongVat) thêm sua(n). Class Meo(DongVat) thêm de_thuong().",
                        hint: "Dùng super().__init__() trong class con"
                    },
                    {
                        level: "easy",
                        title: "Class Học Sinh cơ bản",
                        desc: "Tạo class HocSinh(ten, tuoi, lop) với __init__, hien_thi(), diem_tb(d1, d2, d3). Tạo 3 HS, in thông tin + điểm TB.",
                        hint: "def diem_tb(self, d1, d2, d3): return (d1+d2+d3)/3"
                    },
                    {
                        level: "medium",
                        title: "Quản lý tài khoản ngân hàng",
                        desc: "Class TaiKhoan(so_tk, ten, __so_du private). Phương thức: nap(tien), rut(tien) [kiểm tra đủ số dư], xem_so_du(). Class NganHang quản lý list TaiKhoan, có hàm tim_theo_so_tk().",
                        hint: "rut: if tien > self.__so_du: print 'Không đủ'; return. Cập nhật self.__so_du"
                    },
                    {
                        level: "hard",
                        title: "Hệ thống cửa hàng mini",
                        desc: "Class SanPham(ma, ten, gia, __so_luong private). Class DonHang(ma_dh, list sp). Class CuaHang: thêm/xóa SP, tạo đơn hàng, tính tổng tiền đơn, trừ tồn kho khi thanh toán, in hóa đơn.",
                        hint: "Đơn hàng chứa list (SanPham, so_luong). Trừ tồn: sp._SanPham__so_luong -= sl khi thanh toán"
                    }
                ],
                summary: [
                    "Class = khuôn, Object = sản phẩm, __init__ chạy khi tạo object",
                    "self = object hiện tại, dùng self.thuoc_tinh để lưu trữ",
                    "Đóng gói: __private bảo vệ dữ liệu, dùng getter/setter kiểm soát",
                    "Kế thừa: class Con(Cha), super().__init__() để gọi constructor cha"
                ]
            },

            // ===== BÀI 4: OOP Phần 2 =====
            {
                id: 4,
                title: "Lập Trình Hướng Đối Tượng - Phần 2",
                duration: "90 phút",
                description: "Tính đa hình, Abstract class và cách kết hợp 4 tính chất OOP",
                objectives: [
                    "Giải thích Tính Đa Hình và method override",
                    "Định nghĩa Abstract Class với ABC và @abstractmethod",
                    "Áp dụng nguyên tắc 'code theo abstract, không theo cụ thể'",
                    "Kết hợp 4 tính chất OOP trong dự án nhỏ"
                ],
                sections: [
                    {
                        title: "4.1 Tính Đa Hình (Polymorphism)",
                        icon: "",
                        content: `<strong>Đa hình</strong> = cùng một tên phương thức, hành vi khác nhau tùy object.

<strong>Ví dụ thực tế:</strong> Nút "Phát nhạc" trên điện thoại, tivi, laptop - cùng tên nhưng phát qua thiết bị khác nhau.

<strong>2 loại đa hình trong Python:</strong>
- <strong>Override</strong>: Class con định nghĩa lại phương thức cha
- <strong>Duck typing</strong>: Không cần kế thừa, chỉ cần có phương thức cùng tên`,
                        code: `import math

class HinhHoc:
    def __init__(self, ten):
        self.ten = ten
    def dien_tich(self): return 0
    def chu_vi(self):    return 0
    def in_thong_tin(self):
        print(f"  {self.ten:<15}: S={self.dien_tich():.2f} | P={self.chu_vi():.2f}")

class HinhTron(HinhHoc):
    def __init__(self, ban_kinh):
        super().__init__("Hình Tròn")
        self.r = ban_kinh
    def dien_tich(self):   return math.pi * self.r ** 2
    def chu_vi(self):      return 2 * math.pi * self.r

class HinhChuNhat(HinhHoc):
    def __init__(self, cd, cr):
        super().__init__("Hình Chữ Nhật")
        self.cd, self.cr = cd, cr
    def dien_tich(self):   return self.cd * self.cr
    def chu_vi(self):      return 2 * (self.cd + self.cr)

class HinhVuong(HinhChuNhat):
    def __init__(self, canh):
        super().__init__(canh, canh)
        self.ten = "Hình Vuông"

class HinhTamGiac(HinhHoc):
    def __init__(self, a, b, c):
        super().__init__("Tam Giác")
        self.a, self.b, self.c = a, b, c
    def dien_tich(self):
        s = (self.a + self.b + self.c) / 2
        return math.sqrt(s * (s-self.a) * (s-self.b) * (s-self.c))
    def chu_vi(self):  return self.a + self.b + self.c

# Đa hình: cùng gọi dien_tich() nhưng kết quả khác
hinh = [HinhTron(5), HinhChuNhat(4, 6), HinhVuong(3), HinhTamGiac(3, 4, 5)]
for h in hinh:
    h.in_thong_tin()`
                    },
                    {
                        title: "4.2 Tính Trừu Tượng (Abstraction)",
                        icon: "",
                        content: `<strong>Trừu tượng</strong> = ẩn chi tiết phức tạp, chỉ lộ ra giao diện cần thiết.

<strong>Ví dụ:</strong> Hành khách thấy ghế, màn hình, nút gọi - không cần biết buồng lái phức tạp.

<strong>Abstract Class</strong>:
- Không tạo object trực tiếp được
- Định nghĩa "hợp đồng" bắt buộc class con phải tuân theu
- Dùng module <code>abc</code> với <code>ABC</code> và <code>@abstractmethod</code>

<strong>Import bắt buộc:</strong>
<pre>from abc import ABC, abstractmethod</pre>`,
                        code: `from abc import ABC, abstractmethod

class PhuongThucThanhToan(ABC):
    """Abstract class - hợp đồng cho mọi phương thức thanh toán."""
    def __init__(self, ten):
        self.ten = ten

    @abstractmethod
    def xu_ly_thanh_toan(self, so_tien):
        pass

    @abstractmethod
    def xac_nhan(self):
        pass

    def in_bien_lai(self, so_tien):
        print(f"\\n=== BIÊN LAI ===")
        print(f"Phương thức: {self.ten}")
        print(f"Số tiền: {so_tien:,}đ")
        self.xac_nhan()
        print("=================")


class ThanhToanTienMat(PhuongThucThanhToan):
    def __init__(self):
        super().__init__("Tiền Mặt")
    def xu_ly_thanh_toan(self, so_tien):
        print(f"Nhận {so_tien:,}đ tiền mặt")
    def xac_nhan(self):
        print("Xác nhận bằng phiếu thu")


class ThanhToanThe(PhuongThucThanhToan):
    def __init__(self, so_the):
        super().__init__("Thẻ Ngân Hàng")
        self.__so_the = so_the
    def xu_ly_thanh_toan(self, so_tien):
        print(f"Quẹt thẻ **** {self.__so_the[-4:]} — {so_tien:,}đ")
    def xac_nhan(self):
        print("Giao dịch được ngân hàng phê duyệt")

# Demo
cac_pt = [ThanhToanTienMat(), ThanhToanThe("1234567890123456")]
for pt in cac_pt:
    pt.xu_ly_thanh_toan(350_000)
    pt.in_bien_lai(350_000)

# Không thể tạo object từ abstract class
try:
    p = PhuongThucThanhToan("Test")
except TypeError as e:
    print(f"\\nLỗi: {e}")`
                    }
                ],
                exercises: [
                    {
                        level: "easy",
                        title: "Đa hình Animal",
                        desc: "Tạo 4 class: DongVat (cha), Cho, Meo, Chim. Mỗi class override phat_am().",
                        hint: "Tạo list 6 con vật, dùng 1 vòng for gọi phat_am()"
                    },
                    {
                        level: "medium",
                        title: "Abstract Hình học",
                        desc: "Tạo abstract class HinhHoc(ABC) với dien_tich() và chu_vi(). Triển khai HinhChuNhat, HinhTron.",
                        hint: "Thử tạo HinhHoc() trực tiếp - quan sát lỗi"
                    },
                    {
                        level: "hard",
                        title: "Hệ thống nhân viên",
                        desc: "Abstract class NhanVien với abstractmethod tinh_luong_thang(). Tạo 3 class con: ToanThoiGian, TheoGio, HoaHong.",
                        hint: "Mỗi class con có công thức tính lương khác nhau"
                    },
                    {
                        level: "easy",
                        title: "Đa hình với Phương Tiện",
                        desc: "Class PTGT (cha) với di_chuyen(). Class XeDap, XeMay, OTo kế thừa và override di_chuyen() với nội dung khác nhau. Tạo list 5 PTGT, in cách di chuyển.",
                        hint: "Dùng 1 vòng for pt in ds: pt.di_chuyen() - mỗi loại tự in cách riêng"
                    },
                    {
                        level: "medium",
                        title: "Template Method với Game",
                        desc: "Abstract class Game với template_method() gọi: khoi_tao() → bat_dau() → ket_thuc(). Class GameCoCaro, GameBaiPhom override các bước. Test chạy 2 game.",
                        hint: "Template method định nghĩa khung, class con override từng bước"
                    },
                    {
                        level: "hard",
                        title: "Hệ thống thanh toán đa hình",
                        desc: "Abstract PTThanhToan với thanh_toan(so_tien). Class TheTinDung (có han_muc), ViDienTu (so_du), TienMat (gioi_han 5tr). Mỗi class kiểm tra điều kiện riêng. Class CuaHang xử lý thanh toán bằng nhiều PT khác nhau.",
                        hint: "TheTinDung: if so_tien > han_muc: fail. ViDienTu: if so_tien > so_du: fail. TienMat: if so_tien > 5tr: fail"
                    }
                ],
                summary: [
                    "Đa hình: cùng tên phương thức, hành vi khác nhau theo class",
                    "Override: class con viết lại phương thức cha",
                    "Abstract class: dùng ABC + @abstractmethod, không tạo object trực tiếp",
                    "4 tính chất OOP: Đóng gói - Kế thừa - Đa hình - Trừu tượng"
                ]
            },

            // ===== BÀI 5: Kiểm Tra Định Kỳ Lần 1 =====
            {
                id: 5,
                title: "Kiểm Tra Định Kỳ Lần 1",
                duration: "90 phút",
                description: "Đánh giá tổng hợp kiến thức Python cơ bản và OOP",
                objectives: [
                    "Đánh giá mức độ hiểu Python cơ bản (Buổi 1-2)",
                    "Đánh giá khả năng áp dụng OOP (Buổi 3-4)",
                    "Nhận diện điểm mạnh và điểm cần cải thiện"
                ],
                sections: [
                    {
                        title: "5.1 Phần Python Cơ Bản",
                        icon: "",
                        content: `<strong>Checklist trước khi kiểm tra:</strong>

<strong>Python Cơ Bản (Buổi 1)</strong>
-  Khai báo biến, 4 kiểu dữ liệu cơ bản
-  if/elif/else, điều kiện lồng nhau
-  for i in range(...) vs for x in list
-  while và cách thoát vòng lặp

<strong>Danh Sách, Hàm, File (Buổi 2)</strong>
-  List: append, remove, pop, sort, slice
-  def ham(tham_so, mac_dinh=gia_tri) + return
-  with open("file", "r/w/a", encoding="utf-8")
-  List comprehension: [x for x in ds if dk]

<strong>OOP (Buổi 3-4)</strong>
-  class, __init__, self
-  __private + getter/setter
-  class Con(Cha) + super().__init__()
-  Override phương thức
-  from abc import ABC, abstractmethod`,
                        code: `# Đề mẫu - Câu 1: List và Hàm
def phan_tich_nhiet_do(ds):
    """Trả về dict chứa thống kê nhiệt độ."""
    if not ds:
        return {}
    return {
        "cao_nhat"     : max(ds),
        "thap_nhat"    : min(ds),
        "trung_binh"   : round(sum(ds) / len(ds), 1),
        "so_ngay_nong" : sum(1 for t in ds if t >= 35),
    }

nhiet_do = [28, 35, 40, 32, 38, 25, 35, 29]
ket_qua  = phan_tich_nhiet_do(nhiet_do)
for k, v in ket_qua.items():
    print(f"{k:<15}: {v}")

# Câu 2: File I/O
import os

def ghi_file(ds, ten_file):
    with open(ten_file, "w", encoding="utf-8") as f:
        for item in ds:
            f.write(f"{item}\\n")

def doc_file(ten_file):
    with open(ten_file, "r", encoding="utf-8") as f:
        return [float(dong.strip()) for dong in f if dong.strip()]

ghi_file(nhiet_do, "nhiet_do.txt")
doc_lai = doc_file("nhiet_do.txt")
print(f"\\nĐọc lại: {phan_tich_nhiet_do(doc_lai)}")
os.remove("nhiet_do.txt")`
                    },
                    {
                        title: "5.2 Đề Thi - Hệ Thống Thư Viện",
                        icon: "",
                        content: `<strong>Đề bài:</strong> Xây dựng hệ thống quản lý thư viện với 3 class: Sach, SachGiaoKhoa, ThuVien.

<strong>Yêu cầu:</strong>

<strong>Class Sach (1.5đ)</strong>
- Thuộc tính: ten_sach, tac_gia, nam_xuat_ban
- __so_trang private, có getter
- Phương thức gioi_thieu(), __str__()

<strong>Class SachGiaoKhoa(Sach) và SachThamKhao(Sach) (1.5đ)</strong>
- SGK thêm mon_hoc, lop_su_dung
- STK thêm linh_vuc, do_kho
- Override gioi_thieu()

<strong>Class ThuVien (2đ)</strong>
- __danh_sach_sach private
- them_sach, tim_kiem, sap_xep_theo_nam, thong_ke`,
                        code: `class Sach:
    def __init__(self, ten, tac_gia, nam, so_trang):
        self.ten_sach     = ten
        self.tac_gia      = tac_gia
        self.nam_xuat_ban = nam
        self.__so_trang   = so_trang

    def get_so_trang(self):  return self.__so_trang

    def gioi_thieu(self):
        print(f" {self.ten_sach} | {self.tac_gia} | {self.nam_xuat_ban}")

    def __str__(self):
        return f"{self.ten_sach} ({self.tac_gia}, {self.nam_xuat_ban})"


class SachGiaoKhoa(Sach):
    def __init__(self, ten, tac_gia, nam, so_trang, mon_hoc, lop):
        super().__init__(ten, tac_gia, nam, so_trang)
        self.mon_hoc     = mon_hoc
        self.lop_su_dung = lop

    def gioi_thieu(self):
        super().gioi_thieu()
        print(f"    SGK {self.mon_hoc} - Lớp {self.lop_su_dung}")


class SachThamKhao(Sach):
    def __init__(self, ten, tac_gia, nam, so_trang, linh_vuc, do_kho):
        super().__init__(ten, tac_gia, nam, so_trang)
        self.linh_vuc = linh_vuc
        self.do_kho   = do_kho

    def gioi_thieu(self):
        super().gioi_thieu()
        print(f"    Lĩnh vực: {self.linh_vuc} | Độ khó: {self.do_kho}")


class ThuVien:
    def __init__(self, ten):
        self.ten              = ten
        self.__danh_sach_sach = []

    def them_sach(self, sach):
        self.__danh_sach_sach.append(sach)

    def tim_kiem(self, tu_khoa):
        tk = tu_khoa.lower()
        return [s for s in self.__danh_sach_sach
                if tk in s.ten_sach.lower() or tk in s.tac_gia.lower()]

    def sap_xep_theo_nam(self):
        return sorted(self.__danh_sach_sach, key=lambda s: s.nam_xuat_ban)

    def thong_ke(self):
        print(f"\\n=== {self.ten} ===")
        print(f"Tổng số sách: {len(self.__danh_sach_sach)}")
        print(f"SGK: {sum(1 for s in self.__danh_sach_sach if isinstance(s, SachGiaoKhoa))}")
        print(f"STK: {sum(1 for s in self.__danh_sach_sach if isinstance(s, SachThamKhao))}")


# Test
tv = ThuVien("MindX Library")
tv.them_sach(SachGiaoKhoa("Toán 10", "Bộ GD", 2022, 180, "Toán", "10"))
tv.them_sach(SachThamKhao("Python Cơ Bản", "Nguyễn A", 2021, 350, "Lập Trình", "Dễ"))
tv.thong_ke()

for s in tv.tim_kiem("python"):
    s.gioi_thieu()`
                    }
                ],
                exercises: [
                    {
                        level: "easy",
                        title: "Phân tích điểm học sinh",
                        desc: "Nhập danh sách điểm (nhập đến khi gõ -1). Viết hàm thong_ke(ds) trả về dict: {'tb':, 'cao':, 'thap':, 'so_dat':, 'ty_le_dat':%}. In kết quả đẹp.",
                        hint: "Dùng while True + break khi nhập -1. Tính TB = sum/len, số đạt = sum(1 for d in ds if d>=5)"
                    },
                    {
                        level: "medium",
                        title: "Quản lý lớp học với class",
                        desc: "Class HocSinh(ten, diem_cac_mon: list), Class LopHoc(ten_lop). Thêm hs, tính TB cả lớp, tìm HS cao nhất/thấp nhất, xếp loại theo TB. Lưu/đọc file CSV.",
                        hint: "Dùng list để chứa HS. File dùng with open + write. TB = sum/len, xếp loại như Bài 1"
                    },
                    {
                        level: "hard",
                        title: "Hệ thống ATM mini",
                        desc: "Class TaiKhoan(so_tk, ten, __so_du private). Class ATM quản lý dict {so_tk: TaiKhoan}. Chức năng: rut, nap, chuyen_khoan (có kiểm tra số dư), in sao kê giao dịch, lưu lịch sử.",
                        hint: "__so_du dùng getter. Chuyển khoản: trừ tk gửi + cộng tk nhận. Lịch sử là list tuple (loai, so_tien, thoi_gian)"
                    },
                    {
                        level: "easy",
                        title: "Quản lý danh bạ điện thoại",
                        desc: "Class LienLac(ten, sdt, email). Class DanhBa quản lý dict {ten: LienLac}. Chức năng: thêm, xóa, tìm kiếm theo tên, hiển thị tất cả, lưu/đọc file JSON.",
                        hint: "import json; json.dump() để ghi, json.load() để đọc. Dict để tra cứu O(1)"
                    },
                    {
                        level: "medium",
                        title: "Hệ thống thi trắc nghiệm",
                        desc: "Class CauHoi(cau, dapan_dung, 4_dap_an). Class BaiThi có list câu hỏi, hàm thi() cho user nhập đáp án, chấm điểm và in kết quả. Lưu kết quả ra file.",
                        hint: "input() để nhập đáp án (a/b/c/d). So sánh với dapan_dung để cộng điểm. Lưu file: 'ten_thi: diem/tong'"
                    },
                    {
                        level: "hard",
                        title: "Quản lý thư viện nâng cao",
                        desc: "Kết hợp: Class Sach, DocGia, TheMuon(ma_the, doc_gia, sach, ngay_muon, ngay_tra). Class ThuVien: thêm sách/độc giả, cho mượn (có giới hạn 3 sách/người, 14 ngày), tính tiền phạt trả muộn (5k/ngày). Lưu log giao dịch ra file.",
                        hint: "Cho mượn: kiểm tra sách available + số sách đang mượn của DG. Phạt = max(0, ngay_tra - han) * 5000"
                    }
                ],
                summary: [
                    "Ôn tập toàn bộ kiến thức Buổi 1-4",
                    "Làm đề tổng hợp: List, Function, File, OOP",
                    "Thi trong 60 phút, không tra cứu tài liệu"
                ]
            },

            // ===== BÀI 6: Thuật Toán Tìm Kiếm =====
            {
                id: 6,
                title: "Thuật Toán Tìm Kiếm",
                duration: "90 phút",
                description: "Linear Search và Binary Search - hai thuật toán nền tảng",
                objectives: [
                    "Cài đặt Linear Search (tìm kiếm tuyến tính)",
                    "Cài đặt Binary Search (tìm kiếm nhị phân) - iterative và recursive",
                    "So sánh độ phức tạp O(n) và O(log n)",
                    "Áp dụng vào bài toán thực tế"
                ],
                sections: [
                    {
                        title: "6.1 Linear Search - Tìm Kiếm Tuyến Tính",
                        icon: "",
                        content: `<strong>Linear Search</strong> = duyệt từng phần tử từ đầu đến cuối.

<strong>Đặc điểm:</strong>
-  Làm việc với bất kỳ danh sách nào (đã sort hay chưa)
-  Dễ cài đặt
-  Chậm với danh sách lớn

<strong>Độ phức tạp: O(n)</strong> - số bước tỉ lệ thuận với kích thước.

| n phần tử | Số bước (xấu nhất) |
|-----------|---------------------|
| 10 | 10 |
| 1.000 | 1.000 |
| 1.000.000 | 1.000.000 |`,
                        code: `def linear_search(ds, can_tim):
    """Tìm kiếm tuyến tính. Trả về index hoặc -1 nếu không thấy."""
    for i in range(len(ds)):
        if ds[i] == can_tim:
            return i
    return -1

# Test
ds = [5, 2, 8, 1, 9, 3]
vi_tri = linear_search(ds, 8)
print(f"Tìm 8 ở vị trí: {vi_tri}")     # 2
print(f"Tìm 99: {linear_search(ds, 99)}")  # -1

# Tìm trong list objects
class HocSinh:
    def __init__(self, ten, ma, diem):
        self.ten, self.ma, self.diem = ten, ma, diem
    def __str__(self):  return f"{self.ma}: {self.ten} ({self.diem})"

def tim_theo_ma(ds_hs, ma):
    for hs in ds_hs:
        if hs.ma == ma:
            return hs
    return None

lop = [HocSinh("An", "HS001", 8.5), HocSinh("Bình", "HS002", 7.2)]
hs = tim_theo_ma(lop, "HS002")
print(f"Tìm: {hs}")  # HS002: Bình (7.2)`
                    },
                    {
                        title: "6.2 Binary Search - Tìm Kiếm Nhị Phân",
                        icon: "",
                        content: `<strong>Binary Search</strong> = chia đôi danh sách đã sắp xếp để tìm kiếm.

<strong>Điều kiện BẮT BUỘC:</strong> Danh sách phải được sắp xếp trước!

<strong>Cách hoạt động:</strong>
1. Nhìn phần tử GIỮA
2. Nếu bằng  tìm thấy
3. Nếu cần tìm lớn hơn  tìm nửa phải
4. Nếu nhỏ hơn  tìm nửa trái
5. Lặp lại đến khi tìm thấy hoặc hết

<strong>Độ phức tạp: O(log n)</strong>

| n | Số bước |
|---|---------|
| 1.000 | 10 |
| 1.000.000 | 20 |
| 1.000.000.000 | 30 |

Với 1 triệu phần tử, Binary Search nhanh hơn Linear Search 50.000 lần!`,
                        code: `def binary_search(ds_da_sort, can_tim):
    """Binary search iterative. YÊU CẦU ds đã sort."""
    trai, phai = 0, len(ds_da_sort) - 1
    while trai <= phai:
        giua  = (trai + phai) // 2
        pt_giua = ds_da_sort[giua]
        if pt_giua == can_tim:
            return giua
        elif pt_giua < can_tim:
            trai = giua + 1
        else:
            phai = giua - 1
    return -1

def binary_search_de_quy(ds, can_tim, trai=0, phai=None):
    """Binary search đệ quy."""
    if phai is None: phai = len(ds) - 1
    if trai > phai:  return -1
    giua = (trai + phai) // 2
    if ds[giua] == can_tim:    return giua
    if ds[giua] < can_tim:     return binary_search_de_quy(ds, can_tim, giua+1, phai)
    return binary_search_de_quy(ds, can_tim, trai, giua-1)

# Test
ds_sort = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
for x in [11, 1, 19, 6]:
    idx = binary_search(ds_sort, x)
    print(f"Tìm {x}: index {idx}")

# So sánh tốc độ
import time, random
n = 1_000_000
ds = sorted(random.sample(range(n*10), n))
x = ds[n//2]

t0 = time.perf_counter()
binary_search(ds, x)
print(f"Binary tìm trong list 1 triệu: {(time.perf_counter()-t0)*1000:.3f}ms")`
                    }
                ],
                exercises: [
                    {
                        level: "easy",
                        title: "Tìm kiếm cơ bản",
                        desc: "Cho ds = [15, 8, 3, 22, 7, 19, 11, 4]. Linear tìm 22, 99. Sort rồi Binary tìm cùng 2 giá trị. So sánh số bước.",
                        hint: "Đếm số lần so sánh trong mỗi hàm"
                    },
                    {
                        level: "medium",
                        title: "Tìm kiếm tên học sinh",
                        desc: "10 học sinh. a) Linear: tìm tất cả có tên chứa từ khóa. b) Sort theo điểm, Binary tìm điểm = 8.5.",
                        hint: "Linear trả về list, Binary trả về 1 hoặc None"
                    },
                    {
                        level: "hard",
                        title: "Tìm kiếm trong file",
                        desc: "Viết 20 sản phẩm ra file. Linear theo tên, sort theo giá rồi Binary theo giá. Đo thời gian 1000 lần tìm.",
                        hint: "Dùng time.perf_counter() để đo thời gian"
                    },
                    {
                        level: "easy",
                        title: "Tìm max, min, mode",
                        desc: "Cho ds = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]. a) Tìm max/min bằng linear. b) Tìm mode (giá trị xuất hiện nhiều nhất) bằng dict. c) Đếm số lần xuất hiện mỗi giá trị.",
                        hint: "Mode: dùng dict đếm tần suất, tìm key có value lớn nhất. Hoặc dùng statistics.mode"
                    },
                    {
                        level: "medium",
                        title: "Tìm kiếm theo điều kiện",
                        desc: "Cho 20 SV (tên, tuổi, điểm). a) Tìm tất cả SV điểm >= 8.0 (linear). b) Sort theo điểm, tìm SV đầu tiên đạt >= 9.0 (binary). c) Tìm SV trẻ nhất đạt điểm 10.",
                        hint: "Linear trả về list, Binary trả về object đầu tiên tìm được (lowest bound)"
                    },
                    {
                        level: "hard",
                        title: "Binary Search đệ quy",
                        desc: "Cài đặt binary_search_recursive(ds, target, left, right) dùng đệ quy. So sánh hiệu năng với iterative qua 1000 lần tìm với n=10000. In kết quả đo.",
                        hint: "Đệ quy: if left > right: return -1. So sánh time.perf_counter() cho cả 2 cách"
                    }
                ],
                summary: [
                    "Linear Search: O(n), không cần sort, đơn giản",
                    "Binary Search: O(log n), BẮT BUỘC list đã sort",
                    "Với n=1 triệu: Linear=1.000.000 bước, Binary=20 bước (nhanh hơn 50.000 lần)"
                ]
            },

            // ===== BÀI 7: Thuật Toán Sắp Xếp =====
            {
                id: 7,
                title: "Thuật Toán Sắp Xếp",
                duration: "90 phút",
                description: "Bubble Sort, Insertion Sort và Quick Sort",
                objectives: [
                    "Cài đặt Bubble Sort, Insertion Sort, Quick Sort",
                    "Hiểu đệ quy và base case trong Quick Sort",
                    "So sánh độ phức tạp O(n²) vs O(n log n)",
                    "Sắp xếp objects theo nhiều tiêu chí"
                ],
                sections: [
                    {
                        title: "7.1 Bubble Sort - Sắp Xếp Nổi Bọt",
                        icon: "",
                        content: `<strong>Bubble Sort</strong>: so sánh cặp phần tử liền kề, đổi chỗ nếu sai thứ tự. Sau mỗi lượt, phần tử lớn nhất "nổi" về cuối.

<strong>Độ phức tạp: O(n²)</strong> - chậm với dữ liệu lớn.

<strong>Ưu điểm:</strong> Đơn giản, dễ hiểu, có thể dừng sớm nếu list đã sort.`,
                        code: `def bubble_sort(ds):
    """Bubble sort - trả về list mới."""
    arr = ds.copy()
    n = len(arr)
    for luot in range(n - 1):
        for j in range(n - 1 - luot):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

def bubble_sort_toi_uu(ds):
    """Có cờ dừng sớm nếu list đã sort."""
    arr = ds.copy()
    n = len(arr)
    for luot in range(n - 1):
        thay_doi = False
        for j in range(n - 1 - luot):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                thay_doi = True
        if not thay_doi:
            print(f"  Dừng sớm sau {luot+1} lượt!")
            break
    return arr

ds = [5, 2, 8, 1, 9, 3]
print(f"Gốc: {ds}")
print(f"Sort: {bubble_sort(ds)}")
print(f"Gốc (không đổi): {ds}")

# Test dừng sớm
bubble_sort_toi_uu([1, 2, 3, 5, 4])  # Chỉ cần 1 lượt`
                    },
                    {
                        title: "7.2 Insertion Sort - Sắp Xếp Chèn",
                        icon: "",
                        content: `<strong>Insertion Sort</strong>: lấy từng phần tử, chèn vào đúng vị trí trong phần đã sort.

<strong>Ẩn dụ:</strong> Sắp bài trên tay - tay trái có bài đã sort, nhặt quân mới chèn vào đúng chỗ.

<strong>Ưu điểm:</strong> Rất nhanh với dữ liệu gần sort (O(n))
<strong>Nhược điểm:</strong> O(n²) với dữ liệu ngẫu nhiên lớn`,
                        code: `def insertion_sort(ds):
    """Insertion sort - chèn từng phần tử vào đúng vị trí."""
    arr = ds.copy()
    n = len(arr)
    for i in range(1, n):
        khoa = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > khoa:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = khoa
    return arr

ds = [5, 2, 8, 1, 9, 3]
print(f"Insertion sort: {insertion_sort(ds)}")

# Test với dữ liệu gần sort - rất nhanh
import time
gan_sort = list(range(1000))
gan_sort[998], gan_sort[999] = gan_sort[999], gan_sort[998]  # Gần sort

t0 = time.perf_counter()
insertion_sort(gan_sort)
print(f"Insertion với data gần sort (1000 p.tử): {(time.perf_counter()-t0)*1000:.3f}ms")`
                    },
                    {
                        title: "7.3 Quick Sort - Sắp Xếp Nhanh",
                        icon: "",
                        content: `<strong>Quick Sort</strong>: chọn pivot, chia thành 2 nhóm nhỏ/lớn hơn pivot, đệ quy sắp xếp 2 nhóm.

<strong>Ẩn dụ:</strong> Chọn đội trưởng rồi chia phe - ai thấp hơn bên trái, cao hơn bên phải.

<strong>Độ phức tạp trung bình: O(n log n)</strong> - nhanh nhất trong 3 thuật toán!

<strong> QUAN TRỌNG:</strong> Phải có base case <code>if len(ds) <= 1</code> để dừng đệ quy, nếu không sẽ RecursionError!`,
                        code: `def quick_sort(ds):
    """Quick sort đệ quy - tạo list mới."""
    if len(ds) <= 1:        # Base case BẮT BUỘC
        return ds
    pivot = ds[-1]
    nho = [x for x in ds[:-1] if x <= pivot]
    lon = [x for x in ds[:-1] if x > pivot]
    return quick_sort(nho) + [pivot] + quick_sort(lon)

ds = [5, 2, 8, 1, 9, 3]
print(f"Quick sort: {quick_sort(ds)}")

# So sánh 3 thuật toán
import time, random

def benchmark(n):
    ds = [random.randint(1, 10000) for _ in range(n)]
    t0 = time.perf_counter(); bubble_sort(ds);      t_b = time.perf_counter() - t0
    t0 = time.perf_counter(); insertion_sort(ds);   t_i = time.perf_counter() - t0
    t0 = time.perf_counter(); quick_sort(ds);       t_q = time.perf_counter() - t0
    print(f"n={n:>5}: Bubble={t_b*1000:.2f}ms | Insertion={t_i*1000:.2f}ms | Quick={t_q*1000:.2f}ms")

for n in [100, 500, 1000]:
    benchmark(n)`
                    }
                ],
                exercises: [
                    {
                        level: "easy",
                        title: "Chạy tay Bubble Sort",
                        desc: "Mảng [4, 7, 2, 9, 1, 5, 3]. a) Vẽ ra giấy từng bước lượt 1 và 2. b) Cài đặt code, in từng lượt.",
                        hint: "Quan sát phần tử lớn nhất di chuyển về cuối sau mỗi lượt"
                    },
                    {
                        level: "medium",
                        title: "Sắp xếp đa tiêu chí",
                        desc: "8 sách (tên, năm XB, số trang). Sort: a) năm tăng, b) trang giảm, c) năm rồi trang.",
                        hint: "key=lambda s: (s.nam, s.trang)"
                    },
                    {
                        level: "hard",
                        title: "Đo tốc độ thực tế",
                        desc: "Tạo 3 list ngẫu nhiên n=100, 500, 1000. Chạy cả 3 thuật toán, in bảng so sánh, nhận xét.",
                        hint: "Dùng time.perf_counter() và lặp nhiều lần để có kết quả chính xác"
                    },
                    {
                        level: "easy",
                        title: "Selection Sort tự cài",
                        desc: "Cài đặt selection_sort(ds) - tìm min đưa về đầu. Test với [5, 2, 8, 1, 9, 3]. In từng bước.",
                        hint: "Vòng ngoài i, vòng trong tìm min trong [i:n], swap vị trí i với min_idx"
                    },
                    {
                        level: "medium",
                        title: "Sắp xếp theo tên tiếng Việt",
                        desc: "Cho 10 SV có tên tiếng Việt có dấu. Sort theo tên A-Z. Sau đó sort theo tên rồi theo tuổi giảm dần.",
                        hint: "Dùng key=lambda sv: (sv.ten.lower(), -sv.tuoi). Python sort theo unicode mặc định"
                    },
                    {
                        level: "hard",
                        title: "Merge Sort hai list đã sort",
                        desc: "Viết hàm merge_sorted_lists(list1, list2) trộn 2 list đã sắp xếp thành 1 list đã sort mà KHÔNG dùng sort(). Test với [1,3,5,7] và [2,4,6,8].",
                        hint: "Dùng 2 con trỏ i, j. So sánh list1[i] và list2[j], thêm phần tử nhỏ hơn vào kết quả"
                    }
                ],
                summary: [
                    "Bubble Sort: đổi cặp kề nhau, O(n²), dễ hiểu, có thể dừng sớm",
                    "Insertion Sort: chèn vào đúng chỗ, O(n²), nhanh với data gần sort",
                    "Quick Sort: pivot + đệ quy, O(n log n) TB, nhanh nhất"
                ]
            },

            // ===== BÀI 8: Thực Hành Tổng Hợp =====
            {
                id: 8,
                title: "Thực Hành Tổng Hợp",
                duration: "90 phút",
                description: "Project thư viện kết hợp OOP, List, Tìm kiếm, Sắp xếp và File",
                objectives: [
                    "Kết hợp OOP + List + Tìm kiếm + Sắp xếp + File",
                    "Thiết kế class theo quan hệ hợp lý",
                    "Xây dựng menu tương tác với input()",
                    "Xử lý lỗi với try/except"
                ],
                sections: [
                    {
                        title: "8.1 Xử Lý Lỗi với try/except",
                        icon: "",
                        content: `<strong>try/except</strong> = lưới an toàn cho chương trình, giúp không "chết" khi gặp input sai.

<strong>Cú pháp:</strong>
<pre>try:
    # Code có thể gây lỗi
except LoạiLỗi:
    # Xử lý khi lỗi
finally:
    # Luôn chạy dù lỗi hay không</pre>

<strong>Ẩn dụ:</strong> Diễn viên nhào lộn cần lưới an toàn - chương trình cần try/except.`,
                        code: `def nhap_so_hop_le(thong_bao, kieu=float, nho_nhat=None, lon_nhat=None):
    """Nhập số đến khi hợp lệ."""
    while True:
        try:
            gia_tri = kieu(input(thong_bao))
            if nho_nhat is not None and gia_tri < nho_nhat:
                print(f"  Phải >= {nho_nhat}"); continue
            if lon_nhat is not None and gia_tri > lon_nhat:
                print(f"  Phải <= {lon_nhat}"); continue
            return gia_tri
        except ValueError:
            print(f"  Lỗi: nhập {'số nguyên' if kieu == int else 'số'}!")

# Test (chạy thử manual)
# tuoi = nhap_so_hop_le("Tuổi: ", kieu=int, nho_nhat=1, lon_nhat=120)
# diem = nhap_so_hop_le("Điểm (0-10): ", nho_nhat=0, lon_nhat=10)

# Demo không cần input
try:
    diem = float("abc")
except ValueError:
    print(" Lỗi: phải nhập số!")
finally:
    print(" Kết thúc xử lý")`
                    },
                    {
                        title: "8.2 Project: Hệ Thống Quản Lý Thư Viện",
                        icon: "",
                        content: `<strong>Thiết kế class:</strong>
- <strong>Sach</strong>: mã, tên, tác giả, thể loại, năm XB, __so_trang, __muon
- <strong>ThuVien</strong>: HAS-A nhiều Sach (composition)

<strong>Quan hệ HAS-A vs IS-A:</strong>
- IS-A (kế thừa): "Xe tải IS-A Phương tiện"
- HAS-A (hợp thành): "Thư viện HAS-A nhiều Sách"`,
                        code: `import os

class Sach:
    def __init__(self, ma, ten, tac_gia, the_loai, nam_xb, so_trang):
        self.ma, self.ten, self.tac_gia = ma, ten, tac_gia
        self.the_loai, self.nam_xb = the_loai, nam_xb
        self.__so_trang = so_trang
        self.__muon     = False

    def get_so_trang(self):  return self.__so_trang
    def dang_muon(self):     return self.__muon

    def muon_sach(self):
        if self.__muon:
            print(f" '{self.ten}' đang được mượn!")
            return False
        self.__muon = True
        print(f" Mượn thành công: '{self.ten}'")
        return True

    def tra_sach(self):
        if not self.__muon:
            print(f" '{self.ten}' chưa được mượn!")
            return False
        self.__muon = False
        print(f" Trả sách: '{self.ten}'")
        return True

    def __str__(self):
        tt = " Đang mượn" if self.__muon else " Có sẵn"
        return f"[{self.ma}] {self.ten:<25} | {self.tac_gia:<15} | {tt}"

    def to_csv(self):
        return f"{self.ma}|{self.ten}|{self.tac_gia}|{self.the_loai}|{self.nam_xb}|{self.__so_trang}|{int(self.__muon)}\\n"


class ThuVien:
    def __init__(self, ten, file="thu_vien.txt"):
        self.ten    = ten
        self.__file = file
        self.__sach = []
        self._tai()

    def _tai(self):
        if not os.path.exists(self.__file): return
        try:
            with open(self.__file, "r", encoding="utf-8") as f:
                for dong in f:
                    dong = dong.strip()
                    if not dong: continue
                    p = dong.split("|")
                    if len(p) < 7: continue
                    s = Sach(p[0], p[1], p[2], p[3], int(p[4]), int(p[5]))
                    if int(p[6]): s.muon_sach()
                    self.__sach.append(s)
            print(f" Tải {len(self.__sach)} sách")
        except Exception as e:
            print(f" Lỗi: {e}")

    def luu(self):
        with open(self.__file, "w", encoding="utf-8") as f:
            for s in self.__sach:
                f.write(s.to_csv())

    def them_sach(self, sach):
        if any(s.ma == sach.ma for s in self.__sach):
            print(f" Trùng mã {sach.ma}!"); return False
        self.__sach.append(sach)
        print(f" Thêm: '{sach.ten}'")
        return True

    def tim_theo_ma(self, ma):
        ds_sort = sorted(self.__sach, key=lambda s: s.ma)
        mas = [s.ma for s in ds_sort]
        t, p = 0, len(mas) - 1
        while t <= p:
            g = (t + p) // 2
            if mas[g] == ma:    return ds_sort[g]
            elif mas[g] < ma:   t = g + 1
            else:               p = g - 1
        return None

    def tim_theo_tu_khoa(self, tk):
        tk = tk.lower()
        return [s for s in self.__sach if tk in s.ten.lower() or tk in s.tac_gia.lower()]

    def sap_xep(self, tieu_chi="ten"):
        if tieu_chi == "ten":   return sorted(self.__sach, key=lambda s: s.ten)
        if tieu_chi == "nam":   return sorted(self.__sach, key=lambda s: s.nam_xb)
        return self.__sach[:]

    def thong_ke(self):
        print(f"\\n=== {self.ten} ===")
        print(f"Tổng: {len(self.__sach)}")
        print(f"Đang mượn: {sum(1 for s in self.__sach if s.dang_muon())}")
        print(f"Có sẵn: {sum(1 for s in self.__sach if not s.dang_muon())}")

    def in_ds(self, ds=None):
        ds = ds or self.__sach
        for s in ds: print(f"  {s}")


# Demo
tv = ThuVien("MindX Library", "demo.txt")
for s in [
    Sach("P001", "Python Cơ Bản", "Nguyễn A", "Lập Trình", 2022, 350),
    Sach("P002", "Thuật Toán", "Trần B", "Lập Trình", 2021, 480),
]:
    tv.them_sach(s)

tv.thong_ke()
s = tv.tim_theo_ma("P001")
if s: s.muon_sach()
tv.thong_ke()
tv.luu()
os.remove("demo.txt")`
                    }
                ],
                exercises: [
                    {
                        level: "easy",
                        title: "Mở rộng class Sach",
                        desc: "Thêm __so_lan_muon private. Khi muon_sach() thành công  tăng lên 1. In Top 3 sách được mượn nhiều nhất.",
                        hint: "Dùng sorted() với key=lambda s: s.get_so_lan_muon()"
                    },
                    {
                        level: "medium",
                        title: "Thêm class DocGia",
                        desc: "Class DocGia(ten, ma). __sach_dang_muon là list mã sách. Phương thức muon(ma), tra(ma), in_ds().",
                        hint: "Sửa ThuVien.muon_sach() nhận thêm DocGia"
                    },
                    {
                        level: "hard",
                        title: "Hệ thống hoàn chỉnh",
                        desc: "Kết hợp Sach, DocGia, ThuVien vào menu tương tác đầy đủ với try/except cho input.",
                        hint: "while True với break khi chọn 'Thoát'"
                    },
                    {
                        level: "easy",
                        title: "Quản lý sản phẩm kho",
                        desc: "Class SanPham(ma, ten, gia, so_luong). Class Kho chứa dict {ma: SanPham}. Chức năng: nhập kho, xuất kho (giảm SL), tìm sản phẩm theo tên, in báo cáo tồn kho.",
                        hint: "Xuất kho: if sp.so_luong >= sl: sp.so_luong -= sl else: print 'Không đủ'. Dict để tra cứu nhanh"
                    },
                    {
                        level: "medium",
                        title: "Hệ thống bán vé xem phim",
                        desc: "Class Phim(ten, the_loai, thoi_luong). Class SuatChieu(phim, gio, phong, gia_ve). Class Rap chứa list SuatChieu. Đặt vé (chọn suất + số vé), hủy vé, in vé đã đặt theo khách hàng.",
                        hint: "Lưu dict {khach: [ve_da_dat]}. Hủy vé: xóa khỏi dict, cập nhật lại số vé còn lại"
                    },
                    {
                        level: "hard",
                        title: "Quản lý khách sạn",
                        desc: "Class Phong(so_phong, loai, gia, __trang_thai private). Class Khach(ten, cmnd, ds_phong_dang_thue). Class KhachSan: check-in, check-out (có tính tiền theo số đêm), báo cáo phòng trống/phòng đang thuê, doanh thu theo ngày. Lưu log ra file.",
                        hint: "Check-out: tien = so_dem * phong.gia. Dict {so_phong: Phong}. Có thể dùng datetime để tính số đêm"
                    }
                ],
                summary: [
                    "try/except giúp chương trình không crash khi input sai",
                    "HAS-A: ThưViện có nhiều Sách - dùng composition",
                    "Kết hợp: OOP + List + Tìm kiếm + Sắp xếp + File"
                ]
            },

            // ===== BÀI 9: Kiểm Tra Định Kỳ Lần 2 =====
            {
                id: 9,
                title: "Kiểm Tra Định Kỳ Lần 2",
                duration: "90 phút",
                description: "Đánh giá thuật toán tìm kiếm, sắp xếp và OOP tổng hợp",
                objectives: [
                    "Cài đặt Binary Search và các thuật toán sắp xếp",
                    "Thiết kế OOP cho bài toán thực tế",
                    "Kết hợp nhiều kỹ năng trong 1 chương trình"
                ],
                sections: [
                    {
                        title: "9.1 Phần Thuật Toán",
                        icon: "",
                        content: `<strong>Đề bài Phần 1 (4 điểm):</strong>

<strong>Câu 1.1 - Sắp xếp (2đ):</strong>
Cho <code>diem = [7.5, 9.0, 6.0, 8.5, 5.5, 9.0, 7.0, 4.5]</code>
- a) Insertion Sort tăng dần, in từng bước
- b) Quick Sort giảm dần
- c) Hàm tim_vi_tri_chen(ds_sort, x) dùng Binary Search

<strong>Câu 1.2 - Tìm kiếm (2đ):</strong>
Cho list nhiệt độ 12 tháng
- a) Binary tìm tháng có 35°C
- b) Linear tìm tất cả tháng trong [28, 35]
- c) Tìm tháng có nhiệt độ gần nhất với lý tưởng`,
                        code: `# Câu 1.1: Insertion Sort
def insertion_sort_in_buoc(ds):
    arr = ds.copy()
    print(f"  Bắt đầu: {arr}")
    for i in range(1, len(arr)):
        khoa = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > khoa:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = khoa
        print(f"  Chèn {khoa}: {arr}")
    return arr

# Quick Sort giảm dần
def quick_sort_giam(ds):
    if len(ds) <= 1: return ds
    pivot = ds[-1]
    nho = [x for x in ds[:-1] if x >= pivot]
    lon = [x for x in ds[:-1] if x < pivot]
    return quick_sort_giam(nho) + [pivot] + quick_sort_giam(lon)

# Binary Search vị trí chèn
def tim_vi_tri_chen(ds_sort, x):
    trai, phai = 0, len(ds_sort)
    while trai < phai:
        giua = (trai + phai) // 2
        if ds_sort[giua] < x: trai = giua + 1
        else:                 phai = giua
    return trai

diem = [7.5, 9.0, 6.0, 8.5, 5.5, 9.0, 7.0, 4.5]
print("Insertion Sort:")
insertion_sort_in_buoc(diem)
print(f"\\nQuick Sort giảm: {quick_sort_giam(diem)}")

ds_sort = sorted(diem)
for x in [5.0, 8.0, 10.0, 4.0]:
    print(f"  Chèn {x}  vị trí {tim_vi_tri_chen(ds_sort, x)}")`
                    },
                    {
                        title: "9.2 Đề Thi - Hệ Thống Nhà Hàng",
                        icon: "",
                        content: `<strong>Đề bài Phần 2 (6 điểm):</strong> Hệ thống quản lý nhà hàng với 3 class.

<strong>Class MonAn (1đ):</strong>
- ma_mon, ten, gia, danh_muc
- __so_luong_ban private
- ban(so_phan), get_doanh_thu(), __str__()

<strong>Class HoaDon (2đ):</strong>
- __danh_sach_mon là list tuple (MonAn, so_luong)
- them_mon, tinh_tong, ap_ma_giam_gia("MINDX10"  10%)
- in_hoa_don đẹp

<strong>Class NhaHang (3đ):</strong>
- __thuc_don, __lich_su_hoa_don private
- them_mon, xoa_mon, tim_mon_theo_ten, tim_mon_theo_gia
- tao_hoa_don, luu_hoa_don
- sap_xep_thuc_don, bao_cao_doanh_thu (Top 3 bán chạy)`,
                        code: `class MonAn:
    def __init__(self, ma, ten, gia, danh_muc):
        self.ma, self.ten, self.gia, self.danh_muc = ma, ten, gia, danh_muc
        self.__so_ban = 0

    def ban(self, so_phan):  self.__so_ban += so_phan
    def get_doanh_thu(self): return self.gia * self.__so_ban
    def get_so_ban(self):    return self.__so_ban
    def __str__(self):
        return f"[{self.ma}] {self.ten:<20} {self.gia:>10,}đ ({self.danh_muc})"


class HoaDon:
    _dem = 0
    def __init__(self):
        HoaDon._dem += 1
        self.so_hd      = f"HD{HoaDon._dem:04d}"
        self.__chi_tiet = []
        self.__giam_gia = 0

    def them_mon(self, mon, so_luong=1):
        for i, (m, sl) in enumerate(self.__chi_tiet):
            if m.ma == mon.ma:
                self.__chi_tiet[i] = (m, sl + so_luong); return
        self.__chi_tiet.append((mon, so_luong))

    def tinh_tong(self):
        tong = sum(m.gia * sl for m, sl in self.__chi_tiet)
        return tong * (1 - self.__giam_gia / 100)

    def ap_ma(self, ma):
        if ma == "MINDX10":
            self.__giam_gia = 10
            print(" Áp dụng giảm 10%")
        else:
            print(" Mã không hợp lệ")

    def in_hoa_don(self):
        print(f"\\n{'='*40}\\n  Hóa đơn: {self.so_hd}\\n{'-'*40}")
        for mon, sl in self.__chi_tiet:
            print(f"  {mon.ten:<20} x{sl:2} = {mon.gia*sl:>10,}đ")
        print(f"{'-'*40}\\n  TỔNG: {self.tinh_tong():>12,.0f}đ\\n{'='*40}")


class NhaHang:
    def __init__(self, ten):
        self.ten = ten
        self.__thuc_don   = []
        self.__lich_su_hd = []

    def them_mon(self, mon):  self.__thuc_don.append(mon)
    def xoa_mon(self, ma):
        for i, m in enumerate(self.__thuc_don):
            if m.ma == ma:
                print(f" Xóa: {self.__thuc_don.pop(i).ten}"); return
        print(f" Không thấy {ma}")

    def tim_theo_ten(self, tk):
        return [m for m in self.__thuc_don if tk.lower() in m.ten.lower()]
    def tim_theo_gia(self, max_gia):
        return [m for m in self.__thuc_don if m.gia <= max_gia]
    def tao_hoa_don(self):  return HoaDon()
    def luu_hoa_don(self, hd):
        for mon, sl in hd._HoaDon__chi_tiet:
            mon.ban(sl)
        self.__lich_su_hd.append(hd)
    def sap_xep(self, theo="gia"):
        if theo == "gia": return sorted(self.__thuc_don, key=lambda m: m.gia)
        if theo == "ten": return sorted(self.__thuc_don, key=lambda m: m.ten)
        return self.__thuc_don[:]
    def bao_cao(self):
        top = sorted(self.__thuc_don, key=lambda m: m.get_so_ban(), reverse=True)[:3]
        tong = sum(m.get_doanh_thu() for m in self.__thuc_don)
        print(f"\\n=== {self.ten} ===")
        for i, m in enumerate(top, 1):
            print(f"  #{i} {m.ten}: {m.get_so_ban()} phần | {m.get_doanh_thu():,}đ")
        print(f"Tổng DT: {tong:,}đ")

# Test
nh = NhaHang("MindX Restaurant")
for d in [("MC01", "Bò Lúc Lắc", 185000, "Món chính"),
          ("DU01", "Cà Phê Sữa", 35000, "Đồ uống")]:
    nh.them_mon(MonAn(*d))

hd = nh.tao_hoa_don()
hd.them_mon(nh.tim_theo_ten("Bò")[0], 2)
hd.ap_ma("MINDX10")
hd.in_hoa_don()
nh.luu_hoa_don(hd)
nh.bao_cao()`
                    }
                ],
                exercises: [
                    {
                        level: "easy",
                        title: "Quick Sort giảm dần",
                        desc: "Viết hàm quick_sort_giam(ds) sắp xếp giảm dần không dùng sorted(). Test với ds = [7.5, 9.0, 6.0, 8.5, 5.5, 9.0, 7.0, 4.5]. In từng bước chia mảng.",
                        hint: "Chọn pivot cuối, nho = [x for x in ds[:-1] if x >= pivot], lon = [x for x in ds[:-1] if x < pivot]"
                    },
                    {
                        level: "medium",
                        title: "Binary Search nhiều lần",
                        desc: "Viết hàm binary_search_all(ds_sort, target) trả về TẤT CẢ vị trí của target (kết quả có thể có nhiều phần tử giống nhau). Test với ds = [1,3,5,5,5,7,9], target=5  [2,3,4].",
                        hint: "Tìm vị trí đầu tiên bằng binary search, sau đó mở rộng sang 2 bên (vì mảng đã sort)"
                    },
                    {
                        level: "hard",
                        title: "Hệ thống quản lý đơn hàng",
                        desc: "Class DonHang(ma, ten_kh, ds_sp: list). Class CuaHang quản lý list DonHang. Chức năng: thêm đơn, tìm theo mã (binary search khi đã sort theo mã), sắp xếp theo tổng tiền (merge sort), thống kê top 5 KH tiêu nhiều nhất, lưu/đọc file.",
                        hint: "Binary search cần list đã sort theo mã. Merge sort: chia đôi → sort từng nửa → trộn. Top 5: sort descending rồi lấy [:5]"
                    },
                    {
                        level: "easy",
                        title: "Sắp xếp và tìm kiếm cơ bản",
                        desc: "Cho 15 số ngẫu nhiên. a) Sort tăng dần (Bubble hoặc Insertion). b) Tìm một giá trị (Binary Search). c) In vị trí tìm được và số bước so sánh.",
                        hint: "Binary: chia đôi → so sánh giữa với target → chọn nửa phù hợp. Đếm bước bằng biến đếm"
                    },
                    {
                        level: "medium",
                        title: "Hệ thống quản lý điểm",
                        desc: "Class MonHoc(ten, diem_he_4). Class SinhVien(ten, ma, dict {mon: diem}). Tính GPA (trung bình có trọng số theo số tín chỉ). Sort DS theo GPA. Tìm SV có GPA cao nhất mỗi ngành. Lưu/đọc JSON.",
                        hint: "Trọng số: tong(diem_he_4 * tin_chi) / tong(tin_chi). JSON: json.dump/load"
                    },
                    {
                        level: "hard",
                        title: "Hệ thống phòng Gym",
                        desc: "Abstract class ThietBi với kiem_tra_tinh_trang(). Class MayChay (gio_su_dung, max=1000), TaGan (so_lan_nang, max=500). Class PhongGym quản lý list ThietBi. Chức năng: thêm/xóa thiết bị, dùng thiết bị (tăng chỉ số sử dụng), in cảnh báo thiết bị cần bảo trì, thống kê số lần sử dụng. Merge sort danh sách thiết bị theo số lần dùng.",
                        hint: "ABC + abstractmethod. Sử dụng thiết bị: thi_bi.su_dung() (override trong mỗi class con)"
                    }
                ],
                summary: [
                    "Thi trong 65 phút: thuật toán + OOP tổng hợp",
                    "Yêu cầu: code chạy được, logic đúng, OOP chuẩn"
                ]
            },

            // ===== BÀI 10: Set và Dictionary =====
            {
                id: 10,
                title: "Set và Dictionary",
                duration: "90 phút",
                description: "Hai cấu trúc dữ liệu mạnh mẽ: tập hợp và từ điển",
                objectives: [
                    "Tạo và thao tác Set: thêm, xóa, toán tử tập hợp",
                    "Tạo và thao tác Dict: CRUD, items, nested",
                    "Biết khi nào dùng Set/Dict thay vì List",
                    "Áp dụng dict comprehension và set comprehension"
                ],
                sections: [
                    {
                        title: "10.1 Set - Tập Hợp",
                        icon: "",
                        content: `<strong>Set</strong> = tập hợp các giá trị DUY NHẤT, KHÔNG CÓ THỨ TỰ.

<strong>Đặc điểm so sánh với List:</strong>

| Đặc điểm | List | Set |
|----------|------|-----|
| Thứ tự |  Có |  Không |
| Trùng lặp |  Cho phép |  Tự loại |
| Index |  Có |  Không |
| Kiểm tra <code>in</code> | O(n) | O(1) - nhanh hơn 1000x! |

<strong>Toán tử tập hợp:</strong>
- <code>A | B</code>  Hợp
- <code>A & B</code>  Giao
- <code>A - B</code>  Hiệu
- <code>A ^ B</code>  Đối xứng

<strong> Lưu ý:</strong> Set rỗng dùng <code>set()</code>, không dùng <code>{}</code> (đó là dict rỗng).`,
                        code: `tap_hop = {1, 2, 3}        # Set có phần tử
rỗng    = set()            # Set rỗng - KHÔNG dùng {}

# Loại bỏ trùng từ list
ds_trung = [1, 2, 2, 3, 3, 3, 4]
ds_duy_nhat = list(set(ds_trung))
print(f"Sau khi loại trùng: {sorted(ds_duy_nhat)}")

# Toán tử tập hợp
mon_lop_A = {"Toán", "Lý", "Hóa", "Văn", "Anh"}
mon_lop_B = {"Toán", "Anh", "Sử", "Địa", "Sinh"}

print(f"Giao (môn chung): {sorted(mon_lop_A & mon_lop_B)}")
print(f"Hợp (tất cả):     {sorted(mon_lop_A | mon_lop_B)}")
print(f"Chỉ lớp A:         {sorted(mon_lop_A - mon_lop_B)}")

# So sánh tốc độ in
import time
ds_list = list(range(1_000_000))
ds_set  = set(range(1_000_000))
x = 999_999

t0 = time.perf_counter()
for _ in range(1000): x in ds_list
t_list = time.perf_counter() - t0

t0 = time.perf_counter()
for _ in range(1000): x in ds_set
t_set  = time.perf_counter() - t0

print(f"\\n'in list': {t_list*1000:.2f}ms")
print(f"'in set' : {t_set*1000:.3f}ms (nhanh hơn {t_list/t_set:.0f}x)")`
                    },
                    {
                        title: "10.2 Dictionary - Từ Điển",
                        icon: "",
                        content: `<strong>Dictionary</strong> = tập hợp cặp <strong>key: value</strong>, tra cứu theo key cực nhanh O(1).

<strong>Đặc điểm:</strong>
- Key phải DUY NHẤT
- Key phải không thể thay đổi (str, int, tuple)
- Value có thể là bất cứ gì
- Tra cứu O(1) - rất nhanh

<strong>Ẩn dụ:</strong> Danh bạ điện thoại - tra tên ra số ngay lập tức.`,
                        code: `hoc_sinh = {
    "ten"  : "Nguyễn An",
    "lop"  : "10A1",
    "diem" : [8, 9, 7, 10],
    "dat"  : True,
}

# Truy cập
print(hoc_sinh["ten"])            # "Nguyễn An"
print(hoc_sinh.get("tuoi", 16))   # 16 (mặc định nếu không có)

# Thêm/sửa
hoc_sinh["tuoi"] = 16
hoc_sinh["diem"].append(9)

# Xóa
del hoc_sinh["dat"]
tuoi = hoc_sinh.pop("tuoi", None)

# Duyệt
quan_the = {"Hà Nội": 8_400_000, "HCM": 9_200_000}
for tp, ds in quan_the.items():
    print(f"  {tp}: {ds:,} người")

# Đếm từ xuất hiện
van_ban = "apple banana apple cherry banana apple"
dem_tu = {}
for tu in van_ban.split():
    dem_tu[tu] = dem_tu.get(tu, 0) + 1
print(f"\\nTần suất: {dem_tu}")

# Dict comprehension
so = [1, 2, 3, 4, 5]
binh_phuong = {x: x**2 for x in so}
print(f"Bình phương: {binh_phuong}")

chan_bp = {x: x**2 for x in so if x % 2 == 0}
print(f"Số chẵn và BP: {chan_bp}")`
                    }
                ],
                exercises: [
                    {
                        level: "easy",
                        title: "Set cơ bản",
                        desc: "ds1 = [1, 2, 2, 3, 4, 4, 5], ds2 = [3, 4, 5, 6, 7]. a) Chuyển set, in Hợp, Giao, Hiệu. b) Đếm phần tử duy nhất trong [1,2,2,3,3,3,4].",
                        hint: "set() chuyển list thành set, len(set) đếm duy nhất"
                    },
                    {
                        level: "medium",
                        title: "Dict thống kê",
                        desc: "Đoạn văn 50 chữ. a) Đếm từ xuất hiện. b) Từ nhiều nhất. c) 5 từ dài nhất không trùng.",
                        hint: "dict.get(tu, 0) + 1 để đếm"
                    },
                    {
                        level: "hard",
                        title: "Phân tích môn học",
                        desc: "10 học sinh đăng ký 3-5 môn. a) Môn nhiều HS chọn nhất. b) Ai học giống nhau nhất. c) Ai học tất cả môn bắt buộc.",
                        hint: "Dùng intersection() giữa các set"
                    },
                    {
                        level: "easy",
                        title: "Đếm ký tự trong chuỗi",
                        desc: "Nhập 1 chuỗi. a) Đếm mỗi ký tự xuất hiện bao nhiêu lần (dict). b) Ký tự xuất hiện nhiều nhất. c) Set các ký tự duy nhất. d) Dict comprehension: {char: ord(char) for char in set(s)}.",
                        hint: "dict.get(char, 0) + 1 để đếm. Hoặc Counter từ collections"
                    },
                    {
                        level: "medium",
                        title: "Quản lý nhân viên theo phòng ban",
                        desc: "Dict {phong_ban: set(nhan_vien)}. a) Thêm/xóa NV khỏi phòng. b) NV thuộc nhiều phòng (set chứa dict). c) Liệt kê NV thuộc cả 2 phòng. d) Phòng có nhiều NV nhất.",
                        hint: "Nested structure. intersection(): set1 & set2. Tìm max theo len"
                    },
                    {
                        level: "hard",
                        title: "Hệ thống từ điển Anh-Việt",
                        desc: "Đọc file từ điển (word: meaning). Tìm kiếm nhanh O(1) bằng dict. a) Tra từ. b) Thêm từ mới. c) Tìm từ đồng nghĩa (set). d) Top 10 từ hay tra nhất (dict đếm tần suất). e) Suggestion khi nhập sai (Levenshtein distance đơn giản).",
                        hint: "Dict cho O(1) lookup. Set cho đồng nghĩa. Suggestion: so khớp tiền tố hoặc khoảng cách"
                    }
                ],
                summary: [
                    "Set: duy nhất, không thứ tự, kiểm tra in rất nhanh O(1)",
                    "Dict: key-value, tra cứu O(1), .get(k, default) tránh KeyError",
                    "Chọn: List cần thứ tự, Set cần duy nhất, Dict cần ánh xạ keyvalue"
                ]
            },

            // ===== BÀI 11: Stack và Queue =====
            {
                id: 11,
                title: "Stack và Queue",
                duration: "90 phút",
                description: "Hai cấu trúc dữ liệu quan trọng: LIFO và FIFO",
                objectives: [
                    "Giải thích LIFO của Stack và FIFO của Queue",
                    "Cài đặt Stack dùng list với push/pop",
                    "Cài đặt Queue dùng collections.deque",
                    "Ứng dụng Stack kiểm tra dấu ngoặc",
                    "Ứng dụng Queue mô phỏng hàng đợi"
                ],
                sections: [
                    {
                        title: "11.1 Stack - Ngăn Xếp (LIFO)",
                        icon: "",
                        content: `<strong>Stack</strong> = ngăn xếp, nguyên lý <strong>LIFO (Last In, First Out)</strong> - vào sau ra trước.

<strong>Ẩn dụ:</strong> Chồng đĩa trong bếp - chỉ lấy được đĩa trên cùng.

<strong>Ứng dụng:</strong>
- Nút Undo trong Word/Photoshop
- Nút Back trên điện thoại
- Kiểm tra dấu ngoặc hợp lệ
- Tính biểu thức số học

<strong>Các thao tác:</strong>

| Thao tác | Mô tả | Code |
|----------|-------|------|
| push(x) | Thêm lên đỉnh | <code>stack.append(x)</code> |
| pop() | Lấy và xóa đỉnh | <code>stack.pop()</code> |
| peek() | Xem đỉnh | <code>stack[-1]</code> |
| is_empty() | Kiểm tra rỗng | <code>len(stack) == 0</code> |`,
                        code: `from collections import deque

class Stack:
    """Stack cài đặt bằng list."""
    def __init__(self):
        self.__data = []

    def push(self, item):
        """Đẩy phần tử lên đỉnh stack."""
        self.__data.append(item)

    def pop(self):
        """Lấy và xóa phần tử trên đỉnh."""
        if self.is_empty():
            raise IndexError("Stack rỗng!")
        return self.__data.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("Stack rỗng!")
        return self.__data[-1]

    def is_empty(self):
        return len(self.__data) == 0

    def size(self):
        return len(self.__data)


# Ứng dụng: Bảng soạn thảo với Undo
class BanSoan:
    def __init__(self):
        self.__noi_dung = ""
        self.__lich_su  = Stack()

    def go_them(self, van_ban):
        self.__lich_su.push(self.__noi_dung)
        self.__noi_dung += van_ban
        print(f"  Gõ '{van_ban}'  '{self.__noi_dung}'")

    def undo(self):
        if self.__lich_su.is_empty():
            print("Không còn gì để Undo!"); return
        self.__noi_dung = self.__lich_su.pop()
        print(f"   Undo  '{self.__noi_dung}'")

# Demo Undo
bs = BanSoan()
bs.go_them("Hello")
bs.go_them(", World")
bs.undo()  # Hủy ", World"
bs.undo()  # Hủy "Hello"

# Ứng dụng: Kiểm tra dấu ngoặc
def kiem_tra_ngoac(bieu_thuc):
    stack = Stack()
    dong = {')': '(', ']': '[', '}': '{'}
    for i, ky_tu in enumerate(bieu_thuc):
        if ky_tu in '([{':
            stack.push(ky_tu)
        elif ky_tu in ')]}':
            if stack.is_empty():
                return False, f"Ngoặc '{ky_tu}' thừa"
            if stack.pop() != dong[ky_tu]:
                return False, f"Ngoặc '{ky_tu}' không khớp"
    if not stack.is_empty():
        return False, "Còn ngoặc mở chưa đóng"
    return True, "Hợp lệ"

tests = ["(hello [world])", "(abc]", "{a: [1, 2]}"]
for t in tests:
    ok, msg = kiem_tra_ngoac(t)
    print(f"  {'' if ok else ''} '{t}'  {msg}")`
                    },
                    {
                        title: "11.2 Queue - Hàng Đợi (FIFO)",
                        icon: "",
                        content: `<strong>Queue</strong> = hàng đợi, nguyên lý <strong>FIFO (First In, First Out)</strong> - vào trước ra trước.

<strong>Ẩn dụ:</strong> Hàng chờ tại quầy thu ngân - khách đến trước được phục vụ trước.

<strong>Ứng dụng:</strong>
- Hàng đợi máy in
- Hộp thư đến
- Hàng đợi server game
- Điều phối tiến trình hệ điều hành

<strong> QUAN TRỌNG:</strong> Dùng <code>collections.deque</code> thay vì <code>list</code>:
- <code>list.pop(0)</code>: O(n) - chậm!
- <code>deque.popleft()</code>: O(1) - nhanh!`,
                        code: `from collections import deque

class Queue:
    """Queue cài đặt bằng deque."""
    def __init__(self):
        self.__data = deque()

    def enqueue(self, item):
        self.__data.append(item)

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue rỗng!")
        return self.__data.popleft()

    def peek(self):
        if self.is_empty():
            raise IndexError("Queue rỗng!")
        return self.__data[0]

    def is_empty(self):  return len(self.__data) == 0
    def size(self):      return len(self.__data)


# Ứng dụng: Hệ thống hỗ trợ khách hàng
class HeThongHoTro:
    def __init__(self, ten):
        self.ten = ten
        self.__hang_doi = Queue()
        self.__da_xu_ly = []

    def gui_yeu_cau(self, khach, van_de):
        print(f"  + {khach}: '{van_de}'")
        self.__hang_doi.enqueue((khach, van_de))

    def xu_ly_tiep(self):
        if self.__hang_doi.is_empty():
            print("Không có yêu cầu!"); return
        khach, vd = self.__hang_doi.dequeue()
        self.__da_xu_ly.append((khach, vd))
        print(f"   Xử lý: {khach} - '{vd}'")

    def bao_cao(self):
        print(f"  [{self.ten}] Đã xử lý: {len(self.__da_xu_ly)}, Còn: {self.__hang_doi.size()}")


# Demo
ht = HeThongHoTro("MindX Support")
ht.gui_yeu_cau("Nguyễn An",  "Không đăng nhập được")
ht.gui_yeu_cau("Trần Bình",  "Hỏi lịch học")
ht.gui_yeu_cau("Lê Cúc",     "Lỗi thanh toán")
print("\\nXử lý theo FIFO:")
ht.xu_ly_tiep()  # Xử lý An trước
ht.xu_ly_tiep()  # Xử lý Bình
ht.bao_cao()`
                    }
                ],
                exercises: [
                    {
                        level: "easy",
                        title: "Dùng Stack",
                        desc: "Push 1,2,3,4,5 vào Stack. Pop lần lượt, in ra. Viết hàm in ngược 1 chuỗi bằng Stack.",
                        hint: "Mỗi push lưu vào đỉnh, pop lấy từ đỉnh"
                    },
                    {
                        level: "medium",
                        title: "Task Queue",
                        desc: "Mô phỏng 5 task với độ ưu tiên. Xử lý theo FIFO. In hàng đợi còn lại sau mỗi bước.",
                        hint: "Dùng Queue.enqueue và dequeue"
                    },
                    {
                        level: "hard",
                        title: "Lịch sử trình duyệt",
                        desc: "Stack lich_su (các trang đã thăm) và Stack trang_sau (forward). Hàm di_den(url), back(), forward().",
                        hint: "Khi di_den: xóa trang_sau, push url vào lich_su. Back: chuyển từ lich_su sang trang_sau"
                    },
                    {
                        level: "easy",
                        title: "Kiểm tra chuỗi đảo ngược",
                        desc: "Dùng Stack kiểm tra chuỗi có phải palindrome không ('aba', 'abcba'). So sánh với cách dùng [::-1].",
                        hint: "Push từng ký tự vào stack, pop ra sẽ được chuỗi đảo ngược"
                    },
                    {
                        level: "medium",
                        title: "Queue in ấn",
                        desc: "Mô phỏng máy in: 5 tài liệu được gửi đến in theo thứ tự FIFO. In trạng thái queue sau mỗi lần in 1 tài liệu. Dùng deque.",
                        hint: "from collections import deque. q = deque(); q.append(tailieu); q.popleft() khi in xong"
                    },
                    {
                        level: "hard",
                        title: "Hệ thống Undo/Redo",
                        desc: "Class TextEditor với 2 Stack: undo_stack (text trước) và redo_stack. Phương thức: viet(text), undo(), redo(). Lưu lịch sử thay đổi và có thể undo về bất kỳ điểm nào.",
                        hint: "viet(text): push vào undo_stack, clear redo_stack. Undo: pop undo → push vào redo. Redo: ngược lại"
                    }
                ],
                summary: [
                    "Stack: LIFO - vào sau ra trước, dùng list + append/pop",
                    "Queue: FIFO - vào trước ra trước, dùng deque + append/popleft",
                    "deque.popleft() nhanh hơn list.pop(0) rất nhiều (O(1) vs O(n))"
                ]
            },

            // ===== BÀI 12: Luyện Tập và Giải Đề =====
            {
                id: 12,
                title: "Luyện Tập và Giải Đề (Phần 1)",
                duration: "90 phút",
                description: "Giải đề tổng hợp - Hệ thống quản lý học viên với OOP và File",
                objectives: [
                    "Nhận diện yêu cầu đề bài, chọn cấu trúc dữ liệu phù hợp",
                    "Thiết kế hệ thống OOP từ đề mô tả bằng tiếng Việt",
                    "Áp dụng Binary Search và Quick Sort vào bài toán thực tế",
                    "Lưu/đọc dữ liệu với file JSON"
                ],
                sections: [
                    {
                        title: "12.1 Đề 1: Hệ Thống Điểm Học Viên",
                        icon: "",
                        content: `<strong>Mô tả bài toán:</strong> Xây dựng hệ thống quản lý điểm cho trung tâm đào tạo.

<strong>Yêu cầu:</strong>
1. Học viên có tên, mã số, điểm các môn (dict {môn: điểm})
2. Hệ thống lưu file và tải lại khi khởi động
3. Chức năng: thêm HV, nhập điểm, xem bảng xếp hạng, thống kê

<strong>Phân tích thiết kế:</strong>
- Class HocVien: ten, ma_hv, {mon: diem}
- Class HeThong: HAS-A nhiều HocVien
- Methods: tinh_diem_tb, xep_loai, them_hv, tim_theo_ma (Binary), bang_xep_hang (Quick Sort)`,
                        code: `import os, json

class HocVien:
    def __init__(self, ten, ma_hv):
        self.ten    = ten
        self.ma_hv  = ma_hv.upper()
        self.__diem = {}

    def set_diem(self, mon, diem):
        if not (0 <= diem <= 10):
            print(f"   Điểm phải trong [0, 10]!")
            return False
        self.__diem[mon] = diem
        return True

    def get_diem(self, mon):  return self.__diem.get(mon)
    def get_all(self):        return dict(self.__diem)

    def tinh_diem_tb(self):
        if not self.__diem: return 0.0
        return sum(self.__diem.values()) / len(self.__diem)

    def xep_loai(self):
        tb = self.tinh_diem_tb()
        if tb >= 9.0:   return "Xuất Sắc"
        elif tb >= 8.0: return "Giỏi"
        elif tb >= 6.5: return "Khá"
        elif tb >= 5.0: return "Trung Bình"
        else:           return "Yếu"

    def to_dict(self):
        return {"ten": self.ten, "ma_hv": self.ma_hv, "diem": self.__diem}

    @classmethod
    def from_dict(cls, d):
        hv = cls(d["ten"], d["ma_hv"])
        for mon, diem in d.get("diem", {}).items():
            hv.set_diem(mon, diem)
        return hv

    def __str__(self):
        return f"[{self.ma_hv}] {self.ten:<15} | ĐTB: {self.tinh_diem_tb():.2f} | {self.xep_loai()}"


class HeThong:
    def __init__(self, ten, file="hoc_vien.json"):
        self.ten     = ten
        self.__file  = file
        self.__ds_hv = []
        self._tai()

    def _tai(self):
        if not os.path.exists(self.__file): return
        try:
            with open(self.__file, "r", encoding="utf-8") as f:
                data = json.load(f)
                self.__ds_hv = [HocVien.from_dict(d) for d in data]
            print(f"   Tải {len(self.__ds_hv)} HV")
        except Exception as e:
            print(f"   Lỗi: {e}")

    def luu(self):
        with open(self.__file, "w", encoding="utf-8") as f:
            json.dump([hv.to_dict() for hv in self.__ds_hv], f,
                      ensure_ascii=False, indent=2)

    def them_hv(self, ten, ma):
        if any(hv.ma_hv == ma.upper() for hv in self.__ds_hv):
            print(f"   Mã {ma} đã tồn tại!"); return None
        hv = HocVien(ten, ma)
        self.__ds_hv.append(hv)
        print(f"   Thêm: {hv}")
        return hv

    def tim_theo_ma(self, ma):
        """Binary search theo mã."""
        ds_sort = sorted(self.__ds_hv, key=lambda hv: hv.ma_hv)
        mas = [hv.ma_hv for hv in ds_sort]
        t, p = 0, len(mas) - 1
        while t <= p:
            g = (t + p) // 2
            if mas[g] == ma.upper():    return ds_sort[g]
            elif mas[g] < ma.upper():   t = g + 1
            else:                        p = g - 1
        return None

    def bang_xep_hang(self):
        """Quick sort theo ĐTB giảm dần."""
        def qsort(ds):
            if len(ds) <= 1: return ds
            pivot = ds[-1]
            hon  = [x for x in ds[:-1] if x.tinh_diem_tb() >  pivot.tinh_diem_tb()]
            bang = [x for x in ds[:-1] if x.tinh_diem_tb() == pivot.tinh_diem_tb()]
            kem  = [x for x in ds[:-1] if x.tinh_diem_tb() <  pivot.tinh_diem_tb()]
            return qsort(hon) + bang + [pivot] + qsort(kem)

        xh = qsort(self.__ds_hv[:])
        print(f"\\n=== BẢNG XẾP HẠNG ===")
        for hang, hv in enumerate(xh, 1):
            huy = "" if hang == 1 else "" if hang == 2 else "" if hang == 3 else f"#{hang}"
            print(f"  {huy} {hv}")
        return xh


# Test
ht = HeThong("MindX Academy", "test.json")
ht.them_hv("Nguyễn Văn An",  "HV001")
ht.them_hv("Trần Thị Bình",  "HV002")
ht.them_hv("Lê Minh Cúc",    "HV003")

for ma, diem in [("HV001", {"Python": 9, "Toán": 8}),
                  ("HV002", {"Python": 7, "Toán": 9}),
                  ("HV003", {"Python": 10, "Toán": 9})]:
    hv = ht.tim_theo_ma(ma)
    if hv:
        for m, d in diem.items():
            hv.set_diem(m, d)

ht.bang_xep_hang()
ht.luu()
os.remove("test.json")`
                    },
                    {
                        title: "12.2 Đề 2: Mô Phỏng Máy ATM",
                        icon: "",
                        content: `<strong>Bài toán:</strong> Mô phỏng máy ATM kết hợp Stack và Queue.

<strong>Yêu cầu:</strong>
- Queue: khách hàng xếp hàng chờ
- Stack: lịch sử giao dịch của mỗi tài khoản (Undo)

<strong>Các class:</strong>
- GiaoDich: loai, so_tien
- TaiKhoanATM: ten, __so_du, __lich_su (deque maxlen=5)
- MayATM: ma_may, __hang_doi`,
                        code: `from collections import deque

class GiaoDich:
    def __init__(self, loai, so_tien):
        self.loai    = loai
        self.so_tien = so_tien
    def __str__(self):
        ky = "+" if self.loai == "nap" else "-"
        return f"{ky}{self.so_tien:,}đ"


class TaiKhoanATM:
    def __init__(self, ten, ban_dau=0):
        self.ten       = ten
        self.__so_du   = ban_dau
        self.__lich_su = deque(maxlen=5)  # Chỉ giữ 5 GD gần nhất

    def nap(self, so_tien):
        if so_tien <= 0:
            print("   Số tiền không hợp lệ"); return
        self.__so_du += so_tien
        self.__lich_su.append(GiaoDich("nap", so_tien))
        print(f"   {self.ten} nạp {so_tien:,}đ  {self.__so_du:,}đ")

    def rut(self, so_tien):
        if so_tien <= 0 or so_tien > self.__so_du:
            print(f"   Không hợp lệ"); return
        self.__so_du -= so_tien
        self.__lich_su.append(GiaoDich("rut", so_tien))
        print(f"   {self.ten} rút {so_tien:,}đ  {self.__so_du:,}đ")

    def in_lich_su(self):
        print(f"  {self.ten}: [{' | '.join(str(g) for g in self.__lich_su)}]")


class MayATM:
    def __init__(self, ma):
        self.ma_may        = ma
        self.__hang_doi    = deque()
        self.__dang_phuc_vu = None

    def xep_hang(self, tk):
        self.__hang_doi.append(tk)
        print(f"  [{self.ma_may}] {tk.ten} xếp hàng")

    def phuc_vu(self):
        if not self.__hang_doi:
            print("  Hàng đợi trống!"); return None
        self.__dang_phuc_vu = self.__hang_doi.popleft()
        print(f"  Đang phục vụ: {self.__dang_phuc_vu.ten}")
        return self.__dang_phuc_vu

# Demo
atm = MayATM("ATM-001")
tk1 = TaiKhoanATM("Nguyễn An", 2_000_000)
tk2 = TaiKhoanATM("Trần Bình",   500_000)

atm.xep_hang(tk1)
atm.xep_hang(tk2)
khach = atm.phuc_vu()
khach.rut(300_000)
khach.nap(500_000)
khach.in_lich_su()`
                    }
                ],
                exercises: [
                    {
                        level: "medium",
                        title: "Hệ thống điểm danh",
                        desc: "Class HocVien(ten, ma_hv, lop), BuoiHoc(ngay, ten_bai), HeThong quản lý. Tính % điểm danh. Cảnh báo vắng ≥ 3 buổi. Lưu/đọc file.",
                        hint: "Dùng dict {hoc_vien: set(buoi_da_hoc)}"
                    },
                    {
                        level: "hard",
                        title: "Game đơn giản",
                        desc: "Abstract class NhanVat(ten, mau, mana). Class ChienSi, PhapSu. BattleSystem: Stack lưu lượt đánh, Queue nhân vật chờ. Mô phỏng 10 lượt.",
                        hint: "Dùng Stack/Queue + @abstractmethod"
                    },
                    {
                        level: "easy",
                        title: "Đảo chuỗi bằng Stack",
                        desc: "Đọc 1 chuỗi. Dùng Stack để đảo ngược từng từ (không phải cả chuỗi). VD: 'Hello World' → 'olleH dlroW'.",
                        hint: "Tách từ, mỗi từ push vào stack rồi pop ra"
                    },
                    {
                        level: "medium",
                        title: "BFS với Queue",
                        desc: "Cho đồ thị dạng dict {node: [neighbors]}. Dùng Queue để duyệt BFS từ node 'A'. In thứ tự duyệt và khoảng cách từ A đến các node.",
                        hint: "from collections import deque. queue = deque(['A']); visited set. while queue: node = popleft(); thêm neighbor"
                    },
                    {
                        level: "hard",
                        title: "Hệ thống tin nhắn real-time",
                        desc: "Class Message(text, sender, timestamp). Class ChatRoom có Queue tin nhắn chờ gửi, Stack lịch sử chat đã gửi. Người dùng gửi tin nhắn vào Queue, server pop ra và push vào lịch sử. In lịch sử chat kèm thời gian.",
                        hint: "Queue cho tin nhắn pending (FIFO), Stack cho lịch sử (có thể xem lại). datetime.now() cho timestamp"
                    }
                ],
                summary: [
                    "Chiến lược: đọc đề  chọn cấu trúc  thiết kế class  code từng phần",
                    "Áp dụng tổng hợp List, Set, Dict, Stack, Queue",
                    "Luyện tập viết code trong thời gian giới hạn"
                ]
            },

            // ===== BÀI 14: Thi Cuối Khóa =====
            {
                id: 14,
                title: "Thi Cuối Khóa CSB",
                duration: "90 phút",
                description: "Bài thi tổng hợp cuối khóa - 75 phút",
                objectives: [
                    "Đánh giá toàn diện kiến thức Python cơ bản",
                    "Đánh giá OOP: class, kế thừa, đóng gói, đa hình, trừu tượng",
                    "Đánh giá thuật toán tìm kiếm và sắp xếp",
                    "Đánh giá cấu trúc dữ liệu Set, Dict, Stack, Queue"
                ],
                sections: [
                    {
                        title: "14.1 Đề Thi Cuối Khóa",
                        icon: "",
                        content: `<strong>Thời gian:</strong> 75 phút | <strong>Tổng điểm:</strong> 10

<strong>Phần 1 - Thuật Toán Nền (2 điểm):</strong>
- Insertion Sort, Binary Search, Quick Sort
- Set và Dict operations

<strong>Phần 2 - OOP (5 điểm):</strong>
- Abstract class ThietBi với MayChay, TaGan
- Class ThanhVien, PhongGym
- Đầy đủ 4 tính chất OOP

<strong>Phần 3 - Tổng Hợp (3 điểm):</strong>
- Stack + Queue trong hệ thống Gym
- HangDoiThietBi, LichSuBuoiTap

<strong>Tiêu chí chấm:</strong>

| Tiêu chí | Trọng số |
|----------|----------|
| Logic đúng, kết quả chính xác | 45% |
| OOP đúng chuẩn | 25% |
| Không lỗi runtime | 15% |
| Code sạch, tổ chức tốt | 10% |
| Xử lý edge case | 5% |`,
                        code: `# Đề thi mẫu - Câu 1: Thuật toán
def insertion_sort(ds):
    arr = ds.copy()
    for i in range(1, len(arr)):
        khoa, j = arr[i], i - 1
        while j >= 0 and arr[j] > khoa:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = khoa
    return arr

def quick_sort_giam(ds):
    if len(ds) <= 1: return ds
    pivot = ds[-1]
    nho = [x for x in ds[:-1] if x >= pivot]
    lon = [x for x in ds[:-1] if x < pivot]
    return quick_sort_giam(nho) + [pivot] + quick_sort_giam(lon)

# Test
diem = [7.5, 9.0, 6.0, 8.5]
print(f"Insertion Sort tăng:  {insertion_sort(diem)}")
print(f"Quick Sort giảm:      {quick_sort_giam(diem)}")

# Đề thi mẫu - Câu 2: Hệ thống phòng Gym
from abc import ABC, abstractmethod

class ThietBi(ABC):
    def __init__(self, ten, so_serial, nam_sx):
        self.ten, self.so_serial, self.nam_sx = ten, so_serial, nam_sx
    @abstractmethod
    def kiem_tra_tinh_trang(self): pass
    def tuoi_thiet_bi(self): return 2024 - self.nam_sx

class MayChay(ThietBi):
    def __init__(self, ten, serial, nam_sx, toc_do_max):
        super().__init__(ten, serial, nam_sx)
        self.toc_do_max = toc_do_max
        self.gio_su_dung = 0
    def kiem_tra_tinh_trang(self):
        if self.gio_su_dung > 1000:
            print(f"   {self.ten} cần bảo dưỡng!")
        else:
            print(f"   {self.ten} hoạt động tốt")
    def chay(self, gio):
        self.gio_su_dung += gio

class TaGan(ThietBi):
    def __init__(self, ten, serial, nam_sx, trong_luong):
        super().__init__(ten, serial, nam_sx)
        self.trong_luong = trong_luong
        self.so_lan_dung = 0
    def kiem_tra_tinh_trang(self):
        if self.so_lan_dung > 500:
            print(f"   {self.ten} cần thay thế!")
        else:
            print(f"   {self.ten} hoạt động tốt")
    def nang(self, lan):
        self.so_lan_dung += lan

class ThanhVien:
    def __init__(self, ten, hang):
        self.ten = ten
        self.hang_thanh_vien = hang
        self.__du_lieu = []
    def thuc_hien(self, thiet_bi, phut):
        self.__du_lieu.append((thiet_bi.ten, phut))
    def tinh_tong_thoi_gian(self):
        return sum(p for _, p in self.__du_lieu)

class PhongGym:
    def __init__(self, ten, dia_chi):
        self.ten, self.dia_chi = ten, dia_chi
        self.__ds_tb  = []
        self.__ds_tv  = []
    def them_thiet_bi(self, tb):   self.__ds_tb.append(tb)
    def them_thanh_vien(self, tv): self.__ds_tv.append(tv)
    def kiem_tra_thiet_bi(self):
        for tb in self.__ds_tb:
            tb.kiem_tra_tinh_trang()

# Test
gym = PhongGym("MindX Gym", "Hà Nội")
mc = MayChay("Máy chạy 01", "MC001", 2020, 15)
gym.them_thiet_bi(mc)
gym.them_thanh_vien(ThanhVien("Nguyễn An", "Vàng"))
gym.kiem_tra_thiet_bi()`
                    },
                    {
                        title: "14.2 Tổng Kết & Chứng Chỉ",
                        icon: "",
                        content: `<strong>Bảng so sánh tổng kết:</strong>

| Stack | Queue |
|-------|-------|
| LIFO (vào sau ra trước) | FIFO (vào trước ra trước) |
| Chồng đĩa | Hàng chờ thu ngân |
| list + append/pop | deque + append/popleft |
| Undo, ngoặc, đệ quy | Hàng đợi, BFS, in ấn |

<strong>3 điều PHẢI nhớ:</strong>
1. Stack = LIFO - push bằng append(), pop bằng pop() (không index)
2. Queue = FIFO - dùng deque, enqueue bằng append(), dequeue bằng popleft()
3. deque quan trọng - list.pop(0) là O(n), deque.popleft() là O(1)

<strong>Chứng chỉ:</strong>
- ≥ 7.0/10: Chứng Chỉ Hoàn Thành
- ≥ 9.0/10: Chứng Chỉ Xuất Sắc + thư giới thiệu

<strong>Tiếp theo sau CSB:</strong>
- CSA (Data Science) - cần CSB ≥ 7.0
- CSI (AI) - cần CSB ≥ 8.0

 <strong>Chúc các bạn làm bài tốt!</strong>`,
                        code: `# DEMO TỔNG HỢP: Phòng Gym hoàn chỉnh
from abc import ABC, abstractmethod
from collections import deque

class HangDoiThietBi:
    """Queue cho thiết bị gym."""
    def __init__(self, thiet_bi):
        self.thiet_bi = thiet_bi
        self.__hang_doi = deque()
        self.__dang_dung = None

    def dat_cho(self, thanh_vien):
        self.__hang_doi.append(thanh_vien)
        print(f"  + {thanh_vien.ten} chờ {self.thiet_bi.ten}")

    def thong_bao_xong(self):
        if self.__hang_doi:
            nguoi = self.__hang_doi.popleft()
            print(f"  Kính mời {nguoi.ten} sử dụng {self.thiet_bi.ten}")
            return nguoi
        print(f"  Hết người chờ {self.thiet_bi.ten}")
        return None

class LichSuBuoiTap:
    """Stack lưu 10 buổi tập gần nhất."""
    def __init__(self, thanh_vien):
        self.thanh_vien = thanh_vien
        self.__lich_su = []  # Stack

    def ghi_buoi(self, mo_ta):
        if len(self.__lich_su) >= 10:
            self.__lich_su.pop()  # Bỏ buổi cũ nhất
        self.__lich_su.append(mo_ta)
        print(f"  Ghi: {mo_ta}")

    def xem_3_gan_nhat(self):
        print(f"\\n  3 buổi gần nhất của {self.thanh_vien.ten}:")
        for buoi in self.__lich_su[-3:]:
            print(f"    - {buoi}")

    def hoan_tac(self):
        if self.__lich_su:
            buoi = self.__lich_su.pop()
            print(f"  Hủy buổi: {buoi}")
        else:
            print("  Không có buổi để hủy")

# Test
tv = ThanhVien("Nguyễn An", "Vàng")
ls = LichSuBuoiTap(tv)
for i in range(1, 6):
    ls.ghi_buoi(f"Buổi {i}: Chạy bộ 30 phút")
ls.xem_3_gan_nhat()
ls.hoan_tac()
ls.hoan_tac()`
                    }
                ],
                exercises: [
                    {
                        level: "easy",
                        title: "Tổng hợp thuật toán",
                        desc: "Tự cài đặt lại 3 hàm: insertion_sort(ds), quick_sort(ds), binary_search(ds, x). Test với 1 list ngẫu nhiên 10 phần tử. So sánh kết quả với sorted() và in 3 lần tìm kiếm.",
                        hint: "Insertion sort: chèn từng phần tử vào mảng đã sort. Quick sort: chọn pivot cuối. Binary: trai/phai/giua"
                    },
                    {
                        level: "medium",
                        title: "Set + Dict nâng cao",
                        desc: "Cho 2 list đơn hàng khách hàng (có trùng lặp). a) Tìm KH đã mua ở CẢ HAI đợt (set intersection). b) Tìm KH chỉ mua ở đợt 1. c) Đếm số lần mua mỗi KH dùng dict comprehension. d) Tìm KH mua nhiều nhất.",
                        hint: "set1 & set2 (intersection), set1 - set2 (difference), {ten: ds.count(ten) for ten in set(ds)}"
                    },
                    {
                        level: "hard",
                        title: "Hệ thống phòng Gym hoàn chỉnh",
                        desc: "Kết hợp tất cả kiến thức: Abstract class ThietBi, class con MayChay/TaGan, class ThanhVien với __private, class PhongGym. Stack LichSuBuoiTap (xem/hoàn tác), Queue HangDoiThietBi (đặt chỗ/phục vụ), Set khách thành viên, Dict lưu thông tin từng TV. Test đầy đủ tất cả chức năng.",
                        hint: "Stack = list + append/pop (LIFO). Queue = deque + append/popleft (FIFO). Set/Dict để tra cứu nhanh O(1)"
                    },
                    {
                        level: "easy",
                        title: "Tổng hợp Python cơ bản",
                        desc: "Viết chương trình: Nhập 1 list số nguyên, đếm số chẵn/lẻ, tính tổng các số chia hết cho 3, in các số nguyên tố trong list (dùng hàm is_prime).",
                        hint: "Số nguyên tố: chỉ chia hết cho 1 và chính nó. Dùng all(x % i != 0 for i in range(2, int(x**0.5)+1))"
                    },
                    {
                        level: "hard",
                        title: "Hệ thống quản lý trường học",
                        desc: "Kết hợp tất cả: Class SinhVien, LopHoc, MonHoc, PhieuDiem. Class Truong: thêm/xóa SV/Lop/Mon, đăng ký môn (dùng dict/set), in bảng điểm SV, xếp loại, thống kê tỷ lệ đạt/rớt mỗi môn. Lưu/đọc file JSON.",
                        hint: "Dict: {ma_sv: SinhVien}, {ma_lop: LopHoc}. Set cho danh sách môn đăng ký. File JSON cho lưu trữ"
                    },
                    {
                        level: "hard",
                        title: "Thuật toán đệ quy nâng cao",
                        desc: "Cài đặt: a) Đệ quy tính dãy Fibonacci (memoization). b) Đệ quy tính số cách leo cầu thang (n bậc, mỗi bước 1 hoặc 2 bậc). c) QuickSort đệ quy. Đo thời gian và so sánh với cách không dùng memoization.",
                        hint: "Memoization: dùng dict để lưu kết quả đã tính. @lru_cache decorator cũng được"
                    }
                ],
                summary: [
                    "Tổng kết toàn bộ 13 buổi học CSB",
                    "Đánh giá năng lực lập trình Python nền tảng",
                    "Đạt ≥ 7.0/10 để nhận chứng chỉ"
                ]
            }
        ]
    },

    csa: {
        name: "Data Science",
        icon: "",
        color: "#3b82f6",
        lessons: [
            // ===== BÀI 1: Giới thiệu Pandas =====
            {
                id: 1,
                title: "Giới Thiệu Data Science & Pandas Cơ Bản",
                duration: "90 phút",
                description: "Làm quen với hệ sinh thái Data Science Python và cấu trúc dữ liệu của pandas",
                objectives: [
                    "Giải thích Data Science và vị trí của pandas",
                    "Tạo Series và DataFrame từ dict, list, file CSV",
                    "Dùng .head(), .info(), .describe(), .shape, .dtypes",
                    "Truy cập dữ liệu bằng [], .loc, .iloc",
                    "Đọc và ghi file CSV/Excel"
                ],
                sections: [
                    {
                        title: "1.1 Hệ Sinh Thái Data Science Python",
                        icon: "",
                        content: `<strong>Hệ sinh thái Data Science</strong> giống một nhà bếp hoàn chỉnh:
- <strong>NumPy</strong> = dao và thớt (tính toán nhanh trên array)
- <strong>pandas</strong> = bàn bếp (tổ chức dữ liệu bảng)
- <strong>matplotlib/seaborn</strong> = đĩa bày đẹp (vẽ biểu đồ)
- <strong>scikit-learn</strong> = lò nướng thông minh (machine learning)

<strong>Các thư viện chính:</strong>

| Thư viện | Dùng để |
|----------|---------|
| numpy | Tính toán ma trận, phép tính nhanh |
| pandas | Đọc, lọc, nhóm, thống kê dữ liệu bảng |
| matplotlib | Vẽ biểu đồ cơ bản |
| seaborn | Biểu đồ đẹp, phân phối, tương quan |
| scikit-learn | Huấn luyện mô hình dự đoán |

<strong> Cài đặt:</strong> <code>pip install pandas numpy matplotlib seaborn scikit-learn openpyxl</code>`,
                        code: `import pandas as pd
import numpy as np

print(f"pandas : {pd.__version__}")
print(f"numpy  : {np.__version__}")

# So sánh list thuần và numpy array
list_python = [1, 2, 3, 4, 5]
print(f"List thuần: {list_python * 2}")  # Lặp lại list

arr_numpy = np.array([1, 2, 3, 4, 5])
print(f"NumPy array: {arr_numpy * 2}")   # Nhân từng phần tử

# pandas Series giống cột Excel
import pandas as pd
ser = pd.Series([10, 20, 30], index=["a","b","c"], name="Giá trị")
print(ser)`
                    },
                    {
                        title: "1.2 Series và DataFrame",
                        icon: "",
                        content: `<strong>Series</strong> = một cột trong Excel, có index (tên hàng) + values (giá trị).

<strong>DataFrame</strong> = bảng Excel hoàn chỉnh, gồm nhiều Series cùng chia sẻ index.

<strong>Các thuộc tính quan trọng:</strong>

| Thuộc tính | Ý nghĩa |
|-----------|---------|
| <code>df.shape</code> | (số hàng, số cột) |
| <code>df.dtypes</code> | Kiểu dữ liệu từng cột |
| <code>df.head(n)</code> | n hàng đầu |
| <code>df.info()</code> | Tóm tắt cấu trúc |
| <code>df.describe()</code> | Thống kê số học |
| <code>df.columns</code> | Danh sách tên cột |`,
                        code: `import pandas as pd

# Tạo Series
nhiet_do = pd.Series(
    [28.5, 30.1, 27.8, 31.0, 29.6],
    index=["T2", "T3", "T4", "T5", "T6"],
    name="Nhiệt độ (°C)"
)
print("Series nhiệt độ:")
print(nhiet_do)
print(f"\\nTrung bình: {nhiet_do.mean():.1f}°C")
print(f"Cao nhất: {nhiet_do.max()}°C vào {nhiet_do.idxmax()}")
print(f"Ngày nóng (>30): {nhiet_do[nhiet_do > 30].tolist()}")

# Tạo DataFrame từ dict
data = {
    "ten":    ["An", "Bình", "Cúc", "Dũng", "Em"],
    "tuoi":   [22, 25, 23, 28, 21],
    "tp":     ["HCM", "HN", "HCM", "ĐN", "HN"],
    "luong":  [8_500_000, 12_000_000, 9_000_000, 15_000_000, 7_500_000],
}
df = pd.DataFrame(data)

print(f"\\nShape: {df.shape}")
print(f"\\nCác cột:\\n{df.dtypes}")
print(f"\\n3 hàng đầu:\\n{df.head(3)}")
print(f"\\nThống kê lương:\\n{df['luong'].describe()}")`
                    },
                    {
                        title: "1.3 Đọc/Ghi File CSV và Excel",
                        icon: "",
                        content: `pandas cho phép đọc nhiều định dạng: CSV, Excel, JSON, SQL...

<strong> Lưu ý tiếng Việt:</strong>
- Đọc CSV có dấu: <code>encoding="utf-8-sig"</code>
- Ghi CSV: <code>index=False</code> để không ghi cột index

<strong>Các hàm quan trọng:</strong>

| Hàm | Mô tả |
|-----|--------|
| <code>pd.read_csv()</code> | Đọc file CSV |
| <code>pd.read_excel()</code> | Đọc file Excel |
| <code>df.to_csv()</code> | Ghi ra CSV |
| <code>df.to_excel()</code> | Ghi ra Excel |`,
                        code: `import pandas as pd

# Tạo DataFrame mẫu
df = pd.DataFrame({
    "ten":   ["An", "Bình", "Cúc"],
    "tuoi":  [22, 25, 23],
    "luong": [8500000, 12000000, 9000000]
})

# Ghi CSV (không ghi index)
df.to_csv("nhan_vien.csv", index=False, encoding="utf-8-sig")
print(" Đã ghi nhan_vien.csv")

# Đọc lại
df_doc = pd.read_csv("nhan_vien.csv", encoding="utf-8-sig")
print("\\nĐọc lại từ file:")
print(df_doc)
print(f"\\nShape: {df_doc.shape}")
print(f"Cột: {list(df_doc.columns)}")

# Đọc Excel (cần pip install openpyxl)
# df.to_excel("nhan_vien.xlsx", index=False)
# df_excel = pd.read_excel("nhan_vien.xlsx")

import os
os.remove("nhan_vien.csv")`
                    }
                ],
                exercises: [
                    { level: "easy",   title: "Tạo Series đầu tiên", desc: "Tạo Series 5 điểm Toán của 5 học sinh. Tính TB, max, min.", hint: "pd.Series([...], index=..., name=...)" },
                    { level: "medium", title: "DataFrame nhân viên", desc: "Tạo DataFrame 5 nhân viên (ten, tuoi, luong). In shape, describe, head(2).", hint: "pd.DataFrame({...})" },
                    { level: "hard",   title: "Đọc và phân tích CSV", desc: "Tạo file CSV 10 SV (ten, diem). Đọc lại, in SV có điểm >= 8.", hint: "Dùng boolean mask: df[df['diem'] >= 8]" }
                ],
                summary: [
                    "pandas: Series (1 cột) và DataFrame (bảng)",
                    "Thuộc tính: shape, dtypes, head(), info(), describe()",
                    "Đọc/ghi CSV với encoding='utf-8-sig' cho tiếng Việt"
                ]
            },

            // ===== BÀI 2: Lọc và Xử Lý Dữ Liệu =====
            {
                id: 2,
                title: "Lọc và Xử Lý Dữ Liệu với Pandas",
                duration: "90 phút",
                description: "Truy xuất dữ liệu với loc/iloc, lọc nâng cao và xử lý giá trị thiếu",
                objectives: [
                    "Chọn hàng/cột bằng [], .loc[], .iloc[]",
                    "Lọc dữ liệu theo một hoặc nhiều điều kiện (boolean mask)",
                    "Phát hiện, điền và xóa giá trị thiếu NaN",
                    "Thêm, xóa, đổi tên cột; tạo cột tính toán",
                    "Sắp xếp DataFrame theo một hoặc nhiều cột"
                ],
                sections: [
                    {
                        title: "2.1 loc vs iloc - Truy Xuất Dữ Liệu",
                        icon: "",
                        content: `Ẩn dụ: DataFrame như tòa nhà văn phòng
- <strong>.loc[]</strong> = tìm theo TÊN phòng (label)
- <strong>.iloc[]</strong> = tìm theo SỐ THỨ TỰ (vị trí)

<strong>So sánh loc vs iloc:</strong>

| Cú pháp | Ý nghĩa |
|---------|---------|
| <code>df.loc[2, "ten"]</code> | Hàng label=2, cột "ten" |
| <code>df.iloc[2, 0]</code> | Hàng vị trí 2, cột vị trí 0 |
| <code>df.loc[1:3]</code> | Hàng 1, 2, 3 (gồm 3) |
| <code>df.iloc[1:3]</code> | Hàng 1, 2 (không gồm 3) |`,
                        code: `import pandas as pd

df = pd.DataFrame({
    "ten":   ["An","Bình","Cúc","Dũng","Em"],
    "tuoi":  [22, 25, 23, 28, 21],
    "luong": [8.5, 12.0, 9.0, 15.0, 7.5],
}, index=[10, 20, 30, 40, 50])

print("DataFrame với index [10, 20, 30, 40, 50]:")
print(df)

# loc - theo nhãn
print("\\n.loc[10] (theo nhãn):")
print(df.loc[10])

# iloc - theo vị trí
print("\\n.iloc[0] (hàng đầu):")
print(df.iloc[0])

# Lấy nhiều cột
print("\\n.loc[10:30, ['ten','luong']]:")
print(df.loc[10:30, ['ten','luong']])

# Lấy giá trị cụ thể
print(f"\\nTên người lương cao nhất: {df.loc[df['luong'].idxmax(), 'ten']}")
print(f"Lương cao nhất: {df['luong'].max()} triệu")`
                    },
                    {
                        title: "2.2 Lọc Dữ Liệu với Boolean Mask",
                        icon: "",
                        content: `Boolean mask = dùng điều kiện True/False để lọc hàng.

<strong>Quy tắc kết hợp điều kiện:</strong>
- Dùng <code>&</code> thay cho <code>and</code>
- Dùng <code>|</code> thay cho <code>or</code>
- Dùng <code>~</code> thay cho <code>not</code>
- <strong>PHẢI có dấu ()</strong> quanh mỗi điều kiện`,
                        code: `import pandas as pd

df = pd.DataFrame({
    "ten":   ["An","Bình","Cúc","Dũng","Em","Phúc"],
    "tuoi":  [22, 25, 17, 28, 19, 30],
    "tp":    ["HCM","HN","HCM","ĐN","HN","HCM"],
    "luong": [8.5, 12.0, 5.5, 15.0, 6.0, 20.0],
})

# Lọc đơn điều kiện
print("Tuổi >= 25:")
print(df[df['tuoi'] >= 25])

# Lọc nhiều điều kiện (PHẢI có dấu ())
print("\\nHCM và lương >= 8:")
print(df[(df['tp'] == 'HCM') & (df['luong'] >= 8)])

# isin - lọc theo danh sách
print("\\nỞ HCM hoặc HN:")
print(df[df['tp'].isin(['HCM', 'HN'])])

# between - trong khoảng
print("\\nTuổi từ 20-28:")
print(df[df['tuoi'].between(20, 28)])

# query - cú pháp SQL-like
print("\\nQuery - lương > 10:")
print(df.query('luong > 10'))`
                    },
                    {
                        title: "2.3 Xử Lý Giá Trị Thiếu (NaN)",
                        icon: "",
                        content: `Dữ liệu thực tế thường có giá trị thiếu (NaN - Not a Number). Cần xử lý trước khi phân tích.

<strong>2 cách xử lý chính:</strong>
- <strong>Xóa</strong>: dùng khi missing ít và random
- <strong>Điền</strong>: dùng mean/median/mode hoặc forward-fill

<strong>Các hàm quan trọng:</strong>

| Hàm | Mô tả |
|-----|--------|
| <code>df.isna()</code> | True nếu là NaN |
| <code>df.isna().sum()</code> | Đếm NaN từng cột |
| <code>df.dropna()</code> | Xóa hàng có NaN |
| <code>df.fillna(value)</code> | Điền NaN bằng value |`,
                        code: `import pandas as pd
import numpy as np

# Tạo DataFrame có NaN
df = pd.DataFrame({
    "ten":   ["An", "Bình", "Cúc", None, "Em"],
    "tuoi":  [22, np.nan, 23, 28, np.nan],
    "luong": [8.5, 12.0, np.nan, 15.0, 7.5]
})

# Phát hiện NaN
print("Bảng NaN (True = thiếu):")
print(df.isna())

print("\\nĐếm NaN mỗi cột:")
print(df.isna().sum())

# Xóa hàng có NaN
print("\\nXóa hàng có NaN:")
print(df.dropna())

# Điền NaN
print("\\nĐiền tuổi NaN bằng 0, lương NaN bằng TB:")
df_fill = df.copy()
df_fill['tuoi']  = df_fill['tuoi'].fillna(0)
df_fill['luong'] = df_fill['luong'].fillna(df['luong'].mean())
print(df_fill)

# Điền tiến (forward fill)
print("\\nForward fill:")
print(df.fillna(method='ffill'))`
                    }
                ],
                exercises: [
                    { level: "easy",   title: "Lọc cơ bản", desc: "DataFrame 10 SV (ten, tuoi, diem). Lọc SV đậu (diem >=5), SV ở HCM, SV 18-25 tuổi.", hint: "df[df['diem'] >= 5]" },
                    { level: "medium", title: "Xử lý NaN", desc: "Tạo DataFrame có 5% NaN. Đếm NaN từng cột. Điền bằng mean/median.", hint: "df.isna().sum(), fillna()" },
                    { level: "hard",   title: "Phân tích thực tế", desc: "Đọc CSV, lọc theo nhiều điều kiện, xử lý NaN, sắp xếp theo nhiều cột.", hint: "Kết hợp loc, isin, between, sort_values" }
                ],
                summary: [
                    "loc theo nhãn, iloc theo vị trí số",
                    "Boolean mask: df[df['col'] > x], kết hợp với & | ~ và dấu ()",
                    "NaN: isna() phát hiện, dropna() xóa, fillna() điền"
                ]
            },

            // ===== BÀI 3: GroupBy, Aggregation, Merge =====
            {
                id: 3,
                title: "GroupBy, Aggregation và Kết Hợp Bảng",
                duration: "90 phút",
                description: "Nhóm dữ liệu, tính nhiều thống kê, tạo pivot table và merge bảng",
                objectives: [
                    "Nhóm dữ liệu theo một hoặc nhiều cột (groupby)",
                    "Tính nhiều thống kê cùng lúc với .agg()",
                    "Tạo pivot table như trong Excel",
                    "Kết hợp hai bảng bằng merge (inner/left/right/outer join)",
                    "Nối bảng theo hàng với pd.concat()"
                ],
                sections: [
                    {
                        title: "3.1 GroupBy - Nhóm và Tổng Hợp",
                        icon: "",
                        content: `<strong>GroupBy</strong> như bộ phân loại thư - gom tất cả thư cùng địa chỉ vào một chồng, rồi đếm hoặc tính tổng từng chồng.

<strong>Quy trình Split  Apply  Combine:</strong>
1. <strong>Split</strong>: chia DataFrame thành các nhóm theo giá trị cột
2. <strong>Apply</strong>: tính toán trong từng nhóm
3. <strong>Combine</strong>: ghép kết quả lại

<strong>Các hàm aggregation:</strong>

| Hàm | Ý nghĩa |
|-----|---------|
| <code>.sum()</code> | Tổng |
| <code>.mean()</code> | Trung bình |
| <code>.count()</code> | Đếm hàng không NaN |
| <code>.size()</code> | Đếm tất cả hàng |
| <code>.max() / .min()</code> | Lớn nhất / nhỏ nhất |
| <code>.std()</code> | Độ lệch chuẩn |`,
                        code: `import pandas as pd

df = pd.DataFrame({
    "nv":    ["An","An","Bình","Bình","Cúc","Cúc","An"],
    "thang": [1, 2, 1, 2, 1, 2, 3],
    "sp":    ["Laptop","Mouse","Laptop","Keyboard","Mouse","Laptop","Keyboard"],
    "doanh_thu": [30, 5, 25, 8, 4, 32, 7]
})

print("Data bán hàng:")
print(df)

# Group đơn giản - tổng doanh thu theo NV
print("\\nTổng doanh thu theo NV:")
print(df.groupby("nv")["doanh_thu"].sum())

# Group nhiều cột
print("\\nTổng DT theo NV và Tháng:")
print(df.groupby(["nv", "thang"])["doanh_thu"].sum())

# agg - nhiều thống kê cùng lúc
print("\\nNhiều thống kê theo NV:")
print(df.groupby("nv")["doanh_thu"].agg(["sum", "mean", "count", "max"]))`
                    },
                    {
                        title: "3.2 Pivot Table và Merge Bảng",
                        icon: "",
                        content: `<strong>Pivot Table</strong> = cách trình bày dữ liệu theo 2 chiều (hàng × cột), giống Excel.

<strong>Merge</strong> = kết hợp 2 bảng theo key chung, giống JOIN trong SQL.

<strong>Các kiểu merge:</strong>

| Kiểu | Mô tả |
|------|--------|
| <code>inner</code> | Chỉ giữ hàng khớp ở cả 2 bảng |
| <code>left</code> | Giữ tất cả bảng trái |
| <code>right</code> | Giữ tất cả bảng phải |
| <code>outer</code> | Giữ tất cả |`,
                        code: `import pandas as pd

# Dữ liệu bán hàng
df_ban = pd.DataFrame({
    "ma_kh": ["KH01","KH02","KH03","KH01","KH02"],
    "sp":    ["Laptop","Mouse","Laptop","Mouse","Keyboard"],
    "sl":    [1, 2, 1, 3, 1],
    "tien":  [30000, 1000, 30000, 1500, 8000]
})

df_kh = pd.DataFrame({
    "ma_kh": ["KH01","KH02","KH03","KH04"],
    "ten":   ["An","Bình","Cúc","Dũng"],
    "tp":    ["HCM","HN","ĐN","HCM"]
})

# Pivot table
print("Pivot: tổng tiền theo KH × SP:")
pivot = df_ban.pivot_table(values="tien", index="ma_kh", columns="sp", aggfunc="sum", fill_value=0)
print(pivot)

# Merge
print("\\nMerge inner:")
print(pd.merge(df_ban, df_kh, on="ma_kh", how="inner"))

print("\\nMerge left (giữ tất cả KH trong bảng bán):")
print(pd.merge(df_ban, df_kh, on="ma_kh", how="left"))

# Concat - nối theo hàng
print("\\nConcat 2 bảng:")
df1 = pd.DataFrame({"a":[1,2], "b":[3,4]})
df2 = pd.DataFrame({"a":[5,6], "b":[7,8]})
print(pd.concat([df1, df2], ignore_index=True))`
                    }
                ],
                exercises: [
                    { level: "easy",   title: "GroupBy cơ bản", desc: "DataFrame bán hàng 20 dòng. Tính tổng DT theo NV và tháng.", hint: "df.groupby(['nv','thang']).sum()" },
                    { level: "medium", title: "Pivot Table", desc: "Tạo pivot: hàng=Sản phẩm, cột=Tháng, giá trị=tổng tiền.", hint: "pd.pivot_table(df, values, index, columns, aggfunc)" },
                    { level: "hard",   title: "Merge và phân tích", desc: "Có 2 bảng: đơn hàng và khách hàng. Merge rồi phân tích KH ở HCM tiêu nhiều nhất.", hint: "pd.merge(df1, df2, on='key', how='left')" },
                    { level: "easy",   title: "GroupBy nhiều cấp", desc: "DataFrame 30 học sinh (lop, hoc_luc, diem). Tính điểm TB theo lớp, theo học lực, theo lớp × học lực.", hint: "df.groupby(['lop', 'hoc_luc'])['diem'].mean()" },
                    { level: "medium", title: "Pivot đa chiều", desc: "Tạo DataFrame bán hàng 50 dòng. Pivot với 3 chiều: hàng=sản phẩm, cột=tháng, giá trị=doanh thu. Fill NaN bằng 0.", hint: "pd.pivot_table với fill_value=0. Nếu 3 chiều, có thể dùng groupby + unstack" },
                    { level: "hard",   title: "Phân tích E-commerce", desc: "3 bảng: khach_hang (50 KH), don_hang (100 đơn), chi_tiet (sản phẩm trong đơn). Merge đầy đủ. Tính tổng chi tiêu mỗi KH, phân khúc (VIP/Vàng/Thường), top 5 KH. Lưu kết quả CSV.", hint: "Merge nhiều bước: KH → DonHang → ChiTiet. Phân khúc: dùng pd.cut hoặc np.where" }
                ],
                summary: [
                    "groupby: chia nhóm  áp dụng hàm  ghép kết quả",
                    "agg(): tính nhiều thống kê cùng lúc",
                    "merge: kết hợp 2 bảng theo key (inner/left/right/outer)"
                ]
            },

            // ===== BÀI 4: Kiểm Tra Lần 1 =====
            {
                id: 4,
                title: "Kiểm Tra Lần 1 CSA",
                duration: "90 phút",
                description: "Đánh giá tổng hợp: DataFrame, lọc, xử lý NaN, groupby, merge, pivot",
                objectives: [
                    "Tạo và thao tác DataFrame",
                    "Lọc dữ liệu với nhiều điều kiện",
                    "Xử lý giá trị thiếu",
                    "GroupBy và Aggregation",
                    "Merge bảng, pivot table"
                ],
                sections: [
                    {
                        title: "4.1 Đề Kiểm Tra CSA",
                        icon: "",
                        content: `<strong>Đề bài:</strong> Phân tích dữ liệu học viên (50 bản ghi).

<strong>File dữ liệu:</strong> Tạo từ code hoặc tải từ Google Classroom.

<strong>Yêu cầu:</strong>
1. Tạo DataFrame với 50 học viên
2. Thống kê NaN theo cột
3. Điền NaN diem_ly_thuyet bằng mean
4. Tính điểm TB = (ly_thuyet + thuc_hanh) / 2
5. Tìm top 5 học viên điểm TB cao nhất theo lớp
6. Pivot table: lớp × thành phố, giá trị = điểm TB
7. Lưu kết quả ra CSV mới`,
                        code: `import pandas as pd
import numpy as np

# Tạo dữ liệu thi
np.random.seed(42)
n = 50
hoc_vien = pd.DataFrame({
    "ma_hv":     [f"HV{i:03d}" for i in range(1, n+1)],
    "ten":       [f"Học Viên {i}" for i in range(1, n+1)],
    "lop":       np.random.choice(["A","B","C"], n),
    "diem_lt":   np.where(np.random.rand(n) < 0.15, np.nan,
                          np.random.uniform(4, 10, n).round(1)),
    "diem_th":   np.where(np.random.rand(n) < 0.10, np.nan,
                          np.random.uniform(5, 10, n).round(1)),
    "gio_hoc":   np.random.randint(10, 50, n),
    "thanh_pho": np.random.choice(["HCM","HN","ĐN","CTO"], n),
})

# 1. Thống kê NaN
print("Số NaN mỗi cột:")
print(hoc_vien.isna().sum())

# 2. Điền NaN
hv = hoc_vien.copy()
hv['diem_lt'] = hv['diem_lt'].fillna(hv['diem_lt'].mean())
hv['diem_th'] = hv['diem_th'].fillna(hv['diem_th'].mean())

# 3. Tính điểm TB
hv['diem_tb'] = (hv['diem_lt'] + hv['diem_th']) / 2

# 4. Top 5 theo lớp
print("\\nTop 5 điểm TB mỗi lớp:")
top5 = hv.sort_values('diem_tb', ascending=False).groupby('lop').head(5)
print(top5[['ma_hv', 'lop', 'diem_tb']])

# 5. Pivot
print("\\nPivot: lớp × thành phố:")
print(hv.pivot_table(values='diem_tb', index='lop', columns='thanh_pho', aggfunc='mean'))

# 6. Lưu file
hv.to_csv("ket_qua.csv", index=False, encoding="utf-8-sig")
print("\\n Đã lưu ket_qua.csv")
import os
os.remove("ket_qua.csv")`
                    }
                ],
                exercises: [
                    {
                        level: "easy",
                        title: "EDA dữ liệu học viên",
                        desc: "Tạo DataFrame 50 học viên (ma, ten, lop, diem_lt, diem_th, thanh_pho). Chèn ~15% NaN ngẫu nhiên. a) Đếm NaN từng cột. b) Điền NaN bằng mean theo từng lớp (groupby + transform). c) Tính diem_tb. d) Lưu file CSV.",
                        hint: "df.isna().sum(). fillna với groupby: df['diem_lt'] = df.groupby('lop')['diem_lt'].transform(lambda x: x.fillna(x.mean()))"
                    },
                    {
                        level: "medium",
                        title: "Phân tích bán hàng đa chiều",
                        desc: "Tạo DataFrame 200 đơn hàng (ngay, ma_kh, ma_sp, sl, don_gia, thanh_pho, nhan_vien). a) Tính doanh_thu = sl * don_gia. b) Top 5 sản phẩm bán chạy nhất. c) Pivot: nhan_vien × tháng, giá trị = tổng DT. d) Vẽ heatmap pivot.",
                        hint: "df['doanh_thu'] = df['sl'] * df['don_gia']. Pivot: pd.pivot_table(df, values='doanh_thu', index='nhan_vien', columns='thang', aggfunc='sum')"
                    },
                    {
                        level: "hard",
                        title: "Merge và phân khúc khách hàng",
                        desc: "Có 2 bảng: don_hang (200 dòng) và khach_hang (50 KH). Merge với how='left'. a) Tính tổng chi tiêu mỗi KH. b) Phân khúc: VIP (>50tr), Vàng (20-50tr), Thường (<20tr). c) Tìm KH HCM tiêu nhiều nhất. d) Vẽ bar chart KH theo phân khúc × thành phố.",
                        hint: "pd.merge(don_hang, khach_hang, on='ma_kh', how='left'). Groupby ma_kh sum don_gia*sl. Dùng cut() hoặc np.where để phân khúc"
                    }
                ],
                summary: [
                    "Thi trong 75 phút: tổng hợp Buổi 1-3",
                    "Yêu cầu: tạo data, lọc, xử lý NaN, groupby, pivot, merge"
                ]
            },

            // ===== BÀI 5: Trực Quan Hóa Dữ Liệu =====
            {
                id: 5,
                title: "Trực Quan Hóa Dữ Liệu với Matplotlib & Seaborn",
                duration: "90 phút",
                description: "Vẽ biểu đồ chuyên nghiệp với matplotlib và seaborn",
                objectives: [
                    "Vẽ biểu đồ đường, cột, tròn với matplotlib",
                    "Tùy chỉnh tiêu đề, nhãn trục, màu sắc, legend",
                    "Vẽ histogram, boxplot, scatter với seaborn",
                    "Tạo heatmap tương quan và subplot dashboard",
                    "Lưu biểu đồ ra file PNG"
                ],
                sections: [
                    {
                        title: "5.1 Matplotlib Cơ Bản",
                        icon: "",
                        content: `<strong>matplotlib.pyplot</strong> như bộ bút vẽ trong Python - bạn phải tự vẽ từng chi tiết.

<strong>Quy trình vẽ biểu đồ:</strong>
1. Tạo canvas: <code>fig, ax = plt.subplots(figsize=...)</code>
2. Vẽ lên canvas: <code>ax.plot()</code>, <code>ax.bar()</code>, <code>ax.scatter()</code>
3. Trang trí: <code>ax.set_title()</code>, <code>ax.set_xlabel()</code>, <code>ax.legend()</code>
4. Hiển thị/lưu: <code>plt.show()</code> hoặc <code>plt.savefig()</code>

<strong>Các loại biểu đồ:</strong>

| Hàm | Biểu đồ | Dùng khi |
|-----|---------|---------|
| <code>ax.plot()</code> | Đường | Xu hướng theo thời gian |
| <code>ax.bar()</code> | Cột dọc | So sánh nhiều giá trị |
| <code>ax.scatter()</code> | Điểm | Tương quan 2 biến |
| <code>ax.pie()</code> | Tròn | Tỷ lệ phần trăm |
| <code>ax.hist()</code> | Histogram | Phân phối dữ liệu |`,
                        code: `import matplotlib.pyplot as plt
import numpy as np

# Dữ liệu
thang = list(range(1, 7))
doanh_thu = [120, 145, 167, 180, 195, 220]

# Vẽ biểu đồ đường
fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(thang, doanh_thu, marker="o", linewidth=2, color="steelblue", label="Doanh thu")
ax.fill_between(thang, doanh_thu, alpha=0.3, color="steelblue")

ax.set_title("Doanh Thu 6 Tháng Đầu Năm 2024", fontsize=16, fontweight="bold")
ax.set_xlabel("Tháng")
ax.set_ylabel("Doanh thu (triệu đồng)")
ax.set_xticks(thang)
ax.grid(True, alpha=0.3)
ax.legend()

# Lưu file
plt.tight_layout()
plt.savefig("doanh_thu.png", dpi=100, bbox_inches="tight")
print(" Đã lưu doanh_thu.png")

# Không gọi plt.show() trong script - chỉ lưu file
import os
os.remove("doanh_thu.png")`
                    },
                    {
                        title: "5.2 Seaborn - Biểu Đồ Đẹp và Phân Tích",
                        icon: "",
                        content: `seaborn được xây trên matplotlib, cung cấp các biểu đồ đẹp mặc định và tích hợp tốt với DataFrame.

<strong>Các hàm phổ biến:</strong>

| Hàm | Mô tả |
|-----|--------|
| <code>sns.histplot()</code> | Histogram + KDE |
| <code>sns.boxplot()</code> | Boxplot (so sánh phân phối) |
| <code>sns.scatterplot()</code> | Scatter với hue/size |
| <code>sns.heatmap()</code> | Bản đồ nhiệt |
| <code>sns.pairplot()</code> | Tất cả cặp biến |
| <code>sns.barplot()</code> | Bar tự động tính mean |

<strong>Heatmap tương quan:</strong> giá trị +0.7 đến +1.0  tương quan thuận mạnh; -0.7 đến -1.0  tương quan nghịch mạnh.`,
                        code: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

# Dữ liệu mẫu
np.random.seed(42)
df = pd.DataFrame({
    "tuoi":       np.random.randint(18, 60, 100),
    "luong":      np.random.randint(8, 50, 100) * 1_000_000,
    "kinh_nghiem": np.random.randint(0, 20, 100),
    "gioi_tinh":  np.random.choice(["Nam", "Nữ"], 100)
})

# Heatmap tương quan
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Heatmap
corr = df[["tuoi", "luong", "kinh_nghiem"]].corr()
sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm",
            vmin=-1, vmax=1, ax=axes[0])
axes[0].set_title("Ma trận tương quan")

# Boxplot
sns.boxplot(data=df, x="gioi_tinh", y="luong", ax=axes[1])
axes[1].set_title("Phân phối lương theo giới tính")

plt.tight_layout()
plt.savefig("analysis.png", dpi=100, bbox_inches="tight")
print(" Đã lưu analysis.png")

import os
os.remove("analysis.png")`
                    }
                ],
                exercises: [
                    { level: "easy",   title: "Vẽ biểu đồ đường", desc: "Vẽ biểu đồ đường doanh thu 12 tháng. Thêm title, label, grid, legend.", hint: "ax.plot(), ax.set_title(), ax.grid()" },
                    { level: "medium", title: "Heatmap tương quan", desc: "Tính correlation matrix của DataFrame, vẽ heatmap với cmap='coolwarm'.", hint: "df.corr() rồi sns.heatmap()" },
                    { level: "hard",   title: "Dashboard 4 biểu đồ", desc: "Tạo subplot 2x2: line, bar, scatter, boxplot. Tiêu đề chung.", hint: "plt.subplots(2, 2, figsize=(...))" },
                    { level: "easy",   title: "Pie chart + Bar chart", desc: "Vẽ pie chart tỷ lệ nam/nữ trong DataFrame. Vẽ bar chart top 5 sản phẩm bán chạy. Lưu 2 ảnh riêng.", hint: "plt.pie() cho pie chart, df.nlargest(5) cho top 5" },
                    { level: "medium", title: "Phân tích thời gian", desc: "Tạo DataFrame có cột ngày. Vẽ line chart doanh thu theo ngày. Tính trung bình 7 ngày gần nhất (rolling mean) và vẽ đường trung bình.", hint: "df['date'] = pd.to_datetime(). set_index. rolling(7).mean()" },
                    { level: "hard",   title: "Biểu đồ tương tác", desc: "Vẽ 3 biểu đồ trên cùng 1 figure: histogram phân phối lương, boxplot theo thành phố, scatter tuổi vs lương tô màu theo giới tính. Thêm annotation cho điểm outlier.", hint: "fig, axes = plt.subplots(1, 3, figsize=(15, 5)). ax.annotate() cho annotation" }
                ],
                summary: [
                    "matplotlib: vẽ từng chi tiết với ax.plot/bar/scatter",
                    "seaborn: biểu đồ đẹp, tích hợp DataFrame, heatmap tương quan",
                    "plt.savefig() lưu file PNG, dpi càng cao càng nét"
                ]
            },

            // ===== BÀI 6: Hồi Quy Tuyến Tính =====
            {
                id: 6,
                title: "Machine Learning - Hồi Quy Tuyến Tính",
                duration: "90 phút",
                description: "Bài toán Regression - dự đoán giá trị liên tục với scikit-learn",
                objectives: [
                    "Giải thích Machine Learning và pipeline cơ bản",
                    "Chia dữ liệu train/test với train_test_split",
                    "Xây dựng và huấn luyện LinearRegression",
                    "Đánh giá mô hình: MAE, RMSE, R²",
                    "Áp dụng Polynomial Regression cho dữ liệu phi tuyến"
                ],
                sections: [
                    {
                        title: "6.1 Pipeline Machine Learning",
                        icon: "",
                        content: `<strong>Machine Learning</strong> = dạy máy tính học từ dữ liệu.

<strong>Pipeline chuẩn:</strong>
1. Thu thập & Làm sạch dữ liệu
2. EDA (khám phá dữ liệu)
3. Chọn features
4. train_test_split
5. Huấn luyện model
6. Đánh giá

<strong>3 loại bài toán ML:</strong>

| Loại | Output | Ví dụ | Thuật toán |
|------|--------|-------|------------|
| Regression | Số thực | Dự đoán giá nhà | LinearRegression, Ridge |
| Classification | Nhãn | Spam/Not spam | LogisticReg, RF, KNN |
| Clustering | Nhóm | Nhóm khách hàng | KMeans, DBSCAN |`,
                        code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

# Tạo dữ liệu giả
np.random.seed(42)
X = np.random.rand(100, 1) * 10
y = 2.5 * X + 1.2 + np.random.randn(100, 1) * 2

# Chia train/test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"Train: {len(X_train)} mẫu, Test: {len(X_test)} mẫu")

# Huấn luyện
model = LinearRegression()
model.fit(X_train, y_train)
print(f"\\nPhương trình: y = {model.coef_[0][0]:.2f}x + {model.intercept_[0]:.2f}")

# Dự đoán
y_pred = model.predict(X_test)

# Đánh giá
mae = mean_absolute_error(y_test, y_pred)
r2  = r2_score(y_test, y_pred)
print(f"\\nMAE: {mae:.2f}")
print(f"R² : {r2:.3f}  (1.0 là hoàn hảo)")

# Dự đoán giá trị mới
print(f"\\nDự đoán X=5: y = {model.predict([[5]])[0][0]:.2f}")
print(f"Dự đoán X=8: y = {model.predict([[8]])[0][0]:.2f}")`
                    }
                ],
                exercises: [
                    { level: "easy",   title: "Linear Regression đầu tiên", desc: "Dùng dữ liệu ngẫu nhiên, fit LinearRegression, in R² và dự đoán.", hint: "model.fit(X, y), model.predict([[x]])" },
                    { level: "medium", title: "Đánh giá mô hình", desc: "Train/test split 80/20. Tính MAE, RMSE, R². So sánh với dummy model (mean).", hint: "Dùng mean_absolute_error, r2_score" },
                    { level: "hard",   title: "Polynomial Regression", desc: "Tạo dữ liệu phi tuyến (y = x²), thử bậc 1, 2, 5, 10. So sánh R².", hint: "from sklearn.preprocessing import PolynomialFeatures" },
                    { level: "easy",   title: "House Price Prediction", desc: "Dữ liệu giá nhà: diện tích, số phòng → dự đoán giá. Tính MAE và RMSE.", hint: "Features = [[dt, phong] for dt, phong in zip(dien_tich, so_phong)]" },
                    { level: "medium", title: "Multi-variable Regression", desc: "Dữ liệu 100 nhân viên (tuổi, kinh nghiệm, học vấn, lương). Train LinearRegression với 3 features. In coefficients.", hint: "X = df[['tuoi', 'kinh_nghiem', 'hoc_van']]. model.coef_ cho biết feature nào quan trọng nhất" },
                    { level: "hard",   title: "Regularization", desc: "So sánh LinearRegression, Ridge, Lasso trên dữ liệu có nhiều features. Vẽ biểu đồ R² của 3 model. Nhận xét khi nào dùng Ridge/Lasso thay vì LinearRegression thường.", hint: "from sklearn.linear_model import Ridge, Lasso. Ridge coi weight quá lớn, Lasso coi weight về 0" }
                ],
                summary: [
                    "ML: dạy máy học từ dữ liệu - pipeline: data  train  predict",
                    "train_test_split: 80% train, 20% test thường dùng",
                    "Đánh giá Regression: MAE (sai số TB), R² (0-1, càng cao càng tốt)"
                ]
            },

            // ===== BÀI 7: Phân Loại ML =====
            {
                id: 7,
                title: "Phân Loại với Machine Learning",
                duration: "90 phút",
                description: "Bài toán Classification - KNN, Decision Tree, Random Forest",
                objectives: [
                    "Phân biệt Regression và Classification",
                    "Xây dựng mô hình KNN, Decision Tree, Random Forest",
                    "Đánh giá bằng Accuracy, Confusion Matrix, Precision/Recall/F1",
                    "Mã hóa dữ liệu phân loại: Label Encoding, One-Hot",
                    "Chọn mô hình phù hợp dựa trên trade-off"
                ],
                sections: [
                    {
                        title: "7.1 Classification với scikit-learn",
                        icon: "",
                        content: `<strong>Classification</strong> = dự đoán nhãn/lớp (Pass/Fail, spam/ham).

<strong>So sánh với Regression:</strong>

| Đặc điểm | Regression | Classification |
|----------|------------|----------------|
| Output | Số thực | Nhãn/lớp |
| Đánh giá | MAE, R² | Accuracy, F1 |
| Ví dụ | Giá nhà = 3.2 tỷ | Email này spam? |

<strong>Các thuật toán:</strong>
- <strong>KNN</strong>: phân loại theo K láng giềng gần nhất
- <strong>Decision Tree</strong>: cây quyết định if/else
- <strong>Random Forest</strong>: tập hợp nhiều cây  mạnh hơn

<strong>Confusion Matrix:</strong>

|  | Predicted 0 | Predicted 1 |
|--|--|--|
| Actual 0 | TN | FP |
| Actual 1 | FN | TP |

- Accuracy = (TP+TN) / Total
- Precision = TP / (TP+FP)  - trong số dự đoán Positive, bao nhiêu đúng?
- Recall = TP / (TP+FN)  - trong số thực sự Positive, dự đoán đúng bao nhiêu?
- F1 = 2*P*R/(P+R)`,
                        code: `from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import pandas as pd
import numpy as np

# Tạo dữ liệu
np.random.seed(42)
n = 200
df = pd.DataFrame({
    "gio_hoc":      np.random.randint(10, 100, n),
    "tuoi":         np.random.randint(18, 35, n),
    "lam_bai_tap":  np.random.randint(0, 50, n),
    "diem":         np.random.uniform(0, 10, n).round(1)
})
df['pass'] = (df['diem'] >= 5).astype(int)  # 1=pass, 0=fail

# Chia features và target
X = df[['gio_hoc', 'tuoi', 'lam_bai_tap']]
y = df['pass']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Đánh giá
print(f"Accuracy: {accuracy_score(y_test, y_pred):.3f}")
print("\\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=['Fail', 'Pass']))

print("\\nConfusion Matrix:")
cm = confusion_matrix(y_test, y_pred)
print(f"  TN={cm[0,0]:2d}  FP={cm[0,1]:2d}")
print(f"  FN={cm[1,0]:2d}  TP={cm[1,1]:2d}")

# Feature importance
print("\\nFeature quan trọng:")
for feat, imp in zip(X.columns, model.feature_importances_):
    print(f"  {feat}: {imp:.3f}")`
                    }
                ],
                exercises: [
                    { level: "easy",   title: "KNN đầu tiên", desc: "Dùng dữ liệu iris có sẵn. Train KNN(k=3), in accuracy.", hint: "from sklearn.datasets import load_iris" },
                    { level: "medium", title: "So sánh 3 mô hình", desc: "Train KNN, Decision Tree, Random Forest. So sánh accuracy, chọn mô hình tốt nhất.", hint: "Tạo 3 model, fit, predict, so sánh accuracy_score" },
                    { level: "hard",   title: "Encoding dữ liệu", desc: "Có cột 'thanh_pho' (HCM, HN, ĐN). Mã hóa bằng LabelEncoder và OneHotEncoder. So sánh kết quả.", hint: "from sklearn.preprocessing import LabelEncoder, OneHotEncoder" },
                    { level: "easy",   title: "Confusion Matrix", desc: "Train RandomForest trên iris, in confusion matrix và heatmap. Tính Precision, Recall, F1 từ confusion matrix.", hint: "sns.heatmap(cm, annot=True). Precision = TP/(TP+FP), Recall = TP/(TP+FN)" },
                    { level: "medium", title: "Cross-validation", desc: "Train KNN và RandomForest với KFold cross-validation (k=5). So sánh accuracy trung bình và std của 2 model.", hint: "from sklearn.model_selection import cross_val_score. cross_val_score(model, X, y, cv=5)" },
                    { level: "hard",   title: "Hyperparameter Tuning", desc: "Tuning RandomForest: thử n_estimators=[50,100,200], max_depth=[5,10,None]. Dùng GridSearchCV. In best_params và best_score. Train lại với best model.", hint: "from sklearn.model_selection import GridSearchCV. param_grid = {'n_estimators': [50,100]}" }
                ],
                summary: [
                    "Classification: dự đoán nhãn (Pass/Fail, spam/ham)",
                    "Đánh giá: Accuracy, Precision, Recall, F1, Confusion Matrix",
                    "Random Forest thường cho kết quả tốt nhất nhờ ensemble nhiều cây"
                ]
            },

            // ===== BÀI 8: Project Cuối Khóa =====
            {
                id: 8,
                title: "Project Cuối Khóa & Thi Cuối CSA",
                duration: "90 phút",
                description: "Vận dụng toàn bộ pipeline Data Science để phân tích lương",
                objectives: [
                    "Vận dụng toàn bộ pipeline Data Science",
                    "Trình bày kết quả bằng biểu đồ rõ ràng",
                    "Chọn mô hình phù hợp và giải thích kết quả"
                ],
                sections: [
                    {
                        title: "8.1 Đề Thi Cuối Kỳ CSA",
                        icon: "",
                        content: `<strong>Đề bài:</strong> Phân tích dữ liệu lương nhân viên (200 bản ghi).

<strong>Yêu cầu pipeline đầy đủ:</strong>
1. Tạo data 200 NV (tuoi, gioi_tinh, hoc_van, kinh_nghiem, luong, thanh_pho, nganh)
2. Khám phá: thống kê NaN, phân phối lương theo ngành/thành phố
3. Xử lý: điền NaN, mã hóa categorical
4. EDA: 3 biểu đồ insight (bar/box/heatmap)
5. Regression: dự đoán lương theo features
6. Đánh giá: MAE, R²
7. Trình bày kết quả

<strong>Tiêu chí chấm:</strong>
- Pipeline đầy đủ: 30%
- Phân tích insight: 25%
- Visualization đẹp: 20%
- Model chạy đúng: 15%
- Code sạch, có comment: 10%`,
                        code: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.preprocessing import LabelEncoder

# 1. Tạo dữ liệu
np.random.seed(2024)
n = 200
df = pd.DataFrame({
    "tuoi":          np.random.randint(18, 60, n),
    "gioi_tinh":     np.random.choice(["Nam","Nữ"], n),
    "hoc_van":       np.random.choice(["THPT","CĐ","ĐH","ThS"], n),
    "kinh_nghiem":   np.random.uniform(0, 20, n).round(1),
    "luong":         np.nan_to_num(np.where(np.random.rand(n)<0.12, np.nan,
                                             np.random.uniform(7, 35, n).round(2))),
    "thanh_pho":     np.random.choice(["HCM","HN","ĐN","CT"], n),
    "nghanh":        np.random.choice(["Kỹ thuật","Kinh tế","Y tế","Khác"], n),
})

# 2. Khám phá
print("Shape:", df.shape)
print("NaN mỗi cột:\\n", df.isna().sum())
print(f"\\nLương TB: {df['luong'].mean():.2f} triệu")

# 3. Xử lý - điền NaN bằng mean
df['luong'] = df['luong'].fillna(df['luong'].mean())

# 4. Mã hóa categorical
le_dict = {}
for col in ['gioi_tinh', 'hoc_van', 'thanh_pho', 'nghanh']:
    le = LabelEncoder()
    df[col + '_ma'] = le.fit_transform(df[col])
    le_dict[col] = le

# 5. Train model
features = ['tuoi', 'kinh_nghiem', 'gioi_tinh_ma', 'hoc_van_ma', 'thanh_pho_ma', 'nghanh_ma']
X = df[features]
y = df['luong']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Linear Regression
lr = LinearRegression()
lr.fit(X_train, y_train)
y_pred_lr = lr.predict(X_test)
print(f"\\nLinear Regression: MAE={mean_absolute_error(y_test, y_pred_lr):.2f}, R²={r2_score(y_test, y_pred_lr):.3f}")

# Random Forest
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
y_pred_rf = rf.predict(X_test)
print(f"Random Forest:      MAE={mean_absolute_error(y_test, y_pred_rf):.2f}, R²={r2_score(y_test, y_pred_rf):.3f}")

# Feature importance
print("\\nFeature quan trọng (Random Forest):")
for feat, imp in sorted(zip(features, rf.feature_importances_), key=lambda x: -x[1]):
    print(f"  {feat:<20}: {imp:.3f}")`
                    }
                ],
                exercises: [
                    {
                        level: "easy",
                        title: "EDA & Visualization",
                        desc: "Với dữ liệu lương 200 NV: a) Vẽ histogram phân phối lương. b) Vẽ boxplot lương theo ngành. c) Vẽ heatmap correlation giữa các biến số. d) Vẽ scatter tuổi vs lương, tô màu theo học vấn.",
                        hint: "plt.hist, sns.boxplot, sns.heatmap(df.corr(), annot=True), sns.scatterplot với hue='hoc_van'"
                    },
                    {
                        level: "medium",
                        title: "So sánh 4 model Regression",
                        desc: "Train và so sánh: LinearRegression, RandomForest, GradientBoosting, XGBoost (nếu có). In MAE, RMSE, R² cho từng model. Vẽ bar chart so sánh. Feature importance của model tốt nhất.",
                        hint: "from sklearn.linear_model, ensemble, xgb. Dùng mean_squared_error rồi sqrt cho RMSE. Feature importance: model.feature_importances_"
                    },
                    {
                        level: "hard",
                        title: "Pipeline hoàn chỉnh + Deploy",
                        desc: "Xây pipeline sklearn (ColumnTransformer + Pipeline) gồm: SimpleImputer, StandardScaler, OneHotEncoder, RandomForest. Dùng GridSearchCV tìm best_params. Đánh giá trên test set. Lưu model bằng joblib. Tạo app Streamlit đơn giản để dự đoán lương theo input form.",
                        hint: "Pipeline([('pre', ColumnTransformer), ('model', RandomForest)]). GridSearchCV(pipeline, param_grid, cv=5). joblib.dump. Streamlit: number_input cho mỗi feature"
                    }
                ],
                summary: [
                    "Hoàn thành pipeline: data  EDA  xử lý  model  đánh giá",
                    "Trình bày kết quả bằng biểu đồ cho người không chuyên",
                    "Chọn mô hình tốt nhất: Random Forest thường thắng"
                ]
            }
        ]
    },

    csi: {
        name: "AI & Deep Learning",
        icon: "",
        color: "#f59e0b",
        lessons: [
            // ===== BÀI 1: AI & Neural Networks =====
            {
                id: 1,
                title: "Giới Thiệu AI & Neural Networks",
                duration: "90 phút",
                description: "Tổng quan AI/ML/DL, Neuron sinh học vs nhân tạo, activation functions",
                objectives: [
                    "Phân biệt AI / Machine Learning / Deep Learning",
                    "Mô tả cấu trúc Neuron sinh học và Perceptron nhân tạo",
                    "Tính forward pass qua một neuron bằng tay",
                    "Giải thích mục đích các activation functions: Sigmoid, ReLU, Softmax"
                ],
                sections: [
                    {
                        title: "1.1 Bức Tranh AI/ML/DL",
                        icon: "",
                        content: `<strong>Ba khái niệm xếp lồng nhau:</strong>
- <strong>AI (1956)</strong>: tạo máy có hành vi thông minh
- <strong>Machine Learning (1980s)</strong>: học từ dữ liệu thay vì lập trình cứng
- <strong>Deep Learning (2012–nay)</strong>: tự học cả features, dùng mạng neural sâu

<strong>So sánh:</strong>

| | AI Truyền thống | ML | Deep Learning |
|--|-----|-----|---------------|
| Cách học | Quy tắc cứng | Học từ data | Tự học features |
| Dữ liệu | Ít | Vài nghìn | Triệu mẫu |
| Ví dụ | Chess AI, Expert | Random Forest, SVM | GPT, DALL-E |`,
                        code: `# 3 cách tiếp cận bài toán: Phân loại email spam

# 1. AI truyền thống - quy tắc thủ công
def spam_ai(email):
    spam_words = ["free", "winner", "click here", "urgent"]
    return any(w in email.lower() for w in spam_words)

# Test
print(spam_ai("Click here to win a FREE prize!"))  # True
print(spam_ai("Meeting at 3pm"))                   # False

# 2. Machine Learning - sklearn (dùng data thật)
# from sklearn.ensemble import RandomForestClassifier
# rf = RandomForestClassifier()
# rf.fit(X_train, y_train)  # Học từ 1000 email đã gán nhãn

# 3. Deep Learning - tự học cả features
# model = keras.Sequential([Embedding, LSTM, Dense])
# model.fit(X_train, y_train)  # Học từ 100,000 email`
                    },
                    {
                        title: "1.2 Neuron Nhân Tạo và Activation Function",
                        icon: "",
                        content: `<strong>Perceptron</strong> (neuron nhân tạo) mô phỏng neuron sinh học:
1. Nhân mỗi đầu vào với <strong>trọng số</strong> (weight)
2. Cộng tất cả + <strong>bias</strong>
3. Đưa qua <strong>activation function</strong>

<strong>Công thức:</strong>
- z = w₁x₁ + w₂x₂ + ... + wₙxₙ + b
- a = f(z)

<strong>Activation functions:</strong>

| Hàm | Công thức | Dùng khi |
|-----|-----------|----------|
| ReLU | max(0, z) | Hidden layer (mặc định) |
| Sigmoid | 1/(1+e⁻ᶻ) | Output binary (0/1) |
| Tanh | (eᶻ-e⁻ᶻ)/(eᶻ+e⁻ᶻ) | Hidden (zero-centered) |
| Softmax | eᶻⁱ/Σeᶻ | Output multi-class |`,
                        code: `import numpy as np
import matplotlib.pyplot as plt

# Forward pass qua 1 neuron
def neuron(inputs, weights, bias, activation="relu"):
    z = np.dot(weights, inputs) + bias
    if activation == "relu":
        return max(0, z)
    elif activation == "sigmoid":
        return 1 / (1 + np.exp(-z))
    elif activation == "tanh":
        return np.tanh(z)
    return z

# Ví dụ: dự đoán có nên cho vay không
# Inputs: [tuổi, thu_nhập, nợ] - đã chuẩn hóa
inputs  = np.array([0.8, 0.6, 0.2])    # tuổi 40, thu nhập cao, nợ ít
weights = np.array([0.4, 0.5, -0.7])   # tuổi tốt, thu nhập tốt, nợ xấu
bias    = -0.3

# Qua ReLU
a_relu = neuron(inputs, weights, bias, "relu")
print(f"ReLU output: {a_relu:.3f}")

# Qua Sigmoid (output 0-1: xác suất cho vay)
a_sig = neuron(inputs, weights, bias, "sigmoid")
print(f"Sigmoid output: {a_sig:.3f}  {a_sig*100:.1f}% khả năng cho vay")

# Softmax cho multi-class
def softmax(z):
    e_z = np.exp(z - np.max(z))  # tránh overflow
    return e_z / e_z.sum()

scores = np.array([3.0, 1.0, -2.0])
probs = softmax(scores)
print(f"\\nSoftmax: {probs}")
print(f"Xác suất từng lớp: {dict(zip(['A','B','C'], probs.round(3)))}")`
                    }
                ],
                exercises: [
                    { level: "easy",   title: "Tính forward pass", desc: "Cho inputs=[0.5, 0.8], weights=[0.6, 0.4], bias=-0.2. Tính z và sigmoid(z).", hint: "z = w·x + b, sigmoid = 1/(1+e^-z)" },
                    { level: "medium", title: "Softmax bằng tay", desc: "Tính softmax([2.0, 1.0, 0.1]) bằng tay. So sánh với np.exp/sum.", hint: "Trừ max trước để tránh overflow" },
                    { level: "hard",   title: "Xây neuron tổng quát", desc: "Class Neuron(inputs, weights, bias) với methods forward, activation. So sánh ReLU, Sigmoid, Tanh.", hint: "Kế thừa + override activation" },
                    { level: "easy",   title: "So sánh 3 cách tiếp cận", desc: "Code lại 3 hàm: spam_ai (quy tắc), spam_ml (train trên 100 mẫu), spam_dl (Neural Network). So sánh ưu nhược điểm mỗi cách.", hint: "spam_ai: if/elif. spam_ml: LogisticRegression. spam_dl: keras.Dense(1)" },
                    { level: "hard",   title: "Backpropagation đơn giản", desc: "Tính gradient descent cho 1 neuron: w = w - lr * dLoss/dw. Tự code 1 epoch training. So sánh với SGD của sklearn.", hint: "Loss = (y - y_pred)^2. dLoss/dw = -2*(y - y_pred)*x" }
                ],
                summary: [
                    "AI > ML > DL: AI rộng nhất, DL hẹp nhất nhưng mạnh nhất",
                    "Perceptron: z = w·x + b, a = f(z)",
                    "ReLU cho hidden, Sigmoid cho binary output, Softmax cho multi-class"
                ]
            },

            // ===== BÀI 2: TensorFlow & Keras =====
            {
                id: 2,
                title: "TensorFlow & Keras Cơ Bản",
                duration: "90 phút",
                description: "Xây dựng và huấn luyện mạng neural với Keras Sequential API",
                objectives: [
                    "Xây dựng mạng Dense bằng keras.Sequential",
                    "Compile mô hình: optimizer, loss, metrics",
                    "Huấn luyện với model.fit() và xem training curves",
                    "Sử dụng EarlyStopping tránh overfit",
                    "Đánh giá trên test set, in confusion matrix"
                ],
                sections: [
                    {
                        title: "2.1 Keras Sequential API",
                        icon: "",
                        content: `<strong>Keras</strong> = high-level API trên TensorFlow, dễ dùng cho người mới.

<strong>Quy trình 3 bước:</strong>
1. <strong>Define</strong>: <code>model = keras.Sequential([...])</code>
2. <strong>Compile</strong>: <code>model.compile(optimizer, loss, metrics)</code>
3. <strong>Fit</strong>: <code>model.fit(X_train, y_train, ...)</code>

<strong>Các tham số compile:</strong>

| Tham số | Tùy chọn phổ biến |
|---------|-------------------|
| <code>optimizer</code> | <code>'adam'</code>, <code>'sgd'</code>, <code>'rmsprop'</code> |
| <code>loss</code> | <code>'binary_crossentropy'</code>, <code>'sparse_categorical_crossentropy'</code>, <code>'mse'</code> |
| <code>metrics</code> | <code>['accuracy']</code> |`,
                        code: `import tensorflow as tf
from tensorflow import keras
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
import numpy as np

# Load dữ liệu digits (8x8 ảnh, 10 lớp 0-9)
digits = load_digits()
X, y = digits.data, digits.target
X = X / 16.0   # Chuẩn hóa về [0, 1]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"Train: {X_train.shape}, Test: {X_test.shape}")

# 1. Define
model = keras.Sequential([
    keras.layers.Input(shape=(64,)),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(10, activation='softmax')
])

# 2. Compile
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# 3. Fit với EarlyStopping
early_stop = keras.callbacks.EarlyStopping(patience=5, restore_best_weights=True)
history = model.fit(
    X_train, y_train,
    validation_split=0.2,
    epochs=50,
    batch_size=32,
    callbacks=[early_stop],
    verbose=0
)

# Đánh giá
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"\\nTest Accuracy: {test_acc:.3f}")

# Dự đoán
predictions = model.predict(X_test[:3], verbose=0)
print(f"\\nDự đoán 3 mẫu đầu:")
for i, p in enumerate(predictions):
    print(f"  Thực tế: {y_test[i]}, Dự đoán: {p.argmax()}, Xác suất: {p[p.argmax()]:.2%}")`
                    }
                ],
                exercises: [
                    { level: "easy",   title: "MLP với MNIST", desc: "Dùng keras.datasets.mnist, xây MLP 1 hidden layer 128 neurons, train 5 epochs.", hint: "Flatten input 28x28 thành 784" },
                    { level: "medium", title: "Tuning hyperparameters", desc: "Thử 3 cấu hình: (64, dropout 0.1), (256, dropout 0.5), (128, 64). So sánh val_accuracy.", hint: "Train mỗi cấu hình 10 epochs, lưu history" },
                    { level: "hard",   title: "Callbacks nâng cao", desc: "Thêm ModelCheckpoint lưu best model, ReduceLROnPlateau giảm LR khi plateau.", hint: "model.fit(callbacks=[...])" },
                    { level: "easy",   title: "Fashion MNIST classification", desc: "Load Fashion-MNIST (10 loại quần áo). Xây MLP 2 hidden layers. Train và in accuracy. Hiển thị 9 ảnh test với nhãn dự đoán.", hint: "matplotlib để hiển thị ảnh. np.argmax cho nhãn" },
                    { level: "hard",   title: "EarlyStopping vs No-EarlyStopping", desc: "Train cùng 1 model 2 lần: (a) không EarlyStopping, 50 epochs; (b) có EarlyStopping(patience=5). Vẽ training curves so sánh. Nhận xét về overfitting.", hint: "So sánh val_loss curves. Nhận xét: không có ES → overfit sau epoch nào?" }
                ],
                summary: [
                    "Quy trình Keras: Define  Compile  Fit",
                    "Dense + Dropout tránh overfit, ReLU cho hidden, Softmax cho output",
                    "EarlyStopping patience=5: dừng khi val_loss không cải thiện 5 epochs"
                ]
            },

            // ===== BÀI 3: CNN - Computer Vision =====
            {
                id: 3,
                title: "CNN - Computer Vision",
                duration: "90 phút",
                description: "Mạng nơ-ron tích chập cho bài toán phân loại ảnh",
                objectives: [
                    "Giải thích tại sao Dense không hiệu quả với ảnh",
                    "Mô tả Conv2D, MaxPooling, Dropout hoạt động",
                    "Xây dựng CNN chuẩn với Keras",
                    "Áp dụng Data Augmentation tránh overfit",
                    "Phân loại ảnh CIFAR-10"
                ],
                sections: [
                    {
                        title: "3.1 CNN - Mạng Nơ-Ron Tích Chập",
                        icon: "",
                        content: `<strong>Vấn đề của Dense với ảnh:</strong> Ảnh 32×32×3 = 3072 số. Dense(256) tạo 3072×256 = 786,432 tham số chỉ ở lớp đầu!

<strong>CNN giải quyết bằng:</strong>

| Vấn đề | Dense | Conv2D |
|--------|-------|--------|
| Giữ vị trí |  Flatten mất |  Duyệt qua ảnh |
| Chia sẻ trọng số |  Mỗi pixel riêng |  Cùng filter dùng lại |
| Số tham số | Rất nhiều | Ít hơn nhiều |

<strong>Kiến trúc CNN chuẩn:</strong>
<pre>Input  [Conv  BN  ReLU  MaxPool  Dropout] × N
      Flatten  Dense  Dropout  Output (Softmax)</pre>

<strong>Conv block:</strong> Conv2D để trích features, MaxPooling giảm kích thước, Dropout chống overfit.`,
                        code: `import tensorflow as tf
from tensorflow import keras

# Xây dựng CNN cho CIFAR-10 (32x32x3, 10 lớp)
def build_cnn():
    model = keras.Sequential([
        # Block 1: 32x32x3  16x16x32
        keras.layers.Conv2D(32, (3, 3), activation='relu', padding='same', input_shape=(32, 32, 3)),
        keras.layers.BatchNormalization(),
        keras.layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        keras.layers.MaxPooling2D((2, 2)),
        keras.layers.Dropout(0.25),

        # Block 2: 16x16x32  8x8x64
        keras.layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        keras.layers.BatchNormalization(),
        keras.layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        keras.layers.MaxPooling2D((2, 2)),
        keras.layers.Dropout(0.25),

        # Classifier
        keras.layers.Flatten(),
        keras.layers.Dense(128, activation='relu'),
        keras.layers.Dropout(0.5),
        keras.layers.Dense(10, activation='softmax')
    ])
    return model

model = build_cnn()
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)
model.summary()

# Data Augmentation - chống overfit với dataset nhỏ
data_aug = keras.Sequential([
    keras.layers.RandomFlip("horizontal"),
    keras.layers.RandomRotation(0.1),
    keras.layers.RandomZoom(0.1),
])

# (Ví dụ training - thực tế cần load CIFAR-10)
# (X_train, y_train), (X_test, y_test) = keras.datasets.cifar10.load_data()
# model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=30)`
                    }
                ],
                exercises: [
                    { level: "easy",   title: "CNN đầu tiên", desc: "Xây CNN đơn giản cho CIFAR-10. 2 conv blocks, dense 64, output 10. Train 10 epochs.", hint: "Conv2D(32, (3,3), activation='relu', input_shape=(32,32,3))" },
                    { level: "medium", title: "Data Augmentation", desc: "Áp dụng RandomFlip, RandomRotation, RandomZoom. So sánh accuracy với không augmentation.", hint: "data_aug = keras.Sequential([...])" },
                    { level: "hard",   title: "Visualize filters", desc: "In filters của layer Conv2D đầu tiên (32 filters 3x3). Visualize feature maps.", hint: "model.layers[0].get_weights()[0]" },
                    { level: "easy",   title: "CNN vs MLP", desc: "So sánh MLP và CNN trên CIFAR-10 (10 epochs). MLP: Flatten → Dense(512) → Dense(10). CNN: Conv2D(32) → MaxPool → Dense. In accuracy và thời gian train.", hint: "CNN thường accuracy cao hơn và train nhanh hơn vì ít tham số" },
                    { level: "medium", title: "Batch Normalization", desc: "Thêm BatchNormalization sau mỗi Conv layer. So sánh accuracy và tốc độ hội tụ với không có BatchNorm.", hint: "keras.layers.BatchNormalization() sau Conv2D" }
                ],
                summary: [
                    "CNN: Conv2D trích features, MaxPool giảm chiều, Dropout chống overfit",
                    "Data Augmentation tăng data bằng xoay/lật/zoom ảnh",
                    "CNN đạt 90%+ accuracy trên CIFAR-10, Dense chỉ 50-60%"
                ]
            },

            // ===== BÀI 4: Transfer Learning =====
            {
                id: 4,
                title: "Transfer Learning",
                duration: "90 phút",
                description: "Tái sử dụng mô hình pretrained (MobileNetV2, ResNet50) cho bài toán mới",
                objectives: [
                    "Giải thích ý tưởng và lợi ích của Transfer Learning",
                    "Load pretrained model với include_top=False",
                    "Feature Extraction: đóng băng base, train custom head",
                    "Fine-tuning: mở freeze và train với LR nhỏ",
                    "So sánh accuracy trước/sau fine-tuning"
                ],
                sections: [
                    {
                        title: "4.1 Transfer Learning với Pretrained Model",
                        icon: "",
                        content: `<strong>Ý tưởng:</strong> Pretrained model đã học nhận biết edges, textures, shapes từ 1.2M ảnh ImageNet  chỉ cần thêm classifier head cho task mới.

<strong>2 giai đoạn:</strong>

| Giai đoạn | Mô tả | Learning rate |
|-----------|-------|---------------|
| Feature Extraction | Đóng băng base, train head mới | 1e-3 |
| Fine-tuning | Mở freeze 1 phần, train tiếp | 1e-5 (rất nhỏ) |

<strong> Tại sao fine-tune dùng LR nhỏ?</strong> Vì trọng số đã tốt từ ImageNet, chỉ tinh chỉnh nhẹ. LR lớn sẽ phá hỏng features đã học.`,
                        code: `import tensorflow as tf
from tensorflow import keras
import numpy as np

# 1. Load pretrained base
base_model = keras.applications.MobileNetV2(
    input_shape=(160, 160, 3),
    include_top=False,        # Bỏ classifier gốc
    weights='imagenet'
)
base_model.trainable = False  # Đóng băng toàn bộ

print(f"Base model có {len(base_model.layers)} layers")
print(f"Trainable params: {sum(tf.size(w) for w in base_model.trainable_variables)}")

# 2. Thêm custom head
model = keras.Sequential([
    keras.layers.Input(shape=(160, 160, 3)),
    keras.layers.Rescaling(1./127.5, offset=-1),  # MobileNetV2 expects [-1, 1]
    base_model,
    keras.layers.GlobalAveragePooling2D(),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(1, activation='sigmoid')  # Binary: cat/dog
])

model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=1e-3),
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# 3. Giai đoạn 1: Feature Extraction
# model.fit(train_data, validation_data=val_data, epochs=10)
print(" Giai đoạn 1: Feature Extraction")

# 4. Giai đoạn 2: Fine-tuning
base_model.trainable = True
# Mở freeze chỉ từ layer thứ 100 trở đi
for layer in base_model.layers[:100]:
    layer.trainable = False

print(f"\\nSau fine-tuning - Trainable layers: {sum(1 for l in base_model.layers if l.trainable)}")

# Compile lại với LR nhỏ
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=1e-5),  # LR nhỏ!
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# model.fit(train_data, validation_data=val_data, epochs=10)
print(" Giai đoạn 2: Fine-tuning với LR=1e-5")`
                    }
                ],
                exercises: [
                    { level: "easy",   title: "Feature Extraction", desc: "Load MobileNetV2, thêm Dense(3) cho 3 lớp. Train trên dataset nhỏ (ảnh mèo/chó/chim).", hint: "include_top=False, weights='imagenet'" },
                    { level: "medium", title: "So sánh 2 giai đoạn", desc: "Train 10 epochs Feature Extraction, sau đó unfreeze và train thêm 5 epochs. So sánh val_accuracy.", hint: "base_model.trainable = True" },
                    { level: "hard",   title: "Custom ResNet", desc: "Thay MobileNetV2 bằng ResNet50. So sánh accuracy và số params.", hint: "keras.applications.ResNet50(...)" }
                ],
                summary: [
                    "Transfer Learning: dùng pretrained model + custom head",
                    "Feature Extraction (LR cao, freeze base)  Fine-tuning (LR nhỏ, unfreeze)",
                    "MobileNetV2: 2.2M params, tốt cho mobile. ResNet50: 25M params, mạnh hơn"
                ]
            },

            // ===== BÀI 5: Kiểm Tra Lần 1 =====
            {
                id: 5,
                title: "Kiểm Tra Lần 1 CSI",
                duration: "90 phút",
                description: "Đánh giá: MLP, CNN, Transfer Learning",
                objectives: [
                    "Xây dựng và train MLP với Keras",
                    "Xây dựng CNN cho phân loại ảnh",
                    "Áp dụng Transfer Learning (feature extraction)",
                    "Giải thích Dropout, BatchNorm, EarlyStopping, Data Augmentation"
                ],
                sections: [
                    {
                        title: "5.1 Đề Kiểm Tra - Phân Loại Ảnh",
                        icon: "",
                        content: `<strong>Đề bài:</strong> Phân loại ảnh CIFAR-10 (10 lớp) bằng CNN, đạt accuracy ≥ 75%.

<strong>Yêu cầu:</strong>
1. Load CIFAR-10, chuẩn hóa
2. Xây CNN ≥ 3 conv blocks
3. Áp dụng Data Augmentation
4. Dùng EarlyStopping + ReduceLROnPlateau
5. Vẽ training curves
6. In confusion matrix trên test set
7. Lưu model

<strong>Tiêu chí chấm:</strong>
- CNN đúng cấu trúc: 30%
- Đạt ≥ 75% accuracy: 25%
- Data Augmentation áp dụng: 15%
- Callbacks: 10%
- Visualization: 10%
- Code sạch: 10%`,
                        code: `import tensorflow as tf
from tensorflow import keras
import numpy as np
import matplotlib.pyplot as plt

# 1. Load data
(X_train, y_train), (X_test, y_test) = keras.datasets.cifar10.load_data()
X_train, X_test = X_train / 255.0, X_test / 255.0
class_names = ['plane', 'car', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']

# 2. Data Augmentation
data_aug = keras.Sequential([
    keras.layers.RandomFlip("horizontal"),
    keras.layers.RandomTranslation(0.1, 0.1),
    keras.layers.RandomRotation(0.1),
    keras.layers.RandomZoom(0.1),
])

# 3. Build CNN
model = keras.Sequential([
    keras.layers.Input(shape=(32, 32, 3)),
    data_aug,

    keras.layers.Conv2D(32, 3, padding='same', activation='relu'),
    keras.layers.BatchNormalization(),
    keras.layers.Conv2D(32, 3, padding='same', activation='relu'),
    keras.layers.MaxPooling2D(2),
    keras.layers.Dropout(0.25),

    keras.layers.Conv2D(64, 3, padding='same', activation='relu'),
    keras.layers.BatchNormalization(),
    keras.layers.Conv2D(64, 3, padding='same', activation='relu'),
    keras.layers.MaxPooling2D(2),
    keras.layers.Dropout(0.25),

    keras.layers.Conv2D(128, 3, padding='same', activation='relu'),
    keras.layers.BatchNormalization(),
    keras.layers.MaxPooling2D(2),
    keras.layers.Dropout(0.25),

    keras.layers.Flatten(),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dropout(0.5),
    keras.layers.Dense(10, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# 4. Callbacks
callbacks = [
    keras.callbacks.EarlyStopping(patience=10, restore_best_weights=True),
    keras.callbacks.ReduceLROnPlateau(factor=0.5, patience=5),
    keras.callbacks.ModelCheckpoint('best_cnn.keras', save_best_only=True)
]

# 5. Train
history = model.fit(
    X_train, y_train,
    validation_split=0.1,
    epochs=50,
    batch_size=64,
    callbacks=callbacks,
    verbose=1
)

# 6. Evaluate
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"\\nTest Accuracy: {test_acc*100:.2f}%")

# 7. Vẽ training curves
fig, axes = plt.subplots(1, 2, figsize=(12, 4))
axes[0].plot(history.history['accuracy'], label='Train')
axes[0].plot(history.history['val_accuracy'], label='Val')
axes[0].set_title('Accuracy'); axes[0].legend()
axes[1].plot(history.history['loss'], label='Train')
axes[1].plot(history.history['val_loss'], label='Val')
axes[1].set_title('Loss'); axes[1].legend()
plt.tight_layout()
plt.savefig("training_curves.png", dpi=100)

# 8. Confusion matrix
from sklearn.metrics import confusion_matrix
import seaborn as sns
y_pred = model.predict(X_test, verbose=0).argmax(axis=1)
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', xticklabels=class_names, yticklabels=class_names)
plt.title("Confusion Matrix")
plt.savefig("confusion.png", dpi=100)`
                    }
                ],
                exercises: [
                    {
                        level: "easy",
                        title: "MLP cơ bản trên Fashion-MNIST",
                        desc: "Load Fashion-MNIST, xây MLP 3 lớp (Flatten → Dense 256 → Dense 128 → Dense 10). Compile với adam + sparse_categorical_crossentropy. Train 10 epochs, in test accuracy. Vẽ learning curve.",
                        hint: "keras.datasets.fashion_mnist.load_data(). Flatten input 28x28 thành 784. Mỗi Dense nên có activation='relu' (trừ lớp cuối softmax)"
                    },
                    {
                        level: "medium",
                        title: "CNN trên CIFAR-10",
                        desc: "Xây CNN: 3 khối (Conv-BN-ReLU-Conv-BN-ReLU-MaxPool-Dropout), filter tăng dần 32→64→128. Flatten → Dense 128 → Dense 10. Áp dụng Data Augmentation (Flip, Rotation, Zoom). Train 30 epochs với callbacks EarlyStopping + ReduceLR. Đạt ≥ 75% test acc.",
                        hint: "keras.layers.Conv2D(filters, 3, padding='same', activation='relu'), MaxPooling2D(2), Dropout(0.25). ImageDataGenerator hoặc keras.layers.RandomFlip/Rotation"
                    },
                    {
                        level: "hard",
                        title: "Transfer Learning với ResNet50",
                        desc: "Dùng ResNet50 pretrained trên ImageNet (include_top=False, pooling='avg'). Freeze toàn bộ base. Thêm: Dense 256 + Dropout + Dense 10. Train 5 epochs trên CIFAR-10 (resize ảnh lên 224x224). Sau đó unfreeze 20 layer cuối, train thêm 5 epochs với learning rate nhỏ. So sánh accuracy với CNN tự xây.",
                        hint: "base = ResNet50(weights='imagenet', include_top=False). base.trainable=False. Unfreeze: base.trainable=True; for layer in base.layers[:-20]: layer.trainable=False. LR nhỏ 1e-5"
                    }
                ],
                summary: [
                    "Thi trong 90 phút: MLP + CNN + Transfer Learning",
                    "Yêu cầu accuracy ≥ 75% trên CIFAR-10"
                ]
            },

            // ===== BÀI 6: NLP Cơ Bản =====
            {
                id: 6,
                title: "NLP Cơ Bản - Xử Lý Văn Bản",
                duration: "90 phút",
                description: "Pipeline NLP: Tokenize  Embed  LSTM  Output. Phân loại cảm xúc IMDB",
                objectives: [
                    "Mô tả NLP pipeline: Text  Tokenize  Embed  Model  Output",
                    "Giải thích Word Embedding (so sánh với One-Hot)",
                    "Hiểu tại sao LSTM tốt hơn Dense cho dữ liệu sequential",
                    "Xây dựng IMDB sentiment classifier với Keras LSTM"
                ],
                sections: [
                    {
                        title: "6.1 NLP Pipeline và LSTM",
                        icon: "",
                        content: `<strong>NLP Pipeline:</strong>
<pre>Text  Tokenize  Index  Embed  LSTM/Dense  Output</pre>

<strong>So sánh One-Hot vs Embedding:</strong>

| | One-Hot | Embedding |
|--|---------|-----------|
| Kích thước | = vocab size (lớn) | 50-300 (nhỏ) |
| Ngữ nghĩa | Mỗi từ độc lập | Từ giống nhau có vector gần |
| Train | Không cần | Học từ data |

<strong>Tại sao LSTM tốt cho text?</strong>
- Nhớ ngữ cảnh xa (hundreds of tokens)
- Xử lý câu có độ dài thay đổi
- Hiểu thứ tự từ (quan trọng cho ngôn ngữ)`,
                        code: `import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np

# 1. Load IMDB
(X_train, y_train), (X_test, y_test) = keras.datasets.imdb.load_data(num_words=10000)

# 2. Pad sequences về cùng độ dài
maxlen = 200
X_train = pad_sequences(X_train, maxlen=maxlen, padding='post', truncating='post')
X_test  = pad_sequences(X_test,  maxlen=maxlen, padding='post', truncating='post')

print(f"Train shape: {X_train.shape}, Test: {X_test.shape}")

# 3. Build model: Embedding  LSTM  Dense
model = keras.Sequential([
    keras.layers.Embedding(10000, 128, input_length=maxlen),
    keras.layers.LSTM(64, dropout=0.2, recurrent_dropout=0.2),
    keras.layers.Dense(32, activation='relu'),
    keras.layers.Dropout(0.5),
    keras.layers.Dense(1, activation='sigmoid')  # Binary: positive/negative
])

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)
model.summary()

# 4. Train
early_stop = keras.callbacks.EarlyStopping(patience=3, restore_best_weights=True)
history = model.fit(
    X_train, y_train,
    validation_split=0.2,
    epochs=15,
    batch_size=64,
    callbacks=[early_stop],
    verbose=1
)

# 5. Evaluate
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"\\nTest Accuracy: {test_acc*100:.2f}%")

# 6. Dự đoán review mới
word_index = keras.datasets.imdb.get_word_index()
def encode_review(text):
    words = text.lower().split()
    encoded = [word_index.get(w, 2) + 3 for w in words]  # 2=oov, 3=padding offset
    return pad_sequences([encoded], maxlen=maxlen, padding='post')

reviews = [
    "This movie was absolutely fantastic and beautiful",
    "Terrible boring waste of time worst movie ever"
]
for r in reviews:
    pred = model.predict(encode_review(r), verbose=0)[0][0]
    label = "Positive" if pred > 0.5 else "Negative"
    print(f"\\n'{r}'")
    print(f"   {label} ({pred:.2%})")`
                    }
                ],
                exercises: [
                    { level: "easy",   title: "Tokenizer cơ bản", desc: "Dùng Tokenizer fit trên 5 câu. Test text_to_sequence và pad_sequences.", hint: "tokenizer.fit_on_texts(texts), texts_to_sequences(texts)" },
                    { level: "medium", title: "Bidirectional LSTM", desc: "Thay LSTM bằng Bidirectional(LSTM(64)). So sánh accuracy.", hint: "keras.layers.Bidirectional(keras.layers.LSTM(64))" },
                    { level: "hard",   title: "Phân loại tin tức", desc: "Dùng keras.datasets.reuters, xây LSTM 2 lớp, đạt accuracy ≥ 80%.", hint: "Reuters 46 classes, num_words=10000" },
                    { level: "medium", title: "Word Embedding Visualization", desc: "Load pretrained GloVe/Gensim embeddings cho tiếng Anh. Với 10 từ cho sẵn, tìm 5 từ most similar và in similarity scores.", hint: "from gensim.models import KeyedVectors. model.most_similar('word')" }
                ],
                summary: [
                    "NLP: Text  Tokenize  Embedding  LSTM/Dense  Output",
                    "Embedding: biến từ thành vector dense, học ngữ nghĩa từ data",
                    "LSTM: nhớ long-term, xử lý sequence tốt hơn Dense"
                ]
            },

            // ===== BÀI 7: Hugging Face =====
            {
                id: 7,
                title: "Hugging Face Transformers",
                duration: "90 phút",
                description: "Dùng pretrained Transformer models từ Hugging Face Hub",
                objectives: [
                    "Giải thích ý tưởng Attention mechanism",
                    "Dùng Hugging Face pipeline() cho các task NLP phổ biến",
                    "Load pretrained tokenizer và model từ Hub",
                    "Trích xuất sentence embeddings và tính semantic similarity"
                ],
                sections: [
                    {
                        title: "7.1 Transformers và Attention",
                        icon: "",
                        content: `<strong>Transformer</strong> = kiến trúc thống trị NLP hiện đại, dùng cơ chế Attention thay vì tuần tự như LSTM.

<strong>Attention cho phép:</strong>
- Xử lý song song (nhanh hơn LSTM)
- Học long-range dependency
- Hiểu được mối quan hệ giữa mọi cặp từ

<strong>3 nhóm model phổ biến:</strong>

| Nhóm | Đặc điểm | Ví dụ |
|------|----------|-------|
| Encoder-only | Hiểu ngữ nghĩa | BERT, RoBERTa |
| Decoder-only | Sinh văn bản | GPT, LLaMA |
| Encoder-Decoder | Dịch, tóm tắt | T5, BART |

<strong>Pipeline() của Hugging Face</strong> - dùng pretrained model chỉ với 1-2 dòng code!`,
                        code: `# Cài: pip install transformers torch
from transformers import pipeline

# 1. Sentiment analysis
print("=== Sentiment Analysis ===")
classifier = pipeline("sentiment-analysis")
texts = [
    "I love this product, it's amazing!",
    "This is the worst experience ever.",
    "It's okay, nothing special."
]
for t in texts:
    result = classifier(t)[0]
    print(f"  '{t}'")
    print(f"   {result['label']} ({result['score']:.2%})")

# 2. Zero-shot classification
print("\\n=== Zero-Shot Classification ===")
classifier = pipeline("zero-shot-classification")
text = "I want to book a flight to Hanoi next week"
labels = ["travel", "cooking", "technology", "sports"]
result = classifier(text, candidate_labels=labels)
print(f"Text: '{text}'")
for label, score in zip(result['labels'], result['scores']):
    print(f"  {label}: {score:.2%}")

# 3. Text generation (GPT-2)
print("\\n=== Text Generation ===")
generator = pipeline("text-generation", model="gpt2")
result = generator("MindX is a great place to", max_length=30, num_return_sequences=1)
print(f"  Generated: {result[0]['generated_text']}")

# 4. Question Answering
print("\\n=== Question Answering ===")
qa = pipeline("question-answering")
context = "MindX was founded in 2015 in Hanoi. It teaches programming to students."
question = "When was MindX founded?"
result = qa(question=question, context=context)
print(f"  Q: {question}")
print(f"  A: {result['answer']} (confidence: {result['score']:.2%})")

# 5. Sentence Embeddings - tính semantic similarity
print("\\n=== Semantic Similarity ===")
from transformers import AutoTokenizer, AutoModel
import torch

tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
model = AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")

def get_embedding(text):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    # Mean pooling
    embeddings = outputs.last_hidden_state.mean(dim=1)
    return embeddings[0]

def cosine_similarity(a, b):
    return torch.nn.functional.cosine_similarity(a.unsqueeze(0), b.unsqueeze(0)).item()

s1 = get_embedding("Tôi yêu lập trình Python")
s2 = get_embedding("Python programming is my passion")
s3 = get_embedding("Hôm nay trời mưa to")

print(f"  'Lập trình Python' vs 'Python programming': {cosine_similarity(s1, s2):.3f}")
print(f"  'Lập trình Python' vs 'Trời mưa': {cosine_similarity(s1, s3):.3f}")`
                    }
                ],
                exercises: [
                    { level: "easy",   title: "Sentiment Pipeline", desc: "Phân tích sentiment 10 review phim. In label và confidence.", hint: "pipeline('sentiment-analysis')" },
                    { level: "medium", title: "Translation", desc: "Dùng pipeline dịch 5 câu tiếng Việt sang tiếng Anh và ngược lại.", hint: "pipeline('translation', model='Helsinki-NLP/...')" },
                    { level: "hard",   title: "Custom Embeddings", desc: "Tải 100 bài báo, embed bằng sentence-transformer. Tìm top 5 bài giống nhau nhất.", hint: "Dùng cosine_similarity giữa các embedding" }
                ],
                summary: [
                    "Transformer thay LSTM: parallel, attention, hiệu năng cao",
                    "Hugging Face pipeline(): 1 dòng cho sentiment, QA, generation,...",
                    "Sentence embedding: biến câu thành vector, dùng cosine_similarity so sánh"
                ]
            },

            // ===== BÀI 8: Streamlit =====
            {
                id: 8,
                title: "Streamlit - Deploy AI thành Web App",
                duration: "90 phút",
                description: "Xây dựng web app tương tác với Streamlit và deploy miễn phí",
                objectives: [
                    "Giải thích tại sao cần deployment",
                    "Xây dựng web app với Streamlit trong 30 phút",
                    "Tích hợp model sklearn/keras vào Streamlit",
                    "Deploy lên Streamlit Community Cloud miễn phí"
                ],
                sections: [
                    {
                        title: "8.1 Streamlit - Từ Model đến Web App",
                        icon: "",
                        content: `<strong>Streamlit</strong> = framework Python giúp tạo web app cho AI/ML chỉ trong vài dòng code.

<strong>Tại sao cần Deployment?</strong>
- Model trong notebook chỉ mình dev thấy
- User (khách hàng, sếp, đồng nghiệp) cần giao diện trực quan
- Web app = cách nhanh nhất để demo và chia sẻ

<strong>Các hàm Streamlit cơ bản:</strong>

| Hàm | Mô tả |
|-----|--------|
| <code>st.title()</code> | Tiêu đề lớn |
| <code>st.write()</code> | In bất kỳ thứ gì |
| <code>st.text_input()</code> | Ô nhập text |
| <code>st.button()</code> | Nút bấm |
| <code>st.file_uploader()</code> | Upload file |
| <code>st.pyplot()</code> | Hiển thị biểu đồ |
| <code>st.cache_resource</code> | Cache model nặng |`,
                        code: `# Cài: pip install streamlit pillow
# Chạy: streamlit run app.py
# File: app.py

import streamlit as st
from PIL import Image
import numpy as np

st.set_page_config(page_title="MindX Image Classifier", page_icon="")
st.title(" MindX Image Classifier")
st.write("Upload ảnh và AI sẽ phân loại cho bạn!")

# Cache model - load 1 lần
@st.cache_resource
def load_model():
    # from tensorflow import keras
    # return keras.models.load_model("model.h5")
    return None  # Placeholder

model = load_model()

# Upload ảnh
uploaded = st.file_uploader("Chọn ảnh...", type=["jpg", "png"])

if uploaded:
    img = Image.open(uploaded)
    st.image(img, caption="Ảnh đã upload", use_column_width=True)

    # Predict
    # img_array = np.array(img.resize((224, 224))) / 255.0
    # img_batch = np.expand_dims(img_array, 0)
    # preds = model.predict(img_batch)
    # class_idx = preds.argmax()
    # confidence = preds[0][class_idx]

    # Demo với kết quả giả
    class_names = ["Mèo", "Chó", "Chim", "Xe hơi"]
    class_idx = np.random.randint(0, 4)
    confidence = np.random.uniform(0.7, 0.99)

    st.success(f"**Kết quả:** {class_names[class_idx]} ({confidence:.1%})")
    st.progress(float(confidence))

    # Thông tin thêm
    with st.expander("ℹ Thông tin chi tiết"):
        st.write(f"- Class: {class_names[class_idx]}")
        st.write(f"- Confidence: {confidence:.4f}")
        st.write(f"- Model: MobileNetV2")

# Sidebar
with st.sidebar:
    st.header(" Settings")
    top_k = st.slider("Top K predictions", 1, 5, 3)
    threshold = st.slider("Confidence threshold", 0.0, 1.0, 0.5)
    st.write(f"Showing top {top_k} with threshold {threshold}")`
                    }
                ],
                exercises: [
                    { level: "easy",   title: "Hello Streamlit", desc: "App 10 dòng: text_input nhận tên, button 'Chào'  in 'Xin chào {tên}!'.", hint: "st.text_input, st.button, st.write" },
                    { level: "medium", title: "Sentiment App", desc: "Tích hợp Hugging Face sentiment vào Streamlit. Nhập text  hiển thị label + confidence.", hint: "Dùng @st.cache_resource để cache pipeline" },
                    { level: "hard",   title: "Image Classifier", desc: "Load model Keras, upload ảnh, hiển thị top 5 predictions với bar chart.", hint: "st.bar_chart cho visualization" }
                ],
                summary: [
                    "Streamlit: web app cho AI chỉ với Python",
                    "@st.cache_resource: cache model nặng, load 1 lần",
                    "Deploy miễn phí: share.streamlit.io với GitHub"
                ]
            },

            // ===== BÀI 9: Kiểm Tra Lần 2 =====
            {
                id: 9,
                title: "Kiểm Tra Lần 2 CSI",
                duration: "90 phút",
                description: "Đánh giá: NLP pipeline, Hugging Face, Streamlit Deployment",
                objectives: [
                    "NLP pipeline: Tokenization  Embedding  LSTM",
                    "Hugging Face Pipeline API và Tokenizer/Model",
                    "Xây dựng Streamlit app tích hợp model AI"
                ],
                sections: [
                    {
                        title: "9.1 Đề Kiểm Tra - NLP + Deployment",
                        icon: "",
                        content: `<strong>Đề bài (75 phút - 10 điểm):</strong>

<strong>Phần 1 (4đ) - NLP Pipeline:</strong>
- a) Tokenize + pad IMDB data
- b) Xây Embedding + LSTM, train, đánh giá
- c) In 5 review test với prediction

<strong>Phần 2 (3đ) - Hugging Face:</strong>
- a) Phân tích sentiment 10 câu bằng pipeline
- b) Zero-shot classify với labels tự định nghĩa
- c) Tính semantic similarity giữa 3 cặp câu

<strong>Phần 3 (3đ) - Streamlit App:</strong>
- Tạo app "Sentiment Analyzer": text_input + button + hiển thị kết quả
- Cache pipeline với @st.cache_resource
- Có sidebar với các tùy chọn (top_k, threshold)`,
                        code: `# Phần 1: NLP Pipeline
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Load và pad
(X_tr, y_tr), (X_te, y_te) = keras.datasets.imdb.load_data(num_words=10000)
X_tr = pad_sequences(X_tr, maxlen=200, padding='post')
X_te = pad_sequences(X_te, maxlen=200, padding='post')

# Model
model = keras.Sequential([
    keras.layers.Embedding(10000, 128, input_length=200),
    keras.layers.LSTM(64),
    keras.layers.Dense(1, activation='sigmoid')
])
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(X_tr, y_tr, validation_split=0.2, epochs=5, batch_size=64, verbose=0)

# Đánh giá
test_loss, test_acc = model.evaluate(X_te, y_te, verbose=0)
print(f"Test Accuracy: {test_acc:.2%}")

# Phần 2: Hugging Face
from transformers import pipeline
clf = pipeline("sentiment-analysis")
print(clf("I love MindX!"))

# Phần 3: Streamlit
# streamlit_app.py
import streamlit as st
from transformers import pipeline

@st.cache_resource
def load_pipeline():
    return pipeline("sentiment-analysis")

st.title("MindX Sentiment Analyzer")
text = st.text_input("Nhập văn bản:")
if text:
    clf = load_pipeline()
    result = clf(text)[0]
    color = "green" if result['label'] == 'POSITIVE' else "red"
    st.markdown(f"**Kết quả:** :{color}[{result['label']}] ({result['score']:.2%})")`
                    }
                ],
                exercises: [
                    {
                        level: "easy",
                        title: "IMDB Sentiment Classification",
                        desc: "Load IMDB, tokenize + pad (maxlen=200). Xây Embedding(10000, 128) + LSTM(64) + Dense(1, sigmoid). Train 5 epochs, in test accuracy ≥ 80%. Dự đoán 5 review test, in review + nhãn dự đoán.",
                        hint: "pad_sequences(X_tr, maxlen=200, padding='post'). LSTM mặc định return_sequences=False. Threshold 0.5: positive nếu >=0.5"
                    },
                    {
                        level: "medium",
                        title: "Hugging Face Pipeline đa tác vụ",
                        desc: "a) Phân tích sentiment 10 câu tiếng Anh/tiếng Việt. b) Zero-shot classify với labels ['giáo dục','thể thao','công nghệ','ẩm thực'] cho 5 headline. c) Dùng fill-mask điền từ vào câu 'MindX là trường đào tạo [MASK]'. d) Tính similarity giữa 3 cặp câu dùng feature-extraction.",
                        hint: "pipeline('sentiment-analysis'), pipeline('zero-shot-classification'), pipeline('fill-mask'), pipeline('feature-extraction'). cosine_similarity giữa 2 vector"
                    },
                    {
                        level: "hard",
                        title: "Multi-task Streamlit App",
                        desc: "Xây app Streamlit hỗ trợ 3 tác vụ NLP: Sentiment Analysis, Text Summarization, Named Entity Recognition. Dùng sidebar chọn tác vụ, text_area nhập input. Cache từng pipeline với @st.cache_resource. Hiển thị kết quả đẹp (màu theo label, JSON cho NER). Bonus: dùng tabs để chuyển giữa các tác vụ.",
                        hint: "@st.cache_resource def load_sentiment(): return pipeline('sentiment-analysis'). tabs = st.tabs(['Sentiment','Summary','NER']). st.text_area('Nhập text'). st.json cho output dict"
                    }
                ],
                summary: [
                    "Thi trong 75 phút: NLP + HuggingFace + Streamlit",
                    "Yêu cầu: pipeline hoàn chỉnh, code chạy được"
                ]
            },

            // ===== BÀI 10: Chatbot & LLM =====
            {
                id: 10,
                title: "Chatbot & LLM",
                duration: "90 phút",
                description: "Xây dựng chatbot với OpenAI API và thiết kế prompt hiệu quả",
                objectives: [
                    "Giải thích LLM là gì và cách Transformer tạo văn bản",
                    "Gọi OpenAI API với messages structure đúng",
                    "Viết prompts hiệu quả: Zero-shot, Few-shot, Chain-of-Thought",
                    "Xây chatbot có memory qua conversation history"
                ],
                sections: [
                    {
                        title: "10.1 LLM và OpenAI API",
                        icon: "",
                        content: `<strong>LLM (Large Language Model)</strong> = Transformer cực lớn train trên hàng tỷ trang văn bản để dự đoán token tiếp theo.

<strong>Các kỹ thuật prompting:</strong>

| Kỹ thuật | Mô tả | Ví dụ |
|----------|-------|-------|
| Zero-shot | Không cho ví dụ | "Dịch sang tiếng Anh: Xin chào" |
| Few-shot | Cho vài ví dụ | "Dịch: Xin chào  Hello. Tạm biệt  " |
| Chain-of-Thought | Suy nghĩ từng bước | "Tính 15% của 200. Bước 1: ... Bước 2: ..." |
| System prompt | Đặt vai trò | "Bạn là giáo viên Toán" |

<strong>Conversation history:</strong> Gửi lại toàn bộ messages list - LLM không có memory riêng.`,
                        code: `# Cài: pip install openai
import os
os.environ["OPENAI_API_KEY"] = "sk-..."  # Set API key

from openai import OpenAI

client = OpenAI()

def chat(messages, model="gpt-4o-mini", temperature=0.7):
    """Gọi OpenAI API với messages list."""
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature,
        max_tokens=500
    )
    return response.choices[0].message.content

# 1. Zero-shot prompting
print("=== Zero-Shot ===")
messages = [
    {"role": "system", "content": "Bạn là trợ lý AI thân thiện."},
    {"role": "user", "content": "Giải thích Python là gì trong 2 câu."}
]
print(chat(messages))

# 2. Few-shot prompting
print("\\n=== Few-Shot ===")
messages = [
    {"role": "system", "content": "Bạn là chuyên gia dịch thuật Anh-Việt."},
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Xin chào"},
    {"role": "user", "content": "Good morning"},
    {"role": "assistant", "content": "Chào buổi sáng"},
    {"role": "user", "content": "Thank you very much"}
]
print(chat(messages))

# 3. Chain-of-Thought
print("\\n=== Chain-of-Thought ===")
messages = [
    {"role": "user", "content": """Một cửa hàng bán 50 cái bánh. Sáng bán 1/5, chiều bán 1/3 số còn lại.
Hỏi còn bao nhiêu cái?
Hãy suy nghĩ từng bước."""}
]
print(chat(messages))

# 4. Chatbot có memory
print("\\n=== Chatbot có Memory ===")
conversation = [
    {"role": "system", "content": "Bạn là MindX Assistant, trợ lý ảo về lập trình."}
]

def chatbot(user_input):
    conversation.append({"role": "user", "content": user_input})
    response = chat(conversation)
    conversation.append({"role": "assistant", "content": response})
    return response

# Simulate conversation
queries = [
    "MindX dạy những khóa học gì?",
    "Khóa CSB kéo dài bao lâu?",
    "Tôi có nên học CSI trước CSB không?"
]

for q in queries:
    print(f"\\nUser: {q}")
    print(f"Bot : {chatbot(q)}")
    print("-" * 50)`
                    }
                ],
                exercises: [
                    { level: "easy",   title: "Zero-shot", desc: "Gọi OpenAI API 5 câu hỏi khác nhau, in response.", hint: "client.chat.completions.create(...)" },
                    { level: "medium", title: "Few-shot translator", desc: "Tạo chatbot dịch Anh-Việt với 3 ví dụ trong system prompt.", hint: "Dùng system message chứa ví dụ mẫu" },
                    { level: "hard",   title: "Chatbot có memory", desc: "Tạo chatbot nhớ được 5 lượt hội thoại. Dùng conversation list.", hint: "Append user/assistant messages, gửi cả list" },
                    { level: "easy",   title: "Chain-of-Thought prompting", desc: "So sánh 3 cách: (a) zero-shot, (b) few-shot với 1 ví dụ, (c) chain-of-thought. Giải 5 bài toán word problem và so sánh accuracy.", hint: "Chain-of-thought: thêm 'Hãy suy nghĩ từng bước' vào prompt" },
                    { level: "hard",   title: "LangChain RAG Chatbot", desc: "Xây chatbot Q&A trên tài liệu PDF. Dùng LangChain: load PDF → split → embed → store FAISS → retrieve → LLM answer. Deploy Streamlit.", hint: "from langchain.document_loaders import PyPDFLoader, from langchain.vectorstores import FAISS" }
                ],
                summary: [
                    "LLM dự đoán token tiếp theo, không có memory thật",
                    "Prompting: Zero-shot, Few-shot, Chain-of-Thought tăng chất lượng",
                    "Conversation history: append messages, gửi cả list mỗi lần"
                ]
            },

            // ===== BÀI 11: Object Detection =====
            {
                id: 11,
                title: "Object Detection với YOLO",
                duration: "90 phút",
                description: "Phát hiện vật thể trong ảnh với YOLOv8 và bounding boxes",
                objectives: [
                    "Phân biệt Classification, Detection, Segmentation",
                    "Giải thích bounding box formats và IoU",
                    "Dùng YOLOv8 detect objects trong ảnh",
                    "Vẽ bounding boxes lên ảnh với matplotlib"
                ],
                sections: [
                    {
                        title: "11.1 YOLO Object Detection",
                        icon: "",
                        content: `<strong>So sánh 3 bài toán Computer Vision:</strong>

| Bài toán | Output | Ví dụ |
|----------|--------|-------|
| Classification | Nhãn | "Con mèo" |
| Detection | Nhãn + Bounding Box | "Con mèo ở (x1,y1,x2,y2)" |
| Segmentation | Pixel mask | Tô màu từng pixel con mèo |

<strong>YOLO (You Only Look Once):</strong>
- Real-time, xử lý ảnh 1 lần
- Chia ảnh thành grid, mỗi cell dự đoán box + class
- YOLOv8 hiện đại, dễ dùng qua ultralytics

<strong>IoU (Intersection over Union):</strong> Đo độ trùng khớp giữa 2 box. IoU > 0.5 = dự đoán đúng.`,
                        code: `# Cài: pip install ultralytics opencv-python
from ultralytics import YOLO
import cv2
import matplotlib.pyplot as plt
import numpy as np

# 1. Load model YOLOv8 (tự động tải weights)
model = YOLO("yolov8n.pt")  # nano - nhỏ nhất, nhanh nhất
print(f"Model classes: {len(model.names)}")
print(f"Ví dụ: {list(model.names.items())[:5]}")

# 2. Detect trên ảnh
img_path = "https://ultralytics.com/images/bus.jpg"
results = model(img_path)

# 3. Lấy thông tin detections
for r in results:
    boxes = r.boxes
    print(f"\\nSố vật thể phát hiện: {len(boxes)}")
    for box in boxes:
        cls = int(box.cls[0])
        conf = float(box.conf[0])
        xyxy = box.xyxy[0].cpu().numpy()
        print(f"  - {model.names[cls]}: {conf:.2f} tại {xyxy.astype(int).tolist()}")

# 4. Vẽ boxes lên ảnh
for r in results:
    img_with_boxes = r.plot()  # Vẽ boxes
    img_rgb = cv2.cvtColor(img_with_boxes, cv2.COLOR_BGR2RGB)
    plt.figure(figsize=(10, 6))
    plt.imshow(img_rgb)
    plt.axis('off')
    plt.title("YOLOv8 Object Detection")
    plt.savefig("detection_result.png", dpi=100, bbox_inches='tight')
    print("\\n Đã lưu detection_result.png")

# 5. IoU calculation
def compute_iou(box1, box2):
    """box format: [x1, y1, x2, y2]"""
    x1 = max(box1[0], box2[0])
    y1 = max(box1[1], box2[1])
    x2 = min(box1[2], box2[2])
    y2 = min(box1[3], box2[3])
    inter = max(0, x2-x1) * max(0, y2-y1)
    area1 = (box1[2]-box1[0]) * (box1[3]-box1[1])
    area2 = (box2[2]-box2[0]) * (box2[3]-box2[1])
    return inter / (area1 + area2 - inter)

# Test IoU
pred_box = [100, 100, 200, 200]    # box dự đoán
true_box = [110, 110, 210, 210]    # box thật
iou = compute_iou(pred_box, true_box)
print(f"\\nIoU = {iou:.3f} (càng gần 1.0 càng chính xác)")`
                    }
                ],
                exercises: [
                    { level: "easy",   title: "YOLO cơ bản", desc: "Detect 5 ảnh khác nhau. In số lượng từng class phát hiện.", hint: "model(img), r.boxes.cls" },
                    { level: "medium", title: "Custom confidence", desc: "Dùng conf=0.5 và iou=0.4. So sánh số detections.", hint: "model(img, conf=0.5, iou=0.4)" },
                    { level: "hard",   title: "Count cars in video", desc: "Đọc 1 video, detect cars mỗi frame, đếm số xe unique xuất hiện.", hint: "cap = cv2.VideoCapture, model(frame)" }
                ],
                summary: [
                    "Object Detection: nhãn + vị trí (bounding box)",
                    "YOLOv8: real-time, dễ dùng qua ultralytics",
                    "IoU > 0.5 = dự đoán đúng; mAP50 = metric chuẩn"
                ]
            },

            // ===== BÀI 12: Speech & Audio AI =====
            {
                id: 12,
                title: "Speech & Audio AI",
                duration: "90 phút",
                description: "Xử lý âm thanh với Whisper, Librosa và MFCC features",
                objectives: [
                    "Mô tả audio signal: waveform, sample rate, bit depth",
                    "Trình bày Spectrogram và MFCC - ý nghĩa mỗi loại",
                    "Dùng Whisper transcribe audio sang text",
                    "Xây dựng audio classification pipeline đơn giản"
                ],
                sections: [
                    {
                        title: "12.1 Audio Processing với Whisper và Librosa",
                        icon: "",
                        content: `<strong>Âm thanh</strong> = sóng áp suất không khí  microphone chuyển thành điện  số hóa thành mảng số.

<strong>Các khái niệm quan trọng:</strong>

| Khái niệm | Ý nghĩa |
|-----------|---------|
| Waveform | Biểu đồ sóng âm thanh theo thời gian |
| Sample rate | Số mẫu/giây (Hz). 44.1kHz = CD audio |
| Spectrogram | Biểu đồ tần số theo thời gian (màu) |
| MFCC | 13-20 features đặc trưng cho giọng nói |

<strong>Pipeline Audio AI:</strong>
<pre>Audio  Load  Spectrogram/MFCC  Model  Output</pre>`,
                        code: `# Cài: pip install openai-whisper librosa soundfile
import whisper
import librosa
import numpy as np

# 1. Load Whisper model
model = whisper.load_model("base")  # tiny/base/small/medium/large
print(" Đã load Whisper model")

# 2. Transcribe audio sang text
audio_path = "audio_sample.mp3"  # File âm thanh bất kỳ
result = model.transcribe(audio_path, language="vi")
print(f"\\nText: {result['text']}")
print(f"Language: {result['language']}")
print(f"Segments: {len(result['segments'])}")

# 3. Phân tích audio với Librosa
y, sr = librosa.load(audio_path, sr=None)
print(f"\\nAudio: {len(y)/sr:.2f}s, Sample rate: {sr}Hz")

# 4. Trích xuất features
mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
print(f"MFCC shape: {mfccs.shape}")  # (13, time_steps)

# 5. Spectrogram
import matplotlib.pyplot as plt
fig, axes = plt.subplots(2, 1, figsize=(12, 6))

# Waveform
time = np.linspace(0, len(y)/sr, len(y))
axes[0].plot(time, y)
axes[0].set_title("Waveform")
axes[0].set_xlabel("Time (s)")

# Spectrogram
D = librosa.stft(y)
S_db = librosa.amplitude_to_db(np.abs(D), ref=np.max)
img = librosa.display.specshow(S_db, sr=sr, x_axis='time', y_axis='log', ax=axes[1])
axes[1].set_title("Spectrogram")
fig.colorbar(img, ax=axes[1])
plt.tight_layout()
plt.savefig("audio_analysis.png", dpi=100)

# 6. Audio Classification đơn giản
def classify_audio(audio_path, model):
    """Phân loại audio thành music/speech/silence."""
    y, sr = librosa.load(audio_path, sr=22050)
    # Trích features
    rms = librosa.feature.rms(y=y).mean()      # Năng lượng
    zcr = librosa.feature.zero_crossing_rate(y).mean()  # Tần số qua 0
    spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=sr).mean()

    # Rule-based classification
    if rms < 0.01:
        return "Silence"
    elif zcr > 0.1 and spectral_centroid > 2000:
        return "Music"
    else:
        return "Speech"

label = classify_audio(audio_path, model)
print(f"\\nClassification: {label}")`
                    }
                ],
                exercises: [
                    { level: "easy",   title: "Transcribe 5 audio", desc: "Dùng Whisper transcribe 5 file audio ngắn. In text và language.", hint: "model.transcribe(file)" },
                    { level: "medium", title: "MFCC visualization", desc: "Vẽ MFCC heatmap của 1 file audio. So sánh giọng nam và nữ.", hint: "librosa.feature.mfcc(), librosa.display.specshow" },
                    { level: "hard",   title: "Music Genre Classifier", desc: "Trích MFCC từ 100 file nhạc. Train Random Forest phân loại 3 thể loại.", hint: "mfccs.mean(axis=1) để có fixed-size vector" },
                    { level: "medium", title: "Speaker diarization", desc: "Dùng Whisper có timestamps để tách từng câu. Ghép câu liên tiếp thành đoạn của cùng 1 người nói.", hint: "result['segments'] chứa start/end của từng đoạn" }
                ],
                summary: [
                    "Audio  số hóa thành array, sample rate 22050Hz thường dùng",
                    "Whisper: state-of-the-art speech-to-text, hỗ trợ 99 ngôn ngữ",
                    "MFCC: features phổ biến cho audio classification"
                ]
            },

            // ===== BÀI 13: Luyện Tập Giải Đề =====
            {
                id: 13,
                title: "Luyện Tập Giải Đề Tổng Hợp",
                duration: "90 phút",
                description: "Ôn tập toàn bộ CSI và giải 3 đề tổng hợp theo dạng thi",
                objectives: [
                    "Ôn tập hệ thống toàn bộ kiến thức CSI (Buổi 1-12)",
                    "Giải 3 đề tổng hợp theo dạng thi cuối khóa",
                    "Identify điểm yếu, review kịp thời",
                    "Lên kế hoạch Project cuối khóa"
                ],
                sections: [
                    {
                        title: "13.1 Mind Map Tổng Hợp CSI",
                        icon: "",
                        content: `<strong>Cấu trúc CSI:</strong>

<pre>                    CSI Course
                        |
        +---------------+---------------+
        |               |               |
  Ch.1 Deep Learning  Ch.2 NLP & LLM  Ch.3 Applied
        |               |               |
   +----+----+     +----+----+     +----+----+
   B1 NN    B5 Exam1 B6 NLP   B9 Exam2 B10 Chat  B14 Project
   B2 Keras         B7 Hugging        B11 Detect
   B3 CNN           B8 Deploy         B12 Speech
   B4 Transfer
</pre>

<strong>3 đề luyện tập:</strong>

<strong>Đề 1 - Deep Learning:</strong> Xây CNN phân loại CIFAR-10, đạt ≥ 75%
<strong>Đề 2 - NLP:</strong> Sentiment analysis tiếng Việt, ≥ 80% accuracy
<strong>Đề 3 - LLM App:</strong> Chatbot với OpenAI API + memory + Streamlit UI`,
                        code: `# Đề 1: CNN CIFAR-10
from tensorflow import keras
import matplotlib.pyplot as plt

(X_tr, y_tr), (X_te, y_te) = keras.datasets.cifar10.load_data()
X_tr, X_te = X_tr / 255.0, X_te / 255.0

model = keras.Sequential([
    keras.layers.Conv2D(32, 3, activation='relu', padding='same', input_shape=(32, 32, 3)),
    keras.layers.MaxPooling2D(2),
    keras.layers.Conv2D(64, 3, activation='relu', padding='same'),
    keras.layers.MaxPooling2D(2),
    keras.layers.Conv2D(128, 3, activation='relu', padding='same'),
    keras.layers.MaxPooling2D(2),
    keras.layers.Flatten(),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dropout(0.5),
    keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(X_tr, y_tr, validation_data=(X_te, y_te), epochs=20,
          callbacks=[keras.callbacks.EarlyStopping(patience=5, restore_best_weights=True)])
print(f"Test Acc: {model.evaluate(X_te, y_te, verbose=0)[1]:.2%}")`
                    }
                ],
                exercises: [
                    { level: "easy",   title: "Giải đề CNN", desc: "Đề: Xây CNN CIFAR-10 đạt ≥75%. Viết code đầy đủ: load data, xây model, train, evaluate.", hint: "Thực hành như bài kiểm tra thực tế" },
                    { level: "medium", title: "Giải đề NLP", desc: "Đề: Phân loại IMDB sentiment với LSTM đạt ≥80%. Train và in kết quả test.", hint: "Embedding + LSTM + Dense" },
                    { level: "hard",   title: "Giải đề tổng hợp", desc: "Đề: CNN phân loại ảnh + Streamlit UI deploy. Xây model, lưu, tạo app predict ảnh upload.", hint: "Kết hợp keras model.save + Streamlit" }
                ],
                summary: [
                    "CSI: 3 nhánh chính - Deep Learning, NLP/LLM, Applied AI",
                    "Cần nắm vững pipeline của từng bài",
                    "Project cuối kỳ cần kết hợp ít nhất 2 công nghệ"
                ]
            },

            // ===== BÀI 14: Project Cuối Khóa =====
            {
                id: 14,
                title: "Project Cuối Khóa & Thi Cuối CSI",
                duration: "120 phút",
                description: "Demo project cá nhân và thi cuối kỳ",
                objectives: [
                    "Trình bày và demo project cuối khóa",
                    "Hoàn thành bài thi cuối kỳ 90 phút",
                    "Nhận feedback cá nhân và định hướng tiếp theo"
                ],
                sections: [
                    {
                        title: "14.1 Tiêu Chí Chấm Project (40 điểm)",
                        icon: "",
                        content: `<strong>Lịch trình buổi 14:</strong>

| Thời gian | Hoạt động |
|-----------|----------|
| 0-20 phút | Project Demo (4 HV × 5 phút) |
| 20-25 phút | Break |
| 25-115 phút | Thi cuối kỳ (90 phút) |
| 115-120 phút | Wrap up |

<strong>Tiêu chí chấm project:</strong>

| Tiêu chí | Điểm |
|----------|------|
| Kỹ thuật (≥ 2 CSI tech, code chạy) | 15 |
| Tính sáng tạo & ứng dụng | 10 |
| Giao diện/UX | 5 |
| Trình bày & demo | 5 |
| Code sạch, tổ chức tốt | 5 |

<strong>Đề tài gợi ý:</strong>
- Chatbot tư vấn học tập với LLM
- Phân loại ảnh y tế với CNN
- Hệ thống phát hiện lỗi sản phẩm với YOLO
- Speech-to-text cho meeting notes
- OCR hóa đơn với CNN`,
                        code: `# Template Project Mẫu: AI Image Captioning
# Kết hợp CNN (trích features) + LSTM (sinh text) + Streamlit (UI)

# 1. CNN Encoder
import tensorflow as tf
from tensorflow import keras

def build_encoder():
    """CNN trích features từ ảnh."""
    base = keras.applications.InceptionV3(
        include_top=False, weights='imagenet', pooling='avg'
    )
    base.trainable = False
    inputs = keras.Input(shape=(299, 299, 3))
    features = base(inputs, training=False)
    outputs = keras.layers.Dense(256, activation='relu')(features)
    return keras.Model(inputs, outputs)

# 2. LSTM Decoder
def build_decoder(vocab_size, max_length):
    """LSTM sinh caption từ features."""
    image_input = keras.Input(shape=(256,))
    text_input  = keras.Input(shape=(max_length,))

    image_emb = keras.layers.RepeatVector(max_length)(image_input)
    text_emb  = keras.layers.Embedding(vocab_size, 256, mask_zero=True)(text_input)

    merged = keras.layers.Concatenate()([image_emb, text_emb])
    lstm_out = keras.layers.LSTM(256, return_sequences=True)(merged)
    output = keras.layers.TimeDistributed(
        keras.layers.Dense(vocab_size, activation='softmax')
    )(lstm_out)

    return keras.Model([image_input, text_input], output)

# 3. Streamlit UI
# streamlit_app.py
# import streamlit as st
# from PIL import Image
# st.title(" AI Image Captioning")
# uploaded = st.file_uploader("Upload ảnh...", type=["jpg", "png"])
# if uploaded:
#     img = Image.open(uploaded)
#     st.image(img)
#     caption = generate_caption(img)
#     st.success(f"**Caption:** {caption}")

# 4. Deploy
# - Push code lên GitHub
# - Kết nối share.streamlit.io
# - Chia sẻ URL với mọi người

print("Project Template đã sẵn sàng!")
print("Bước tiếp theo:")
print("  1. Chọn đề tài phù hợp")
print("  2. Xây dựng MVP (Minimum Viable Product)")
print("  3. Train và đánh giá")
print("  4. Xây Streamlit UI")
print("  5. Deploy lên Cloud")
print("  6. Chuẩn bị slide demo 5 phút")`
                    }
                ],
                exercises: [
                    {
                        level: "easy",
                        title: "Image Classifier với HuggingFace",
                        desc: "Dùng transformers pipeline('image-classification') với model ViT. Test với 3 ảnh (mèo, chó, ô tô) tải từ URL. In top-5 predictions. Tạo app Streamlit cho phép upload ảnh và hiển thị kết quả dạng bar chart.",
                        hint: "pipeline('image-classification', model='google/vit-base-patch16-224'). Dùng PIL.Image.open. Streamlit: st.file_uploader, st.bar_chart với scores"
                    },
                    {
                        level: "medium",
                        title: "Multi-language Translator App",
                        desc: "Dùng pipeline('translation') với model Helsinki-NLP/opus-mt. Hỗ trợ Anh↔Việt, Anh↔Pháp, Anh↔Nhật. Streamlit app có: selectbox chọn ngôn ngữ nguồn/đích, text_area nhập, button dịch, hiển thị kết quả. Cache model. Thêm chức năng đọc file .txt và dịch từng dòng.",
                        hint: "model_name = f'Helsinki-NLP/opus-mt-{src}-{tgt}'. Đọc file: with open(file) as f: lines = f.readlines(). dịch từng dòng"
                    },
                    {
                        level: "hard",
                        title: "Chatbot với LLM + RAG",
                        desc: "Xây chatbot hỏi đáp tài liệu nội bộ (PDF/TXT). Pipeline: load documents → split chunks → embedding bằng sentence-transformers → lưu FAISS index → khi user hỏi: retrieve top-k chunks → đưa vào prompt LLM (HuggingFace hoặc OpenAI) → stream response. Streamlit app với st.chat_message, lưu lịch sử hội thoại trong st.session_state.",
                        hint: "FAISS: index = faiss.IndexFlatL2(dim). similarity_search(query, k=3). Prompt template: 'Dựa vào: {context}\n\nTrả lời: {question}'. Lưu lịch sử = list[dict]"
                    }
                ],
                summary: [
                    "Project = tổng hợp kiến thức toàn khóa",
                    "Kết hợp ≥ 2 công nghệ CSI + Streamlit UI",
                    "Demo 5 phút + thi 90 phút cuối kỳ"
                ]
            }
        ]
    }
};

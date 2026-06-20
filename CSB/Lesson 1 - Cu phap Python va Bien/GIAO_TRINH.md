# 🎯 Buổi 1: Cú Pháp Python và Biến# 🎯 Buổi 1: Cú Pháp Python và Biến






























































































































































































































































































































































































































































































































































































**Buổi tiếp theo (Buổi 2):** Sẽ học **List** — kho chứa nhiều biến cùng lúc, cùng với **Hàm** để đóng gói và tái sử dụng code.3. 🔀 **Logic điều khiển** — `if` kiểm tra ngưỡng CAO trước; `while` bắt buộc có dòng thay đổi điều kiện2. 🔢 **4 kiểu dữ liệu cốt lõi** — `int`, `float`, `str`, `bool` — `input()` luôn trả về `str`, phải chuyển!1. 🏷️ **Biến = hộp có nhãn** — tên biến phải rõ nghĩa, dùng snake_case, không dấu tiếng Việt**3 điều quan trọng nhớ mãi:**## 🎯 Tổng Kết Buổi 1---> **Gợi ý nâng cao:** Dùng `max()` và `min()` trên list điểm, dùng `.index()` để tìm vị trí.>> Thêm: In ra môn có điểm cao nhất và thấp nhất.> Tính điểm TB, in bảng điểm đẹp, xếp loại.  > Nhập vào tên và điểm của 5 môn học.  ### 🏠 Bài 2: Bảng điểm cá nhân> ```> → Lỗi: Không thể chia cho 0!> Nhập số 2: 0> Nhập phép tính: /> Nhập số 1: 10> ```> Ví dụ:>> Xử lý trường hợp chia cho 0!> Dùng `if/elif/else` để thực hiện phép tính và in kết quả.  > Nhập vào 2 số và một phép tính (+, -, *, /).  ### 🏠 Bài 1: Máy tính đơn giản## 🏠 Bài Tập Về Nhà---> **Gợi ý:** Dùng vòng `for i in range(1, chieu_cao+1)` và `print("*" * i)`> ```> *****> ****> ***> **> *> ```> In ra hình tam giác đặc:> Nhập vào chiều cao (ví dụ: 5).  ### 🔴 Bài 3 (Nâng cao nhẹ): In hình tam giác sao**Gợi ý:** Dùng `%` để kiểm tra chia hết, `and`/`or`/`not` để kết hợp.> In "Năm X là năm nhuận" hoặc "Năm X không phải năm nhuận".  > Năm nhuận khi: chia hết cho 4 VÀ (không chia hết cho 100 HOẶC chia hết cho 400).  > Nhập vào năm (ví dụ 2024).  ### 🟡 Bài 2 (Trung bình): Kiểm tra năm nhuận**Gợi ý:** `tien = so_kwh * gia_1_kwh`> In ra: "Tiền điện tháng này: XXX đồng"  > Tính tiền điện biết: 1 kWh = 3.500 đồng.  > Nhập vào số kWh điện tiêu thụ (ví dụ: 150).  ### 🟢 Bài 1 (Dễ): Tính tiền điện## 📝 Bài Tập Trên Lớp---```========================================  ✅ Tất cả môn đều đạt!  Xếp loại: Khá  Điểm TB : 7.86----------------------------------------  Địa : 8 điểm  Sử  : 7 điểm  Anh : 10 điểm  Hóa : 6 điểm  Lý  : 9 điểm  Văn : 7 điểm  Toán: 8 điểm========================================   HỌC BẠ: Trần Minh========================================```**Output:**```print("=" * 40)    print(f"  ✅ Tất cả môn đều đạt!")else:    print(f"  ⚠️  Có {so_mon_yeu} môn dưới trung bình!")if so_mon_yeu > 0:        so_mon_yeu += 1    if diem < 5:for diem in diem_cac_mon:so_mon_yeu = 0# Đếm số môn dưới trung bìnhprint(f"  Xếp loại: {xep_loai}")print(f"  Điểm TB : {diem_tb:.2f}")print("-" * 40)    print(f"  {mon:<4}: {diem_cac_mon[i]} điểm")for i, mon in enumerate(ten_mon_hoc):print("=" * 40)print(f"   HỌC BẠ: {ten_hoc_sinh}")print("=" * 40)# In báo cáo    xep_loai = "Yếu"else:    xep_loai = "Trung Bình"elif diem_tb >= 5.0:    xep_loai = "Khá"elif diem_tb >= 6.5:    xep_loai = "Giỏi"elif diem_tb >= 8.0:    xep_loai = "Xuất Sắc"if diem_tb >= 9.0:# Xếp loạidiem_tb = tong_diem / len(diem_cac_mon)    tong_diem += diem   # Viết tắt của: tong_diem = tong_diem + diemfor diem in diem_cac_mon:tong_diem    = 0# Tính điểm trung bìnhten_mon_hoc  = ["Toán", "Văn", "Lý", "Hóa", "Anh", "Sử", "Địa"]diem_cac_mon = [8, 7, 9, 6, 10, 7, 8]ten_hoc_sinh = "Trần Minh"# Danh sách điểm các môn (buổi sau sẽ học cách nhập từ bàn phím)# ============================================================#  Dùng: biến, kiểu dữ liệu, toán tử, if/else, for, while#  DEMO TỔNG HỢP – Chương trình quản lý điểm mini# ============================================================```python## 💻 Demo Tổng Hợp — Chương Trình Quản Lý Điểm Mini---```    print("Kết thúc")  # Dòng này TRONG vòng for – in 5 lần ← hay nhầm!    print(i)for i in range(5):print("Kết thúc")  # Dòng này NGOÀI vòng for – chỉ in 1 lần ✅    print(i)for i in range(5):# LỖI 3: Thụt lề sai trong vòng lặp    print(dem)    # ❌ Quên dem -= 1 → in mãi số 10!while dem > 0:dem = 10# LỖI 2: Vòng while vô tậnfor i in range(1, 11):  # → i = 1,2,3,...,10 ✅for i in range(1, 10):  # → i = 1,2,3,...,9 (KHÔNG có 10!)# LỖI 1: range() không bao gồm số cuối```python### ⚠️ Lỗi thường gặp```# print(f"Bạn đã nhập: {so}")#         print("Phải nhập số dương!")#     if so <= 0:#     so = int(input("Nhập số dương: "))# while so <= 0:# so = 0# WHILE với nhập liệu – lặp cho đến khi nhập đúngprint("Bắt đầu!")    dem -= 1           # BẮT BUỘC: giảm dem, nếu không → vòng vô tận!    print(f"{dem}...")while dem > 0:        # Điều kiện: tiếp tục khi dem > 0dem = 10print("\n=== ĐẾM NGƯỢC ===")# === VÒNG WHILE: Đếm ngược ===print(f"Điểm trung bình: {trung_binh:.1f}")   # :.1f → 1 chữ số sau dấu phẩytrung_binh = tong / len(diem_cac_mon)tong = sum(diem_cac_mon)    print(f"  Môn {so_thu_tu}: {diem} điểm")for so_thu_tu, diem in enumerate(diem_cac_mon, start=1):print("\nĐiểm các môn:")diem_cac_mon = [8, 7, 9, 6, 10]# === FOR duyệt qua danh sách ===    print(f"7 × {i:2d} = {ket_qua:3d}")   # :2d → chiếm 2 ký tự, căn phải    ket_qua = 7 * ifor i in range(1, 11):    # range(1, 11) = từ 1 đến 10, KHÔNG bao gồm 11print("=== BẢNG CỬU CHƯƠNG 7 ===")# === VÒNG FOR: Duyệt qua dãy số ===```python### 💻 Code**Output:** bảng cửu chương 7 đến 10**Input:** số cần in = 7  ### 📌 Ví dụ — Bảng cửu chương> Luôn đảm bảo biến điều kiện được **thay đổi** trong vòng lặp.> ⚠️ **Nguy hiểm vòng while:** Nếu điều kiện luôn đúng → **vòng lặp vô tận** → máy treo!  > Khi bạn bấm tắt → điều kiện sai → dừng.> ⏰ Báo thức reo liên tục **trong khi** bạn chưa bấm tắt.  **Vòng while** — "Làm mãi cho đến khi hết điều kiện":> Từng món = từng phần tử trong dãy.> 🛒 Người thu ngân quét từng món hàng một trong giỏ siêu thị.  **Vòng for** — "Làm lần lượt từng thứ trong danh sách":### ✅ Giải thích## 📖 Kiến thức 5: Vòng Lặp for và while---```# ✅ Phải kiểm tra ngưỡng CAO TRƯỚC, thấp sau!    xep_loai = "Giỏi"elif diem >= 8.0:                # Điều kiện này không bao giờ được kiểm tra!    xep_loai = "Trung bình"      # diem=9.0 sẽ vào đây luôn!if diem >= 5.0:                  # Nếu để ngưỡng thấp TRƯỚC# LỖI 3: Kiểm tra ngưỡng sai thứ tự    print("Đạt")  # ✅ (4 dấu cách)print("Đạt")      # ❌ IndentationErrorif diem >= 5:# LỖI 2: Không thụt lềif diem >= 5:     # ✅if diem >= 5      # ❌ SyntaxError# LỖI 1: Quên dấu : sau if/elif/else```python### ⚠️ Lỗi thường gặp```    print("Điểm không hợp lệ!")if diem < 0 or diem > 10:    print("Học sinh giỏi, được khen thưởng!")if diem >= 8.0 and diem <= 10.0:# Kiểm tra thêm điều kiện phức hợp (and/or)print(f"Điểm {diem} → Xếp loại: {xep_loai}")    xep_loai = "Yếu"else:               # Tất cả ngưỡng trên đều sai → diem < 5.0    xep_loai = "Trung Bình"elif diem >= 5.0:    xep_loai = "Khá"elif diem >= 6.5:    xep_loai = "Giỏi"elif diem >= 8.0:   # Chỉ vào đây nếu diem < 9.0 VÀ diem >= 8.0    xep_loai = "Xuất Sắc"if diem >= 9.0:# Kiểm tra từng ngưỡng từ cao → thấpdiem = float(input("Nhập điểm trung bình: "))  # float vì điểm có thể là 8.5# Nhập điểm từ bàn phím```python### 💻 Code**Output:** `Xếp loại: Khá`**Input:** `diem = 7.5`  ### 📌 Ví dụ — Xếp loại học lực> ⚠️ **Quan trọng:** Dấu `:` cuối dòng `if/elif/else` và **thụt lề 4 dấu cách** bên trong là BẮT BUỘC!```    # làm điều này nếu tất cả đều saielse:    # làm điều này nếu điều kiện 2 đúngelif <điều kiện 2>:    # làm điều này nếu điều kiện 1 đúngif <điều kiện 1>:```> 🚦 **Còn lại (đèn xanh)** → đi tiếp> 🚦 **Nếu không, nếu** đèn vàng → chuẩn bị  > 🚦 **Nếu** đèn đỏ → dừng lại  Hãy nghĩ đến **bảng chỉ đường**:### ✅ Giải thích## 📖 Kiến thức 4: Cấu Trúc if / elif / else---```ket_qua2 = (2 + 3) * 4  # → 20 (ngoặc trước)ket_qua1 = 2 + 3 * 4   # → 14 (nhân trước, rồi cộng)# LỖI 3: Ưu tiên toán tửket_qua = 7 // 2   # → 3    (int, bỏ phần thập phân)ket_qua = 7 / 2    # → 3.5  (float)# LỖI 2: Nhầm / và //if diem = 8:   # ❌ SyntaxError! Phải dùng ==diem == 8      # ✅ So sánh: hỏi "diem có bằng 8 không?"diem = 8       # ✅ Gán: biến diem nhận giá trị 8# LỖI 1: Nhầm = (gán) và == (so sánh)```python### ⚠️ Lỗi thường gặp```print(f"Được vào lớp? {co_the_vao_lop}")co_the_vao_lop = diem >= 5 and diem <= 10   # Cả hai điều kiện đúng → True# === TOÁN TỬ LOGIC ===print(f"Điểm != 10?  {diem != 10}")  # → Trueprint(f"Điểm == 7.5? {diem == 7.5}") # → True  (dùng == để so sánh, = để gán)print(f"Điểm >= 8?  {diem >= 8}")   # → Falseprint(f"Điểm >= 5?  {diem >= 5}")   # → Truediem = 7.5# === TOÁN TỬ SO SÁNH ===print(f"Mỗi nhóm {nguoi_moi_nhom} người, còn {nguoi_le} người dư")nguoi_le       = so_hoc_sinh % so_nhom    # Phần dư: còn 3 người dưnguoi_moi_nhom = so_hoc_sinh // so_nhom   # Chia lấy phần nguyên: 35 ÷ 4 = 8so_nhom     = 4so_hoc_sinh = 35# Phép tính đặc biệtprint(f"Tiền thừa : {tien_thua:,} đồng")tien_thua = tien_dua - tong_tien   # Trừtien_dua  = 200_000print(f"Tổng tiền : {tong_tien:,} đồng")  # {:,} thêm dấu phẩy ngàntong_tien = gia_pho * so_to        # Nhân – 35000 × 3so_to    = 3gia_pho  = 35_000    # Dấu _ để dễ đọc số lớn – Python bỏ qua dấu _# === TOÁN TỬ SỐ HỌC ===```python### 💻 Code**Output:** tổng tiền, tiền thừa khi đưa 200.000đ**Input:** giá 1 tô phở = 35.000đ, mua 3 tô  ### 📌 Ví dụ — Tính tiền mua sắm> → Hỏi = toán tử so sánh, câu trả lời = True/False> Thầy giáo kiểm tra: "Điểm của em có >= 5 không?"  **Toán tử so sánh** – trả về `True` hoặc `False`:| `**` | Lũy thừa | `2 ** 8` | `256` || `%` | Chia lấy dư | `7 % 2` | `1` || `//` | Chia lấy nguyên | `7 // 2` | `3` || `/` | Chia (luôn cho float) | `7 / 2` | `3.5` || `*` | Nhân | `3 * 4` | `12` || `-` | Trừ | `10 - 4` | `6` || `+` | Cộng | `5 + 3` | `8` ||---------|-----|-------|---------|| Ký hiệu | Tên | Ví dụ | Kết quả |> - Chia đều 9 cái kẹo cho 4 bạn: `9 // 4 = 2` (mỗi bạn được 2) và `9 % 4 = 1` (còn thừa 1 cái)> - Mua 3 túi nước giá 5.000đ mỗi túi: `3 * 5_000 = 15_000` (phép nhân `*`)  > - Tiền thừa: `100_000 - 37_000 = 63_000` (phép trừ `-`)  > Bạn đi chợ với 100.000đ, mua đồ hết 37.000đ:  **Toán tử số học** – giống máy tính bỏ túi, nhưng có thêm 3 phép đặc biệt:### ✅ Giải thích## 📖 Kiến thức 3: Toán Tử Số Học và So Sánh---```ten = "Minh"      # ✅ten = Minh        # ❌ NameError: name 'Minh' is not defined# LỖI 3: Quên dấu nháy cho chuỗiket_qua = True    # ✅ket_qua = true    # ❌ NameError (phải là True, chữ T hoa)# LỖI 2: Nhầm True/False viết hoatuoi_sang_nam_sau = tuoi + 1  # ✅ Hoạt động bình thườngtuoi = int(input("Nhập tuổi: "))# ✅ Sửa:tuoi_sang_nam_sau = tuoi + 1  # ❌ TypeError: can only concatenate str (not "int") to strtuoi = input("Nhập tuổi: ")   # tuoi là STR (chuỗi), không phải số!# LỖI 1: Quên chuyển kiểu khi dùng input()```python### ⚠️ Lỗi thường gặp```# tuoi_nhap = int(input("Nhập tuổi: ")) # Phải chuyển sang int# ten_nhap = input("Nhập tên: ")      # Luôn là str# Nhập dữ liệu từ bàn phím – input() LUÔN trả về chuỗi!print(diem_so + 1)         # → 10 ✅ (nếu không chuyển sẽ lỗi!)diem_so    = int(diem_chuoi)   # Chuyển sang số nguyêndiem_chuoi = "9"           # Đây là CHUỖI "9", không phải số 9!# Chuyển đổi kiểu dữ liệuprint(f"Đang học : {dang_hoc}")    # → Đang học : Trueprint(f"Chiều cao: {chieu_cao} m") # → Chiều cao: 1.65 mprint(f"Tuổi   : {tuoi}")          # → Tuổi   : 15print(f"Tên    : {ten}")           # → Tên    : Minh# Cách in có nhãn – dùng f-string (thêm f trước dấu nháy)dang_hoc   = True        # bool – chỉ có True hoặc False (viết hoa chữ đầu)ten        = "Minh"      # str – phải có dấu nháy (đơn hoặc kép)chieu_cao  = 1.65        # float – có dấu chấm thập phântuoi       = 15          # int – không có dấu chấm thập phân# Khởi tạo bốn kiểu dữ liệu cơ bản```python### 💻 Code```<class 'bool'><class 'str'><class 'float'><class 'int'>```**Output khi dùng `type()`:**```dang_hoc = True    # boolten = "Minh"       # strchieu_cao = 1.65   # floattuoi = 15          # int```python**Input:**### 📌 Ví dụ> - Đúng/Sai → `bool` (viết hoa chữ đầu: `True`, `False`)> - Chữ → `str` (phải có dấu nháy `"..."` hoặc `'...'`)> - Số → `int` hoặc `float`> 🔑 **Nhớ nhanh:**| Công tắc đèn | `bool` (đúng/sai) | `True`, `False` || Tin nhắn, tên | `str` (chuỗi) | `"An"`, `'Xin chào'` || Cân nặng, nhiệt độ | `float` (số thực) | `9.5`, `3.14`, `-0.5` || Số trang trong sách | `int` (số nguyên) | `42`, `-5`, `0` ||----------------|-------------|--------------|| Trong đời thực | Kiểu dữ liệu | Ví dụ Python |Giống như đời thực có nhiều loại thông tin khác nhau:### ✅ Giải thích## 📖 Kiến thức 2: Bốn Kiểu Dữ Liệu Cơ Bản---```diem == 9            # Đây là so sánh, không phải gán!diem = 9             # ✅ Gán giá trị# LỖI 3: Nhầm dấu = và ==diem_ly = 8          # ✅ Phải khai báo trướcprint(diem_ly)       # ❌ NameError: name 'diem_ly' is not defined# LỖI 2: Dùng biến chưa khai báoten_hoc_sinh = "An"  # ✅ Đúngtên học sinh = "An"  # ❌ SyntaxError# LỖI 1: Dùng tên có dấu cách```python### ⚠️ Lỗi thường gặp```print(tuoi)      # → 16tuoi = 16        # Hộp "tuoi" giờ chứa 16, không còn 15 nữa# Thay đổi giá trị biến – như thay đồ trong hộpprint(type(ten)) # → <class 'str'>  – kiểm tra kiểu dữ liệuprint(tuoi)      # → 15print(ten)       # → Nguyễn An# In ra màn hình để kiểm trala_hoc_sinh = True  # Hộp chứa đúng/sai (bool)diem = 9.5          # Hộp chứa điểm – kiểu số thực (float)tuoi = 15           # Hộp chứa tuổi – kiểu số nguyên (int)ten = "Nguyễn An"   # Hộp chứa tên – kiểu chữ (str)# Khai báo biến – mỗi dòng tạo một "hộp lưu trữ"```python### 💻 Code```Tạo hộp tên "diem_toan" → bỏ vào 9.5Tạo hộp tên "tuoi"     → bỏ vào 15Tạo hộp tên "ten"      → bỏ vào "Nguyễn An"```**Output (Python hiểu là):**```diem_toan = 9.5tuoi = 15ten = "Nguyễn An"```python**Input (bạn gõ vào):**### 📌 Ví dụ> Ví dụ: `ten_hoc_sinh`, `diem_trung_binh`, `so_buoi_hoc`> 💡 **Mẹo:** Dùng **snake_case** — viết thường, nối bằng dấu gạch dưới `_`  | `TONG_TIEN` | `tổng tiền` | Không dùng tiếng Việt có dấu || `tuoi_me` | `2tuoi-me` | Không dùng dấu gạch ngang || `diem1` | `1diem` | Không bắt đầu bằng số || `ten_hoc_sinh` | `tên học sinh` | Không dùng dấu cách ||--------|--------|-------|| ✅ Đúng | ❌ Sai | Lý do |**Quy tắc đặt tên biến (quan trọng!):**- Dấu `=` = hành động "bỏ vào hộp"- Giá trị = thứ bên trong hộp- Tên biến = nhãn dán trên hộp**Biến** trong Python cũng vậy:> 📦 Hộp dán nhãn **"diem_toan"** → bên trong chứa con số *9*> 📦 Hộp dán nhãn **"ten_ban"** → bên trong chứa tờ giấy ghi *"An"*  Hãy tưởng tượng bạn đang dọn phòng. Bạn cần **hộp có dán nhãn** để cất đồ:### ✅ Giải thích## 📖 Kiến thức 1: Biến và Cách Đặt Tên---> Nếu đổi hộp A = 10, C thay đổi không?> Hỏi: hộp C = hộp A + hộp B thì C = ?  > Giả sử bạn có 3 hộp: hộp A = 5, hộp B = 3.  **Bài mini khởi động (không cần máy):**3. Cho điểm toán = 9, điểm văn = 7. Điểm trung bình tính như thế nào?2. Bạn đã từng dùng Excel chưa? Ô A1 trong Excel có gì giống biến lập trình?1. Máy tính lưu trữ thông tin như thế nào? (gợi ý: giống ô ngăn tủ)**3 câu hỏi khởi động:**> *(Buổi đầu tiên — không có bài cũ. Dùng phần này để khởi động tư duy.)*## 🔁 Ôn bài cũ (10 phút)---- ✅ Đọc được output và debug lỗi cú pháp đơn giản- ✅ Viết chương trình có `if/elif/else`, `for`, `while`- ✅ Tính toán với toán tử số học và so sánh- ✅ Nhận biết và dùng được 4 kiểu dữ liệu cơ bản- ✅ Khai báo và sử dụng biến để lưu trữ thông tinSau buổi này học viên làm được:## 🎯 Mục tiêu---> **Khóa:** CSB | **Thời lượng:** 90 phút | **Đối tượng:** Học viên chưa biết lập trình
> **Khóa:** CSB | **Buổi:** 1/14 | **Thời lượng:** 90 phút

---

## 🎯 Mục tiêu

Sau buổi này học viên làm được:
- ✅ Khai báo biến và gán giá trị
- ✅ Phân biệt 4 kiểu dữ liệu cơ bản (`int`, `float`, `str`, `bool`)
- ✅ Dùng toán tử số học và so sánh
- ✅ Viết chương trình có `if/elif/else`, `for`, `while`
- ✅ In kết quả với `print()` và f-string

---

## 🔁 Ôn bài cũ — Buổi đầu tiên! Làm quen (10 phút)

> Buổi 1 chưa có bài cũ — thay bằng **khởi động tư duy**:

**Câu hỏi gợi mở:**
1. Bạn đã từng chơi game hay dùng ứng dụng nào? Bạn nghĩ nó được tạo ra như thế nào?
2. Nếu bạn muốn máy tính ghi nhớ tên của bạn, bạn nghĩ nó lưu ở đâu?
3. Làm thế nào để máy tính biết "nếu điểm >= 5 thì đỗ, còn không thì trượt"?

**Mini challenge — Không cần code:**
> Viết ra giấy các bước để máy tính tự động xếp loại học lực cho 1 học sinh.

---

## 📖 Kiến thức 1: Biến và Kiểu Dữ Liệu

### ✅ Giải thích

Hãy tưởng tượng bạn đang chơi trò chơi và cần lưu **điểm số** của mình.

Bạn sẽ làm gì? Bạn lấy một **tờ giấy nhớ**, viết lên đó **"Điểm: 100"** và dán lên màn hình.

Trong Python, **biến** chính là tờ giấy nhớ đó:
- **Tên biến** = nhãn dán trên giấy (`diem_so`)
- **Giá trị** = nội dung bạn viết vào (`100`)

```
diem_so = 100
   ↑           ↑
tên biến     giá trị
```

> 💡 Python tự nhận ra bạn đang lưu số hay chữ — không cần khai báo kiểu như các ngôn ngữ khác!

**4 loại "tờ giấy nhớ" cơ bản:**

| Kiểu | Ẩn dụ | Ví dụ |
|------|-------|-------|
| `int` | Số tờ tiền đếm được (nguyên) | `diem = 9`, `tuoi = 15` |
| `float` | Số trên bàn cân (có phần lẻ) | `chieu_cao = 1.65` |
| `str` | Nội dung tin nhắn | `ten = "An"` |
| `bool` | Công tắc đèn (bật/tắt) | `da_lam = True` |

**Quy tắc đặt tên biến:**
- ✅ `diem_toan`, `ten_hoc_sinh`, `so_buoi_nghi`
- ❌ `2diem` (bắt đầu bằng số), `tên học sinh` (có dấu cách), `class` (từ khóa Python)
- ✅ Dùng `snake_case` — tất cả thường, nối bằng dấu gạch dưới

### 📌 Ví dụ

**Input:** Thông tin một học sinh
**Output:** In ra màn hình thông tin đó

### 💻 Code

```python
# ── Khai báo biến ─────────────────────────────
ten        = "Nguyễn Văn An"   # str  – tên học sinh (luôn dùng dấu nháy)
tuoi       = 16                 # int  – số nguyên
diem_tb    = 8.5                # float – số thực
la_hoc_sinh = True              # bool  – True hoặc False (viết hoa chữ đầu)

# ── Kiểm tra kiểu dữ liệu ──────────────────────
print(type(ten))        # <class 'str'>
print(type(tuoi))       # <class 'int'>
print(type(diem_tb))    # <class 'float'>
print(type(la_hoc_sinh)) # <class 'bool'>

# ── In thông tin học sinh ──────────────────────
# Cách 1: nối chuỗi bằng dấu +  (cần ép kiểu thành str)
print("Tên: " + ten + ", tuổi: " + str(tuoi))

# Cách 2: f-string (KHUYẾN DÙNG – gọn và đẹp hơn)
print(f"Tên: {ten} | Tuổi: {tuoi} | Điểm TB: {diem_tb}")

# ── Thay đổi giá trị biến ─────────────────────
diem_tb = 9.0        # Gán giá trị mới – giá trị cũ (8.5) bị ghi đè
print(f"Điểm mới: {diem_tb}")
```

### ⚠️ Lỗi thường gặp

```python
# ❌ Lỗi 1: Quên dấu nháy khi gán chuỗi
ten = Nguyễn An        # NameError: name 'Nguyễn' is not defined
ten = "Nguyễn An"      # ✅ Đúng

# ❌ Lỗi 2: Nối str với int không ép kiểu
print("Tuổi: " + tuoi)         # TypeError: can only concatenate str (not "int")
print("Tuổi: " + str(tuoi))    # ✅ Đúng
print(f"Tuổi: {tuoi}")         # ✅ Đúng – f-string tự xử lý

# ❌ Lỗi 3: Đặt tên biến có dấu cách
ten hoc sinh = "An"    # SyntaxError
ten_hoc_sinh = "An"    # ✅ Đúng
```

---

## 📖 Kiến thức 2: Toán Tử

### ✅ Giải thích

Python là chiếc máy tính thông minh nhất bạn từng dùng.

**Toán tử số học** — như máy tính bỏ túi:

| Ký hiệu | Làm gì | Ví dụ | Kết quả |
|---------|--------|-------|---------|
| `+` | Cộng | `7 + 3` | `10` |
| `-` | Trừ | `10 - 4` | `6` |
| `*` | Nhân | `3 * 4` | `12` |
| `/` | Chia (luôn ra số thực) | `7 / 2` | `3.5` |
| `//` | Chia lấy phần **nguyên** | `7 // 2` | `3` |
| `%` | Chia lấy phần **dư** | `7 % 2` | `1` |
| `**` | Lũy thừa | `2 ** 10` | `1024` |

> 💡 `%` rất hữu dụng! Dùng để kiểm tra số chẵn/lẻ:  
> `so % 2 == 0` → số chẵn · `so % 2 == 1` → số lẻ

**Toán tử so sánh** — luôn trả về `True` hoặc `False`:

| Ký hiệu | Ý nghĩa | Ví dụ | Kết quả |
|---------|---------|-------|---------|
| `==` | Bằng nhau? | `5 == 5` | `True` |
| `!=` | Khác nhau? | `5 != 3` | `True` |
| `>` | Lớn hơn? | `8 > 5` | `True` |
| `<` | Nhỏ hơn? | `3 < 1` | `False` |
| `>=` | Lớn hơn hoặc bằng? | `8 >= 8` | `True` |

**Toán tử logic** — ghép nhiều điều kiện:

| Ký hiệu | Ý nghĩa | Ví dụ | Kết quả |
|---------|---------|-------|---------|
| `and` | Cả hai đều đúng | `True and False` | `False` |
| `or` | Ít nhất một đúng | `True or False` | `True` |
| `not` | Đảo ngược | `not True` | `False` |

### 📌 Ví dụ

**Input:** Số tiền có `50_000`, mua đồ uống `25_000`, tính toán tiền thừa và xem có đủ mua thêm không

**Output:**
```
Tiền ban đầu : 50,000 VNĐ
Tiền đồ uống: 25,000 VNĐ
Tiền còn lại: 25,000 VNĐ
Có đủ mua snack 20,000? True
```

### 💻 Code

```python
tien_co   = 50_000    # Dấu _ giúp đọc số lớn dễ hơn (50 nghìn)
tien_nuoc = 25_000
tien_snack = 20_000

tien_con_lai = tien_co - tien_nuoc          # Phép trừ
du_mua_snack = tien_con_lai >= tien_snack   # So sánh → True/False

print(f"Tiền ban đầu  : {tien_co:,} VNĐ")      # :, → định dạng ngăn cách hàng nghìn
print(f"Tiền đồ uống : {tien_nuoc:,} VNĐ")
print(f"Tiền còn lại : {tien_con_lai:,} VNĐ")
print(f"Đủ mua snack?: {du_mua_snack}")

# Ứng dụng %: kiểm tra số chẵn lẻ
so = 7
print(f"\n{so} là số {'chẵn' if so % 2 == 0 else 'lẻ'}")
```

### ⚠️ Lỗi thường gặp

```python
# ❌ Lỗi 1: Nhầm = (gán) với == (so sánh)
if diem = 9:    # SyntaxError!
if diem == 9:   # ✅ Đúng

# ❌ Lỗi 2: Chia cho 0
print(10 / 0)   # ZeroDivisionError

# ❌ Lỗi 3: Quên rằng / luôn ra float
print(10 / 2)   # 5.0 (không phải 5!)
print(10 // 2)  # 5   (mới là int)
```

---

## 📖 Kiến thức 3: Cấu Trúc if / elif / else

### ✅ Giải thích

Hãy nghĩ đến tình huống **sáng ngủ dậy**:

> "Nếu trời mưa → lấy ô.  
> Nếu không → kiểm tra lại: trời nắng to → kem chống nắng.  
> Còn không thì → đi bình thường."

Đây chính xác là cách `if/elif/else` hoạt động!

```
if <điều kiện 1>:
    # làm A  ← chỉ chạy nếu điều kiện 1 ĐÚNG
elif <điều kiện 2>:
    # làm B  ← chỉ chạy nếu điều kiện 1 SAI và điều kiện 2 ĐÚNG
else:
    # làm C  ← chạy khi TẤT CẢ điều kiện trên đều SAI
```

> ⚠️ Python dùng **thụt lề (indent)** 4 dấu cách để xác định đoạn code nào thuộc về `if`.  
> Sai indent = sai chương trình hoặc báo lỗi!

### 📌 Ví dụ

**Input:** `diem_tb = 7.5`
**Output:** `"Xếp loại: Khá"`

**Dry run từng bước:**
```
diem_tb = 7.5

Bước 1: 7.5 >= 9.0?  → FALSE → xuống elif
Bước 2: 7.5 >= 8.0?  → FALSE → xuống elif
Bước 3: 7.5 >= 6.5?  → TRUE  → xep_loai = "Khá" → DỪNG
```

### 💻 Code

```python
diem_tb = 7.5

# Kiểm tra lần lượt từ cao xuống thấp
if diem_tb >= 9.0:
    xep_loai = "Xuất Sắc"
elif diem_tb >= 8.0:
    xep_loai = "Giỏi"
elif diem_tb >= 6.5:
    xep_loai = "Khá"
elif diem_tb >= 5.0:
    xep_loai = "Trung Bình"
else:
    xep_loai = "Yếu"          # Chạy khi tất cả điều kiện trên đều sai

print(f"Điểm {diem_tb} → Xếp loại: {xep_loai}")

# ── Kết hợp and / or ──────────────────────────
diem_toan = 8
diem_van  = 5
du_len_lop = diem_toan >= 5 and diem_van >= 5   # Phải đỗ CẢ HAI môn
print(f"Đủ điều kiện lên lớp: {du_len_lop}")
```

### ⚠️ Lỗi thường gặp

```python
# ❌ Lỗi 1: Quên dấu hai chấm (:) sau điều kiện
if diem >= 5    # SyntaxError: expected ':'
if diem >= 5:   # ✅ Đúng

# ❌ Lỗi 2: Sai thứ tự điều kiện (kiểm tra thấp trước cao)
if diem >= 5.0:
    xep_loai = "Trung Bình"
elif diem >= 8.0:   # ← Không bao giờ chạy! vì 8.0 >= 5.0 đã True ở trên rồi
    xep_loai = "Giỏi"
# ✅ Luôn kiểm tra từ ngưỡng CAO nhất xuống THẤP nhất

# ❌ Lỗi 3: Sai thụt lề
if diem >= 5:
print("Đỗ")    # IndentationError: expected an indented block
if diem >= 5:
    print("Đỗ")  # ✅ Đúng
```

---

## 📖 Kiến thức 4: Vòng Lặp for và while

### ✅ Giải thích

**Vòng lặp `for`** — Làm từng bước theo danh sách, như thu ngân quét hàng:

> 🛒 "Quét mã sản phẩm thứ nhất → báo giá → quét thứ hai → báo giá → ... → hết hàng thì thôi"

```python
for phan_tu in danh_sach:
    # làm gì đó với phan_tu
```

**Vòng lặp `while`** — Làm mãi đến khi điều kiện sai, như báo thức reo:

> ⏰ "Báo thức cứ reo → nhấn tắt → nếu chưa đủ 5 lần → reo lại → ... → đủ 5 lần mới thôi"

```python
while dieu_kien_chua_xay_ra:
    # làm gì đó
    # cập nhật biến để thoát khỏi vòng lặp!
```

> ⚠️ Nếu quên cập nhật biến trong `while` → **vòng lặp vô tận** → chương trình treo!

### 📌 Ví dụ

**Input:** `diem = [9, 4, 7, 8, 6]`
**Output:**
```
Duyệt bằng for:
  Môn 1: 9 điểm ← Giỏi
  Môn 2: 4 điểm ← Trượt
  ...

Đếm bằng while: 3 môn đạt >= 5
```

### 💻 Code

```python
diem = [9, 4, 7, 8, 6]

# ── FOR: duyệt danh sách ──────────────────────
print("Duyệt bằng for:")
for i, d in enumerate(diem, start=1):   # enumerate cho biết cả vị trí lẫn giá trị
    ket_qua = "Giỏi" if d >= 8 else ("Đỗ" if d >= 5 else "Trượt")
    print(f"  Môn {i}: {d} điểm ← {ket_qua}")

# ── FOR với range(): tạo dãy số ───────────────
print("\nBảng cửu chương 3:")
for so in range(1, 11):     # range(1,11) = 1,2,3,...,10
    print(f"  3 x {so:2d} = {3 * so}")

# ── WHILE: đếm có điều kiện ───────────────────
print("\nĐếm bằng while:")
i       = 0
so_dat  = 0
while i < len(diem):          # Điều kiện: còn phần tử để duyệt
    if diem[i] >= 5:
        so_dat += 1            # += là viết tắt của: so_dat = so_dat + 1
    i += 1                     # ← QUAN TRỌNG: phải tăng i, nếu không vòng lặp vô tận!
print(f"  Số môn đạt (>=5): {so_dat}/{len(diem)}")
```

### ⚠️ Lỗi thường gặp

```python
# ❌ Lỗi 1: Vòng while vô tận – quên tăng biến
i = 0
while i < 5:
    print(i)
    # Quên i += 1 → in mãi mãi → Ctrl+C để thoát

# ❌ Lỗi 2: range() bắt đầu từ 0, không phải 1
for i in range(5):       # i = 0, 1, 2, 3, 4  (không có 5!)
for i in range(1, 6):    # i = 1, 2, 3, 4, 5

# ❌ Lỗi 3: Thay đổi list đang duyệt
for phan_tu in ds:
    ds.remove(phan_tu)   # Nguy hiểm! Bỏ qua phần tử, kết quả sai
```

---

## 💻 Demo Tổng Hợp — Máy Tính Điểm Học Kỳ

```python
# ═══════════════════════════════════════════════════
# Demo tổng hợp: Tính điểm TB và xếp loại học kỳ
# Áp dụng: biến, kiểu dữ liệu, if/else, for, while
# ═══════════════════════════════════════════════════

# Thông tin học sinh
ten_hoc_sinh = "Nguyễn Văn An"
diem_cac_mon = {
    "Toán":    8.5,
    "Lý":      7.0,
    "Hóa":     9.0,
    "Anh":     6.5,
    "Văn":     7.5,
}

# Tính tổng và điểm trung bình bằng for
tong_diem = 0
so_mon    = 0
for mon, diem in diem_cac_mon.items():
    tong_diem += diem
    so_mon    += 1

diem_tb = tong_diem / so_mon    # Tổng / số môn

# Xếp loại bằng if/elif/else
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

# Đếm số môn giỏi (>=8) bằng while
ds_diem = list(diem_cac_mon.values())   # Lấy ra list các điểm
j       = 0
so_mon_gioi = 0
while j < len(ds_diem):
    if ds_diem[j] >= 8.0:
        so_mon_gioi += 1
    j += 1

# In kết quả
print("=" * 40)
print(f"  HỌC BẠ: {ten_hoc_sinh}")
print("=" * 40)
for mon, diem in diem_cac_mon.items():
    thanh_tich = "⭐" if diem >= 8 else ""
    print(f"  {mon:<6}: {diem:.1f}  {thanh_tich}")
print("-" * 40)
print(f"  Điểm TB  : {diem_tb:.2f}")
print(f"  Xếp loại : {xep_loai}")
print(f"  Môn giỏi : {so_mon_gioi}/{so_mon}")
print("=" * 40)
```

---

## 📝 Bài Tập Trên Lớp

### Bài 1 — Dễ: Máy Tính Đơn Giản
> Khai báo 2 biến `a = 15`, `b = 4`.  
> In ra: tổng, hiệu, tích, thương thực, thương nguyên, phần dư, và lũy thừa a**b.

**Output mẫu:**
```
a = 15, b = 4
Tổng      : 19
Hiệu      : 11
Tích      : 60
Thương    : 3.75
Thương nguyên: 3
Phần dư   : 3
Lũy thừa  : 50625
```

---

### Bài 2 — Trung Bình: Phân Loại Học Phí
> Nhà trường có chính sách học phí theo xếp loại:
> - Xuất sắc (≥9.0): **miễn học phí**
> - Giỏi (≥8.0): giảm **50%** (học phí gốc: 5,000,000)
> - Khá (≥6.5): giảm **20%**
> - Còn lại: **100%**
>
> Cho `diem_tb = 8.3`, tính và in số tiền phải đóng.

**Output mẫu:**
```
Điểm TB: 8.3 → Giỏi
Học phí gốc  : 5,000,000 VNĐ
Giảm 50%     : 2,500,000 VNĐ
Phải đóng    : 2,500,000 VNĐ
```

---

### Bài 3 — Nâng Cao Nhẹ: Bảng Cửu Chương Đẹp
> Dùng vòng lặp lồng nhau (`for` trong `for`) in ra bảng cửu chương từ 2 đến 5.  
> Mỗi bảng cách nhau một dòng trống.

**Output mẫu:**
```
=== Bảng nhân 2 ===
2 x 1 =  2
2 x 2 =  4
...
2 x 10 = 20

=== Bảng nhân 3 ===
...
```

---

## 🏠 Bài Tập Về Nhà

### Bài 1: Máy Đổi Tiền
> Viết chương trình:
> - Có biến `so_tien_vnd = 1_500_000` (1.5 triệu đồng)
> - Tỷ giá: 1 USD = 25,000 VNĐ · 1 EUR = 27,000 VNĐ · 1 JPY = 160 VNĐ
> - Tính và in ra số tiền tương đương theo 3 loại ngoại tệ
> - Dùng `if` kiểm tra: nếu số tiền > 1 triệu thì in "Có thể đổi ngoại tệ", ngược lại "Số tiền quá nhỏ"

### Bài 2: Đếm Số Lẻ
> Dùng vòng `while`, đếm và in tất cả số lẻ từ 1 đến 50.  
> Cuối cùng in: "Tổng số lẻ từ 1 đến 50: X số"  
> *(Gợi ý: dùng `%` để kiểm tra số lẻ)*

---

## 🎯 Tổng Kết Buổi 1

> **3 điều PHẢI nhớ:**
1. **Biến = hộp lưu trữ** → đặt tên rõ nghĩa, dùng `snake_case`
2. **4 kiểu cơ bản:** `int` (nguyên) · `float` (thực) · `str` (chuỗi) · `bool` (đúng/sai)
3. **Thụt lề (indent) = linh hồn của Python** → sai indent là bug ngay

> **Liên kết tới buổi 2:** Biến và vòng lặp sẽ được dùng liên tục khi làm việc với `List` và `Hàm`!

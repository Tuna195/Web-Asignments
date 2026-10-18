/* BÀI A — ĐIỀN VÀO CHỖ TRỐNG: Thư viện ảnh tương tác (index.html)
   Thay mỗi ___(n)___ bằng đáp án của bạn.
   - Chỗ trống nằm trong CODE: điền tên phương thức / thuộc tính / từ khoá / toán tử còn thiếu.
   - Chỗ trống nằm trong CHÚ THÍCH ("in ra: ..."): điền kết quả bạn DỰ ĐOÁN, chưa chạy vội.
   Hãy mở index.html trong trình soạn thảo để xem cấu trúc HTML thật trước khi điền.
   File chỉ chạy được khi mọi chỗ trống trong code đã được điền. */

// ---------- Phần 1: Tìm phần tử ----------
// Phần tử ĐẦU TIÊN khớp bộ chọn CSS:
const anhLon = document.querySelector("#gallery > div > img");            // (1) querySelector
// TẤT CẢ phần tử khớp bộ chọn CSS:
const dsAnhNho = document.querySelectorAll("#gallery ul li img");          // (2) querySelectorAll
const khungAnhNho = document.querySelector("#gallery ul");
// Tìm theo id:
const oTimKiem = document.getElementById("o-tim-kiem");                    // (3) getElementById

console.log(dsAnhNho.length);                     // in ra: 6           (4)

// ---------- Phần 2: Đi lại trên cây DOM ----------
console.log(khungAnhNho.firstChild.nodeType);     // in ra: 3           (5) nút văn bản (khoảng trắng xuống dòng)
console.log(khungAnhNho.childNodes.length);       // in ra: 13          (6) 6 <li> + 7 nút văn bản
// Đi từ <img> lên phần tử cha của nó:
console.log(dsAnhNho[0].parentNode.nodeName);     // in ra: LI          (7) parentNode

// ---------- Phần 3: Tạo và chèn phần tử ----------
const chuThich = document.createElement("p");                              // (8) createElement
chuThich.id = "chu-thich";
// (9) Gán nội dung dạng VĂN BẢN THUẦN (trình duyệt không được diễn giải thẻ HTML nếu có):
chuThich.textContent = "Bấm vào ảnh nhỏ để đổi ảnh lớn.";                  // (9) textContent
// (10) Chèn vào CUỐI thẻ <div> đang chứa ảnh lớn:
anhLon.parentNode.appendChild(chuThich);                                   // (10) appendChild

// ---------- Phần 4: MỘT trình lắng nghe cho cả 6 ảnh nhỏ ----------
function doiAnh(e) {
	// Người dùng có thể bấm trúng khoảng trống của <ul> hoặc mép <li>: khi đó không làm gì cả.
	if (e.target.nodeName !== "IMG") {                                     // (11) !==
		return;                                                            // (12) return
	}

	// Thuộc tính alt của ảnh nhỏ lưu tên file ảnh lớn tương ứng.
	anhLon.src = `images/${e.target.alt}.jpg`;
	chuThich.textContent = `Đang xem: ${e.target.alt}.jpg`;                // (13) target

	// Bỏ lớp "dang-chon" ở mọi <li>, rồi gán cho <li> chứa ảnh vừa bấm.
	for (const anh of dsAnhNho) {                                          // (14) of
		anh.parentNode.className = "";
	}
	e.target.parentNode.className = "dang-chon";                           // (15) className
}

khungAnhNho.addEventListener("click", doiAnh);                             // (16) addEventListener, (17) doiAnh

// Nếu viết  khungAnhNho.addEventListener("click", doiAnh());  thì:
//   (A) chạy giống hệt   (B) báo TypeError ngay khi tải trang   (C) chạy đúng nhưng chỉ một lần
//   → B                                                                    (18)

// ---------- Phần 5: Thay inline JS của ô tìm kiếm ----------
// Mã nguồn gốc viết thẳng trong HTML:  onFocus="javascript:if(this.value==this.defaultValue){this.value='';}"
const GOI_Y = "Enter search query";
oTimKiem.addEventListener("focus", () => {       // khi ô được chọn để gõ  (19) focus
	if (oTimKiem.value === GOI_Y) {
		oTimKiem.value = "";
	}
});
oTimKiem.addEventListener("blur", () => {              // khi rời khỏi ô
	if (oTimKiem.value === "") {
		oTimKiem.value = GOI_Y;
	}
});

// ---------- Phần 6: Gỡ trình lắng nghe ----------
const nutKhoa = document.getElementById("nut-khoa");
nutKhoa.addEventListener("click", (e) => {
	khungAnhNho.removeEventListener("click", doiAnh);                      // (20) removeEventListener, (21) doiAnh
	chuThich.textContent = "Thư viện ảnh đã khoá.";
	console.log(e.type);                           // in ra: click          (22)
	console.log(e.target.id);                      // in ra: nut-khoa       (23)
});
// Giả sử ở Phần 4 đăng ký bằng hàm mũi tên vô danh:   addEventListener("click", (e) => doiAnh(e))
// thì  removeEventListener("click", (e) => doiAnh(e))  có gỡ được không? (có / không)  → không   (24)

// ---------- Phần 7: Thêm một mục vào cột bên phải ----------
const dsBaiViet = document.querySelector("#posts ul");
const mucMoi = document.createElement("li");
const tieuDe = document.createElement("h5");
tieuDe.textContent = "Khuyến mãi <b>thiệp cưới</b>";
mucMoi.append(tieuDe);
// (25) Chèn vào ĐẦU danh sách:
dsBaiViet.prepend(mucMoi);                                                 // (25) prepend

// Trên trang, hai chữ "thiệp cưới" hiện IN ĐẬM hay hiện NGUYÊN cả cặp thẻ <b>…</b>?  → hiện NGUYÊN cả cặp thẻ <b>…</b>   (26)
console.log(dsBaiViet.querySelectorAll("li").length);     // in ra: 3      (27)

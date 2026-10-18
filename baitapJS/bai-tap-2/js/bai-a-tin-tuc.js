/* BÀI A — ĐIỀN VÀO CHỖ TRỐNG: Trang News lấy dữ liệu từ JSON
   Thay mỗi ___(n)___ bằng đáp án của bạn.
   - Chỗ trống nằm trong CODE: điền tên phương thức / từ khoá / toán tử / biểu thức còn thiếu.
   - Chỗ trống nằm trong CHÚ THÍCH ("in ra: ..."): điền kết quả bạn DỰ ĐOÁN, chưa chạy vội.
   File chỉ chạy được khi mọi chỗ trống trong code đã được điền. */

// Máy chủ gửi về MỘT CHUỖI JSON chứa 5 bài viết.
const duLieuTho = '[' +
	'{"id":1,"title":"Khai trương xưởng in mới","date":"01-03-2012","views":320,"tags":["su kien","xuong in"],"draft":false},' +
	'{"id":2,"title":"Mẫu thiệp cưới mùa thu","date":"15-03-2012","views":870,"tags":["thiep cuoi","mau moi"],"draft":false},' +
	'{"id":3,"title":"Hướng dẫn chọn giấy cotton","date":"02-04-2012","views":540,"tags":["huong dan","giay"],"draft":false},' +
	'{"id":4,"title":"Bảng giá 2013","date":"20-04-2012","views":0,"tags":["bang gia"],"draft":true},' +
	'{"id":5,"title":"Ưu đãi in danh thiếp","date":"05-05-2012","views":870,"tags":["khuyen mai","mau moi"],"draft":false}' +
	']';

// ---------- Phần 1: JSON → mảng object ----------
const dsBai = JSON.parse(duLieuTho);                                   // (1) parse

// ---------- Phần 2: Thêm / bớt phần tử ----------
// Thêm vào CUỐI mảng:
dsBai.push({ id: 6, title: "Tuyển thực tập sinh", date: "10-05-2012", views: 45, tags: ["tuyen dung"], draft: true });   // (2) push
// Thêm vào ĐẦU mảng:
dsBai.unshift({ id: 0, title: "Thông báo nghỉ lễ", date: "30-04-2012", views: 120, tags: ["thong bao"], draft: false }); // (3) unshift
// Lấy ra và xoá phần tử CUỐI:
const baiCuoi = dsBai.pop();                                           // (4) pop
console.log(baiCuoi.id);             // in ra: 6                        (5)
// Lấy ra và xoá phần tử ĐẦU:
const baiDau = dsBai.shift();                                          // (6) shift
console.log(dsBai.length);           // in ra: 5                        (7)

// ---------- Phần 3: Thuộc tính của object ----------
const baiMot = dsBai[0];
baiMot.noiBat = true;                          // thêm thuộc tính
baiMot["tac gia"] = "Ban biên tập";            // (8) ["tac gia"] — khoá có dấu cách phải dùng ngoặc vuông
delete baiMot.noiBat;                          // (9) delete
console.log(baiMot.noiBat);          // in ra: undefined                (10)

// ---------- Phần 4: Kiểu tham chiếu ----------
const baiGhim = dsBai[1];
baiGhim.title = "[GHIM] " + baiGhim.title;
console.log(dsBai[1].title);         // in ra: [GHIM] Mẫu thiệp cưới mùa thu   (11)

// ---------- Phần 5: filter / map / reduce ----------
// Chỉ giữ các bài ĐÃ ĐĂNG (draft là false):
const daDang = dsBai.filter(bai => bai.draft === false);               // (12) filter
console.log(daDang.length);          // in ra: 4                        (13)

// Mảng mới gồm tiêu đề viết HOA:
const dsTieuDe = daDang.map(bai => bai.title.toUpperCase());           // (14) map, (15) toUpperCase

// Tổng lượt xem:
const tongLuotXem = daDang.reduce((tong, bai) => tong + bai.views, 0); // (16) bai.views, (17) 0
console.log(tongLuotXem);            // in ra: 2600                     (18)
// Nếu BỎ đối số thứ hai (17) của reduce thì tongLuotXem là:
//   (A) vẫn là con số đúng   (B) một chuỗi bắt đầu bằng "[object Object]"   (C) báo TypeError
//   → B                                                                (19)

// Bài nhiều lượt xem nhất; nếu bằng nhau thì giữ bài ĐỨNG TRƯỚC trong mảng:
const baiHot = daDang.reduce((max, bai) => bai.views > max.views ? bai : max);   // (20) >
console.log(baiHot.id);              // in ra: 2                        (21)

// Callback của map KHÔNG return:
const thu = daDang.map(bai => { bai.views + 1; });
console.log(thu[0]);                 // in ra: undefined                (22)

// ---------- Phần 6: Đếm số bài theo thẻ (tag) ----------
const demThe = {};
daDang.forEach(bai => {
	for (const the of bai.tags) {                                      // (23) of
		demThe[the] = (demThe[the] || 0) + 1;                          // (24) the
	}
});
console.log(demThe["mau moi"]);      // in ra: 2                        (25)

// ---------- Phần 7: Class ----------
class BaiViet {
	constructor(duLieu) {                                              // (26) constructor
		this.title = duLieu.title;
		this.date = duLieu.date;
		this.views = duLieu.views;                                     // (27) this
	}
	tomTat() {
		return `${this.date} — ${this.views} lượt xem`;
	}
}
const dsBaiViet = daDang.map(duLieu => new BaiViet(duLieu));           // (28) new

// ---------- Phần 8: Object → JSON ----------
const guiDi = JSON.stringify(dsBaiViet[0]);                            // (29) stringify
console.log(guiDi);
// Chuỗi guiDi có chứa phương thức tomTat không? (có / không)  → không  (30)

// ---------- Hiển thị ----------
veDanhSachTin(dsBaiViet);
hienThi(`Đã đăng: ${daDang.length} bài — tổng ${tongLuotXem} lượt xem — bài hot: #${baiHot.id}`);
hienThi(`Tiêu đề: ${dsTieuDe.join(" | ")}`);
for (const the in demThe) {
	hienThi(`#${the}: ${demThe[the]} bài`);
}

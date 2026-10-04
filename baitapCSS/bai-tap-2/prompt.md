# Bài tập 2 — Prompt sửa lỗi CSS bằng AI

## 1. Prompt đã dùng

```text
Vai trò: Bạn là front-end developer có kinh nghiệm về CSS box model và position.

Bối cảnh: Tôi có trang khuyến mãi Tết gồm trang.html và style-loi.css (dán bên dưới).
HTML đã đúng, KHÔNG được sửa HTML. Trang trông gần như đúng nhưng còn vài lỗi
tinh vi về box model / position.

Yêu cầu hiển thị đúng:
1. Thanh menu trên cùng dính lại khi cuộn (sticky) và luôn nằm trên ảnh.
2. Ảnh hero phủ kín khung, tiêu đề nằm chính giữa ảnh.
3. Ba thẻ sản phẩm xếp một hàng ngang; mỗi thẻ có nhãn "-20%" ở góc trên bên phải
   của chính thẻ đó; ảnh và chữ nằm gọn trong thẻ.
4. Nút "↑" nổi cố định ở góc dưới bên phải màn hình khi cuộn.

Hiện tượng tôi quan sát được:
- Cuộn trang thì menu trôi mất, không dính.
- Thẻ thứ 3 rớt xuống hàng dưới.
- Nhãn "-20%" không thấy trên thẻ.

Ràng buộc:
- Chỉ sửa đúng các dòng gây lỗi, sửa tối thiểu. Không viết lại file.
- Trong file có những đoạn trông "thừa/lạ" nhưng đang đúng và cần thiết
  (ví dụ: margin âm của .products, các z-index, transform: scale của ảnh hero,
  position: relative của .hero/.card). KHÔNG được xoá hay đổi chúng nếu không
  chứng minh được chúng gây lỗi.

Cách trả lời:
1. Bảng: lỗi | selector + thuộc tính gây lỗi | vì sao gây lỗi | cách sửa.
2. Liệt kê các đoạn trông lạ nhưng phải giữ nguyên, kèm lý do.
3. Chỉ đưa phần CSS đã thay đổi (trước → sau).

[dán trang.html]
[dán style-loi.css]
```

## 2. Kết quả chẩn đoán (đã kiểm tra lại bằng DevTools)

| # | Hiện tượng | Nguyên nhân | Sửa |
|---|---|---|---|
| 1 | Menu không dính khi cuộn | `.page { overflow-x: hidden }` làm `overflow-y` thành `auto`, `.page` thành khung cuộn riêng → `position: sticky` của header bám vào `.page` (không cuộn) thay vì cửa sổ | `overflow-x: clip` (cắt tràn ngang nhưng không tạo khung cuộn) |
| 2 | Thẻ thứ 3 rớt hàng | `.card { box-sizing: content-box }` → padding 2×16px + viền 2×1px cộng thêm vào `flex-basis`, 3 thẻ + 2 khoảng cách vượt quá 100% | Bỏ dòng này, dùng lại `border-box` từ `*` |
| 3 | Mất nhãn "-20%" | `.card img { position: relative; z-index: 2 }` vẽ ảnh đè lên `.badge` (z-index auto) | Thêm `z-index: 3` cho `.badge` |

## 3. Những đoạn trông lạ nhưng giữ nguyên

| Đoạn code | Vì sao cần |
|---|---|
| `.hero { position: relative }` | Làm khối chứa cho `.hero-overlay` (absolute) để tiêu đề nằm giữa ảnh |
| `.hero-bg { transform: scale(1.08) }` | Hiệu ứng phóng ảnh; phần tràn đã bị `.hero { overflow: hidden }` cắt |
| `.products { margin-top: -48px; position: relative; z-index: 1 }` | Cố ý cho khối sản phẩm đè lên mép dưới ảnh hero; thiếu `position`/`z-index` thì khối bị ảnh hero che |
| `.site-header { z-index: 100 }` | Menu nằm trên `.products` (z-index 1) khi cuộn |
| `.card { position: relative }` | Làm khối chứa để `.badge` nằm ở góc của chính thẻ đó |
| `.back-to-top { z-index: 200 }` | Nút luôn nổi trên mọi thứ |

File gốc: `style-loi.goc.css` — file đã sửa: `style-loi.css` (mỗi chỗ sửa có chú thích `SỬA 1..3`).

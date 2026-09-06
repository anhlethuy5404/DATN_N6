# 🌿 MỘC - SÀN GIAO DỊCH, ĐẤU GIÁ & TRAO ĐỔI ĐỒ CŨ
> **Khóa Luận Tốt Nghiệp 2026 - Nhóm DATN_N6**  
> Ứng dụng Web mua bán, đấu giá trực tiếp, trao đổi đồ cũ và pass đồ tích hợp cơ chế bảo vệ giao dịch (Escrow) và trợ lý AI định giá.

---

## 📋 MỤC LỤC
1. [Giới thiệu Dự án](#1-giới-thiệu-dự-án)
2. [Công nghệ Sử dụng (Tech Stack)](#2-công-nghệ-sử-dụng-tech-stack)
3. [Cấu trúc Thư mục Dự án](#3-cấu-trúc-thư-mục-dự-án)
4. [Ánh xạ 9 Phân hệ Nghiệp vụ CSDL](#4-ánh-xạ-9-phân-hệ-nghiệp-vụ-csdl)
5. [Cấu hình Môi trường (.env & Port)](#5-cấu-hình-môi-trường-env--port)
6. [Hướng dẫn Cài đặt & Khởi chạy](#6-hướng-dẫn-cài-đặt--khởi-chạy)
7. [Hướng dẫn Phân quyền & Kịch bản Trải nghiệm](#7-hướng-dẫn-phân-quyền--kịch-bản-trải-nghiệm)
8. [Quy tắc Thiết kế & Giao diện (Design System)](#8-quy-tắc-thiết-kế--giao-diện-design-system)

---

## 1. Giới thiệu Dự án

**Mộc** là nền tảng thương mại điện tử chuyên biệt cho đồ cũ (re-commerce), hàng sưu tầm và đồ thủ công mỹ nghệ. Hệ thống giải quyết bài toán thiếu tin cậy khi giao dịch đồ cũ trực tuyến thông qua 4 trụ cột chính:
- **Đa dạng hình thức giao dịch**: Bán lẻ trực tiếp (`SALE`), Đấu giá thời gian thực (`AUCTION`), Trao đổi bù trừ giá trị (`BARTER`), và Tặng/Pass đồ miễn phí (`PASS`).
- **Cơ chế Ký gửi Bảo vệ (Escrow & Safe Meetup)**: Người mua chuyển tiền vào ví phong tỏa trung gian, chỉ giải ngân cho người bán khi quét mã QR xác nhận nhận hàng trực tiếp tại các điểm hẹn an toàn (UBND, bưu điện, quán cafe đối tác).
- **Hệ thống Đấu giá Thông minh**: Hỗ trợ đặt giá thủ công và **Đấu giá tự động (Proxy Bidding)** với bước giá tối thiểu và thời gian gia hạn tự động chống bùng giá phút chót.
- **Xác thực Định danh & Trợ lý AI**: Tích hợp eKYC chụp CCCD/hộ chiếu gắn huy hiệu uy tín, cùng Trợ lý AI tư vấn định giá và giải đáp quy chế sàn.

---

## 2. Công nghệ Sử dụng (Tech Stack)

- **Frontend Core**: React 19, TypeScript (~6.0), Vite 8
- **Định tuyến (Routing)**: React Router v7 (`react-router-dom`)
- **Biểu đồ & Thống kê**: Recharts 3
- **Iconography**: Lucide React
- **Xử lý biểu mẫu**: React Hook Form, Zod
- **Styling**: Vanilla CSS Design System cao cấp theo phong cách Mộc mạc hiện đại (Palette: Terracotta `#c5573e`, Deep Charcoal `#292724`, Warm Sand `#f8f7f3`; Typography: Google Fonts `Fraunces` & `DM Sans`).

---

## 3. Cấu trúc Thư mục Dự án

```text
frontendWeb/
├── .env                     # File cấu hình biến môi trường thực thi
├── .env.example             # File mẫu biến môi trường cho thành viên dự án
├── index.html               # Trang HTML gốc, nạp Google Fonts & Favicon
├── package.json             # Danh sách dependencies & scripts
├── tsconfig.json            # Cấu hình TypeScript root
├── tsconfig.app.json        # Cấu hình TypeScript cho ứng dụng web Vite
├── vite.config.ts           # Cấu hình Vite (Port 5173, Host, Proxy /api sang Backend)
├── db                       # Bản thiết kế lược đồ CSDL chuẩn gồm 9 phân hệ (Reference)
│
├── public/                  # Tài nguyên tĩnh (Favicon, logo, hình ảnh mặc định)
└── src/
    ├── App.tsx              # Component gốc bọc AuthProvider & Router
    ├── main.tsx             # Entry point khởi chạy ứng dụng React
    ├── index.css            # Toàn bộ CSS Design System "Mộc" (Tokens, Components, Themes)
    │
    ├── types/               # Kiểu dữ liệu TypeScript khớp 100% với CSDL
    │   └── index.ts         # Khai báo User, Product, Auction, Order, Escrow, Wallet, Dispute...
    │
    ├── mock/                # Dữ liệu giả lập thực tế phục vụ kiểm thử và demo
    │   └── mockData.ts      # Danh mục, sản phẩm, phiên đấu giá, điểm hẹn an toàn, ví tiền...
    │
    ├── contexts/            # Quản lý trạng thái toàn cục
    │   └── AuthContext.tsx  # Xác thực đăng nhập, lưu trữ phiên, Role Switcher nhanh
    │
    ├── hooks/               # Custom React Hooks
    │   └── useAuth.ts       # Hook tiện ích truy xuất thông tin người dùng và quyền hạn
    │
    ├── routes/              # Điều hướng và phân quyền đường dẫn
    │   └── AppRoutes.tsx    # Cấu hình hơn 30 routes cho Khách hàng, Kiểm duyệt & Quản trị
    │
    ├── layouts/             # Các khung giao diện mẫu (Layout Shells)
    │   ├── MainLayout.tsx       # Khung khách hàng công khai (Header, Breadcrumb, Footer, AI Chat)
    │   ├── UserLayout.tsx       # Khung trung tâm tài khoản cá nhân người dùng
    │   ├── ModeratorLayout.tsx  # Khung kiểm duyệt viên chuyên dụng (Sidebar kiểm duyệt)
    │   ├── AdminLayout.tsx      # Khung quản trị viên tối cao (Thống kê, Quản lý toàn sàn)
    │   └── AuthLayout.tsx       # Khung đơn giản cho Đăng nhập / Đăng ký / Quên mật khẩu
    │
    ├── components/          # Các khối giao diện tái sử dụng
    │   ├── Header.tsx           # Thanh điều hướng chính, tìm kiếm, giỏ hàng, Role Switcher
    │   ├── Footer.tsx           # Chân trang thông tin sàn, liên hệ, chính sách
    │   ├── ProductCard.tsx      # Thẻ sản phẩm bán lẻ, trao đổi, pass đồ
    │   ├── AuctionCard.tsx      # Thẻ phiên đấu giá với đồng hồ đếm ngược và giá cao nhất
    │   ├── AIChatWidget.tsx     # Cửa sổ chat AI nổi góc màn hình hỗ trợ khách hàng
    │   └── modals/              # Các cửa sổ tương tác (Modal Dialogs)
    │       ├── ProxyModal.tsx       # Cài đặt đấu giá tự động (Giá trần & bước nhảy)
    │       ├── PriceAlertModal.tsx  # Đăng ký nhận thông báo khi sản phẩm giảm giá
    │       ├── WithdrawModal.tsx    # Yêu cầu rút tiền từ ví ký gửi về tài khoản ngân hàng
    │       └── ReportModal.tsx      # Gửi báo cáo tố cáo vi phạm tin đăng / thành viên
    │
    └── pages/               # Từng màn hình tính năng độc lập
        ├── home/            # Trang chủ hiển thị banner, danh mục, sản phẩm nổi bật
        ├── products/        # Danh sách sản phẩm, Chi tiết sản phẩm, Đăng tin 7 bước AI
        ├── auctions/        # Sàn đấu giá trực tiếp, Chi tiết đấu giá, Phiên giá của tôi
        ├── direct-trade/    # Đơn xin nhận đồ Pass & đề xuất trao đổi đồ Barter
        ├── cart/            # Giỏ hàng mua bán trực tiếp
        ├── orders/          # Thanh toán VNPAY Escrow, Danh sách đơn hàng, Chi tiết mã QR
        ├── wallet/          # Ví số dư khả dụng, Tiền cọc phong tỏa, Lịch sử biến động
        ├── messages/        # Chat đàm phán giá kèm thẻ sản phẩm, Điểm hẹn an toàn Safe Meetup
        ├── notifications/   # Hộp thư thông báo đẩy cá nhân hóa
        ├── disputes/        # Khiếu nại giao dịch, Tải bằng chứng ảnh/video, Theo dõi tiến độ
        ├── identity/        # Hồ sơ cá nhân, Chỉnh sửa thông tin, Nộp hồ sơ eKYC CCCD
        ├── auth/            # Đăng nhập, Đăng ký, Quên & Đặt lại mật khẩu
        ├── moderator/       # 7 Màn hình Portal Kiểm duyệt viên (Duyệt tin, eKYC, Khiếu nại...)
        └── admin/           # 12 Màn hình Portal Quản trị viên (Thành viên, Đấu giá lại, Phí sàn...)
```

---

## 4. Ánh xạ 9 Phân hệ Nghiệp vụ CSDL

Dự án hiện thực hóa trọn vẹn 9 phân hệ từ tài liệu lược đồ cơ sở dữ liệu (`frontendWeb/db`):

| Phân hệ (Domain) | Bảng CSDL cốt lõi | Màn hình Frontend tương ứng | Chức năng chính |
| :--- | :--- | :--- | :--- |
| **1. User & Identity** | `users`, `user_addresses`, `user_kyc` | `/profile`, `/identity/verification` | Đăng ký, sổ địa chỉ, eKYC chụp ảnh 2 mặt CCCD và ảnh chân dung. |
| **2. Catalog & Products** | `categories`, `products` | `/products`, `/products/create` | Phân loại hàng hóa, đăng tin bán 7 bước với hỗ trợ gợi ý định giá AI. |
| **3. Direct Trade** | `sale_items`, `barter_pass_items` | `/products/:id`, `/direct-trade/my-pass-applications` | Mua ngay, đề xuất đổi đồ bù trừ tiền hoặc đăng ký xin đồ pass. |
| **4. Real-time Auction** | `auction_sessions`, `bids`, `proxy_bids` | `/auctions`, `/auctions/:id`, `/auctions/my-bids` | Đấu giá trực tiếp, đặt giá Proxy Bidding tự động, đếm ngược thời gian thực. |
| **5. Chat & Negotiation** | `chat_rooms`, `chat_messages`, `price_offers` | `/messages` | Đàm phán giá kèm thẻ sản phẩm tương tác, gợi ý điểm hẹn an toàn Safe Meetup Spot. |
| **6. Order, Escrow & Safe Meetup** | `orders`, `safe_meetup_spots` | `/checkout`, `/orders/:id`, `/payment/result` | Thanh toán cọc VNPAY, quy trình Ký gửi Escrow 5 bước, xác nhận QR Code điểm hẹn an toàn. |
| **7. Wallet & Finance** | `wallets`, `wallet_transactions` | `/wallet`, `/wallet/history`, `/wallet/withdraw` | Quản lý số dư khả dụng, số dư phong tỏa cọc, lịch sử nạp/rút/hoàn tiền. |
| **8. Dispute & Trust** | `disputes`, `dispute_evidences`, `reports`, `reviews` | `/disputes`, `/disputes/create`, `/moderator/disputes` | Khiếu nại sai mô tả, bằng chứng ảnh chụp, phán quyết hoàn tiền/chuyển tiền. |
| **9. AI & Platform Operations** | `ai_rag_faq`, `notifications`, `system_settings` | `AIChatWidget`, `/notifications`, `/admin/*` | Trợ lý RAG giải đáp nội quy & định giá đồ cũ, thông báo tự động, cấu hình phí sàn. |

---

## 5. Cấu hình Môi trường (.env & Port)

### 5.1. File cấu hình `.env`
Tạo file `.env` tại thư mục gốc của `frontendWeb/` (hoặc sao chép từ `.env.example`):

```bash
# Cổng chạy ứng dụng Frontend trên máy dev
VITE_PORT=5173

# Chế độ môi trường
VITE_APP_ENV=development

# Tên ứng dụng
VITE_APP_NAME="Mộc - Sàn Đấu Giá, Trao Đổi & Mua Bán Đồ Cũ"

# Backend Origin & REST API (Kết nối với backend Express / NestJS)
VITE_BACKEND_ORIGIN=http://localhost:3000
VITE_API_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000

# Cloudinary CDN lưu trữ ảnh sản phẩm & CCCD
VITE_CLOUDINARY_CLOUD_NAME=ggmpzisn

# Firebase Project (Tùy chọn)
VITE_FIREBASE_PROJECT_ID=datn-n06

# VNPAY Sandbox Escrow URL
VITE_VNPAY_SANDBOX_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html

# Đơn vị tiền tệ và ngôn ngữ
VITE_DEFAULT_LOCALE=vi-VN
VITE_DEFAULT_CURRENCY=VND

# Bật chế độ Mock Data độc lập
VITE_ENABLE_MOCK_DATA=true

# Trợ lý AI
VITE_AI_CHAT_ENDPOINT=http://localhost:3000/api/ai/chat
```

### 5.2. Cấu hình Cổng (Port) & Reverse Proxy trong `vite.config.ts`
- **Frontend Port**: Mặc định là `5173` (có thể thay đổi linh hoạt qua biến `VITE_PORT`).
- **Host**: Được thiết lập `host: true` giúp bạn có thể truy cập từ các thiết bị khác trong cùng mạng LAN hoặc mở trình duyệt điện thoại để kiểm thử responsive.
- **Proxy**: Mọi yêu cầu bắt đầu bằng `/api` hoặc `/socket.io` từ Frontend sẽ tự động được Vite chuyển tiếp (proxy) ngầm tới máy chủ backend tại `http://localhost:3000`, loại bỏ hoàn toàn lỗi CORS khi phát triển cục bộ.

---

## 6. Hướng dẫn Cài đặt & Khởi chạy

### 6.1. Yêu cầu Hệ thống
- **Node.js**: Phiên bản `>= 18.x` (khuyến nghị Node 20 LTS trở lên).
- **npm**: Phiên bản `>= 9.x` hoặc **pnpm** / **yarn**.

### 6.2. Các bước cài đặt

1. Mở terminal và di chuyển vào thư mục `frontendWeb`:
   ```bash
   cd frontendWeb
   ```

2. Cài đặt các gói phụ thuộc (Dependencies):
   ```bash
   npm install
   ```

3. Kiểm tra file cấu hình môi trường:
   ```bash
   # Nếu chưa có file .env, copy từ file mẫu:
   cp .env.example .env
   ```

### 6.3. Các lệnh thực thi (Commands)

| Lệnh | Ý nghĩa | Chi tiết thực hiện |
| :--- | :--- | :--- |
| `npm run dev` | Khởi chạy máy chủ phát triển (Development Server) | Mở tại `http://localhost:5173` với tính năng Hot Module Replacement (HMR). |
| `npm run build` | Biên dịch dự án cho môi trường Production | Kiểm tra kiểu dữ liệu với `tsc -b` và đóng gói bundle tối ưu vào thư mục `dist/`. |
| `npm run preview` | Xem trước bản build Production tại máy local | Mở máy chủ preview tại `http://localhost:4173` để kiểm thử bản build thực tế. |
| `npm run lint` | Kiểm tra cú pháp và chất lượng mã nguồn | Sử dụng `oxlint` với tốc độ siêu nhanh. |

---

## 7. Hướng dẫn Phân quyền & Kịch bản Trải nghiệm

Hệ thống được tích hợp sẵn **Role Switcher tức thì** tại góc phải thanh Header (biểu tượng thẻ người dùng). Bạn có thể bấm để chuyển đổi giữa 3 vai trò:

### 👤 Vai trò 1: Người dùng phổ thông (Minh Anh - USER)
- **Trải nghiệm**:
  1. Vào `/products` tìm kiếm, lọc danh mục, xem chi tiết món đồ, bấm "Mua ngay" vào giỏ hàng `/cart`.
  2. Vào `/products/create` để trải nghiệm form đăng bán 7 bước với nút **"Điền tự động với AI"**.
  3. Vào `/auctions` xem các phiên đấu giá trực tiếp, bấm vào chi tiết `/auctions/auc-001` đặt giá hoặc mở modal **"Đấu giá tự động (Proxy Bidding)"**.
  4. Vào `/checkout` chọn phương thức **Thanh toán Ký gửi Escrow (VNPAY)**, chuyển qua màn hình kết quả và xem chi tiết đơn hàng `/orders/ord-101` với quy trình 5 bước và mã QR điểm hẹn an toàn.
  5. Vào `/messages` đàm phán giá trực tiếp với người bán và chọn **Điểm hẹn giao dịch an toàn (Safe Meetup Spot)**.
  6. Vào `/wallet` nạp tiền hoặc mở modal rút tiền về tài khoản ngân hàng cá nhân.
  7. Vào `/identity/verification` thực hiện quy trình nộp hồ sơ eKYC gắn tích xanh uy tín.

### 🛡️ Vai trò 2: Kiểm duyệt viên (Nguyễn Đức - MODERATOR)
- Truy cập vào Portal Kiểm duyệt tại `/moderator`:
  - **Duyệt bài đăng** (`/moderator/products`): Xem hình ảnh, mô tả, mức giá và thực hiện Phê duyệt / Từ chối tin đăng vi phạm.
  - **Xử lý khiếu nại** (`/moderator/disputes`): Xem bằng chứng tranh chấp giữa người mua và người bán, đưa ra phán quyết hoàn tiền cọc Escrow.
  - **Duyệt hồ sơ eKYC** (`/moderator/verifications`): Đối soát thông tin số CCCD, hình chụp và cấp tích xanh xác minh.
  - **Báo cáo vi phạm** (`/moderator/reports`): Xử lý phản ánh từ cộng đồng về gian lận, hàng cấm.

### 👑 Vai trò 3: Quản trị viên hệ thống (Quản trị viên Mộc - ADMIN)
- Truy cập vào Portal Quản trị tối cao tại `/admin`:
  - **Bảng điều khiển** (`/admin`): Thống kê doanh thu, số phiên đấu giá, tổng tiền ký gửi qua ví và tỷ lệ tranh chấp.
  - **Quản lý thành viên** (`/admin/users`): Khóa/Mở khóa tài khoản, phân quyền Kiểm duyệt viên.
  - **Điều hành Đấu giá & Tái đấu giá** (`/admin/auctions`, `/admin/re-auction`): Mở lại phiên đấu giá đối với các món đồ người thắng không thanh toán cọc.
  - **Cấu hình phí sàn** (`/admin/fees`): Thiết lập phần trăm hoa hồng bán lẻ, phí sàn đấu giá và mức tiền cọc tối thiểu.
  - **Danh mục & Hàng cấm** (`/admin/categories`, `/admin/banned-items`): Quản lý cây phân loại và từ khóa cấm đăng bài.

---

## 8. Quy tắc Thiết kế & Giao diện (Design System)

Giao diện của Mộc được xây dựng hoàn toàn bằng **Vanilla CSS hiện đại**, không phụ thuộc vào Tailwind CSS cồng kềnh, mang đậm hơi thở thủ công mỹ nghệ Á Đông:

- **Bảng màu chủ đạo (Color Palette)**:
  - Màu nhấn chính (Primary Accent): **Đất nung Terracotta** (`#c5573e` / `#a8452e`)
  - Màu nền chính (Background): **Cát ấm tự nhiên Warm Sand** (`#f8f7f3` / `#f3ede2`)
  - Màu chữ (Text Main): **Than trầm Deep Charcoal** (`#292724` / `#504b44`)
  - Màu viền (Border): **Gốm mờ Warm Line** (`#e6decb`)
  - Trạng thái thành công: **Xanh rêu Olive Forest** (`#2f6844`)
  - Trạng thái cảnh báo: **Vàng hổ phách Amber** (`#b26a1b`)
- **Kiểu chữ (Typography)**:
  - Font Tiêu đề (Serif): **Fraunces** mang nét cổ điển, tinh tế và ấm cúng.
  - Font Thân văn bản (Sans): **DM Sans** hiện đại, sắc sảo, tối ưu khả năng đọc trên màn hình điện tử.
- **Tính năng UI/UX nổi bật**:
  - Trợ lý AI định giá nổi ở góc màn hình (`AIChatWidget.tsx`).
  - Hỗ trợ hiển thị chuẩn trên màn hình máy tính bàn, laptop và thiết bị di động (Responsive Breakpoints: 768px, 992px, 1200px).

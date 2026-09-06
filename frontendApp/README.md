# 📱 MỘC - ỨNG DỤNG DI ĐỘNG (REACT NATIVE & EXPO)
> **Phân hệ Người dùng (User Mobile App) - Khóa Luận Tốt Nghiệp DATN_N6**  
> Ứng dụng di động mua bán đồ cũ, đấu giá thời gian thực, ký gửi Escrow và hẹn gặp an toàn (Safe Meetup).

---

## 📋 MỤC LỤC
1. [Giới thiệu Ứng dụng](#1-giới-thiệu-ứng-dụng)
2. [Công nghệ Sử dụng](#2-công-nghệ-sử-dụng)
3. [Cấu trúc Thư mục Mobile App](#3-cấu-trúc-thư-mục-mobile-app)
4. [Các Màn hình & Tính năng Cốt lõi](#4-các-màn-hình--tính-năng-cốt-lõi)
5. [Hướng dẫn Cài đặt & Khởi chạy](#5-hướng-dẫn-cài-đặt--khởi-chạy)
6. [Hướng dẫn Xử lý Sự cố & Khắc phục Lỗi](#6-hướng-dẫn-xử-lý-sự-cố--khắc-phục-lỗi)

---

## 1. Giới thiệu Ứng dụng

Ứng dụng di động **Mộc Mobile** được chuyển giao và đồng bộ 100% nghiệp vụ từ **`frontendWeb`**, phục vụ đối tượng **Người dùng (USER)** giao dịch trực tiếp trên điện thoại thông minh:
- **Trải nghiệm Đấu giá Thời gian thực**: Đếm ngược đồng hồ, theo dõi lịch sử đặt giá, kích hoạt đấu giá tự động **Proxy Bidding**.
- **Ký gửi Escrow & Safe Meetup**: Mã QR xác thực giao nhận hàng trực tiếp tại các điểm hẹn an toàn có camera (Safe Meetup Spot).
- **Trợ lý AI Điền Tự Động**: Hỗ trợ người dùng định giá và soạn thông tin bài đăng bán chỉ với 1 chạm.
- **Ví Điện Tử Mộc Pay**: Quản lý số dư khả dụng và số dư phong tỏa cọc Escrow, nạp tiền VNPAY và rút về ngân hàng.

---

## 2. Công nghệ Sử dụng

- **Framework**: React Native 0.81, Expo SDK 54, React 19
- **Điều hướng (Routing)**: `expo-router` v6 (File-based Routing kết hợp Bottom Tabs & Stack Screens)
- **Icons**: `@expo/vector-icons` (`Ionicons`, `MaterialCommunityIcons`)
- **Theme**: Design System "Mộc" (Terracotta `#c5573e`, Sand `#f8f7f3`, Charcoal `#292724`, Olive `#2f6844`)
- **Quản lý trạng thái**: React Context API (`AuthContext`)

---

## 3. Cấu trúc Thư mục Mobile App

```text
frontendApp/
├── app/
│   ├── (tabs)/                      # Thanh điều hướng 5 Tab chính
│   │   ├── _layout.tsx              # Cấu hình thanh Tab Bar chuẩn Mộc
│   │   ├── index.tsx                # Tab 1: Khám phá / Trang chủ (Banner, Live Auction, Đồ mới)
│   │   ├── explore.tsx              # Tab 2: Tìm kiếm & Lọc (Đấu giá, Bán lẻ, Trao đổi, Pass)
│   │   ├── create.tsx               # Tab 3: Đăng tin 7 bước di động hỗ trợ AI
│   │   ├── messages.tsx             # Tab 4: Tin nhắn & Hội thoại đàm phán giá
│   │   └── profile.tsx              # Tab 5: Tài khoản, Thẻ Ví Mộc, Lối tắt giao dịch
│   │
│   ├── product/
│   │   └── [id].tsx                 # Chi tiết sản phẩm (SALE / BARTER / PASS)
│   ├── auction/
│   │   └── [id].tsx                 # Chi tiết phiên Đấu giá & Modal Proxy Bidding
│   ├── order/
│   │   ├── index.tsx                # Danh sách đơn mua & đơn bán của tôi
│   │   └── [id].tsx                 # Chi tiết đơn hàng, Escrow 5 bước & Mã QR Safe Meetup
│   ├── chat/
│   │   └── [id].tsx                 # Phòng chat đàm phán trả giá kèm thẻ sản phẩm
│   ├── wallet/
│   │   ├── index.tsx                # Quản lý ví số dư khả dụng & phong tỏa cọc
│   │   └── withdraw.tsx             # Yêu cầu rút tiền về tài khoản ngân hàng
│   ├── verification/
│   │   └── index.tsx                # Nộp hồ sơ định danh eKYC CCCD gắn chip
│   ├── dispute/
│   │   ├── index.tsx                # Danh sách khiếu nại của tôi
│   │   └── create.tsx               # Mở khiếu nại (bằng chứng hình ảnh)
│   ├── notifications/
│   │   └── index.tsx                # Hộp thư thông báo đẩy cá nhân hóa
│   └── _layout.tsx                  # Root Stack Layout bọc AuthProvider
│
├── components/                      # Các thành phần giao diện tái sử dụng
│   ├── ProductCard.tsx              # Thẻ sản phẩm chuẩn di động
│   ├── AuctionCard.tsx              # Thẻ đấu giá có đồng hồ đếm ngược
│   ├── EscrowTimeline.tsx           # Tiến trình 5 bước ký gửi Escrow
│   └── SafeSpotCard.tsx             # Thẻ hiển thị điểm hẹn an toàn
│
├── constants/
│   └── theme.ts                     # Bộ mã màu & font chữ Design System "Mộc"
├── contexts/
│   └── AuthContext.tsx              # Quản lý thông tin đăng nhập người dùng (Minh Anh)
├── mock/
│   └── mockData.ts                  # Dữ liệu giả lập thực tế đồng bộ từ frontendWeb
└── types/
    └── index.ts                     # Kiểu dữ liệu TypeScript khớp 100% với CSDL
```

---

## 4. Các Màn hình & Tính năng Cốt lõi

1. **Khám phá & Trang chủ (`(tabs)/index.tsx`)**:
   - Logo Mộc, ví tiền nhanh, chuông thông báo.
   - Banner Escrow & Điểm hẹn an toàn Safe Meetup.
   - Danh mục ngang: Điện tử, Nội thất, Đồng hồ, Xe cộ, Đồ bếp.
   - Sàn đấu giá trực tiếp: Thẻ đấu giá đếm ngược thời gian thực.
   - Lưới sản phẩm đồ mới lên sàn 2 cột.

2. **Tìm kiếm & Bộ lọc (`(tabs)/explore.tsx`)**:
   - Tìm kiếm từ khóa theo tên, danh mục, mô tả.
   - Lọc nhanh theo hình thức: **Tất cả**, **Đấu giá**, **Mua ngay**, **Trao đổi**, **Pass tặng**.

3. **Đăng tin Đa bước Hỗ trợ AI (`(tabs)/create.tsx`)**:
   - Nút **"AI Điền Tự Động"**: Tự động sinh tiêu đề, mô tả và gợi ý giá thị trường.
   - Chọn loại hình (Bán lẻ / Đấu giá / Trao đổi / Pass đồ), tải ảnh, phân loại và chọn Điểm hẹn an toàn Safe Spot.

4. **Hội thoại & Đàm phán Giá (`(tabs)/messages.tsx` & `chat/[id].tsx`)**:
   - Danh sách đoạn chat, thẻ sản phẩm ghim đầu màn hình.
   - Khối đàm phán trả giá (Price Offer) tương tác trong khung chat.

5. **Chi tiết Đơn hàng & Quét mã QR (`order/[id].tsx`)**:
   - Thanh tiến trình 5 bước Escrow (Đặt cọc -> Mộc khóa tiền -> Hẹn gặp Safe Spot -> Quét QR nhận đồ -> Giải ngân).
   - **Mã QR & mã PIN 6 số** xuất trình cho người bán khi kiểm hàng hài lòng.
   - Nút **Mở khiếu nại (Dispute)** nếu hàng có lỗi hoặc sai mô tả.

6. **Chi tiết Đấu giá & Proxy Bidding (`auction/[id].tsx`)**:
   - Bảng đếm ngược giờ:phút:giây nổi bật.
   - Bảng lịch sử đặt giá gần nhất (Bid history).
   - Form đặt giá thủ công và Modal thiết lập giá trần **Proxy Bidding**.

7. **Ví Điện Tử Mộc Escrow (`wallet/index.tsx` & `wallet/withdraw.tsx`)**:
   - Xem chi tiết số dư khả dụng và số dư phong tỏa cọc.
   - Nạp tiền VNPAY và biểu mẫu rút tiền về Vietcombank, Techcombank,...

---

## 5. Hướng dẫn Cài đặt & Khởi chạy

### 5.1. Cài đặt thư viện
```bash
cd frontendApp
npm install
```

### 5.2. Khởi chạy ứng dụng
```bash
npm start
# hoặc npx expo start
```

### 5.3. Xem trên thiết bị
- **Thiết bị thật (Android / iOS)**: Mở ứng dụng **Expo Go** trên điện thoại (cùng mạng Wi-Fi với máy tính) và quét mã QR hiển thị trên Terminal.
- **Trình duyệt Web**: Nhấn phím `w` trên terminal để chạy trên giao diện web di động (`http://localhost:8081`).
- **Máy ảo Android**: Nhấn phím `a` để mở Android Emulator.
- **Máy ảo iOS**: Nhấn phím `i` để mở iOS Simulator (trên máy macOS).

---

## 6. Hướng dẫn Xử lý Sự cố & Khắc phục Lỗi (Troubleshooting)

### 6.1. Lỗi lệch phiên bản SDK giữa Expo Go và Dự án (SDK 54 vs SDK 57)
- **Dấu hiệu**: Khi quét mã QR bằng điện thoại, Expo Go báo:
  > *"The installed version of Expo Go is for SDK 57.0.0. The project you opened uses SDK 54."*
- **Nguyên nhân**: Ứng dụng Expo Go tải từ Google Play hoặc App Store vừa được tự động cập nhật lên SDK mới nhất, trong khi dự án đang chạy Expo SDK 54 ổn định.
- **Cách khắc phục**:
  1. **Cách 1 (Nhanh nhất)**: Chạy kiểm thử trên giao diện Web:
     ```bash
     npx expo start --web
     # hoặc bấm phím w trên terminal, truy cập http://localhost:8081
     ```
  2. **Cách 2 (Trên Android)**: Tải và cài đặt file APK **Expo Go tương thích SDK 54**:
     - Tải từ kho lưu trữ Expo GitHub Releases: [Expo Go APK Releases](https://github.com/expo/expo/releases) (tìm bản dành cho SDK 54).
     - Hoặc tải từ APKPure phiên bản Expo Go 2.32.x tương thích SDK 54.
  3. **Cách 3 (Development Build)**: Tạo bản build phát triển riêng không phụ thuộc Expo Go:
     ```bash
     npx expo run:android
     ```
   4. **Cách 4** (Trên IOS): 
    - Do Apple App Store không cho phép cài đặt lại phiên bản cũ của Expo Go, mở trình duyệt Safari trên iPhone gõ `http://<IP_máy_tính>:8081`. Bạn có thể bấm nút "Thêm vào Màn hình chính" (Add to Home Screen) trên Safari để sử dụng y hệt một Native App thật!
     ```

---

### 6.2. Cảnh báo gói thư viện phiên bản khuyến nghị (`The following packages should be updated...`)
- **Dấu hiệu**: Terminal xuất hiện cảnh báo màu vàng khi chạy `npx expo start`:
  > *"The following packages should be updated for best compatibility with the installed expo version: expo@54.0.36 - expected version: ~54.0.37..."*
- **Cách khắc phục**: Chạy lệnh sửa chữa tự động của Expo để căn chỉnh đúng phiên bản patch:
  ```bash
  npx expo install --fix
  ```

---

### 6.3. Lỗi điện thoại không quét được QR hoặc đơ ở 0% (Không tải được bundle)
- **Dấu hiệu**: Expo Go mở ra nhưng báo *"Could not connect to the development server"* hoặc màn hình trắng đơ 0%.
- **Nguyên nhân**: Điện thoại và máy tính không cùng một dải mạng Wi-Fi, hoặc router bật chế độ cách ly bảo mật (AP Isolation), hoặc Windows Defender Firewall đang chặn port Metro (8081).
- **Cách khắc phục**:
  1. Đảm bảo cả điện thoại và máy tính kết nối vào **cùng một mạng Wi-Fi** (không dùng 4G/5G).
  2. Bật chế độ kết nối qua đám mây (Tunnel):
     ```bash
     npx expo start --tunnel
     ```
  3. Mở **Windows Defender Firewall** và cho phép `Node.js JavaScript Runtime` nhận kết nối Private Network.

---

### 6.5. Lỗi Cache Metro / Giao diện không phản hồi thay đổi mã nguồn
- **Dấu hiệu**: Đã sửa mã nguồn nhưng màn hình Expo không cập nhật hoặc báo lỗi component cũ.
- **Cách khắc phục**: Xóa sạch bộ nhớ đệm Metro Bundler:
  ```bash
  npx expo start -c
  # hoặc
  npm start -- -c
  ```
- Trên điện thoại: Lắc nhẹ điện thoại để mở Dev Menu của Expo Go -> bấm **Reload**.



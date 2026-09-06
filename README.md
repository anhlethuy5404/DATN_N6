# Đề tài Mua bán, trao đổi và đấu giá đồ cũ

Dự án này bao gồm:
- **Backend**: Node.js, Express, Prisma ORM (MariaDB/MySQL)
- **Frontend Web**: React.js + Vite
- **Frontend App**: React Native & Expo Go
- **Database**: MySQL của Aiven

---

## Yêu cầu cài đặt (Prerequisites)

1. **Node.js**: Phiên bản 18.x hoặc 20.x trở lên 
2. **Trình quản lý gói**: `npm` (đã đi kèm với Node.js)
3. **Database**: MySQL
4. **Git**
5. **Expo CLI** (Dành cho làm App): Tải ứng dụng Expo Go để test app
6. **Editor**: VSCode với các extension hỗ trợ Prisma, ESLint, TypeScript

---

## Hướng dẫn cài đặt & Chạy dự án (Setup Instructions)

Clone dự án về máy:
```bash
git clone <đường-dẫn-repo>
cd DATN_N6
```

### 1. Cài đặt và chạy Backend (`backend`)

**Bước 1:** Di chuyển vào thư mục backend và cài thư viện:
```bash
cd backend
npm install
```

**Bước 2:** Cấu hình biến môi trường:
- Copy file `.env.example` thành file `.env`
- Mở file `.env` và điền các thông tin

**Bước 3:** Cài đặt database với Prisma:
```bash
# Tạo prisma client
npm run prisma:generate
# hoặc npx prisma generate

# Đẩy schema vào database (tạo các bảng)
npm run prisma:dbpush
# hoặc npx prisma db push

# Xem database
npm run prisma:studio
# hoặc npx prisma studio
```

**Bước 4:** Chạy server backend (môi trường dev):
```bash
npm run dev
```

---

### 2. Cài đặt và chạy Frontend Web (`frontendWeb`)

**Bước 1:** Di chuyển vào thư mục `frontendWeb` và cài đặt thư viện:
```bash
cd frontendWeb
npm install
```

**Bước 2:** Khởi chạy giao diện web:
```bash
npm run dev
```
Mở trình duyệt và truy cập vào đường dẫn mà Vite hiển thị (thường là `http://localhost:5173`).

---

### 3. Cài đặt và chạy Frontend App (`frontendApp`)

**Bước 1:** Di chuyển vào thư mục `frontendApp` và cài đặt thư viện:
```bash
cd frontendApp
npm install
```

**Bước 2:** Khởi chạy app:
```bash
npm start
```

**Bước 3:** Chạy trên thiết bị thật hoặc máy ảo:
- **Thiết bị thật:** Mở ứng dụng Expo Go trên điện thoại (đảm bảo điện thoại và máy tính cùng chung một mạng Wifi), quét mã QR hiển thị trên Terminal
- **Máy ảo (Emulator):** Bấm phím `a` trên terminal để chạy trên Android Emulator hoặc `i` để chạy trên iOS Simulator (yêu cầu máy Mac và Xcode)

---

## Hướng dẫn chi tiết

- [Frontend Web - Sàn Giao Dịch, Đấu Giá & Trao Đổi Đồ Cũ Guide](frontendWeb/README.md)
- [Backend - DDD & Clean Architecture Guide](backend/README.md)
- [Frontend App - Ứng dụng Di động React Native & Expo Guide](frontendApp/README.md)

---

## Bảng Cổng Dịch Vụ Mặc Định (Port Mapping)

| Dịch vụ | Thư mục | Port Mặc định | Ghi chú |
| :--- | :--- | :--- | :--- |
| **Frontend Web** | `frontendWeb/` | `5173` | Chạy trên Vite (`http://localhost:5173`). Đổi qua `VITE_PORT` trong `.env`. |
| **Backend API** | `backend/` | `3000` | Chạy trên Express (`http://localhost:3000`). Đổi qua `PORT` trong `.env`. |
| **Prisma Studio** | `backend/` | `5555` | Quản trị CSDL giao diện Web (`http://localhost:5555`). |
| **Frontend App** | `frontendApp/` | `8081` | Metro Bundler cho Expo Go / React Native. |

---

## 🛠️ Hướng dẫn Xử lý Sự cố Thường gặp (Troubleshooting)

### 1. Sự cố Mobile App (`frontendApp`)

| Lỗi / Hiện tượng | Nguyên nhân | Cách khắc phục |
| :--- | :--- | :--- |
| **Lệch phiên bản SDK (SDK 57 vs SDK 54)** | Expo Go trên điện thoại tự cập nhật lên SDK 57, dự án dùng SDK 54 ổn định. | **Cách 1**: Mở nhanh trên Web bằng cách ấn `w` (hoặc truy cập `http://localhost:8081`).<br>**Cách 2**: Cài file APK Expo Go bản SDK 54 từ [Expo GitHub Releases](https://github.com/expo/expo/releases). |
| **Thanh Tab Bar bị thấp / che mất chữ** | Android bật chế độ tràn viền `edgeToEdgeEnabled` nhưng chưa có `Safe Area Insets`. | Đã cấu hình `<SafeAreaProvider>` và `useSafeAreaInsets()` trong code layout; đảm bảo dùng `tabBarLabelPosition: 'below-icon'`. |
| **Không quét được mã QR / Đơ ở 0%** | Khác dải mạng Wi-Fi hoặc tường lửa Windows chặn cổng Metro (8081). | Đảm bảo PC và điện thoại chung mạng Wi-Fi, hoặc chạy chế độ tunnel: `npx expo start --tunnel`. |
| **Cảnh báo phiên bản gói (`expected ~54.0.37...`)** | Sai lệch bản vá nhỏ (patch version) giữa các gói expo. | Chạy lệnh `npx expo install --fix` để tự động căn chỉnh. |
| **Giao diện không cập nhật sau khi sửa code** | Metro Bundler lưu cache cũ. | Chạy lại với cờ xóa cache: `npx expo start -c`. |

### 2. Sự cố Backend (`backend`)

| Lỗi / Hiện tượng | Nguyên nhân | Cách khắc phục |
| :--- | :--- | :--- |
| **Prisma không kết nối được CSDL** | Sai `DATABASE_URL` trong file `.env` hoặc IP chưa được whitelist trên Aiven/MySQL. | Kiểm tra lại chuỗi kết nối trong `backend/.env`, kiểm tra trạng thái DB server. |
| **Trùng cổng `3000` (EADDRINUSE)** | Có tiến trình Node.js khác đang chiếm port 3000. | Đổi `PORT=3001` trong `backend/.env` hoặc tắt tiến trình cũ. |

### 3. Sự cố Frontend Web (`frontendWeb`)

| Lỗi / Hiện tượng | Nguyên nhân | Cách khắc phục |
| :--- | :--- | :--- |
| **Không gọi được API Backend (CORS / Network Error)** | Backend chưa chạy hoặc cấu hình `VITE_API_BASE_URL` sai port. | Đảm bảo Backend đã chạy ở cổng tương ứng (mặc định `3000`) và cập nhật `frontendWeb/.env`. |

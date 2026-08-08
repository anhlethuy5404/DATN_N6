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

# Đẩy schema vào database (tạo các bảng)
npm run prisma:dbpush

# Xem database
npx prisma studio
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

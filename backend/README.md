# Backend - DDD & Clean Architecture

Hướng dẫn cấu trúc mã nguồn theo **Domain-Driven Design (DDD)** và **Clean Architecture**.

## Tổng quan cấu trúc

```text
src/
├── modules/  
│   └── identity/                                # Bounded Context: Người dùng & Danh tính
│       ├── 1.domain/                            # TẦNG 1: DOMAIN LAYER 
│       │   ├── models/                          # Các Thực thể (Entities)
│       │   │   ├── user.entity.ts               # Thực thể Người dùng (Aggregate Root)
│       │   │   ├── user-address.entity.ts       # Thực thể Địa chỉ
│       │   │   ├── user-kyc.entity.ts           # Thực thể Hồ sơ KYC
│       │   │   
│       │   ├── repositories/                    # Các Cổng Giao tiếp (Interfaces / Ports)
│       │   │   ├── user.repository.interface.ts # Interface khai báo CRUD cho Người dùng
│       │   │   ├── address.repository.interface.ts
│       │   │   ├── kyc.repository.interface.ts
│       │   │   └── token-service.interface.ts   # Interface cho dịch vụ JWT
│       │   └── events/                          # Các Sự kiện miền (Domain Events)
│       │       ├── user-registered.event.ts     # Sự kiện khi đăng ký thành công
│       │       └── kyc-verified.event.ts        # Sự kiện khi eKYC được duyệt
│       │
│       ├── 2.application/                       # TẦNG 2: APPLICATION LAYER
│       │   ├── usecases/                        # Các ca sử dụng nghiệp vụ độc lập
│       │   │   ├── commands/                    # Tác vụ thay đổi dữ liệu (Ghi)
│       │   │   │   ├── register-user.usecase.ts
│       │   │   │   ├── login-user.usecase.ts
│       │   │   │   ├── submit-kyc.usecase.ts    # Nộp hồ sơ CCCD
│       │   │   │   ├── verify-kyc.usecase.ts    # Duyệt KYC
│       │   │   │   └── create-address.usecase.ts
│       │   │   └── queries/                     # Tác vụ đọc dữ liệu (Truy vấn)
│       │   │       ├── get-user-profile.usecase.ts
│       │   │       ├── get-user-addresses.usecase.ts
│       │   │       └── get-kyc-status.usecase.ts
│       │   └── dtos/                            # Định dạng dữ liệu truyền (Request & Response schemas)
│       │       ├── register-user.dto.ts
│       │       ├── submit-kyc.dto.ts
│       │       └── user-response.dto.ts
│       │
│       ├── 3.infrastructure/                    # TẦNG 3: INFRASTRUCTURE LAYER
│       │   ├── repositories/                    # Triển khai các Interface của Domain bằng Prisma Client
│       │   │   ├── prisma-user.repository.ts    # Triển khai cho user.repository.interface.ts
│       │   │   ├── prisma-address.repository.ts
│       │   │   └── prisma-kyc.repository.ts
│       │   └── services/                        # Triển khai các dịch vụ bên ngoài
│       │       └── jwt-token.service.ts         # Triển khai cho token-service.interface.ts
│       │
│       └── 4.presentation/                      # TẦNG 4: PRESENTATION LAYER 
│           ├── controllers/                     # Nhận HTTP request, gọi UseCase, trả về JSON
│           │   ├── auth.controller.ts           # Xử lý Đăng nhập, Đăng ký
│           │   ├── user.controller.ts           # Xử lý Hồ sơ
│           │   ├── address.controller.ts        # Xử lý sổ địa chỉ
│           │   └── kyc.controller.ts            # Xử lý tải lên và duyệt eKYC
│           ├── routes/
│           │   └── identity.route.ts            # Định nghĩa Express Router & Swagger Doc JSDoc
│           └── middlewares/
│               └── kyc-upload.middleware.ts     # Middleware nhận ảnh CCCD & selfie
│
├── shared/                     # Tầng Dùng chung (Shared code)
│   ├── http/                   # Các tiện ích HTTP
│   │   ├── controller/         # Các Base controllers
│   │   ├── middleware/         # Các Express middleware dùng chung
│   │   ├── routes/             # Các Route dùng chung
│   │   └── utils/
│   │       └── response.ts     # Trình định dạng phản hồi
│   ├── infrastructure/         # Lớp cơ sở hạ tầng dùng chung
│   │   ├── database/
│   │   │   └── config.ts       # Kết nối CSDL
│   │   └── external/           # Dịch vụ bên thứ ba dùng chung
│   │       ├── cloudinary/     # Dịch vụ Cloudinary
│   │       └── firebase/       # Dịch vụ Firebase
│   ├── types/                  # Kiểu dữ liệu dùng chung
│   │   └── api.ts              # Kiểu dữ liệu API
│   └── utils/                  # Tiện ích chung
│       ├── formatter.ts        # Tiện ích định dạng
│       └── env.ts              # Quản lý biến môi trường
│
├── app.ts                      # Cấu hình ứng dụng Express
└── index.ts                    # Điểm vào chính của ứng dụng
```

## Giải thích chi tiết

### 1️⃣ **Domain Layer** (`domain/`)
Lõi của logic nghiệp vụ, hoàn toàn độc lập với framework hay thư viện bên ngoài.

#### `entities/`
- Định nghĩa các đối tượng nghiệp vụ chính yếu của hệ thống.
- Chứa các quy tắc, điều kiện kiểm tra (validation) và hành vi của đối tượng.
- Hoàn toàn không phụ thuộc hay biết về cấu trúc của cơ sở dữ liệu.

#### `repositories/` (Interfaces)
- Định nghĩa **giao diện (interface)** cho các thao tác lưu trữ dữ liệu (chưa có code thực thi).
- Đóng vai trò là bản hợp đồng để các tầng khác sử dụng Dependency Injection tiêm các bản thực thi vào.

#### `services/`
- Chứa logic nghiệp vụ phức tạp liên quan đến nhiều thực thể (entity) cùng lúc.
- Tương tác với kho lưu trữ thông qua các interface.

---

### 2️⃣ **Application Layer** (`application/`)
Lớp trung gian kết nối giữa tầng giao diện và tầng nghiệp vụ lõi.

#### `dto/` (Data Transfer Objects)
- Định hình và kiểm soát cấu trúc dữ liệu đầu vào và đầu ra.
- Thực hiện kiểm tra tính hợp lệ (validate input) của dữ liệu gửi lên từ client.

#### `use-cases/` (Application Services)
- Phối hợp (Orchestrate) các đối tượng nghiệp vụ để hoàn thành một quy trình cụ thể.
- Quản lý giao dịch (transactions).
- Điều phối sự tương tác với các dịch vụ ở tầng hạ tầng (infrastructure).
- Nhận và trả dữ liệu thông qua các DTO.

---

### 3️⃣ **Infrastructure Layer** (`infrastructure/`)
Chịu trách nhiệm về chi tiết kỹ thuật: kết nối cơ sở dữ liệu, gọi API bên thứ ba, bộ nhớ đệm, v.v.

#### Triển khai Repository (Repository Implementation)
- Tạo các lớp (class) thực thi (implement) các interface repository đã được định nghĩa ở tầng Domain.
- Sử dụng các công cụ ORM (như Prisma) hoặc Query Builder để tương tác trực tiếp với cơ sở dữ liệu (thực hiện các thao tác thêm, sửa, xóa, lấy dữ liệu).
- Đảm nhận việc ánh xạ (mapping) từ định dạng của cơ sở dữ liệu sang các đối tượng Entity chuẩn của hệ thống và ngược lại.

#### Các dịch vụ bên ngoài (External Services)
- Xây dựng các lớp kết nối và giao tiếp với hệ thống của bên thứ ba (như dịch vụ gửi email, lưu trữ ảnh Cloudinary, cổng thanh toán, Firebase...).
- Triển khai code thực tế cho các interface dịch vụ đã được quy định ở tầng Domain nhằm đảm bảo tính trừu tượng.

---

### 4️⃣ **Presentation Layer** (`presentation/`)
Cổng tiếp nhận yêu cầu từ người dùng thông qua giao thức HTTP - xử lý API request và response.

#### Bộ điều khiển (Controllers)
- Đóng vai trò tiếp nhận yêu cầu (request) từ client, trích xuất các thông tin cần thiết (body, query, params) và khởi tạo các đối tượng DTO tương ứng.
- Gọi trực tiếp đến các Use-case ở tầng Application để tiến hành xử lý nghiệp vụ, tuyệt đối không tự viết logic nghiệp vụ tại đây.
- Lấy kết quả từ Use-case, kết hợp với các công cụ định dạng (Response Formatter) để gửi JSON về cho client kèm mã trạng thái HTTP thích hợp.

#### Các tuyến đường (Routes)
- Định nghĩa các điểm cuối (endpoints) cho API và gắn đúng các phương thức HTTP (GET, POST, PUT, DELETE...) cho từng chức năng.
- Khai báo và áp dụng các middleware cần thiết (ví dụ: kiểm tra đăng nhập, xác thực quyền truy cập, nhận diện file tải lên) trước khi chuyển yêu cầu tới Controller.
- Ứng dụng Swagger hoặc JSDoc tại đây để tự động hóa việc xuất tài liệu tham khảo cho hệ thống API.

---

### 5️⃣ **Shared Layer** (`shared/`)
Nơi lưu trữ các thành phần, cấu hình và tiện ích dùng chung cho toàn bộ dự án để tránh lặp code.

#### Tiện ích (Utils)
- Tạo ra các hàm nhỏ, độc lập giúp xử lý các công việc phổ biến lặp đi lặp lại như định dạng ngày tháng, thao tác chuỗi, hoặc đọc biến môi trường.
- Đảm bảo các hàm tiện ích này là các hàm thuần túy (pure functions), hoàn toàn không chứa bất kỳ logic nghiệp vụ riêng biệt nào của các module.

#### Định dạng phản hồi (Response Formatter)
- Định nghĩa một quy chuẩn thống nhất về cấu trúc JSON trả về cho mọi API của hệ thống (bao gồm trạng thái thành công/thất bại, mã lỗi, thông báo, và khối dữ liệu).
- Xây dựng các hàm hỗ trợ (helpers) để dễ dàng bọc dữ liệu thành công hoặc bắt các lỗi (errors) rồi định dạng trước khi chuyển về Presentation Layer.

---

## 🔄 Luồng yêu cầu (Ví dụ)

```text
HTTP Request
    ↓
┌──────────────────────────────────────────────┐
│ Tầng Giao diện (Presentation Layer)          │
│ - Trích xuất dữ liệu từ yêu cầu (request)    │
│ - Khởi tạo đối tượng DTO                     │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ Tầng Ứng dụng (Application Layer)            │
│ - Kiểm tra (Validate) tính hợp lệ của DTO    │
│ - Điều phối luồng xử lý nghiệp vụ            │
│ - Gọi các dịch vụ của tầng Domain            │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ Tầng Nghiệp vụ lõi (Domain Layer)            │
│ - Khởi tạo & kiểm tra Thực thể (Entity)      │
│ - Áp dụng các quy tắc chặt chẽ của miền      │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ Tầng Cơ sở hạ tầng (Infrastructure Layer)    │
│ - Thực thi truy vấn cơ sở dữ liệu            │
│ - Lưu trữ dữ liệu và tương tác API ngoài     │
└──────────────────────────────────────────────┘
    ↓
HTTP Response (Phản hồi đã được định dạng chuẩn)
```

---

## 📝 Danh sách kiểm tra khi tạo Module mới

Khi tạo một module mới (VD: `products`), làm theo các bước sau:

- [ ] Tạo thư mục mới `src/modules/products/`
- [ ] Tạo thư mục con `domain/` chứa entities & repositories
- [ ] Tạo thư mục con `application/` chứa DTOs & use-cases
- [ ] Tạo thư mục con `infrastructure/` chứa các class thực thi repository
- [ ] Tạo thư mục con `presentation/` chứa controllers & routes
- [ ] Export các routes từ `presentation/routes/index.ts`
- [ ] Register module routes vào `src/app.ts`
- [ ] Bổ sung Prisma model vào database schema (nếu có)
- [ ] Viết unit tests cho mỗi tầng tương ứng

---

import {
  User,
  Category,
  Product,
  AuctionSession,
  AuctionBid,
  ChatRoom,
  ChatMessage,
  Order,
  SafeMeetupSpot,
  Wallet,
  WalletTransaction,
  Dispute,
  ProductReport,
  Notification,
  UserKyc
} from '../types'

export const formatVND = (num: number): string => {
  return new Intl.NumberFormat('vi-VN').format(num) + ' ₫'
}

export const mockUsers: Record<string, User> = {
  USER: {
    id: 'USR-1001',
    email: 'minhanh@example.com',
    username: 'minhanh',
    fullName: 'Minh Anh',
    phoneNumber: '0912345678',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    role: 'USER',
    trustScore: 98,
    kycStatus: 'VERIFIED',
    status: 'ACTIVE',
    createdAt: '2022-03-15'
  },
  MODERATOR: {
    id: 'USR-1004',
    email: 'duc.nguyen@moc.vn',
    username: 'nguyenduc_mod',
    fullName: 'Nguyễn Đức',
    phoneNumber: '0988776655',
    role: 'MODERATOR',
    trustScore: 99,
    kycStatus: 'VERIFIED',
    status: 'ACTIVE',
    createdAt: '2021-06-10'
  },
  ADMIN: {
    id: 'USR-ADMIN',
    email: 'admin@moc.vn',
    username: 'admin_moc',
    fullName: 'Quản trị viên Mộc',
    phoneNumber: '0900000000',
    role: 'ADMIN',
    trustScore: 100,
    kycStatus: 'VERIFIED',
    status: 'ACTIVE',
    createdAt: '2020-01-01'
  }
}

export const mockCategories: Category[] = [
  { id: 1, name: 'Đồ điện tử & Máy ảnh', slug: 'dien-tu-may-anh', status: 'ACTIVE', children: ['Máy ảnh', 'Ống kính', 'Điện thoại', 'Laptop', 'Phụ kiện'] },
  { id: 2, name: 'Nội thất & Decor', slug: 'noi-that-decor', status: 'ACTIVE', children: ['Ghế & Bàn', 'Đèn vintage', 'Kệ gỗ', 'Thảm trang trí'] },
  { id: 3, name: 'Đồng hồ & Phụ kiện', slug: 'dong-ho-phu-kien', status: 'ACTIVE', children: ['Đồng hồ cơ', 'Đồng hồ vintage', 'Ví da', 'Thắt lưng'] },
  { id: 4, name: 'Xe cộ & Thể thao', slug: 'xe-co-the-thao', status: 'ACTIVE', children: ['Xe đạp touring', 'Phụ tùng xe', 'Ván trượt'] },
  { id: 5, name: 'Đồ gia dụng & Bếp', slug: 'gia-dung-bep', status: 'ACTIVE', children: ['Dụng cụ pha cà phê', 'Dao bếp Nhật', 'Gốm sứ mộc'] }
]

export const mockProducts: Product[] = [
  {
    id: '1',
    sellerId: 'USR-1002',
    sellerName: 'Minh Studio',
    sellerTrustScore: 98,
    sellerRating: 4.9,
    categoryId: 1,
    categoryName: 'Đồ điện tử & Máy ảnh',
    title: 'Máy ảnh Fujifilm X-T30 II kèm kit 18-55mm F2.8-4',
    description: 'Máy chụp khoảng 4000 shots, ngoại hình đẹp như mới, đầy đủ hộp, sạc zin và 2 pin dự phòng. Cảm biến X-Trans IV sắc nét, màu giả lập phim Classic Chrome tuyệt đẹp.',
    condition: 'LIKE_NEW',
    transactionType: 'SALE',
    status: 'ACTIVE',
    provinceName: 'Hà Nội',
    districtName: 'Cầu Giấy',
    detailedLocation: '12 Trần Thái Tông, Cầu Giấy, Hà Nội',
    viewsCount: 1420,
    likesCount: 86,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=85'
    ],
    primaryImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85',
    salePrice: 15500000,
    allowNegotiation: true,
    createdAt: '2026-09-01',
    updatedAt: '2026-09-05'
  },
  {
    id: '2',
    sellerId: 'USR-1005',
    sellerName: 'Nhà của Mây',
    sellerTrustScore: 100,
    sellerRating: 5.0,
    categoryId: 2,
    categoryName: 'Nội thất & Decor',
    title: 'Ghế lounge da bò nâu vintage phong cách Bắc Âu',
    description: 'Chất liệu da bò thật màu nâu sáp cao cấp, chân gỗ óc chó tự nhiên chắc chắn. Rất êm ái khi đọc sách hoặc thư giãn.',
    condition: 'USED_GOOD',
    transactionType: 'SALE',
    status: 'ACTIVE',
    provinceName: 'TP. Hồ Chí Minh',
    districtName: 'Thảo Điền, TP. Thủ Đức',
    detailedLocation: 'Khu biệt thự Thảo Điền, Quận 2, TP. HCM',
    viewsCount: 980,
    likesCount: 114,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85'
    ],
    primaryImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85',
    salePrice: 3200000,
    allowNegotiation: false,
    createdAt: '2026-08-28',
    updatedAt: '2026-09-02'
  },
  {
    id: '3',
    sellerId: 'USR-1002',
    sellerName: 'Huy Vintage',
    sellerTrustScore: 95,
    sellerRating: 4.7,
    categoryId: 3,
    categoryName: 'Đồng hồ & Phụ kiện',
    title: 'Đồng hồ Seiko 5 Automatic cổ điển mặt số lục bảo',
    description: 'Đồng hồ cơ Nhật Bản sản xuất thập niên 90, máy 7S26 còn chạy chính xác, kính Hardlex xước dăm siêu nhẹ khó thấy. Dây thép demi nguyên bản.',
    condition: 'USED_GOOD',
    transactionType: 'AUCTION',
    status: 'ACTIVE',
    provinceName: 'Hà Nội',
    districtName: 'Ba Đình',
    detailedLocation: 'Quán Thánh, Ba Đình, Hà Nội',
    viewsCount: 2340,
    likesCount: 167,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85'
    ],
    primaryImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
    auctionId: 'AUC-301',
    startPrice: 2000000,
    stepPrice: 100000,
    currentPrice: 2950000,
    bidsCount: 8,
    endTime: 'Hôm nay, 22:00 (Còn 05:42:18)',
    auctionStatus: 'ONGOING',
    createdAt: '2026-09-04',
    updatedAt: '2026-09-07'
  },
  {
    id: '4',
    sellerId: 'USR-1006',
    sellerName: 'Duy Bike',
    sellerTrustScore: 98,
    sellerRating: 4.9,
    categoryId: 4,
    categoryName: 'Xe cộ & Thể thao',
    title: 'Xe đạp touring Nhật Bản khung thép Cr-Mo bãi xịn',
    description: 'Xe touring bánh 700c, groupset Shimano Deore 3x9 tốc độ mượt mà, baga trước sau tải đồ đi phượt đường trường cực đầm.',
    condition: 'USED_GOOD',
    transactionType: 'AUCTION',
    status: 'ACTIVE',
    provinceName: 'Đà Nẵng',
    districtName: 'Thanh Khê',
    detailedLocation: 'Hà Huy Tập, Thanh Khê, Đà Nẵng',
    viewsCount: 1890,
    likesCount: 95,
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=85'
    ],
    primaryImage: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=85',
    auctionId: 'AUC-302',
    startPrice: 3000000,
    stepPrice: 100000,
    currentPrice: 4200000,
    bidsCount: 19,
    endTime: 'Ngày mai, 12:00 (Còn 08:26:04)',
    auctionStatus: 'ONGOING',
    createdAt: '2026-09-03',
    updatedAt: '2026-09-07'
  },
  {
    id: '5',
    sellerId: 'USR-1007',
    sellerName: 'Phúc Nguyễn',
    sellerTrustScore: 97,
    sellerRating: 4.8,
    categoryId: 2,
    categoryName: 'Nội thất & Decor',
    title: 'Bàn làm việc gỗ thông tự nhiên 1m2 x 60cm',
    description: 'Mình chuyển nhà nên muốn tặng lại bạn nào sinh viên hoặc người cần bàn học tập làm việc. Bàn còn rất chắc chắn, tự vận chuyển giúp mình nhé.',
    condition: 'USED_GOOD',
    transactionType: 'PASS',
    status: 'ACTIVE',
    provinceName: 'Hà Nội',
    districtName: 'Đống Đa',
    detailedLocation: 'Chùa Láng, Đống Đa, Hà Nội',
    viewsCount: 3120,
    likesCount: 240,
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=85'
    ],
    primaryImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=85',
    noteForPass: 'Ưu tiên các bạn sinh viên tân sinh viên nhập học cần bàn học nghiêm túc.',
    salePrice: 0,
    createdAt: '2026-09-05',
    updatedAt: '2026-09-06'
  },
  {
    id: '6',
    sellerId: 'USR-1008',
    sellerName: 'Bếp Cà Phê Mộc',
    sellerTrustScore: 96,
    sellerRating: 4.8,
    categoryId: 5,
    categoryName: 'Đồ gia dụng & Bếp',
    title: 'Cối xay cà phê tay Comandante C40 MK4 Liquid Amber',
    description: 'Cối xay thủ công đầu bảng của Đức, lưỡi sắc bén xay pour-over hay espresso đều đỉnh cao. Muốn giao lưu đổi máy ảnh film ngàm M42 hoặc đồng hồ vintage.',
    condition: 'LIKE_NEW',
    transactionType: 'BARTER',
    status: 'ACTIVE',
    provinceName: 'Hà Nội',
    districtName: 'Hai Bà Trưng',
    detailedLocation: 'Bạch Mai, Hai Bà Trưng, Hà Nội',
    viewsCount: 880,
    likesCount: 52,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=85'
    ],
    primaryImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=85',
    preferredExchangeItems: 'Máy ảnh film ngàm M42 (Pentax Spotmatic / Olympus OM-1) hoặc đồng hồ Seiko cơ',
    salePrice: 5800000,
    createdAt: '2026-09-06',
    updatedAt: '2026-09-07'
  }
]

export const mockAuctions: AuctionSession[] = [
  {
    id: 'AUC-301',
    productId: '3',
    productTitle: 'Đồng hồ Seiko 5 Automatic cổ điển mặt số lục bảo',
    productImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
    sellerId: 'USR-1002',
    sellerName: 'Huy Vintage',
    startPrice: 2000000,
    stepPrice: 100000,
    currentPrice: 2950000,
    winnerName: 'Minh Anh',
    startTime: '2026-09-06 08:00',
    endTime: '2026-09-07 22:00',
    status: 'ONGOING',
    bidsCount: 8,
    reAuctionCount: 0,
    maxReAuction: 3
  },
  {
    id: 'AUC-302',
    productId: '4',
    productTitle: 'Xe đạp touring Nhật Bản khung thép Cr-Mo bãi xịn',
    productImage: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=85',
    sellerId: 'USR-1006',
    sellerName: 'Duy Bike',
    startPrice: 3000000,
    stepPrice: 100000,
    currentPrice: 4200000,
    winnerName: 'Hoàng Long',
    startTime: '2026-09-05 10:00',
    endTime: '2026-09-08 12:00',
    status: 'ONGOING',
    bidsCount: 19,
    reAuctionCount: 0,
    maxReAuction: 3
  }
]

export const mockBids: AuctionBid[] = [
  { id: 'b1', auctionId: 'AUC-301', bidderId: 'USR-1001', bidderName: 'Minh Anh', bidAmount: 2950000, isAutoBid: false, createdAt: '3 phút trước' },
  { id: 'b2', auctionId: 'AUC-301', bidderId: 'USR-1009', bidderName: 'Lan Chi', bidAmount: 2850000, isAutoBid: false, createdAt: '15 phút trước' },
  { id: 'b3', auctionId: 'AUC-301', bidderId: 'USR-1010', bidderName: 'Quang Huy', bidAmount: 2750000, isAutoBid: true, createdAt: '1 giờ trước' },
  { id: 'b4', auctionId: 'AUC-301', bidderId: 'USR-1011', bidderName: 'Thảo Nguyên', bidAmount: 2650000, isAutoBid: false, createdAt: '3 giờ trước' }
]

export const mockSafeSpots: SafeMeetupSpot[] = [
  { id: 'SPOT-1', name: 'Highlands Coffee Duy Tân', address: 'Tòa nhà FPT, Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội', spotType: 'COFFEE' },
  { id: 'SPOT-2', name: 'Bưu điện Trung tâm Bờ Hồ', address: '75 Đinh Tiên Hoàng, Tràng Tiền, Hoàn Kiếm, Hà Nội', spotType: 'POST_OFFICE' },
  { id: 'SPOT-3', name: 'Phố Đi Bộ Nguyễn Huệ', address: 'Đường Nguyễn Huệ, Bến Nghé, Quận 1, TP. HCM', spotType: 'PUBLIC_CAM' }
]

export const mockOrders: Order[] = [
  {
    id: 'ORD-2048',
    orderCode: 'MOC-2048',
    buyerId: 'USR-1001',
    buyerName: 'Minh Anh',
    sellerId: 'USR-1002',
    sellerName: 'Minh Studio',
    sellerTrust: 98,
    productId: '1',
    productTitle: 'Máy ảnh Fujifilm X-T30 II kèm kit 18-55mm F2.8-4',
    productImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85',
    transactionType: 'SALE',
    amount: 15500000,
    shippingFee: 35000,
    totalAmount: 15535000,
    status: 'SHIPPING',
    shippingAddress: '12 Trần Thái Tông, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
    shippingCode: 'VNPOST927361',
    isDirectMeetup: false,
    qrVerificationCode: 'MOC-QR-2048-VERIFIED',
    createdAt: '06/09/2026',
    updatedAt: '07/09/2026'
  },
  {
    id: 'ORD-1982',
    orderCode: 'MOC-1982',
    buyerId: 'USR-1001',
    buyerName: 'Minh Anh',
    sellerId: 'USR-1005',
    sellerName: 'Nhà của Mây',
    sellerTrust: 100,
    productId: '2',
    productTitle: 'Ghế lounge da bò nâu vintage phong cách Bắc Âu',
    productImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85',
    transactionType: 'SALE',
    amount: 3200000,
    shippingFee: 80000,
    totalAmount: 3280000,
    status: 'COMPLETED',
    shippingAddress: '12 Trần Thái Tông, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
    isDirectMeetup: false,
    createdAt: '28/08/2026',
    updatedAt: '01/09/2026'
  },
  {
    id: 'ORD-1874',
    orderCode: 'MOC-1874',
    buyerId: 'USR-1001',
    buyerName: 'Minh Anh',
    sellerId: 'USR-1002',
    sellerName: 'Huy Vintage',
    sellerTrust: 95,
    productId: '3',
    productTitle: 'Đồng hồ Seiko 5 Automatic',
    productImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
    transactionType: 'AUCTION',
    amount: 5600000,
    shippingFee: 0,
    totalAmount: 5600000,
    status: 'DISPUTING',
    shippingAddress: '12 Trần Thái Tông, Cầu Giấy, Hà Nội',
    isDirectMeetup: true,
    meetupSpot: mockSafeSpots[0],
    createdAt: '18/08/2026',
    updatedAt: '06/09/2026'
  }
]

export const mockWallet: Wallet = {
  id: 'WAL-1001',
  userId: 'USR-1001',
  balance: 8450000,
  frozenBalance: 15500000,
  updatedAt: '2026-09-07 10:15'
}

export const mockWalletTransactions: WalletTransaction[] = [
  { id: 'tx-1', walletId: 'WAL-1001', type: 'ESCROW_LOCK', amount: 15535000, positive: false, status: 'SUCCESS', description: 'Ký quỹ Escrow bảo vệ đơn hàng #MOC-2048', createdAt: '06/09/2026 10:24' },
  { id: 'tx-2', walletId: 'WAL-1001', type: 'DEPOSIT', amount: 20000000, positive: true, vnpayTranNo: 'VNPAY-8827361', status: 'SUCCESS', description: 'Nạp tiền vào ví qua cổng VNPAY QR', createdAt: '06/09/2026 10:15' },
  { id: 'tx-3', walletId: 'WAL-1001', type: 'REFUND', amount: 3200000, positive: true, status: 'SUCCESS', description: 'Hoàn tiền hoàn tất tranh chấp ghế lounge vintage', createdAt: '28/08/2026 16:40' },
  { id: 'tx-4', walletId: 'WAL-1001', type: 'WITHDRAW', amount: 5000000, positive: false, status: 'SUCCESS', description: 'Rút tiền về Vietcombank STK ***789', createdAt: '20/08/2026 09:12' }
]

export const mockConversations: ChatRoom[] = [
  {
    id: 'conv-1',
    productId: '1',
    productTitle: 'Máy ảnh Fujifilm X-T30 II',
    productImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85',
    productPrice: 15500000,
    buyerId: 'USR-1001',
    buyerName: 'Minh Anh',
    sellerId: 'USR-1002',
    sellerName: 'Minh Studio',
    lastMessageAt: '10:42',
    lastMessageText: 'Mình đã đóng gói chống sốc 3 lớp và gửi VNPost rồi nhé!',
    unreadCount: 2,
    isOnline: true,
    status: 'ACTIVE'
  },
  {
    id: 'conv-2',
    productId: '2',
    productTitle: 'Ghế lounge da nâu vintage',
    productImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85',
    productPrice: 3200000,
    buyerId: 'USR-1001',
    buyerName: 'Minh Anh',
    sellerId: 'USR-1005',
    sellerName: 'Nhà của Mây',
    lastMessageAt: 'Hôm qua',
    lastMessageText: 'Dạ anh có muốn xem thêm video quay cận chất da không ạ?',
    unreadCount: 0,
    isOnline: false,
    status: 'ACTIVE'
  },
  {
    id: 'conv-3',
    productId: '4',
    productTitle: 'Xe đạp touring Nhật Bản',
    productImage: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=85',
    productPrice: 4200000,
    buyerId: 'USR-1001',
    buyerName: 'Minh Anh',
    sellerId: 'USR-1006',
    sellerName: 'Duy Bike',
    lastMessageAt: 'T2',
    lastMessageText: 'Giá chốt giao lưu hữu nghị mình hỗ trợ nửa phí ship nhé.',
    unreadCount: 0,
    isOnline: true,
    status: 'ACTIVE'
  }
]

export const mockChatMessages: ChatMessage[] = [
  { id: 'm1', roomId: 'conv-1', senderId: 'USR-1001', senderName: 'Minh Anh', messageType: 'TEXT', content: 'Chào bạn, máy ảnh này bạn dùng lâu chưa và có bớt chút lộc không?', isRead: true, createdAt: '10:15' },
  { id: 'm2', roomId: 'conv-1', senderId: 'USR-1002', senderName: 'Minh Studio', messageType: 'TEXT', content: 'Chào bạn! Máy mình dùng khoảng 6 tháng, chụp hơn 4k shots thôi, còn rất mới.', isRead: true, createdAt: '10:18' },
  { id: 'm3', roomId: 'conv-1', senderId: 'USR-1001', senderName: 'Minh Anh', messageType: 'OFFER', content: 'Đề xuất giá 15.000.000 ₫', offerPrice: 15000000, offerStatus: 'ACCEPTED', isRead: true, createdAt: '10:20' },
  { id: 'm4', roomId: 'conv-1', senderId: 'USR-1002', senderName: 'Minh Studio', messageType: 'TEXT', content: 'Ok bạn chốt 15 triệu, bạn đặt đơn qua hệ thống để mộc giữ tiền bảo đảm an tâm nhé!', isRead: true, createdAt: '10:22' },
  { id: 'm5', roomId: 'conv-1', senderId: 'USR-1002', senderName: 'Minh Studio', messageType: 'TEXT', content: 'Mình đã đóng gói chống sốc 3 lớp và gửi VNPost rồi nhé!', isRead: false, createdAt: '10:42' }
]

export const mockDisputes: Dispute[] = [
  {
    id: 'DSP-018',
    orderId: 'ORD-1874',
    orderCode: 'MOC-1874',
    openedBy: 'Minh Anh',
    buyerName: 'Minh Anh',
    sellerName: 'Huy Vintage',
    amount: 5600000,
    reason: 'Sản phẩm không đúng mô tả (Mặt kính đồng hồ có vết nứt dài)',
    status: 'UNDER_REVIEW',
    moderatorId: 'USR-1004',
    resolutionNote: 'Điều phối viên đã yêu cầu người bán đối chất và người mua gửi thêm video chụp cận cạnh kính viền.',
    createdAt: '06/09/2026',
    evidences: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85'
    ]
  },
  {
    id: 'DSP-014',
    orderId: 'ORD-1792',
    orderCode: 'MOC-1792',
    openedBy: 'Lan Chi',
    buyerName: 'Lan Chi',
    sellerName: 'Vintage Room',
    amount: 2950000,
    reason: 'Hàng giả, phát hiện nhái thương hiệu',
    status: 'RESOLVED_REFUND_BUYER',
    moderatorId: 'USR-1004',
    resolutionNote: 'Đã hoàn tiền 100% cho người mua từ quỹ Escrow và đình chỉ tài khoản người bán.',
    createdAt: '02/09/2026',
    resolvedAt: '04/09/2026'
  }
]

export const mockReports: ProductReport[] = [
  { id: 'RPT-221', reporterId: 'USR-1009', reporterName: 'Quốc Bảo', productId: '3', productTitle: 'Đồng hồ Rolex Submariner giá 500k', reasonType: 'SCAM', description: 'Nghi vấn lừa đảo cọc tiền rồi chặn số', status: 'PENDING', createdAt: '07/09/2026' },
  { id: 'RPT-220', reporterId: 'USR-1012', reporterName: 'Mai Linh', productId: '8', productTitle: 'Tài khoản bán hàng giả', reasonType: 'MISLEADING_INFO', description: 'Ảnh chụp đồ xịn nhưng giao hàng chợ', status: 'RESOLVED', createdAt: '06/09/2026' }
]

export const mockVerifications: UserKyc[] = [
  { id: 'VER-312', userId: 'USR-1009', idCardNumber: '001098012345', realName: 'Nguyễn Quốc Bảo', frontCardUrl: '/placeholder.jpg', backCardUrl: '/placeholder.jpg', status: 'PENDING' },
  { id: 'VER-311', userId: 'USR-1012', idCardNumber: '079195009876', realName: 'Trần Mai Linh', frontCardUrl: '/placeholder.jpg', backCardUrl: '/placeholder.jpg', status: 'PENDING' },
  { id: 'VER-309', userId: 'USR-1001', idCardNumber: '025096001234', realName: 'Lê Minh Anh', frontCardUrl: '/placeholder.jpg', backCardUrl: '/placeholder.jpg', status: 'VERIFIED', verifiedAt: '2022-03-16' }
]

export const mockNotifications: Notification[] = [
  { id: 'notif-1', userId: 'USR-1001', type: 'OUTBID', title: 'Bạn vừa bị vượt giá', content: 'Đồng hồ Seiko 5 automatic có lượt đặt giá mới 2.950.000 ₫.', isRead: false, createdAt: '5 phút trước' },
  { id: 'notif-2', userId: 'USR-1001', type: 'ORDER_UPDATED', title: 'Đơn hàng đang trên đường giao', content: 'Đơn hàng MOC-2048 của bạn đã được đối tác VNPost tiếp nhận.', isRead: false, createdAt: '2 giờ trước' },
  { id: 'notif-3', userId: 'USR-1001', type: 'AUCTION_WON', title: 'Chúc mừng bạn đã thắng đấu giá!', content: 'Bạn đã chiến thắng phiên đấu giá Ghế lounge vintage.', isRead: true, createdAt: 'Hôm qua' },
  { id: 'notif-4', userId: 'USR-1001', type: 'ALERT', title: 'Cảnh báo giảm giá sản phẩm yêu thích', content: 'Ghế lounge da bò phong cách Bắc Âu vừa có cập nhật giá tốt hơn.', isRead: true, createdAt: '2 ngày trước' }
]

export const mockAdminMetrics = {
  users: '48.240',
  activeUsers: '32.180',
  products: '126.480',
  auctions: '1.284',
  transactions: '18.920',
  gmv: '12,8 tỷ ₫',
  revenue: '384 triệu ₫',
  disputes: '24',
  reports: '17'
}

export const mockPerformanceData = [
  { name: 'T2', products: 42, reports: 18, disputes: 9 },
  { name: 'T3', products: 56, reports: 23, disputes: 11 },
  { name: 'T4', products: 48, reports: 19, disputes: 8 },
  { name: 'T5', products: 71, reports: 28, disputes: 14 },
  { name: 'T6', products: 64, reports: 31, disputes: 12 },
  { name: 'T7', products: 82, reports: 37, disputes: 16 },
  { name: 'CN', products: 58, reports: 22, disputes: 10 }
]

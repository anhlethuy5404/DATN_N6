// Domain 1: User & Identity Domain
export type UserRole = 'USER' | 'MODERATOR' | 'ADMIN'
export type KycStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED'
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'BANNED'

export interface User {
  id: string
  email: string
  username: string
  fullName: string
  phoneNumber?: string
  avatarUrl?: string
  role: UserRole
  trustScore: number
  kycStatus: KycStatus
  status: UserStatus
  lastLoginAt?: string
  createdAt: string
  updatedAt?: string
}

export interface UserAddress {
  id: string
  userId: string
  recipientName: string
  phoneNumber: string
  provinceId: number
  provinceName: string
  districtId: number
  districtName: string
  wardId: number
  wardName: string
  detailedAddress: string
  isDefault: boolean
}

export interface UserKyc {
  id: string
  userId: string
  idCardNumber: string
  realName: string
  frontCardUrl: string
  backCardUrl: string
  selfieUrl?: string
  status: KycStatus
  rejectionReason?: string
  verifiedBy?: string
  verifiedAt?: string
}

// Domain 2: Catalog & Product Domain
export type ProductCondition = 'NEW' | 'LIKE_NEW' | 'USED_GOOD' | 'USED_FAIR'
export type TransactionType = 'SALE' | 'AUCTION' | 'BARTER' | 'PASS'
export type ProductStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'REJECTED' | 'ACTIVE' | 'IN_TRANSACTION' | 'COMPLETED' | 'CANCELLED'

export interface Category {
  id: number
  parentId?: number
  name: string
  slug: string
  iconUrl?: string
  iconName?: string
  status: 'ACTIVE' | 'INACTIVE'
  children?: string[]
}

export interface ProductImage {
  id: string
  productId: string
  imageUrl: string
  isPrimary: boolean
  displayOrder: number
}

export interface Product {
  id: string
  sellerId: string
  sellerName: string
  sellerAvatar?: string
  sellerTrustScore: number
  sellerRating?: number
  categoryId: number
  categoryName: string
  title: string
  description: string
  condition: ProductCondition
  transactionType: TransactionType
  status: ProductStatus
  provinceName: string
  districtName: string
  detailedLocation?: string
  viewsCount: number
  likesCount: number
  images: string[]
  primaryImage: string
  createdAt: string
  updatedAt: string

  // Associated domain details
  salePrice?: number
  allowNegotiation?: boolean
  preferredExchangeItems?: string
  noteForPass?: string
  
  // If AUCTION
  auctionId?: string
  startPrice?: number
  stepPrice?: number
  currentPrice?: number
  bidsCount?: number
  endTime?: string
  auctionStatus?: AuctionStatus
}

// Domain 3: Direct Trade Domain
export interface SaleItem {
  id: string
  productId: string
  price: number
  allowNegotiation: boolean
}

export interface BarterPassItem {
  id: string
  productId: string
  preferredExchangeItems?: string
  noteForPass?: string
}

// Domain 4: Real-time Auction Domain
export type AuctionStatus = 'SCHEDULED' | 'ONGOING' | 'ENDED_SUCCESS' | 'ENDED_FAILED' | 'CANCELLED'

export interface AuctionSession {
  id: string
  productId: string
  productTitle: string
  productImage: string
  sellerId: string
  sellerName: string
  startPrice: number
  stepPrice: number
  currentPrice: number
  winnerId?: string
  winnerName?: string
  startTime: string
  endTime: string
  status: AuctionStatus
  bidsCount: number
  reAuctionCount: number
  maxReAuction: number
}

export interface AuctionBid {
  id: string
  auctionId: string
  bidderId: string
  bidderName: string
  bidderAvatar?: string
  bidAmount: number
  isAutoBid: boolean
  createdAt: string
}

export interface ProxyBid {
  id: string
  auctionId: string
  bidderId: string
  maxBidAmount: number
  status: 'ACTIVE' | 'OUTBID' | 'WON' | 'CANCELLED'
  createdAt: string
}

// Domain 5: Chat & Negotiation Domain
export interface ChatRoom {
  id: string
  productId: string
  productTitle: string
  productImage: string
  productPrice: number
  buyerId: string
  buyerName: string
  sellerId: string
  sellerName: string
  lastMessageAt: string
  lastMessageText: string
  unreadCount: number
  isOnline: boolean
  status: 'ACTIVE' | 'ARCHIVED' | 'BLOCKED'
}

export interface ChatMessage {
  id: string
  roomId: string
  senderId: string
  senderName: string
  messageType: 'TEXT' | 'IMAGE' | 'LOCATION' | 'OFFER' | 'SYSTEM'
  content: string
  isRead: boolean
  createdAt: string
  offerPrice?: number
  offerStatus?: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED'
}

export interface PriceOffer {
  id: string
  roomId: string
  senderId: string
  offeredPrice?: number
  offeredProductId?: string
  offeredProductTitle?: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED'
  createdAt: string
}

// Domain 6: Order, Escrow & Fulfillment Domain
export type SpotType = 'COFFEE' | 'POST_OFFICE' | 'SUPERMARKET' | 'POLICE_STATION' | 'PUBLIC_CAM'

export interface SafeMeetupSpot {
  id: string
  name: string
  address: string
  spotType: SpotType
  latitude?: number
  longitude?: number
}

export type OrderStatus =
  | 'PENDING_PAYMENT'
  | 'ESCROW_HOLDING'
  | 'SHIPPING'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'DISPUTING'
  | 'REFUNDED'
  | 'CANCELLED'

export interface Order {
  id: string
  orderCode: string
  buyerId: string
  buyerName: string
  sellerId: string
  sellerName: string
  sellerTrust: number
  productId: string
  productTitle: string
  productImage: string
  transactionType: TransactionType
  amount: number
  shippingFee: number
  totalAmount: number
  status: OrderStatus
  shippingAddress: string
  shippingCode?: string
  isDirectMeetup: boolean
  meetupSpot?: SafeMeetupSpot
  qrVerificationCode?: string
  createdAt: string
  updatedAt: string
}

// Domain 7: Wallet & Finance Domain
export interface Wallet {
  id: string
  userId: string
  balance: number // Khả dụng
  frozenBalance: number // Đang giữ trong Escrow
  updatedAt: string
}

export type WalletTxType = 'DEPOSIT' | 'WITHDRAW' | 'ESCROW_LOCK' | 'ESCROW_RELEASE' | 'REFUND' | 'SYSTEM_FEE'

export interface WalletTransaction {
  id: string
  walletId: string
  orderId?: string
  type: WalletTxType
  amount: number
  positive: boolean
  vnpayTranNo?: string
  status: 'PENDING' | 'SUCCESS' | 'FAILED'
  description: string
  createdAt: string
}

// Domain 8: Dispute, Trust & Moderation Domain
export type DisputeStatus = 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED_REFUND_BUYER' | 'RESOLVED_RELEASE_SELLER' | 'CLOSED'

export interface Dispute {
  id: string
  orderId: string
  orderCode: string
  openedBy: string
  buyerName: string
  sellerName: string
  amount: number
  reason: string
  status: DisputeStatus
  moderatorId?: string
  resolutionNote?: string
  createdAt: string
  resolvedAt?: string
  evidences?: string[]
}

export interface ProductReport {
  id: string
  reporterId: string
  reporterName: string
  productId: string
  productTitle: string
  reasonType: 'SCAM' | 'PROHIBITED_ITEM' | 'SPAM' | 'MISLEADING_INFO'
  description: string
  status: 'PENDING' | 'RESOLVED' | 'DISMISSED'
  handledBy?: string
  createdAt: string
}

export interface Review {
  id: string
  orderId: string
  reviewerId: string
  reviewerName: string
  reviewerAvatar?: string
  revieweeId: string
  rating: number
  comment: string
  createdAt: string
}

// Domain 9: AI, Analytics & Notification Domain
export interface Notification {
  id: string
  userId: string
  title: string
  content: string
  type: 'OUTBID' | 'AUCTION_WON' | 'ORDER_UPDATED' | 'PASS_SELECTED' | 'SYSTEM' | 'ALERT'
  isRead: boolean
  createdAt: string
}

export interface AIChatMessage {
  id: string
  sessionId: string
  senderType: 'USER' | 'BOT' | 'SYSTEM'
  messageText: string
  intentDetected?: string
  referencedEntityType?: 'PRODUCT' | 'ORDER' | 'POLICY' | 'NONE'
  referencedEntityId?: string
  createdAt: string
}

export interface AIChatSession {
  id: string
  userId?: string
  sessionTitle: string
  contextProductId?: string
  status: 'ACTIVE' | 'CLOSED'
  messages: AIChatMessage[]
}

import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Public & Products
import { HomePage } from '../pages/home/HomePage'
import { ProductListPage } from '../pages/products/ProductListPage'
import { ProductDetailPage } from '../pages/products/ProductDetailPage'
import { CreateProductPage } from '../pages/products/CreateProductPage'
import { EditProductPage } from '../pages/products/EditProductPage'

// Auctions
import { AuctionListPage } from '../pages/auctions/AuctionListPage'
import { AuctionDetailPage } from '../pages/auctions/AuctionDetailPage'
import { MyBidsPage } from '../pages/auctions/MyBidsPage'

// Pass & Barter
import { MyPassApplicationsPage } from '../pages/pass/MyPassApplicationsPage'

// Orders & Checkout
import { CartPage } from '../pages/orders/CartPage'
import { CheckoutPage } from '../pages/orders/CheckoutPage'
import { PaymentResultPage } from '../pages/checkout/PaymentResultPage'
import { OrderListPage } from '../pages/orders/OrderListPage'
import { OrderDetailPage } from '../pages/orders/OrderDetailPage'

// Wallet
import { WalletPage } from '../pages/wallet/WalletPage'
import { TransactionHistoryPage } from '../pages/wallet/TransactionHistoryPage'
import { WithdrawPage } from '../pages/wallet/WithdrawPage'

// Messages & Notifications
import { MessagesPage } from '../pages/messages/MessagesPage'
import { NotificationsPage } from '../pages/notifications/NotificationsPage'

// Disputes
import { DisputeListPage } from '../pages/disputes/DisputeListPage'
import { DisputeDetailPage } from '../pages/disputes/DisputeDetailPage'
import { CreateDisputePage } from '../pages/disputes/CreateDisputePage'

// User Identity & Profile
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import { ProfilePage } from '../pages/profile/ProfilePage'
import { EditProfilePage } from '../pages/profile/EditProfilePage'
import { VerificationPage } from '../pages/profile/VerificationPage'

// Auth
import { LoginPage } from '../pages/auth/LoginPage'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage'
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage'

// Moderator Portal
import { ModeratorDashboardPage } from '../pages/moderator/ModeratorDashboardPage'
import { ProductModerationPage } from '../pages/moderator/ProductModerationPage'
import { DisputeManagementPage as ModDisputePage } from '../pages/moderator/DisputeManagementPage'
import { ReportManagementPage as ModReportPage } from '../pages/moderator/ReportManagementPage'
import { VerificationManagementPage } from '../pages/moderator/VerificationManagementPage'
import { ModerationHistoryPage } from '../pages/moderator/ModerationHistoryPage'
import { ModeratorStatisticsPage } from '../pages/moderator/ModeratorStatisticsPage'

// Admin Portal
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage'
import { UserManagementPage } from '../pages/admin/UserManagementPage'
import { ModeratorManagementPage } from '../pages/admin/ModeratorManagementPage'
import { AuctionManagementPage } from '../pages/admin/AuctionManagementPage'
import { ReAuctionPage } from '../pages/admin/ReAuctionPage'
import { CategoryManagementPage } from '../pages/admin/CategoryManagementPage'
import { TransactionManagementPage } from '../pages/admin/TransactionManagementPage'
import { DisputeManagementPage as AdminDisputePage } from '../pages/admin/DisputeManagementPage'
import { ReportManagementPage as AdminReportPage } from '../pages/admin/ReportManagementPage'
import { FeeManagementPage } from '../pages/admin/FeeManagementPage'
import { BannedItemsPage } from '../pages/admin/BannedItemsPage'
import { SystemSettingsPage } from '../pages/admin/SystemSettingsPage'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Home & Catalog */}
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/create" element={<CreateProductPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/products/:id/edit" element={<EditProductPage />} />

      {/* Auctions */}
      <Route path="/auctions" element={<AuctionListPage />} />
      <Route path="/auctions/:id" element={<AuctionDetailPage />} />
      <Route path="/auctions/my-bids" element={<MyBidsPage />} />

      {/* Barter & Pass */}
      <Route path="/pass" element={<MyPassApplicationsPage />} />
      <Route path="/pass/my-applications" element={<MyPassApplicationsPage />} />

      {/* Cart & Checkout */}
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/checkout/payment-result" element={<PaymentResultPage />} />
      <Route path="/orders" element={<OrderListPage />} />
      <Route path="/orders/:id" element={<OrderDetailPage />} />

      {/* Wallet */}
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/wallet/history" element={<TransactionHistoryPage />} />
      <Route path="/wallet/withdraw" element={<WithdrawPage />} />

      {/* Messages & Notifications */}
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />

      {/* Disputes */}
      <Route path="/disputes" element={<DisputeListPage />} />
      <Route path="/disputes/new" element={<CreateDisputePage />} />
      <Route path="/disputes/:id" element={<DisputeDetailPage />} />

      {/* User Dashboard & Profile */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/edit" element={<EditProfilePage />} />
      <Route path="/verification" element={<VerificationPage />} />

      {/* Auth */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

      {/* Moderator Portal */}
      <Route path="/moderator" element={<ModeratorDashboardPage />} />
      <Route path="/moderator/products" element={<ProductModerationPage />} />
      <Route path="/moderator/disputes" element={<ModDisputePage />} />
      <Route path="/moderator/reports" element={<ModReportPage />} />
      <Route path="/moderator/verifications" element={<VerificationManagementPage />} />
      <Route path="/moderator/history" element={<ModerationHistoryPage />} />
      <Route path="/moderator/statistics" element={<ModeratorStatisticsPage />} />

      {/* Admin Portal */}
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/users" element={<UserManagementPage />} />
      <Route path="/admin/moderators" element={<ModeratorManagementPage />} />
      <Route path="/admin/products" element={<ProductModerationPage />} />
      <Route path="/admin/auctions" element={<AuctionManagementPage />} />
      <Route path="/admin/reauction" element={<ReAuctionPage />} />
      <Route path="/admin/categories" element={<CategoryManagementPage />} />
      <Route path="/admin/transactions" element={<TransactionManagementPage />} />
      <Route path="/admin/disputes" element={<AdminDisputePage />} />
      <Route path="/admin/reports" element={<AdminReportPage />} />
      <Route path="/admin/fees" element={<FeeManagementPage />} />
      <Route path="/admin/banned-items" element={<BannedItemsPage />} />
      <Route path="/admin/settings" element={<SystemSettingsPage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

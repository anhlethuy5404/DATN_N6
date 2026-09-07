import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { mockWallet, formatVND } from '../../mock/mockData'
import { useAuth } from '../../contexts/AuthContext'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function ProfileScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']
  const { currentUser } = useAuth()
  const [showQrModal, setShowQrModal] = useState(false)

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <Text style={styles.headerTitle}>Hồ sơ & Ví Nexus</Text>
        <TouchableOpacity onPress={() => router.push('/help' as any)}>
          <Ionicons name="help-circle-outline" size={22} color="#004ac6" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Overview Card matching CaNhanViNexusExchangeMobile */}
        <View style={styles.profileCard}>
          <View style={styles.profileMainRow}>
            <View style={styles.avatarBorder}>
              <Image source={{ uri: currentUser.avatarUrl }} style={styles.avatar} />
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>{currentUser.fullName}</Text>
                <Ionicons name="checkmark-circle" size={18} color="#004ac6" style={{ marginLeft: 4 }} />
              </View>
              <Text style={styles.userHandle}>@nguyenvana_pro</Text>
              <View style={styles.trustScorePill}>
                <Ionicons name="shield-checkmark" size={13} color="#007d55" />
                <Text style={styles.trustScoreText}>Trust Score: 95/100</Text>
              </View>
            </View>
          </View>

          <View style={styles.profileCardBottom}>
            <View style={styles.badgeLeft}>
              <Ionicons name="id-card" size={16} color="#434655" />
              <Text style={styles.badgeLeftText}>CCCD Verified</Text>
            </View>

            <TouchableOpacity
              style={styles.deliveryQrBtn}
              onPress={() => setShowQrModal(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="qr-code" size={16} color="#004ac6" />
              <Text style={styles.deliveryQrText}>Delivery QR</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Wallet Bento Grid from Figma */}
        <View style={styles.walletBento}>
          {/* Main Balance */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>{formatVND(mockWallet.balance)}</Text>
            <View style={styles.balanceActions}>
              <TouchableOpacity
                style={styles.topUpBtn}
                onPress={() => router.push('/wallet/deposit' as any)}
              >
                <Ionicons name="add-circle" size={16} color="#004ac6" />
                <Text style={styles.topUpBtnText}>Nạp tiền</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.withdrawBtn}
                onPress={() => router.push('/wallet/withdraw' as any)}
              >
                <Ionicons name="arrow-up-circle-outline" size={16} color="#ffffff" />
                <Text style={styles.withdrawBtnText}>Rút tiền</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sub Bento Row */}
          <View style={styles.subBentoRow}>
            {/* Escrowed Funds */}
            <View style={styles.subBentoCard}>
              <View style={styles.subBentoHeader}>
                <Ionicons name="lock-closed" size={14} color="#737686" />
                <Text style={styles.subBentoTitle}>Ký quỹ</Text>
              </View>
              <Text style={styles.subBentoAmount}>{formatVND(mockWallet.frozenBalance)}</Text>
            </View>

            {/* Active Bids */}
            <View style={styles.subBentoCard}>
              <View style={styles.subBentoHeader}>
                <MaterialCommunityIcons name="gavel" size={14} color="#737686" />
                <Text style={styles.subBentoTitle}>Đang đấu giá</Text>
              </View>
              <Text style={styles.subBentoAmount}>3 phiên</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity List from Figma */}
        <View style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <Text style={styles.activityTitle}>My Auctions & Orders</Text>
            <TouchableOpacity onPress={() => router.push('/order' as any)}>
              <Text style={styles.activitySeeAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Item 1: Winning Bid */}
          <View style={styles.activityItem}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80' }}
              style={styles.activityThumb}
            />
            <View style={styles.activityInfo}>
              <Text style={styles.activityItemTitle} numberOfLines={1}>
                Vintage Rolex Submariner
              </Text>
              <Text style={styles.activityItemSub}>Winning Bid: 25,000,000 ₫</Text>
            </View>
            <View style={styles.paidBadge}>
              <Text style={styles.paidBadgeText}>Paid</Text>
            </View>
          </View>

          {/* Item 2: Outbid */}
          <View style={[styles.activityItem, { borderBottomWidth: 0 }]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=500&q=80' }}
              style={styles.activityThumb}
            />
            <View style={styles.activityInfo}>
              <Text style={styles.activityItemTitle} numberOfLines={1}>
                Charizard 1st Edition PSA 10
              </Text>
              <Text style={[styles.activityItemSub, { color: '#ba1a1a' }]}>Current Bid: 18,000,000 ₫</Text>
            </View>
            <View style={styles.outbidBadge}>
              <Text style={styles.outbidBadgeText}>Outbid</Text>
            </View>
          </View>
        </View>

        {/* Shortcuts Section */}
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/product/my-products' as any)}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="pricetags-outline" size={20} color="#004ac6" />
              <Text style={styles.menuItemText}>Quản lý tin đăng của tôi</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#737686" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/order' as any)}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="bag-check-outline" size={20} color="#007d55" />
              <Text style={styles.menuItemText}>Đơn hàng & Ký quỹ Escrow</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#737686" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/auction' as any)}
          >
            <View style={styles.menuItemLeft}>
              <MaterialCommunityIcons name="gavel" size={20} color="#ba1a1a" />
              <Text style={styles.menuItemText}>Sàn đấu giá trực tiếp</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#737686" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/verification' as any)}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#007d55" />
              <Text style={styles.menuItemText}>Xác thực định danh eKYC CCCD</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#737686" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/safespot' as any)}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="business-outline" size={20} color="#004ac6" />
              <Text style={styles.menuItemText}>Điểm hẹn Safe Spot gần tôi</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#737686" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/help' as any)}
          >
            <View style={styles.menuItemLeft}>
              <MaterialCommunityIcons name="creation" size={20} color="#712ae2" />
              <Text style={styles.menuItemText}>Trung tâm trợ giúp & Nexus AI</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#737686" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/dispute' as any)}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="warning-outline" size={20} color="#ba1a1a" />
              <Text style={styles.menuItemText}>Báo cáo vi phạm & Khiếu nại</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#737686" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { borderBottomWidth: 0 }]}
            onPress={() => router.push('/auth/login' as any)}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="log-out-outline" size={20} color="#ba1a1a" />
              <Text style={[styles.menuItemText, { color: '#ba1a1a' }]}>Đăng xuất</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#737686" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Delivery QR Modal */}
      <Modal visible={showQrModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Mã QR Giao Nhận Escrow</Text>
            <Text style={styles.modalSub}>
              Xuất trình mã này cho người bán tại Safe Spot sau khi đã kiểm hàng hài lòng để hoàn tất giao dịch.
            </Text>
            <View style={styles.qrContainer}>
              <Ionicons name="qr-code" size={160} color="#004ac6" />
            </View>
            <Text style={styles.modalPinText}>MÃ PIN: 849-210</Text>
            <TouchableOpacity style={styles.closeModalBtn} onPress={() => setShowQrModal(false)}>
              <Text style={styles.closeModalBtnText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0b1c30',
  },
  content: {
    padding: 16,
    paddingBottom: 36,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#c3c6d7',
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  profileMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarBorder: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#004ac6',
    padding: 2,
    marginRight: 14,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0b1c30',
  },
  userHandle: {
    fontSize: 12,
    color: '#737686',
    marginTop: 2,
    marginBottom: 6,
  },
  trustScorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,125,85,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  trustScoreText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#007d55',
  },
  profileCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f3f8',
  },
  badgeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeLeftText: {
    fontSize: 12,
    color: '#434655',
    fontWeight: '600',
  },
  deliveryQrBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deliveryQrText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#004ac6',
  },
  walletBento: {
    marginBottom: 16,
    gap: 10,
  },
  balanceCard: {
    backgroundColor: '#004ac6',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#004ac6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '600',
  },
  balanceAmount: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '900',
    marginVertical: 8,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 10,
  },
  topUpBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 9,
    borderRadius: 10,
    gap: 4,
  },
  topUpBtnText: {
    color: '#004ac6',
    fontSize: 12,
    fontWeight: '800',
  },
  withdrawBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: '#ffffff',
    paddingVertical: 9,
    borderRadius: 10,
    gap: 4,
  },
  withdrawBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
  subBentoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  subBentoCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#c3c6d7',
  },
  subBentoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  subBentoTitle: {
    fontSize: 11,
    color: '#737686',
    fontWeight: '600',
  },
  subBentoAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0b1c30',
  },
  activityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#c3c6d7',
    marginBottom: 16,
    overflow: 'hidden',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f3f8',
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0b1c30',
  },
  activitySeeAll: {
    fontSize: 12,
    fontWeight: '700',
    color: '#004ac6',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f3f8',
  },
  activityThumb: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#ebe4d3',
    marginRight: 10,
  },
  activityInfo: {
    flex: 1,
  },
  activityItemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0b1c30',
  },
  activityItemSub: {
    fontSize: 11,
    color: '#007d55',
    marginTop: 2,
  },
  paidBadge: {
    backgroundColor: '#d1f4e0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  paidBadgeText: {
    color: '#007d55',
    fontSize: 10,
    fontWeight: '800',
  },
  outbidBadge: {
    backgroundColor: '#ffdad6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  outbidBadgeText: {
    color: '#ba1a1a',
    fontSize: 10,
    fontWeight: '800',
  },
  menuSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#c3c6d7',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f3f8',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuItemText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0b1c30',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '100%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0b1c30',
    marginBottom: 8,
  },
  modalSub: {
    fontSize: 12,
    color: '#737686',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  qrContainer: {
    padding: 16,
    backgroundColor: '#f8f9ff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#c3c6d7',
    marginBottom: 12,
  },
  modalPinText: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#004ac6',
    marginBottom: 16,
  },
  closeModalBtn: {
    backgroundColor: '#004ac6',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  closeModalBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
})

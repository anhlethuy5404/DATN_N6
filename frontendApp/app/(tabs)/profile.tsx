import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { mockWallet, formatVND } from '../../mock/mockData'
import { useAuth } from '../../contexts/AuthContext'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function ProfileScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']
  const { currentUser } = useAuth()

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Trung Tâm Tài Khoản</Text>
        <TouchableOpacity onPress={() => router.push('/settings' as any)}>
          <Ionicons name="settings-outline" size={22} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={[styles.userCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Image source={{ uri: currentUser.avatarUrl }} style={styles.avatar} />
          <View style={styles.userDetails}>
            <View style={styles.nameRow}>
              <Text style={[styles.userName, { color: theme.text }]}>{currentUser.fullName}</Text>
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#2f6844" />
                <Text style={styles.verifiedText}>Đã eKYC</Text>
              </View>
            </View>
            <Text style={[styles.userEmail, { color: theme.textMuted }]}>{currentUser.email}</Text>
            <View style={styles.trustScoreRow}>
              <Ionicons name="shield-checkmark" size={13} color="#c5573e" />
              <Text style={styles.trustScoreText}>Điểm tin cậy: {currentUser.trustScore}/100</Text>
            </View>
          </View>
        </View>

        {/* Digital Wallet Card */}
        <View style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <View style={styles.walletBrand}>
              <Ionicons name="wallet" size={18} color="#ffffff" />
              <Text style={styles.walletBrandText}>VÍ MỘC PAY (ESCROW)</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/wallet' as any)}>
              <Text style={styles.walletDetailLink}>Lịch sử biến động ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.balanceGrid}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>Số dư khả dụng</Text>
              <Text style={styles.balanceValue}>{formatVND(mockWallet.balance)}</Text>
            </View>
            <View style={styles.dividerVertical} />
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>Phong tỏa ký gửi (Escrow)</Text>
              <Text style={styles.balanceValueFrozen}>{formatVND(mockWallet.frozenBalance)}</Text>
            </View>
          </View>

          <View style={styles.walletActions}>
            <TouchableOpacity
              style={styles.walletBtnPrimary}
              onPress={() => router.push('/wallet' as any)}
            >
              <Ionicons name="add-circle-outline" size={16} color="#ffffff" style={{ marginRight: 6 }} />
              <Text style={styles.walletBtnPrimaryText}>Nạp tiền</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.walletBtnSecondary}
              onPress={() => router.push('/wallet/withdraw' as any)}
            >
              <Ionicons name="arrow-up-circle-outline" size={16} color="#ffffff" style={{ marginRight: 6 }} />
              <Text style={styles.walletBtnSecondaryText}>Rút tiền</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Trade & Order Management Section */}
        <Text style={[styles.menuSectionTitle, { color: theme.text }]}>Quản lý giao dịch</Text>
        <View style={[styles.menuCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/order' as any)}
          >
            <View style={[styles.menuIconBox, { backgroundColor: '#faece8' }]}>
              <Ionicons name="bag-handle-outline" size={20} color="#c5573e" />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, { color: theme.text }]}>Đơn mua hàng của tôi</Text>
              <Text style={[styles.menuSubtitle, { color: theme.textMuted }]}>
                Theo dõi tiến trình 5 bước Escrow & quét mã QR
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
          </TouchableOpacity>

          <View style={[styles.menuDivider, { backgroundColor: theme.border }]} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/order' as any)}
          >
            <View style={[styles.menuIconBox, { backgroundColor: '#eaf3ed' }]}>
              <Ionicons name="pricetags-outline" size={20} color="#2f6844" />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, { color: theme.text }]}>Đơn bán & Chốt giá</Text>
              <Text style={[styles.menuSubtitle, { color: theme.textMuted }]}>
                Xác nhận nhận tiền sau khi đối soát QR
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
          </TouchableOpacity>

          <View style={[styles.menuDivider, { backgroundColor: theme.border }]} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/dispute' as any)}
          >
            <View style={[styles.menuIconBox, { backgroundColor: '#fcf4e8' }]}>
              <Ionicons name="alert-circle-outline" size={20} color="#b26a1b" />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, { color: theme.text }]}>Khiếu nại & Tranh chấp</Text>
              <Text style={[styles.menuSubtitle, { color: theme.textMuted }]}>
                Bảo vệ quyền lợi người mua khi hàng sai mô tả
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Security & Verification Section */}
        <Text style={[styles.menuSectionTitle, { color: theme.text }]}>Định danh & Uy tín</Text>
        <View style={[styles.menuCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/verification' as any)}
          >
            <View style={[styles.menuIconBox, { backgroundColor: '#faece8' }]}>
              <Ionicons name="id-card-outline" size={20} color="#c5573e" />
            </View>
            <View style={styles.menuContent}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.menuTitle, { color: theme.text }]}>Xác thực CCCD (eKYC)</Text>
                <View style={styles.activeTag}>
                  <Text style={styles.activeTagText}>ĐÃ DUYỆT</Text>
                </View>
              </View>
              <Text style={[styles.menuSubtitle, { color: theme.textMuted }]}>
                Gắn tích xanh định danh, tăng độ uy tín tài khoản
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
    backgroundColor: '#ebe4d3',
  },
  userDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: '800',
    marginRight: 6,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaf3ed',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  verifiedText: {
    color: '#2f6844',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 2,
  },
  userEmail: {
    fontSize: 12,
    marginBottom: 4,
  },
  trustScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trustScoreText: {
    color: '#c5573e',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },
  walletCard: {
    backgroundColor: '#292724',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#292724',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  walletBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletBrandText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginLeft: 6,
  },
  walletDetailLink: {
    color: '#e6decb',
    fontSize: 12,
    fontWeight: '600',
  },
  balanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceItem: {
    flex: 1,
  },
  dividerVertical: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(230, 222, 203, 0.2)',
    marginHorizontal: 12,
  },
  balanceLabel: {
    color: '#a8a296',
    fontSize: 11,
    marginBottom: 4,
  },
  balanceValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
  },
  balanceValueFrozen: {
    color: '#e07a63',
    fontSize: 16,
    fontWeight: '800',
  },
  walletActions: {
    flexDirection: 'row',
  },
  walletBtnPrimary: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c5573e',
    paddingVertical: 9,
    borderRadius: 10,
    marginRight: 8,
  },
  walletBtnPrimaryText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  walletBtnSecondary: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingVertical: 9,
    borderRadius: 10,
  },
  walletBtnSecondaryText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  menuSectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  menuCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  menuIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 11,
  },
  menuDivider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 64,
  },
  activeTag: {
    backgroundColor: '#eaf3ed',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  activeTagText: {
    color: '#2f6844',
    fontSize: 9,
    fontWeight: '800',
  },
})

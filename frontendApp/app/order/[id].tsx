import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { mockOrders, formatVND } from '../../mock/mockData'
import { EscrowTimeline } from '../../components/EscrowTimeline'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const order = mockOrders.find((o) => o.id === id || o.orderCode === id) || mockOrders[0]

  const handleConfirmReceived = () => {
    Alert.alert(
      'Xác nhận hoàn tất đơn hàng',
      'Bạn đã nhận hàng và kiểm tra kỹ lưỡng đúng như mô tả? Hệ thống sẽ giải ngân toàn bộ số tiền cọc cho người bán ngay lập tức.',
      [
        { text: 'Chưa', style: 'cancel' },
        {
          text: 'Xác nhận giải ngân',
          onPress: () => {
            order.status = 'COMPLETED'
            Alert.alert('Thành công! 🎉', 'Giao dịch hoàn tất! Tiền đã được giải ngân cho người bán.')
          },
        },
      ]
    )
  }

  const handleOpenDispute = () => {
    router.push('/dispute/create' as any)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Đơn Hàng #{order.orderCode}</Text>
        <TouchableOpacity onPress={() => router.push('/chat/conv-1' as any)}>
          <Ionicons name="chatbubble-ellipses-outline" size={22} color={theme.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* 5-Step Escrow Timeline */}
        <EscrowTimeline status={order.status} isDirectMeetup={order.isDirectMeetup} />

        {/* Product Card */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.productRow}>
            <Image source={{ uri: order.productImage }} style={styles.productImage} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.productTitle, { color: theme.text }]} numberOfLines={2}>
                {order.productTitle}
              </Text>
              <Text style={[styles.sellerLabel, { color: theme.textMuted }]}>
                Người bán: {order.sellerName} (Uy tín: {order.sellerTrust}%)
              </Text>
              <Text style={[styles.orderPrice, { color: theme.primary }]}>
                {formatVND(order.totalAmount)}
              </Text>
            </View>
          </View>
        </View>

        {/* QR Code & Safe PIN Physical Handoff Verification */}
        <View style={[styles.qrCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.qrHeader}>
            <Ionicons name="qr-code-outline" size={20} color={theme.primary} />
            <Text style={[styles.qrTitle, { color: theme.text }]}>Mã QR Xác Nhận Giao Nhận</Text>
          </View>

          <Text style={[styles.qrInstruction, { color: theme.textMuted }]}>
            Xuất trình mã QR này hoặc cung cấp mã PIN bí mật cho người bán tại điểm hẹn sau khi bạn đã kiểm tra hàng hài lòng.
          </Text>

          {/* Visual QR Container */}
          <View style={styles.qrBox}>
            <Ionicons name="qr-code" size={140} color="#292724" />
            <View style={styles.pinContainer}>
              <Text style={styles.pinLabel}>MÃ BẢO MẬT PIN:</Text>
              <Text style={styles.pinCode}>829  104</Text>
            </View>
          </View>

          <View style={styles.securityWarning}>
            <Ionicons name="warning-outline" size={16} color="#b26a1b" />
            <Text style={styles.securityWarningText}>
              Tuyệt đối không gửi ảnh mã QR hoặc mã PIN này qua tin nhắn trước khi gặp trực tiếp!
            </Text>
          </View>
        </View>

        {/* Delivery / Safe Spot Details */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionHeading, { color: theme.text }]}>
            {order.isDirectMeetup ? 'Điểm Hẹn An Toàn (Safe Spot)' : 'Địa Chỉ Nhận Hàng'}
          </Text>
          <View style={styles.spotRow}>
            <Ionicons
              name={order.isDirectMeetup ? 'location' : 'home-outline'}
              size={20}
              color={theme.primary}
              style={{ marginRight: 8 }}
            />
            <Text style={[styles.spotText, { color: theme.text }]}>
              {order.meetupSpot ? order.meetupSpot.name + ' - ' + order.meetupSpot.address : order.shippingAddress}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmReceived}>
          <Text style={styles.confirmBtnText}>XÁC NHẬN ĐÃ NHẬN HÀNG & GIẢI NGÂN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.disputeBtn} onPress={handleOpenDispute}>
          <Ionicons name="alert-circle-outline" size={16} color="#b26a1b" style={{ marginRight: 6 }} />
          <Text style={styles.disputeBtnText}>Mở khiếu nại (Hàng lỗi / sai mô tả)</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 14,
  },
  productRow: {
    flexDirection: 'row',
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#ebe4d3',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  sellerLabel: {
    fontSize: 11,
    marginBottom: 6,
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: '800',
  },
  qrCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 14,
    alignItems: 'center',
  },
  qrHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  qrTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 6,
  },
  qrInstruction: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 16,
  },
  qrBox: {
    backgroundColor: '#f8f7f3',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e6decb',
    alignItems: 'center',
    marginBottom: 14,
  },
  pinContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  pinLabel: {
    fontSize: 10,
    color: '#7c776e',
    fontWeight: '700',
  },
  pinCode: {
    fontSize: 22,
    fontWeight: '900',
    color: '#c5573e',
    letterSpacing: 4,
  },
  securityWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fcf4e8',
    padding: 10,
    borderRadius: 8,
  },
  securityWarningText: {
    color: '#b26a1b',
    fontSize: 11,
    marginLeft: 6,
    flex: 1,
    lineHeight: 15,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },
  spotRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  spotText: {
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
  confirmBtn: {
    backgroundColor: '#2f6844',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  confirmBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  disputeBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#b26a1b',
  },
  disputeBtnText: {
    color: '#b26a1b',
    fontSize: 13,
    fontWeight: '700',
  },
})

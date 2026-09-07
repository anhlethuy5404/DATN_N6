import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { mockProducts, mockSafeSpots, formatVND, mockWallet } from '../../mock/mockData'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function CheckoutScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const product = mockProducts.find((p) => p.id === id) || mockProducts[0]

  const [deliveryType, setDeliveryType] = useState<'MEETUP' | 'SHIPPING'>('MEETUP')
  const [selectedSpotId, setSelectedSpotId] = useState(mockSafeSpots[0].id)
  const [paymentMethod, setPaymentMethod] = useState<'WALLET' | 'VNPAY'>('WALLET')

  const shippingFee = deliveryType === 'SHIPPING' ? 35000 : 0
  const productPrice = product.salePrice || product.currentPrice || 15500000
  const totalAmount = productPrice + shippingFee

  const selectedSpot = mockSafeSpots.find((s) => s.id === selectedSpotId) || mockSafeSpots[0]

  const handleConfirmOrder = () => {
    Alert.alert(
      'Ký quỹ Escrow thành công! 🎉',
      `Khoản thanh toán ${formatVND(totalAmount)} đã được khóa an toàn trong quỹ Escrow. Tiền chỉ được giải ngân khi bạn gặp mặt kiểm hàng hoặc đồng kiểm thành công!`,
      [
        {
          text: 'Xem đơn hàng của tôi',
          onPress: () => router.replace('/order/ORD-2048' as any),
        },
      ]
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Ký Quỹ Đơn Hàng Escrow</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Summary */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.cardHeading, { color: theme.text }]}>Món đồ đặt mua</Text>
          <View style={styles.productRow}>
            <Image source={{ uri: product.primaryImage }} style={styles.productThumb} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.productTitle, { color: theme.text }]} numberOfLines={2}>
                {product.title}
              </Text>
              <Text style={[styles.sellerText, { color: theme.textMuted }]}>
                Người bán: {product.sellerName} (Uy tín: {product.sellerTrustScore}%)
              </Text>
              <Text style={[styles.productPrice, { color: theme.primary }]}>
                {formatVND(productPrice)}
              </Text>
            </View>
          </View>
        </View>

        {/* Delivery Method */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.cardHeading, { color: theme.text }]}>Hình thức giao nhận</Text>

          {/* Option 1: Safe Spot Meetup */}
          <TouchableOpacity
            onPress={() => setDeliveryType('MEETUP')}
            style={[
              styles.optionCard,
              { borderColor: deliveryType === 'MEETUP' ? theme.primary : theme.border },
              deliveryType === 'MEETUP' && { backgroundColor: theme.primaryLight },
            ]}
          >
            <Ionicons name="location-outline" size={22} color={theme.primary} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={[styles.optionTitle, { color: theme.text }]}>
                Gặp mặt tại Điểm Hẹn An Toàn (Safe Spot)
              </Text>
              <Text style={[styles.optionSub, { color: theme.textMuted }]}>
                Có camera CCTV 24/7 & bảo vệ. Kiểm hàng trực tiếp, quét mã QR nhận hàng.
              </Text>
            </View>
            <Text style={styles.freeBadge}>Miễn phí</Text>
          </TouchableOpacity>

          {/* Spot Selector if Meetup */}
          {deliveryType === 'MEETUP' && (
            <View style={styles.spotBox}>
              <View style={styles.spotHeader}>
                <Text style={styles.spotLabel}>Điểm hẹn lựa chọn:</Text>
                <TouchableOpacity onPress={() => router.push('/safespot' as any)}>
                  <Text style={styles.changeSpotText}>Đổi điểm khác &gt;</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.spotName}>{selectedSpot.name}</Text>
              <Text style={styles.spotAddr}>{selectedSpot.address}</Text>
            </View>
          )}

          {/* Option 2: Shipping */}
          <TouchableOpacity
            onPress={() => setDeliveryType('SHIPPING')}
            style={[
              styles.optionCard,
              { borderColor: deliveryType === 'SHIPPING' ? theme.primary : theme.border },
              deliveryType === 'SHIPPING' && { backgroundColor: theme.primaryLight },
              { marginTop: 10 },
            ]}
          >
            <Ionicons name="cube-outline" size={22} color="#712ae2" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={[styles.optionTitle, { color: theme.text }]}>Giao hàng tiêu chuẩn VNPost</Text>
              <Text style={[styles.optionSub, { color: theme.textMuted }]}>
                Đồng kiểm khi nhận kiện hàng. Nhận hàng trong 1-2 ngày.
              </Text>
            </View>
            <Text style={styles.feeText}>35.000 ₫</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.cardHeading, { color: theme.text }]}>Phương thức đặt cọc ký quỹ</Text>

          <TouchableOpacity
            onPress={() => setPaymentMethod('WALLET')}
            style={[
              styles.optionCard,
              { borderColor: paymentMethod === 'WALLET' ? theme.primary : theme.border },
              paymentMethod === 'WALLET' && { backgroundColor: theme.primaryLight },
            ]}
          >
            <Ionicons name="wallet-outline" size={22} color={theme.primary} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={[styles.optionTitle, { color: theme.text }]}>
                Số dư Ví NEX (Khả dụng: {formatVND(mockWallet.balance)})
              </Text>
              <Text style={[styles.optionSub, { color: theme.textMuted }]}>
                Trừ tiền ví và đưa vào trạng thái phong tỏa ký quỹ tức thì
              </Text>
            </View>
            <Ionicons
              name={paymentMethod === 'WALLET' ? 'radio-button-on' : 'radio-button-off'}
              size={20}
              color={theme.primary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPaymentMethod('VNPAY')}
            style={[
              styles.optionCard,
              { borderColor: paymentMethod === 'VNPAY' ? theme.primary : theme.border },
              paymentMethod === 'VNPAY' && { backgroundColor: theme.primaryLight },
              { marginTop: 10 },
            ]}
          >
            <Ionicons name="qr-code-outline" size={22} color="#007d55" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={[styles.optionTitle, { color: theme.text }]}>Cổng VNPAY QR Sandbox</Text>
              <Text style={[styles.optionSub, { color: theme.textMuted }]}>
                Quét mã chuyển tiền thẳng vào tài khoản phong tỏa Escrow
              </Text>
            </View>
            <Ionicons
              name={paymentMethod === 'VNPAY' ? 'radio-button-on' : 'radio-button-off'}
              size={20}
              color={theme.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Total Cost Breakdown */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Giá món đồ:</Text>
            <Text style={[styles.breakdownValue, { color: theme.text }]}>{formatVND(productPrice)}</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Phí vận chuyển:</Text>
            <Text style={[styles.breakdownValue, { color: theme.text }]}>{formatVND(shippingFee)}</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Bảo vệ ký quỹ Nexus Escrow:</Text>
            <Text style={[styles.breakdownValue, { color: '#007d55', fontWeight: '800' }]}>Miễn phí</Text>
          </View>
          <View style={[styles.breakdownRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Tổng tiền ký quỹ:</Text>
            <Text style={styles.totalValue}>{formatVND(totalAmount)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bottomBarSub}>Tổng cọc Escrow</Text>
          <Text style={styles.bottomBarTotal}>{formatVND(totalAmount)}</Text>
        </View>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmOrder} activeOpacity={0.88}>
          <Ionicons name="shield-checkmark" size={18} color="#ffffff" style={{ marginRight: 6 }} />
          <Text style={styles.confirmBtnText}>XÁC NHẬN KÝ QUỸ</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 24,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
  },
  cardHeading: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 12,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productThumb: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#eceef6',
  },
  productTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  sellerText: {
    fontSize: 11,
    marginTop: 2,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 4,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  optionTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  optionSub: {
    fontSize: 10,
    marginTop: 2,
    lineHeight: 14,
  },
  freeBadge: {
    color: '#007d55',
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 8,
  },
  feeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0b1c30',
    marginLeft: 8,
  },
  spotBox: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f8f9ff',
    borderWidth: 1,
    borderColor: '#dce9ff',
  },
  spotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  spotLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#737686',
  },
  changeSpotText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#004ac6',
  },
  spotName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0b1c30',
  },
  spotAddr: {
    fontSize: 11,
    color: '#737686',
    marginTop: 2,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  breakdownLabel: {
    fontSize: 12,
    color: '#737686',
  },
  breakdownValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#eceef6',
    marginTop: 8,
    paddingTop: 8,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0b1c30',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#004ac6',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  bottomBarSub: {
    fontSize: 10,
    color: '#737686',
  },
  bottomBarTotal: {
    fontSize: 18,
    fontWeight: '900',
    color: '#004ac6',
  },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#004ac6',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
  },
  confirmBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
})

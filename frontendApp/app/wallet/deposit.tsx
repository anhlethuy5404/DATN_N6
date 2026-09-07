import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  Alert,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { mockWallet, mockWalletTransactions, formatVND } from '../../mock/mockData'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

const PRESET_AMOUNTS = [200000, 500000, 1000000, 2000000, 5000000]

export default function DepositScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const [selectedAmount, setSelectedAmount] = useState<number>(500000)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [method, setMethod] = useState<'VNPAY' | 'VIETQR' | 'MOMO'>('VNPAY')
  const [showQr, setShowQr] = useState<boolean>(false)

  const activeAmount = customAmount ? parseInt(customAmount.replace(/\D/g, '')) || 0 : selectedAmount

  const handlePayNow = () => {
    if (activeAmount < 50000) {
      Alert.alert('Lỗi', 'Số tiền nạp tối thiểu là 50.000 ₫')
      return
    }
    setShowQr(true)
  }

  const handleConfirmPaid = () => {
    mockWallet.balance += activeAmount
    mockWalletTransactions.unshift({
      id: 'tx-' + Date.now(),
      walletId: mockWallet.id,
      type: 'DEPOSIT',
      amount: activeAmount,
      positive: true,
      status: 'SUCCESS',
      description: `Nạp tiền vào ví qua ${method === 'VNPAY' ? 'VNPAY QR' : 'VietQR 24/7'}`,
      createdAt: 'Vừa xong',
    })

    Alert.alert('Nạp tiền thành công! 🎉', `Đã cộng ${formatVND(activeAmount)} vào số dư khả dụng ví Nexus.`, [
      {
        text: 'Về ví của tôi',
        onPress: () => router.back(),
      },
    ])
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Nạp Tiền Ví Nexus</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Số dư khả dụng hiện tại</Text>
          <Text style={styles.balanceAmount}>{formatVND(mockWallet.balance)}</Text>
          <Text style={styles.balanceSub}>Sẵn sàng đặt cọc mua hàng & tham gia đấu giá</Text>
        </View>

        {!showQr ? (
          <>
            {/* Quick Presets */}
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Chọn số tiền nạp nhanh</Text>
              <View style={styles.presetsGrid}>
                {PRESET_AMOUNTS.map((amt) => {
                  const isSelected = selectedAmount === amt && !customAmount
                  return (
                    <TouchableOpacity
                      key={amt}
                      onPress={() => {
                        setSelectedAmount(amt)
                        setCustomAmount('')
                      }}
                      style={[
                        styles.presetChip,
                        { borderColor: theme.border },
                        isSelected && { backgroundColor: theme.primary, borderColor: theme.primary },
                      ]}
                    >
                      <Text
                        style={[
                          styles.presetChipText,
                          { color: isSelected ? '#ffffff' : theme.text },
                        ]}
                      >
                        {formatVND(amt)}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </View>

              <Text style={[styles.inputLabel, { color: theme.textMuted }]}>Hoặc nhập số tiền khác (₫):</Text>
              <TextInput
                style={[styles.input, { color: theme.text, borderColor: theme.border }]}
                keyboardType="numeric"
                placeholder="VD: 3000000"
                placeholderTextColor="#737686"
                value={customAmount}
                onChangeText={setCustomAmount}
              />
            </View>

            {/* Payment Method */}
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Phương thức thanh toán</Text>

              <TouchableOpacity
                onPress={() => setMethod('VNPAY')}
                style={[
                  styles.methodRow,
                  { borderColor: method === 'VNPAY' ? theme.primary : theme.border },
                  method === 'VNPAY' && { backgroundColor: theme.primaryLight },
                ]}
              >
                <Ionicons name="qr-code-outline" size={24} color={theme.primary} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={[styles.methodTitle, { color: theme.text }]}>VNPAY QR Sandbox</Text>
                  <Text style={[styles.methodSub, { color: theme.textMuted }]}>Quét mã QR qua tất cả ngân hàng</Text>
                </View>
                <Ionicons
                  name={method === 'VNPAY' ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color={theme.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setMethod('VIETQR')}
                style={[
                  styles.methodRow,
                  { borderColor: method === 'VIETQR' ? theme.primary : theme.border },
                  method === 'VIETQR' && { backgroundColor: theme.primaryLight },
                ]}
              >
                <Ionicons name="card-outline" size={24} color="#712ae2" />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={[styles.methodTitle, { color: theme.text }]}>Chuyển khoản VietQR 24/7</Text>
                  <Text style={[styles.methodSub, { color: theme.textMuted }]}>Khớp lệnh tự động trong 30s</Text>
                </View>
                <Ionicons
                  name={method === 'VIETQR' ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color={theme.primary}
                />
              </TouchableOpacity>
            </View>

            {/* Bottom Pay CTA */}
            <TouchableOpacity style={styles.payBtn} onPress={handlePayNow} activeOpacity={0.88}>
              <Text style={styles.payBtnText}>Nạp {formatVND(activeAmount)} Vào Ví</Text>
              <Ionicons name="arrow-forward" size={18} color="#ffffff" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </>
        ) : (
          /* Simulated QR Code Screen */
          <View style={[styles.qrCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.qrTitle, { color: theme.text }]}>Quét mã QR để hoàn tất</Text>
            <Text style={styles.qrAmount}>{formatVND(activeAmount)}</Text>

            <View style={styles.qrContainer}>
              <Ionicons name="qr-code" size={180} color="#0b1c30" />
            </View>

            <View style={styles.qrInfoBox}>
              <Text style={styles.qrInfoText}>Nội dung chuyển khoản: <Text style={{ fontWeight: '800' }}>NEXUS 8492 NAPTIEN</Text></Text>
              <Text style={styles.qrInfoText}>Thời gian thanh toán còn lại: <Text style={{ color: '#ba1a1a', fontWeight: '800' }}>14:59</Text></Text>
            </View>

            <TouchableOpacity style={styles.confirmPaidBtn} onPress={handleConfirmPaid}>
              <Ionicons name="checkmark-circle" size={20} color="#ffffff" style={{ marginRight: 6 }} />
              <Text style={styles.confirmPaidText}>Tôi Đã Chuyển Tiền Thành Công</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowQr(false)}>
              <Text style={styles.cancelBtnText}>Chọn phương thức khác</Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingBottom: 36,
  },
  balanceCard: {
    backgroundColor: '#004ac6',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  balanceLabel: {
    color: '#dce9ff',
    fontSize: 12,
    fontWeight: '600',
  },
  balanceAmount: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    marginVertical: 4,
  },
  balanceSub: {
    color: '#dce9ff',
    fontSize: 11,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 12,
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  presetChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: '#f8f9ff',
  },
  presetChipText: {
    fontSize: 12,
    fontWeight: '800',
  },
  inputLabel: {
    fontSize: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: '700',
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  methodTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  methodSub: {
    fontSize: 11,
    marginTop: 1,
  },
  payBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#004ac6',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 6,
  },
  payBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  qrCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
  },
  qrTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  qrAmount: {
    fontSize: 24,
    fontWeight: '900',
    color: '#004ac6',
    marginVertical: 8,
  },
  qrContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#c3c6d7',
    marginVertical: 14,
  },
  qrInfoBox: {
    backgroundColor: '#f8f9ff',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    marginBottom: 16,
    gap: 4,
  },
  qrInfoText: {
    fontSize: 11,
    color: '#434655',
    textAlign: 'center',
  },
  confirmPaidBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007d55',
    paddingVertical: 14,
    borderRadius: 14,
    width: '100%',
    marginBottom: 8,
  },
  confirmPaidText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  cancelBtn: {
    paddingVertical: 10,
  },
  cancelBtnText: {
    color: '#737686',
    fontSize: 13,
    fontWeight: '600',
  },
})

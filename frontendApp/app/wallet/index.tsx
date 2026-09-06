import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { mockWallet, mockWalletTransactions, formatVND } from '../../mock/mockData'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function WalletScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const [filterType, setFilterType] = useState<string>('ALL')

  const handleDeposit = () => {
    Alert.alert('Nạp tiền Ví Mộc', 'Chuyển hướng đến cổng thanh toán VNPAY QR Sandbox...')
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Ví Điện Tử Mộc Escrow</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <View style={styles.walletCard}>
          <Text style={styles.balanceTitle}>TỔNG SỐ DƯ TÀI KHOẢN</Text>
          <Text style={styles.mainBalance}>
            {formatVND(mockWallet.balance + mockWallet.frozenBalance)}
          </Text>

          <View style={styles.breakdownRow}>
            <View style={styles.breakdownCol}>
              <Text style={styles.breakdownLabel}>Khả dụng</Text>
              <Text style={styles.breakdownVal}>{formatVND(mockWallet.balance)}</Text>
            </View>
            <View style={styles.breakdownCol}>
              <Text style={styles.breakdownLabel}>Ký gửi Escrow</Text>
              <Text style={styles.breakdownValFrozen}>{formatVND(mockWallet.frozenBalance)}</Text>
            </View>
          </View>

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.depositBtn} onPress={handleDeposit}>
              <Ionicons name="add-circle-outline" size={18} color="#ffffff" style={{ marginRight: 6 }} />
              <Text style={styles.depositBtnText}>Nạp tiền VNPAY</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.withdrawBtn}
              onPress={() => router.push('/wallet/withdraw' as any)}
            >
              <Ionicons name="arrow-up-circle-outline" size={18} color="#ffffff" style={{ marginRight: 6 }} />
              <Text style={styles.withdrawBtnText}>Rút tiền về NH</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Escrow Explanation */}
        <View style={[styles.infoCard, { backgroundColor: '#eaf3ed' }]}>
          <Ionicons name="shield-checkmark" size={20} color="#2f6844" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.infoTitle}>Quỹ Ký Gửi Bảo Vệ (Escrow Holding)</Text>
            <Text style={styles.infoDesc}>
              Số tiền ký gửi tạm khóa trong ví nhằm đảm bảo người mua có trách nhiệm đến nhận hàng và người bán giao đúng món đồ như cam kết.
            </Text>
          </View>
        </View>

        {/* Transaction History Section */}
        <View style={styles.historyHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Lịch sử biến động</Text>
        </View>

        {mockWalletTransactions.map((tx) => (
          <View
            key={tx.id}
            style={[styles.txCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <View
              style={[
                styles.txIconBox,
                { backgroundColor: tx.positive ? '#eaf3ed' : '#faece8' },
              ]}
            >
              <Ionicons
                name={tx.positive ? 'arrow-down' : 'arrow-up'}
                size={18}
                color={tx.positive ? '#2f6844' : '#c5573e'}
              />
            </View>

            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <Text style={[styles.txDesc, { color: theme.text }]} numberOfLines={2}>
                {tx.description}
              </Text>
              <Text style={[styles.txDate, { color: theme.textMuted }]}>{tx.createdAt}</Text>
            </View>

            <Text
              style={[
                styles.txAmount,
                { color: tx.positive ? '#2f6844' : '#c5573e' },
              ]}
            >
              {tx.positive ? '+' : '-'}
              {formatVND(tx.amount)}
            </Text>
          </View>
        ))}
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
    fontSize: 17,
    fontWeight: '800',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  walletCard: {
    backgroundColor: '#292724',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
  },
  balanceTitle: {
    color: '#a8a296',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  mainBalance: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 16,
  },
  breakdownRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(230,222,203,0.2)',
    paddingTop: 12,
    marginBottom: 16,
  },
  breakdownCol: {
    flex: 1,
  },
  breakdownLabel: {
    color: '#a8a296',
    fontSize: 11,
    marginBottom: 2,
  },
  breakdownVal: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  breakdownValFrozen: {
    color: '#e07a63',
    fontSize: 16,
    fontWeight: '800',
  },
  btnRow: {
    flexDirection: 'row',
  },
  depositBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c5573e',
    height: 42,
    borderRadius: 10,
    marginRight: 8,
  },
  depositBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  withdrawBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    height: 42,
    borderRadius: 10,
  },
  withdrawBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  infoCard: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    color: '#2f6844',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },
  infoDesc: {
    color: '#2f6844',
    fontSize: 11,
    lineHeight: 16,
  },
  historyHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  txCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  txIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txDesc: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  txDate: {
    fontSize: 11,
  },
  txAmount: {
    fontSize: 14,
    fontWeight: '800',
  },
})

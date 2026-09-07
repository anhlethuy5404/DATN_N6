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

  const [showBalance, setShowBalance] = useState(true)
  const [filterType, setFilterType] = useState<string>('ALL')

  const totalNEX = 42500.00
  const totalVND = mockWallet.balance + mockWallet.frozenBalance

  const handleDeposit = () => {
    Alert.alert('Nạp tiền Ví Nexus', 'Chuyển hướng đến cổng thanh toán VNPAY QR Sandbox...')
  }

  const handleSend = () => {
    Alert.alert('Chuyển tiền P2P', 'Nhập mã người nhận hoặc quét QR Nexus Exchange để chuyển tiền tức thì.')
  }

  const handleReceive = () => {
    Alert.alert('Nhận tiền', 'Mã QR nhận tiền ví Nexus của bạn đã sẵn sàng.')
  }

  const handleConvert = () => {
    Alert.alert('Quy đổi NEX/VND', 'Tỷ giá: 1 NEX = 1,000 ₫. Phí chuyển đổi 0%.')
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FF' }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color="#0B1C30" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NEX Wallet</Text>
        <TouchableOpacity onPress={() => Alert.alert('Quét mã', 'Mở camera quét QR thanh toán')} style={styles.iconBtn}>
          <Ionicons name="qr-code-outline" size={22} color="#0B1C30" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Total Balance Card with Gradient / Nexus Deep Blue */}
        <View style={styles.walletCard}>
          <View style={styles.cardGlow1} />
          <View style={styles.cardGlow2} />
          
          <View style={styles.cardTopRow}>
            <View>
              <Text style={styles.cardSubtitle}>Total Balance</Text>
              <View style={styles.cardBalanceRow}>
                <Text style={styles.currencyCode}>NEX</Text>
                <Text style={styles.mainBalance}>
                  {showBalance ? totalNEX.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '••••••••'}
                </Text>
              </View>
              <Text style={styles.cardVndSub}>
                {showBalance ? `≈ ${formatVND(totalVND)}` : '••••••••'}
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.eyeBtn}
              onPress={() => setShowBalance(!showBalance)}
            >
              <Ionicons 
                name={showBalance ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.cardBottomRow}>
            <View style={styles.trendPill}>
              <Ionicons name="trending-up" size={14} color="#6FFBBE" />
              <Text style={styles.trendText}>+2.4% Today</Text>
            </View>
            <Text style={styles.cardMask}>**** 8492</Text>
          </View>
        </View>

        {/* 4 Action Buttons: Top Up, Send, Receive, Convert */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionItem} onPress={handleDeposit}>
            <View style={styles.actionIconBox}>
              <Ionicons name="add" size={22} color="#004AC6" />
            </View>
            <Text style={styles.actionLabel}>Top Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleSend}>
            <View style={styles.actionIconBox}>
              <Ionicons name="arrow-up" size={20} color="#004AC6" />
            </View>
            <Text style={styles.actionLabel}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleReceive}>
            <View style={styles.actionIconBox}>
              <Ionicons name="arrow-down" size={20} color="#004AC6" />
            </View>
            <Text style={styles.actionLabel}>Receive</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleConvert}>
            <View style={styles.actionIconBox}>
              <Ionicons name="swap-horizontal" size={20} color="#004AC6" />
              <View style={styles.actionBadgeDot} />
            </View>
            <Text style={styles.actionLabel}>Convert</Text>
          </TouchableOpacity>
        </View>

        {/* Breakdown Card */}
        <View style={styles.breakdownCard}>
          <View style={styles.breakdownCol}>
            <Text style={styles.breakdownLabel}>Khả dụng (Available)</Text>
            <Text style={styles.breakdownVal}>{formatVND(mockWallet.balance)}</Text>
          </View>
          <View style={styles.breakdownDivider} />
          <View style={styles.breakdownCol}>
            <Text style={styles.breakdownLabel}>Ký quỹ Escrow</Text>
            <Text style={styles.breakdownValFrozen}>{formatVND(mockWallet.frozenBalance)}</Text>
          </View>
        </View>

        {/* Escrow Explanation */}
        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark" size={20} color="#007D55" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.infoTitle}>Quỹ Ký Gửi Bảo Vệ (Escrow Holding)</Text>
            <Text style={styles.infoDesc}>
              Số tiền ký quỹ được hợp đồng thông minh khóa an toàn nhằm bảo vệ giao dịch P2P & Đấu giá trên Nexus Exchange.
            </Text>
          </View>
        </View>

        {/* Transaction History Section */}
        <View style={styles.historyHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => router.push('/wallet/transactions' as any)}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.txList}>
          {mockWalletTransactions.map((tx) => (
            <View key={tx.id} style={styles.txCard}>
              <View
                style={[
                  styles.txIconBox,
                  { backgroundColor: tx.positive ? '#EAF3ED' : '#DCE9FF' },
                ]}
              >
                <Ionicons
                  name={tx.positive ? 'arrow-down' : 'cart-outline'}
                  size={18}
                  color={tx.positive ? '#007D55' : '#004AC6'}
                />
              </View>

              <View style={styles.txInfo}>
                <Text style={styles.txTitle}>{tx.description}</Text>
                <Text style={styles.txSub}>{tx.vnpayTranNo || tx.type}</Text>
              </View>

              <View style={styles.txAmountCol}>
                <Text
                  style={[
                    styles.txAmount,
                    { color: tx.positive ? '#007D55' : '#0B1C30' },
                  ]}
                >
                  {tx.positive ? '+' : '-'} {formatVND(tx.amount)}
                </Text>
                <Text style={styles.txDate}>{tx.createdAt}</Text>
              </View>
            </View>
          ))}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#F8F9FF',
    borderBottomWidth: 1,
    borderBottomColor: '#C3C6D7',
  },
  iconBtn: {
    padding: 6,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#004AC6',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  walletCard: {
    backgroundColor: '#004AC6',
    borderRadius: 20,
    padding: 22,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#004AC6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 20,
  },
  cardGlow1: {
    position: 'absolute',
    left: -24,
    bottom: -24,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  cardGlow2: {
    position: 'absolute',
    right: -30,
    top: -30,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  cardSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  cardBalanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  currencyCode: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  mainBalance: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  cardVndSub: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  eyeBtn: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trendPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  trendText: {
    color: '#6FFBBE',
    fontSize: 12,
    fontWeight: '600',
  },
  cardMask: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionItem: {
    alignItems: 'center',
    gap: 6,
  },
  actionIconBox: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#DCE9FF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#004AC6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionBadgeDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#BA1A1A',
    borderWidth: 2,
    borderColor: '#F8F9FF',
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#434655',
  },
  breakdownCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#C3C6D7',
    marginBottom: 16,
  },
  breakdownCol: {
    flex: 1,
  },
  breakdownLabel: {
    fontSize: 12,
    color: '#737686',
    marginBottom: 4,
    fontWeight: '500',
  },
  breakdownVal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0B1C30',
  },
  breakdownValFrozen: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007D55',
  },
  breakdownDivider: {
    width: 1,
    backgroundColor: '#C3C6D7',
    marginHorizontal: 16,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EAF3ED',
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#007D55' + '30',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#007D55',
    marginBottom: 3,
  },
  infoDesc: {
    fontSize: 12,
    color: '#34453A',
    lineHeight: 18,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0B1C30',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#004AC6',
  },
  txList: {
    gap: 10,
  },
  txCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#C3C6D7',
  },
  txIconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  txInfo: {
    flex: 1,
  },
  txTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0B1C30',
    marginBottom: 2,
  },
  txSub: {
    fontSize: 12,
    color: '#737686',
  },
  txAmountCol: {
    alignItems: 'flex-end',
  },
  txAmount: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  txDate: {
    fontSize: 11,
    color: '#737686',
  },
})

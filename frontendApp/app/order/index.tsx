import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { mockOrders, formatVND } from '../../mock/mockData'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function OrderListScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']
  const [activeTab, setActiveTab] = useState<'BUY' | 'SELL'>('BUY')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SHIPPING':
        return { label: 'Đang vận chuyển / Hẹn gặp', bg: '#faece8', text: '#c5573e' }
      case 'COMPLETED':
        return { label: 'Đã hoàn tất', bg: '#eaf3ed', text: '#2f6844' }
      case 'DISPUTING':
        return { label: 'Đang khiếu nại', bg: '#fcf4e8', text: '#b26a1b' }
      default:
        return { label: 'Ký quỹ Escrow', bg: '#eef2f5', text: '#395368' }
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Đơn Hàng Của Tôi</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={[styles.tabRow, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'BUY' && { borderBottomColor: theme.primary, borderBottomWidth: 2 }]}
          onPress={() => setActiveTab('BUY')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'BUY' ? theme.primary : theme.textMuted }]}>
            Đơn mua ({mockOrders.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'SELL' && { borderBottomColor: theme.primary, borderBottomWidth: 2 }]}
          onPress={() => setActiveTab('SELL')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'SELL' ? theme.primary : theme.textMuted }]}>
            Đơn bán (1)
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {mockOrders.map((order) => {
          const badge = getStatusBadge(order.status)
          return (
            <TouchableOpacity
              key={order.id}
              activeOpacity={0.85}
              onPress={() => router.push(`/order/${order.id}` as any)}
              style={[styles.orderCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.orderCode, { color: theme.text }]}>#{order.orderCode}</Text>
                <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                  <Text style={[styles.badgeText, { color: badge.text }]}>{badge.label}</Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <Image source={{ uri: order.productImage }} style={styles.productThumb} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={[styles.productTitle, { color: theme.text }]} numberOfLines={2}>
                    {order.productTitle}
                  </Text>
                  <Text style={[styles.sellerText, { color: theme.textMuted }]}>
                    {activeTab === 'BUY' ? `Người bán: ${order.sellerName}` : `Người mua: ${order.buyerName}`}
                  </Text>
                  <Text style={[styles.price, { color: theme.primary }]}>
                    {formatVND(order.totalAmount)}
                  </Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.dateRow}>
                  <Ionicons name="time-outline" size={13} color={theme.textMuted} />
                  <Text style={[styles.dateText, { color: theme.textMuted }]}>{order.createdAt}</Text>
                </View>
                <View style={styles.detailBtn}>
                  <Text style={styles.detailBtnText}>Xem chi tiết ›</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
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
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  orderCard: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e6decb',
    paddingBottom: 8,
  },
  orderCode: {
    fontSize: 13,
    fontWeight: '800',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  cardBody: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  productThumb: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#ebe4d3',
  },
  productTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  sellerText: {
    fontSize: 11,
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e6decb',
    paddingTop: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 11,
    marginLeft: 4,
  },
  detailBtn: {},
  detailBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#c5573e',
  },
})

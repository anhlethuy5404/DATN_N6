import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { mockAuctions } from '../../mock/mockData'
import { AuctionCard } from '../../components/AuctionCard'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function AuctionListScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']
  const [filter, setFilter] = useState<'ALL' | 'ONGOING' | 'ENDING_SOON'>('ALL')

  const filteredAuctions = mockAuctions.filter((a) => {
    if (filter === 'ONGOING') return a.status === 'ONGOING'
    return true
  })

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Sàn Đấu Giá Trực Tiếp</Text>
        <TouchableOpacity onPress={() => router.push('/wallet' as any)} style={styles.walletBtn}>
          <Ionicons name="wallet-outline" size={22} color={theme.primary} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={[styles.filterBar, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        {[
          { id: 'ALL', label: `Tất cả (${mockAuctions.length})` },
          { id: 'ONGOING', label: '🔥 Đang diễn ra' },
          { id: 'ENDING_SOON', label: '⚡ Sắp kết thúc' },
        ].map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setFilter(item.id as any)}
            style={[
              styles.filterPill,
              filter === item.id && { backgroundColor: theme.primary },
            ]}
          >
            <Text
              style={[
                styles.filterPillText,
                { color: filter === item.id ? '#ffffff' : theme.textMuted },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Escrow Banner */}
        <View style={styles.escrowBanner}>
          <Ionicons name="shield-checkmark" size={20} color="#007d55" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.escrowTitle}>Ký Quỹ Đấu Giá Minh Bạch 100%</Text>
            <Text style={styles.escrowSub}>
              Tiền đặt cọc được Nexus Escrow tạm giữ an toàn. Hệ thống hoàn tiền cọc tức thì nếu bạn không phải người trúng thầu!
            </Text>
          </View>
        </View>

        {/* Auctions List */}
        {filteredAuctions.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
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
  walletBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  filterBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#eceef6',
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  escrowBanner: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#eaf3ed',
    borderWidth: 1,
    borderColor: '#c3e2cc',
    marginBottom: 16,
    alignItems: 'center',
  },
  escrowTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#007d55',
    marginBottom: 2,
  },
  escrowSub: {
    fontSize: 11,
    color: '#434655',
    lineHeight: 16,
  },
})

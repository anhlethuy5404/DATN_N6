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
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { mockProducts, formatVND } from '../../mock/mockData'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function MyProductsScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const [filter, setFilter] = useState<'ALL' | 'SALE' | 'AUCTION' | 'PASS'>('ALL')

  // User's own items
  const myItems = mockProducts.slice(0, 4)

  const filteredItems = myItems.filter((item) => {
    if (filter === 'ALL') return true
    return item.transactionType === filter
  })

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Tin Đăng Của Tôi</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/create' as any)} style={styles.addBtn}>
          <Ionicons name="add-circle" size={24} color={theme.primary} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={[styles.filterBar, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        {[
          { id: 'ALL', label: `Tất cả (${myItems.length})` },
          { id: 'SALE', label: 'Đang bán' },
          { id: 'AUCTION', label: 'Đấu giá' },
          { id: 'PASS', label: 'Cho tặng' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setFilter(tab.id as any)}
            style={[
              styles.filterChip,
              filter === tab.id && { backgroundColor: theme.primary },
            ]}
          >
            <Text
              style={[
                styles.filterChipText,
                { color: filter === tab.id ? '#ffffff' : theme.textMuted },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {filteredItems.map((product) => {
          const isPass = product.transactionType === 'PASS'
          const isAuction = product.transactionType === 'AUCTION'

          return (
            <View
              key={product.id}
              style={[styles.itemCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            >
              <Image source={{ uri: product.primaryImage }} style={styles.itemThumb} />

              <View style={styles.itemInfo}>
                <View style={styles.tagRow}>
                  <View
                    style={[
                      styles.typeBadge,
                      {
                        backgroundColor: isPass ? '#eaf3ed' : isAuction ? '#ffdad6' : '#dce9ff',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.typeBadgeText,
                        {
                          color: isPass ? '#007d55' : isAuction ? '#ba1a1a' : '#004ac6',
                        },
                      ]}
                    >
                      {isPass ? '🎁 Pass 0₫' : isAuction ? '🔨 Đấu giá' : 'Bán cố định'}
                    </Text>
                  </View>

                  <View style={styles.liveBadge}>
                    <Text style={styles.liveBadgeText}>Đang hiển thị</Text>
                  </View>
                </View>

                <Text style={[styles.itemTitle, { color: theme.text }]} numberOfLines={1}>
                  {product.title}
                </Text>

                <Text style={[styles.itemPrice, { color: theme.primary }]}>
                  {isPass ? 'Miễn phí (0 ₫)' : formatVND(product.salePrice || product.currentPrice || 0)}
                </Text>

                <View style={styles.statsRow}>
                  <Text style={styles.statsText}>👁️ {product.viewsCount} xem</Text>
                  <Text style={styles.statsText}>❤️ {product.likesCount} thích</Text>
                </View>

                {/* Actions */}
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={[styles.actionBtn, { borderColor: theme.border }]}
                    onPress={() => router.push(`/product/${product.id}` as any)}
                  >
                    <Text style={[styles.actionBtnText, { color: theme.text }]}>Xem tin</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionBtn, { borderColor: theme.border }]}
                    onPress={() => Alert.alert('Thông báo', `Đã tạm ẩn bài đăng "${product.title}" khỏi sàn`)}
                  >
                    <Text style={[styles.actionBtnText, { color: '#ba1a1a' }]}>Tạm ẩn</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
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
  addBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  filterBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#eceef6',
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    padding: 16,
    paddingBottom: 36,
    gap: 12,
  },
  itemCard: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  itemThumb: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#eceef6',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  liveBadge: {
    backgroundColor: '#eaf3ed',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  liveBadgeText: {
    color: '#007d55',
    fontSize: 10,
    fontWeight: '700',
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 2,
  },
  statsText: {
    fontSize: 11,
    color: '#737686',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
})

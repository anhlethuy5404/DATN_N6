import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { mockCategories, mockProducts, mockAuctions } from '../../mock/mockData'
import { ProductCard } from '../../components/ProductCard'
import { AuctionCard } from '../../components/AuctionCard'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function HomeScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  const filteredProducts = selectedCategory
    ? mockProducts.filter((p) => p.categoryId === selectedCategory)
    : mockProducts

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Top App Bar */}
      <View style={[styles.topBar, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <View style={styles.brandRow}>
          <View style={styles.brandContainer}>
            <View style={styles.brandLogoBadge}>
              <Text style={styles.brandLogoText}>M</Text>
            </View>
            <View>
              <Text style={[styles.brandName, { color: theme.text }]}>MỘC</Text>
              <Text style={[styles.brandTagline, { color: theme.textMuted }]}>
                Đồ Cũ • Đấu Giá • Trao Đổi
              </Text>
            </View>
          </View>

          <View style={styles.topActions}>
            <TouchableOpacity
              style={[styles.iconButton, { backgroundColor: theme.primaryLight }]}
              onPress={() => router.push('/wallet' as any)}
            >
              <Ionicons name="wallet-outline" size={20} color={theme.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconButton, { backgroundColor: theme.primaryLight }]}
              onPress={() => router.push('/notifications' as any)}
            >
              <Ionicons name="notifications-outline" size={20} color={theme.primary} />
              <View style={styles.badgeDot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Input Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.border }]}
          onPress={() => router.push('/(tabs)/explore' as any)}
        >
          <Ionicons name="search" size={18} color={theme.textMuted} style={styles.searchIcon} />
          <Text style={[styles.searchPlaceholder, { color: theme.textMuted }]}>
            Tìm máy ảnh, ghế vintage, đồng hồ cơ...
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Banner Escrow Showcase */}
        <View style={[styles.bannerCard, { backgroundColor: '#c5573e' }]}>
          <View style={styles.bannerBadge}>
            <Ionicons name="shield-checkmark" size={14} color="#c5573e" />
            <Text style={styles.bannerBadgeText}>GIAO DỊCH AN TÂM 100%</Text>
          </View>
          <Text style={styles.bannerTitle}>Ký Quỹ Escrow & Hẹn Gặp Safe Spot</Text>
          <Text style={styles.bannerSubtitle}>
            Mộc giữ tiền thanh toán trung gian, quét mã QR nhận hàng tại điểm hẹn an toàn mới giải ngân cho người bán.
          </Text>
          <TouchableOpacity
            style={styles.bannerAction}
            onPress={() => router.push('/(tabs)/explore' as any)}
          >
            <Text style={styles.bannerActionText}>Khám phá ngay</Text>
            <Ionicons name="arrow-forward" size={14} color="#c5573e" />
          </TouchableOpacity>
        </View>

        {/* Categories Bar */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Danh mục tuyển chọn</Text>
          {selectedCategory && (
            <TouchableOpacity onPress={() => setSelectedCategory(null)}>
              <Text style={[styles.seeAllText, { color: theme.primary }]}>Bỏ chọn</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {mockCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id
            return (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(isSelected ? null : cat.id)}
                style={[
                  styles.categoryPill,
                  {
                    backgroundColor: isSelected ? theme.primary : theme.card,
                    borderColor: isSelected ? theme.primary : theme.border,
                  },
                ]}
              >
                <Ionicons
                  name={(cat.iconName as any) || 'pricetag-outline'}
                  size={16}
                  color={isSelected ? '#ffffff' : theme.text}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.categoryPillText,
                    { color: isSelected ? '#ffffff' : theme.text },
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        {/* Live Auctions Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.liveTitleWrapper}>
            <View style={styles.pulsingDot} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Đấu giá trực tiếp</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/explore' as any)}>
            <Text style={[styles.seeAllText, { color: theme.primary }]}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        {mockAuctions.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}

        {/* Featured Products Grid */}
        <View style={[styles.sectionHeader, { marginTop: 10 }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Đồ mới lên sàn</Text>
          <Text style={[styles.productCount, { color: theme.textMuted }]}>
            {filteredProducts.length} món đồ
          </Text>
        </View>

        <View style={styles.productGrid}>
          {filteredProducts.map((prod) => (
            <View key={prod.id} style={styles.gridItem}>
              <ProductCard product={prod} />
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
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLogoBadge: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#c5573e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  brandLogoText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
  },
  brandName: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
  brandTagline: {
    fontSize: 10,
    fontWeight: '600',
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    position: 'relative',
  },
  badgeDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#c5573e',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    fontSize: 13,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  bannerCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  bannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  bannerBadgeText: {
    color: '#c5573e',
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 4,
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 6,
    lineHeight: 22,
  },
  bannerSubtitle: {
    color: '#faece8',
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 12,
  },
  bannerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  bannerActionText: {
    color: '#c5573e',
    fontSize: 12,
    fontWeight: '700',
    marginRight: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  liveTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pulsingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#c5573e',
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
  },
  productCount: {
    fontSize: 12,
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
  },
})

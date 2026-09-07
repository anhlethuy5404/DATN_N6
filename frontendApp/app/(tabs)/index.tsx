import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
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
  const [biometricEnabled, setBiometricEnabled] = useState(false)

  const filteredProducts = selectedCategory
    ? mockProducts.filter((p) => p.categoryId === selectedCategory)
    : mockProducts

  // AI smart suggestions matching TrangChủNexusExchangeMobile from Figma
  const aiSuggestions = [
    {
      id: 1,
      title: 'Đồng hồ cơ Thụy Sĩ cổ điển',
      subtitle: 'Phù hợp với sở thích của bạn',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80',
      tag: 'AI MATCH 98%',
      price: '18.500.000 đ',
    },
    {
      id: 2,
      title: 'Tiền xu cổ hiếm có 1945',
      subtitle: 'Đang thu hút sự chú ý',
      image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=500&q=80',
      tag: 'TRENDING',
      price: '3.200.000 đ',
    },
    {
      id: 3,
      title: 'Máy ảnh Mirrorless Vintage',
      subtitle: 'Được AI định giá tốt',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
      tag: 'GOOD VALUE',
      price: '12.800.000 đ',
    },
  ]

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Top App Bar matching Figma */}
      <View style={[styles.topBar, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <View style={styles.headerRow}>
          {/* Location / Safe Spot indicator */}
          <TouchableOpacity
            style={styles.locationBadge}
            onPress={() => router.push('/safespot' as any)}
            activeOpacity={0.7}
          >
            <Ionicons name="location" size={16} color="#004ac6" />
            <Text style={styles.locationText}>TP. Hồ Chí Minh</Text>
            <Ionicons name="chevron-down" size={12} color="#434655" />
          </TouchableOpacity>

          {/* Brand Logo & Name */}
          <View style={styles.brandTitleContainer}>
            <Text style={styles.brandTitle}>Nexus Exchange</Text>
          </View>

          {/* Actions: Wallet & Notification */}
          <View style={styles.topActions}>
            <TouchableOpacity
              style={[styles.iconButton, { backgroundColor: theme.primaryLight }]}
              onPress={() => router.push('/wallet' as any)}
            >
              <Ionicons name="wallet-outline" size={18} color={theme.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconButton, { backgroundColor: theme.primaryLight }]}
              onPress={() => router.push('/notifications' as any)}
            >
              <Ionicons name="notifications-outline" size={18} color={theme.primary} />
              <View style={styles.badgeDot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* AI Search Bar from Figma */}
        <TouchableOpacity
          activeOpacity={0.88}
          style={styles.aiSearchBar}
          onPress={() => router.push('/(tabs)/explore' as any)}
        >
          <MaterialCommunityIcons name="creation" size={20} color="#712ae2" style={styles.aiIcon} />
          <Text style={styles.aiSearchPlaceholder}>Tìm kiếm bằng AI hoặc từ khóa...</Text>
          <TouchableOpacity
            style={styles.cameraIconBtn}
            onPress={() => router.push('/(tabs)/create' as any)}
          >
            <Ionicons name="camera-outline" size={18} color="#434655" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Biometric Login Prompt from Figma */}
        {!biometricEnabled && (
          <View style={styles.biometricCard}>
            <View style={styles.biometricLeft}>
              <View style={styles.fingerprintBadge}>
                <Ionicons name="finger-print" size={20} color="#ffffff" />
              </View>
              <View style={styles.biometricTextWrapper}>
                <Text style={styles.biometricTitle}>Đăng nhập nhanh</Text>
                <Text style={styles.biometricSubtitle}>Sử dụng sinh trắc học để bảo mật</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.biometricAction}
              onPress={() => setBiometricEnabled(true)}
            >
              <Text style={styles.biometricActionText}>Kích hoạt</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* AI Suggestions Section from Figma */}
        <View style={styles.sectionHeader}>
          <View style={styles.aiHeaderRow}>
            <MaterialCommunityIcons name="creation" size={18} color="#712ae2" style={{ marginRight: 6 }} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Gợi ý từ AI</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/explore' as any)}>
            <Text style={[styles.seeAllText, { color: theme.secondary }]}>Khám phá thêm</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionScroll}>
          {aiSuggestions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.suggestionCard}
              activeOpacity={0.9}
              onPress={() => router.push('/(tabs)/explore' as any)}
            >
              <Image source={{ uri: item.image }} style={styles.suggestionImage} />
              <View style={styles.suggestionTag}>
                <Text style={styles.suggestionTagText}>{item.tag}</Text>
              </View>
              <View style={styles.suggestionInfo}>
                <Text style={styles.suggestionItemTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.suggestionSubtitle} numberOfLines={1}>
                  {item.subtitle}
                </Text>
                <Text style={styles.suggestionPrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Safe Spot & Escrow Banner */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.safeSpotBanner}
          onPress={() => router.push('/safespot' as any)}
        >
          <View style={styles.bannerBadge}>
            <Ionicons name="shield-checkmark" size={14} color="#007d55" />
            <Text style={styles.bannerBadgeText}>GIAO DỊCH AN TÂM 100%</Text>
          </View>
          <Text style={styles.bannerTitle}>Ký Quỹ Escrow & Hẹn Gặp Safe Spot</Text>
          <Text style={styles.bannerSubtitle}>
            Nexus Exchange phong tỏa thanh toán, quét mã QR tại điểm hẹn camera 24/7 trước khi giải ngân.
          </Text>
          <View style={styles.bannerAction}>
            <Text style={styles.bannerActionText}>Xem điểm hẹn gần bạn</Text>
            <Ionicons name="arrow-forward" size={14} color="#004ac6" />
          </View>
        </TouchableOpacity>

        {/* Categories Pills */}
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
                    backgroundColor: isSelected ? '#004ac6' : theme.card,
                    borderColor: isSelected ? '#004ac6' : theme.border,
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
          <TouchableOpacity onPress={() => router.push('/auction' as any)}>
            <Text style={[styles.seeAllText, { color: theme.primary }]}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        {mockAuctions.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}

        {/* Featured Products Grid */}
        <View style={[styles.sectionHeader, { marginTop: 14 }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Sản phẩm lên sàn</Text>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dce9ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  locationText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#004ac6',
  },
  brandTitleContainer: {
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#004ac6',
    letterSpacing: 0.5,
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
    backgroundColor: '#004ac6',
  },
  aiSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#712ae2',
    backgroundColor: '#e5eeff',
  },
  aiIcon: {
    marginRight: 8,
  },
  aiSearchPlaceholder: {
    flex: 1,
    fontSize: 13,
    color: '#434655',
  },
  cameraIconBtn: {
    padding: 4,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 36,
  },
  biometricCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#dce9ff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#c3c6d7',
  },
  biometricLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fingerprintBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#004ac6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  biometricTextWrapper: {
    flex: 1,
  },
  biometricTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0b1c30',
  },
  biometricSubtitle: {
    fontSize: 11,
    color: '#434655',
    marginTop: 2,
  },
  biometricAction: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#004ac6',
  },
  biometricActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#004ac6',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  suggestionScroll: {
    marginBottom: 20,
  },
  suggestionCard: {
    width: 220,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#c3c6d7',
    overflow: 'hidden',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionImage: {
    width: '100%',
    height: 110,
    backgroundColor: '#ebe4d3',
  },
  suggestionTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#712ae2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  suggestionTagText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '800',
  },
  suggestionInfo: {
    padding: 10,
  },
  suggestionItemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0b1c30',
    marginBottom: 2,
  },
  suggestionSubtitle: {
    fontSize: 11,
    color: '#712ae2',
    marginBottom: 4,
  },
  suggestionPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#004ac6',
  },
  safeSpotBanner: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#004ac6',
    shadowColor: '#004ac6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  bannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1f4e0',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  bannerBadgeText: {
    color: '#007d55',
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 4,
  },
  bannerTitle: {
    color: '#0b1c30',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  bannerSubtitle: {
    color: '#434655',
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 12,
  },
  bannerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  bannerActionText: {
    color: '#004ac6',
    fontSize: 12,
    fontWeight: '700',
    marginRight: 4,
  },
  liveTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pulsingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#004ac6',
    marginRight: 6,
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

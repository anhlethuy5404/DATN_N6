import React, { useState, useMemo } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { mockProducts, mockCategories } from '../../mock/mockData'
import { ProductCard } from '../../components/ProductCard'
import { TransactionType } from '../../types'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function ExploreScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<TransactionType | 'ALL'>('ALL')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [nearMeOnly, setNearMeOnly] = useState(false)

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())

      const matchType = selectedType === 'ALL' || p.transactionType === selectedType
      const matchCategory = selectedCategory === null || p.categoryId === selectedCategory

      return matchSearch && matchType && matchCategory
    })
  }, [searchQuery, selectedType, selectedCategory])

  const types = [
    { key: 'ALL', label: 'Tất cả' },
    { key: 'BARTER', label: '🔄 Trao đổi đồ' },
    { key: 'AUCTION', label: '🔨 Đấu giá' },
    { key: 'SALE', label: '🏷️ Mua bán' },
    { key: 'PASS', label: '🎁 Tặng / Pass' },
  ]

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Header with Near Me switch matching TraoDổiDồNexusExchangeMobile */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <View style={styles.headerTopRow}>
          <View>
            <Text style={styles.headerTitle}>Trao đổi & Khám phá</Text>
            <Text style={styles.headerSubtitle}>Nexus C2C Smart Trading</Text>
          </View>

          {/* "Gần bạn" switch pill from Figma */}
          <View style={styles.nearMePill}>
            <Ionicons name="location-outline" size={14} color="#004ac6" />
            <Text style={styles.nearMeText}>Gần bạn</Text>
            <Switch
              value={nearMeOnly}
              onValueChange={setNearMeOnly}
              trackColor={{ false: '#c3c6d7', true: '#004ac6' }}
              thumbColor="#ffffff"
              style={{ transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }] }}
            />
          </View>
        </View>

        {/* AI & Keyword Search Bar */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#737686" style={styles.searchIcon} />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Tìm món đồ muốn đổi, sản phẩm đấu giá..."
            placeholderTextColor="#737686"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#737686" />
            </TouchableOpacity>
          )}
        </View>

        {/* Type Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScroll}>
          {types.map((t) => {
            const isSelected = selectedType === t.key
            return (
              <TouchableOpacity
                key={t.key}
                onPress={() => setSelectedType(t.key as any)}
                style={[
                  styles.typePill,
                  {
                    backgroundColor: isSelected ? '#004ac6' : '#e5eeff',
                    borderColor: isSelected ? '#004ac6' : '#c3c6d7',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.typePillText,
                    { color: isSelected ? '#ffffff' : '#0b1c30' },
                  ]}
                >
                  {t.label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Categories Horizontal */}
        <View style={styles.categoryRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => setSelectedCategory(null)}
              style={[
                styles.catPill,
                {
                  backgroundColor: selectedCategory === null ? '#004ac6' : theme.card,
                  borderColor: selectedCategory === null ? '#004ac6' : theme.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.catPillText,
                  { color: selectedCategory === null ? '#ffffff' : theme.text },
                ]}
              >
                Tất cả danh mục
              </Text>
            </TouchableOpacity>
            {mockCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedCategory(isSelected ? null : cat.id)}
                  style={[
                    styles.catPill,
                    {
                      backgroundColor: isSelected ? '#004ac6' : theme.card,
                      borderColor: isSelected ? '#004ac6' : theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.catPillText,
                      { color: isSelected ? '#ffffff' : theme.text },
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>

        {/* Barter Fast Proposal Banner */}
        <View style={styles.barterCallout}>
          <View style={styles.barterCalloutLeft}>
            <MaterialCommunityIcons name="swap-horizontal-bold" size={24} color="#712ae2" />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.barterCalloutTitle}>Giao dịch Trao Đổi Đồ</Text>
              <Text style={styles.barterCalloutSubtitle}>
                Chọn món đồ của bạn để gạ đổi lấy đồ ưng ý kèm điểm hẹn Safe Spot.
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.barterCalloutBtn}
            onPress={() => router.push('/barter/offer' as any)}
          >
            <Text style={styles.barterCalloutBtnText}>Đề xuất đổi</Text>
          </TouchableOpacity>
        </View>

        {/* Feed count */}
        <View style={styles.resultRow}>
          <Text style={[styles.resultCount, { color: theme.textMuted }]}>
            Hiển thị {filteredProducts.length} kết quả
          </Text>
          {nearMeOnly && (
            <View style={styles.nearMeActiveBadge}>
              <Ionicons name="navigate" size={11} color="#007d55" />
              <Text style={styles.nearMeActiveText}>Bán kính 5km</Text>
            </View>
          )}
        </View>

        {/* 2-Column Grid */}
        <View style={styles.grid}>
          {filteredProducts.map((product) => (
            <View key={product.id} style={styles.gridCol}>
              <ProductCard product={product} />
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0b1c30',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#737686',
  },
  nearMePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5eeff',
    paddingLeft: 10,
    paddingRight: 4,
    paddingVertical: 2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c3c6d7',
    gap: 4,
  },
  nearMeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#004ac6',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c3c6d7',
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 13,
    padding: 0,
  },
  typeScroll: {
    flexDirection: 'row',
  },
  typePill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  typePillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 36,
  },
  categoryRow: {
    marginBottom: 14,
  },
  catPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  catPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  barterCallout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#712ae2',
    shadowColor: '#712ae2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  barterCalloutLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  barterCalloutTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0b1c30',
  },
  barterCalloutSubtitle: {
    fontSize: 11,
    color: '#737686',
    marginTop: 2,
  },
  barterCalloutBtn: {
    backgroundColor: '#712ae2',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
  },
  barterCalloutBtnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultCount: {
    fontSize: 12,
    fontWeight: '600',
  },
  nearMeActiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1f4e0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 4,
  },
  nearMeActiveText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#007d55',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCol: {
    width: '48%',
  },
})

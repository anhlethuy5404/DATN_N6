import React, { useState, useMemo } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { mockProducts, mockCategories } from '../../mock/mockData'
import { ProductCard } from '../../components/ProductCard'
import { TransactionType } from '../../types'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function ExploreScreen() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<TransactionType | 'ALL'>('ALL')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

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
    { key: 'AUCTION', label: '🔨 Đấu giá' },
    { key: 'SALE', label: '🏷️ Mua ngay' },
    { key: 'BARTER', label: '🔄 Trao đổi' },
    { key: 'PASS', label: '🎁 Pass tặng' },
  ]

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Search Input */}
      <View style={[styles.searchHeader, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.border }]}>
          <Ionicons name="search" size={18} color={theme.textMuted} style={styles.searchIcon} />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Tìm theo tên sản phẩm, danh mục..."
            placeholderTextColor={theme.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={theme.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Transaction Type Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScroll}>
          {types.map((t) => {
            const isSelected = selectedType === t.key
            return (
              <TouchableOpacity
                key={t.key}
                onPress={() => setSelectedType(t.key as any)}
                style={[
                  styles.filterPill,
                  {
                    backgroundColor: isSelected ? theme.primary : theme.background,
                    borderColor: isSelected ? theme.primary : theme.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    { color: isSelected ? '#ffffff' : theme.text },
                  ]}
                >
                  {t.label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Results summary */}
        <View style={styles.resultSummary}>
          <Text style={[styles.resultCount, { color: theme.text }]}>
            Tìm thấy <Text style={{ color: theme.primary, fontWeight: '800' }}>{filteredProducts.length}</Text> món đồ
          </Text>

          {(selectedType !== 'ALL' || selectedCategory !== null || searchQuery !== '') && (
            <TouchableOpacity
              onPress={() => {
                setSelectedType('ALL')
                setSelectedCategory(null)
                setSearchQuery('')
              }}
            >
              <Text style={[styles.clearFilter, { color: theme.primary }]}>Đặt lại bộ lọc</Text>
            </TouchableOpacity>
          )}
        </View>

        {filteredProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={theme.textMuted} style={{ marginBottom: 12 }} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>Không tìm thấy món đồ phù hợp</Text>
            <Text style={[styles.emptySubtitle, { color: theme.textMuted }]}>
              Thử tìm kiếm với từ khóa khác hoặc xóa bớt các điều kiện lọc.
            </Text>
          </View>
        ) : (
          <View style={styles.productGrid}>
            {filteredProducts.map((prod) => (
              <View key={prod.id} style={styles.gridItem}>
                <ProductCard product={prod} />
              </View>
            ))}
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
  searchHeader: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  typeScroll: {
    flexDirection: 'row',
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    borderWidth: 1,
    marginRight: 8,
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  resultSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  resultCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  clearFilter: {
    fontSize: 13,
    fontWeight: '700',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 18,
  },
})

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Product } from '../types'
import { formatVND } from '../mock/mockData'
import { Colors } from '../constants/theme'
import { useColorScheme } from '../hooks/use-color-scheme'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const handlePress = () => {
    if (product.transactionType === 'AUCTION') {
      router.push(`/auction/${product.id}` as any)
    } else {
      router.push(`/product/${product.id}` as any)
    }
  }

  const getTypeBadge = () => {
    switch (product.transactionType) {
      case 'AUCTION':
        return { label: 'Đấu giá', bg: '#faece8', text: '#c5573e' }
      case 'BARTER':
        return { label: 'Trao đổi', bg: '#eaf3ed', text: '#2f6844' }
      case 'PASS':
        return { label: 'Tặng / Pass', bg: '#fcf4e8', text: '#b26a1b' }
      default:
        return { label: 'Bán lẻ', bg: '#f0f3f6', text: '#395368' }
    }
  }

  const badge = getTypeBadge()

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={handlePress}
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.primaryImage }} style={styles.image} resizeMode="cover" />
        <View style={[styles.typeBadge, { backgroundColor: badge.bg }]}>
          <Text style={[styles.typeBadgeText, { color: badge.text }]}>{badge.label}</Text>
        </View>
        <TouchableOpacity style={styles.likeButton}>
          <Ionicons name="heart-outline" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.categoryText, { color: theme.textMuted }]}>
          {product.categoryName}
        </Text>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {product.title}
        </Text>

        <View style={styles.priceRow}>
          {product.transactionType === 'PASS' ? (
            <Text style={[styles.passText, { color: theme.warning }]}>Miễn phí / Pass đồ</Text>
          ) : product.transactionType === 'AUCTION' ? (
            <View>
              <Text style={[styles.auctionLabel, { color: theme.textMuted }]}>Giá hiện tại</Text>
              <Text style={[styles.price, { color: theme.primary }]}>
                {formatVND(product.currentPrice || product.startPrice || 0)}
              </Text>
            </View>
          ) : (
            <Text style={[styles.price, { color: theme.primary }]}>
              {formatVND(product.salePrice || 0)}
            </Text>
          )}
        </View>

        <View style={styles.metaRow}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={13} color={theme.textMuted} />
            <Text style={[styles.locationText, { color: theme.textMuted }]} numberOfLines={1}>
              {product.districtName}
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#f5a623" />
            <Text style={[styles.ratingText, { color: theme.text }]}>
              {product.sellerRating || 4.9}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 14,
    shadowColor: '#292724',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    height: 160,
    position: 'relative',
    backgroundColor: '#ebe4d3',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  typeBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  likeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 10,
  },
  categoryText: {
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    height: 36,
    marginBottom: 6,
  },
  priceRow: {
    marginBottom: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
  },
  passText: {
    fontSize: 14,
    fontWeight: '700',
  },
  auctionLabel: {
    fontSize: 10,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e6decb',
    paddingTop: 6,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    fontSize: 11,
    marginLeft: 3,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 2,
  },
})

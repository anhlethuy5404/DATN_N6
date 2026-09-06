import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { AuctionSession } from '../types'
import { formatVND } from '../mock/mockData'
import { Colors } from '../constants/theme'
import { useColorScheme } from '../hooks/use-color-scheme'

interface AuctionCardProps {
  auction: AuctionSession
}

export const AuctionCard = ({ auction }: AuctionCardProps) => {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push(`/auction/${auction.productId}` as any)}
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: auction.productImage }} style={styles.image} resizeMode="cover" />
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>ĐẤU GIÁ TRỰC TIẾP</Text>
        </View>
        <View style={styles.countdownBadge}>
          <Ionicons name="time-outline" size={12} color="#ffffff" />
          <Text style={styles.countdownText}>Còn 05:42:18</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {auction.productTitle}
        </Text>

        <View style={styles.sellerRow}>
          <Ionicons name="person-circle-outline" size={14} color={theme.textMuted} />
          <Text style={[styles.sellerName, { color: theme.textMuted }]}>
            {auction.sellerName}
          </Text>
          <View style={styles.bidsPill}>
            <Text style={styles.bidsText}>{auction.bidsCount} lượt đấu</Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <View>
            <Text style={[styles.priceLabel, { color: theme.textMuted }]}>Giá hiện tại</Text>
            <Text style={[styles.currentPrice, { color: theme.primary }]}>
              {formatVND(auction.currentPrice)}
            </Text>
          </View>
          <View style={styles.bidButton}>
            <Text style={styles.bidButtonText}>Vào đấu giá</Text>
            <Ionicons name="arrow-forward" size={14} color="#ffffff" style={{ marginLeft: 4 }} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#292724',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageWrapper: {
    width: '100%',
    height: 180,
    position: 'relative',
    backgroundColor: '#ebe4d3',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  liveBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(197, 87, 62, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
    marginRight: 6,
  },
  liveText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  countdownBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(41, 39, 36, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  countdownText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 8,
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sellerName: {
    fontSize: 12,
    marginLeft: 4,
    flex: 1,
  },
  bidsPill: {
    backgroundColor: '#faece8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  bidsText: {
    color: '#c5573e',
    fontSize: 11,
    fontWeight: '700',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e6decb',
    paddingTop: 10,
  },
  priceLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: '800',
  },
  bidButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c5573e',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  bidButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
})

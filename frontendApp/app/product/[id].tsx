import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { mockProducts, formatVND, mockSafeSpots } from '../../mock/mockData'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const product = mockProducts.find((p) => p.id === id) || mockProducts[0]
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handleBuyNow = () => {
    Alert.alert(
      'Xác nhận đặt mua (Mộc Escrow)',
      `Bạn sẽ đặt mua món đồ này với giá ${formatVND(product.salePrice || 0)}. Tiền sẽ được giữ an toàn trong quỹ Escrow cho đến khi bạn nhận hàng trực tiếp và quét mã QR xác nhận!`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Thanh toán cọc',
          onPress: () => router.push('/order/ORD-2048' as any),
        },
      ]
    )
  }

  const handleChat = () => {
    router.push('/chat/conv-1' as any)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>
          {product.title}
        </Text>
        <TouchableOpacity style={styles.shareBtn}>
          <Ionicons name="share-outline" size={22} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Main Image Gallery */}
        <View style={styles.imageGallery}>
          <Image
            source={{ uri: product.images[selectedImageIndex] || product.primaryImage }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          {product.images.length > 1 && (
            <View style={styles.thumbRow}>
              {product.images.map((img, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setSelectedImageIndex(idx)}
                  style={[
                    styles.thumbWrapper,
                    {
                      borderColor: selectedImageIndex === idx ? theme.primary : 'transparent',
                    },
                  ]}
                >
                  <Image source={{ uri: img }} style={styles.thumbImage} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Product Meta */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.priceRow}>
            {product.transactionType === 'PASS' ? (
              <Text style={[styles.priceLarge, { color: theme.warning }]}>Miễn phí / Pass đồ</Text>
            ) : (
              <Text style={[styles.priceLarge, { color: theme.primary }]}>
                {formatVND(product.salePrice || 0)}
              </Text>
            )}
            <View style={styles.conditionTag}>
              <Text style={styles.conditionText}>
                {product.condition === 'LIKE_NEW'
                  ? 'Mới 99%'
                  : product.condition === 'USED_GOOD'
                  ? 'Rất tốt'
                  : 'Cũ theo thời gian'}
              </Text>
            </View>
          </View>

          <Text style={[styles.title, { color: theme.text }]}>{product.title}</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={theme.textMuted} />
            <Text style={[styles.locationText, { color: theme.textMuted }]}>
              {product.detailedLocation || `${product.districtName}, ${product.provinceName}`}
            </Text>
          </View>
        </View>

        {/* Escrow Guarantee Banner */}
        <View style={styles.escrowBox}>
          <Ionicons name="shield-checkmark" size={20} color="#2f6844" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.escrowTitle}>Bảo Vệ Giao Dịch Bằng Mộc Escrow</Text>
            <Text style={styles.escrowDesc}>
              Tiền cọc của bạn được đóng băng trung gian. Chỉ khi gặp mặt quét mã QR xác thực nhận hàng, tiền mới chuyển cho người bán!
            </Text>
          </View>
        </View>

        {/* Seller Info Card */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.sellerHeader}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }}
              style={styles.sellerAvatar}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.sellerName, { color: theme.text }]}>{product.sellerName}</Text>
                <View style={styles.kycBadge}>
                  <Ionicons name="checkmark-circle" size={12} color="#2f6844" />
                  <Text style={styles.kycText}>Đã eKYC</Text>
                </View>
              </View>
              <Text style={[styles.sellerMeta, { color: theme.textMuted }]}>
                Đánh giá: {product.sellerRating || 4.9} ⭐ ({product.sellerTrustScore}% tin cậy)
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.subHeading, { color: theme.text }]}>Mô tả món đồ</Text>
          <Text style={[styles.descText, { color: theme.text }]}>{product.description}</Text>

          {product.preferredExchangeItems && (
            <View style={styles.barterBox}>
              <Text style={styles.barterTitle}>🔄 Món đồ muốn đổi bù:</Text>
              <Text style={styles.barterText}>{product.preferredExchangeItems}</Text>
            </View>
          )}

          {product.noteForPass && (
            <View style={styles.passBox}>
              <Text style={styles.passTitle}>🎁 Lời nhắn người tặng:</Text>
              <Text style={styles.passText}>{product.noteForPass}</Text>
            </View>
          )}
        </View>

        {/* Suggested Safe Spot */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.subHeading, { color: theme.text }]}>Điểm hẹn an toàn đề xuất</Text>
          <View style={styles.spotRow}>
            <Ionicons name="cafe-outline" size={24} color={theme.primary} style={{ marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.spotName, { color: theme.text }]}>{mockSafeSpots[0].name}</Text>
              <Text style={[styles.spotAddress, { color: theme.textMuted }]}>{mockSafeSpots[0].address}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA Bar */}
      <View style={[styles.bottomBar, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
          <Ionicons name="chatbubbles-outline" size={20} color={theme.primary} />
          <Text style={[styles.chatBtnText, { color: theme.primary }]}>Đàm phán</Text>
        </TouchableOpacity>

        {product.transactionType === 'PASS' ? (
          <TouchableOpacity
            style={[styles.primaryActionBtn, { backgroundColor: theme.warning }]}
            onPress={() => Alert.alert('Đăng ký nhận đồ', 'Đơn xin nhận đồ của bạn đã được gửi đến chủ nhân!')}
          >
            <Text style={styles.primaryActionText}>ĐĂNG KÝ NHẬN ĐỒ</Text>
          </TouchableOpacity>
        ) : product.transactionType === 'BARTER' ? (
          <TouchableOpacity
            style={[styles.primaryActionBtn, { backgroundColor: theme.success }]}
            onPress={handleChat}
          >
            <Text style={styles.primaryActionText}>ĐỀ XUẤT ĐỔI ĐỒ</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.primaryActionBtn} onPress={handleBuyNow}>
            <Text style={styles.primaryActionText}>MUA NGAY (ESCROW)</Text>
          </TouchableOpacity>
        )}
      </View>
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
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    marginHorizontal: 12,
  },
  shareBtn: {
    padding: 4,
  },
  content: {
    paddingBottom: 24,
  },
  imageGallery: {
    width: '100%',
    backgroundColor: '#ebe4d3',
  },
  mainImage: {
    width: '100%',
    height: 300,
  },
  thumbRow: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  thumbWrapper: {
    width: 54,
    height: 54,
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 8,
    overflow: 'hidden',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  card: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: 14,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLarge: {
    fontSize: 22,
    fontWeight: '900',
  },
  conditionTag: {
    backgroundColor: '#faece8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  conditionText: {
    color: '#c5573e',
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    marginLeft: 4,
  },
  escrowBox: {
    flexDirection: 'row',
    backgroundColor: '#eaf3ed',
    padding: 14,
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 14,
    alignItems: 'center',
  },
  escrowTitle: {
    color: '#2f6844',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },
  escrowDesc: {
    color: '#2f6844',
    fontSize: 11,
    lineHeight: 16,
  },
  sellerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  sellerName: {
    fontSize: 15,
    fontWeight: '700',
  },
  kycBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaf3ed',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 6,
  },
  kycText: {
    color: '#2f6844',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 2,
  },
  sellerMeta: {
    fontSize: 12,
    marginTop: 2,
  },
  subHeading: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },
  descText: {
    fontSize: 14,
    lineHeight: 22,
  },
  barterBox: {
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#eaf3ed',
  },
  barterTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2f6844',
    marginBottom: 2,
  },
  barterText: {
    fontSize: 13,
    color: '#2f6844',
  },
  passBox: {
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fcf4e8',
  },
  passTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b26a1b',
    marginBottom: 2,
  },
  passText: {
    fontSize: 13,
    color: '#b26a1b',
  },
  spotRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotName: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  spotAddress: {
    fontSize: 11,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  chatButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  chatBtnText: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  primaryActionBtn: {
    flex: 1,
    backgroundColor: '#c5573e',
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  primaryActionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
})

import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { mockAuctions, mockBids, formatVND } from '../../mock/mockData'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function AuctionDetailScreen() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const auction = mockAuctions.find((a) => a.productId === id || a.id === id) || mockAuctions[0]
  const [bids, setBids] = useState(mockBids)
  const [proxyModalVisible, setProxyModalVisible] = useState(false)
  const [proxyMaxAmount, setProxyMaxAmount] = useState('')

  const nextMinBid = auction.currentPrice + auction.stepPrice

  const handleManualBid = () => {
    Alert.alert(
      'Xác nhận đặt giá thầu',
      `Bạn có chắc muốn đặt mức giá ${formatVND(nextMinBid)} cho món đồ này?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xác nhận đặt giá',
          onPress: () => {
            const newBid = {
              id: 'b-' + Date.now(),
              auctionId: auction.id,
              bidderId: 'USR-1001',
              bidderName: 'Minh Anh (Bạn)',
              bidAmount: nextMinBid,
              isAutoBid: false,
              createdAt: 'Vừa xong',
            }
            setBids([newBid, ...bids])
            auction.currentPrice = nextMinBid
            auction.bidsCount += 1
            Alert.alert('Thành công! 🔨', 'Bạn hiện là người trả giá cao nhất cho phiên đấu giá này!')
          },
        },
      ]
    )
  }

  const handleSetProxy = () => {
    const amount = Number(proxyMaxAmount)
    if (!amount || amount <= auction.currentPrice) {
      Alert.alert('Lỗi', `Giá trần tự động phải lớn hơn giá hiện tại (${formatVND(auction.currentPrice)}).`)
      return
    }

    setProxyModalVisible(false)
    Alert.alert(
      'Kích hoạt Proxy Bidding 🤖',
      `Hệ thống sẽ tự động nhảy bước giá thay bạn khi có người khác trả giá cao hơn, cho tới khi chạm mức trần ${formatVND(amount)}!`
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>
          Đấu Giá Trực Tiếp
        </Text>
        <TouchableOpacity style={styles.shareBtn}>
          <Ionicons name="share-outline" size={22} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Product Image */}
        <View style={styles.imageWrapper}>
          <Image source={{ uri: auction.productImage }} style={styles.image} resizeMode="cover" />
          <View style={styles.liveTag}>
            <View style={styles.pulseDot} />
            <Text style={styles.liveTagText}>ĐANG DIỄN RA</Text>
          </View>
        </View>

        {/* Countdown Box */}
        <View style={styles.countdownBox}>
          <View style={styles.countdownHeader}>
            <Ionicons name="time-outline" size={16} color="#ffffff" />
            <Text style={styles.countdownTitle}>THỜI GIAN CÒN LẠI</Text>
          </View>
          <Text style={styles.countdownValue}>05 : 42 : 18</Text>
          <Text style={styles.countdownNote}>Kết thúc lúc 22:00 hôm nay</Text>
        </View>

        {/* Auction Price Card */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.title, { color: theme.text }]}>{auction.productTitle}</Text>

          <View style={styles.priceRow}>
            <View>
              <Text style={[styles.priceSubLabel, { color: theme.textMuted }]}>Giá hiện tại</Text>
              <Text style={[styles.priceLarge, { color: theme.primary }]}>
                {formatVND(auction.currentPrice)}
              </Text>
            </View>
            <View style={styles.bidsBadge}>
              <Text style={styles.bidsBadgeText}>{auction.bidsCount} lượt đấu</Text>
            </View>
          </View>

          <View style={styles.priceMetaRow}>
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: theme.textMuted }]}>Giá khởi điểm</Text>
              <Text style={[styles.metaValue, { color: theme.text }]}>
                {formatVND(auction.startPrice)}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: theme.textMuted }]}>Bước giá tối thiểu</Text>
              <Text style={[styles.metaValue, { color: theme.text }]}>
                +{formatVND(auction.stepPrice)}
              </Text>
            </View>
          </View>
        </View>

        {/* Proxy Bidding Explanation */}
        <View style={[styles.proxyBox, { backgroundColor: '#faece8' }]}>
          <Ionicons name="hardware-chip-outline" size={20} color="#c5573e" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.proxyBoxTitle}>Đấu Giá Tự Động (Proxy Bidding)</Text>
            <Text style={styles.proxyBoxDesc}>
              Bạn bận việc? Hãy nhập mức giá tối đa bạn chấp nhận trả. Hệ thống Mộc sẽ tự động đặt giá thầu tối thiểu hộ bạn mỗi khi có người vượt giá!
            </Text>
          </View>
        </View>

        {/* Bid History Section */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.bidHistoryHeader}>
            <Text style={[styles.subHeading, { color: theme.text }]}>Lịch sử đặt giá gần nhất</Text>
            <Ionicons name="refresh-outline" size={16} color={theme.textMuted} />
          </View>

          {bids.map((b, idx) => (
            <View
              key={b.id}
              style={[
                styles.bidItem,
                { borderBottomColor: theme.border, borderBottomWidth: idx < bids.length - 1 ? 1 : 0 },
              ]}
            >
              <View style={styles.bidderRow}>
                <Ionicons
                  name={idx === 0 ? 'trophy' : 'person-circle-outline'}
                  size={18}
                  color={idx === 0 ? '#f5a623' : theme.textMuted}
                />
                <Text style={[styles.bidderName, { color: theme.text, fontWeight: idx === 0 ? '800' : '500' }]}>
                  {b.bidderName}
                </Text>
                {b.isAutoBid && (
                  <View style={styles.autoTag}>
                    <Text style={styles.autoTagText}>Auto</Text>
                  </View>
                )}
              </View>

              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[styles.bidAmount, { color: idx === 0 ? theme.primary : theme.text }]}>
                  {formatVND(b.bidAmount)}
                </Text>
                <Text style={[styles.bidTime, { color: theme.textMuted }]}>{b.createdAt}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.bottomBar, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TouchableOpacity
          style={styles.proxyBtn}
          onPress={() => setProxyModalVisible(true)}
        >
          <Ionicons name="hardware-chip-outline" size={18} color="#c5573e" />
          <Text style={styles.proxyBtnText}>Ủy quyền Proxy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.manualBidBtn} onPress={handleManualBid}>
          <Text style={styles.manualBidBtnText}>Đặt {formatVND(nextMinBid)}</Text>
        </TouchableOpacity>
      </View>

      {/* Proxy Bidding Modal */}
      <Modal visible={proxyModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Cài Đặt Đấu Giá Tự Động</Text>
              <TouchableOpacity onPress={() => setProxyModalVisible(false)}>
                <Ionicons name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.modalDesc, { color: theme.textMuted }]}>
              Nhập giá trần tối đa bạn có thể trả. Hệ thống sẽ chỉ tăng giá từng bước khi cần thiết để giữ vị trí dẫn đầu cho bạn.
            </Text>

            <Text style={[styles.inputLabel, { color: theme.text }]}>Giá trần tối đa (VNĐ)</Text>
            <TextInput
              style={[styles.modalInput, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
              placeholder={`Lớn hơn ${formatVND(auction.currentPrice)}`}
              placeholderTextColor={theme.textMuted}
              keyboardType="numeric"
              value={proxyMaxAmount}
              onChangeText={setProxyMaxAmount}
            />

            <TouchableOpacity style={styles.confirmProxyBtn} onPress={handleSetProxy}>
              <Text style={styles.confirmProxyBtnText}>XÁC NHẬN KÍCH HOẠT PROXY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  imageWrapper: {
    width: '100%',
    height: 260,
    position: 'relative',
    backgroundColor: '#ebe4d3',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  liveTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(197, 87, 62, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
    marginRight: 6,
  },
  liveTagText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
  countdownBox: {
    backgroundColor: '#004ac6',
    margin: 16,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#004ac6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  countdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  countdownTitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginLeft: 6,
  },
  countdownValue: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 2,
    marginVertical: 4,
  },
  countdownNote: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  priceSubLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  priceLarge: {
    fontSize: 24,
    fontWeight: '900',
  },
  bidsBadge: {
    backgroundColor: '#dce9ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  bidsBadgeText: {
    color: '#004ac6',
    fontSize: 11,
    fontWeight: '800',
  },
  priceMetaRow: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#c3c6d7',
    paddingTop: 12,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  proxyBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#d2bbff',
    backgroundColor: '#eedcff',
  },
  proxyBoxTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#712ae2',
    marginBottom: 4,
  },
  proxyBoxDesc: {
    fontSize: 11,
    lineHeight: 16,
    color: '#434655',
  },
  bidHistoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: '800',
  },
  bidItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  bidderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bidderName: {
    fontSize: 13,
    marginLeft: 6,
  },
  autoTag: {
    backgroundColor: '#eedcff',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    marginLeft: 6,
  },
  autoTagText: {
    color: '#712ae2',
    fontSize: 9,
    fontWeight: '800',
  },
  bidAmount: {
    fontSize: 13,
    fontWeight: '800',
  },
  bidTime: {
    fontSize: 10,
    marginTop: 2,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  proxyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#712ae2',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 46,
    marginRight: 10,
  },
  proxyBtnText: {
    color: '#712ae2',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  manualBidBtn: {
    flex: 1,
    backgroundColor: '#004ac6',
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  manualBidBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  modalDesc: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  modalInput: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 15,
    marginBottom: 20,
  },
  confirmProxyBtn: {
    backgroundColor: '#712ae2',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmProxyBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
})

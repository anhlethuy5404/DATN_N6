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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function BarterOfferScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const myItems = [
    {
      id: 'item-1',
      title: 'Sony A7III Body',
      value: '26.000.000 đ',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
    },
    {
      id: 'item-2',
      title: 'Air Jordan 1 Retro',
      value: '4.500.000 đ',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&q=80',
    },
    {
      id: 'item-3',
      title: 'Custom Mechanical KB',
      value: '3.800.000 đ',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    },
  ]

  const [selectedItemId, setSelectedItemId] = useState('item-1')

  const handleSendOffer = () => {
    Alert.alert(
      'Gửi đề xuất trao đổi',
      'Đề xuất trao đổi món đồ của bạn kèm bảo vệ cọc Escrow đã được gửi tới người bán!',
      [{ text: 'Đồng ý', onPress: () => router.push('/(tabs)/messages' as any) }]
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Đề Xuất Trao Đổi</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Target Item Section from Figma DềXuấtTraoDổiNexusExchangeMobile */}
        <View style={styles.targetSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80' }}
            style={styles.targetThumb}
          />
          <View style={styles.targetDetails}>
            <Text style={styles.targetTitle}>Vintage Diver Watch</Text>
            <Text style={styles.targetOwner}>Sở hữu bởi @hoang_collector</Text>
            <View style={styles.verifiedRow}>
              <Ionicons name="shield-checkmark" size={14} color="#004ac6" />
              <Text style={styles.verifiedText}>Đã xác minh CCCD & Trust Score 98</Text>
            </View>
          </View>
        </View>

        {/* Select Your Item to Trade */}
        <View style={styles.selectHeaderRow}>
          <Text style={[styles.sectionHeading, { color: theme.text }]}>Chọn món đồ của bạn</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/create' as any)}>
            <Text style={styles.addNewItemText}>+ Thêm đồ mới</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.itemsScroll}>
          {myItems.map((item) => {
            const isSelected = selectedItemId === item.id
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.myItemCard,
                  isSelected && styles.myItemCardSelected,
                ]}
                onPress={() => setSelectedItemId(item.id)}
                activeOpacity={0.88}
              >
                <Image source={{ uri: item.image }} style={styles.myItemThumb} />
                {isSelected && (
                  <View style={styles.checkBadge}>
                    <Ionicons name="checkmark" size={14} color="#ffffff" />
                  </View>
                )}
                <Text style={styles.myItemTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.myItemValue}>{item.value}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        {/* AI Trade Value Balance Indicator from Figma */}
        <View style={styles.aiBalanceCard}>
          <View style={styles.aiBalanceHeader}>
            <MaterialCommunityIcons name="creation" size={20} color="#712ae2" />
            <Text style={styles.aiBalanceTitle}>ĐỊNH GIÁ CÂN BẰNG TỰ ĐỘNG (AI VALUATION)</Text>
          </View>
          <Text style={styles.aiBalanceDesc}>
            AI ước tính giá trị món đồ của bạn tương đương món đồ đối tác. Khuyến nghị bù thêm:
          </Text>
          <View style={styles.compensationBox}>
            <Text style={styles.compensationLabel}>Tiền mặt bù qua Escrow:</Text>
            <Text style={styles.compensationAmount}>+ 500.000 ₫</Text>
          </View>
          <Text style={styles.compensationNote}>
            Khoản bù sẽ được khóa an toàn qua ví Nexus cho tới khi hai bên quét QR nhận đồ tại Safe Spot.
          </Text>
        </View>

        {/* Safe Meetup Spot selection */}
        <View style={styles.safeSpotBox}>
          <View style={styles.safeSpotHeader}>
            <Ionicons name="location" size={16} color="#004ac6" />
            <Text style={styles.safeSpotTitle}>Điểm hẹn bàn giao an toàn</Text>
          </View>
          <Text style={styles.safeSpotText}>
            Trung tâm TrustBid Quận 1 (12 Lê Lợi) • Có nhân viên giám sát & camera 24/7
          </Text>
        </View>

        {/* Send Proposal Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSendOffer} activeOpacity={0.88}>
          <Text style={styles.submitBtnText}>Gửi Đề Xuất Trao Đổi</Text>
          <Ionicons name="arrow-forward" size={18} color="#ffffff" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  content: {
    padding: 16,
    paddingBottom: 36,
  },
  targetSection: {
    flexDirection: 'row',
    backgroundColor: '#eff4ff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#c3c6d7',
    marginBottom: 20,
    alignItems: 'center',
  },
  targetThumb: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#ebe4d3',
    marginRight: 14,
  },
  targetDetails: {
    flex: 1,
  },
  targetTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0b1c30',
    marginBottom: 2,
  },
  targetOwner: {
    fontSize: 12,
    color: '#737686',
    marginBottom: 6,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#004ac6',
  },
  selectHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
  },
  addNewItemText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#004ac6',
  },
  itemsScroll: {
    marginBottom: 20,
  },
  myItemCard: {
    width: 130,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#c3c6d7',
    padding: 8,
    marginRight: 12,
    position: 'relative',
  },
  myItemCardSelected: {
    borderColor: '#004ac6',
    backgroundColor: '#eff4ff',
  },
  myItemThumb: {
    width: '100%',
    height: 90,
    borderRadius: 8,
    backgroundColor: '#ebe4d3',
    marginBottom: 6,
  },
  checkBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#004ac6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myItemTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0b1c30',
    textAlign: 'center',
  },
  myItemValue: {
    fontSize: 11,
    color: '#004ac6',
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 2,
  },
  aiBalanceCard: {
    backgroundColor: '#dce9ff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#712ae2',
    marginBottom: 20,
  },
  aiBalanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  aiBalanceTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#0b1c30',
    letterSpacing: 0.5,
  },
  aiBalanceDesc: {
    fontSize: 12,
    color: '#434655',
    lineHeight: 16,
    marginBottom: 10,
  },
  compensationBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  compensationLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0b1c30',
  },
  compensationAmount: {
    fontSize: 16,
    fontWeight: '900',
    color: '#712ae2',
  },
  compensationNote: {
    fontSize: 10,
    color: '#737686',
    lineHeight: 14,
  },
  safeSpotBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#c3c6d7',
    marginBottom: 24,
  },
  safeSpotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  safeSpotTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0b1c30',
  },
  safeSpotText: {
    fontSize: 11,
    color: '#434655',
    lineHeight: 16,
  },
  submitBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004ac6',
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#004ac6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
})

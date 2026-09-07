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
import { mockSafeSpots } from '../../mock/mockData'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function SafeSpotScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']
  const [selectedSpotId, setSelectedSpotId] = useState(mockSafeSpots[0].id)

  const handleSelectSpot = (spot: any) => {
    setSelectedSpotId(spot.id)
    Alert.alert(
      'Chọn điểm hẹn an toàn',
      `Đã chọn ${spot.name} làm điểm hẹn bàn giao hàng hóa có bảo vệ và camera giám sát 24/7!`,
      [{ text: 'Đồng ý', onPress: () => router.back() }]
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Điểm Gặp An Toàn (Safe Spot)</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Featured Safe Spot from Figma DiểmGặpAnToanNexusExchangeMobile */}
        <View style={styles.featuredCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' }}
            style={styles.featuredMapImage}
          />
          <View style={styles.verifiedBanner}>
            <View style={styles.verifiedRow}>
              <Ionicons name="shield-checkmark" size={14} color="#007d55" />
              <Text style={styles.verifiedText}>TrustBid Verified</Text>
            </View>
            <View style={styles.cctvBadge}>
              <Ionicons name="videocam" size={12} color="#ffffff" />
              <Text style={styles.cctvText}>CCTV 24/7</Text>
            </View>
          </View>

          <View style={styles.cardBody}>
            <Text style={styles.spotMainTitle}>Trung tâm TrustBid Quận 1</Text>
            <Text style={styles.spotAddress}>12 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM</Text>

            <View style={styles.featuresRow}>
              <View style={styles.featureItem}>
                <Ionicons name="videocam-outline" size={14} color="#004ac6" />
                <Text style={styles.featureText}>CCTV 24/7</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="people-outline" size={14} color="#004ac6" />
                <Text style={styles.featureText}>Có nhân viên</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="wifi-outline" size={14} color="#004ac6" />
                <Text style={styles.featureText}>Wifi miễn phí</Text>
              </View>
            </View>

            <View style={styles.distanceRow}>
              <Ionicons name="navigate" size={14} color="#007d55" />
              <Text style={styles.distanceText}>Cách đây 1.2 km • Mở cửa: 08:00 - 21:00</Text>
            </View>

            <TouchableOpacity
              style={styles.primaryActionBtn}
              onPress={() => handleSelectSpot(mockSafeSpots[0])}
            >
              <Text style={styles.primaryActionText}>Chọn điểm hẹn này</Text>
              <Ionicons name="arrow-forward" size={16} color="#ffffff" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Other Safe Spots List */}
        <Text style={[styles.sectionHeading, { color: theme.text }]}>Các điểm hẹn an toàn khác</Text>

        {mockSafeSpots.map((spot) => {
          const isSelected = selectedSpotId === spot.id
          return (
            <TouchableOpacity
              key={spot.id}
              style={[
                styles.spotCard,
                { backgroundColor: theme.card, borderColor: isSelected ? '#004ac6' : theme.border },
              ]}
              onPress={() => handleSelectSpot(spot)}
              activeOpacity={0.88}
            >
              <View style={styles.spotThumbWrapper}>
                <Image source={{ uri: spot.imageUrl }} style={styles.spotThumb} />
              </View>
              <View style={styles.spotDetails}>
                <View style={styles.spotTitleRow}>
                  <Text style={[styles.spotName, { color: theme.text }]} numberOfLines={1}>
                    {spot.name}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={18} color="#004ac6" />
                  )}
                </View>
                <Text style={styles.spotCardAddr} numberOfLines={1}>
                  {spot.address}
                </Text>
                <View style={styles.spotCardMeta}>
                  <Text style={styles.spotCardHours}>🕒 {spot.openingHours}</Text>
                  <Text style={styles.spotCardDistance}>📍 {spot.distanceKm} km</Text>
                </View>
              </View>
            </TouchableOpacity>
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  content: {
    padding: 16,
    paddingBottom: 36,
  },
  featuredCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#004ac6',
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#004ac6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredMapImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#dce9ff',
  },
  verifiedBanner: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1f4e0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#007d55',
  },
  cctvBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#004ac6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  cctvText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#ffffff',
  },
  cardBody: {
    padding: 16,
  },
  spotMainTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#0b1c30',
    marginBottom: 4,
  },
  spotAddress: {
    fontSize: 12,
    color: '#737686',
    marginBottom: 12,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#e5eeff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featureText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#004ac6',
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#007d55',
  },
  primaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#004ac6',
    paddingVertical: 12,
    borderRadius: 12,
  },
  primaryActionText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 12,
  },
  spotCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
  },
  spotThumbWrapper: {
    marginRight: 12,
  },
  spotThumb: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#ebe4d3',
  },
  spotDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  spotTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  spotName: {
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  spotCardAddr: {
    fontSize: 11,
    color: '#737686',
    marginBottom: 4,
  },
  spotCardMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  spotCardHours: {
    fontSize: 11,
    color: '#434655',
  },
  spotCardDistance: {
    fontSize: 11,
    color: '#004ac6',
    fontWeight: '600',
  },
})

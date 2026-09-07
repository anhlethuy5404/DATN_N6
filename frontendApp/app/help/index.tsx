import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function HelpCenterScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']
  const [searchTopic, setSearchTopic] = useState('')

  const handleAskAI = () => {
    if (!searchTopic.trim()) {
      Alert.alert('Nexus AI Help', 'Vui lòng nhập câu hỏi bạn cần trợ giúp (VD: Luật đấu giá, Quy trình cọc Escrow, Điểm hẹn Safe Spot...)')
      return
    }
    Alert.alert(
      'Nexus AI Assistant 🤖',
      `Câu hỏi: "${searchTopic}"\n\nNexus AI: Bạn hoàn toàn có thể an tâm giao dịch qua hệ thống Escrow tự động khóa tiền người mua cho đến khi quét mã QR nhận hàng tại điểm hẹn Safe Spot. Bạn có cần hướng dẫn chi tiết thêm không?`
    )
  }

  const quickPills = ['Bidding Rules', 'Payments & Escrow', 'Verification eKYC', 'Safe Meetup Spot']

  const guides = [
    {
      id: 'g1',
      title: 'Auction Guide',
      subtitle: 'Quy tắc đặt giá & Proxy Bidding',
      icon: 'gavel',
      iconBg: '#dce9ff',
      iconColor: '#004ac6',
    },
    {
      id: 'g2',
      title: 'Payments & Fees',
      subtitle: 'Ký quỹ Escrow & Biểu phí 0%',
      icon: 'wallet',
      iconBg: '#d1f4e0',
      iconColor: '#007d55',
    },
    {
      id: 'g3',
      title: 'Safety Center',
      subtitle: 'Điểm hẹn camera giám sát 24/7',
      icon: 'shield-checkmark',
      iconBg: '#eedcff',
      iconColor: '#712ae2',
    },
    {
      id: 'g4',
      title: 'Account Setup',
      subtitle: 'Định danh CCCD & Điểm Trust',
      icon: 'person-circle',
      iconBg: '#f0f3f8',
      iconColor: '#434655',
    },
  ]

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Help Center</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search & AI Assist Hero from Figma TrungTamTrợGiupNexusExchangeMobile */}
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>How can we help you?</Text>
          <View style={styles.aiSearchBox}>
            <MaterialCommunityIcons name="creation" size={20} color="#712ae2" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.aiInput}
              placeholder="Ask Nexus AI or search topics..."
              placeholderTextColor="#737686"
              value={searchTopic}
              onChangeText={setSearchTopic}
              onSubmitEditing={handleAskAI}
            />
            <TouchableOpacity style={styles.askBtn} onPress={handleAskAI}>
              <Ionicons name="send" size={14} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Quick Category Pills */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsScroll}>
            {quickPills.map((pill, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.pill}
                onPress={() => {
                  setSearchTopic(pill)
                  handleAskAI()
                }}
              >
                <Text style={styles.pillText}>{pill}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions Grid from Figma */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Hướng dẫn & Trợ giúp</Text>
        <View style={styles.grid}>
          {guides.map((g) => (
            <TouchableOpacity
              key={g.id}
              style={styles.gridCard}
              activeOpacity={0.88}
              onPress={() =>
                Alert.alert(g.title, `Thông tin chi tiết về ${g.subtitle} đã được cập nhật trên cẩm nang an toàn Nexus Exchange!`)
              }
            >
              <View style={[styles.iconCircle, { backgroundColor: g.iconBg }]}>
                <Ionicons name={g.icon as any} size={22} color={g.iconColor} />
              </View>
              <Text style={styles.cardTitle}>{g.title}</Text>
              <Text style={styles.cardSub} numberOfLines={2}>
                {g.subtitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Live Support CTA Banner from Figma */}
        <View style={styles.liveSupportCard}>
          <View style={styles.supportLeft}>
            <Ionicons name="headset" size={28} color="#004ac6" />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.supportTitle}>Cần nhân viên hỗ trợ trực tiếp?</Text>
              <Text style={styles.supportDesc}>
                Đội ngũ Trust & Safety trực 24/7 để bảo vệ phiên giao dịch của bạn.
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.supportBtn}
            onPress={() => Alert.alert('Nexus Support 24/7', 'Đang kết nối bạn với tổng đài viên điều phối viên Safe Spot...')}
          >
            <Text style={styles.supportBtnText}>Liên hệ hỗ trợ</Text>
          </TouchableOpacity>
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
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#c3c6d7',
    marginBottom: 20,
    shadowColor: '#712ae2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0b1c30',
    marginBottom: 12,
  },
  aiSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9ff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#d2bbff',
    paddingHorizontal: 12,
    height: 46,
    marginBottom: 12,
  },
  aiInput: {
    flex: 1,
    fontSize: 13,
    color: '#0b1c30',
    padding: 0,
  },
  askBtn: {
    backgroundColor: '#712ae2',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillsScroll: {
    flexDirection: 'row',
  },
  pill: {
    backgroundColor: '#dce9ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(195,198,215,0.5)',
    marginRight: 8,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#434655',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#c3c6d7',
    marginBottom: 12,
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0b1c30',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 11,
    color: '#737686',
    textAlign: 'center',
    lineHeight: 15,
  },
  liveSupportCard: {
    backgroundColor: '#eff4ff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#004ac6',
  },
  supportLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0b1c30',
  },
  supportDesc: {
    fontSize: 11,
    color: '#434655',
    marginTop: 2,
    lineHeight: 16,
  },
  supportBtn: {
    backgroundColor: '#004ac6',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  supportBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
})

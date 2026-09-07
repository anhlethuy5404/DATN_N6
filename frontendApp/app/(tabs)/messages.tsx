import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { mockConversations, formatVND } from '../../mock/mockData'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function MessagesScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Hội Thoại & Đàm Phán</Text>
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadBadgeText}>2 tin mới</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Safety Tip Banner */}
        <View style={[styles.tipCard, { backgroundColor: '#dce9ff' }]}>
          <Ionicons name="shield-checkmark" size={18} color="#004ac6" />
          <Text style={[styles.tipText, { color: '#004ac6' }]}>
            Luôn đàm phán và chốt giao dịch qua tin nhắn Nexus Exchange để được bảo vệ bằng Ký quỹ Escrow và điểm hẹn Safe Spot!
          </Text>
        </View>

        {/* Conversation List */}
        {mockConversations.map((conv) => (
          <TouchableOpacity
            key={conv.id}
            activeOpacity={0.8}
            onPress={() => router.push(`/chat/${conv.id}` as any)}
            style={[styles.convCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: conv.productImage }} style={styles.productThumb} />
              {conv.isOnline && <View style={styles.onlineDot} />}
            </View>

            <View style={styles.convDetails}>
              <View style={styles.nameRow}>
                <Text style={[styles.sellerName, { color: theme.text }]} numberOfLines={1}>
                  {conv.sellerName}
                </Text>
                <Text style={[styles.timeText, { color: theme.textMuted }]}>
                  {conv.lastMessageAt}
                </Text>
              </View>

              <Text style={[styles.productTitle, { color: theme.primary }]} numberOfLines={1}>
                {conv.productTitle} • {formatVND(conv.productPrice)}
              </Text>

              <View style={styles.messageRow}>
                <Text
                  style={[
                    styles.messagePreview,
                    {
                      color: conv.unreadCount > 0 ? theme.text : theme.textMuted,
                      fontWeight: conv.unreadCount > 0 ? '700' : '400',
                    },
                  ]}
                  numberOfLines={1}
                >
                  {conv.lastMessageText}
                </Text>
                {conv.unreadCount > 0 && (
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>{conv.unreadCount}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  unreadBadge: {
    backgroundColor: '#faece8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  unreadBadgeText: {
    color: '#c5573e',
    fontSize: 11,
    fontWeight: '700',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  tipText: {
    color: '#8c3b28',
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 8,
    flex: 1,
    fontWeight: '500',
  },
  convCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  productThumb: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#ebe4d3',
  },
  onlineDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2f6844',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  convDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  sellerName: {
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  timeText: {
    fontSize: 11,
    marginLeft: 6,
  },
  productTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messagePreview: {
    fontSize: 13,
    flex: 1,
    marginRight: 8,
  },
  countBadge: {
    backgroundColor: '#c5573e',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
})

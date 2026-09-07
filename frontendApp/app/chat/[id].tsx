import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { mockConversations, mockChatMessages, formatVND } from '../../mock/mockData'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const conv = mockConversations.find((c) => c.id === id) || mockConversations[0]
  const initialMessages = mockChatMessages[conv.id] || mockChatMessages['conv-1'] || []
  const [messages, setMessages] = useState(initialMessages)
  const [inputText, setInputText] = useState('')

  const handleSendMessage = () => {
    if (!inputText.trim()) return
    const newMsg = {
      id: 'm-' + Date.now(),
      roomId: conv.id,
      senderId: 'USR-1001',
      senderName: 'Minh Anh',
      messageType: 'TEXT' as const,
      content: inputText.trim(),
      isRead: true,
      createdAt: 'Vừa xong',
    }
    setMessages([...messages, newMsg])
    setInputText('')
  }

  const handleSendOffer = () => {
    Alert.prompt
      ? Alert.prompt(
          'Đàm phán trả giá',
          `Giá niêm yết: ${formatVND(conv.productPrice)}. Nhập giá bạn muốn đề xuất:`,
          (val) => {
            if (val) {
              const offerAmount = Number(val)
              const offerMsg = {
                id: 'm-' + Date.now(),
                roomId: conv.id,
                senderId: 'USR-1001',
                senderName: 'Minh Anh',
                messageType: 'OFFER' as const,
                content: `Đề xuất giá ${formatVND(offerAmount)}`,
                offerPrice: offerAmount,
                offerStatus: 'PENDING' as const,
                isRead: true,
                createdAt: 'Vừa xong',
              }
              setMessages([...messages, offerMsg])
            }
          }
        )
      : Alert.alert('Đàm phán trả giá', 'Tính năng đề xuất mức giá đã được gửi trong tin nhắn!')
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={[styles.headerName, { color: theme.text }]}>{conv.sellerName}</Text>
          <View style={styles.statusRow}>
            <View style={styles.onlineDot} />
            <Text style={[styles.statusText, { color: theme.textMuted }]}>Đang trực tuyến</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.meetupSpotBtn}
          onPress={() => Alert.alert('Điểm hẹn an toàn', 'Đề xuất gặp mặt tại Highlands Coffee Duy Tân (Có camera Mộc).')}
        >
          <Ionicons name="location-outline" size={20} color={theme.primary} />
        </TouchableOpacity>
      </View>

      {/* Pinned Product Card */}
      <View style={[styles.pinnedProduct, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <Image source={{ uri: conv.productImage }} style={styles.pinnedThumb} />
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <Text style={[styles.pinnedTitle, { color: theme.text }]} numberOfLines={1}>
            {conv.productTitle}
          </Text>
          <Text style={[styles.pinnedPrice, { color: theme.primary }]}>
            {formatVND(conv.productPrice)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buyNowBtn}
          onPress={() => router.push(`/product/${conv.productId}` as any)}
        >
          <Text style={styles.buyNowBtnText}>Xem đồ</Text>
        </TouchableOpacity>
      </View>

      {/* Message Stream */}
      <ScrollView contentContainerStyle={styles.messageList} showsVerticalScrollIndicator={false}>
        {messages.map((m) => {
          const isMe = m.senderId === 'USR-1001'

          if (m.messageType === 'OFFER') {
            return (
              <View
                key={m.id}
                style={[
                  styles.offerBubble,
                  {
                    alignSelf: isMe ? 'flex-end' : 'flex-start',
                    backgroundColor: isMe ? theme.primaryLight : theme.card,
                    borderColor: theme.primary,
                  },
                ]}
              >
                <View style={styles.offerHeader}>
                  <Ionicons name="pricetag" size={16} color={theme.primary} />
                  <Text style={[styles.offerTitle, { color: theme.primary }]}>ĐỀ XUẤT TRẢ GIÁ</Text>
                </View>
                <Text style={[styles.offerAmount, { color: theme.text }]}>
                  {formatVND(m.offerPrice || 15000000)}
                </Text>
                <View style={styles.offerStatusTag}>
                  <Text style={styles.offerStatusText}>
                    {m.offerStatus === 'ACCEPTED' ? '✓ ĐÃ CHẤP NHẬN' : 'ĐANG CHỜ PHẢN HỒI'}
                  </Text>
                </View>
                <Text style={[styles.bubbleTime, { color: theme.textMuted }]}>{m.createdAt}</Text>
              </View>
            )
          }

          return (
            <View
              key={m.id}
              style={[
                styles.bubble,
                isMe
                  ? [styles.myBubble, { backgroundColor: theme.primary }]
                  : [styles.theirBubble, { backgroundColor: theme.card, borderColor: theme.border }],
              ]}
            >
              <Text style={[styles.bubbleText, { color: isMe ? '#ffffff' : theme.text }]}>
                {m.content}
              </Text>
              <Text style={[styles.bubbleTime, { color: isMe ? '#dce9ff' : theme.textMuted }]}>
                {m.createdAt}
              </Text>
            </View>
          )
        })}

        {/* AI Safe Meetup Suggestion Banner from Figma NhắnTinGiaoDịchNexusExchangeMobile */}
        <View style={styles.safeMeetupBanner}>
          <View style={styles.safeMeetupLeft}>
            <View style={styles.safeMeetupIconWrapper}>
              <Ionicons name="shield-checkmark" size={18} color="#712ae2" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.safeMeetupTitle}>Gợi ý điểm gặp an toàn</Text>
              <Text style={styles.safeMeetupSubtitle}>
                Trung tâm TrustBid Quận 1 (Cách 1.2 km, có camera 24/7 & nhân viên hỗ trợ).
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.safeMeetupBtn}
            onPress={() => router.push('/safespot' as any)}
          >
            <Text style={styles.safeMeetupBtnText}>Xem điểm hẹn</Text>
            <Ionicons name="arrow-forward" size={12} color="#ffffff" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Chat Input Bar */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={[styles.inputBar, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
          <TouchableOpacity style={styles.offerIconBtn} onPress={handleSendOffer}>
            <Ionicons name="pricetag-outline" size={20} color="#004ac6" />
          </TouchableOpacity>
          <TextInput
            style={[styles.chatInput, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
            placeholder="Nhắn tin đàm phán..."
            placeholderTextColor={theme.textMuted}
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
            <Ionicons name="send" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  backBtn: {
    padding: 4,
    marginRight: 8,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 15,
    fontWeight: '800',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2f6844',
    marginRight: 4,
  },
  statusText: {
    fontSize: 11,
  },
  meetupSpotBtn: {
    padding: 6,
  },
  pinnedProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  pinnedThumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#ebe4d3',
  },
  pinnedTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  pinnedPrice: {
    fontSize: 13,
    fontWeight: '800',
  },
  buyNowBtn: {
    backgroundColor: '#dce9ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buyNowBtnText: {
    color: '#004ac6',
    fontSize: 12,
    fontWeight: '700',
  },
  messageList: {
    padding: 16,
    paddingBottom: 20,
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  myBubble: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  theirBubble: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 20,
  },
  bubbleTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  safeMeetupBanner: {
    backgroundColor: '#f8f9ff',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#d2bbff',
    padding: 12,
    marginTop: 8,
    marginBottom: 12,
    gap: 8,
  },
  safeMeetupLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  safeMeetupIconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#eedcff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeMeetupTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0b1c30',
  },
  safeMeetupSubtitle: {
    fontSize: 11,
    color: '#737686',
    marginTop: 2,
    lineHeight: 15,
  },
  safeMeetupBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#712ae2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  safeMeetupBtnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  offerBubble: {
    width: '78%',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    marginBottom: 12,
  },
  offerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  offerTitle: {
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  offerAmount: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 8,
  },
  offerStatusTag: {
    backgroundColor: '#d1f4e0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  offerStatusText: {
    color: '#007d55',
    fontSize: 10,
    fontWeight: '800',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  offerIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#dce9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  chatInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 14,
    marginRight: 8,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#004ac6',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

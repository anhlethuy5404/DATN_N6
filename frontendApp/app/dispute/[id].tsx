import React from 'react'
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
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { mockDisputes, formatVND } from '../../mock/mockData'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function DisputeDetailScreen() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const dispute = mockDisputes.find((d) => d.id === id || d.orderCode === id) || mockDisputes[0]

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Chi Tiết Khiếu Nại #{dispute.id}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status Card */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.statusRow}>
            <View>
              <Text style={styles.statusLabel}>Trạng thái tranh chấp:</Text>
              <Text style={styles.statusTitle}>
                {dispute.status === 'UNDER_REVIEW' ? 'Đang điều tra & đối soát' : 'Đã giải quyết'}
              </Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {dispute.status === 'UNDER_REVIEW' ? 'Đang xử lý' : 'Đã phán quyết'}
              </Text>
            </View>
          </View>

          {/* Frozen Escrow alert */}
          <View style={styles.freezeAlert}>
            <Ionicons name="lock-closed" size={18} color="#b26a1b" />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.freezeTitle}>Quỹ Ký Quỹ Đã Bị Phong Tỏa</Text>
              <Text style={styles.freezeSub}>
                Toàn bộ số tiền {formatVND(dispute.amount)} đã được đóng băng trung gian. Người bán không thể rút tiền cho đến khi tranh chấp kết thúc.
              </Text>
            </View>
          </View>
        </View>

        {/* Dispute Details */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Thông tin tranh chấp</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Mã đơn hàng liên quan:</Text>
            <TouchableOpacity onPress={() => router.push(`/order/${dispute.orderId}` as any)}>
              <Text style={styles.linkText}>#{dispute.orderCode} (Xem đơn)</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Người khiếu nại:</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>{dispute.openedBy}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Đối phương (Người bán):</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>{dispute.sellerName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Số tiền yêu cầu hoàn:</Text>
            <Text style={styles.amountHighlight}>{formatVND(dispute.amount)}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Ngày tạo yêu cầu:</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>{dispute.createdAt}</Text>
          </View>

          <View style={styles.reasonBox}>
            <Text style={styles.reasonLabel}>Lý do khiếu nại:</Text>
            <Text style={[styles.reasonText, { color: theme.text }]}>{dispute.reason}</Text>
          </View>
        </View>

        {/* Evidence Photos */}
        {dispute.evidences && dispute.evidences.length > 0 && (
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Bằng chứng hình ảnh & video</Text>
            <View style={styles.evidenceRow}>
              {dispute.evidences.map((img, idx) => (
                <Image key={idx} source={{ uri: img }} style={styles.evidenceImage} />
              ))}
            </View>
          </View>
        )}

        {/* Moderator Verdict */}
        {dispute.resolutionNote && (
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.modHeader}>
              <Ionicons name="shield-checkmark" size={18} color={theme.primary} />
              <Text style={[styles.sectionTitle, { color: theme.text, marginBottom: 0, marginLeft: 6 }]}>
                Biên bản xử lý của Điều phối viên
              </Text>
            </View>
            <View style={styles.modNoteBox}>
              <Text style={styles.modNoteText}>{dispute.resolutionNote}</Text>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.chatModBtn}
            onPress={() => Alert.alert('Tải lên bằng chứng', 'Chọn ảnh hoặc video bổ sung từ thư viện thiết bị...')}
          >
            <Ionicons name="cloud-upload-outline" size={18} color={theme.primary} />
            <Text style={[styles.chatModBtnText, { color: theme.primary }]}>Gửi Thêm Bằng Chứng</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backOrderBtn}
            onPress={() => router.push(`/order/${dispute.orderId}` as any)}
          >
            <Text style={styles.backOrderBtnText}>Về Chi Tiết Đơn Hàng</Text>
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
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  statusLabel: {
    fontSize: 11,
    color: '#737686',
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ba1a1a',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#ffdad6',
  },
  badgeText: {
    color: '#ba1a1a',
    fontSize: 11,
    fontWeight: '800',
  },
  freezeAlert: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fcf4e8',
    borderWidth: 1,
    borderColor: '#fae3c3',
    alignItems: 'center',
  },
  freezeTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#b26a1b',
  },
  freezeSub: {
    fontSize: 11,
    color: '#434655',
    lineHeight: 15,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eceef6',
  },
  detailLabel: {
    fontSize: 12,
    color: '#737686',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  linkText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#004ac6',
  },
  amountHighlight: {
    fontSize: 14,
    fontWeight: '800',
    color: '#004ac6',
  },
  reasonBox: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f8f9ff',
  },
  reasonLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#737686',
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 13,
    lineHeight: 18,
  },
  evidenceRow: {
    flexDirection: 'row',
    gap: 10,
  },
  evidenceImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c3c6d7',
  },
  modHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modNoteBox: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#edf5ee',
    borderWidth: 1,
    borderColor: '#cfe2d1',
  },
  modNoteText: {
    fontSize: 12,
    lineHeight: 17,
    color: '#0b1c30',
  },
  actionSection: {
    marginTop: 8,
    gap: 10,
  },
  chatModBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#004ac6',
    gap: 8,
  },
  chatModBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  backOrderBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#004ac6',
  },
  backOrderBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
})

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { mockDisputes, formatVND } from '../../mock/mockData'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function DisputeListScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Khiếu Nại & Tranh Chấp</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.infoBox, { backgroundColor: '#fcf4e8' }]}>
          <Ionicons name="shield-half-outline" size={20} color="#b26a1b" />
          <Text style={styles.infoText}>
            Quỹ Escrow sẽ tạm dừng giải ngân tiền cọc cho người bán ngay khi có khiếu nại phát sinh để bảo vệ người mua!
          </Text>
        </View>

        {mockDisputes.map((d) => (
          <View
            key={d.id}
            style={[styles.disputeCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <View style={styles.cardTop}>
              <Text style={[styles.orderRef, { color: theme.text }]}>Đơn hàng #{d.orderCode}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>
                  {d.status === 'UNDER_REVIEW' ? 'Đang xác minh' : 'Đã hoàn tất'}
                </Text>
              </View>
            </View>

            <Text style={[styles.reasonTitle, { color: theme.text }]}>{d.reason}</Text>
            <Text style={[styles.amountText, { color: theme.primary }]}>
              Số tiền tranh chấp: {formatVND(d.amount)}
            </Text>

            {d.resolutionNote && (
              <View style={[styles.noteBox, { backgroundColor: theme.background }]}>
                <Text style={[styles.noteLabel, { color: theme.textMuted }]}>Phán quyết điều phối viên:</Text>
                <Text style={[styles.noteText, { color: theme.text }]}>{d.resolutionNote}</Text>
              </View>
            )}

            <View style={styles.dateRow}>
              <Ionicons name="calendar-outline" size={12} color={theme.textMuted} />
              <Text style={[styles.dateText, { color: theme.textMuted }]}>Ngày tạo: {d.createdAt}</Text>
            </View>
          </View>
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
    fontSize: 17,
    fontWeight: '800',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  infoBox: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    color: '#b26a1b',
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 8,
    flex: 1,
  },
  disputeCard: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderRef: {
    fontSize: 13,
    fontWeight: '800',
  },
  statusBadge: {
    backgroundColor: '#fcf4e8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusBadgeText: {
    color: '#b26a1b',
    fontSize: 10,
    fontWeight: '800',
  },
  reasonTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  amountText: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 10,
  },
  noteBox: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  noteLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 2,
  },
  noteText: {
    fontSize: 12,
    lineHeight: 16,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 11,
    marginLeft: 4,
  },
})

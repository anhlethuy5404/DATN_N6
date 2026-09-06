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
import { mockNotifications } from '../../mock/mockData'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function NotificationsScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'OUTBID':
        return { name: 'hammer', color: '#c5573e', bg: '#faece8' }
      case 'ORDER_UPDATED':
        return { name: 'cube', color: '#2f6844', bg: '#eaf3ed' }
      case 'AUCTION_WON':
        return { name: 'trophy', color: '#f5a623', bg: '#fcf4e8' }
      default:
        return { name: 'notifications', color: '#395368', bg: '#eef2f5' }
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Hộp Thư Thông Báo</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {mockNotifications.map((n) => {
          const icon = getNotifIcon(n.type)
          return (
            <View
              key={n.id}
              style={[
                styles.notifCard,
                {
                  backgroundColor: n.isRead ? theme.card : theme.primaryLight,
                  borderColor: theme.border,
                },
              ]}
            >
              <View style={[styles.iconBox, { backgroundColor: icon.bg }]}>
                <Ionicons name={icon.name as any} size={20} color={icon.color} />
              </View>

              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[styles.title, { color: theme.text, fontWeight: n.isRead ? '600' : '800' }]}>
                  {n.title}
                </Text>
                <Text style={[styles.message, { color: theme.textMuted }]}>{n.content}</Text>
                <Text style={[styles.time, { color: theme.textMuted }]}>{n.createdAt}</Text>
              </View>
            </View>
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
    fontSize: 17,
    fontWeight: '800',
  },
  content: {
    padding: 16,
  },
  notifCard: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
  },
  message: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 6,
  },
  time: {
    fontSize: 10,
  },
})

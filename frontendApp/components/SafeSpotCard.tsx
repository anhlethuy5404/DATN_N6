import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeMeetupSpot } from '../types'
import { Colors } from '../constants/theme'
import { useColorScheme } from '../hooks/use-color-scheme'

interface SafeSpotCardProps {
  spot: SafeMeetupSpot
  isSelected?: boolean
  onSelect?: (spot: SafeMeetupSpot) => void
}

export const SafeSpotCard = ({ spot, isSelected, onSelect }: SafeSpotCardProps) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const getSpotIcon = () => {
    switch (spot.spotType) {
      case 'COFFEE':
        return 'cafe-outline'
      case 'POST_OFFICE':
        return 'mail-outline'
      case 'SUPERMARKET':
        return 'cart-outline'
      case 'POLICE_STATION':
        return 'shield-outline'
      default:
        return 'videocam-outline'
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onSelect && onSelect(spot)}
      style={[
        styles.card,
        {
          backgroundColor: isSelected ? theme.primaryLight : theme.card,
          borderColor: isSelected ? theme.primary : theme.border,
        },
      ]}
    >
      <View style={[styles.iconBox, { backgroundColor: isSelected ? theme.primary : '#faece8' }]}>
        <Ionicons name={getSpotIcon() as any} size={20} color={isSelected ? '#ffffff' : theme.primary} />
      </View>

      <View style={styles.textWrapper}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            {spot.name}
          </Text>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={12} color="#2f6844" />
            <Text style={styles.verifiedText}>Điểm an toàn</Text>
          </View>
        </View>
        <Text style={[styles.address, { color: theme.textMuted }]} numberOfLines={2}>
          {spot.address}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaf3ed',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 6,
  },
  verifiedText: {
    color: '#2f6844',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 2,
  },
  address: {
    fontSize: 12,
    lineHeight: 16,
  },
})

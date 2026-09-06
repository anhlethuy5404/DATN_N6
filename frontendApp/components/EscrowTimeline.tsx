import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { OrderStatus } from '../types'
import { Colors } from '../constants/theme'
import { useColorScheme } from '../hooks/use-color-scheme'

interface EscrowTimelineProps {
  status: OrderStatus
  isDirectMeetup?: boolean
}

export const EscrowTimeline = ({ status, isDirectMeetup = true }: EscrowTimelineProps) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const getStepIndex = (): number => {
    switch (status) {
      case 'PENDING_PAYMENT':
        return 0
      case 'ESCROW_HOLDING':
        return 1
      case 'SHIPPING':
        return 2
      case 'DELIVERED':
        return 3
      case 'COMPLETED':
        return 4
      case 'DISPUTING':
        return 2
      case 'REFUNDED':
        return 4
      default:
        return 1
    }
  }

  const currentStep = getStepIndex()

  const steps = [
    { label: 'Đặt cọc', icon: 'card-outline' as const },
    { label: 'Mộc khóa tiền', icon: 'shield-checkmark-outline' as const },
    { label: isDirectMeetup ? 'Hẹn gặp Safe Spot' : 'Đang giao hàng', icon: isDirectMeetup ? 'location-outline' as const : 'cube-outline' as const },
    { label: 'Quét QR nhận đồ', icon: 'qr-code-outline' as const },
    { label: 'Giải ngân người bán', icon: 'checkmark-circle-outline' as const },
  ]

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.headerRow}>
        <Ionicons name="shield-checkmark" size={16} color={theme.primary} />
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Quy Trình Ký Gửi Bảo Vệ (Mộc Escrow)
        </Text>
      </View>

      <View style={styles.timelineWrapper}>
        {steps.map((step, idx) => {
          const isDone = idx < currentStep
          const isActive = idx === currentStep
          const dotColor = isDone ? '#2f6844' : isActive ? theme.primary : '#c7c2b5'
          const textColor = isDone ? '#2f6844' : isActive ? theme.text : theme.textMuted

          return (
            <View key={idx} style={styles.stepItem}>
              <View style={styles.iconRow}>
                <View style={[styles.dotCircle, { backgroundColor: dotColor }]}>
                  <Ionicons
                    name={isDone ? 'checkmark' : step.icon}
                    size={12}
                    color="#ffffff"
                  />
                </View>
                {idx < steps.length - 1 && (
                  <View
                    style={[
                      styles.connectingLine,
                      { backgroundColor: idx < currentStep ? '#2f6844' : '#e6decb' },
                    ]}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  { color: textColor, fontWeight: isActive ? '700' : '500' },
                ]}
                numberOfLines={2}
              >
                {step.label}
              </Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 6,
  },
  timelineWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepItem: {
    flex: 1,
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 6,
    position: 'relative',
  },
  dotCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  connectingLine: {
    position: 'absolute',
    left: '50%',
    right: '-50%',
    height: 2,
    top: 10,
    zIndex: 1,
  },
  stepLabel: {
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 13,
  },
})

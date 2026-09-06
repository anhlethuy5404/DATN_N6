import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function CreateDisputeScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const [reason, setReason] = useState('Sản phẩm không đúng mô tả')
  const [description, setDescription] = useState('')

  const reasons = [
    'Sản phẩm không đúng mô tả',
    'Món đồ bị nứt vỡ / hư hỏng khi nhận',
    'Nghi vấn hàng giả / nhái thương hiệu',
    'Người bán không đến điểm hẹn an toàn',
  ]

  const handleSubmit = () => {
    if (!description.trim()) {
      Alert.alert('Lỗi', 'Vui lòng mô tả chi tiết vấn đề bạn gặp phải.')
      return
    }

    Alert.alert(
      'Khiếu nại đã được tiếp nhận 🛡️',
      'Điều phối viên Mộc sẽ liên hệ với hai bên và kiểm tra bằng chứng hình ảnh. Tiền cọc Escrow đã được phong tỏa an toàn.',
      [
        {
          text: 'Đã hiểu',
          onPress: () => router.push('/dispute' as any),
        },
      ]
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Mở Khiếu Nại Đơn Hàng</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.label, { color: theme.text }]}>Lý do khiếu nại</Text>
        {reasons.map((r) => {
          const isSelected = reason === r
          return (
            <TouchableOpacity
              key={r}
              onPress={() => setReason(r)}
              style={[
                styles.reasonItem,
                {
                  backgroundColor: isSelected ? theme.primaryLight : theme.card,
                  borderColor: isSelected ? theme.primary : theme.border,
                },
              ]}
            >
              <Ionicons
                name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                size={18}
                color={isSelected ? theme.primary : theme.textMuted}
                style={{ marginRight: 10 }}
              />
              <Text style={[styles.reasonText, { color: theme.text }]}>{r}</Text>
            </TouchableOpacity>
          )
        })}

        <Text style={[styles.label, { color: theme.text, marginTop: 14 }]}>Mô tả chi tiết bằng chứng *</Text>
        <TextInput
          style={[
            styles.textArea,
            { backgroundColor: theme.card, borderColor: theme.border, color: theme.text },
          ]}
          placeholder="Mô tả cụ thể vị trí vết nứt, tem bảo hành, hoặc điểm sai khác so với hình ảnh người bán đăng..."
          placeholderTextColor={theme.textMuted}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={[styles.label, { color: theme.text, marginTop: 14 }]}>Hình ảnh / Video bằng chứng</Text>
        <TouchableOpacity style={[styles.uploadBox, { borderColor: theme.primary, backgroundColor: theme.card }]}>
          <Ionicons name="camera-outline" size={28} color={theme.primary} />
          <Text style={[styles.uploadText, { color: theme.text }]}>Tải lên ảnh chụp rõ khuyết tật</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>GỬI KHIẾU NẠI CHO ĐIỀU PHỐI VIÊN</Text>
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
    fontSize: 17,
    fontWeight: '800',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  reasonText: {
    fontSize: 13,
    flex: 1,
  },
  textArea: {
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    fontSize: 14,
    textAlignVertical: 'top',
  },
  uploadBox: {
    height: 90,
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  submitBtn: {
    backgroundColor: '#b26a1b',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
})

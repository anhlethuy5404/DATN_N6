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

export default function VerificationScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const [idNumber, setIdNumber] = useState('025096001234')
  const [realName, setRealName] = useState('LÊ MINH ANH')
  const [dob, setDob] = useState('15/03/1996')

  const handleSubmitKyc = () => {
    Alert.alert(
      'Hồ sơ đã gửi thành công',
      'Kiểm duyệt viên Mộc sẽ đối soát ảnh CCCD và cấp tích xanh định danh cho tài khoản của bạn trong vòng 1-2 giờ làm việc.',
      [
        {
          text: 'Đồng ý',
          onPress: () => router.back(),
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
        <Text style={[styles.headerTitle, { color: theme.text }]}>Xác Thực Định Danh eKYC</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.infoBanner, { backgroundColor: '#eaf3ed' }]}>
          <Ionicons name="shield-checkmark" size={20} color="#2f6844" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.infoTitle}>Tích Xanh Định Danh Uy Tín</Text>
            <Text style={styles.infoDesc}>
              Tài khoản có tích xanh eKYC được ưu tiên hiển thị bài đăng bán và tăng 80% tỷ lệ chốt đơn thành công!
            </Text>
          </View>
        </View>

        {/* CCCD Photo Uploads */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>1. Ảnh chụp CCCD gắn chip</Text>
        <View style={styles.photoRow}>
          <TouchableOpacity style={[styles.photoBox, { borderColor: theme.primary, backgroundColor: theme.card }]}>
            <Ionicons name="camera-outline" size={28} color={theme.primary} />
            <Text style={[styles.photoLabel, { color: theme.text }]}>Mặt trước CCCD</Text>
            <Text style={[styles.photoHint, { color: theme.textMuted }]}>Rõ số, không chói</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.photoBox, { borderColor: theme.primary, backgroundColor: theme.card }]}>
            <Ionicons name="camera-outline" size={28} color={theme.primary} />
            <Text style={[styles.photoLabel, { color: theme.text }]}>Mặt sau CCCD</Text>
            <Text style={[styles.photoHint, { color: theme.textMuted }]}>Rõ chip, vân tay</Text>
          </TouchableOpacity>
        </View>

        {/* Form Details */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 20 }]}>
          2. Thông tin đối soát
        </Text>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Số CCCD / Hộ chiếu (12 số)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
            keyboardType="numeric"
            value={idNumber}
            onChangeText={setIdNumber}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Họ và tên theo CCCD</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
            autoCapitalize="characters"
            value={realName}
            onChangeText={setRealName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Ngày tháng năm sinh</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
            placeholder="DD/MM/YYYY"
            placeholderTextColor={theme.textMuted}
            value={dob}
            onChangeText={setDob}
          />
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitKyc}>
          <Text style={styles.submitBtnText}>GỬI HỒ SƠ XÁC MINH EKYC</Text>
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
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
  },
  infoTitle: {
    color: '#2f6844',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },
  infoDesc: {
    color: '#2f6844',
    fontSize: 11,
    lineHeight: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 12,
  },
  photoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoBox: {
    width: '48%',
    height: 120,
    borderRadius: 14,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  photoLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 6,
  },
  photoHint: {
    fontSize: 10,
    marginTop: 2,
  },
  formGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  submitBtn: {
    backgroundColor: '#c5573e',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
})

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
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function ForgotPasswordScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const [step, setStep] = useState<1 | 2>(1)
  const [identifier, setIdentifier] = useState('minhanh@gmail.com')
  const [otpCode, setOtpCode] = useState('849210')
  const [newPassword, setNewPassword] = useState('')

  const handleSendOtp = () => {
    if (!identifier.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập Email hoặc Số điện thoại')
      return
    }
    Alert.alert('Mã xác thực OTP', 'Mã xác thực gồm 6 số đã được gửi tới tài khoản của bạn (Mã thử nghiệm: 849210).')
    setStep(2)
  }

  const handleResetPassword = () => {
    if (!newPassword.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu mới')
      return
    }
    Alert.alert('Thành công! 🎉', 'Mật khẩu của bạn đã được cập nhật lại thành công. Vui lòng đăng nhập lại.', [
      {
        text: 'Đăng nhập ngay',
        onPress: () => router.replace('/auth/login' as any),
      },
    ])
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Nav */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.brandHeader}>
          <View style={styles.logoBadge}>
            <Ionicons name="key" size={26} color="#ffffff" />
          </View>
          <Text style={styles.brandTitle}>Quên Mật Khẩu?</Text>
          <Text style={styles.brandSubtitle}>
            {step === 1
              ? 'Nhập Email hoặc SĐT đã đăng ký để nhận mã khôi phục OTP'
              : 'Nhập mã xác thực 6 số và đặt lại mật khẩu mới an toàn'}
          </Text>
        </View>

        <View style={[styles.formCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          {step === 1 ? (
            <>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email hoặc Số điện thoại</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={18} color="#737686" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: theme.text }]}
                    value={identifier}
                    onChangeText={setIdentifier}
                    placeholder="VD: user@example.com hoặc 0912..."
                    placeholderTextColor="#737686"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={handleSendOtp} activeOpacity={0.88}>
                <Text style={styles.primaryBtnText}>Gửi Mã Xác Thực OTP</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Mã xác thực OTP (6 số)</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="shield-checkmark-outline" size={18} color="#737686" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: theme.text }]}
                    value={otpCode}
                    onChangeText={setOtpCode}
                    placeholder="Nhập 6 số..."
                    placeholderTextColor="#737686"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Mật khẩu mới</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={18} color="#737686" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: theme.text }]}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Tối thiểu 6 ký tự..."
                    placeholderTextColor="#737686"
                    secureTextEntry
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={handleResetPassword} activeOpacity={0.88}>
                <Text style={styles.primaryBtnText}>Cập Nhật Mật Khẩu</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.resendBtn} onPress={() => setStep(1)}>
                <Text style={styles.resendText}>Đổi lại Email / SĐT khác</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Nhớ mật khẩu rồi?</Text>
          <TouchableOpacity onPress={() => router.push('/auth/login' as any)}>
            <Text style={styles.loginLink}>Đăng nhập</Text>
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
  topNav: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backBtn: {
    padding: 6,
    alignSelf: 'flex-start',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#712ae2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#712ae2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0b1c30',
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#737686',
    marginTop: 4,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  formCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#434655',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9ff',
    borderWidth: 1,
    borderColor: '#c3c6d7',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  primaryBtn: {
    backgroundColor: '#004ac6',
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#004ac6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 4,
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  resendBtn: {
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 6,
  },
  resendText: {
    color: '#737686',
    fontSize: 12,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 6,
  },
  footerText: {
    fontSize: 13,
    color: '#737686',
  },
  loginLink: {
    fontSize: 13,
    fontWeight: '800',
    color: '#004ac6',
  },
})

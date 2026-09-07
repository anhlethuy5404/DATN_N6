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
import { useAuth } from '../../contexts/AuthContext'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function RegisterScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']
  const { login } = useAuth()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [showPass, setShowPass] = useState(false)

  const handleRegister = () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu!')
      return
    }
    if (password !== confirmPass) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp!')
      return
    }
    if (!agreeTerms) {
      Alert.alert('Thông báo', 'Bạn cần đồng ý với Điều khoản và Quy chế Ký quỹ Escrow để tiếp tục!')
      return
    }

    login('USER')
    Alert.alert('Đăng ký thành công! 🎉', 'Chào mừng bạn đến với sàn giao dịch Nexus Exchange.', [
      {
        text: 'Bắt đầu khám phá',
        onPress: () => router.replace('/(tabs)/index' as any),
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
        {/* Brand Header */}
        <View style={styles.brandHeader}>
          <View style={styles.logoBadge}>
            <Ionicons name="person-add" size={26} color="#ffffff" />
          </View>
          <Text style={styles.brandTitle}>Tạo Tài Khoản Mới</Text>
          <Text style={styles.brandSubtitle}>Tham gia mua bán & đấu giá ký quỹ an toàn 100%</Text>
        </View>

        {/* Form */}
        <View style={[styles.formCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          {/* Full Name */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Họ và tên</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={18} color="#737686" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={fullName}
                onChangeText={setFullName}
                placeholder="VD: Lê Minh Anh"
                placeholderTextColor="#737686"
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={18} color="#737686" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={email}
                onChangeText={setEmail}
                placeholder="VD: user@example.com"
                placeholderTextColor="#737686"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Phone */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Số điện thoại</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={18} color="#737686" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={phone}
                onChangeText={setPhone}
                placeholder="VD: 0912 345 678"
                placeholderTextColor="#737686"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Mật khẩu</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={18} color="#737686" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={password}
                onChangeText={setPassword}
                placeholder="Tối thiểu 6 ký tự..."
                placeholderTextColor="#737686"
                secureTextEntry={!showPass}
              />
              <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={18} color="#737686" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Xác nhận mật khẩu</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="shield-checkmark-outline" size={18} color="#737686" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={confirmPass}
                onChangeText={setConfirmPass}
                placeholder="Nhập lại mật khẩu..."
                placeholderTextColor="#737686"
                secureTextEntry={!showPass}
              />
            </View>
          </View>

          {/* Agree checkbox */}
          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAgreeTerms(!agreeTerms)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={agreeTerms ? 'checkbox' : 'square-outline'}
              size={20}
              color={agreeTerms ? '#004ac6' : '#737686'}
            />
            <Text style={styles.termsText}>
              Tôi đồng ý với <Text style={{ color: '#004ac6', fontWeight: '700' }}>Điều khoản & Quy chế Ký quỹ Escrow</Text> của Nexus Exchange.
            </Text>
          </TouchableOpacity>

          {/* Register CTA */}
          <TouchableOpacity style={styles.registerBtn} onPress={handleRegister} activeOpacity={0.88}>
            <Text style={styles.registerBtnText}>Tạo Tài Khoản</Text>
          </TouchableOpacity>
        </View>

        {/* Link back to login */}
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => router.push('/auth/login' as any)}>
            <Text style={styles.loginLink}>Đăng nhập ngay</Text>
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
    marginBottom: 20,
  },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#004ac6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#004ac6',
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
    marginBottom: 14,
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
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 12,
    gap: 8,
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    color: '#434655',
    lineHeight: 18,
  },
  registerBtn: {
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
    marginTop: 6,
  },
  registerBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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

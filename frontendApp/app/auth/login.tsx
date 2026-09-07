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

export default function LoginScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']
  const { login } = useAuth()

  const [email, setEmail] = useState('minhanh@gmail.com')
  const [password, setPassword] = useState('123456')
  const [showPass, setShowPass] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ Email và Mật khẩu')
      return
    }
    login('USER')
    Alert.alert('Đăng nhập thành công', 'Chào mừng bạn quay trở lại với Nexus Exchange!', [
      { text: 'Bắt đầu', onPress: () => router.replace('/(tabs)/index' as any) },
    ])
  }

  const handleBiometric = () => {
    Alert.alert('Sinh trắc học', 'Quét khuôn mặt FaceID / Vân tay thành công!', [
      {
        text: 'Vào ứng dụng',
        onPress: () => {
          login('USER')
          router.replace('/(tabs)/index' as any)
        },
      },
    ])
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top bar back button */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="close" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Brand Header from Figma DangNhậpNexusExchangeMobile */}
        <View style={styles.brandHeader}>
          <View style={styles.logoBadge}>
            <Ionicons name="swap-horizontal" size={28} color="#ffffff" />
          </View>
          <Text style={styles.brandTitle}>Nexus Exchange</Text>
          <Text style={styles.brandSubtitle}>Secure, Intelligent C2C Trading</Text>
        </View>

        {/* Login Form */}
        <View style={styles.formCard}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email hoặc Số điện thoại</Text>
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

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Mật khẩu</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={18} color="#737686" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={password}
                onChangeText={setPassword}
                placeholder="Nhập mật khẩu..."
                placeholderTextColor="#737686"
                secureTextEntry={!showPass}
              />
              <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={18} color="#737686" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember me & Forgot Password */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.rememberRow}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <Ionicons
                name={rememberMe ? 'checkbox' : 'square-outline'}
                size={18}
                color={rememberMe ? '#004ac6' : '#737686'}
              />
              <Text style={styles.rememberText}>Ghi nhớ tôi</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/auth/forgot-password' as any)}>
              <Text style={styles.forgotText}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity style={styles.signInBtn} onPress={handleSignIn} activeOpacity={0.88}>
            <Text style={styles.signInBtnText}>Đăng Nhập</Text>
          </TouchableOpacity>

          {/* Biometric Button from Figma */}
          <TouchableOpacity style={styles.biometricBtn} onPress={handleBiometric} activeOpacity={0.8}>
            <Ionicons name="finger-print" size={22} color="#004ac6" />
            <Text style={styles.biometricBtnText}>Đăng nhập bằng Sinh trắc học (Biometric)</Text>
          </TouchableOpacity>
        </View>

        {/* Social Login */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>hoặc tiếp tục với</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity
            style={styles.socialBtn}
            onPress={() => Alert.alert('Google Sign-In', 'Đang kết nối tài khoản Google...')}
          >
            <Ionicons name="logo-google" size={18} color="#ba1a1a" />
            <Text style={styles.socialBtnText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialBtn}
            onPress={() => Alert.alert('Apple Sign-In', 'Đang kết nối tài khoản Apple ID...')}
          >
            <Ionicons name="logo-apple" size={18} color="#0b1c30" />
            <Text style={styles.socialBtnText}>Apple</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.registerPrompt}>
          <Text style={[styles.registerPromptText, { color: theme.textMuted }]}>
            Chưa có tài khoản Nexus Exchange?
          </Text>
          <TouchableOpacity onPress={() => router.push('/auth/register' as any)}>
            <Text style={styles.registerLink}> Đăng ký tài khoản mới</Text>
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#004ac6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#004ac6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#004ac6',
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    fontSize: 13,
    color: '#434655',
    marginTop: 4,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#c3c6d7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0b1c30',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c3c6d7',
    paddingHorizontal: 12,
    height: 46,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rememberText: {
    fontSize: 12,
    color: '#434655',
  },
  forgotText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#004ac6',
  },
  signInBtn: {
    backgroundColor: '#004ac6',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#004ac6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  signInBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  biometricBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5eeff',
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c3c6d7',
    gap: 8,
  },
  biometricBtnText: {
    color: '#004ac6',
    fontSize: 13,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#c3c6d7',
  },
  dividerText: {
    fontSize: 12,
    color: '#737686',
    marginHorizontal: 12,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 14,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#c3c6d7',
    gap: 8,
  },
  socialBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0b1c30',
  },
  registerPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
    flexWrap: 'wrap',
  },
  registerPromptText: {
    fontSize: 13,
  },
  registerLink: {
    fontSize: 13,
    fontWeight: '800',
    color: '#004ac6',
  },
})

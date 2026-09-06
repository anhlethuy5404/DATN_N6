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
import { mockWallet, formatVND } from '../../mock/mockData'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function WithdrawScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const [bankName, setBankName] = useState('Vietcombank')
  const [accountNumber, setAccountNumber] = useState('001100456789')
  const [accountHolder, setAccountHolder] = useState('LE MINH ANH')
  const [amount, setAmount] = useState('')

  const handleWithdraw = () => {
    const numAmount = Number(amount)
    if (!numAmount || numAmount < 50000) {
      Alert.alert('Lỗi', 'Số tiền rút tối thiểu là 50.000 ₫.')
      return
    }
    if (numAmount > mockWallet.balance) {
      Alert.alert('Lỗi', `Số dư khả dụng của bạn không đủ (${formatVND(mockWallet.balance)}).`)
      return
    }

    Alert.alert(
      'Yêu cầu rút tiền thành công',
      `Mộc đã tiếp nhận yêu cầu rút ${formatVND(numAmount)} về tài khoản ${bankName} (${accountNumber}). Tiền sẽ về tài khoản trong vòng 2-24 giờ làm việc.`,
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
        <Text style={[styles.headerTitle, { color: theme.text }]}>Rút Tiền Về Ngân Hàng</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Available Balance Box */}
        <View style={[styles.balanceCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.balanceLabel, { color: theme.textMuted }]}>Số dư khả dụng có thể rút</Text>
          <Text style={[styles.balanceVal, { color: theme.primary }]}>{formatVND(mockWallet.balance)}</Text>
        </View>

        {/* Form */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Ngân hàng thụ hưởng</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
            value={bankName}
            onChangeText={setBankName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Số tài khoản ngân hàng</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
            keyboardType="numeric"
            value={accountNumber}
            onChangeText={setAccountNumber}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Tên chủ tài khoản (Không dấu)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
            autoCapitalize="characters"
            value={accountHolder}
            onChangeText={setAccountHolder}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Số tiền cần rút (VNĐ)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
            placeholder="Tối thiểu 50.000 ₫"
            placeholderTextColor={theme.textMuted}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <TouchableOpacity onPress={() => setAmount(String(mockWallet.balance))} style={{ marginTop: 6 }}>
            <Text style={{ color: theme.primary, fontSize: 12, fontWeight: '700' }}>
              Rút toàn bộ số dư ({formatVND(mockWallet.balance)})
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleWithdraw}>
          <Text style={styles.submitBtnText}>XÁC NHẬN RÚT TIỀN</Text>
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
  },
  balanceCard: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 20,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  balanceVal: {
    fontSize: 22,
    fontWeight: '900',
  },
  formGroup: {
    marginBottom: 16,
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

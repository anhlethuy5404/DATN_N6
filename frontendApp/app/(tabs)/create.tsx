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
  Switch,
  Image,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { mockCategories, mockSafeSpots } from '../../mock/mockData'
import { TransactionType, ProductCondition } from '../../types'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function CreateProductScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const [transactionType, setTransactionType] = useState<TransactionType>('SALE')
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState<number>(1)
  const [condition, setCondition] = useState<ProductCondition>('LIKE_NEW')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [startPrice, setStartPrice] = useState('')
  const [stepPrice, setStepPrice] = useState('100000')
  const [allowNegotiation, setAllowNegotiation] = useState(true)
  const [preferredItems, setPreferredItems] = useState('')
  const [passNote, setPassNote] = useState('')
  const [useSafeMeetup, setUseSafeMeetup] = useState(true)
  const [selectedSpot, setSelectedSpot] = useState(mockSafeSpots[0])

  // AI Autofill Demo
  const handleAutofillAI = () => {
    setTitle('Đèn bàn đồng cổ kiểu Pháp thập niên 1970')
    setCategoryId(2) // Nội thất & Decor
    setCondition('USED_GOOD')
    setDescription(
      'Đèn bàn chất liệu đồng nguyên khối, chao thủy tinh màu hổ phách tuyệt đẹp. Đèn hoạt động tốt, dây điện đã thay mới đảm bảo an toàn.'
    )
    if (transactionType === 'SALE') {
      setPrice('1850000')
      setAllowNegotiation(true)
    } else if (transactionType === 'AUCTION') {
      setStartPrice('1000000')
      setStepPrice('100000')
    } else if (transactionType === 'BARTER') {
      setPreferredItems('Đồng hồ cơ hoặc máy ảnh film')
    } else {
      setPassNote('Tặng cho bạn nào mê decor vintage hoặc sinh viên kiến trúc')
    }

    Alert.alert('Trợ lý AI Mộc', 'Đã tự động điền tiêu đề, mô tả và gợi ý mức giá thị trường tối ưu!')
  }

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập tiêu đề món đồ.')
      return
    }

    Alert.alert(
      'Đăng tin thành công! 🌿',
      'Tin đăng của bạn đã được chuyển đến Kiểm duyệt viên Mộc để xác thực nhanh trong vòng 15 phút.',
      [
        {
          text: 'Xem tin đăng',
          onPress: () => router.push('/(tabs)/explore' as any),
        },
      ]
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Đăng Tin Mới</Text>
        <TouchableOpacity style={styles.aiButton} onPress={handleAutofillAI}>
          <Ionicons name="sparkles" size={14} color="#ffffff" style={{ marginRight: 4 }} />
          <Text style={styles.aiButtonText}>AI Điền Tự Động</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* 1. Chọn loại hình giao dịch */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>1. Loại hình giao dịch</Text>
        <View style={styles.typeRow}>
          {[
            { type: 'SALE', label: 'Bán lẻ', icon: 'pricetag-outline' },
            { type: 'AUCTION', label: 'Đấu giá', icon: 'hammer-outline' },
            { type: 'BARTER', label: 'Trao đổi', icon: 'swap-horizontal-outline' },
            { type: 'PASS', label: 'Pass đồ', icon: 'gift-outline' },
          ].map((item) => {
            const isSelected = transactionType === item.type
            return (
              <TouchableOpacity
                key={item.type}
                onPress={() => setTransactionType(item.type as any)}
                style={[
                  styles.typeCard,
                  {
                    backgroundColor: isSelected ? theme.primaryLight : theme.card,
                    borderColor: isSelected ? theme.primary : theme.border,
                  },
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={isSelected ? theme.primary : theme.textMuted}
                />
                <Text
                  style={[
                    styles.typeCardText,
                    { color: isSelected ? theme.primary : theme.text, fontWeight: isSelected ? '700' : '500' },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* 2. Ảnh sản phẩm */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>2. Hình ảnh thực tế (Tối đa 6 ảnh)</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
          <TouchableOpacity style={[styles.uploadBox, { borderColor: theme.primary }]}>
            <Ionicons name="camera" size={24} color={theme.primary} />
            <Text style={[styles.uploadText, { color: theme.primary }]}>Thêm ảnh</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80' }}
            style={styles.previewImage}
          />
        </ScrollView>

        {/* 3. Thông tin món đồ */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>3. Thông tin món đồ</Text>
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Tiêu đề bài đăng *</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
            placeholder="Ví dụ: Máy ảnh film Olympus OM-1..."
            placeholderTextColor={theme.textMuted}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Danh mục</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
            {mockCategories.map((c) => {
              const isSelected = categoryId === c.id
              return (
                <TouchableOpacity
                  key={c.id}
                  onPress={() => setCategoryId(c.id)}
                  style={[
                    styles.catChip,
                    {
                      backgroundColor: isSelected ? theme.primary : theme.card,
                      borderColor: isSelected ? theme.primary : theme.border,
                    },
                  ]}
                >
                  <Text style={[styles.catChipText, { color: isSelected ? '#ffffff' : theme.text }]}>
                    {c.name}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Tình trạng món đồ</Text>
          <View style={styles.conditionRow}>
            {[
              { key: 'LIKE_NEW', label: 'Mới 99%' },
              { key: 'USED_GOOD', label: 'Rất tốt' },
              { key: 'USED_FAIR', label: 'Cũ theo thời gian' },
            ].map((c) => {
              const isSelected = condition === c.key
              return (
                <TouchableOpacity
                  key={c.key}
                  onPress={() => setCondition(c.key as any)}
                  style={[
                    styles.conditionBtn,
                    {
                      backgroundColor: isSelected ? theme.primary : theme.card,
                      borderColor: isSelected ? theme.primary : theme.border,
                    },
                  ]}
                >
                  <Text style={{ color: isSelected ? '#ffffff' : theme.text, fontSize: 12, fontWeight: '600' }}>
                    {c.label}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Mô tả chi tiết *</Text>
          <TextInput
            style={[
              styles.textArea,
              { backgroundColor: theme.card, borderColor: theme.border, color: theme.text },
            ]}
            placeholder="Mô tả năm sản xuất, xuất xứ, phụ kiện đi kèm, tình trạng trầy xước..."
            placeholderTextColor={theme.textMuted}
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* 4. Định giá hoặc Tiêu chí */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>4. Thiết lập giá & Điều kiện</Text>
        {transactionType === 'SALE' && (
          <View>
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Giá bán lẻ (VNĐ) *</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
                placeholder="Nhập số tiền..."
                placeholderTextColor={theme.textMuted}
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
              />
            </View>
            <View style={styles.switchRow}>
              <Text style={[styles.switchLabel, { color: theme.text }]}>Cho phép người mua đàm phán trả giá</Text>
              <Switch
                value={allowNegotiation}
                onValueChange={setAllowNegotiation}
                trackColor={{ false: '#d1cbbd', true: theme.primary }}
              />
            </View>
          </View>
        )}

        {transactionType === 'AUCTION' && (
          <View>
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Giá khởi điểm (VNĐ) *</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
                placeholder="Ví dụ: 1.000.000"
                placeholderTextColor={theme.textMuted}
                keyboardType="numeric"
                value={startPrice}
                onChangeText={setStartPrice}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Bước giá tối thiểu (VNĐ)</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
                placeholder="Mặc định: 100.000"
                placeholderTextColor={theme.textMuted}
                keyboardType="numeric"
                value={stepPrice}
                onChangeText={setStepPrice}
              />
            </View>
          </View>
        )}

        {transactionType === 'BARTER' && (
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Món đồ bạn muốn đổi bù trừ *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
              placeholder="Ví dụ: Cần đổi máy ảnh film ngàm M42..."
              placeholderTextColor={theme.textMuted}
              value={preferredItems}
              onChangeText={setPreferredItems}
            />
          </View>
        )}

        {transactionType === 'PASS' && (
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Tiêu chí / Lời nhắn người nhận quà</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
              placeholder="Ví dụ: Tặng các bạn sinh viên cần đồ dùng học tập..."
              placeholderTextColor={theme.textMuted}
              value={passNote}
              onChangeText={setPassNote}
            />
          </View>
        )}

        {/* 5. Điểm hẹn an toàn Safe Meetup */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>5. Điểm hẹn an toàn (Safe Meetup)</Text>
        <View style={styles.safeMeetupBox}>
          <Ionicons name="shield-checkmark" size={18} color="#2f6844" />
          <Text style={styles.safeMeetupText}>
            Giao dịch tại điểm hẹn an toàn có camera quan sát, nhân viên hỗ trợ giúp loại bỏ nguy cơ lừa đảo!
          </Text>
        </View>

        {mockSafeSpots.slice(0, 2).map((spot) => (
          <TouchableOpacity
            key={spot.id}
            onPress={() => setSelectedSpot(spot)}
            style={[
              styles.spotOption,
              {
                backgroundColor: selectedSpot.id === spot.id ? theme.primaryLight : theme.card,
                borderColor: selectedSpot.id === spot.id ? theme.primary : theme.border,
              },
            ]}
          >
            <Ionicons
              name={selectedSpot.id === spot.id ? 'radio-button-on' : 'radio-button-off'}
              size={18}
              color={selectedSpot.id === spot.id ? theme.primary : theme.textMuted}
              style={{ marginRight: 10 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.spotName, { color: theme.text }]}>{spot.name}</Text>
              <Text style={[styles.spotAddress, { color: theme.textMuted }]}>{spot.address}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>ĐĂNG TIN NGAY</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8c3b28',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  aiButtonText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 10,
  },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  typeCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 3,
  },
  typeCardText: {
    fontSize: 11,
    marginTop: 4,
  },
  imageScroll: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  uploadBox: {
    width: 90,
    height: 90,
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#faece8',
  },
  uploadText: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
  previewImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  formGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  textArea: {
    height: 90,
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    fontSize: 14,
    textAlignVertical: 'top',
  },
  catScroll: {
    flexDirection: 'row',
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  catChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  conditionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  conditionBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 3,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  safeMeetupBox: {
    flexDirection: 'row',
    backgroundColor: '#eaf3ed',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  safeMeetupText: {
    color: '#2f6844',
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 8,
    flex: 1,
  },
  spotOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  spotName: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  spotAddress: {
    fontSize: 11,
  },
  submitButton: {
    backgroundColor: '#c5573e',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#c5573e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
})

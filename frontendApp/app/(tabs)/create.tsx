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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { mockCategories, mockSafeSpots } from '../../mock/mockData'
import { TransactionType, ProductCondition } from '../../types'
import { Colors } from '../../constants/theme'
import { useColorScheme } from '../../hooks/use-color-scheme'

export default function CreateProductScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const [transactionType, setTransactionType] = useState<TransactionType>('AUCTION')
  const [title, setTitle] = useState('Máy ảnh Mirrorless cao cấp')
  const [categoryId, setCategoryId] = useState<number>(1)
  const [condition, setCondition] = useState<ProductCondition>('LIKE_NEW')
  const [description, setDescription] = useState('Máy ảnh Sony A7III fullbox, 98%, kèm lens kit, hoạt động hoàn hảo.')
  const [price, setPrice] = useState('12500000')
  const [startPrice, setStartPrice] = useState('12500000')
  const [stepPrice, setStepPrice] = useState('500000')
  const [preferredItems, setPreferredItems] = useState('iPad Air 5 hoặc tương đương')
  const [useSafeMeetup, setUseSafeMeetup] = useState(true)
  const [selectedSpot, setSelectedSpot] = useState(mockSafeSpots[0])

  const [frontCccd, setFrontCccd] = useState(true)
  const [backCccd, setBackCccd] = useState(true)

  // AI Autofill Trigger
  const handleAutofillAI = () => {
    setTitle('Máy ảnh Mirrorless Sony A7 Mark III')
    setCategoryId(1)
    setCondition('LIKE_NEW')
    setDescription('Máy ảnh Mirrorless cảm biến Full-frame 24.2MP, quay phim 4K HDR. Máy ít dùng, sensor sạch bong, full phụ kiện zin.')
    setStartPrice('12500000')
    setPrice('14800000')
    setPreferredItems('Flycam DJI Mini 3 Pro hoặc iPhone 14 Pro')
    Alert.alert('Nexus AI Assist', '✨ AI đã tự động phân tích ảnh, điền thông số kỹ thuật và đề xuất mức giá thị trường tối ưu!')
  }

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tiêu đề sản phẩm')
      return
    }
    Alert.alert('Thành công', 'Bài đăng của bạn đã được gửi lên hệ thống và kích hoạt xác thực Escrow an toàn!', [
      { text: 'Xem tin đăng', onPress: () => router.push('/(tabs)/index' as any) },
    ])
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <Text style={styles.headerTitle}>Đăng tin giao dịch</Text>
        <TouchableOpacity style={styles.aiButton} onPress={handleAutofillAI} activeOpacity={0.8}>
          <MaterialCommunityIcons name="creation" size={16} color="#ffffff" style={{ marginRight: 4 }} />
          <Text style={styles.aiButtonText}>AI Điền tự động</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Photo Upload Hero Box from Figma */}
        <View style={styles.photoHeroCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80' }}
            style={styles.heroImage}
          />
          <View style={styles.heroImageOverlay}>
            <TouchableOpacity style={styles.addPhotoButton} activeOpacity={0.8}>
              <Ionicons name="camera" size={24} color="#0b1c30" />
              <Text style={styles.addPhotoText}>Thêm Ảnh</Text>
            </TouchableOpacity>
          </View>

          {/* AI Recognition Badge */}
          <View style={styles.aiRecognitionPill}>
            <MaterialCommunityIcons name="creation" size={14} color="#ffffff" />
            <Text style={styles.aiRecognitionText}>AI nhận diện: Đồ Điện Tử & Máy ảnh</Text>
          </View>
        </View>
        <Text style={styles.photoNote}>Tải lên ít nhất 3 ảnh chi tiết để tăng điểm uy tín Trust Score.</Text>

        {/* Transaction Type Segmented Control from Figma */}
        <View style={styles.segmentedContainer}>
          <TouchableOpacity
            style={[
              styles.segmentTab,
              transactionType === 'AUCTION' && styles.segmentTabActive,
            ]}
            onPress={() => setTransactionType('AUCTION')}
          >
            <Text
              style={[
                styles.segmentText,
                transactionType === 'AUCTION' && styles.segmentTextActive,
              ]}
            >
              Đấu giá
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentTab,
              transactionType === 'SALE' && styles.segmentTabActive,
            ]}
            onPress={() => setTransactionType('SALE')}
          >
            <Text
              style={[
                styles.segmentText,
                transactionType === 'SALE' && styles.segmentTextActive,
              ]}
            >
              Mua bán
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentTab,
              transactionType === 'BARTER' && styles.segmentTabActive,
            ]}
            onPress={() => setTransactionType('BARTER')}
          >
            <Text
              style={[
                styles.segmentText,
                transactionType === 'BARTER' && styles.segmentTextActive,
              ]}
            >
              Trao đổi
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Inputs */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tiêu đề sản phẩm</Text>
          <View style={styles.inputCard}>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              value={title}
              onChangeText={setTitle}
              placeholder="VD: Máy ảnh Mirrorless cao cấp"
              placeholderTextColor="#737686"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Mô tả chi tiết</Text>
          <View style={[styles.inputCard, { height: 110 }]}>
            <TextInput
              style={[styles.input, { color: theme.text, height: 100 }]}
              value={description}
              onChangeText={setDescription}
              placeholder="Mô tả tình trạng, thông số, phụ kiện đi kèm..."
              placeholderTextColor="#737686"
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Pricing Field with AI system recommendation from Figma */}
        {transactionType === 'AUCTION' && (
          <View style={styles.formGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Giá khởi điểm</Text>
              <MaterialCommunityIcons name="information-outline" size={14} color="#712ae2" />
            </View>
            <View style={styles.priceInputBox}>
              <Text style={styles.currencySymbol}>₫</Text>
              <TextInput
                style={[styles.priceInput, { color: theme.text }]}
                value={startPrice}
                onChangeText={setStartPrice}
                keyboardType="numeric"
                placeholder="12,500,000"
                placeholderTextColor="#737686"
              />
              <MaterialCommunityIcons name="creation" size={20} color="#712ae2" style={styles.priceAiIcon} />
            </View>
            <View style={styles.aiPriceTipRow}>
              <Ionicons name="trending-up" size={12} color="#712ae2" />
              <Text style={styles.aiPriceTipText}>Gợi ý từ hệ thống dựa trên lịch sử giao dịch tương đương.</Text>
            </View>

            <View style={{ marginTop: 12 }}>
              <Text style={styles.label}>Bước giá tối thiểu (VNĐ)</Text>
              <View style={styles.inputCard}>
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  value={stepPrice}
                  onChangeText={setStepPrice}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        )}

        {transactionType === 'SALE' && (
          <View style={styles.formGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Giá bán niêm yết</Text>
              <MaterialCommunityIcons name="information-outline" size={14} color="#004ac6" />
            </View>
            <View style={styles.priceInputBox}>
              <Text style={styles.currencySymbol}>₫</Text>
              <TextInput
                style={[styles.priceInput, { color: theme.text }]}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholder="14,800,000"
                placeholderTextColor="#737686"
              />
              <MaterialCommunityIcons name="creation" size={20} color="#712ae2" style={styles.priceAiIcon} />
            </View>
          </View>
        )}

        {transactionType === 'BARTER' && (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Món đồ bạn đang tìm kiếm để trao đổi</Text>
            <View style={styles.inputCard}>
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={preferredItems}
                onChangeText={setPreferredItems}
                placeholder="VD: iPad Air 5 hoặc Flycam mini..."
                placeholderTextColor="#737686"
              />
            </View>
          </View>
        )}

        {/* Identity Verification Section from Figma */}
        <View style={styles.kycCard}>
          <View style={styles.kycHeaderRow}>
            <View style={styles.kycTitleLeft}>
              <View style={styles.shieldIcon}>
                <Ionicons name="shield-checkmark" size={16} color="#ffffff" />
              </View>
              <Text style={styles.kycTitle}>Xác thực danh tính</Text>
            </View>
            <View style={styles.requiredBadge}>
              <Text style={styles.requiredBadgeText}>Bắt buộc</Text>
            </View>
          </View>
          <Text style={styles.kycSubtitle}>
            Tải lên mặt trước và mặt sau CCCD/CMND để bảo vệ giao dịch của bạn qua Escrow.
          </Text>

          <View style={styles.cccdRow}>
            <TouchableOpacity
              style={[styles.cccdBox, frontCccd && styles.cccdBoxVerified]}
              onPress={() => setFrontCccd(!frontCccd)}
            >
              <Ionicons
                name={frontCccd ? 'checkmark-circle' : 'card-outline'}
                size={22}
                color={frontCccd ? '#007d55' : '#004ac6'}
              />
              <Text style={[styles.cccdText, frontCccd && { color: '#007d55' }]}>
                {frontCccd ? 'Mặt trước ✓' : 'Mặt trước'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cccdBox, backCccd && styles.cccdBoxVerified]}
              onPress={() => setBackCccd(!backCccd)}
            >
              <Ionicons
                name={backCccd ? 'checkmark-circle' : 'card-outline'}
                size={22}
                color={backCccd ? '#007d55' : '#737686'}
              />
              <Text style={[styles.cccdText, backCccd && { color: '#007d55' }]}>
                {backCccd ? 'Mặt sau ✓' : 'Mặt sau'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Safe Meetup Spot Card */}
        <View style={styles.safeSpotSection}>
          <View style={styles.safeSpotHeader}>
            <Ionicons name="business" size={18} color="#004ac6" />
            <Text style={styles.safeSpotTitle}>Điểm hẹn giao nhận Safe Spot</Text>
          </View>
          <Text style={styles.safeSpotDesc}>
            {selectedSpot.name} - {selectedSpot.address} (Có camera 24/7 & Điều phối viên Mộc)
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.88}>
          <Text style={styles.submitBtnText}>Đăng tin ngay</Text>
          <Ionicons name="arrow-forward" size={18} color="#ffffff" style={{ marginLeft: 6 }} />
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
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0b1c30',
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#712ae2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  aiButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  photoHeroCard: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#e5eeff',
    borderWidth: 1,
    borderColor: '#c3c6d7',
    marginBottom: 6,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoButton: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(248,249,255,0.92)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 28,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  addPhotoText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0b1c30',
  },
  aiRecognitionPill: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(138,76,252,0.95)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  aiRecognitionText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  photoNote: {
    fontSize: 11,
    color: '#737686',
    textAlign: 'center',
    marginBottom: 16,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#eff4ff',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#d3e4fe',
    marginBottom: 18,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  segmentTabActive: {
    backgroundColor: '#f8f9ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#434655',
  },
  segmentTextActive: {
    color: '#004ac6',
    fontWeight: '800',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0b1c30',
    marginBottom: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  inputCard: {
    backgroundColor: '#f8f9ff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c3c6d7',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    fontSize: 14,
    padding: 0,
  },
  priceInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9ff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(113,42,226,0.5)',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0b1c30',
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    padding: 0,
  },
  priceAiIcon: {
    marginLeft: 8,
  },
  aiPriceTipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  aiPriceTipText: {
    fontSize: 11,
    color: '#712ae2',
    fontWeight: '600',
  },
  kycCard: {
    backgroundColor: '#e5eeff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(195,198,215,0.6)',
    padding: 14,
    marginBottom: 16,
  },
  kycHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  kycTitleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shieldIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#004ac6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kycTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0b1c30',
  },
  requiredBadge: {
    backgroundColor: '#ffdad6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  requiredBadgeText: {
    color: '#ba1a1a',
    fontSize: 10,
    fontWeight: '700',
  },
  kycSubtitle: {
    fontSize: 11,
    color: '#434655',
    lineHeight: 16,
    marginBottom: 12,
  },
  cccdRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cccdBox: {
    flex: 1,
    height: 70,
    borderRadius: 10,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#c3c6d7',
    backgroundColor: '#f8f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  cccdBoxVerified: {
    borderColor: '#007d55',
    backgroundColor: '#d1f4e0',
  },
  cccdText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#004ac6',
  },
  safeSpotSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#c3c6d7',
    marginBottom: 24,
  },
  safeSpotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  safeSpotTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0b1c30',
  },
  safeSpotDesc: {
    fontSize: 11,
    color: '#737686',
  },
  submitBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004ac6',
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#004ac6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
})

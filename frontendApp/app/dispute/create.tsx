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

interface ReasonOption {
  id: string
  title: string
  description: string
}

const REASONS: ReasonOption[] = [
  {
    id: 'counterfeit',
    title: 'Counterfeit Item',
    description: 'Item is fake or violates intellectual property.',
  },
  {
    id: 'scam',
    title: 'Fraud / Scam',
    description: 'Suspicious payment requests or deceptive listing.',
  },
  {
    id: 'harassment',
    title: 'Harassment or Hate Speech',
    description: 'Abusive language or inappropriate behavior.',
  },
  {
    id: 'other',
    title: 'Something Else',
    description: 'Other policy violations.',
  },
]

export default function CreateDisputeScreen() {
  const router = useRouter()

  const [step, setStep] = useState<number>(1)
  const [selectedReason, setSelectedReason] = useState<string>('counterfeit')
  const [evidenceCount, setEvidenceCount] = useState<number>(1)
  const [details, setDetails] = useState<string>('')

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.back()
    }
  }

  const handleSubmit = () => {
    if (!details.trim()) {
      Alert.alert('Missing Details', 'Please provide a brief description to help us investigate.')
      return
    }

    Alert.alert(
      'Report Submitted 🛡️',
      'Your report has been received and routed to our AI Moderation team. Escrow funds are safe.',
      [
        {
          text: 'Return Home',
          onPress: () => router.push('/(tabs)'),
        },
      ]
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0B1C30" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Violation</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Step Indicator */}
        <View style={styles.stepperContainer}>
          <View style={styles.stepperLine} />

          {/* Step 1 */}
          <View style={styles.stepCol}>
            <Text style={[styles.stepLabel, step === 1 && styles.stepLabelActive]}>Reason</Text>
            <View style={[styles.stepBadge, step >= 1 && styles.stepBadgeActive]}>
              <Text style={[styles.stepNum, step >= 1 && styles.stepNumActive]}>1</Text>
            </View>
          </View>

          {/* Step 2 */}
          <View style={styles.stepCol}>
            <Text style={[styles.stepLabel, step === 2 && styles.stepLabelActive]}>Evidence</Text>
            <View style={[styles.stepBadge, step >= 2 && styles.stepBadgeActive]}>
              <Text style={[styles.stepNum, step >= 2 && styles.stepNumActive]}>2</Text>
            </View>
          </View>

          {/* Step 3 */}
          <View style={styles.stepCol}>
            <Text style={[styles.stepLabel, step === 3 && styles.stepLabelActive]}>Details</Text>
            <View style={[styles.stepBadge, step === 3 && styles.stepBadgeActive]}>
              <Text style={[styles.stepNum, step === 3 && styles.stepNumActive]}>3</Text>
            </View>
          </View>
        </View>

        {/* STEP 1: REASON */}
        {step === 1 && (
          <View style={styles.stepContent}>
            <Text style={styles.sectionTitle}>Why are you reporting this?</Text>
            <Text style={styles.sectionSubtitle}>
              Your report is anonymous. If you are in immediate danger, please contact local authorities.
            </Text>

            <View style={styles.reasonList}>
              {REASONS.map((r) => {
                const isSelected = selectedReason === r.id
                return (
                  <TouchableOpacity
                    key={r.id}
                    style={[styles.reasonCard, isSelected && styles.reasonCardSelected]}
                    onPress={() => setSelectedReason(r.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.reasonTextCol}>
                      <Text style={styles.reasonTitle}>{r.title}</Text>
                      <Text style={styles.reasonDesc}>{r.description}</Text>
                    </View>
                    <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                      {isSelected && <View style={styles.radioInnerDot} />}
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={handleNext}>
              <Text style={styles.primaryBtnText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* STEP 2: EVIDENCE */}
        {step === 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.sectionTitle}>Upload Evidence</Text>
            <Text style={styles.sectionSubtitle}>
              Please provide screenshots or images that support your report. Max 3 images.
            </Text>

            <TouchableOpacity
              style={styles.uploadBox}
              onPress={() => {
                Alert.alert('Select Photo', 'Choose photos from library or take a photo', [
                  { text: 'Mock Add Photo', onPress: () => setEvidenceCount((prev) => Math.min(prev + 1, 3)) },
                  { text: 'Cancel', style: 'cancel' },
                ])
              }}
            >
              <Ionicons name="cloud-upload-outline" size={38} color="#004AC6" style={{ marginBottom: 8 }} />
              <Text style={styles.uploadTitle}>Tap to select photos</Text>
              <Text style={styles.uploadSub}>JPG, PNG (Max 5MB) • {evidenceCount}/3 uploaded</Text>
            </TouchableOpacity>

            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.secondaryBtn} onPress={handleBack}>
                <Text style={styles.secondaryBtnText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.primaryBtn, { flex: 1 }]} onPress={handleNext}>
                <Text style={styles.primaryBtnText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* STEP 3: DETAILS */}
        {step === 3 && (
          <View style={styles.stepContent}>
            <Text style={styles.sectionTitle}>Additional Details</Text>
            <Text style={styles.sectionSubtitle}>
              Provide any extra context to help our Moderation Team investigate quickly.
            </Text>

            <View style={styles.inputBlock}>
              <Text style={styles.inputLabel}>
                Description <Text style={{ color: '#BA1A1A' }}>*</Text>
              </Text>
              <TextInput
                style={styles.textArea}
                multiline
                numberOfLines={5}
                placeholder="Please describe the issue in detail..."
                placeholderTextColor="#737686"
                value={details}
                onChangeText={setDetails}
                maxLength={500}
                textAlignVertical="top"
              />
              <Text style={styles.charCount}>{details.length}/500</Text>
            </View>

            {/* AI Assessment Flair Note */}
            <View style={styles.aiNote}>
              <Ionicons name="sparkles" size={18} color="#712AE2" />
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.aiNoteTitle}>AI Priority Triage</Text>
                <Text style={styles.aiNoteDesc}>
                  Your report will be automatically analyzed and routed to specialized moderators based on your provided details.
                </Text>
              </View>
            </View>

            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.secondaryBtn} onPress={handleBack}>
                <Text style={styles.secondaryBtnText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dangerBtn} onPress={handleSubmit}>
                <Ionicons name="shield-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.dangerBtnText}>Submit Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#C3C6D7',
    backgroundColor: '#F8F9FF',
  },
  backBtn: {
    padding: 6,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#004AC6',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  stepperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 28,
    paddingHorizontal: 16,
  },
  stepperLine: {
    position: 'absolute',
    top: 24,
    left: 40,
    right: 40,
    height: 2,
    backgroundColor: '#C3C6D7',
    zIndex: 0,
  },
  stepCol: {
    alignItems: 'center',
    zIndex: 1,
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#434655',
    marginBottom: 6,
  },
  stepLabelActive: {
    color: '#004AC6',
    fontWeight: '700',
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DCE9FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F8F9FF',
  },
  stepBadgeActive: {
    backgroundColor: '#004AC6',
  },
  stepNum: {
    fontSize: 13,
    fontWeight: '700',
    color: '#434655',
  },
  stepNumActive: {
    color: '#FFFFFF',
  },
  stepContent: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0B1C30',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#434655',
    lineHeight: 20,
  },
  reasonList: {
    gap: 12,
    marginTop: 8,
    marginBottom: 12,
  },
  reasonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C3C6D7',
  },
  reasonCardSelected: {
    borderColor: '#004AC6',
    backgroundColor: '#F3F6FD',
  },
  reasonTextCol: {
    flex: 1,
    paddingRight: 12,
  },
  reasonTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0B1C30',
    marginBottom: 4,
  },
  reasonDesc: {
    fontSize: 13,
    color: '#434655',
    lineHeight: 18,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#C3C6D7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: '#004AC6',
  },
  radioInnerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#004AC6',
  },
  primaryBtn: {
    backgroundColor: '#004AC6',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#C3C6D7',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  uploadTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0B1C30',
    marginBottom: 4,
  },
  uploadSub: {
    fontSize: 12,
    color: '#434655',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  secondaryBtn: {
    backgroundColor: '#DCE9FF',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: '#0B1C30',
    fontSize: 15,
    fontWeight: '600',
  },
  dangerBtn: {
    flex: 1,
    backgroundColor: '#BA1A1A',
    borderRadius: 24,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  inputBlock: {
    gap: 6,
    marginTop: 6,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0B1C30',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C3C6D7',
    padding: 14,
    fontSize: 14,
    color: '#0B1C30',
    minHeight: 120,
  },
  charCount: {
    fontSize: 12,
    color: '#737686',
    textAlign: 'right',
  },
  aiNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EFEBFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#712AE2' + '40',
    marginVertical: 6,
  },
  aiNoteTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#712AE2',
    marginBottom: 2,
  },
  aiNoteDesc: {
    fontSize: 12,
    color: '#434655',
    lineHeight: 17,
  },
})

import { Doctor } from './doctor.model'

export interface DiagnosisRequestModel {
  description: string
  doctor_patient_id: number
}

export interface Diagnosis extends DiagnosisRequestModel {
  id: number
  patient_id: number

  doctor: Doctor[]
}

export interface DiagnosesCreateModel {
  description: string
  patient_id: number
  doctor_id: number
}



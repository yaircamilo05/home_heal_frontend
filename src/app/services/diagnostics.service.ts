import { BehaviorSubject, Observable, tap } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { ResponseCustomModel } from '../models/response.custom.model';
import { DiagnosesCreateModel, Diagnosis, DiagnosisRequestModel } from '../models/diagnoses.model';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticsService {

  server: string = `${environment.server}/diagnostic`

  constructor(
    private http: HttpClient,
  ) { }

  getDiagnoses(patientId: number): Observable<ResponseCustomModel<Diagnosis[]>> {
    return this.http.get<ResponseCustomModel<Diagnosis[]>>(
      `${this.server}/get-diagnostic-by-patient-id/${patientId}`
    )
  }

  createDiagnosis(diagnosis: DiagnosesCreateModel): Observable<ResponseCustomModel<DiagnosisRequestModel>> {
    return this.http.post<ResponseCustomModel<DiagnosisRequestModel>>(
      `${this.server}/create-diagnostic`,
      diagnosis
    )
  }

}
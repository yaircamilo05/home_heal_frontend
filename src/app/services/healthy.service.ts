import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { GeneratedCare } from '../models/cares.model';
import { HttpClient } from '@angular/common/http';
import { ResponseCustomModel } from '../models/response.custom.model';

@Injectable({
  providedIn: 'root'
})
export class HealthyService {

  private caresSource = new BehaviorSubject<GeneratedCare[]>([])
  cares$: Observable<GeneratedCare[]> = this.caresSource.asObservable()

  server: string = `${environment.server}/healthy`

  constructor(
    private http: HttpClient
  ) { }

  updateCares(cares: GeneratedCare[]) {
    this.caresSource.next(cares)
  }

  generateCares(patientId: number, userId: number):
    Observable<ResponseCustomModel<GeneratedCare[]>> {
    return this.http.get<ResponseCustomModel<GeneratedCare[]>>(
      `${this.server}/generate-cares/${patientId}/${userId}`
    )
  }

  // loadCares(patient_id: number) {
  //   this.getCares(patient_id).subscribe(
  //     (response: ResponseCustomModel<GeneratedCare[]>) => {
  //       this.updateCares(response.data)
  //     },
  //     error => {
  //       console.error('Error al cargar las aproximaciones', error)
  //     }
  //   )
  // }


  // getCares(patientId: number): Observable<ResponseCustomModel<Cares[]>> {
  //   return this.http.get<ResponseCustomModel<Cares[]>>(`${this.server}/get-cares-by-patient-id/${patientId}`)
  // }

  // getDiagnoses(patientId: number): Observable<ResponseCustomModel<Diagnosis[]>> {
  //   return this.http.get<ResponseCustomModel<Diagnosis[]>>(
  //     `${this.server}/get-diagnostic-by-patient-id/${patientId}`
  //   )
  // }


}

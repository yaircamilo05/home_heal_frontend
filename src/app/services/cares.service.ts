import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment.local'
import { Cares, CaresBaseModel, CaresCreateModel } from '../models/cares.model'
import { ResponseCustomModel } from '../models/response.custom.model'
import { BehaviorSubject, Observable, tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CaresService {

  server: string = `${environment.server}/cares`

  constructor(
    private http: HttpClient,
  ) { }


  getCares(patientId: number): Observable<ResponseCustomModel<Cares[]>> {
    return this.http.get<ResponseCustomModel<Cares[]>>(`${this.server}/get-cares-by-patient-id/${patientId}`)
  }

  createCare(care: CaresCreateModel): Observable<ResponseCustomModel<CaresBaseModel>> {
    return this.http.post<ResponseCustomModel<CaresBaseModel>>(`${this.server}/create-care`, care)
  }
  deleteCare(id: number): Observable<ResponseCustomModel<boolean>> {
    return this.http.delete<ResponseCustomModel<boolean>>(`${this.server}/delete-care/${id}`)
  }
}

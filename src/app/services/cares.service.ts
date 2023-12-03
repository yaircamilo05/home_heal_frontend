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
  private caresSource = new BehaviorSubject<Cares[]>([])
  cares$: Observable<Cares[]> = this.caresSource.asObservable()

  server: string = `${environment.server}/cares`

  constructor(
    private http: HttpClient,
  ) { }

  updateCares(cares: Cares[]) {
    this.caresSource.next(cares)
  }
  loadCares(patient_id: number) {
    this.getCares(patient_id).subscribe(
      (response: ResponseCustomModel<Cares[]>) => {
        this.updateCares(response.data)
      },
      error => {
        console.error('Error al cargar las aproximaciones', error)
      }
    )
  }

  getCares(patientId: number): Observable<ResponseCustomModel<Cares[]>> {
    return this.http.get<ResponseCustomModel<Cares[]>>(`${this.server}/get-cares-by-patient-id/${patientId}`)
      .pipe(tap(() => {
        this.loadCares(patientId) // Recargar los cuidados después de obtenerlos
      }))
  }

  createCare(care: CaresCreateModel): Observable<ResponseCustomModel<CaresBaseModel>> {
    return this.http.post<ResponseCustomModel<CaresBaseModel>>(`${this.server}/create-care`, care)
  }
  deleteCare(id: number): Observable<ResponseCustomModel<boolean>> {
    return this.http.delete<ResponseCustomModel<boolean>>(`${this.server}/delete-care/${id}`)
  }
}

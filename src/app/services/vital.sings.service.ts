import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { VitalSingsModel } from '../models/vital.sings.model';
import { SockectioService } from './sockectio.service';
import { VitalSignsHistoryModel } from '../models/vital.signs.history';
import { ResponseCustomModel } from '../models/response.custom.model';


@Injectable({
  providedIn: 'root'
})
export class VitalSingsService{
  severSocket:string = `${environment.serversockect}/vitalsigns`;
  sever:string = `${environment.server}/vitalsigns`;
  vistalsSigns:VitalSignsHistoryModel[] = [];
  constructor(public socketService: SockectioService, private http: HttpClient) {
    this.onSaveVitalSings();

   }


  updateVitalSings(vitalSings: VitalSingsModel){
    this.socketService.io.emit('update vital Signs', vitalSings);
  }

  onSaveVitalSings(){
    this.socketService.io.on('update vital Signs', (response: VitalSignsHistoryModel)=>{
      console.log("Respuesta en tiempo real servidor",response);
      const vitalRealTime:VitalSignsHistoryModel = {
        hearth_rate: response.hearth_rate,
        blood_pressure: response.blood_pressure,
        O2_saturation: response.O2_saturation,
        date: new Date(),
        patient_id: response.patient_id,
      };

      this.vistalsSigns.push(vitalRealTime);
      console.log("Vitalss Real Time", this.vistalsSigns);
    });
  }

  getVitalSignsHistory(patient_id: number){
    return this.http.get<ResponseCustomModel<VitalSignsHistoryModel[]>>(`${this.sever}/get_vital_signs_history/${patient_id}`);
  }

  getLastVitalSigns(patient_id: number){
    return this.http.get<ResponseCustomModel<VitalSingsModel>>(`${this.sever}/get_last_vital_signs/${patient_id}`);
  }
}

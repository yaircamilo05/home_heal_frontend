import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, signal } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { VitalSingsModel } from '../models/vital.sings.model';
import { SockectioService } from './sockectio.service';
import { VitalSignsHistoryModel } from '../models/vital.signs.history';
import { ResponseCustomModel } from '../models/response.custom.model';
import { EmailVitalSignsData } from './../models/email.vital.signs';
import { EmailService } from './email.service';
import { StorageService } from './storage.service';
import { Roles } from '../common/rols.const';
import { EnumEStatusPatient, PatientCard } from '../models/patient.model';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";
import { GraphicSerieModel } from '../models/serie.model';
import { Observable, tap } from 'rxjs';
import { PatientService } from './patient.service';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class VitalSingsService {
  severSocket: string = `${environment.serversockect}/vitalsigns`;
  sever: string = `${environment.server}/vitalsigns`;
  serverPatient: string = `${environment.server}/patient`;
  vistalsSigns: VitalSignsHistoryModel[] = [];
  series: GraphicSerieModel[] = [];
  seriesSignal = signal<GraphicSerieModel[]>([]);
  current_date: string = new Date().toString();
  constructor(
    public socketService: SockectioService,
    private http: HttpClient,
    private emailService: EmailService,
    private storageService: StorageService,
    private patientService: PatientService
  ) {
    this.onSaveVitalSings();
  }


  updateVitalSings(vitalSings: VitalSingsModel) {
    this.socketService.io.emit('update vital Signs', vitalSings);
  }

  onSaveVitalSings() {
    this.socketService.io.on('update vital Signs', (response: VitalSignsHistoryModel) => {

      const vitalRealTime: VitalSignsHistoryModel = {
        hearth_rate: response.hearth_rate,
        blood_pressure: response.blood_pressure,
        O2_saturation: response.O2_saturation,
        date: response.date,
        patient_id: response.patient_id,
      };

      this.vistalsSigns.push(vitalRealTime);
      console.log("ESTOS SON LOS SIGNOS QUE LLEGAN EN TIEMPO REAL", this.vistalsSigns);
    });
  }


  getPatientAndSendEmail(patient_id: number, vitalSigns: VitalSignsHistoryModel) {
    // OBTENER LA INFO DEL PPatientService
    this.patientService.getPatientById(patient_id).subscribe((response) => {
      if (response.data && response.data.patient_id) {
        this.sendEmail(vitalSigns, response.data);
      }
    });
  }

  
  calculateStatusPatientByVitalSigns(vitalSigns: VitalSignsHistoryModel) {
    let status: EnumEStatusPatient = EnumEStatusPatient.STABLE;
    if (vitalSigns.hearth_rate >= 120 || vitalSigns.hearth_rate <= 50) {
      status = EnumEStatusPatient.CRITICAL;
    } else if ((vitalSigns.hearth_rate >= 100 && vitalSigns.hearth_rate < 120) || (vitalSigns.hearth_rate > 50 && vitalSigns.hearth_rate <= 60)) {
      status = EnumEStatusPatient.RISKY;
    }

    if (vitalSigns.blood_pressure >= 40 || vitalSigns.blood_pressure <= 35) {
      status = EnumEStatusPatient.CRITICAL;
    } else if (vitalSigns.blood_pressure >= 38 && vitalSigns.blood_pressure < 40) {
      status = EnumEStatusPatient.RISKY;
    }

    if (vitalSigns.O2_saturation <= 85) {
      status = EnumEStatusPatient.CRITICAL;
    } else if (vitalSigns.O2_saturation >= 86 && vitalSigns.O2_saturation <= 90) {
      status = EnumEStatusPatient.RISKY;
    }

    return status;
  }

  convertVitalSingsToVitalSignsHistory(vitalSigns: VitalSingsModel): VitalSignsHistoryModel {
    const vitalSignsHistory: VitalSignsHistoryModel = {
      hearth_rate: vitalSigns.hearth_rate,
      blood_pressure: vitalSigns.blood_pressure,
      O2_saturation: vitalSigns.O2_saturation,
      date: new Date().toString(),
      patient_id: vitalSigns.patient_id,
    };
    return vitalSignsHistory;
  }

  calculateStatusVitalSign(vitalSign: number, min: number, max: number) {
    let status: EnumEStatusPatient = EnumEStatusPatient.STABLE;
    if (vitalSign >= max || vitalSign <= min) {
      status = EnumEStatusPatient.CRITICAL;
    } else if (vitalSign >= min && vitalSign < max) {
      status = EnumEStatusPatient.RISKY;
    }
    return status;
  }

  getSubjetByStatusPatient(status: EnumEStatusPatient) {
    let subjet: string = "";
    switch (status) {
      case EnumEStatusPatient.STABLE:
        subjet = "Signos vitales estables";
        break;
      case EnumEStatusPatient.RISKY:
        subjet = "IMPORTANTE - Signos vitales en riesgo";
        break;
      case EnumEStatusPatient.CRITICAL:
        subjet = "URGENTE - Signos vitales en estado crítico";
        break;
    }
    return subjet;
  }

  sendEmail(vitalSigns: VitalSignsHistoryModel, patient: PatientCard) {
    const rolId = this.storageService.getRolId();
    const username = this.storageService.getUserName();
    let emails: string[] = [];
    let name: string = "";
    let statusPatient: EnumEStatusPatient = this.calculateStatusPatientByVitalSigns(vitalSigns);
    let relationship = "";

    if (rolId == Roles.MEDICO) {
      //obtener el familiar del paciente para obtener el email y el nombre
      emails.push(patient.email_familiar);
      name = patient.family_name;
      relationship = "familiar";
    } else if (rolId == Roles.FAMILIAR) {
      //obtener los medicos del paciente para obtener los emails
      emails.push()
      name = "Doc."
      relationship = "paciente";
    }

    const dataEmail: EmailVitalSignsData = {
      hash: environment.hash_validator,
      to_destination: emails,
      subject: this.getSubjetByStatusPatient(statusPatient),
      name: name,
      relationship: relationship,
      date: this.current_date!,
      name_editor: username,
      name_patient: patient.name,
      hearth_rate: vitalSigns.hearth_rate.toString(),
      state_hearth_rate: EnumEStatusPatient[statusPatient],
      color_hearth_rate: "#FFD700",
      blood_pressure: vitalSigns.blood_pressure.toString(),
      state_blood_pressure: EnumEStatusPatient[statusPatient],
      color_blood_pressure: "#FF4848",
      o2_saturation: vitalSigns.O2_saturation.toString(),
      state_o2_saturation: EnumEStatusPatient[statusPatient],
      color_o2_saturation: "#7ED957",
    }

    console.log("Data email", dataEmail);
    this.emailService.send_email_vital_signs(dataEmail).subscribe((response) => {
      console.log("Respuesta del servidor", response);
    });

  }

  sendEmailFamiliar(dataEmil: EmailVitalSignsData) {
    this.emailService.send_email_vital_signs(dataEmil).subscribe((response) => {
      console.log("Respuesta del servidor", response);
    });
  }

  sendEmailDoctor(dataEmil: EmailVitalSignsData,) {
    this.emailService.send_email_vital_signs(dataEmil).subscribe((response) => {
      console.log("Respuesta del servidor", response);
    });
  }

  getVitalSignsHistory(patient_id: number): Observable<ResponseCustomModel<VitalSignsHistoryModel[]>> {
    return this.http.get<ResponseCustomModel<VitalSignsHistoryModel[]>>(`${this.sever}/get_vital_signs_history/${patient_id}`)
  }

  getLastVitalSigns(patient_id: number) {
    return this.http.get<ResponseCustomModel<VitalSingsModel>>(`${this.sever}/get_last_vital_signs/${patient_id}`);
  }

  public generateDayWiseTimeSeries = function (baseval: number, count: number) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = baseval;
      var y =
        Math.floor(Math.random() * (60 - 10 + 1)) + 10;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  };

}

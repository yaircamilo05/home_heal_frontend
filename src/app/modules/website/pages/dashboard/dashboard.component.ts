import { Component, OnInit, inject } from '@angular/core';
import { VitalSingsService } from '../../../../services/vital.sings.service';
import { VitalSingsModel } from 'src/app/models/vital.sings.model';
import { ModalVitalSignsComponent } from 'src/app/modules/shared/components/modal-vital-signs/modal-vital-signs.component';
import { Dialog } from '@angular/cdk/dialog';
import { TitlesModal } from 'src/app/common/titles.modal';
import { Icons } from 'src/app/common/icon.modal';
import { TypeModal } from 'src/app/common/type.modal';
import { UserGetModel } from './../../../../models/user.model';
import { VitalSignsHistoryModel } from 'src/app/models/vital.signs.history';
import { SockectioService } from './../../../../services/sockectio.service';
import { ActivatedRoute } from '@angular/router';
import { GraphicSerieModel } from 'src/app/models/serie.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  vitalSingsService = inject(VitalSingsService);
  public vitalSings: VitalSignsHistoryModel = {
    hearth_rate: 0,
    blood_pressure: 0,
    O2_saturation: 0,
    date: new Date().toLocaleString("es-CO", {timeZone: "America/Bogota"}),
    patient_id: 0,
  };
  patient_id: number = 0;
  series = this.vitalSingsService.seriesSignal;
  seriesOutput: GraphicSerieModel[] = [

  ]

  constructor(
    private dialog: Dialog,
    private route: ActivatedRoute,
  ) {
    this.onUpdateVitalSigns();
    this.route.params.subscribe(params => {
      this.patient_id = +params['patient_id'];
    });
  }
  ngOnInit(){
    this.onUpdateVitalSigns();
    this.getVitalSignsHistory();
  }

  onUpdateVitalSigns() {
    console.log("Escuchando en tiempo real...")
    this.vitalSingsService.socketService.io.on('update vital Signs', (response: VitalSignsHistoryModel)=>{
      console.log("Respuesta en tiempo real servidor EN DASHBOARD",response);
      const vitalRealTime:VitalSignsHistoryModel = {
        hearth_rate: response.hearth_rate,
        blood_pressure: response.blood_pressure,
        O2_saturation: response.O2_saturation,
        date: response.date,
        patient_id: response.patient_id,
      };

      this.vitalSings = vitalRealTime;
      this.seriesOutput = this.getSeries(this.vitalSingsService.vistalsSigns)
      console.log("SERIES DASH EN REAL TIME",this.seriesOutput)
      console.log("Dashhhhhh", this.vitalSingsService.series)
    });
  }
  openModalUpdateVitalsSigns() {
    let RefDialog = this.dialog.open(ModalVitalSignsComponent,
    {
      minWidth: '800px',
      minHeight: '80%',
      maxWidth: '50%',
      data: {
        title: TitlesModal.vitalSigns('Nombre del paciente'),
        iconClass: Icons.vitalSigns,
        pacientId: this.patient_id
      }
    });
  }

  getVitalSignsHistory() {
    this.vitalSingsService.getVitalSignsHistory(this.patient_id).subscribe((response) => {
      if(response.data.length > 0){
      this.vitalSingsService.vistalsSigns = response.data;

      console.log(this.vitalSingsService.vistalsSigns)
      this.vitalSings =  this.vitalSingsService.vistalsSigns[ this.vitalSingsService.vistalsSigns.length - 1];
      }else{
        this.vitalSings = {
          hearth_rate: 0,
          blood_pressure: 0,
          O2_saturation: 0,
          date: new Date().toLocaleString("es-CO", {timeZone: "America/Bogota"}),
          patient_id: 0,
        };
      }

    });
      this.seriesOutput = this.getSeries(this.vitalSingsService.vistalsSigns)
      console.log("SERIES INITIAL DASH EN REAL TIME",this.seriesOutput)

  }

  public generateDayWiseTimeSeries = function (baseval:number, count:number) {
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

  // Función para obtener la serie de temperatura
getSerieTemperature(data: VitalSignsHistoryModel[]): GraphicSerieModel {
  const temperatureData: number[][] = this.generateDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(),20);

  return {
    name: 'Temperatura',
    data: temperatureData
  };
}

// Función para obtener la serie de frecuencia cardíaca (Heart Rate)
getSerieHeartRate(data: VitalSignsHistoryModel[]): GraphicSerieModel {
  const heartRateData: number[][] = this.generateDayWiseTimeSeries(
    new Date("11 Feb 2017 GMT").getTime(),
    20
  );

  return {
    name: 'Ritmo cardiaco',
    data: heartRateData
  };
}

// Función para obtener la serie de saturación de oxígeno (O2 Saturation)
getSerieSaturation(data: VitalSignsHistoryModel[]): GraphicSerieModel {
  const saturationData: number[][] = this.generateDayWiseTimeSeries(
    new Date("11 Feb 2017 GMT").getTime(),
    20
  );

  return {
    name: 'Saturation O2',
    data: saturationData
  };
}

// Función para obtener todas las series juntas
getSeries(data: VitalSignsHistoryModel[]): GraphicSerieModel[] {
  const temperatureSeries = this.getSerieTemperature(data);
  const heartRateSeries = this.getSerieHeartRate(data);
  const saturationSeries = this.getSerieSaturation(data);

  return [temperatureSeries, heartRateSeries, saturationSeries];
}
}

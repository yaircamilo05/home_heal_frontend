import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { VitalSingsService } from '../../../../services/vital.sings.service';
import { VitalSingsModel } from 'src/app/models/vital.sings.model';
import { ModalVitalSignsComponent } from 'src/app/modules/shared/components/modal-vital-signs/modal-vital-signs.component';
import { Dialog } from '@angular/cdk/dialog';
import { TitlesModal } from 'src/app/common/titles.modal';
import { Icons } from 'src/app/common/icon.modal';
import { VitalSignsHistoryModel } from 'src/app/models/vital.signs.history';
import { ActivatedRoute } from '@angular/router';
import { GraphicSerieModel } from 'src/app/models/serie.model';
import { map, single } from 'rxjs';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexFill,
  ApexPlotOptions,
} from 'ng-apexcharts';
import { UserGetModel } from 'src/app/models/user.model';
import { ModalChatComponent } from 'src/app/modules/shared/components/modal-chat/modal-chat.component';
import { TypeModal } from 'src/app/common/type.modal';
import { MessageModel } from 'src/app/models/message.model';
import { PatientService } from 'src/app/services/patient.service';
import { PatientCard, PatientRegister } from 'src/app/models/patient.model';
import { ModalDiagnosticComponent } from 'src/app/modules/shared/components/modal-diagnostic/modal-diagnostic.component';
import { ModalCaresComponent } from 'src/app/modules/shared/components/modal-cares/modal-cares.component';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  colors: string[];
  legend: ApexLegend;
  fill: ApexFill;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  vitalSingsService = inject(VitalSingsService);
  patientService = inject(PatientService);
  public chartOptions!: Partial<ChartOptions>;
  public chartHearthRateOptions!: Partial<ChartOptions>;
  public chartTemperatureOptions!: Partial<ChartOptions>;
  public chartSaturationOptions!: Partial<ChartOptions>;
  @Input() seriesInput: GraphicSerieModel[] = [];
  showNotificationNewMessage: boolean = false;
  messagesRecived: MessageModel[] = [];
  countMessageRecived: number = 0;
  firtMessageRecived: MessageModel | null = null;
  modalOpen: boolean = false;
  notificationSound = new Audio('../../../../../assets/sounds/tono.mp3'); // Asegúrate de reemplazar esto con la ruta a tu archivo de audio

  public vitalSings: VitalSignsHistoryModel = {
    hearth_rate: 0,
    blood_pressure: 0,
    O2_saturation: 0,
    date: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
    patient_id: 0,
  };
  patient_id: number = 0;
  patient_name: string = '';
  seriesTest = signal<GraphicSerieModel[]>([]);
  serieHearthRate: GraphicSerieModel[] = [];
  seriesOutput: GraphicSerieModel[] = [];

  constructor(private dialog: Dialog, private route: ActivatedRoute) {
    this.onUpdateVitalSigns();
    this.route.params.subscribe((params) => {
      this.patient_id = +params['patient_id'];
    });
  }
  ngOnInit() {
    this.onUpdateVitalSigns();
    this.getVitalSignsHistory();
    this.getPatientName();
  }

  // inicializeGraphics() {
  //   // Área
  //   this.chartOptions = {
  //     series: [...this.seriesInput],
  //     chart: {
  //       type: "area",
  //       height: 350,
  //       stacked: true,
  //       events: {
  //         selection: function (chart, e) {
  //           console.log(new Date(e.xaxis.min));
  //         }
  //       }
  //     },
  //     colors: ["#369cdd", "#FF4848", "#ffd700"],
  //     dataLabels: {
  //       enabled: true
  //     },
  //     fill: {
  //       type: "gradient",
  //       gradient: {
  //         opacityFrom: 0.6,
  //         opacityTo: 0.8
  //       }
  //     },
  //     legend: {
  //       position: "top",
  //       horizontalAlign: "left"
  //     },
  //     xaxis: {
  //       type: "datetime",
  //       labels: {
  //         datetimeFormatter: {
  //           year: 'yyyy',
  //           month: 'MMM',
  //           day: 'dd MMM',
  //           hour: 'HH:mm',
  //         }
  //       }
  //     }
  //   };
  // }

  onUpdateVitalSigns() {
    console.log('Escuchando en tiempo real...');
    this.vitalSingsService.socketService.io.on(
      'update vital Signs',
      (response: VitalSignsHistoryModel) => {
        const vitalRealTime: VitalSignsHistoryModel = {
          hearth_rate: response.hearth_rate,
          blood_pressure: response.blood_pressure,
          O2_saturation: response.O2_saturation,
          date: response.date,
          patient_id: response.patient_id,
        };

        this.vitalSings = vitalRealTime;
        this.seriesOutput = this.getSeries(this.vitalSingsService.vistalsSigns);
        this.seriesTest.set(this.seriesOutput);
      }
    );
  }

  openModalUpdateVitalsSigns() {
    let RefDialog = this.dialog.open(ModalVitalSignsComponent, {
      minWidth: '800px',
      minHeight: '80%',
      maxWidth: '50%',
      data: {
        title: TitlesModal.vitalSigns('Nombre del paciente'),
        iconClass: Icons.vitalSigns,
        pacientId: this.patient_id,
      },
    });
  }

  getVitalSignsHistory() {
    this.vitalSingsService
      .getVitalSignsHistory(this.patient_id)
      .subscribe((response) => {
        if (response.data.length > 0) {
          this.vitalSingsService.vistalsSigns = response.data;
          this.seriesOutput = this.getSeries(
            this.vitalSingsService.vistalsSigns
          );
          this.seriesTest.set(this.seriesOutput);
          this.vitalSings =
            this.vitalSingsService.vistalsSigns[
              this.vitalSingsService.vistalsSigns.length - 1
            ];
        } else {
          this.vitalSings = {
            hearth_rate: 0,
            blood_pressure: 0,
            O2_saturation: 0,
            date: new Date().toLocaleString('es-CO', {
              timeZone: 'America/Bogota',
            }),
            patient_id: 0,
          };
        }
        this.addDataToSeries(this.seriesTest());
        this.addDataToHearthRateSeries(
          this.seriesTest().filter((item) => item.name == 'Ritmo cardíaco')
        );
        this.addDataToTemperatureSerie(
          this.seriesTest().filter((item) => item.name == 'Temperatura')
        );
        this.addDataToSaturationSerie(
          this.seriesTest().filter((item) => item.name == 'Saturación de O2')
        );
      });
  }

  addDataToSaturationSerie(serie: GraphicSerieModel[]) {
    this.chartSaturationOptions = {
      series: [...serie],
      chart: {
        height: 350,
        type: 'bar',
      },
      colors: ['#369cdd'],
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      },
      xaxis: {
        type: 'datetime',
      },
    };
  }

  addDataToTemperatureSerie(serie: GraphicSerieModel[]) {
    this.chartTemperatureOptions = {
      series: [...serie],
      chart: {
        type: 'heatmap',
        height: 350,
      },
      colors: ['#ffd700'],
      dataLabels: {
        enabled: false,
      },
      fill: {},
      xaxis: {
        type: 'datetime',
        labels: {
          show: false,
        },
      },
    };
  }

  addDataToSeries(series: GraphicSerieModel[]) {
    this.chartOptions = {
      series: [...series],
      chart: {
        type: 'area',
        height: 350,
        stacked: true,
        events: {
          selection: function (chart, e) {
            console.log(new Date(e.xaxis.min));
          },
        },
      },
      colors: ['#FF4848', '#ffd700', '#369cdd'],
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      },
      xaxis: {
        type: 'datetime',
      },
    };
  }

  addDataToHearthRateSeries(series: GraphicSerieModel[]) {
    this.chartHearthRateOptions = {
      series: [...series],
      chart: {
        type: 'line',
        height: 350,
        stacked: true,
        events: {
          selection: function (chart, e) {
            console.log(new Date(e.xaxis.min));
          },
        },
      },
      colors: ['#FF4848'],
      dataLabels: {
        enabled: false,
      },
      fill: {},
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      },
      xaxis: {
        type: 'datetime',
      },
    };
  }

  generateDataSerieHeartRate(
    datarecived: VitalSignsHistoryModel[]
  ): number[][] {
    const data = datarecived.map((item) => {
      return [new Date(item.date).getTime(), item.hearth_rate];
    }); //TODO: Mapear los datos para que se puedan graficar

    return data;
  }

  generateDataSerieTemperature(
    datarecived: VitalSignsHistoryModel[]
  ): number[][] {
    const data = datarecived.map((item) => {
      return [new Date(item.date).getTime(), item.blood_pressure];
    }); //TODO: Mapear los datos para que se puedan graficar

    return data;
  }

  generateDataSerieSaturation(
    datarecived: VitalSignsHistoryModel[]
  ): number[][] {
    const data = datarecived.map((item) => {
      return [new Date(item.date).getTime(), item.O2_saturation];
    }); //TODO: Mapear los datos para que se puedan graficar

    return data;
  }

  // Función para obtener la serie de temperatura
  getSerieTemperature(data: VitalSignsHistoryModel[]): GraphicSerieModel {
    const temperatureData: number[][] = this.generateDataSerieTemperature(data);
    return {
      name: 'Temperatura',
      data: temperatureData,
    };
  }

  // Función para obtener la serie de frecuencia cardíaca (Heart Rate)
  getSerieHeartRate(data: VitalSignsHistoryModel[]): GraphicSerieModel {
    const heartRateData: number[][] = this.generateDataSerieHeartRate(data);
    return {
      name: 'Ritmo cardíaco',
      data: heartRateData,
    };
  }

  // Función para obtener la serie de saturación de oxígeno (O2 Saturation)
  getSerieSaturation(data: VitalSignsHistoryModel[]): GraphicSerieModel {
    const saturationData: number[][] = this.generateDataSerieSaturation(data);
    return {
      name: 'Saturación de O2',
      data: saturationData,
    };
  }

  // Función para obtener todas las series juntas
  getSeries(data: VitalSignsHistoryModel[]): GraphicSerieModel[] {
    const temperatureSeries = this.getSerieTemperature(data);
    const heartRateSeries = this.getSerieHeartRate(data);
    const saturationSeries = this.getSerieSaturation(data);

    return [heartRateSeries, temperatureSeries, saturationSeries];
  }

  openModalChat() {
    this.patientService
      .getPatientById(this.patient_id)
      .subscribe((response) => {
        const user: PatientCard = response.data;
        this.showModalChat(user);
      });
  }

  getPatientName() {
    this.patientService
      .getPatientById(this.patient_id)
      .subscribe((response) => {
        const user: PatientCard = response.data;
        console.log('Nombre del paciente', user.name + ' ' + user.lastname);
        this.patient_name = user.name;
      });
  }

  showModalChat(user: PatientCard) {
    this.showNotificationNewMessage = false;
    this.modalOpen = true;
    let RefDialog = this.dialog.open(ModalChatComponent, {
      minWidth: '800px',
      minHeight: '80%',
      maxWidth: '50%',
      data: {
        title: TitlesModal.Chat,
        question: '',
        iconClass: Icons.Chat,
        type: TypeModal.Chat,
        imageUser: user.img_url,
        userName: user.name + ' ' + user.lastname,
        room: user.email,
      },
    });
  }

  openCaresModal() {
    this.dialog.open(ModalCaresComponent, {
      minWidth: '800px',
      minHeight: '80%',
      maxWidth: '50%',
      data: {
        patientId: this.patient_id,
      },
    });
  }

  openDiagnosesModal() {
    this.dialog.open(ModalDiagnosticComponent, {
      minWidth: '800px',
      minHeight: '80%',
      maxWidth: '50%',
      data: {
        patientId: this.patient_id,
      },
    });
  }

}

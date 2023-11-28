import { Component, ViewChild, inject, Input, OnInit, signal } from '@angular/core';
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
import { last } from 'rxjs';
import { GraphicSerieModel } from 'src/app/models/serie.model';
import { VitalSingsService } from 'src/app/services/vital.sings.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  colors: string[];
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-graphics-all-against-all',
  templateUrl: './graphics-all-against-all.component.html',
  styleUrls: ['./graphics-all-against-all.component.scss']
})
export class GraphicsAllAgainstAllComponent implements OnInit{
  @ViewChild("chart") chart!: ChartComponent;
  vitalSignsService = inject(VitalSingsService);
  public chartOptions!: Partial<ChartOptions>;
  @Input() seriesInput : GraphicSerieModel[] = []


  constructor() {}
  ngOnInit(): void {
    this.chartOptions = {
      series:[ ...this.seriesInput ],
      chart: {
        type: "area",
        height: 350,
        stacked: true,
        events: {
          selection: function (chart, e) {
            console.log(new Date(e.xaxis.min));
          }
        }
      },
      colors: ["#369cdd","#FF4848","#4cae4c"],
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8
        }
      },
      legend: {
        position: "top",
        horizontalAlign: "left"
      },
      xaxis: {
        type: "datetime"
      }
    };

    console.log("El onInitttttttttttttttttttttttttttttttttttttttttttttttttt", this.chartOptions.series)
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

}

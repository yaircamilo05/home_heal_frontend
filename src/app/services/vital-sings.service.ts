import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { VitalSingsModel } from '../models/vital.sings.model';
import { SockectioService } from './sockectio.service';

@Injectable({
  providedIn: 'root'
})
export class VitalSingsService implements OnInit{
  sever:string = `${environment.serversockect}/vitalsigns`;
  vistalsSigns!:VitalSingsModel;
  constructor(private socketService: SockectioService, private http: HttpClient) {
    this.onSaveVitalSings();
    this.getVitalSignsinitial();
   }
  ngOnInit(): void {
   this.getVitalSignsinitial();
  }

  sendVitalSings(vitalSings: VitalSingsModel){
    this.socketService.io.emit('save vital Signs', vitalSings);
  }

  onSaveVitalSings(){
    this.socketService.io.on('save vital Signs', (response: VitalSingsModel)=>{
      this.vistalsSigns = response;
    });
  }

  getVitalSignsinitial(){
     this.http.get<VitalSingsModel>(`${this.sever}/getVitalSigns`).subscribe((response: VitalSingsModel)=>{
        this.vistalsSigns = response;
     });
  }



}

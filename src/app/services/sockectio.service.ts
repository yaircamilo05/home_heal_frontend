import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class SockectioService {

  io = io(`${environment.server}`,{
    path: `/${environment.pathsocket}`,
    withCredentials: true,
    autoConnect: true
  });

  constructor() {
    this.onConnect();
    this.onJoin();
    this.onDisconnect();
   }

  onConnect(){
    this.io.on('connect', () => {
      console.log("Connected");
    });
  }

  onJoin(){
    this.io.on('join', (data) => {
      console.log(data);
    });
  }
  onDisconnect(){
    this.io.on('disconnect', (data) => {
      console.log(data);
    });
  }
}

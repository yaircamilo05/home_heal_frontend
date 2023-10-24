import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SockectioService {

  io = io("http://localhost:8000",{
    path: "/sockets",
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

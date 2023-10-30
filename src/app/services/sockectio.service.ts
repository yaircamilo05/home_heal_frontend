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
    this.onConnection();
    this.onJoin();
    this.onDisconnect();
   }

  onConnection(){
    this.io.on('connection', () => {});
  }
  onJoin(){
    this.io.on('join', (data) => {});
  }
  onDisconnect(){
    this.io.on('disconnect', (data) => {});
  }
}

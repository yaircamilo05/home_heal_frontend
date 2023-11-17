import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment.local';
import { SockectClient, SockectServer } from '../models/socket.client.model';
import { AuthService } from './auth.service';
import { UserGetWithMenusModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SockectioService {
  user:UserGetWithMenusModel | null = null;
  io = io(`${environment.server}`,{
    path: `/${environment.pathsocket}`,
    withCredentials: false,
    autoConnect: true
  });

  constructor(private authService: AuthService) {
    this.onConnection();
    this.onJoin();
    this.onDisconnect();
   }

  connection(socketCliente:SockectClient){
    this.io.emit('connection_sockect_client',{"room": socketCliente.room, "sid": socketCliente.sid});
  }

  onConnection(){
    this.io.on('connection', (data:SockectServer) => {
      const socketClient:SockectClient ={
        sid: data.sid,
        room: this.user?.email ? this.user?.email : 'kany@gmail.com'
      }
      this.connection(socketClient);
    });
  }

  connectToRoom(room: SockectClient){
    this.io.emit('connectToRoom', {"room": room.room, "sid": room.sid});
  }

  onConnectToRoom(){
    this.io.on('connectToRoom', (data) => {
      console.log(data);
    });
  }
  onJoin(){
    this.io.on('join', (data) => {});
  }
  onDisconnect(){
    this.io.on('disconnect', (data) => {});
  }

  getUserLogged(){
    this.authService.user$.subscribe(user =>{
      this.user = user;
    });
  }
}

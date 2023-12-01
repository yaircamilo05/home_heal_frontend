import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment.local';
import { UserGetWithMenusModel } from '../models/user.model';
import { ConversationModel } from '../models/conversation.model';
import { UserSocketModel } from '../models/user.socket.model';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SockectioService {
  io = io(`${environment.serversockect}/`, {
    withCredentials: true,
    autoConnect: true
  });

  constructor(private authService: AuthService) {
    this.emitWelcome();
    this.onWelcome();
   }
  ngOnInit(){
    this.emitWelcome();
    this.onWelcome();
  }

  emitWelcome(){
    this.io.emit('welcome');
  }

  onWelcome(){
    this.io.on('welcome', (data)=>{
      console.log('Welcome to server socket', data);
    });
  }
  connected_error(){
    this.io.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        console.log("error de conexion");
      }
    });
  }
}

import { Injectable, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment.local';
import { SockectClient, SockectServer } from '../models/socket.client.model';
import { AuthService } from './auth.service';
import { UserGetWithMenusModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SockectioService implements OnInit{
  user:UserGetWithMenusModel | null = null;
  io = io(`${environment.serversockect}/`,{
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

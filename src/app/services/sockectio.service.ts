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
    this.emitConnectedListener();
    this.onConnectedListener();

   }
  ngOnInit(){
    this.getUserLogged();
  }

   emitConnectedListener(){
    this.io.emit('connetedListener');
   }

   onConnectedListener(){
    this.io.on('connetedListener', (data)=>{
      console.log(data);
    });

    
   }

   getUserLogged(){
    this.authService.user$.subscribe((user)=>{
      this.user = user;
    });
   }
}

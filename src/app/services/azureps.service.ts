import { Injectable, OnInit } from '@angular/core';
import { ResponseCustomModel } from '../models/response.custom.model';

@Injectable({
  providedIn: 'root'
})
export class AzurepsService implements OnInit{
  private socket: WebSocket;
  public contents:ResponseCustomModel<string>[] = [];
  prefix: string = 'azc';
  idrandom:number = Math.floor(Math.random() * 1000);

  constructor() {
    this.socket = new WebSocket(`ws://localhost:8000/${this.prefix}/ws/${this.idrandom}`);
    this.onConnectToRoom();
    this.onMessage();
  }
  ngOnInit(): void {
    this.socket = new WebSocket(`ws://localhost:8000/${this.prefix}/ws/${this.idrandom}`);
  }

  public onConnectToRoom(): void {
    this.socket.onopen = event => {
      console.log('WebSocket Open:', event);
    };
  }

  public onMessage(): void {
    this.socket.onmessage = event => {
      console.log('WebSocket Message:', event.data);
    };
  }

  public sendMessage(message: string): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket is not open.');
    }
  }

  public sendContent(contentr: ResponseCustomModel<string>){
    this.contents.push(contentr);
    this.sendMessage(JSON.stringify(contentr));
  }

  //   this.socket.onopen = event => {
  //     console.log('WebSocket Open:', event);
  //   };

  //   this.socket.onmessage = event => {
  //     console.log('WebSocket Message:', event.data);
  //   };

  //   this.socket.onerror = event => {
  //     console.error('WebSocket Error:', event);
  //   };

  //   this.socket.onclose = event => {
  //     console.log('WebSocket Closed:', event);
  //   };
  // }

  // public sendMessage(message: string): void {
  //   if (this.socket.readyState === WebSocket.OPEN) {
  //     this.socket.send(message);
  //   } else {
  //     console.error('WebSocket is not open.');
  //   }
  // }

  // public closeConnection(): void {
  //   if (this.socket) {
  //     this.socket.close();
  //   }
  // }
}

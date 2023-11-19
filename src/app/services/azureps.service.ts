import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AzurepsService {
  // private socket: WebSocket;

  constructor() { 
    // this.socket = ;
  }

  // public openConnection(url: string): void {
  //   this.socket = new WebSocket(url);

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

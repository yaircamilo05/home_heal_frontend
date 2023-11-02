import { Injectable } from '@angular/core';
import { MessageModel } from '../models/message.model';
import { SockectioService } from './sockectio.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chats : MessageModel[] = [];

  constructor(private sockectioService: SockectioService) {
    this.onRecivedMessage();
  }

  sendMessage(message: MessageModel){
    this.chats.push(message);
    this.sockectioService.io.emit('sendmessage', message);
  }

  onRecivedMessage(){
    this.sockectioService.io.on('recivedmessage', (message:MessageModel)=>{
      this.chats.push(message);
    });
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { MessageModel } from '../models/message.model';
import { SockectioService } from './sockectio.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chats : MessageModel[] = [];
  chatsRecived : MessageModel[] = [];
  newMessageEvent: EventEmitter<MessageModel> = new EventEmitter<MessageModel>();
  constructor(private sockectioService: SockectioService) {
    this.onRecivedMessage();
  }

  notifacationNewMessage(message: MessageModel){
    this.newMessageEvent.emit(message);
  }

  sendMessage(message: MessageModel){
    this.chats.push(message);
    this.sockectioService.io.emit('sendmessage', message);
  }

  onRecivedMessage(){
    this.sockectioService.io.on('recivedmessage', (message:MessageModel)=>{
      message.type = 2;
      this.notifacationNewMessage(message);
      this.chats.push(message);
    });
  }
}

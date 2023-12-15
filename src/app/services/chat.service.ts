import { EventEmitter, Injectable } from '@angular/core';
import { MessageModel } from '../models/message.model';
import { SockectioService } from './sockectio.service';
import { ConversationModel } from '../models/conversation.model';
import { RoomModel } from '../models/room.model';
import { ResponseSocketModel } from '../models/response.socket.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chats : MessageModel[] = [];
  chatsRecived : MessageModel[] = [];
  newMessageEvent: EventEmitter<MessageModel> = new EventEmitter<MessageModel>();
  constructor(private sockectioService: SockectioService, private storageService: StorageService) {
    this.onRecivedMessagePrivate();
  }

  notifacationNewMessage(message: MessageModel){
    this.newMessageEvent.emit(message);
  }

  sendMessagePrivate(message:MessageModel){
    this.chats.push(message);
    this.sockectioService.io.emit('privateMessage', {
      content:message,
      to: message.room
    });
  }

  onRecivedMessagePrivate(){
    return this.sockectioService.io.on('privateMessage', (response:ResponseSocketModel<MessageModel>)=>{
      response.content.type = 2;
      console.log("Repuesta del servidor de los mensajes privados", response.content);
      this.notifacationNewMessage(response.content);
      //if(this.messageIsForMy(response.content)){
        this.chats.push(response.content);
      //}
    });
  }

  messageIsForMy(message: MessageModel): boolean {
    return message.room === this.storageService.getUsername();
  }
}

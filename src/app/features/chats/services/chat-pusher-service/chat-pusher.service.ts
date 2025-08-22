import { Injectable } from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';
import {Message} from '../../../../shared/models/chat/chat-models';
import {HttpClient} from '@angular/common/http';
import Pusher from 'pusher-js';
import {deepObjSnakeToCamelCase} from '../../../../common/generic/utils/data-manipulation/deep-obj-snake-to-camel-case';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {environment} from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChatPusherService {
  private readonly apiUrl = `${environment.baseUrl}/api/chats`;

  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  private scrollToBottomSubject = new BehaviorSubject<any>([]);
  public scrollToBottom$ = this.messagesSubject.asObservable();

  private pusher: Pusher | null = null;

  constructor(
    private _http: HttpClient,
    private _authenticationService: AuthenticationService,
  ) {
    this.initPusher();
  }

  private initPusher(): void {
    this.pusher = new Pusher(environment.pusherAppKey, {
      cluster: environment.pusherCluster
    });
  }

  /** Subscribe to a chat channel */
  subscribeToChat(chatId: string): void {
    if (!this.pusher) return;


    const channel = this.pusher.subscribe(`chat-${chatId}`);

    channel.bind('send-message', (data: any) => {
      const newMsg: Message = {
        id: data.message_id,
        content: data.message,
        senderId: data.sender_id,
        receiverId: data.receiver_id,
        chatId: chatId,
      };
      this.addMessage(newMsg);
    });
  }

  /** Load initial messages for chat */
  loadMessages(chatId: string, limit = 20, offset = 0): void {
    this._http
      .get<Message[]>(`${this.apiUrl}/${chatId}/messages?limit=${limit}&offset=${offset}`)
      .pipe(map(deepObjSnakeToCamelCase))
      .subscribe((msgs) => {
        // If offset is 0, replace; otherwise append for infinite scroll
        if (offset === 0) {
          this.messagesSubject.next(msgs);
        } else {
          const current = this.messagesSubject.value;
          this.messagesSubject.next([...msgs, ...current]);
        }
      });
  }

  /** Append new message locally */
  private addMessage(message: Message): void {
    const current = this.messagesSubject.value;
    this.messagesSubject.next([...current, message]);
    if(message.senderId === this._authenticationService.getUserId()) {
      this.scrollToBottomSubject.next(null);
    }
  }

  /** Send message to backend */
  sendMessage(chatId: string, senderId: string, receiverId: string, content: string): void {
    this._http.post<Message>(`${this.apiUrl}/${chatId}/messages`, {
      sender_id: senderId,
      receiver_id: receiverId,
      content
    })
      .pipe(map(deepObjSnakeToCamelCase))
      .subscribe({
        next: (msg) => console.log('Msg sent successfully: ', msg)
      });
  }
}

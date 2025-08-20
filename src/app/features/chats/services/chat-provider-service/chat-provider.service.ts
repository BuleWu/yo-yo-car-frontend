import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Chat, Message} from '../../../../shared/models/chat/chat-models';
import {deepObjSnakeToCamelCase} from '../../../../common/generic/utils/data-manipulation/deep-obj-snake-to-camel-case';
import {environment} from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChatProviderService {

  private readonly apiUrl = `${environment.baseUrl}/api/chats`;

  constructor(
    private _http: HttpClient
  ) { }

  public createChat(user1Id: string, user2Id: string, rideId: string): Observable<Chat> {
    return this._http.post<Chat>(`${this.apiUrl}`, {
      user_1_id: user1Id,
      user_2_id: user2Id,
      ride_id: rideId
    })
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public getChats(): Observable<Chat[]> {
    return this._http.get<Chat[]>(`${this.apiUrl}`)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public getChatById(chatId: string): Observable<Chat> {
    return this._http.get<Chat>(`${this.apiUrl}/${chatId}`)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public deleteChat(chatId: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${chatId}`);
  }

  public getChatMessages(chatId: string, limit: number = 20, offset: number = 0): Observable<Message[]> {
    return this._http.get<Message[]>(`${this.apiUrl}/${chatId}/messages`, {
      params: {
        limit: limit.toString(),
        offset: offset.toString()
      }
    }).pipe(map(deepObjSnakeToCamelCase));
  }

  public sendMessage(chatId: string, senderId: string, receiverId: string, content: string): Observable<Message> {
    return this._http.post<Message>(`${this.apiUrl}/${chatId}/messages`, {
      sender_id: senderId,
      receiver_id: receiverId,
      content: content
    }).pipe(map(deepObjSnakeToCamelCase));
  }

  public updateMessage(messageId: string, content: string): Observable<Message> {
    return this._http.put<Message>(`${this.apiUrl}/messages/${messageId}`, {
      content: content
    }).pipe(map(deepObjSnakeToCamelCase));
  }
}
